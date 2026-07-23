'use client';

import type { ComponentProps } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Input } from 'tomaco-components';

type InputProps = ComponentProps<typeof Input>;

interface InputControllerProps<TFieldValues extends FieldValues> extends Omit<
  InputProps,
  'name' | 'onChange' | 'value'
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  transform?: (value: string) => string;
}

export const InputController = <TFieldValues extends FieldValues>({
  control,
  name,
  transform,
  ...inputProps
}: InputControllerProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Input
        {...inputProps}
        {...field}
        value={field.value ?? ''}
        onChange={(event) => field.onChange(transform?.(event.target.value) ?? event.target.value)}
      />
    )}
  />
);
