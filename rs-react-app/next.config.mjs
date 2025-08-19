import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  reactStrictMode: true
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);