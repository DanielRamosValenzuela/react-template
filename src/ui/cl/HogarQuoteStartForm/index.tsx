'use client';

import type { TCountry } from '@/config/types';
import { formatChileanRut, normalizeChileanMobile } from '@/utils/functions';
import {
  CheckBoxController,
  InputController,
  InputDateController,
  SwitchController,
} from '@/widgets/form-controls';
import { useState } from 'react';
import { Alert, Button, Tooltip } from 'tomaco-components';

import MoreInformationDialog from './MoreInformationDialog';
import { useHogarQuoteStartForm } from './useHogarQuoteStartForm';

export interface HogarQuoteStartFormProps {
  country: TCountry;
}

const ADVISOR_TOOLTIP_COPY =
  'Código de asesor: Si estás siendo atendido por un ejecutivo, ingresa el código que te proporcione.';
const CONSENT_COPY_ID = 'consent-copy';

const AdvisorTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      aria-expanded={isOpen}
      aria-label={ADVISOR_TOOLTIP_COPY}
      className={`hogar-advisor-tooltip${isOpen ? ' is-open' : ''}`}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((current) => !current)}
      onKeyDown={(event) => {
        if (['Enter', ' '].includes(event.key)) {
          event.preventDefault();
          setIsOpen((current) => !current);
        } else if (event.key === 'Escape') {
          event.preventDefault();
          setIsOpen(false);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Tooltip openTooltipIcon="interrogation" position="top">
        <span className="body-s text-neutral80">{ADVISOR_TOOLTIP_COPY}</span>
      </Tooltip>
    </span>
  );
};

const HogarQuoteStartForm = (_props: HogarQuoteStartFormProps) => {
  const [isInformationOpen, setIsInformationOpen] = useState(false);
  const {
    control,
    generalAlert,
    getValues,
    hasAdvisor,
    isSubmitting,
    onSubmit,
    result,
    setValue,
    underageAlert,
  } = useHogarQuoteStartForm();
  const minimumBirthDate = new Date(1900, 0, 1);
  const maximumBirthDate = new Date();

  return (
    <>
      <div className="hogar-quote-card w-100 br-8 bg-white shadow overflow-hidden">
        <div className="hogar-quote-card__info d-flex align-items-center justify-content-between gap-16">
          <p className="title-s text-semibold text-neutral80">Conoce cómo funciona este seguro</p>
          <Button
            appearance="link"
            className="hogar-quote-card__info-action body-l text-regular"
            link="#seguro-de-hogar"
            onClick={() => setIsInformationOpen(true)}
            text="Más información"
            type="button"
          />
        </div>

        <form
          className="hogar-quote-card__body d-flex flex-column gap-40 bg-white"
          noValidate
          onSubmit={onSubmit}
        >
          <div className="d-flex flex-column gap-24">
            <InputController
              autoComplete="off"
              className="w-100"
              control={control}
              id="rut"
              inputMode="text"
              labelText="RUT del asegurado"
              maxLength={12}
              name="rut"
              placeholder="Ej: 12.345.678-9"
              transform={formatChileanRut}
              type="text"
            />

            <InputDateController
              className="w-100"
              control={control}
              id="birthDate"
              labelText="Fecha de nacimiento"
              maxDate={maximumBirthDate}
              minDate={minimumBirthDate}
              name="birthDate"
              placeholder="DD/MM/AAAA"
              showIcon
            />

            <InputController
              autoComplete="email"
              className="w-100"
              control={control}
              id="email"
              inputMode="email"
              labelText="Correo electrónico"
              maxLength={254}
              name="email"
              placeholder="Ej: correo@email.com"
              type="email"
            />

            <InputController
              autoComplete="tel-national"
              className="w-100"
              control={control}
              id="phone"
              inputMode="numeric"
              labelText="Teléfono"
              maxLength={9}
              name="phone"
              placeholder="987654321"
              prefix="+56"
              transform={normalizeChileanMobile}
              type="tel"
            />
          </div>

          <div className="hogar-consent d-flex align-items-start gap-16">
            <CheckBoxController
              alignMiddle
              className="hogar-consent__checkbox"
              control={control}
              errorText=""
              id="consent"
              inputAriaLabelledBy={CONSENT_COPY_ID}
              name="consent"
            >
              {null}
            </CheckBoxController>
            <span className="body-l text-neutral80" id={CONSENT_COPY_ID}>
              <label
                htmlFor="consent"
                onClick={(event) => event.preventDefault()}
                onPointerDown={(event) => {
                  event.preventDefault();
                  setValue('consent', !getValues('consent'), {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                }}
              >
                Acepto que me contacten para terminar el proceso de contratación del seguro según la
              </label>{' '}
              <Button
                appearance="link"
                link="#politica-de-privacidad"
                preventDefault={false}
                text="política de privacidad."
                type="button"
              />
            </span>
          </div>

          <div className="hogar-advisor-panel br-8 d-flex flex-column gap-24">
            <div className="d-flex align-items-center justify-content-between gap-16">
              <label className="body-l text-regular text-neutral80" htmlFor="hasAdvisor">
                Estoy recibiendo ayuda de un asesor
              </label>
              <SwitchController control={control} id="hasAdvisor" name="hasAdvisor" />
            </div>

            {hasAdvisor ? (
              <div className="hogar-advisor-panel__field">
                <div className="d-flex align-items-center gap-8 mb12">
                  <label className="body-l text-regular text-neutral80" htmlFor="advisorCode">
                    Código del asesor
                  </label>
                  <AdvisorTooltip />
                </div>
                <InputController
                  aria-label="Código del asesor"
                  autoComplete="off"
                  className="w-100"
                  control={control}
                  id="advisorCode"
                  inputMode="text"
                  labelText=""
                  maxLength={8}
                  name="advisorCode"
                  placeholder="Ej: 12345678"
                  type="text"
                />
              </div>
            ) : null}
          </div>

          {underageAlert ? (
            <div aria-live="polite" role="status">
              <Alert clossable={false} type="warning">
                {underageAlert}
              </Alert>
            </div>
          ) : null}

          <Button
            className="hogar-quote-card__cta w-100"
            disabled={isSubmitting}
            loading={isSubmitting}
            text="Continuar"
            type="submit"
            variant="primary"
          />

          {generalAlert ? (
            <div aria-live="polite" role="status">
              <Alert clossable={false} type="warning">
                {generalAlert}
              </Alert>
            </div>
          ) : null}

          {result ? (
            <p
              aria-live="polite"
              className="body-l text-semibold text-primary text-center"
              role="status"
            >
              {result.greeting}
            </p>
          ) : null}
        </form>
      </div>

      <p className="hogar-quote-faq body-l text-neutral60 text-center mx-auto">
        Si tienes dudas sobre los seguros de hogar, revisa las{' '}
        <Button
          appearance="link"
          link="#preguntas-frecuentes"
          preventDefault={false}
          text="preguntas frecuentes"
        />
      </p>

      <MoreInformationDialog
        isOpen={isInformationOpen}
        onClose={() => setIsInformationOpen(false)}
      />
    </>
  );
};

export default HogarQuoteStartForm;
