import type { TCountry } from '@/config/types';

export const isValidDocumentByCountry = (country: TCountry, value: string): boolean => {
  const cleanValue = value.replace(/[.\-\s]/g, '');

  if (country === 'cl') return /^\d{7,8}[0-9Kk]$/.test(cleanValue);
  if (country === 'pe') return /^\d{8,9}$/.test(cleanValue);
  return /^\d{6,10}$/.test(cleanValue);
};

export const isValidPhone = (value: string): boolean => /^9\d{8}$/.test(value.replace(/\D/g, ''));