import type { TCountry } from '@/config/types';

import { normalizeChileanMobile, normalizeChileanRut } from './formatters';

const CHILEAN_RUT_PATTERN = /^(?:\d{7,8}|\d{1,2}(?:\.\d{3}){2})-[0-9Kk]$/;

export const calculateChileanRutCheckDigit = (body: string): string | null => {
  if (!/^\d{7,8}$/.test(body)) return null;

  let sum = 0;
  let multiplier = 2;

  for (let index = body.length - 1; index >= 0; index -= 1) {
    sum += Number(body[index]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);
  if (remainder === 11) return '0';
  if (remainder === 10) return 'K';
  return String(remainder);
};

export const isValidChileanRut = (value: string): boolean => {
  const trimmedValue = value.trim();
  if (!CHILEAN_RUT_PATTERN.test(trimmedValue)) return false;

  const [body, checkDigit] = normalizeChileanRut(trimmedValue).split('-');
  return calculateChileanRutCheckDigit(body) === checkDigit;
};

export const isValidChileanMobile = (value: string): boolean => {
  const compactValue = value.trim().replace(/[\s-]/g, '');
  return /^(?:\+?56)?9\d{8}$/.test(compactValue) && /^9\d{8}$/.test(normalizeChileanMobile(value));
};

export const isValidLocalDate = (value: unknown): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime());

export const isFutureLocalDate = (value: Date, today = new Date()): boolean => {
  const valueParts = [value.getFullYear(), value.getMonth(), value.getDate()];
  const todayParts = [today.getFullYear(), today.getMonth(), today.getDate()];

  for (let index = 0; index < valueParts.length; index += 1) {
    if (valueParts[index] !== todayParts[index]) return valueParts[index] > todayParts[index];
  }

  return false;
};

export const hasCompletedAge = (birthDate: Date, age: number, today = new Date()): boolean => {
  if (!isValidLocalDate(birthDate) || isFutureLocalDate(birthDate, today)) return false;

  const birthdayHasPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  const completedYears =
    today.getFullYear() - birthDate.getFullYear() - (birthdayHasPassed ? 0 : 1);

  return completedYears >= age;
};

export const isAtLeast18YearsOld = (birthDate: Date, today = new Date()): boolean =>
  hasCompletedAge(birthDate, 18, today);

export const isValidDocumentByCountry = (country: TCountry, value: string): boolean => {
  if (country === 'cl') return isValidChileanRut(value);

  const cleanValue = value.replace(/[.\-\s]/g, '');

  if (country === 'pe') return /^\d{8,9}$/.test(cleanValue);
  return /^\d{6,10}$/.test(cleanValue);
};

export const isValidPhone = isValidChileanMobile;
