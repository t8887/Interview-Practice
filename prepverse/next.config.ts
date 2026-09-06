import type { NextConfig } from "next";

// Static-export constraint (ADR-01): Cloudflare Pages serves a static build.
// No server, no image optimization service — see prepverse/CLAUDE.md hard rule 2.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
