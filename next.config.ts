import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.0.101"],
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
