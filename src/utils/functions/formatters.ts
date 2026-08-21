export const onlyDigits = (value: string): string => value.replace(/\D/g, '');

export const formatPhone = (value: string): string => {
  const digits = onlyDigits(value).slice(0, 9);
  if (digits.length <= 1) return digits;
  return `${digits.slice(0, 1)} ${digits.slice(1, 5)} ${digits.slice(5, 9)}`.trim();
};

export const normalizeDocument = (value: string): string =>
  value.replace(/[.\-\s]/g, '').toUpperCase();

const cleanChileanRut = (value: string): string =>
  value
    .toUpperCase()
    .replace(/[^0-9K]/g, '')
    .slice(0, 9);

export const normalizeChileanRut = (value: string): string => {
  const cleanValue = cleanChileanRut(value);
  if (cleanValue.length < 2) return cleanValue;
  return `${cleanValue.slice(0, -1)}-${cleanValue.slice(-1)}`;
};

export const formatChileanRut = (value: string): string => {
  const normalizedRut = normalizeChileanRut(value);
  const [body = '', checkDigit] = normalizedRut.split('-');
  if (!checkDigit) return body;

  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedBody}-${checkDigit}`;
};

export const normalizeChileanMobile = (value: string): string => {
  const digits = onlyDigits(value);
  const nationalNumber = digits.startsWith('56') && digits.length > 9 ? digits.slice(2) : digits;
  return nationalNumber.slice(0, 9);
};

export const toChileanInternationalMobile = (value: string): string =>
  `+56${normalizeChileanMobile(value)}`;

export const serializeLocalDate = (value: Date): string => {
  if (Number.isNaN(value.getTime())) throw new TypeError('A valid local date is required');

  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
