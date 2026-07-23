'use client';

import { FORM_NAMES } from '@/config/forms';
import { useQuotationStore } from '@/store';
import { BackButton, SectionHeader, StepLayout, Summary, useSummarySections } from '@/widgets';
import { useRouter } from 'next/navigation';
import { Alert, Button, PaymentMethod } from 'tomaco-components';
import { usePaymentForm } from './usePaymentForm';

const PaymentForm = () => {
  const { push } = useRouter();
  const { confirmPayment, isConfirmed, methods, selectedMethodId, selectMethod } = usePaymentForm();
  const { getValues: getQuotationValues } = useQuotationStore();
  const { selectedPlan } = getQuotationValues();
  const summaryAccoItems = useSummarySections(FORM_NAMES.PAYMENT);

  return (
    <StepLayout
      header={<SectionHeader icon="medicine" title="Selecciona tu método de pago" />}
      summary={
        selectedPlan && (
          <Summary
            accoItems={summaryAccoItems}
            badge={!!selectedPlan.promoTagText}
            badgeText={selectedPlan.promoTagText}
            legal={selectedPlan.discount}
            price={`${selectedPlan.currency}${selectedPlan.price}`}
            priceDetail={selectedPlan.localMonthlyPrice}
            title={selectedPlan.title}
          />
        )
      }
    >
      <div className="d-flex flex-column gap-16 mb24 max-width-736">
        {methods.map((method) => (
          <PaymentMethod
            cardName={method.cardName}
            checkedId={selectedMethodId}
            id={method.id}
            image={method.image}
            key={method.id}
            onChange={() => selectMethod(method.id)}
          />
        ))}
      </div>

      {isConfirmed && (
        <Alert className="mb24 max-width-736" type="positive">
          Pago simulado correctamente con{' '}
          {methods.find((method) => method.id === selectedMethodId)?.cardName}. Este flujo aún no
          está conectado a una pasarela real.
        </Alert>
      )}

      <div className="d-flex flex-column gap-16 max-width-736">
        <Button
          disabled={!selectedMethodId}
          onClick={confirmPayment}
          text="Pagar"
          type="button"
          variant="primary"
        />
      </div>

      <div className="mt40 max-width-736">
        <BackButton onBack={() => push('/cotizacion')} />
      </div>
    </StepLayout>
  );
};

export default PaymentForm;
