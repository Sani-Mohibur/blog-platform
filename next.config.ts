import "./src/env";
import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // 1. Keep auth requests routed to backend auth handler
        source: "/api/auth/:path*",
        destination: "https://prisma-blog-server-a55e.onrender.com/auth/:path*",
      },
      {
        // 2. Map all other data calls (like /api/posts -> /posts) by stripping out "/api"
        source: "/api/:path*",
        destination: "https://prisma-blog-server-a55e.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
