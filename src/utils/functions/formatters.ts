export const onlyDigits = (value: string): string => value.replace(/\D/g, '');

export const formatPhone = (value: string): string => {
  const digits = onlyDigits(value).slice(0, 9);
  if (digits.length <= 1) return digits;
  return `${digits.slice(0, 1)} ${digits.slice(1, 5)} ${digits.slice(5, 9)}`.trim();
};

export const normalizeDocument = (value: string): string =>
  value.replace(/[.\-\s]/g, '').toUpperCase();
