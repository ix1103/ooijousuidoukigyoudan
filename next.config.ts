import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 住民向けページ（旧 → 新）
      { source: '/guide', destination: '/resident/price', permanent: true },
      { source: '/water-quality', destination: '/resident/quality', permanent: true },
      { source: '/about/water-quality', destination: '/resident/quality', permanent: true },
      { source: '/faq', destination: '/resident/faq', permanent: true },
      // 業者向けページ（旧 → 新）
      { source: '/contractor', destination: '/business/contractor', permanent: true },
      { source: '/business', destination: '/business/bidding', permanent: true },
      // 組織情報（旧 → 新）
      { source: '/about/outline', destination: '/about', permanent: true },
      { source: '/about/business', destination: '/about', permanent: true },
      // トラブルページ（旧 → 新）
      { source: '/trouble', destination: '/resident/trouble', permanent: true },
      // 旧HPからのリンク（必要に応じて）
      { source: '/suisitu.html', destination: '/resident/quality', permanent: true },
    ];
  },
};

export default nextConfig;
