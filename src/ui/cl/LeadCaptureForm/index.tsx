'use client';

import { useLeadCaptureForm } from './useLeadCaptureForm';
import { CheckBoxController, InputController } from '@/widgets/form-controls';
import { PRIVACY_POLICY_URL_BY_COUNTRY } from '@/config/constants/legalLinks';
import Link from 'next/link';
import { useState } from 'react';
import { Alert, Button, Switch } from 'tomaco-components';

const AGE_ERROR_MESSAGES = {
  OVERAGE:
    'Lamentamos informarte que superas el limite de edad para contratar este seguro. Para más información llámanos al +56 22 390 6542',
  UNDERAGE: 'Para contratar este seguro debes ser mayor de 18 años de edad.',
} as const;

const ClLeadCaptureForm = () => {
  const [isAdvisorAssisted, setIsAdvisorAssisted] = useState(false);
  const { ageValidationError, control, errors, formatPhone, handleSubmit, isSubmitting } =
    useLeadCaptureForm();

  const hasFieldErrors = !!Object.keys(errors).length;
  const showGlobalValidationError = hasFieldErrors && !ageValidationError;
  const showAgeValidationError = !hasFieldErrors && !!ageValidationError;

  return (
    <form className="d-flex flex-column w-100 gap-24" onSubmit={handleSubmit}>
      <div className="d-flex flex-column">
        <InputController
          control={control}
          errorText={errors.identificationDocument?.message}
          id="identificationDocument"
          isValid={!errors.identificationDocument?.message}
          labelText="RUT del asegurado"
          maxLength={14}
          name="identificationDocument"
          placeholder="Ej: 17.165.432-1"
        />
      </div>

      <div className="d-flex flex-column">
        <InputController
          control={control}
          errorText={errors.birthdate?.message}
          id="birthdate"
          isValid={!errors.birthdate?.message}
          labelText="Fecha de nacimiento"
          name="birthdate"
          placeholder="DD/MM/AAAA"
        />
      </div>

      <div className="d-flex flex-column">
        <InputController
          control={control}
          errorText={errors.email?.message}
          id="email"
          isValid={!errors.email?.message}
          labelText="Correo electronico"
          name="email"
          placeholder="Ej: nombre@dominio"
        />
      </div>

      <div className="d-flex flex-column">
        <InputController
          control={control}
          errorText={errors.phone?.message}
          id="phone"
          isValid={!errors.phone?.message}
          labelText="Telefono"
          maxLength={11}
          name="phone"
          placeholder="9 8765 4321"
          prefix="+56"
          transform={formatPhone}
        />
      </div>

      <div className="d-flex flex-column mt16">
        <CheckBoxController
          control={control}
          id="acceptedPrivacy"
          isValid={!errors.acceptedPrivacy?.message}
          name="acceptedPrivacy"
        >
          <span className="px-16 text-neutral60 line-height-1-5 letter-spacing-negative-16">
            Acepto que me contacten para terminar el proceso de contratacion del seguro segun la{' '}
            <Link
              className="text-avocado60 text-medium text-decoration-underline"
              href={PRIVACY_POLICY_URL_BY_COUNTRY.cl}
              rel="noopener noreferrer"
              target="_blank"
            >
              politica de privacidad
            </Link>
            .
          </span>
        </CheckBoxController>
      </div>

      <div className="d-flex align-items-center justify-content-between border br-8 pt16 pb16 pl16 pr16">
        <span className="px-16 text-neutral70 line-height-1-5">Estoy recibiendo ayuda de un asesor</span>
        <Switch
          checked={isAdvisorAssisted}
          id="advisor-assistance-cl"
          onChange={(event) => setIsAdvisorAssisted(event.target.checked)}
        />
      </div>

      {showAgeValidationError && ageValidationError && (
        <div className="d-flex flex-column gap-16">
          <Alert type="warning">{AGE_ERROR_MESSAGES[ageValidationError]}</Alert>
        </div>
      )}

      <Button
        className="w-100"
        loading={isSubmitting}
        onClick={() => void handleSubmit()}
        text="Continuar"
        type="button"
      />

      {showGlobalValidationError && (
        <div className="d-flex flex-column gap-16">
          <Alert type="warning">Completa la información solicitada para avanzar</Alert>
        </div>
      )}
    </form>
  );
};

export default ClLeadCaptureForm;
