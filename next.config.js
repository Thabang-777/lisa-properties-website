/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prop24.com',
      },
    ],
  },
}

module.exports = nextConfig
