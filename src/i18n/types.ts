import localeConfig from './locales.json';

export type Locale = (typeof localeConfig.locales)[number];

export interface Dictionary {
  localeName: string;
  documentTitle: string;
  documentDescription: string;
  skipToContent: string;
  languageNavLabel: string;
  moreLanguagesLabel: string;

  navExp: string;
  navProj: string;
  navStack: string;
  navContact: string;

  heroKicker: string;
  heroFullName: string;
  heroTagline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cvDownload: { href: string; fileName: string };

  expKicker: string;
  expHead: string;
  role1: string;
  period1: string;
  body1: string;
  role2: string;
  period2: string;
  body2: string;

  projKicker: string;
  projBody: string;
  projLink: string;

  stackKicker: string;
  stackHead: string;

  eduKicker: string;
  eduDegree: string;
  eduSchool: string;
  eduYear: string;

  awardKicker: string;
  awards: { title: string; where: string }[];

  contactKicker: string;
  contactHead: string;
  labelEmail: string;
  labelPhone: string;
  labelLangs: string;
  langsValue: string;
  contactCta: string;

  footerLocation: string;
  footerLegal: string;
}
