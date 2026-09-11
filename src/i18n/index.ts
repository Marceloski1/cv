import localeConfig from './locales.json';
import type { Dictionary, Locale } from './types';
import { es } from './es';
import { en } from './en';

export type { Dictionary, Locale };

export const defaultLocale = localeConfig.defaultLocale as Locale;

export const locales = localeConfig.locales as Locale[];

export const dictionaries: Record<Locale, Dictionary> = {
  es,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localeHref(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}
