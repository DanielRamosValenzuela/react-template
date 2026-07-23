import type { NextConfig } from 'next';

const HSTS_MAX_AGE_SECONDS = 60 * 60 * 24 * 360;

const nextConfig: NextConfig = {
  distDir: 'dist',
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'same-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Strict-Transport-Security',
            value: `max-age=${HSTS_MAX_AGE_SECONDS}; includeSubDomains; preload`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
