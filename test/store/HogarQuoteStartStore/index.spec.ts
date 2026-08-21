import { expect, test } from '@playwright/test';

import type { ClHogarQuoteStartPayload } from '@/contracts';
import type { useHogarQuoteStartStore as StoreHook } from '@/store/HogarQuoteStartStore';

const syntheticPayload: ClHogarQuoteStartPayload = {
  birthDate: '1990-02-03',
  consent: true,
  country: 'cl',
  email: 'synthetic.user@example.com',
  phone: '+56912345678',
  rut: '10000030-K',
};

let useHogarQuoteStartStore: typeof StoreHook;

test.describe.configure({ mode: 'serial' });

test('does not read or write localStorage/sessionStorage or hydrate persist middleware', async () => {
  const accesses = {
    localReads: 0,
    localWrites: 0,
    sessionReads: 0,
    sessionWrites: 0,
  };
  const storage = (scope: 'local' | 'session'): Storage => ({
    clear: () => undefined,
    getItem: () => {
      accesses[`${scope}Reads`] += 1;
      return null;
    },
    key: () => null,
    length: 0,
    removeItem: () => undefined,
    setItem: () => {
      accesses[`${scope}Writes`] += 1;
    },
  });

  Object.defineProperties(globalThis, {
    localStorage: { configurable: true, value: storage('local') },
    sessionStorage: { configurable: true, value: storage('session') },
  });

  ({ useHogarQuoteStartStore } = await import('@/store/HogarQuoteStartStore'));
  const state = useHogarQuoteStartStore.getState();
  state.setValues(syntheticPayload);
  state.setPending(true);
  state.setResult({ country: 'cl', greeting: 'Hola Chile' });
  state.clear();

  expect(accesses).toEqual({
    localReads: 0,
    localWrites: 0,
    sessionReads: 0,
    sessionWrites: 0,
  });

  Reflect.deleteProperty(globalThis, 'localStorage');
  Reflect.deleteProperty(globalThis, 'sessionStorage');
});

test('sets and gets payload, result, and pending state, then clears all values', () => {
  useHogarQuoteStartStore.getState().clear();

  useHogarQuoteStartStore.getState().setValues(syntheticPayload);
  useHogarQuoteStartStore.getState().setPending(true);
  useHogarQuoteStartStore.getState().setResult({ country: 'cl', greeting: 'Hola Chile' });

  expect(useHogarQuoteStartStore.getState()).toMatchObject({
    pending: true,
    result: { country: 'cl', greeting: 'Hola Chile' },
    values: syntheticPayload,
  });

  useHogarQuoteStartStore.getState().clear();
  expect(useHogarQuoteStartStore.getState()).toMatchObject({
    pending: false,
    result: null,
    values: null,
  });
});