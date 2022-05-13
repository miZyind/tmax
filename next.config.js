module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: { styledComponents: true },
  eslint: { ignoreDuringBuilds: true },
  i18n: { locales: ['en'], defaultLocale: 'en' },
  rewrites() {
    return [
      {
        source: '/singularity',
        destination: '/singularity/index.html',
      },
      {
        source: '/singularity.js',
        destination: '/singularity/singularity.js',
      },
      {
        source: '/singularity_bg.wasm',
        destination: '/singularity/singularity_bg.wasm',
      },
      {
        source: '/assets/:path*',
        destination: '/singularity/assets/:path*',
      },
    ];
  },
};
