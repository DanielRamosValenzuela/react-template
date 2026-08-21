'use client';

import type { ComponentProps } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { InputDate } from 'tomaco-components';

type InputDateProps = ComponentProps<typeof InputDate>;

interface InputDateControllerProps<TFieldValues extends FieldValues> extends Omit<
  InputDateProps,
  'defaultDate' | 'maxDate' | 'minDate' | 'name' | 'onBlur' | 'onChange' | 'ref'
> {
  control: Control<TFieldValues>;
  maxDate: Date;
  minDate: Date;
  name: Path<TFieldValues>;
}

export const InputDateController = <TFieldValues extends FieldValues>({
  control,
  errorText,
  id,
  isValid,
  maxDate,
  minDate,
  name,
  ...inputDateProps
}: InputDateControllerProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <InputDate
        {...inputDateProps}
        defaultDate={(field.value as Date | null | undefined) ?? null}
        errorText={errorText ?? fieldState.error?.message}
        id={id ?? field.name}
        isValid={isValid ?? !fieldState.error}
        maxDate={maxDate}
        minDate={minDate}
        name={field.name}
        onBlur={field.onBlur}
        onChange={(date) => field.onChange(date ?? null)}
        ref={field.ref}
      />
    )}
  />
);
