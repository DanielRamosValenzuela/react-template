import { expect, test } from '@playwright/test';

import {
  calculateChileanRutCheckDigit,
  formatChileanRut,
  hasCompletedAge,
  isAtLeast18YearsOld,
  isFutureLocalDate,
  isValidChileanMobile,
  isValidChileanRut,
  normalizeChileanMobile,
  normalizeChileanRut,
  serializeLocalDate,
  toChileanInternationalMobile,
} from '@/utils/functions';

test('validates Chilean RUTs with modulus 11, including check digit K and punctuation', () => {
  expect(calculateChileanRutCheckDigit('10000030')).toBe('K');
  expect(isValidChileanRut('10.000.030-k')).toBe(true);
  expect(isValidChileanRut('10000030-K')).toBe(true);
  expect(isValidChileanRut('10.000.030-0')).toBe(false);
  expect(normalizeChileanRut(' 10.000.030-k ')).toBe('10000030-K');
  expect(formatChileanRut('10000030k')).toBe('10.000.030-K');
});

test('normalizes pasted Chilean mobile numbers for display and the local payload', () => {
  const pastedMobile = '+56 9 1234-5678';

  expect(isValidChileanMobile(pastedMobile)).toBe(true);
  expect(normalizeChileanMobile(pastedMobile)).toBe('912345678');
  expect(toChileanInternationalMobile(pastedMobile)).toBe('+56912345678');
  expect(isValidChileanMobile('+56 2 1234-5678')).toBe(false);
});

test('serializes local date parts without converting through UTC', () => {
  const lateLocalTime = new Date(2024, 2, 10, 23, 45, 0);

  expect(serializeLocalDate(lateLocalTime)).toBe('2024-03-10');
});

test('accepts the exact 18th birthday and rejects underage and future dates', () => {
  const today = new Date(2026, 7, 20, 12, 0, 0);

  expect(isAtLeast18YearsOld(new Date(2008, 7, 20), today)).toBe(true);
  expect(isAtLeast18YearsOld(new Date(2008, 7, 21), today)).toBe(false);
  expect(hasCompletedAge(new Date(2008, 7, 20), 18, today)).toBe(true);
  expect(isFutureLocalDate(new Date(2026, 7, 21), today)).toBe(true);
  expect(isAtLeast18YearsOld(new Date(2027, 0, 1), today)).toBe(false);
});

test('handles leap-day age boundaries using local calendar parts', () => {
  const leapDayBirthDate = new Date(2008, 1, 29);

  expect(isAtLeast18YearsOld(leapDayBirthDate, new Date(2026, 1, 28))).toBe(false);
  expect(isAtLeast18YearsOld(leapDayBirthDate, new Date(2026, 2, 1))).toBe(true);
});