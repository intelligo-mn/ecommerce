import { Column, Entity, ManyToOne } from 'typeorm';

import { LanguageCode } from '../../../../shared/generated-types';
import { DeepPartial } from '../../../../shared/shared-types';
import { HasCustomFields } from '../../../../shared/shared-types';
import { Translation } from '../../common/types/locale-types';
import { VendureEntity } from '../base/base.entity';
import { CustomProductVariantFieldsTranslation } from '../custom-entity-fields';

import { ProductVariant } from './product-variant.entity';

@Entity()
export class ProductVariantTranslation extends VendureEntity
    implements Translation<ProductVariant>, HasCustomFields {
    constructor(input?: DeepPartial<Translation<ProductVariant>>) {
        super(input);
    }

    @Column('varchar') languageCode: LanguageCode;

    @Column() name: string;

    @ManyToOne(type => ProductVariant, base => base.translations)
    base: ProductVariant;

    @Column(type => CustomProductVariantFieldsTranslation)
    customFields: CustomProductVariantFieldsTranslation;
}
