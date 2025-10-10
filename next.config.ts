import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Optional: If you want to restrict to a specific path prefix,
        // you can use pathname: '/photo-**' or similar,
        // but often it's simplest to leave it as is for the whole host.
        // pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
