import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // Static HTML → Cloudflare Pages, no server required
  trailingSlash: true,   // /about/ → consistent CF Pages routing
  images: {
    unoptimized: true,   // next/image optimisation needs a server; static = disable
  },
};

export default nextConfig;
