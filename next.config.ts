import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
  reactStrictMode: true,
};
export default nextConfig;
