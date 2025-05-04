import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  // If you're using Next.js 13+
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
