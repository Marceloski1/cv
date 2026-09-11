import type { LogoName, PixelPalette } from '../lib/pixel-logo';

export interface TechItem {
  logo: LogoName;
  label: string;
  palette?: PixelPalette;
}

export const monogram = 'EMMF';

export const shortName = 'MARCELO MAZZOLA';

export const heroNameLines = ['MARCELO', 'MAZZOLA'] as const;

export const projectName = ['LOCAL AI', 'CODING AGENT'] as const;

export const projectRepoUrl = 'https://github.com/Marceloski1/my-local-code';

export const contact = {
  email: 'pendragonn89@gmail.com',
  phone: '+53 55393216',
  phoneHref: '+5355393216',
  githubUrl: 'https://github.com/Marceloski1',
  githubLabel: 'github.com/Marceloski1',
  linkedinUrl: 'https://www.linkedin.com/in/marcelo-mazzola-b4a33b2a1/',
  linkedinLabel: 'linkedin.com/in/marcelo-mazzola-b4a33b2a1',
} as const;

export const companies = {
  avangenio: 'AVANGENIO',
  cujae: 'CUJAE',
} as const;

export const avangenioTech: TechItem[] = [
  { logo: 'nextjs', label: 'Next.js 16' },
  { logo: 'react', label: 'React 19' },
  { logo: 'tailwind', label: 'Tailwind 4' },
  { logo: 'turborepo', label: 'Turborepo' },
  { logo: 'zod', label: 'Zod' },
  { logo: 'generic', label: 'Keycloak' },
];

export const cujaeTech: TechItem[] = [
  { logo: 'spring', label: 'Spring Boot 3.4' },
  { logo: 'java', label: 'Java 21' },
  { logo: 'mariadb', label: 'MariaDB' },
  { logo: 'liquibase', label: 'Liquibase' },
  { logo: 'docker', label: 'Docker' },
  { logo: 'nginx', label: 'Nginx' },
];

export const projectTech: TechItem[] = [
  { logo: 'hono', label: 'Hono' },
  { logo: 'vercel', label: 'Vercel AI SDK', palette: { k: '#ffffff' } },
  { logo: 'mcp-on-dark', label: 'MCP' },
  { logo: 'sqlite', label: 'SQLite' },
  { logo: 'drizzle', label: 'Drizzle' },
  { logo: 'typescript', label: 'TypeScript' },
];

export const stackGrid: TechItem[] = [
  { logo: 'typescript', label: 'TypeScript' },
  { logo: 'java', label: 'Java' },
  { logo: 'react', label: 'React' },
  { logo: 'nextjs', label: 'Next.js' },
  { logo: 'tailwind', label: 'Tailwind' },
  { logo: 'spring', label: 'Spring Boot' },
  { logo: 'nestjs', label: 'NestJS' },
  { logo: 'postgres', label: 'PostgreSQL' },
  { logo: 'mariadb', label: 'MariaDB' },
  { logo: 'docker', label: 'Docker' },
  { logo: 'nginx', label: 'Nginx' },
  { logo: 'github-actions', label: 'GH Actions' },
];

export const sectionIds = {
  experience: 'experiencia',
  project: 'proyectos',
  stack: 'stack',
  contact: 'contacto',
} as const;
