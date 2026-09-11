import type { PixelLogoName, PixelPalette } from '../lib/pixel-logo';

export interface TechItem {
  logo: PixelLogoName;
  label: string;
  palette?: PixelPalette;
}

export const monogram = 'EMMF';

export const shortName = 'EDUARDO MAZZOLA';

export const heroNameLines = ['EDUARDO', 'MAZZOLA'] as const;

export const projectName = ['LOCAL AI', 'CODING AGENT'] as const;

export const contact = {
  email: 'pendragonn89@gmail.com',
  phone: '+53 55393216',
  phoneHref: '+5355393216',
  githubPlaceholder: '[github.com/usuario]',
  linkedinPlaceholder: '[linkedin.com/in/perfil]',
} as const;

export const companies = {
  avangenio: 'AVANGENIO',
  cujae: 'CUJAE',
} as const;

export const avangenioTech: TechItem[] = [
  { logo: 'nextjs', label: 'Next.js 16' },
  { logo: 'react', label: 'React 19' },
  { logo: 'tailwind', label: 'Tailwind 4' },
  { logo: 'generic', label: 'Turborepo' },
  { logo: 'generic', label: 'Zod' },
  { logo: 'generic', label: 'Keycloak' },
];

export const cujaeTech: TechItem[] = [
  { logo: 'spring', label: 'Spring Boot 3.4' },
  { logo: 'java', label: 'Java 21' },
  { logo: 'mariadb', label: 'MariaDB' },
  { logo: 'generic', label: 'Liquibase' },
  { logo: 'docker', label: 'Docker' },
  { logo: 'nginx', label: 'Nginx' },
];

export const projectTech: TechItem[] = [
  { logo: 'hono', label: 'Hono' },
  { logo: 'vercel', label: 'Vercel AI SDK', palette: { k: '#ffffff' } },
  { logo: 'generic', label: 'MCP', palette: { p: '#9a9a9a' } },
  { logo: 'sqlite', label: 'SQLite', palette: { s: '#7fc7e8' } },
  { logo: 'generic', label: 'Drizzle', palette: { p: '#9a9a9a' } },
  { logo: 'typescript', label: 'TypeScript' },
];

export const stackGrid: TechItem[] = [
  { logo: 'typescript', label: 'TypeScript' },
  { logo: 'java', label: 'Java' },
  { logo: 'react', label: 'React' },
  { logo: 'nextjs', label: 'Next.js' },
  { logo: 'tailwind', label: 'Tailwind' },
  { logo: 'spring', label: 'Spring Boot' },
  { logo: 'generic', label: 'NestJS' },
  { logo: 'postgres', label: 'PostgreSQL' },
  { logo: 'mariadb', label: 'MariaDB' },
  { logo: 'docker', label: 'Docker' },
  { logo: 'nginx', label: 'Nginx' },
  { logo: 'generic', label: 'GH Actions' },
];

export const sectionIds = {
  experience: 'experiencia',
  project: 'proyectos',
  stack: 'stack',
  contact: 'contacto',
} as const;
