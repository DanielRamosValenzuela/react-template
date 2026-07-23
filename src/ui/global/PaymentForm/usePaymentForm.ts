'use client';

import { commonConfig } from '@/config/environment';
import { usePaymentStore } from '@/store';
import { useState } from 'react';
import { getPaymentMethodsByCountry } from './paymentMethods';

export const usePaymentForm = () => {
  const { getValues, setValues } = usePaymentStore();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const methods = getPaymentMethodsByCountry(commonConfig.country);
  const { selectedMethodId } = getValues();

  const selectMethod = (methodId: string) => {
    setValues({ selectedMethodId: methodId });
    setIsConfirmed(false);
  };

  const confirmPayment = () => {
    if (!selectedMethodId) return;
    setIsConfirmed(true);
  };

  return { confirmPayment, isConfirmed, methods, selectedMethodId, selectMethod };
};
