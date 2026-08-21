import type { TCountry } from '@/config/types';

export interface ClHogarQuoteStartPayload {
  advisorCode?: string;
  birthDate: string;
  consent: true;
  country: 'cl';
  email: string;
  phone: string;
  rut: string;
}

export type HogarQuoteStartStoreValues = ClHogarQuoteStartPayload;

export const LOCAL_QUOTE_GREETINGS = {
  cl: 'Hola Chile',
  co: 'Hola Colombia',
  pe: 'Hola Perú',
} as const satisfies Record<TCountry, string>;

export interface LocalQuoteRequest<TCountryCode extends TCountry = TCountry> {
  country: TCountryCode;
}

export interface LocalQuoteResult<TCountryCode extends TCountry = TCountry> {
  country: TCountryCode;
  greeting: (typeof LOCAL_QUOTE_GREETINGS)[TCountryCode];
}
