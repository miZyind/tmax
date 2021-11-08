module.exports = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  rewrites() {
    return [
      {
        source: '/singularity',
        destination: '/singularity/index.html',
      },
      {
        source: '/wasm.js',
        destination: '/singularity/wasm.js',
      },
      {
        source: '/wasm_bg.wasm',
        destination: '/singularity/wasm_bg.wasm',
      },
      {
        source: '/assets/:path*',
        destination: '/singularity/assets/:path*',
      },
    ];
  },
};
