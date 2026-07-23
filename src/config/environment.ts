import { isCountry, type PublicConfig, type TCountry, type TEnvironment } from './types';

const resolveCountry = (): TCountry => {
  const country = process.env.COUNTRY ?? process.env.NEXT_PUBLIC_COUNTRY;
  return isCountry(country) ? country : 'cl';
};

const resolveEnvironment = (): TEnvironment => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT?.toLowerCase();
  if (environment === 'qa' || environment === 'prod') return environment;
  return 'local';
};

export const commonConfig: PublicConfig = {
  country: resolveCountry(),
  environment: resolveEnvironment(),
  productCode: process.env.NEXT_PUBLIC_PRODUCT_CODE ?? 'insurance-starter',
  productName: process.env.NEXT_PUBLIC_PRODUCT_NAME ?? 'Producto de seguros',
};