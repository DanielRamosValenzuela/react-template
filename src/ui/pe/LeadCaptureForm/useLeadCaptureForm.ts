'use client';

import { leadCaptureSchema } from './schema';
import { useLeadCaptureStore, type LeadCaptureStoreValues } from '@/store';
import { setFlowStep } from '@/utils/client/flowStep';
import { formatPhone } from '@/utils/functions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

export const useLeadCaptureForm = () => {
  const { push } = useRouter();
  const { getValues, setValues } = useLeadCaptureStore();
  const defaultValues = useMemo(() => ({ ...getValues(), documentType: 'DNI' }), [getValues]);

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

  const onSubmit = (values: LeadCaptureStoreValues) => {
    setValues(values);
    setFlowStep('/');
    push('/cotizacion');
  };

  return {
    control,
    errors,
    formatPhone,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
  };
};
