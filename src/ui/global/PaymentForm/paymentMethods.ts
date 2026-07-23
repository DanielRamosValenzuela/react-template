import type { TCountry } from '@/config/types';

const TOMACO_PAYMENT_ASSETS_URL =
  'https://sfestaticos.blob.core.windows.net/tomaco-ui/imgs/payment';

export interface PaymentMethodOption {
  cardName: string;
  id: string;
  image?: string;
}

const PAYMENT_METHODS_BY_COUNTRY: Record<TCountry, PaymentMethodOption[]> = {
  cl: [
    { cardName: 'Webpay', id: 'webpay', image: `${TOMACO_PAYMENT_ASSETS_URL}/webpay-icon.svg` },
    {
      cardName: 'CMR Falabella',
      id: 'cmr',
      image: `${TOMACO_PAYMENT_ASSETS_URL}/cmr-falebella-icon.svg`,
    },
  ],
  co: [
    { cardName: 'PSE', id: 'pse' },
    {
      cardName: 'Tarjeta de crédito',
      id: 'credit-card',
      image: `${TOMACO_PAYMENT_ASSETS_URL}/credito-icon.svg`,
    },
  ],
  pe: [
    {
      cardName: 'Tarjeta de crédito',
      id: 'credit-card',
      image: `${TOMACO_PAYMENT_ASSETS_URL}/credito-icon.svg`,
    },
    { cardName: 'Yape', id: 'yape' },
  ],
};

export const getPaymentMethodsByCountry = (country: TCountry): PaymentMethodOption[] =>
  PAYMENT_METHODS_BY_COUNTRY[country];
