import cujae from './cujae.png';
import docker from './docker.png';
import drizzle from './drizzle.png';
import githubActions from './github-actions.png';
import liquibase from './liquibase.png';
import mcp from './mcp.png';
import mcpOnDark from './mcp-on-dark.png';
import nestjs from './nestjs.png';
import postgres from './postgres.png';
import sqlite from './sqlite.png';
import tailwind from './tailwind.png';
import turborepo from './turborepo.png';
import zod from './zod.png';
import type { ImageMetadata } from 'astro';

export const imageLogos = {
  cujae,
  docker,
  drizzle,
  'github-actions': githubActions,
  liquibase,
  mcp,
  'mcp-on-dark': mcpOnDark,
  nestjs,
  postgres,
  sqlite,
  tailwind,
  turborepo,
  zod,
} satisfies Record<string, ImageMetadata>;

export type ImageLogoName = keyof typeof imageLogos;
