import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite HMR/dev assets quando o celular acessa via IP da rede local.
  allowedDevOrigins: ["10.0.0.101"],
};

export default nextConfig;
