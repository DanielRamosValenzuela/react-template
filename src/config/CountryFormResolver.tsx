'use client';

import { FORM_NAMES, type TFormName } from '@/config/forms';
import type { TCountry } from '@/config/types';
import {
  createElement,
  lazy,
  Suspense,
  useMemo,
  type ComponentType,
  type LazyExoticComponent,
} from 'react';
import { Loader } from 'tomaco-components';

type CountryFormPropsByName = {
  [FORM_NAMES.LEAD_CAPTURE]: Record<string, never>;
  [FORM_NAMES.QUOTATION]: Record<string, never>;
};

type CountryFormComponentMap = {
  [FormName in TFormName]: LazyExoticComponent<ComponentType<CountryFormPropsByName[FormName]>>;
};

interface CountryFormResolverProps<TSelectedFormName extends TFormName = TFormName> {
  componentProps?: CountryFormPropsByName[TSelectedFormName];
  country: TCountry;
  formName: TSelectedFormName;
}

const EMPTY_COMPONENT_PROPS = {} as const;

const FORM_COMPONENTS_BY_COUNTRY: Partial<Record<TCountry, Partial<CountryFormComponentMap>>> = {
  cl: {
    [FORM_NAMES.LEAD_CAPTURE]: lazy(() => import('@/ui/cl/LeadCaptureForm')),
    [FORM_NAMES.QUOTATION]: lazy(() => import('@/ui/cl/Quotation')),
  },
  co: {
    [FORM_NAMES.LEAD_CAPTURE]: lazy(() => import('@/ui/co/LeadCaptureForm')),
    [FORM_NAMES.QUOTATION]: lazy(() => import('@/ui/co/Quotation')),
  },
  pe: {
    [FORM_NAMES.LEAD_CAPTURE]: lazy(() => import('@/ui/pe/LeadCaptureForm')),
    [FORM_NAMES.QUOTATION]: lazy(() => import('@/ui/pe/Quotation')),
  },
};

const CountryFormResolver = <TSelectedFormName extends TFormName>({
  componentProps,
  country,
  formName,
}: CountryFormResolverProps<TSelectedFormName>) => {
  const LazyComponent = useMemo(
    () => FORM_COMPONENTS_BY_COUNTRY[country]?.[formName] ?? null,
    [country, formName],
  ) as CountryFormComponentMap[TSelectedFormName] | null;

  const resolvedProps = (componentProps ??
    EMPTY_COMPONENT_PROPS) as CountryFormPropsByName[TSelectedFormName];

  if (!LazyComponent) {
    return <p className="px-16 text-neutral60">Formulario pendiente para {country}.</p>;
  }

  return <Suspense fallback={<Loader />}>{createElement(LazyComponent, resolvedProps)}</Suspense>;
};

export default CountryFormResolver;