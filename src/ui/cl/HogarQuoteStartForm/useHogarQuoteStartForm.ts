'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ClHogarQuoteStartPayload } from '@/contracts';
import { quoteLocally } from '@/mocks/global/hogar/quoteLocally';
import { useHogarQuoteStartStore } from '@/store';
import {
  normalizeChileanRut,
  serializeLocalDate,
  toChileanInternationalMobile,
} from '@/utils/functions';
import { type FormEventHandler, useEffect, useRef, useState } from 'react';
import { type SubmitErrorHandler, type SubmitHandler, useForm, useWatch } from 'react-hook-form';

import {
  schema,
  UNDERAGE_ALERT,
  UNDERAGE_FIELD_ERROR,
  type HogarQuoteStartFormInput,
  type HogarQuoteStartFormValues,
} from './schema';

export const GENERAL_FORM_ALERT = 'Completa la información solicitada para avanzar';

export const HOGAR_QUOTE_START_DEFAULT_VALUES: HogarQuoteStartFormInput = {
  advisorCode: '',
  birthDate: null,
  consent: false,
  email: '',
  hasAdvisor: false,
  phone: '',
  rut: '',
};

export const buildClHogarQuoteStartPayload = (
  values: HogarQuoteStartFormValues,
): ClHogarQuoteStartPayload => {
  if (!values.birthDate) throw new TypeError('A valid birth date is required');

  const advisorCode = values.hasAdvisor ? values.advisorCode.trim() : '';

  return {
    ...(advisorCode ? { advisorCode } : {}),
    birthDate: serializeLocalDate(values.birthDate),
    consent: true,
    country: 'cl',
    email: values.email.trim().toLowerCase(),
    phone: toChileanInternationalMobile(values.phone),
    rut: normalizeChileanRut(values.rut),
  };
};

export const useHogarQuoteStartForm = () => {
  const [generalAlert, setGeneralAlert] = useState<string | null>(null);
  const submissionInFlight = useRef(false);
  const setResult = useHogarQuoteStartStore((state) => state.setResult);
  const setValues = useHogarQuoteStartStore((state) => state.setValues);
  const result = useHogarQuoteStartStore((state) =>
    state.result?.country === 'cl' ? state.result : null,
  );
  const form = useForm<HogarQuoteStartFormInput, unknown, HogarQuoteStartFormValues>({
    defaultValues: HOGAR_QUOTE_START_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver: zodResolver(schema),
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const hasAdvisor = useWatch({ control: form.control, name: 'hasAdvisor' });
  const { clearErrors, resetField, unregister } = form;
  const underageAlert =
    form.formState.errors.root?.underage?.message === UNDERAGE_ALERT ||
    form.formState.errors.birthDate?.message === UNDERAGE_FIELD_ERROR
      ? UNDERAGE_ALERT
      : null;

  useEffect(() => {
    if (hasAdvisor) return;

    resetField('advisorCode', { defaultValue: '' });
    unregister('advisorCode');
    clearErrors('advisorCode');
  }, [clearErrors, hasAdvisor, resetField, unregister]);

  const handleValidSubmit: SubmitHandler<HogarQuoteStartFormValues> = async (values) => {
    if (submissionInFlight.current) return;

    submissionInFlight.current = true;
    setGeneralAlert(null);
    setResult(null);
    setValues(buildClHogarQuoteStartPayload(values));

    try {
      setResult(await quoteLocally({ country: 'cl' }));
    } finally {
      submissionInFlight.current = false;
    }
  };

  const handleInvalidSubmit: SubmitErrorHandler<HogarQuoteStartFormInput> = () => {
    setGeneralAlert(GENERAL_FORM_ALERT);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    void form.handleSubmit(handleValidSubmit, handleInvalidSubmit)(event);
  };

  return {
    ...form,
    generalAlert,
    hasAdvisor,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
    result,
    underageAlert,
  };
};
