import { expect, test } from '@playwright/test';

import {
  LOCAL_QUOTE_GREETINGS,
  type LocalQuoteRequest,
  type LocalQuoteResult,
} from '@/contracts';
import { quoteLocally } from '@/mocks/global/hogar/quoteLocally';
import { buildClHogarQuoteStartPayload } from '@/ui/cl/HogarQuoteStartForm/useHogarQuoteStartForm';
import type { HogarQuoteStartFormValues } from '@/ui/cl/HogarQuoteStartForm/schema';

const validValues: HogarQuoteStartFormValues = {
  advisorCode: '  AB12  ',
  birthDate: new Date(1990, 1, 3),
  consent: true,
  email: '  SYNTHETIC.USER@EXAMPLE.COM  ',
  hasAdvisor: true,
  phone: '+56 9 1234-5678',
  rut: '10.000.030-k',
};

test('builds the normalized Chile in-memory payload with a trimmed advisor code', () => {
  expect(buildClHogarQuoteStartPayload(validValues)).toEqual({
    advisorCode: 'AB12',
    birthDate: '1990-02-03',
    consent: true,
    country: 'cl',
    email: 'synthetic.user@example.com',
    phone: '+56912345678',
    rut: '10000030-K',
  });
});

test('omits advisorCode when advisor assistance is disabled', () => {
  const payload = buildClHogarQuoteStartPayload({
    ...validValues,
    hasAdvisor: false,
  });

  expect(payload).not.toHaveProperty('advisorCode');
});

test('quotes locally with country-only requests and exact country greetings', async () => {
  const requests = [
    { country: 'cl' },
    { country: 'co' },
    { country: 'pe' },
  ] as const satisfies readonly LocalQuoteRequest[];

  expect(requests.map((request) => Object.keys(request))).toEqual([
    ['country'],
    ['country'],
    ['country'],
  ]);

  const results: LocalQuoteResult[] = await Promise.all(requests.map(quoteLocally));

  expect(LOCAL_QUOTE_GREETINGS).toEqual({
    cl: 'Hola Chile',
    co: 'Hola Colombia',
    pe: 'Hola Perú',
  });
  expect(results).toEqual([
    { country: 'cl', greeting: 'Hola Chile' },
    { country: 'co', greeting: 'Hola Colombia' },
    { country: 'pe', greeting: 'Hola Perú' },
  ]);
});