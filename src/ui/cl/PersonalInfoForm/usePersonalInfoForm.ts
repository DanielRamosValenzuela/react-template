'use client';

import { personalInfoSchema } from './schema';
import { usePersonalInfoStore, type PersonalInfoStoreValues } from '@/store';
import { setFlowStep } from '@/utils/client/flowStep';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

export const usePersonalInfoForm = () => {
  const { push } = useRouter();
  const { getValues, setValues } = usePersonalInfoStore();
  const defaultValues = useMemo(() => getValues(), [getValues]);

  const methods = useForm<PersonalInfoStoreValues>({
    defaultValues,
    mode: 'onTouched',
    resolver: zodResolver(personalInfoSchema) as never,
    shouldFocusError: true,
  });

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;
  const watchedValues = useWatch({ control }) as PersonalInfoStoreValues;

  useEffect(() => {
    setValues(watchedValues);
  }, [setValues, watchedValues]);

  const onSubmit = (values: PersonalInfoStoreValues) => {
    setValues(values);
    setFlowStep('/informacion-personal');
    push('/pago');
  };

  return {
    control,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
  };
};
