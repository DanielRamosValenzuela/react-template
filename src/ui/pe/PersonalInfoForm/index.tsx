'use client';

import { usePersonalInfoForm } from './usePersonalInfoForm';
import { FORM_NAMES } from '@/config/forms';
import { useLeadCaptureStore, useQuotationStore } from '@/store';
import { SectionHeader, StepActions, StepLayout, Summary, useSummarySections } from '@/widgets';
import { CheckBoxController, InputController } from '@/widgets/form-controls';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PePersonalInfoForm = () => {
  const { push } = useRouter();
  const { control, errors, handleSubmit, isSubmitting } = usePersonalInfoForm();
  const { getValues: getLeadCaptureValues } = useLeadCaptureStore();
  const { birthdate, identificationDocument } = getLeadCaptureValues();
  const { getValues: getQuotationValues } = useQuotationStore();
  const { selectedPlan } = getQuotationValues();
  const summaryAccoItems = useSummarySections(FORM_NAMES.PERSONAL_INFO);

  return (
    <StepLayout
      header={<SectionHeader icon="medicine" title="Completa tus datos personales" />}
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
      <form
        className="starter-card-layout br-8 d-flex flex-column bg-white shadow-soft gap-40"
        onSubmit={handleSubmit}
      >
        <div className="d-flex flex-column gap-16">
          <div className="border-bottom-green pb16">
            <p className="px-20 text-semibold letter-spacing-negative-18 line-height-1-5">
              Datos del asegurado
            </p>
          </div>

          <div className="d-flex flex-column gap-8 border br-8 pt24 pb24 pl16 pr16">
            <div className="d-flex justify-content-between gap-16">
              <span className="text-neutral60">DNI del asegurado</span>
              <span className="text-neutral80">{identificationDocument}</span>
            </div>
            <div className="d-flex justify-content-between gap-16">
              <span className="text-neutral60">Fecha de nacimiento</span>
              <span className="text-neutral80">{birthdate}</span>
            </div>
          </div>

          <div className="d-flex flex-column">
            <InputController
              control={control}
              errorText={errors.firstName?.message}
              id="firstName"
              isValid={!errors.firstName?.message}
              labelText="Nombre"
              name="firstName"
            />
          </div>

          <div className="d-flex flex-column">
            <InputController
              control={control}
              errorText={errors.lastName?.message}
              id="lastName"
              isValid={!errors.lastName?.message}
              labelText="Apellido"
              name="lastName"
            />
          </div>
        </div>

        <div className="d-flex flex-column gap-16">
          <div className="border-bottom-green pb16">
            <p className="px-20 text-semibold letter-spacing-negative-18 line-height-1-5">
              Dirección
            </p>
          </div>

          <div className="d-flex flex-column">
            <InputController
              control={control}
              errorText={errors.addressStreet?.message}
              id="addressStreet"
              isValid={!errors.addressStreet?.message}
              labelText="Direccion"
              name="addressStreet"
            />
          </div>

          <div className="d-flex flex-column">
            <InputController
              control={control}
              errorText={errors.addressNumber?.message}
              id="addressNumber"
              isValid={!errors.addressNumber?.message}
              labelText="Numero"
              name="addressNumber"
            />
          </div>
        </div>

        <CheckBoxController
          control={control}
          id="acceptedTerms"
          isValid={!errors.acceptedTerms?.message}
          name="acceptedTerms"
        >
          <span className="px-16 text-neutral60 line-height-1-5 letter-spacing-negative-16">
            Acepto los{' '}
            <Link className="text-avocado60 text-decoration-underline" href="#">
              terminos y condiciones
            </Link>
            .
          </span>
        </CheckBoxController>

        <StepActions
          loading={isSubmitting}
          onBack={() => push('/cotizacion')}
          onContinue={() => void handleSubmit()}
        />
      </form>
    </StepLayout>
  );
};

export default PePersonalInfoForm;
