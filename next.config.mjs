/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Enables static HTML export for GitHub Pages */
  output: 'export',

  /* Required for GitHub Pages (disables Node.js server image optimization) */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
      },
    ],
  },

  /* Kept your React Compiler option */
  reactCompiler: true,
};

export default nextConfig;