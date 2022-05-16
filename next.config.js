/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ekert-s3-bucket.s3.eu-west-3.amazonaws.com'],
  },
}

module.exports = nextConfig
