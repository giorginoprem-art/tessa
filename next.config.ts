import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/tessa" : "";

const nextConfig: NextConfig = {
  // Gunakan static export untuk GitHub Pages
  output: "export",
  // basePath untuk GitHub Pages dengan path /tessa/
  basePath: basePath,
  // Disable image optimization untuk static export
  images: {
    unoptimized: true,
  },
  // Expose basePath ke client-side environment
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
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
