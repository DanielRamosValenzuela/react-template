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
  inputAriaLabelledBy?: string;
  name: Path<TFieldValues>;
}

export const CheckBoxController = <TFieldValues extends FieldValues>({
  control,
  inputAriaLabelledBy,
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
        errorText={fieldState.error?.message ?? checkBoxProps.errorText}
        isValid={fieldState.error ? false : checkBoxProps.isValid}
        name={field.name}
        onChange={field.onChange}
        ref={(input) => {
          field.ref(input);

          if (inputAriaLabelledBy) input?.setAttribute('aria-labelledby', inputAriaLabelledBy);
        }}
      />
    )}
  />
);
