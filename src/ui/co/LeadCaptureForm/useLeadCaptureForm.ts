'use client';

import { leadCaptureSchema } from './schema';
import { useLeadCaptureStore, type LeadCaptureStoreValues } from '@/store';
import { setFlowStep } from '@/utils/client/flowStep';
import { formatPhone } from '@/utils/functions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

type AgeValidationError = 'UNDERAGE' | 'OVERAGE' | null;

const parseBirthdate = (value: string): Date | null => {
  const [dayRaw, monthRaw, yearRaw] = value.split('/');
  const day = Number(dayRaw);
  const month = Number(monthRaw);
  const year = Number(yearRaw);

  if (!day || !month || !year) return null;

  const date = new Date(year, month - 1, day);
  const isValidDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  return isValidDate ? date : null;
};

const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age -= 1;
  }

  return age;
};

export const useLeadCaptureForm = () => {
  const { push } = useRouter();
  const { getValues, setValues } = useLeadCaptureStore();
  const [ageValidationError, setAgeValidationError] = useState<AgeValidationError>(null);
  const defaultValues = useMemo(() => ({ ...getValues(), documentType: 'CC' }), [getValues]);

  const methods = useForm<LeadCaptureStoreValues>({
    defaultValues,
    mode: 'onTouched',
    resolver: zodResolver(leadCaptureSchema) as never,
    shouldFocusError: true,
  });

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;
  const watchedValues = useWatch({ control }) as LeadCaptureStoreValues;

  useEffect(() => {
    setValues(watchedValues);
  }, [setValues, watchedValues]);

  useEffect(() => {
    setAgeValidationError(null);
  }, [watchedValues.birthdate]);

  const onSubmit = (values: LeadCaptureStoreValues) => {
    const birthdate = parseBirthdate(values.birthdate);

    if (!birthdate) {
      setAgeValidationError(null);
      return;
    }

    const age = calculateAge(birthdate);

    if (age < 18) {
      setAgeValidationError('UNDERAGE');
      return;
    }

    if (age > 69) {
      setAgeValidationError('OVERAGE');
      return;
    }

    setAgeValidationError(null);
    setValues(values);
    setFlowStep('/');
    push('/cotizacion');
  };

  return {
    ageValidationError,
    control,
    errors,
    formatPhone,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
  };
};
