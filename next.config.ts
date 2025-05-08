/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },

  images: {
    domains: ["i.pravatar.cc"],
    minimumCacheTTL: 60,
  },

  serverRuntimeConfig: {
    api: {
      bodyParser: {
        sizeLimit: "1mb",
      },
    },
  },

  reactStrictMode: true,

  productionBrowserSourceMaps: false,
  // optimizeFonts: true,
  compress: true,
};

module.exports = nextConfig;
