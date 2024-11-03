/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.slack-edge.com',
      },
      {
        hostname: 'a.slack-edge.com',
      },
      {
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
