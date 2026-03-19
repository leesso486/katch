import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home_template.html",
      },
    ];
  },
};
export default nextConfig;
