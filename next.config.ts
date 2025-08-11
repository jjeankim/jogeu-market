import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    // domains: ['localhost', 'yourcdn.com', '127.0.0.1', 'static.toss.im', "jogeumarket.blob.core.windows.net"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'yourcdn.com',
        pathname: '/images/**',
      },
      {
        protocol: "https",
        hostname: "jogeumarket.blob.core.windows.net",
        pathname: "/**", 
      },
    ],
  },
};

export default nextConfig;
