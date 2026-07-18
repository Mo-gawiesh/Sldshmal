import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Enable gzip/brotli compression
  compress: true,

  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 768, 1024, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
    qualities: [80, 85],
    minimumCacheTTL: 31536000, // 1 year cache for images
  },

  // Webpack alias configuration
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd(), './src');
    config.resolve.alias['@assets'] = path.resolve(process.cwd(), '../../attached_assets');
    return config;
  },

  // Rewrites for SPA-style navigation
  async rewrites() {
    return [
      { source: '/about', destination: '/' },
      { source: '/services', destination: '/' },
      { source: '/projects', destination: '/' },
      { source: '/contact', destination: '/' },
    ];
  },

  // Cache-Control headers for static assets
  async headers() {
    return [
      {
        source: '/(.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif|woff|woff2|ttf|otf|eot))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
