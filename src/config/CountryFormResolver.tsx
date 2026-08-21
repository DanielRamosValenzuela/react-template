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
  [FORM_NAMES.HOGAR_QUOTE_START]: { country: TCountry };
};

type CountryFormComponentMap = {
  [FormName in TFormName]: LazyExoticComponent<ComponentType<CountryFormPropsByName[FormName]>>;
};

interface CountryFormResolverProps<TSelectedFormName extends TFormName = TFormName> {
  componentProps?: Omit<CountryFormPropsByName[TSelectedFormName], 'country'>;
  country: TCountry;
  formName: TSelectedFormName;
}

const EMPTY_COMPONENT_PROPS = {} as const;

const FORM_COMPONENTS_BY_COUNTRY: Partial<Record<TCountry, Partial<CountryFormComponentMap>>> = {
  cl: {
    [FORM_NAMES.HOGAR_QUOTE_START]: lazy(() => import('@/ui/cl/HogarQuoteStartForm')),
  },
  co: {
    [FORM_NAMES.HOGAR_QUOTE_START]: lazy(() => import('@/ui/global/HogarLocalQuote')),
  },
  pe: {
    [FORM_NAMES.HOGAR_QUOTE_START]: lazy(() => import('@/ui/global/HogarLocalQuote')),
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

  const resolvedProps = {
    ...(componentProps ?? EMPTY_COMPONENT_PROPS),
    country,
  } as CountryFormPropsByName[TSelectedFormName];

  if (!LazyComponent) {
    return <p className="px-16 text-neutral60">Formulario pendiente para {country}.</p>;
  }

  return <Suspense fallback={<Loader />}>{createElement(LazyComponent, resolvedProps)}</Suspense>;
};

export default CountryFormResolver;
