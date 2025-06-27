
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  // If you encounter issues with MDX + RSC, you might need webpack configuration.
  // For simple markdown as string, it's usually not needed.
  // Example:
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@mdx-js/react': require.resolve('@mdx-js/react'),
  //   };
  //   return config;
  // },
  // experimental: {
  //   taint: true, // Recommended for server actions security with zod
  // }
};

export default nextConfig;
