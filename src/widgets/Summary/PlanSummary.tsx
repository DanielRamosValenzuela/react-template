'use client';

import type { TFormName } from '@/config/forms';
import { useQuotationStore } from '@/store';
import { Summary } from './Summary';
import { useSummarySections } from './summarySections';

interface PlanSummaryProps {
  step: TFormName;
}

export const PlanSummary = ({ step }: PlanSummaryProps) => {
  const { getValues: getQuotationValues } = useQuotationStore();
  const { selectedPlan } = getQuotationValues();
  const accoItems = useSummarySections(step);

  if (!selectedPlan) return null;

  return (
    <Summary
      accoItems={accoItems}
      badge={!!selectedPlan.promoTagText}
      badgeText={selectedPlan.promoTagText}
      legal={selectedPlan.discount}
      price={`${selectedPlan.currency}${selectedPlan.price}`}
      priceDetail={selectedPlan.localMonthlyPrice}
      title={selectedPlan.title}
    />
  );
};
