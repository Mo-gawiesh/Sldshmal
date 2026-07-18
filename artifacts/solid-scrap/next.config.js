import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@assets'] = path.resolve(process.cwd(), '../../attached_assets');
    return config;
  },
  async rewrites() {
    return [
      { source: '/about', destination: '/' },
      { source: '/services', destination: '/' },
      { source: '/projects', destination: '/' },
      { source: '/contact', destination: '/' },
    ];
  },
};

export default nextConfig;
