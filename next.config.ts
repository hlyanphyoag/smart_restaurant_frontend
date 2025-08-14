import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos", "loremflickr.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // Not recommended for production
  },
};

export default nextConfig;
