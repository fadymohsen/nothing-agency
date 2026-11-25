import type { NextConfig } from "next";

// No static export: the admin panel needs a server (login, database, blob uploads).
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
