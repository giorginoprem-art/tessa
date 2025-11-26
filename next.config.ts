import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "gior-bali-tour.com",
          },
        ],
        destination: "https://giorbalitour.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
