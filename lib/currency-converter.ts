/**
 * Currency conversion utilities
 */

import currencyRatesData from "@/data/currency-rates.json";

export interface CurrencyConversionResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: number;
  rate: number;
  inverseRate: number;
  lastUpdated: string;
}

/**
 * Get all available currencies
 */
export function getAvailableCurrencies() {
  return [
    { code: currencyRatesData.base, name: "Euro" },
    ...Object.keys(currencyRatesData.rates)
      .sort()
      .map((code) => ({ code, name: getCurrencyName(code) })),
  ];
}

/**
 * Get currency name from code
 */
function getCurrencyName(code: string): string {
  const names: Record<string, string> = {
    USD: "US Dollar",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    CHF: "Swiss Franc",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CNY: "Chinese Yuan",
    SEK: "Swedish Krona",
    NZD: "New Zealand Dollar",
    MXN: "Mexican Peso",
    SGD: "Singapore Dollar",
    HKD: "Hong Kong Dollar",
    NOK: "Norwegian Krone",
    KRW: "South Korean Won",
    TRY: "Turkish Lira",
    RUB: "Russian Ruble",
    INR: "Indian Rupee",
    BRL: "Brazilian Real",
    ZAR: "South African Rand",
    DKK: "Danish Krone",
    PLN: "Polish Złoty",
    THB: "Thai Baht",
    IDR: "Indonesian Rupiah",
    HUF: "Hungarian Forint",
    CZK: "Czech Koruna",
    ILS: "Israeli Shekel",
    CLP: "Chilean Peso",
    PHP: "Philippine Peso",
    AED: "UAE Dirham",
    COP: "Colombian Peso",
    SAR: "Saudi Riyal",
    MYR: "Malaysian Ringgit",
    RON: "Romanian Leu",
    BGN: "Bulgarian Lev",
    HRK: "Croatian Kuna",
    ISK: "Icelandic Króna",
  };
  return names[code] || code;
}

/**
 * Convert currency
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): CurrencyConversionResult {
  if (amount < 0) {
    throw new Error("Amount cannot be negative");
  }

  if (fromCurrency === toCurrency) {
    return {
      amount,
      fromCurrency,
      toCurrency,
      convertedAmount: amount,
      rate: 1,
      inverseRate: 1,
      lastUpdated: currencyRatesData.lastUpdated,
    };
  }

  const base = currencyRatesData.base;
  let rate = 1;

  // Convert to EUR first if needed, then to target currency
  if (fromCurrency === base) {
    // From EUR to other
    rate = (currencyRatesData.rates as any)[toCurrency];
  } else if (toCurrency === base) {
    // From other to EUR
    rate = 1 / (currencyRatesData.rates as any)[fromCurrency];
  } else {
    // From one currency to another (via EUR)
    const fromRate = (currencyRatesData.rates as any)[fromCurrency];
    const toRate = (currencyRatesData.rates as any)[toCurrency];
    rate = toRate / fromRate;
  }

  if (!rate) {
    throw new Error("Currency not supported");
  }

  const convertedAmount = Math.round(amount * rate * 100) / 100;
  const inverseRate = Math.round((1 / rate) * 10000) / 10000;

  return {
    amount,
    fromCurrency,
    toCurrency,
    convertedAmount,
    rate: Math.round(rate * 10000) / 10000,
    inverseRate,
    lastUpdated: currencyRatesData.lastUpdated,
  };
}
