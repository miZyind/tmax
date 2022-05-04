module.exports = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
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
