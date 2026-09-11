import type { Dictionary } from './types';

export const en: Dictionary = {
  localeName: 'English',
  documentTitle: 'Marcelo Mazzola / Frontend Developer',
  documentDescription:
    'CV of Eduardo Marcelo Mazzola Fernandez, a frontend developer working in micro-frontend architectures with full stack experience.',
  skipToContent: 'Skip to content',
  languageNavLabel: 'Language',
  moreLanguagesLabel: 'More languages coming',

  navExp: 'EXPERIENCE',
  navProj: 'PROJECTS',
  navStack: 'STACK',
  navContact: 'CONTACT',

  heroKicker: 'HAVANA, CUBA / REMOTE',
  heroFullName: 'Eduardo Marcelo Mazzola Fernandez',
  heroTagline:
    'I build interfaces inside micro-frontend architectures, with full stack experience and Clean Architecture.',
  ctaPrimary: 'SEE PROJECTS',
  ctaSecondary: 'DOWNLOAD CV',
  // TODO(cv): point to the English CV once it exists
  cvDownload: {
    href: '/cv/eduardo-mazzola-cv-es.docx',
    fileName: 'CV Eduardo Marcelo Mazzola Fernández.docx',
  },

  expKicker: 'TRACK RECORD',
  expHead: 'WHERE I HAVE WORKED',
  role1: 'FRONTEND DEVELOPER',
  period1: '[MONTH YYYY - PRESENT]',
  body1:
    'Frontend for eTravelBeyond, a travel platform built on Multi-Zones micro-frontends inside a TypeScript monorepo. Shared internal packages for UI, authentication and navigation across apps, SSO through Keycloak, and feature flags for staged releases.',
  role2: 'FULL STACK DEVELOPER',
  period2: '[MONTH YYYY - MONTH YYYY]',
  body2:
    'Sobrecarga Docente, an academic workload management system for university faculty, built end to end: Clean Architecture on the backend, versioned migrations, and the whole application shipped in containers.',

  projKicker: 'PERSONAL PROJECT',
  projBody:
    'A command-line tool that orchestrates language models running entirely on the local machine, with no external APIs. Model Context Protocol exposes tools to the model, SQLite handles persistence, and it ships with its own terminal interface.',
  projLink: 'VIEW THE REPOSITORY',

  stackKicker: 'TOOLING',
  stackHead: 'WHAT I BUILD WITH',

  eduKicker: 'EDUCATION',
  eduDegree: 'COMPUTER ENGINEERING',
  eduSchool: 'Universidad Tecnologica de La Habana Jose Antonio Echeverria',
  eduYear: '[GRADUATION YEAR]',

  awardKicker: 'RECOGNITION',
  awards: [
    { title: '3RD PLACE - COPA EULER 2025', where: 'Hackathon held at CUJAE' },
    { title: 'IPBC CARIBBEAN QUALIFIER 2025', where: 'Participation in the IPBC Caribbean Qualifier 2025' },
    { title: 'UNESCO YOUTH HACKATHON 2025', where: 'Participation in the UNESCO Youth Hackathon 2025' },
  ],

  contactKicker: 'CONTACT',
  contactHead: 'LET US TALK ABOUT YOUR NEXT PRODUCT',
  labelEmail: 'EMAIL',
  labelPhone: 'PHONE',
  labelLangs: 'LANGUAGES',
  langsValue: 'Native Spanish / English B1',
  contactCta: 'GET IN TOUCH',

  footerLocation: 'Havana, Cuba / Available for remote work',
  footerLegal: 'Last updated: SEPTEMBER 2026',
};
