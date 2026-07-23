'use client';

import { FORM_NAMES, type TFormName } from '@/config/forms';
import { usePersonalInfoStore, useQuotationStore } from '@/store';
import DetailRow from '../DetailRow';
import type { ReactNode } from 'react';

export interface SummarySectionItem {
  content: ReactNode;
  title: string;
}

const SUMMARY_SECTIONS_BY_STEP: Partial<Record<TFormName, TFormName[]>> = {
  [FORM_NAMES.PAYMENT]: [FORM_NAMES.QUOTATION, FORM_NAMES.PERSONAL_INFO],
  [FORM_NAMES.PERSONAL_INFO]: [FORM_NAMES.QUOTATION],
};

export const useSummarySections = (step: TFormName): SummarySectionItem[] => {
  const { getValues: getQuotationValues } = useQuotationStore();
  const { selectedPlan } = getQuotationValues();
  const { getValues: getPersonalInfoValues } = usePersonalInfoStore();
  const { addressNumber, addressStreet, firstName, lastName } = getPersonalInfoValues();

  const sectionsByStep: Partial<Record<TFormName, SummarySectionItem | null>> = {
    [FORM_NAMES.PERSONAL_INFO]: firstName
      ? {
          content: (
            <div className="d-flex flex-column gap-8">
              <DetailRow label="Nombre" value={`${firstName} ${lastName}`} />
              <DetailRow label="Direccion" value={`${addressStreet} ${addressNumber}`} />
            </div>
          ),
          title: 'Datos del asegurado',
        }
      : null,
    [FORM_NAMES.QUOTATION]: selectedPlan && {
      content: (
        <div className="d-flex flex-column gap-8">
          {selectedPlan.cardInfo.map((item) => (
            <DetailRow key={item.title} label={item.title} value={item.detail} />
          ))}
        </div>
      ),
      title: 'Detalle del seguro',
    },
  };

  const contributingSteps = SUMMARY_SECTIONS_BY_STEP[step] ?? [];

  return contributingSteps
    .map((contributingStep) => sectionsByStep[contributingStep])
    .filter((section): section is SummarySectionItem => Boolean(section));
};
