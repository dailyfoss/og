/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  api: {
    responseLimit: '10mb',
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
  },
}

module.exports = nextConfig
