'use client';

import type { ComponentProps } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { CheckBox } from 'tomaco-components';

type CheckBoxProps = ComponentProps<typeof CheckBox>;

interface CheckBoxControllerProps<TFieldValues extends FieldValues>
  extends Omit<CheckBoxProps, 'checked' | 'name' | 'onChange'> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export const CheckBoxController = <TFieldValues extends FieldValues>({
  control,
  name,
  ...checkBoxProps
}: CheckBoxControllerProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <CheckBox
        {...checkBoxProps}
        checked={Boolean(field.value)}
        name={field.name}
        onChange={(event) => field.onChange(event.target.checked)}
      />
    )}
  />
);