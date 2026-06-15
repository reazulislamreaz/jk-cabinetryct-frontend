import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jk-cabinetry.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "jk-cabinetry.s3.amazonaws.com",
      },
    ],
    unoptimized: true,
  },
  // Optional: output setting
  output: "standalone",
};

export default nextConfig;
