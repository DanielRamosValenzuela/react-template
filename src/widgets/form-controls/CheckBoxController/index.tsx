'use client';

import type { ComponentProps } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { CheckBox } from 'tomaco-components';

type CheckBoxProps = ComponentProps<typeof CheckBox>;

interface CheckBoxControllerProps<TFieldValues extends FieldValues> extends Omit<
  CheckBoxProps,
  'checked' | 'name' | 'onChange'
> {
  control: Control<TFieldValues>;
  hideError?: boolean;
  name: Path<TFieldValues>;
}

export const CheckBoxController = <TFieldValues extends FieldValues>({
  control,
  errorText,
  hideError = false,
  isValid,
  name,
  ...checkBoxProps
}: CheckBoxControllerProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <CheckBox
        {...checkBoxProps}
        checked={Boolean(field.value)}
        errorText={hideError ? '' : (errorText ?? fieldState.error?.message)}
        isValid={hideError ? true : (isValid ?? !fieldState.error)}
        name={field.name}
        onChange={(event) => field.onChange(event.target.checked)}
        ref={field.ref}
      />
    )}
  />
);
