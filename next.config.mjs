/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rightmove.co.uk',
      },
    ],
  },
};

export default nextConfig;
