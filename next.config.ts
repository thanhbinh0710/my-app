import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*", // proxy to backend (backend listens on 3001)
      },
    ];
  },
};

export default nextConfig;
