'use client';

import { FORM_NAMES, type TFormName } from '@/config/forms';
import { useQuotationStore } from '@/store';
import type { ReactNode } from 'react';

export interface SummarySectionItem {
  content: ReactNode;
  title: string;
}

const SUMMARY_SECTIONS_BY_STEP: Partial<Record<TFormName, TFormName[]>> = {
  [FORM_NAMES.PAYMENT]: [FORM_NAMES.QUOTATION],
};

export const useSummarySections = (step: TFormName): SummarySectionItem[] => {
  const { getValues: getQuotationValues } = useQuotationStore();
  const { selectedPlan } = getQuotationValues();

  const sectionsByStep: Partial<Record<TFormName, SummarySectionItem | null>> = {
    [FORM_NAMES.QUOTATION]: selectedPlan && {
      content: (
        <div className="d-flex flex-column gap-8">
          {selectedPlan.cardInfo.map((item) => (
            <div className="d-flex justify-content-between gap-16" key={item.title}>
              <span className="text-neutral60">{item.title}</span>
              <span className="text-neutral80">{item.detail}</span>
            </div>
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
