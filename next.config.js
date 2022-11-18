module.exports = {
  poweredByHeader: false,
  compiler: { styledComponents: true },
  eslint: { ignoreDuringBuilds: true },
  i18n: { locales: ['en'], defaultLocale: 'en' },
  rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: '/singularity/assets/:path*',
        locale: false,
      },
    ];
  },
};
