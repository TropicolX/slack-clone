/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.slack-edge.com',
      },
    ],
  },
};

export default nextConfig;
