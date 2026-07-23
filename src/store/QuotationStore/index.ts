import type { QuotationPlanMock } from '@/mocks/quotation.types';
import { browserSessionStorage } from '@/utils/client/sessionStorage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface QuotationStoreValues {
  selectedPlan: QuotationPlanMock | null;
}

interface QuotationStore extends QuotationStoreValues {
  getValues: () => QuotationStoreValues;
  hydrated: boolean;
  resetValues: () => void;
  setHydrated: (hydrated: boolean) => void;
  setValues: (values: Partial<QuotationStoreValues>) => void;
}

const getDefaultValues = (): QuotationStoreValues => ({
  selectedPlan: null,
});

const useZustandStore = create<QuotationStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultValues(),
        getValues: () => {
          const state = get();
          const defaults = getDefaultValues();
          return Object.fromEntries(
            Object.entries(state).filter(([key]) => key in defaults),
          ) as QuotationStoreValues;
        },
        hydrated: false,
        resetValues: () => set(getDefaultValues()),
        setHydrated: (hydrated) => set({ hydrated }),
        setValues: (values) => set(values),
      }),
      {
        name: 'falabella-quotation-store',
        onRehydrateStorage: () => (state) => state?.setHydrated(true),
        storage: createJSONStorage(() => browserSessionStorage),
      },
    ),
  ),
);

export const useQuotationStore = () => {
  const { getValues, hydrated, resetValues, setHydrated, setValues } = useZustandStore();
  return { getValues, hydrated, resetValues, setHydrated, setValues };
};
