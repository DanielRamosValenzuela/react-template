'use client';

import type { ComponentProps } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { InputDate } from 'tomaco-components';

type InputDateProps = ComponentProps<typeof InputDate>;

interface InputDateControllerProps<TFieldValues extends FieldValues> extends Omit<
  InputDateProps,
  'defaultDate' | 'id' | 'maxDate' | 'minDate' | 'name' | 'onBlur' | 'onChange' | 'ref'
> {
  control: Control<TFieldValues>;
  id: string;
  maxDate: Date;
  minDate: Date;
  name: Path<TFieldValues>;
}

export const InputDateController = <TFieldValues extends FieldValues>({
  control,
  id,
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
        defaultDate={(field.value as Date | null) ?? null}
        errorText={fieldState.error?.message ?? inputDateProps.errorText}
        id={id}
        isValid={fieldState.error ? false : inputDateProps.isValid}
        maxDate={maxDate}
        minDate={minDate}
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        ref={field.ref}
      />
    )}
  />
);
