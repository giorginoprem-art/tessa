import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gunakan static export untuk GitHub Pages
  output: "export",
  // basePath untuk GitHub Pages dengan path /tessa/
  basePath: process.env.NODE_ENV === "production" ? "/tessa" : "",
  // Disable image optimization untuk static export
  images: {
    unoptimized: true,
  },
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
