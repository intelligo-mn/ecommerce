/* tslint:disable:no-non-null-assertion */
import { pick } from '@vendure/common/lib/pick';
import { createTestEnvironment } from '@vendure/testing';
import gql from 'graphql-tag';
import path from 'path';

import { initialData } from '../../../e2e-common/e2e-initial-data';
import { TEST_SETUP_TIMEOUT_MS, testConfig } from '../../../e2e-common/test-config';

import { CreateTaxRate, GetTaxRate, GetTaxRates, UpdateTaxRate } from './graphql/generated-e2e-admin-types';

describe('TaxRate resolver', () => {
    const { server, adminClient, shopClient } = createTestEnvironment(testConfig);

    beforeAll(async () => {
        await server.init({
            dataDir: path.join(__dirname, '__data__'),
            initialData,
            productsCsvPath: path.join(__dirname, 'fixtures/e2e-products-minimal.csv'),
            customerCount: 2,
        });
        await adminClient.asSuperAdmin();
    }, TEST_SETUP_TIMEOUT_MS);

    afterAll(async () => {
        await server.destroy();
    });

    it('taxRates list', async () => {
        const { taxRates } = await adminClient.query<GetTaxRates.Query>(GET_TAX_RATES_LIST);

        expect(taxRates.totalItems).toBe(15);
    });

    it('taxRate', async () => {
        const { taxRate } = await adminClient.query<GetTaxRate.Query, GetTaxRate.Variables>(GET_TAX_RATE, {
            id: 'T_1',
        });

        expect(pick(taxRate!, ['id', 'name', 'enabled', 'value'])).toEqual({
            id: 'T_1',
            name: 'Standard Tax Oceania',
            enabled: true,
            value: 20,
        });
        expect(taxRate!.category.name).toBe('Standard Tax');
        expect(taxRate!.zone.name).toBe('Oceania');
    });

    it('createTaxRate', async () => {
        const { createTaxRate } = await adminClient.query<CreateTaxRate.Mutation, CreateTaxRate.Variables>(
            CREATE_TAX_RATE,
            {
                input: {
                    name: 'My Tax Rate',
                    categoryId: 'T_1',
                    zoneId: 'T_1',
                    enabled: true,
                    value: 17.5,
                },
            },
        );

        expect(createTaxRate.name).toBe('My Tax Rate');
        expect(createTaxRate.value).toBe(17.5);
    });

    it('updateTaxRate', async () => {
        const { updateTaxRate } = await adminClient.query<UpdateTaxRate.Mutation, UpdateTaxRate.Variables>(
            UPDATE_TAX_RATE,
            {
                input: {
                    id: 'T_1',
                    value: 17.5,
                },
            },
        );

        expect(updateTaxRate.value).toBe(17.5);
    });
});

export const TAX_RATE_FRAGMENT = gql`
    fragment TaxRate on TaxRate {
        id
        name
        value
        enabled
        zone {
            id
            name
        }
        category {
            id
            name
        }
        customerGroup {
            id
            name
        }
    }
`;

export const GET_TAX_RATES_LIST = gql`
    query GetTaxRates {
        taxRates {
            items {
                ...TaxRate
            }
            totalItems
        }
    }
    ${TAX_RATE_FRAGMENT}
`;

export const GET_TAX_RATE = gql`
    query GetTaxRate($id: ID!) {
        taxRate(id: $id) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;

export const CREATE_TAX_RATE = gql`
    mutation CreateTaxRate($input: CreateTaxRateInput!) {
        createTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;

export const UPDATE_TAX_RATE = gql`
    mutation UpdateTaxRate($input: UpdateTaxRateInput!) {
        updateTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
