// tslint:disable

export interface PossibleTypesResultData {
    possibleTypes: {
        [key: string]: string[];
    };
}
const result: PossibleTypesResultData = {
    possibleTypes: {
        CreateAssetResult: ['Asset', 'MimeTypeError'],
        NativeAuthenticationResult: ['CurrentUser', 'InvalidCredentialsError', 'NativeAuthStrategyError'],
        AuthenticationResult: ['CurrentUser', 'InvalidCredentialsError'],
        CreateChannelResult: ['Channel', 'LanguageNotAvailableError'],
        UpdateChannelResult: ['Channel', 'LanguageNotAvailableError'],
        CreateCustomerResult: ['Customer', 'EmailAddressConflictError'],
        UpdateCustomerResult: ['Customer', 'EmailAddressConflictError'],
        UpdateGlobalSettingsResult: ['GlobalSettings', 'ChannelDefaultLanguageError'],
        TransitionOrderToStateResult: ['Order', 'OrderStateTransitionError'],
        SettlePaymentResult: [
            'Payment',
            'SettlePaymentError',
            'PaymentStateTransitionError',
            'OrderStateTransitionError',
        ],
        AddFulfillmentToOrderResult: [
            'Fulfillment',
            'EmptyOrderLineSelectionError',
            'ItemsAlreadyFulfilledError',
            'InsufficientStockOnHandError',
            'InvalidFulfillmentHandlerError',
            'FulfillmentStateTransitionError',
            'CreateFulfillmentError',
        ],
        CancelOrderResult: [
            'Order',
            'EmptyOrderLineSelectionError',
            'QuantityTooGreatError',
            'MultipleOrderError',
            'CancelActiveOrderError',
            'OrderStateTransitionError',
        ],
        RefundOrderResult: [
            'Refund',
            'QuantityTooGreatError',
            'NothingToRefundError',
            'OrderStateTransitionError',
            'MultipleOrderError',
            'PaymentOrderMismatchError',
            'RefundOrderStateError',
            'AlreadyRefundedError',
            'RefundStateTransitionError',
        ],
        SettleRefundResult: ['Refund', 'RefundStateTransitionError'],
        TransitionFulfillmentToStateResult: ['Fulfillment', 'FulfillmentStateTransitionError'],
        RemoveOptionGroupFromProductResult: ['Product', 'ProductOptionInUseError'],
        CreatePromotionResult: ['Promotion', 'MissingConditionsError'],
        UpdatePromotionResult: ['Promotion', 'MissingConditionsError'],
        StockMovement: ['StockAdjustment', 'Allocation', 'Sale', 'Cancellation', 'Return', 'Release'],
        StockMovementItem: ['StockAdjustment', 'Allocation', 'Sale', 'Cancellation', 'Return', 'Release'],
        PaginatedList: [
            'AdministratorList',
            'CustomerGroupList',
            'JobList',
            'PaymentMethodList',
            'AssetList',
            'CollectionList',
            'ProductVariantList',
            'CountryList',
            'CustomerList',
            'FacetList',
            'HistoryEntryList',
            'OrderList',
            'ProductList',
            'PromotionList',
            'RoleList',
            'ShippingMethodList',
            'TaxRateList',
        ],
        Node: [
            'Administrator',
            'Collection',
            'Customer',
            'Facet',
            'HistoryEntry',
            'Job',
            'Order',
            'Fulfillment',
            'PaymentMethod',
            'Product',
            'ProductVariant',
            'StockAdjustment',
            'Allocation',
            'Sale',
            'Cancellation',
            'Return',
            'Release',
            'Address',
            'Asset',
            'Channel',
            'Country',
            'CustomerGroup',
            'FacetValue',
            'OrderItem',
            'OrderLine',
            'Payment',
            'Refund',
            'Surcharge',
            'ProductOptionGroup',
            'ProductOption',
            'Promotion',
            'Role',
            'ShippingMethod',
            'TaxCategory',
            'TaxRate',
            'User',
            'AuthenticationMethod',
            'Zone',
        ],
        ErrorResult: [
            'MimeTypeError',
            'LanguageNotAvailableError',
            'ChannelDefaultLanguageError',
            'SettlePaymentError',
            'EmptyOrderLineSelectionError',
            'ItemsAlreadyFulfilledError',
            'InvalidFulfillmentHandlerError',
            'CreateFulfillmentError',
            'InsufficientStockOnHandError',
            'MultipleOrderError',
            'CancelActiveOrderError',
            'PaymentOrderMismatchError',
            'RefundOrderStateError',
            'NothingToRefundError',
            'AlreadyRefundedError',
            'QuantityTooGreatError',
            'RefundStateTransitionError',
            'PaymentStateTransitionError',
            'FulfillmentStateTransitionError',
            'ProductOptionInUseError',
            'MissingConditionsError',
            'NativeAuthStrategyError',
            'InvalidCredentialsError',
            'OrderStateTransitionError',
            'EmailAddressConflictError',
            'OrderLimitError',
            'NegativeQuantityError',
            'InsufficientStockError',
        ],
        CustomField: [
            'StringCustomFieldConfig',
            'LocaleStringCustomFieldConfig',
            'IntCustomFieldConfig',
            'FloatCustomFieldConfig',
            'BooleanCustomFieldConfig',
            'DateTimeCustomFieldConfig',
        ],
        CustomFieldConfig: [
            'StringCustomFieldConfig',
            'LocaleStringCustomFieldConfig',
            'IntCustomFieldConfig',
            'FloatCustomFieldConfig',
            'BooleanCustomFieldConfig',
            'DateTimeCustomFieldConfig',
        ],
        SearchResultPrice: ['PriceRange', 'SinglePrice'],
    },
};
export default result;
