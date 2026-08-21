export const FORM_NAMES = {
  HOGAR_QUOTE_START: 'hogar-quote-start',
} as const;

export type TFormName = (typeof FORM_NAMES)[keyof typeof FORM_NAMES];
