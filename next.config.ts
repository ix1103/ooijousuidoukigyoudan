import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 住民向けページ（旧 → 新）
      { source: '/guide', destination: '/resident/price', permanent: true },
      { source: '/water-quality', destination: '/resident/quality', permanent: true },
      { source: '/faq', destination: '/resident/faq', permanent: true },
      // 業者向けページ（旧 → 新）
      { source: '/contractor', destination: '/business/contractor', permanent: true },
      // トラブルページ（旧 → 新）
      { source: '/trouble', destination: '/resident/trouble', permanent: true },
    ];
  },
};

export default nextConfig;
