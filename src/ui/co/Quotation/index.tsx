'use client';

import { quotationPlans } from '@/mocks/co/quotation.mock';
import type { QuotationPlanMock } from '@/mocks/quotation.types';
import { useQuotationStore } from '@/store';
import { setFlowStep } from '@/utils/client/flowStep';
import { BackButton, QuotationNoResults, QuotationPlanGrid, SectionHeader } from '@/widgets';
import { useRouter } from 'next/navigation';
import { ProductCardFull } from 'tomaco-components';

const CoQuotation = () => {
  const { push } = useRouter();
  const { setValues } = useQuotationStore();

  const hirePlan = (plan: QuotationPlanMock) => {
    setValues({ selectedPlan: plan });
    setFlowStep('/cotizacion');
    push('/informacion-personal');
  };

  return (
    <main className="row">
      <SectionHeader icon="medicine" title="Selecciona tu plan" />

      {quotationPlans.length === 0 ? (
        <QuotationNoResults />
      ) : (
        <QuotationPlanGrid<QuotationPlanMock>
          getPlanKey={(plan) => plan.id}
          plans={quotationPlans}
          renderCard={(plan) => (
            <ProductCardFull
              cardInfo={plan.cardInfo}
              className="w-100"
              companyName={plan.companyName}
              currency={plan.currency}
              discount={plan.discount}
              insuranceIcon="medicine"
              localMontlyPrice={<div className="text-left">{plan.localMonthlyPrice}</div>}
              onClickHire={() => hirePlan(plan)}
              price={plan.price}
              promoTagText={plan.promoTagText}
              recomendedText={plan.recomendedText}
              showActions
              showMoreDetailsButton={false}
              showPromoTag={!!plan.promoTagText}
              showRecomended={!!plan.recomendedText}
              showValueTag={!plan.discount}
              subtitle={plan.subtitle}
              title={plan.title}
            />
          )}
        />
      )}

      <div className="col-12 mt40 max-width-736">
        <BackButton onBack={() => push('/')} />
      </div>
    </main>
  );
};

export default CoQuotation;
