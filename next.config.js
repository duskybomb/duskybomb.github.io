/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable static export
  distDir: 'out',
  // Disable server-side features for static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

module.exports = nextConfig 