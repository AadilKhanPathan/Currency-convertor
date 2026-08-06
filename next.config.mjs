/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // Set your GitHub repository name here
  basePath: process.env.NODE_ENV === 'production' ? '/Currency-converter' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Currency-converter/' : '',

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;