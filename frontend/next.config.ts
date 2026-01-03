import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "api.tbotechnology.in",
      },
      {
        protocol: "https",
        hostname: "api.tbotechnology.in",
      },
      {
        protocol: "http",
        hostname: "images.tektravels.com",
      },
      {
        protocol: "https",
        hostname: "images.tektravels.com",
      },
      {
        protocol: "https",
        hostname: "affiliate.tektravels.com",
      },
    ],
  },
};

export default nextConfig;
