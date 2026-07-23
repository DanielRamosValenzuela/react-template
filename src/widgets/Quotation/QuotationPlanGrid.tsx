import type { ReactNode } from 'react';

interface QuotationPlanGridProps<TPlan> {
  getPlanKey: (plan: TPlan) => string;
  plans: TPlan[];
  renderCard: (plan: TPlan, index: number) => ReactNode;
}

export const QuotationPlanGrid = <TPlan,>({
  getPlanKey,
  plans,
  renderCard,
}: QuotationPlanGridProps<TPlan>) => (
  <section className="col-12">
    <div className="quotation-grid row gx-0 gx-md-4 gy-4">
      {plans.map((plan, index) => (
        <div className="col-12 col-md-6 col-xl-4 d-flex" key={getPlanKey(plan)}>
          <div
            className="quotation-card w-100 card-fade-in"
            style={{ '--animation-order': index } as Record<string, string | number>}
          >
            {renderCard(plan, index)}
          </div>
        </div>
      ))}
    </div>
  </section>
);
