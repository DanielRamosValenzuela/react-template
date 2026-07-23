import { browserSessionStorage } from '@/utils/client/sessionStorage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface PaymentStoreValues {
  selectedMethodId: string;
}

interface PaymentStore extends PaymentStoreValues {
  getValues: () => PaymentStoreValues;
  hydrated: boolean;
  resetValues: () => void;
  setHydrated: (hydrated: boolean) => void;
  setValues: (values: Partial<PaymentStoreValues>) => void;
}

const getDefaultValues = (): PaymentStoreValues => ({
  selectedMethodId: '',
});

const useZustandStore = create<PaymentStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultValues(),
        getValues: () => {
          const state = get();
          const defaults = getDefaultValues();
          return Object.fromEntries(
            Object.entries(state).filter(([key]) => key in defaults),
          ) as PaymentStoreValues;
        },
        hydrated: false,
        resetValues: () => set(getDefaultValues()),
        setHydrated: (hydrated) => set({ hydrated }),
        setValues: (values) => set(values),
      }),
      {
        name: 'falabella-payment-store',
        onRehydrateStorage: () => (state) => state?.setHydrated(true),
        storage: createJSONStorage(() => browserSessionStorage),
      },
    ),
  ),
);

export const usePaymentStore = () => {
  const { getValues, hydrated, resetValues, setHydrated, setValues } = useZustandStore();
  return { getValues, hydrated, resetValues, setHydrated, setValues };
};
