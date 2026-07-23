import { FORM_NAMES } from '@/config/forms';
import type { PaymentStoreValues } from '@/store';
import type { FormContract } from './types';

export interface PaymentPayload {
  methodId: string;
}

interface PaymentResponse {
  status: 'approved';
  transactionId: string;
}

export const paymentContract: FormContract<PaymentStoreValues, PaymentPayload, PaymentResponse> = {
  buildPayload: (values) => ({
    methodId: values.selectedMethodId,
  }),
  countries: ['cl', 'co', 'pe'],
  formName: FORM_NAMES.PAYMENT,
  mockPath: 'src/mocks/{country}/payment.success.json',
  source: 'draft-contract',
  storeKey: 'falabella-payment-store',
  successExample: {
    status: 'approved',
    transactionId: 'txn-example-id',
  },
};
