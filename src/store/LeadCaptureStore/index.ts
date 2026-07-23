import { browserSessionStorage } from '@/utils/client/sessionStorage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface LeadCaptureStoreValues {
  acceptedPrivacy: boolean;
  advisorCode: string;
  birthdate: string;
  documentType: string;
  email: string;
  identificationDocument: string;
  phone: string;
}

interface LeadCaptureStore extends LeadCaptureStoreValues {
  getValues: () => LeadCaptureStoreValues;
  hydrated: boolean;
  resetValues: () => void;
  setHydrated: (hydrated: boolean) => void;
  setValues: (values: Partial<LeadCaptureStoreValues>) => void;
}

const getDefaultValues = (): LeadCaptureStoreValues => ({
  acceptedPrivacy: false,
  advisorCode: '',
  birthdate: '',
  documentType: 'RUT',
  email: '',
  identificationDocument: '',
  phone: '',
});

const useZustandStore = create<LeadCaptureStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultValues(),
        getValues: () => {
          const state = get();
          const defaults = getDefaultValues();
          return Object.fromEntries(
            Object.entries(state).filter(([key]) => key in defaults),
          ) as LeadCaptureStoreValues;
        },
        hydrated: false,
        resetValues: () => set(getDefaultValues()),
        setHydrated: (hydrated) => set({ hydrated }),
        setValues: (values) => set(values),
      }),
      {
        name: 'falabella-lead-capture-store',
        onRehydrateStorage: () => (state) => state?.setHydrated(true),
        storage: createJSONStorage(() => browserSessionStorage),
      },
    ),
  ),
);

export const useLeadCaptureStore = () => {
  const { getValues, hydrated, resetValues, setHydrated, setValues } = useZustandStore();
  return { getValues, hydrated, resetValues, setHydrated, setValues };
};
