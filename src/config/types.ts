export const COUNTRIES = ['cl', 'co', 'pe'] as const;

export type TCountry = (typeof COUNTRIES)[number];

export type TEnvironment = 'local' | 'qa' | 'prod';

export interface PublicConfig {
  country: TCountry;
  environment: TEnvironment;
}

export const isCountry = (value: string | undefined): value is TCountry =>
  COUNTRIES.includes(value as TCountry);
