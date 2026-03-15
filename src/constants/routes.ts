/**
 * サイト全体のルーティング定義
 */
export const ROUTES = {
  HOME: '/',
  NEWS: '/news',
  SITEMAP: '/sitemap',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  EMERGENCY: '/emergency',
  RECRUIT: '/recruit',
  LINKS: '/links',

  // 企業団について
  ABOUT: {
    MAIN: '/about',
    BROCHURE: '/about/brochure',
    ASSEMBLY: '/about/assembly',
    COUNCIL: '/about/council', // 組織（企業長等）
    FINANCE: '/about/finance',
    DISCLOSURE: '/about/disclosure',
  },

  // 住民の方へ
  RESIDENT: {
    PROCEDURE: '/resident/procedure',
    PRICE: '/resident/price',
    METER: '/resident/meter',
    QUALITY: '/resident/quality',
    REPAIR: '/resident/repair-shops',
    TROUBLE: '/resident/trouble',
    OUTAGE: '/resident/water-outage',
    DOWNLOADS: '/resident/downloads',
    FAQ: '/resident/faq',
    BILLING_UPDATE: '/resident/billing-update',
    CROSS_CONNECTION: '/resident/cross-connection',
  },

  // 事業者の方へ
  BUSINESS: {
    BIDDING: '/business/bidding',
    BIDDING_RESULTS: '/business/bidding/results',
    CONTRACTOR: '/business/contractor',
    DESIGNATED_SHOPS: '/business/designated-shops',
    INVOICE: '/business/invoice',
  }
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
