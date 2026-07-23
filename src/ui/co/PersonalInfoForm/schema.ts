import { z } from 'zod';

const WARNING_MESSAGES = {
  ADDRESS_NUMBER: 'Debes ingresar un numero valido',
  ADDRESS_STREET: 'Debes ingresar una direccion valida',
  FIRST_NAME: 'Debes ingresar un nombre valido',
  LAST_NAME: 'Debes ingresar un apellido valido',
  TERMS: 'Debes aceptar los terminos y condiciones',
};

export const personalInfoSchema = z.object({
  acceptedTerms: z.boolean().refine(Boolean, WARNING_MESSAGES.TERMS),
  addressNumber: z.string().min(1, WARNING_MESSAGES.ADDRESS_NUMBER),
  addressStreet: z.string().min(3, WARNING_MESSAGES.ADDRESS_STREET),
  firstName: z.string().min(2, WARNING_MESSAGES.FIRST_NAME),
  lastName: z.string().min(2, WARNING_MESSAGES.LAST_NAME),
});
