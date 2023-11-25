/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
