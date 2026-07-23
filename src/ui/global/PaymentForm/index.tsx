'use client';

import { FORM_NAMES } from '@/config/forms';
import { PlanSummary, SectionHeader, StepActions, StepLayout } from '@/widgets';
import { useRouter } from 'next/navigation';
import { Alert, PaymentMethod } from 'tomaco-components';
import { usePaymentForm } from './usePaymentForm';

const PaymentForm = () => {
  const { push } = useRouter();
  const { confirmPayment, isConfirmed, methods, selectedMethodId, selectMethod } = usePaymentForm();

  return (
    <StepLayout
      header={<SectionHeader icon="medicine" title="Selecciona tu método de pago" />}
      summary={<PlanSummary step={FORM_NAMES.PAYMENT} />}
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

      <div className="mt40 max-width-736">
        <StepActions
          continueText="Pagar"
          disabled={!selectedMethodId}
          onBack={() => push('/informacion-personal')}
          onContinue={confirmPayment}
        />
      </div>
    </StepLayout>
  );
};

export default PaymentForm;
