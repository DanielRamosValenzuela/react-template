import {
  isAtLeast18YearsOld,
  isFutureLocalDate,
  isValidChileanMobile,
  isValidChileanRut,
  isValidLocalDate,
} from '@/utils/functions';
import { z } from 'zod';

export const RUT_ERROR = 'Debes ingresar un RUT válido';
export const BIRTH_DATE_ERROR = 'Ingresa una fecha de nacimiento válida';
export const EMAIL_ERROR = 'Debes ingresar un correo electrónico válido';
export const MOBILE_ERROR = 'Debes ingresar un teléfono válido';
export const ADVISOR_CODE_ERROR = 'Debes ingresar un código válido';
export const UNDERAGE_ALERT = 'Para contratar este seguro debes ser mayor de 18 años de edad.';
export const UNDERAGE_FIELD_ERROR = ' ';

const emailSchema = z.string().max(254).email();
const advisorCodePattern = /^[A-Za-z0-9]{1,8}$/;
const mobileInputPattern = /^\+?[\d\s-]+$/;
const NON_VISUAL_FIELD_ERROR = ' ';

export const schema = z
  .object({
    advisorCode: z.string().optional().default(''),
    birthDate: z
      .date({ error: BIRTH_DATE_ERROR })
      .nullable()
      .refine(
        (value) => value !== null && isValidLocalDate(value) && !isFutureLocalDate(value),
        BIRTH_DATE_ERROR,
      ),
    consent: z
      .boolean()
      .refine((value) => value, NON_VISUAL_FIELD_ERROR)
      .transform(() => true as const),
    email: z.string().refine((value) => emailSchema.safeParse(value.trim()).success, EMAIL_ERROR),
    hasAdvisor: z.boolean(),
    phone: z
      .string()
      .refine(
        (value) => mobileInputPattern.test(value.trim()) && isValidChileanMobile(value),
        MOBILE_ERROR,
      ),
    rut: z.string().refine(isValidChileanRut, RUT_ERROR),
  })
  .superRefine(({ advisorCode, birthDate, hasAdvisor }, context) => {
    if (
      birthDate &&
      isValidLocalDate(birthDate) &&
      !isFutureLocalDate(birthDate) &&
      !isAtLeast18YearsOld(birthDate)
    ) {
      context.addIssue({
        code: 'custom',
        message: UNDERAGE_FIELD_ERROR,
        path: ['birthDate'],
      });
      context.addIssue({
        code: 'custom',
        message: UNDERAGE_ALERT,
        path: ['root', 'underage'],
      });
    }

    if (hasAdvisor && !advisorCodePattern.test(advisorCode.trim())) {
      context.addIssue({
        code: 'custom',
        message: ADVISOR_CODE_ERROR,
        path: ['advisorCode'],
      });
    }
  });

export type HogarQuoteStartFormInput = z.input<typeof schema>;
export type HogarQuoteStartFormValues = z.infer<typeof schema>;
