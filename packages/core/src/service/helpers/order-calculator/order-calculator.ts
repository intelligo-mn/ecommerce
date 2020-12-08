import { Injectable } from '@nestjs/common';
import { filterAsync } from '@vendure/common/lib/filter-async';
import { AdjustmentType } from '@vendure/common/lib/generated-types';

import { RequestContext } from '../../../api/common/request-context';
import { InternalServerError } from '../../../common/error/errors';
import { netPriceOf } from '../../../common/tax-utils';
import { idsAreEqual } from '../../../common/utils';
import { ConfigService } from '../../../config/config.service';
import { OrderItem, OrderLine, TaxCategory, TaxRate } from '../../../entity';
import { Order } from '../../../entity/order/order.entity';
import { Promotion } from '../../../entity/promotion/promotion.entity';
import { ShippingLine } from '../../../entity/shipping-line/shipping-line.entity';
import { Zone } from '../../../entity/zone/zone.entity';
import { ShippingMethodService } from '../../services/shipping-method.service';
import { TaxRateService } from '../../services/tax-rate.service';
import { ZoneService } from '../../services/zone.service';
import { ShippingCalculator } from '../shipping-calculator/shipping-calculator';
import { TaxCalculator } from '../tax-calculator/tax-calculator';

import { prorate } from './prorate';

@Injectable()
export class OrderCalculator {
    constructor(
        private configService: ConfigService,
        private zoneService: ZoneService,
        private taxRateService: TaxRateService,
        private taxCalculator: TaxCalculator,
        private shippingMethodService: ShippingMethodService,
        private shippingCalculator: ShippingCalculator,
    ) {}

    /**
     * Applies taxes and promotions to an Order. Mutates the order object.
     * Returns an array of any OrderItems which had new adjustments
     * applied, either tax or promotions.
     */
    async applyPriceAdjustments(
        ctx: RequestContext,
        order: Order,
        promotions: Promotion[],
        updatedOrderLine?: OrderLine,
    ): Promise<OrderItem[]> {
        const { taxZoneStrategy } = this.configService.taxOptions;
        const zones = this.zoneService.findAll(ctx);
        const activeTaxZone = taxZoneStrategy.determineTaxZone(ctx, zones, ctx.channel, order);
        let taxZoneChanged = false;
        if (!activeTaxZone) {
            throw new InternalServerError(`error.no-active-tax-zone`);
        }
        if (!order.taxZoneId || !idsAreEqual(order.taxZoneId, activeTaxZone.id)) {
            order.taxZoneId = activeTaxZone.id;
            taxZoneChanged = true;
        }
        const updatedOrderItems = new Set<OrderItem>();
        if (updatedOrderLine) {
            this.applyTaxesToOrderLine(
                ctx,
                updatedOrderLine,
                activeTaxZone,
                this.createTaxRateGetter(activeTaxZone),
            );
            updatedOrderLine.activeItems.forEach(item => updatedOrderItems.add(item));
        }
        this.calculateOrderTotals(order);
        if (order.lines.length) {
            if (taxZoneChanged) {
                // First apply taxes to the non-discounted prices
                this.applyTaxes(ctx, order, activeTaxZone);
            }

            // Then test and apply promotions
            const totalBeforePromotions = order.subTotal;
            const itemsModifiedByPromotions = await this.applyPromotions(ctx, order, promotions);
            itemsModifiedByPromotions.forEach(item => updatedOrderItems.add(item));

            if (order.subTotal !== totalBeforePromotions || itemsModifiedByPromotions.length) {
                // Finally, re-calculate taxes because the promotions may have
                // altered the unit prices, which in turn will alter the tax payable.
                this.applyTaxes(ctx, order, activeTaxZone);
            }
            await this.applyShipping(ctx, order);
            await this.applyShippingPromotions(ctx, order, promotions);
        }
        this.calculateOrderTotals(order);
        return taxZoneChanged ? order.getOrderItems() : Array.from(updatedOrderItems);
    }

    /**
     * Applies the correct TaxRate to each OrderItem in the order.
     */
    private applyTaxes(ctx: RequestContext, order: Order, activeZone: Zone) {
        const getTaxRate = this.createTaxRateGetter(activeZone);
        for (const line of order.lines) {
            this.applyTaxesToOrderLine(ctx, line, activeZone, getTaxRate);
        }
        this.calculateOrderTotals(order);
    }

    /**
     * Applies the correct TaxRate to an OrderLine
     */
    private applyTaxesToOrderLine(
        ctx: RequestContext,
        line: OrderLine,
        activeZone: Zone,
        getTaxRate: (taxCategory: TaxCategory) => TaxRate,
    ) {
        const applicableTaxRate = getTaxRate(line.taxCategory);
        for (const item of line.activeItems) {
            item.taxLines = [applicableTaxRate.apply(item.proratedUnitPrice)];
        }
    }

    /**
     * Returns a memoized function for performing an efficient
     * lookup of the correct TaxRate for a given TaxCategory.
     */
    private createTaxRateGetter(activeZone: Zone): (taxCategory: TaxCategory) => TaxRate {
        const taxRateCache = new Map<TaxCategory, TaxRate>();

        return (taxCategory: TaxCategory): TaxRate => {
            const cached = taxRateCache.get(taxCategory);
            if (cached) {
                return cached;
            }
            const rate = this.taxRateService.getApplicableTaxRate(activeZone, taxCategory);
            taxRateCache.set(taxCategory, rate);
            return rate;
        };
    }

    /**
     * Applies any eligible promotions to each OrderItem in the order. Returns an array of
     * any OrderItems which had their Adjustments modified.
     */
    private async applyPromotions(
        ctx: RequestContext,
        order: Order,
        promotions: Promotion[],
    ): Promise<OrderItem[]> {
        const updatedItems = await this.applyOrderItemPromotions(ctx, order, promotions);
        const orderUpdatedItems = await this.applyOrderPromotions(ctx, order, promotions);
        if (orderUpdatedItems.length) {
            return orderUpdatedItems;
        } else {
            return updatedItems;
        }
    }

    /**
     * Applies promotions to OrderItems. This is a quite complex function, due to the inherent complexity
     * of applying the promotions, and also due to added complexity in the name of performance
     * optimization. Therefore it is heavily annotated so that the purpose of each step is clear.
     */
    private async applyOrderItemPromotions(
        ctx: RequestContext,
        order: Order,
        promotions: Promotion[],
    ): Promise<OrderItem[]> {
        // The naive implementation updates *every* OrderItem after this function is run.
        // However, on a very large order with hundreds or thousands of OrderItems, this results in
        // very poor performance. E.g. updating a single quantity of an OrderLine results in saving
        // all 1000 (for example) OrderItems to the DB.
        // The solution is to try to be smart about tracking exactly which OrderItems have changed,
        // so that we only update those.
        const updatedOrderItems = new Set<OrderItem>();

        for (const line of order.lines) {
            // Must be re-calculated for each line, since the previous lines may have triggered promotions
            // which affected the order price.
            const applicablePromotions = await filterAsync(promotions, p => p.test(ctx, order));

            const lineHasExistingPromotions = !!line.items[0].adjustments?.find(
                a => a.type === AdjustmentType.PROMOTION,
            );
            const forceUpdateItems = this.orderLineHasInapplicablePromotions(applicablePromotions, line);

            if (forceUpdateItems || lineHasExistingPromotions) {
                line.clearAdjustments();
            }
            if (forceUpdateItems) {
                // This OrderLine contains Promotion adjustments for Promotions that are no longer
                // applicable. So we know for sure we will need to update these OrderItems in the
                // DB. Therefore add them to the `updatedOrderItems` set.
                line.items.forEach(i => updatedOrderItems.add(i));
            }

            for (const promotion of applicablePromotions) {
                let priceAdjusted = false;
                // We need to test the promotion *again*, even though we've tested them for the line.
                // This is because the previous Promotions may have adjusted the Order in such a way
                // as to render later promotions no longer applicable.
                if (await promotion.test(ctx, order)) {
                    for (const item of line.items) {
                        const adjustment = await promotion.apply(ctx, {
                            orderItem: item,
                            orderLine: line,
                        });
                        if (adjustment) {
                            item.addAdjustment(adjustment);
                            priceAdjusted = true;
                            updatedOrderItems.add(item);
                        }
                    }
                    if (priceAdjusted) {
                        this.calculateOrderTotals(order);
                        priceAdjusted = false;
                    }
                }
            }
            const lineNoLongerHasPromotions =
                !line.items[0].adjustments ||
                !line.items[0].adjustments.find(a => a.type === AdjustmentType.PROMOTION);
            if (lineHasExistingPromotions && lineNoLongerHasPromotions) {
                line.items.forEach(i => updatedOrderItems.add(i));
            }

            if (forceUpdateItems) {
                // If we are forcing an update, we need to ensure that totals get
                // re-calculated *even if* there are no applicable promotions (i.e.
                // the other call to `this.calculateOrderTotals()` inside the `for...of`
                // loop was never invoked).
                this.calculateOrderTotals(order);
            }
        }
        return Array.from(updatedOrderItems.values());
    }

    /**
     * An OrderLine may have promotion adjustments from Promotions which are no longer applicable.
     * For example, a coupon code might have caused a discount to be applied, and now that code has
     * been removed from the order. The adjustment will still be there on each OrderItem it was applied
     * to, even though that Promotion is no longer found in the `applicablePromotions` array.
     *
     * We need to know about this because it means that all OrderItems in the OrderLine must be
     * updated.
     */
    private orderLineHasInapplicablePromotions(applicablePromotions: Promotion[], line: OrderLine) {
        const applicablePromotionIds = applicablePromotions.map(p => p.getSourceId());

        const linePromotionIds = line.adjustments
            .filter(a => a.type === AdjustmentType.PROMOTION)
            .map(a => a.adjustmentSource);
        const hasPromotionsThatAreNoLongerApplicable = !linePromotionIds.every(id =>
            applicablePromotionIds.includes(id),
        );
        return hasPromotionsThatAreNoLongerApplicable;
    }

    private async applyOrderPromotions(
        ctx: RequestContext,
        order: Order,
        promotions: Promotion[],
    ): Promise<OrderItem[]> {
        const updatedItems = new Set<OrderItem>();
        order.lines.forEach(line => line.clearAdjustments(AdjustmentType.DISTRIBUTED_ORDER_PROMOTION));
        this.calculateOrderTotals(order);
        const applicableOrderPromotions = await filterAsync(promotions, p => p.test(ctx, order));
        if (applicableOrderPromotions.length) {
            for (const promotion of applicableOrderPromotions) {
                // re-test the promotion on each iteration, since the order total
                // may be modified by a previously-applied promotion
                if (await promotion.test(ctx, order)) {
                    const adjustment = await promotion.apply(ctx, { order });
                    if (adjustment && adjustment.amount !== 0) {
                        const amount = adjustment.amount;
                        const weights = order.lines.map(l => l.proratedLinePrice * l.taxRate);
                        const distribution = prorate(weights, amount);
                        order.lines.forEach((line, i) => {
                            const shareOfAmount = distribution[i];
                            const itemWeights = line.items.map(item => item.unitPrice);
                            const itemDistribution = prorate(itemWeights, shareOfAmount);
                            line.items.forEach((item, j) => {
                                const discount = itemDistribution[j];
                                const adjustedDiscount = item.listPriceIncludesTax
                                    ? netPriceOf(amount, item.taxRate)
                                    : amount;
                                // Note: At this point, any time we have an Order-level discount being applied,
                                // we are effectively nuking all the performance optimizations we have for updating
                                // as few OrderItems as possible (see notes in the `applyOrderItemPromotions()` method).
                                // This is because we are prorating any Order-level discounts over _all_ OrderItems.
                                // (see https://github.com/vendure-ecommerce/vendure/issues/573 for a detailed discussion
                                // as to why). The are ways to optimize this, but for now I am leaving the implementation
                                // as-is, and we can deal with performance issues later. Correctness is more important
                                // when is comes to price & tax calculations.
                                updatedItems.add(item);
                                item.addAdjustment({
                                    amount: discount,
                                    adjustmentSource: adjustment.adjustmentSource,
                                    description: adjustment.description,
                                    type: AdjustmentType.DISTRIBUTED_ORDER_PROMOTION,
                                });
                            });
                        });
                        this.calculateOrderTotals(order);
                    }
                }
            }
            this.calculateOrderTotals(order);
        }
        return Array.from(updatedItems.values());
    }

    private async applyShippingPromotions(ctx: RequestContext, order: Order, promotions: Promotion[]) {
        const applicableOrderPromotions = await filterAsync(promotions, p => p.test(ctx, order));
        if (applicableOrderPromotions.length) {
            order.shippingLines.forEach(line => (line.adjustments = []));
            for (const promotion of applicableOrderPromotions) {
                // re-test the promotion on each iteration, since the order total
                // may be modified by a previously-applied promotion
                if (await promotion.test(ctx, order)) {
                    for (const shippingLine of order.shippingLines) {
                        const adjustment = await promotion.apply(ctx, { shippingLine, order });
                        if (adjustment && adjustment.amount !== 0) {
                            shippingLine.addAdjustment(adjustment);
                        }
                    }
                }
            }
        }
    }

    private async applyShipping(ctx: RequestContext, order: Order) {
        const shippingLine: ShippingLine | undefined = order.shippingLines[0];
        const currentShippingMethod =
            shippingLine?.shippingMethodId &&
            (await this.shippingMethodService.findOne(ctx, shippingLine.shippingMethodId));
        if (!currentShippingMethod) {
            return;
        }
        const currentMethodStillEligible = await currentShippingMethod.test(ctx, order);
        if (currentMethodStillEligible) {
            const result = await currentShippingMethod.apply(ctx, order);
            if (result) {
                shippingLine.listPrice = result.price;
                shippingLine.listPriceIncludesTax = result.priceIncludesTax;
                shippingLine.taxLines = [
                    {
                        description: 'shipping tax',
                        taxRate: result.taxRate,
                    },
                ];
            }
            return;
        }
        const results = await this.shippingCalculator.getEligibleShippingMethods(ctx, order, [
            currentShippingMethod.id,
        ]);
        if (results && results.length) {
            const cheapest = results[0];
            shippingLine.listPrice = cheapest.result.price;
            shippingLine.listPriceIncludesTax = cheapest.result.priceIncludesTax;
            shippingLine.shippingMethod = cheapest.method;
            shippingLine.taxLines = [
                {
                    description: 'shipping tax',
                    taxRate: cheapest.result.taxRate,
                },
            ];
        }
    }

    private calculateOrderTotals(order: Order) {
        let totalPrice = 0;
        let totalPriceWithTax = 0;

        for (const line of order.lines) {
            totalPrice += line.proratedLinePrice;
            totalPriceWithTax += line.proratedLinePriceWithTax;
        }

        order.subTotal = totalPrice;
        order.subTotalWithTax = totalPriceWithTax;

        let shippingPrice = 0;
        let shippingPriceWithTax = 0;
        for (const shippingLine of order.shippingLines) {
            shippingPrice += shippingLine.discountedPrice;
            shippingPriceWithTax += shippingLine.discountedPriceWithTax;
        }

        order.shipping = shippingPrice;
        order.shippingWithTax = shippingPriceWithTax;
    }
}
