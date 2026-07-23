'use client';

import { usePersonalInfoForm } from './usePersonalInfoForm';
import { FORM_NAMES } from '@/config/forms';
import { useLeadCaptureStore } from '@/store';
import {
  FormSection,
  PlanSummary,
  ReadOnlyCard,
  SectionHeader,
  StepActions,
  StepLayout,
} from '@/widgets';
import { CheckBoxController, InputController } from '@/widgets/form-controls';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ClPersonalInfoForm = () => {
  const { push } = useRouter();
  const { control, errors, handleSubmit, isSubmitting } = usePersonalInfoForm();
  const { getValues: getLeadCaptureValues } = useLeadCaptureStore();
  const { birthdate, identificationDocument } = getLeadCaptureValues();

  return (
    <StepLayout
      header={<SectionHeader icon="medicine" title="Completa tus datos personales" />}
      summary={<PlanSummary step={FORM_NAMES.PERSONAL_INFO} />}
    >
      <form
        className="starter-card-layout br-8 d-flex flex-column bg-white shadow-soft gap-40"
        onSubmit={handleSubmit}
      >
        <FormSection title="Datos del asegurado">
          <ReadOnlyCard
            fields={[
              { label: 'RUT del asegurado', value: identificationDocument },
              { label: 'Fecha de nacimiento', value: birthdate },
            ]}
          />

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
        </FormSection>

        <FormSection title="Dirección">
          <div className="d-flex flex-column">
            <InputController
              control={control}
              errorText={errors.addressStreet?.message}
              id="addressStreet"
              isValid={!errors.addressStreet?.message}
              labelText="Calle"
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
        </FormSection>

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

export default ClPersonalInfoForm;
