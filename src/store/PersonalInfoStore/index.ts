import { browserSessionStorage } from '@/utils/client/sessionStorage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface PersonalInfoStoreValues {
  acceptedTerms: boolean;
  addressNumber: string;
  addressStreet: string;
  firstName: string;
  lastName: string;
}

interface PersonalInfoStore extends PersonalInfoStoreValues {
  getValues: () => PersonalInfoStoreValues;
  hydrated: boolean;
  resetValues: () => void;
  setHydrated: (hydrated: boolean) => void;
  setValues: (values: Partial<PersonalInfoStoreValues>) => void;
}

const getDefaultValues = (): PersonalInfoStoreValues => ({
  acceptedTerms: false,
  addressNumber: '',
  addressStreet: '',
  firstName: '',
  lastName: '',
});

const useZustandStore = create<PersonalInfoStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultValues(),
        getValues: () => {
          const state = get();
          const defaults = getDefaultValues();
          return Object.fromEntries(
            Object.entries(state).filter(([key]) => key in defaults),
          ) as PersonalInfoStoreValues;
        },
        hydrated: false,
        resetValues: () => set(getDefaultValues()),
        setHydrated: (hydrated) => set({ hydrated }),
        setValues: (values) => set(values),
      }),
      {
        name: 'falabella-personal-info-store',
        onRehydrateStorage: () => (state) => state?.setHydrated(true),
        storage: createJSONStorage(() => browserSessionStorage),
      },
    ),
  ),
);

export const usePersonalInfoStore = () => {
  const { getValues, hydrated, resetValues, setHydrated, setValues } = useZustandStore();
  return { getValues, hydrated, resetValues, setHydrated, setValues };
};
