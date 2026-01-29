import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'savorystories-server-mern.onrender.com',
        pathname: '/uploads/**', 
      }
    ],
  },
};

export default nextConfig;
