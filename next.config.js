module.exports = {
  poweredByHeader: false,
  compiler: { styledComponents: true },
  eslint: { ignoreDuringBuilds: true },
  i18n: { locales: ['en'], defaultLocale: 'en' },
  rewrites() {
    return [
      {
        source: '/en/singularity',
        destination: '/singularity/index.html',
        locale: false,
      },
      {
        source: '/en/singularity.js',
        destination: '/singularity/singularity.js',
        locale: false,
      },
      {
        source: '/en/singularity_bg.wasm',
        destination: '/singularity/singularity_bg.wasm',
        locale: false,
      },
      {
        source: '/en/assets/:path*',
        destination: '/singularity/assets/:path*',
        locale: false,
      },
    ];
  },
};
