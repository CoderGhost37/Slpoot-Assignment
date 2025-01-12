import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "03lqczxh6t.ufs.sh",
      }
    ]
  }
};

export default nextConfig;
