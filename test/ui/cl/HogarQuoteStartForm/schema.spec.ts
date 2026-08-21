import { expect, test } from '@playwright/test';

import {
  ADVISOR_CODE_ERROR,
  BIRTH_DATE_ERROR,
  EMAIL_ERROR,
  MOBILE_ERROR,
  RUT_ERROR,
  schema,
  UNDERAGE_ALERT,
  type HogarQuoteStartFormInput,
} from '@/ui/cl/HogarQuoteStartForm/schema';

const validInput: HogarQuoteStartFormInput = {
  advisorCode: '',
  birthDate: new Date(1990, 1, 3),
  consent: true,
  email: 'synthetic.user@example.com',
  hasAdvisor: false,
  phone: '912345678',
  rut: '10.000.030-K',
};

test('returns the approved field messages for empty Chile inputs', () => {
  const result = schema.safeParse({
    ...validInput,
    birthDate: null,
    consent: false,
    email: '',
    phone: '',
    rut: '',
  });

  expect(result.success).toBe(false);
  if (result.success) return;

  const messagesByPath = Object.fromEntries(
    result.error.issues.map((issue) => [issue.path.join('.'), issue.message]),
  );
  expect(messagesByPath).toMatchObject({
    birthDate: BIRTH_DATE_ERROR,
    email: EMAIL_ERROR,
    phone: MOBILE_ERROR,
    rut: RUT_ERROR,
  });
});

test('rejects future and underage dates with the approved warnings', () => {
  const futureResult = schema.safeParse({
    ...validInput,
    birthDate: new Date(new Date().getFullYear() + 1, 0, 1),
  });
  expect(futureResult.success).toBe(false);
  if (!futureResult.success) {
    expect(futureResult.error.issues).toContainEqual(
      expect.objectContaining({ message: BIRTH_DATE_ERROR, path: ['birthDate'] }),
    );
  }

  const today = new Date();
  const underageResult = schema.safeParse({
    ...validInput,
    birthDate: new Date(today.getFullYear() - 17, today.getMonth(), today.getDate()),
  });
  expect(underageResult.success).toBe(false);
  if (!underageResult.success) {
    expect(underageResult.error.issues).toContainEqual(
      expect.objectContaining({ message: UNDERAGE_ALERT, path: ['root', 'underage'] }),
    );
  }
});

test('requires a trimmed ASCII alphanumeric advisor code only when enabled', () => {
  const invalidAdvisorResult = schema.safeParse({
    ...validInput,
    advisorCode: ' código ',
    hasAdvisor: true,
  });
  expect(invalidAdvisorResult.success).toBe(false);
  if (!invalidAdvisorResult.success) {
    expect(invalidAdvisorResult.error.issues).toContainEqual(
      expect.objectContaining({ message: ADVISOR_CODE_ERROR, path: ['advisorCode'] }),
    );
  }

  expect(
    schema.safeParse({ ...validInput, advisorCode: '  AB12  ', hasAdvisor: true }).success,
  ).toBe(true);
  expect(
    schema.safeParse({ ...validInput, advisorCode: 'ignored', hasAdvisor: false }).success,
  ).toBe(true);
});