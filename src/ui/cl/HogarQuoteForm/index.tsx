'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Alert, Button, Switch } from 'tomaco-components';
import { CheckBoxController, InputController, InputDateController } from '@/widgets/form-controls';
import { HOGAR_QUOTE_COPY, HOGAR_QUOTE_LINKS } from './content';
import { HogarInsuranceInfoDialog } from './HogarInsuranceInfoDialog';
import { formatRut, normalizePhone } from './schema';
import { useHogarQuoteForm } from './useHogarQuoteForm';

export default function HogarQuoteForm() {
  const [isInformationOpen, setIsInformationOpen] = useState(false);
  const [receivesAdvisorHelp, setReceivesAdvisorHelp] = useState(false);
  const {
    birthDateEligibility,
    birthDateInputBounds,
    control,
    onSubmit,
    showInvalidSubmitMessage,
  } = useHogarQuoteForm();
  const hasAgeWarning =
    birthDateEligibility === 'over-technical-limit' || birthDateEligibility === 'under-minimum-age';

  return (
    <div className="hogar-quote-form">
      <header className="hogar-quote-form__title">
        <p>{HOGAR_QUOTE_COPY.titlePrefix}</p>
        <div className="d-flex align-items-center gap-12">
          <Image
            alt=""
            aria-hidden="true"
            height={40}
            priority
            src="/cl/hogar/icon-home-title.svg"
            width={40}
          />
          <h1>{HOGAR_QUOTE_COPY.title}</h1>
        </div>
      </header>

      <section className="hogar-quote-form__card br-8 bg-white">
        <div className="hogar-quote-form__card-header d-flex justify-content-between">
          <p>
            <span className="hogar-quote-form__intro-desktop">
              {HOGAR_QUOTE_COPY.cardIntroDesktop}
            </span>
            <span className="hogar-quote-form__intro-mobile">
              {HOGAR_QUOTE_COPY.cardIntroMobile}
            </span>
          </p>
          <Button
            appearance="link"
            className="hogar-quote-form__info-button"
            onClick={() => setIsInformationOpen(true)}
            text={HOGAR_QUOTE_COPY.moreInformation}
            type="button"
          />
        </div>

        <div className="hogar-quote-form__card-body">
          <form
            className="hogar-quote-form__fields-form d-flex flex-column gap-40"
            noValidate
            onSubmit={onSubmit}
          >
            <div className="hogar-quote-form__fields d-flex flex-column gap-24">
              <div className="hogar-quote-form__field">
                <InputController
                  autoComplete="off"
                  className="w-100"
                  control={control}
                  id="insuredRut"
                  labelText={HOGAR_QUOTE_COPY.insuredRutLabel}
                  maxLength={12}
                  name="insuredRut"
                  placeholder={HOGAR_QUOTE_COPY.insuredRutPlaceholder}
                  transform={(value) => formatRut(value).slice(0, 12)}
                />
              </div>
              <div className="hogar-quote-form__field">
                <InputDateController
                  className="w-100"
                  control={control}
                  errorText={hasAgeWarning ? '' : undefined}
                  id="birthDate"
                  isValid={hasAgeWarning ? true : undefined}
                  labelText={HOGAR_QUOTE_COPY.birthDateLabel}
                  maxDate={birthDateInputBounds.maxDate}
                  minDate={birthDateInputBounds.minDate}
                  name="birthDate"
                  placeholder={HOGAR_QUOTE_COPY.birthDatePlaceholder}
                  showIcon
                />
              </div>
              <div className="hogar-quote-form__field">
                <InputController
                  autoComplete="email"
                  className="w-100"
                  control={control}
                  id="email"
                  labelText={HOGAR_QUOTE_COPY.emailLabel}
                  name="email"
                  placeholder={HOGAR_QUOTE_COPY.emailPlaceholder}
                  type="email"
                />
              </div>
              <div className="hogar-quote-form__field hogar-quote-form__phone">
                <InputController
                  autoComplete="tel"
                  className="w-100"
                  control={control}
                  id="phone"
                  inputMode="numeric"
                  labelText={HOGAR_QUOTE_COPY.phoneLabel}
                  maxLength={9}
                  name="phone"
                  pattern="[0-9]*"
                  placeholder={HOGAR_QUOTE_COPY.phonePlaceholder}
                  prefix="+56"
                  transform={(value) => normalizePhone(value).slice(0, 9)}
                  type="tel"
                />
              </div>
            </div>

            <CheckBoxController
              alignMiddle
              className="hogar-quote-form__consent"
              control={control}
              hideError
              id="contactConsent"
              name="contactConsent"
            >
              {HOGAR_QUOTE_COPY.privacyPrefix}
              <a
                href={HOGAR_QUOTE_LINKS.privacy}
                onClick={(event) => event.stopPropagation()}
                rel="noopener noreferrer"
                target="_blank"
              >
                {HOGAR_QUOTE_COPY.privacyText}
              </a>
              .
            </CheckBoxController>

            <div className="hogar-quote-form__advisor d-flex align-items-center justify-content-between gap-16">
              <label htmlFor="receivesAdvisorHelp">{HOGAR_QUOTE_COPY.advisor}</label>
              <Switch
                checked={receivesAdvisorHelp}
                id="receivesAdvisorHelp"
                name="receivesAdvisorHelp"
                onChange={(event) => setReceivesAdvisorHelp(event.target.checked)}
              />
            </div>

            <div className="hogar-quote-form__actions d-flex flex-column gap-16">
              {birthDateEligibility === 'over-technical-limit' ? (
                <div role="alert">
                  <Alert className="hogar-quote-form__age-alert" type="warning">
                    {HOGAR_QUOTE_COPY.overTechnicalLimit}
                  </Alert>
                </div>
              ) : null}
              {birthDateEligibility === 'under-minimum-age' ? (
                <div role="alert">
                  <Alert className="hogar-quote-form__age-alert" type="warning">
                    {HOGAR_QUOTE_COPY.underMinimumAge}
                  </Alert>
                </div>
              ) : null}
              <Button className="w-100" text={HOGAR_QUOTE_COPY.continue} type="submit" />
              {showInvalidSubmitMessage ? (
                <div role="alert">
                  <Alert className="hogar-quote-form__general-alert" type="warning">
                    {HOGAR_QUOTE_COPY.generalInvalid}
                  </Alert>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      <a
        className="hogar-quote-form__faq d-flex align-items-center justify-content-center text-primary text-semibold text-underline"
        href={HOGAR_QUOTE_LINKS.faq}
        rel="noopener noreferrer"
        target="_blank"
      >
        {HOGAR_QUOTE_COPY.faq}
      </a>

      <HogarInsuranceInfoDialog
        isOpen={isInformationOpen}
        onClose={() => setIsInformationOpen(false)}
      />
    </div>
  );
}
