/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ['scripts']
  },
  optimizeFonts: true,
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
