export const FORM_NAMES = {
  LEAD_CAPTURE: 'leadCapture',
  QUOTATION: 'quotation',
} as const;

export type TFormName = (typeof FORM_NAMES)[keyof typeof FORM_NAMES];