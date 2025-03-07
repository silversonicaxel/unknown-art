import withBundleAnalyzer from '@next/bundle-analyzer'


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

const withNextBundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.NEXT_BUNDLE_ANALYZER === 'true'
})

export default withNextBundleAnalyzer(nextConfig)
