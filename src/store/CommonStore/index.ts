import { commonConfig } from '@/config/environment';
import { FORM_NAMES, type TFormName } from '@/config/forms';
import type { TCountry } from '@/config/types';
import { browserSessionStorage } from '@/utils/client/sessionStorage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface CommonStoreValues {
  country: TCountry;
  currentForm: TFormName;
  traceId: string;
}

interface CommonStore extends CommonStoreValues {
  getValues: () => CommonStoreValues;
  hydrated: boolean;
  resetValues: () => void;
  setHydrated: (hydrated: boolean) => void;
  setValues: (values: Partial<CommonStoreValues>) => void;
}

const getDefaultValues = (): CommonStoreValues => ({
  country: commonConfig.country,
  currentForm: FORM_NAMES.HELLO,
  traceId: '',
});

const useZustandStore = create<CommonStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultValues(),
        getValues: () => {
          const state = get();
          const defaults = getDefaultValues();
          return Object.fromEntries(
            Object.entries(state).filter(([key]) => key in defaults),
          ) as CommonStoreValues;
        },
        hydrated: false,
        resetValues: () => set(getDefaultValues()),
        setHydrated: (hydrated) => set({ hydrated }),
        setValues: (values) => set(values),
      }),
      {
        name: 'falabella-common-store',
        onRehydrateStorage: () => (state) => state?.setHydrated(true),
        storage: createJSONStorage(() => browserSessionStorage),
      },
    ),
  ),
);

export const useCommonStore = () => {
  const { getValues, hydrated, resetValues, setHydrated, setValues } = useZustandStore();
  return { getValues, hydrated, resetValues, setHydrated, setValues };
};
