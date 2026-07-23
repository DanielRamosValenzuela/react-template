export const FORM_NAMES = {
  LEAD_CAPTURE: 'leadCapture',
  PAYMENT: 'payment',
  PERSONAL_INFO: 'personalInfo',
  QUOTATION: 'quotation',
} as const;

export type TFormName = (typeof FORM_NAMES)[keyof typeof FORM_NAMES];
