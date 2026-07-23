import { isValidDocumentByCountry, isValidPhone } from '@/utils/functions';
import { z } from 'zod';

const WARNING_MESSAGES = {
  BIRTHDATE: 'Debes ingresar una fecha valida',
  DOCUMENT: 'Debes ingresar un DNI valido',
  EMAIL: 'Debes ingresar un correo electronico valido',
  PHONE: 'Debes ingresar un telefono valido',
  PRIVACY: 'Debes aceptar la politica de privacidad',
};

export const leadCaptureSchema = z.object({
  acceptedPrivacy: z.boolean().refine(Boolean, WARNING_MESSAGES.PRIVACY),
  advisorCode: z.string().max(12, 'Debes ingresar un codigo valido').optional().default(''),
  birthdate: z.string().min(8, WARNING_MESSAGES.BIRTHDATE),
  documentType: z.string().default('DNI'),
  email: z.string().email(WARNING_MESSAGES.EMAIL),
  identificationDocument: z
    .string()
    .min(8, WARNING_MESSAGES.DOCUMENT)
    .refine((value) => isValidDocumentByCountry('pe', value), WARNING_MESSAGES.DOCUMENT),
  phone: z.string().refine(isValidPhone, WARNING_MESSAGES.PHONE),
});