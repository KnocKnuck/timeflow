/**
 * Currency formatting utilities using Intl.NumberFormat
 */

export const SUPPORTED_CURRENCIES = [
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "DKK", symbol: "kr", name: "Danish Krone" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "PLN", symbol: "zł", name: "Polish Złoty" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint" },
] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]["code"];

/**
 * Format amount as currency
 */
export function formatCurrency(
  amount: number,
  currency: CurrencyCode = "EUR",
  locale: string = "en-GB"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback if currency not supported
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Format amount as currency without symbol
 */
export function formatAmount(amount: number, locale: string = "en-GB"): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Parse formatted currency string to number
 */
export function parseCurrencyInput(value: string): number {
  // Remove currency symbols, spaces, and non-numeric characters except decimal point and minus
  const cleaned = value.replace(/[^\d.,-]/g, "");
  // Replace comma with dot for decimal
  const normalized = cleaned.replace(",", ".");
  return parseFloat(normalized) || 0;
}

/**
 * Get currency symbol for a given currency code
 */
export function getCurrencySymbol(currency: CurrencyCode): string {
  const currencyInfo = SUPPORTED_CURRENCIES.find((c) => c.code === currency);
  return currencyInfo?.symbol || currency;
}
