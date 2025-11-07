/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['http://localhost:3000'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // In development, proxy requests to the Nest.js API server
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
};

export default nextConfig;