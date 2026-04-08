import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.pare-des.tn",
      },
    ],
  },
};

export default nextConfig;
