import type { HogarQuoteStartStoreValues, LocalQuoteResult } from '@/contracts';
import { create } from 'zustand';

export interface HogarQuoteStartStore {
  clear: () => void;
  pending: boolean;
  result: LocalQuoteResult | null;
  setPending: (pending: boolean) => void;
  setResult: (result: LocalQuoteResult | null) => void;
  setValues: (values: HogarQuoteStartStoreValues) => void;
  values: HogarQuoteStartStoreValues | null;
}

const initialState = {
  pending: false,
  result: null,
  values: null,
} satisfies Pick<HogarQuoteStartStore, 'pending' | 'result' | 'values'>;

export const useHogarQuoteStartStore = create<HogarQuoteStartStore>()((set) => ({
  ...initialState,
  clear: () => set(initialState),
  setPending: (pending) => set({ pending }),
  setResult: (result) => set({ result }),
  setValues: (values) => set({ values }),
}));
