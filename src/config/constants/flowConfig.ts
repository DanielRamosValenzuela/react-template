import { FORM_NAMES, type TFormName } from '@/config/forms';
import type { TCountry } from '@/config/types';

export const FLOW_STEP_COOKIE = 'falabella-starter-flow-step';

export interface FlowStep {
  formName: TFormName;
  label: string;
  path: string;
}

export const FLOW_STEPS_BY_COUNTRY: Record<TCountry, FlowStep[]> = {
  cl: [
    { formName: FORM_NAMES.LEAD_CAPTURE, label: 'Captura de lead', path: '/' },
    { formName: FORM_NAMES.QUOTATION, label: 'Cotizacion', path: '/cotizacion' },
    { formName: FORM_NAMES.PAYMENT, label: 'Pago', path: '/pago' },
  ],
  co: [
    { formName: FORM_NAMES.LEAD_CAPTURE, label: 'Captura de lead', path: '/' },
    { formName: FORM_NAMES.QUOTATION, label: 'Cotizacion', path: '/cotizacion' },
    { formName: FORM_NAMES.PAYMENT, label: 'Pago', path: '/pago' },
  ],
  pe: [
    { formName: FORM_NAMES.LEAD_CAPTURE, label: 'Captura de lead', path: '/' },
    { formName: FORM_NAMES.QUOTATION, label: 'Cotizacion', path: '/cotizacion' },
    { formName: FORM_NAMES.PAYMENT, label: 'Pago', path: '/pago' },
  ],
};

export const getInitialFormByCountry = (country: TCountry): TFormName =>
  FLOW_STEPS_BY_COUNTRY[country][0]?.formName ?? FORM_NAMES.LEAD_CAPTURE;
