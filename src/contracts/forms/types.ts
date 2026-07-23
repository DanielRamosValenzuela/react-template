import type { TCountry } from '@/config/types';

export interface ContractBuildContext {
  country: TCountry;
  productCode: string;
}

export interface FormContract<TStoreValues, TPayload, TResponse> {
  buildPayload: (values: TStoreValues, context: ContractBuildContext) => TPayload;
  countries: TCountry[];
  formName: string;
  mockPath: string;
  source: 'backend-contract' | 'draft-contract' | 'no-contract-exception';
  storeKey: string;
  successExample: TResponse;
}