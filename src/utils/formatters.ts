/**
 * Converts any Latin digits (0-9) in a number or string into Eastern Arabic (Hindi) digits (٠-٩).
 */
export function toArabicDigits(val: number | string | null | undefined): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, (w) => arabicDigits[+w]);
}

/**
 * Formats a number with optional thousands separators and decimals in Eastern Arabic (Hindi) format.
 */
export function formatArabicNumber(
  num: number | null | undefined,
  options: { decimals?: number; showThousands?: boolean } = {}
): string {
  if (num === null || num === undefined || isNaN(num)) return '—';
  const { decimals = 0, showThousands = true } = options;

  const formatted = decimals > 0 ? num.toFixed(decimals) : Math.round(num).toString();

  if (showThousands) {
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '،');
    return toArabicDigits(parts.join('.'));
  }

  return toArabicDigits(formatted);
}
