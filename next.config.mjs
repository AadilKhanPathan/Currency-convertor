/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Ensure this matches your EXACT repository name on GitHub (case-sensitive)
  basePath: process.env.NODE_ENV === 'production' ? '/Currency-converter' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Currency-converter' : '',

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
      },
    ],
  },
  experimental: {
    reactCompiler: true, // Moved under experimental (if using Next.js 14/15)
  },
};

export default nextConfig;