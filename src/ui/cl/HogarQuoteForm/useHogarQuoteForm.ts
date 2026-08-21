'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  type FieldErrors,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { useState } from 'react';
import {
  getBirthDateEligibility,
  getBirthDateInputBounds,
  getHogarQuoteFormSchema,
  HOGAR_QUOTE_FORM_DEFAULT_VALUES,
  type HogarQuoteFormValues,
} from './schema';

const FIELD_ORDER = [
  'insuredRut',
  'birthDate',
  'email',
  'phone',
  'contactConsent',
] as const satisfies readonly (keyof HogarQuoteFormValues)[];

const getFieldElement = (fieldName: keyof HogarQuoteFormValues) => {
  if (typeof document === 'undefined') {
    return null;
  }

  return (
    document.getElementById(fieldName) ??
    document.querySelector<HTMLElement>(`[name="${fieldName}"]`)
  );
};

const getFirstInvalidField = (errors: FieldErrors<HogarQuoteFormValues>) =>
  FIELD_ORDER.find((fieldName) => Boolean(errors[fieldName]));

export const useHogarQuoteForm = () => {
  const [{ birthDateInputBounds, resolver, today }] = useState(() => {
    const mountedToday = new Date();

    return {
      birthDateInputBounds: getBirthDateInputBounds(mountedToday),
      resolver: zodResolver(getHogarQuoteFormSchema(mountedToday)),
      today: mountedToday,
    };
  });
  const form = useForm<HogarQuoteFormValues>({
    defaultValues: HOGAR_QUOTE_FORM_DEFAULT_VALUES,
    mode: 'onTouched',
    resolver,
    shouldFocusError: false,
  });
  const birthDate = useWatch({ control: form.control, name: 'birthDate' });
  const birthDateEligibility = getBirthDateEligibility(birthDate, today);

  const onValid: SubmitHandler<HogarQuoteFormValues> = () => undefined;
  const onInvalid: SubmitErrorHandler<HogarQuoteFormValues> = (errors) => {
    const firstInvalidField = getFirstInvalidField(errors);

    if (!firstInvalidField) {
      return;
    }

    form.setFocus(firstInvalidField);

    const fieldElement = getFieldElement(firstInvalidField);
    fieldElement?.focus({ preventScroll: true });
    fieldElement?.scrollIntoView({ block: 'center' });
  };

  return {
    ...form,
    birthDateEligibility,
    birthDateInputBounds,
    onInvalid,
    onSubmit: form.handleSubmit(onValid, onInvalid),
    onValid,
    showInvalidSubmitMessage: form.formState.isSubmitted && !form.formState.isValid,
  };
};
