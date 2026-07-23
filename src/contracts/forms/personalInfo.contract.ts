import { FORM_NAMES } from '@/config/forms';
import type { PersonalInfoStoreValues } from '@/store';
import type { FormContract } from './types';

export interface PersonalInfoPayload {
  address: {
    number: string;
    street: string;
  };
  firstName: string;
  lastName: string;
}

interface PersonalInfoResponse {
  status: 'saved';
}

export const personalInfoContract: FormContract<
  PersonalInfoStoreValues,
  PersonalInfoPayload,
  PersonalInfoResponse
> = {
  buildPayload: (values) => ({
    address: {
      number: values.addressNumber,
      street: values.addressStreet,
    },
    firstName: values.firstName,
    lastName: values.lastName,
  }),
  countries: ['cl', 'co', 'pe'],
  formName: FORM_NAMES.PERSONAL_INFO,
  mockPath: 'src/mocks/{country}/personalInfo.success.json',
  source: 'draft-contract',
  storeKey: 'falabella-personal-info-store',
  successExample: {
    status: 'saved',
  },
};
