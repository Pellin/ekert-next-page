/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ekert-s3-bucket.s3.eu-west-3.amazonaws.com'],
  },
  env: {
    NEXTAUTH_SECRET: 'z4DuPQogiFIvA3y8AANPcaWFmKV84Bdb+04TXRJSbBI=',
  },
}

module.exports = nextConfig
