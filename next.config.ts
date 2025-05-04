/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },

  images: {
    domains: ["i.pravatar.cc"],
  },
  reactStrictMode: true,

  productionBrowserSourceMaps: false,

  compress: true,
};

module.exports = nextConfig;
