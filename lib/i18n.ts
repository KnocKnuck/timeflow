/**
 * i18n utilities - future-ready for next-intl
 */

export const SUPPORTED_LOCALES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Get locale from browser or default
 */
export function getPreferredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const browserLang = navigator.language.split("-")[0];
  const supported = SUPPORTED_LOCALES.find((l) => l.code === browserLang);

  return supported ? supported.code : DEFAULT_LOCALE;
}

/**
 * Placeholder for translation function
 * Replace with next-intl when implementing i18n
 */
export function t(key: string): string {
  // This will be replaced with actual translations
  return key;
}
