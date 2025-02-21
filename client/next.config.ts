import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "03lqczxh6t.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      }
    ]
  }
};

export default nextConfig;
