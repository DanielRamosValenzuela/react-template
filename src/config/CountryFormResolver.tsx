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
  [FORM_NAMES.HELLO]: Record<string, never>;
  [FORM_NAMES.HOGAR_QUOTE]: Record<string, never>;
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
    [FORM_NAMES.HELLO]: lazy(() => import('@/ui/cl/Hello')),
    [FORM_NAMES.HOGAR_QUOTE]: lazy(() => import('@/ui/cl/HogarQuoteForm')),
  },
  co: {
    [FORM_NAMES.HELLO]: lazy(() => import('@/ui/co/Hello')),
  },
  pe: {
    [FORM_NAMES.HELLO]: lazy(() => import('@/ui/pe/Hello')),
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
