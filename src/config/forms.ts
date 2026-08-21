export const FORM_NAMES = {
  HELLO: 'hello',
  HOGAR_QUOTE: 'hogarQuote',
} as const;

export type TFormName = (typeof FORM_NAMES)[keyof typeof FORM_NAMES];
