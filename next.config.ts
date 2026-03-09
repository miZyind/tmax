import type { NextConfig } from 'next';

export default {
  compiler: { styledComponents: true },
  i18n: { locales: ['en'], defaultLocale: 'en' },
} satisfies NextConfig;
