import { z } from 'zod';

const RUT_ERROR_MESSAGE = 'Debes ingresar un RUT válido';
const BIRTH_DATE_ERROR_MESSAGE = 'Ingresa una fecha de nacimiento válida';
const EMAIL_ERROR_MESSAGE = 'Debes ingresar un correo electrónico válido';
const PHONE_ERROR_MESSAGE = 'Debes ingresar un teléfono válido';
const CONTACT_CONSENT_ERROR_MESSAGE = 'CONTACT_CONSENT_REQUIRED';

export type BirthDateEligibilityState =
  'valid' | 'under-minimum-age' | 'over-technical-limit' | 'invalid';

export interface BirthDateBounds {
  minDate: Date;
  maxDate: Date;
}

export interface BirthDateInputBounds {
  minDate: Date;
  maxDate: Date;
}

const isValidDate = (date: Date | null): date is Date =>
  date instanceof Date && !Number.isNaN(date.getTime());

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const subtractCalendarYears = (date: Date, years: number) => {
  const targetYear = date.getFullYear() - years;
  const lastDayOfTargetMonth = new Date(targetYear, date.getMonth() + 1, 0).getDate();

  return new Date(targetYear, date.getMonth(), Math.min(date.getDate(), lastDayOfTargetMonth));
};

export const normalizeRut = (value: string) => value.replace(/[.\s-]/g, '').toUpperCase();

export const formatRut = (value: string) => {
  const normalizedRut = normalizeRut(value);

  if (!normalizedRut) {
    return '';
  }

  const body = normalizedRut.slice(0, -1);
  const verificationDigit = normalizedRut.slice(-1);

  if (!body) {
    return verificationDigit;
  }

  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedBody}-${verificationDigit}`;
};

export const isValidRut = (value: string) => {
  const match = /^(\d{7,8})([0-9K])$/.exec(normalizeRut(value));

  if (!match) {
    return false;
  }

  const [, body, verificationDigit] = match;
  let sum = 0;
  let multiplier = 2;

  for (let index = body.length - 1; index >= 0; index -= 1) {
    sum += Number(body[index]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const result = 11 - (sum % 11);
  const expectedVerificationDigit = result === 11 ? '0' : result === 10 ? 'K' : String(result);

  return verificationDigit === expectedVerificationDigit;
};

export const normalizePhone = (value: string) => value.replace(/\D/g, '');

export const getBirthDateBounds = (today = new Date()): BirthDateBounds => {
  const normalizedToday = startOfDay(today);

  return {
    minDate: subtractCalendarYears(normalizedToday, 100),
    maxDate: subtractCalendarYears(normalizedToday, 19),
  };
};

export const getBirthDateInputBounds = (today = new Date()): BirthDateInputBounds => ({
  minDate: new Date(1900, 0, 1),
  maxDate: startOfDay(today),
});

export const getBirthDateEligibility = (
  birthDate: Date | null,
  today = new Date(),
): BirthDateEligibilityState => {
  if (!isValidDate(birthDate) || !isValidDate(today)) {
    return 'invalid';
  }

  const normalizedBirthDate = startOfDay(birthDate);
  const normalizedToday = startOfDay(today);

  if (normalizedBirthDate > normalizedToday) {
    return 'invalid';
  }

  const { minDate, maxDate } = getBirthDateBounds(normalizedToday);

  if (normalizedBirthDate < minDate) {
    return 'over-technical-limit';
  }

  if (normalizedBirthDate > maxDate) {
    return 'under-minimum-age';
  }

  return 'valid';
};

export const getHogarQuoteFormSchema = (today = new Date()) =>
  z.object({
    insuredRut: z
      .string()
      .transform(normalizeRut)
      .refine(isValidRut, { message: RUT_ERROR_MESSAGE }),
    birthDate: z
      .date({ error: BIRTH_DATE_ERROR_MESSAGE })
      .nullable()
      .refine((value) => getBirthDateEligibility(value, today) === 'valid', {
        message: BIRTH_DATE_ERROR_MESSAGE,
      }),
    email: z.string().email({ message: EMAIL_ERROR_MESSAGE }),
    phone: z
      .string()
      .transform(normalizePhone)
      .refine((value) => /^9\d{8}$/.test(value), { message: PHONE_ERROR_MESSAGE }),
    contactConsent: z.boolean().refine((value) => value, {
      message: CONTACT_CONSENT_ERROR_MESSAGE,
    }),
  });

export const schema = getHogarQuoteFormSchema();

export type HogarQuoteFormValues = z.infer<typeof schema>;

export const HOGAR_QUOTE_FORM_DEFAULT_VALUES: HogarQuoteFormValues = {
  insuredRut: '',
  birthDate: null,
  email: '',
  phone: '',
  contactConsent: false,
};
