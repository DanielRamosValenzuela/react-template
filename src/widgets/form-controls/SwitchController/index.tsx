'use client';

import type { ComponentProps } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Switch } from 'tomaco-components';

type SwitchProps = ComponentProps<typeof Switch>;

interface SwitchControllerProps<TFieldValues extends FieldValues> extends Omit<
  SwitchProps,
  'checked' | 'name' | 'onChange'
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export const SwitchController = <TFieldValues extends FieldValues>({
  control,
  name,
  ...switchProps
}: SwitchControllerProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Switch
        {...switchProps}
        checked={Boolean(field.value)}
        name={field.name}
        onChange={(event) => field.onChange(event.target.checked)}
        ref={field.ref}
      />
    )}
  />
);
