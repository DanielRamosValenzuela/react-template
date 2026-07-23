import { FORM_NAMES } from '@/config/forms';
import type { LeadCaptureStoreValues } from '@/store';
import { normalizeDocument, onlyDigits } from '@/utils/functions';
import type { FormContract } from './types';

export interface LeadCapturePayload {
  birthdate: string;
  document: {
    number: string;
    type: string;
  };
  email: string;
  phone: string;
  productCode: string;
}

interface LeadCaptureResponse {
  leadId: string;
  status: 'created';
}

export const leadCaptureContract: FormContract<
  LeadCaptureStoreValues,
  LeadCapturePayload,
  LeadCaptureResponse
> = {
  buildPayload: (values, context) => ({
    birthdate: values.birthdate,
    document: {
      number: normalizeDocument(values.identificationDocument),
      type: values.documentType,
    },
    email: values.email.trim().toLowerCase(),
    phone: onlyDigits(values.phone),
    productCode: context.productCode,
  }),
  countries: ['cl', 'co', 'pe'],
  formName: FORM_NAMES.LEAD_CAPTURE,
  mockPath: 'src/mocks/{country}/leadCapture.success.json',
  source: 'draft-contract',
  storeKey: 'falabella-lead-capture-store',
  successExample: {
    leadId: 'lead-example-id',
    status: 'created',
  },
};