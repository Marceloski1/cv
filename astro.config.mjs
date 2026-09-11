import { defineConfig } from 'astro/config';
import localeConfig from './src/i18n/locales.json' with { type: 'json' };

export default defineConfig({
  i18n: {
    defaultLocale: localeConfig.defaultLocale,
    locales: localeConfig.locales,
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
