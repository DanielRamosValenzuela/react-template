'use client';

import { useLeadCaptureForm } from './useLeadCaptureForm';
import { CheckBoxController, InputController } from '@/widgets/form-controls';
import Link from 'next/link';
import { Alert, Button } from 'tomaco-components';

const PeLeadCaptureForm = () => {
  const { control, errors, formatPhone, handleSubmit, isSubmitting } = useLeadCaptureForm();

  return (
    <form className="d-flex flex-column w-100 gap-24" onSubmit={handleSubmit}>
      <div className="d-flex flex-column">
        <InputController
          control={control}
          errorText={errors.identificationDocument?.message}
          id="identificationDocument"
          isValid={!errors.identificationDocument?.message}
          labelText="DNI del asegurado"
          maxLength={14}
          name="identificationDocument"
          placeholder="Ej: 12345678"
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
          prefix="+51"
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
            <Link className="text-avocado60 text-medium text-decoration-underline" href="#">
              politica de privacidad
            </Link>
            .
          </span>
        </CheckBoxController>
      </div>

      {!!Object.keys(errors).length && (
        <div className="d-flex flex-column gap-16">
          {!!errors.acceptedPrivacy?.message && (
            <Alert type="warning">{errors.acceptedPrivacy.message}</Alert>
          )}
        </div>
      )}

      <Button
        className="w-100"
        loading={isSubmitting}
        onClick={() => void handleSubmit()}
        text="Continuar"
        type="button"
      />
    </form>
  );
};

export default PeLeadCaptureForm;
