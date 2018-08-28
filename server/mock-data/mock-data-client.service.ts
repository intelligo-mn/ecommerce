import * as faker from 'faker/locale/en_GB';
import gql from 'graphql-tag';
import {
    CreateProduct,
    CreateProductOptionGroup,
    CreateProductOptionGroupVariables,
    CreateProductVariables,
    GenerateProductVariants,
    GenerateProductVariantsVariables,
    LanguageCode,
    ProductTranslationInput,
    UpdateProductVariants,
    UpdateProductVariantsVariables,
} from 'shared/generated-types';

import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_OPTION_GROUP,
    GENERATE_PRODUCT_VARIANTS,
    UPDATE_PRODUCT_VARIANTS,
} from '../../admin-ui/src/app/data/mutations/product-mutations';
import { PasswordService } from '../src/auth/password.service';
import { VendureConfig } from '../src/config/vendure-config';
import { CreateAddressDto } from '../src/entity/address/address.dto';
import { CreateAdministratorDto } from '../src/entity/administrator/administrator.dto';
import { CreateCustomerDto } from '../src/entity/customer/customer.dto';
import { Customer } from '../src/entity/customer/customer.entity';

import { SimpleGraphQLClient } from './gql-request';

// tslint:disable:no-console
/**
 * A service for creating mock data via the GraphQL API.
 */
export class MockDataClientService {
    apiUrl: string;
    client: SimpleGraphQLClient;

    constructor(config: VendureConfig) {
        this.client = new SimpleGraphQLClient(`http://localhost:${config.port}/${config.apiPath}`);
        // make the generated results deterministic
        faker.seed(1);
    }

    async populateOptions(): Promise<any> {
        await this.client
            .request<CreateProductOptionGroup, CreateProductOptionGroupVariables>(
                CREATE_PRODUCT_OPTION_GROUP,
                {
                    input: {
                        code: 'size',
                        translations: [
                            { languageCode: LanguageCode.en, name: 'Size' },
                            { languageCode: LanguageCode.de, name: 'Größe' },
                        ],
                        options: [
                            {
                                code: 'small',
                                translations: [
                                    { languageCode: LanguageCode.en, name: 'Small' },
                                    { languageCode: LanguageCode.de, name: 'Klein' },
                                ],
                            },
                            {
                                code: 'large',
                                translations: [
                                    { languageCode: LanguageCode.en, name: 'Large' },
                                    { languageCode: LanguageCode.de, name: 'Groß' },
                                ],
                            },
                        ],
                    },
                },
            )
            .then(
                data => console.log('Created option group:', data.createProductOptionGroup.name),
                err => console.log(err),
            );
    }

    async populateAdmins(): Promise<any> {
        const query = gql`
            mutation($input: CreateAdministratorInput!) {
                createAdministrator(input: $input) {
                    id
                    emailAddress
                }
            }
        `;

        const variables = {
            input: {
                firstName: 'Super',
                lastName: 'Admin',
                emailAddress: 'admin@test.com',
                password: 'test',
            } as CreateAdministratorDto,
        };

        await this.client
            .request(query, variables)
            .then(data => console.log('Created Administrator:', data), err => console.log(err));
    }

    async populateCustomers(count: number = 5): Promise<any> {
        const passwordService = new PasswordService();

        for (let i = 0; i < count; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();

            const query1 = gql`
                mutation CreateCustomer($input: CreateCustomerInput!, $password: String) {
                    createCustomer(input: $input, password: $password) {
                        id
                        emailAddress
                    }
                }
            `;

            const variables1 = {
                input: {
                    firstName,
                    lastName,
                    emailAddress: faker.internet.email(firstName, lastName),
                    phoneNumber: faker.phone.phoneNumber(),
                } as CreateCustomerDto,
                password: 'test',
            };

            const customer: Customer | void = await this.client
                .request(query1, variables1)
                .then((data: any) => data.createCustomer as Customer, err => console.log(err));

            if (customer) {
                const query2 = gql`
                    mutation($customerId: ID!, $input: CreateAddressInput) {
                        createCustomerAddress(customerId: $customerId, input: $input) {
                            id
                            streetLine1
                        }
                    }
                `;

                const variables2 = {
                    input: {
                        fullName: `${firstName} ${lastName}`,
                        streetLine1: faker.address.streetAddress(),
                        city: faker.address.city(),
                        province: faker.address.county(),
                        postalCode: faker.address.zipCode(),
                        country: faker.address.country(),
                    } as CreateAddressDto,
                    customerId: customer.id,
                };

                await this.client.request(query2, variables2).then(
                    data => {
                        console.log(`Created Customer ${i + 1}:`, data);
                        return data as Customer;
                    },
                    err => console.log(err),
                );
            }
        }
    }

    async populateProducts(count: number = 5): Promise<any> {
        for (let i = 0; i < count; i++) {
            const query = CREATE_PRODUCT;

            const name = faker.commerce.productName();
            const slug = name.toLowerCase().replace(/\s+/g, '-');
            const description = faker.lorem.sentence();
            const languageCodes = [LanguageCode.en, LanguageCode.de];

            const variables = {
                input: {
                    image: faker.image.imageUrl(),
                    optionGroupCodes: ['size'],
                    translations: languageCodes.map(code =>
                        this.makeProductTranslation(code, name, slug, description),
                    ),
                },
            };

            const product = await this.client
                .request<CreateProduct, CreateProductVariables>(query, variables)
                .then(
                    data => {
                        console.log(`Created Product ${i + 1}:`, data.createProduct.name);
                        return data;
                    },
                    err => console.log(err),
                );
            if (product) {
                const prodWithVariants = await this.makeProductVariant(product.createProduct.id);
                const variants = prodWithVariants.generateVariantsForProduct.variants;
                for (const variant of variants) {
                    const variantEN = variant.translations[0];
                    const variantDE = { ...variantEN };
                    variantDE.languageCode = LanguageCode.de;
                    variantDE.name = variantDE.name.replace(LanguageCode.en, LanguageCode.de);
                    delete variantDE.id;
                    variant.translations.push(variantDE);
                }
                await this.client.request<UpdateProductVariants, UpdateProductVariantsVariables>(
                    UPDATE_PRODUCT_VARIANTS,
                    {
                        input: variants.map(({ id, translations, sku, price }) => ({
                            id,
                            translations,
                            sku,
                            price,
                        })),
                    },
                );
            }
        }
    }

    private makeProductTranslation(
        languageCode: LanguageCode,
        name: string,
        slug: string,
        description: string,
    ): ProductTranslationInput {
        return {
            languageCode,
            name: `${languageCode} ${name}`,
            slug: `${languageCode} ${slug}`,
            description: `${languageCode} ${description}`,
        };
    }

    private async makeProductVariant(productId: string): Promise<GenerateProductVariants> {
        const query = GENERATE_PRODUCT_VARIANTS;
        return this.client.request<GenerateProductVariants, GenerateProductVariantsVariables>(query, {
            productId,
        });
    }
}
