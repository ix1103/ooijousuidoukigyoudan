import { createClient } from 'microcms-js-sdk';

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
  // 開発初期段階ではエラーを投げず、警告のみにしておきます（後で環境変数を設定してもらうため）
  console.warn('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is not defined');
}

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN || 'example', // プレースホルダー
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || 'xxx', // プレースホルダー
});

// お知らせの型定義
export type News = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: string[];
};

// FAQの型定義
export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string[];
  createdAt: string;
  updatedAt: string;
};

// 水質情報の型定義
export type WaterQuality = {
  id: string;
  title: string;
  pdf_url: string;
  is_latest: boolean;
  plan_pdf_url: string;
  createdAt: string;
  updatedAt: string;
};

// 工業者向け書類の型定義
export type ContractorDoc = {
  id: string;
  title: string;
  category: string[];
  pdf_url: string;
  createdAt: string;
  updatedAt: string;
};

// サイト共通設定の型定義
export type SiteSettings = {
  phone_main: string;
  phone_emergency: string;
  business_hours: string;
  address: string;
  notice_banner?: string;
  updatedAt: string;
};

// 水質ページ基本設定の型定義
export type WqPageSettings = {
  subtitle?: string;
  tank_alert_desc?: string;
  updatedAt: string;
};

// 毎日検査リストの型定義
export type WqDaily = {
  id: string;
  item_name: string;
  description: string;
  updatedAt: string;
};

// 主な水質基準の型定義
export type WqStandard = {
  id: string;
  item_name: string;
  standard_value: string;
  category: string[];
  updatedAt: string;
};

// 受水槽管理リストの型定義
export type WqTank = {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
};

// お知らせ一覧を取得する関数
export const getNewsList = async (limit = 3) => {
  try {
    const data = await client.get({
      endpoint: 'news',
      queries: { limit: limit },
    });
    return data.contents as News[];
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
};

// 個別のお知らせを取得する関数
export const getNewsDetail = async (contentId: string) => {
  try {
    const detail = await client.get({
      endpoint: 'news',
      contentId: contentId,
    });
    return detail as News;
  } catch (error) {
    console.error(`Failed to fetch news detail for ${contentId}:`, error);
    return null;
  }
};

// FAQ一覧を取得する関数
export const getFAQList = async (limit = 100) => {
  try {
    const data = await client.get({
      endpoint: 'faq',
      queries: { limit: limit },
    });
    return data.contents as FAQ[];
  } catch (error) {
    console.error('Failed to fetch FAQ:', error);
    return [];
  }
};

// 水質情報一覧を取得する関数
export const getWaterQualityList = async () => {
  try {
    const data = await client.get({
      endpoint: 'water-quality',
      queries: { orders: '-is_latest' },
    });
    return data.contents as WaterQuality[];
  } catch (error) {
    console.error('Failed to fetch water quality list:', error);
    return [];
  }
};

// 工業者向け書類一覧を取得する関数
export const getContractorDocsList = async () => {
  try {
    const data = await client.get({
      endpoint: 'contractor-docs',
    });
    return data.contents as ContractorDoc[];
  } catch (error) {
    console.error('Failed to fetch contractor docs:', error);
    return [];
  }
};

// サイト共通設定を取得する関数
export const getSiteSettings = async () => {
  try {
    const data = await client.get({
      endpoint: 'site-settings',
    });
    return data as SiteSettings;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return null;
  }
};

export const getWqPageSettings = async () => {
  try {
    const data = await client.get({
      endpoint: 'wq-page',
    });
    return data as WqPageSettings;
  } catch (error) {
    console.warn('Failed to fetch wq-page settings:', error);
    return null;
  }
};

export const getWqDailyList = async () => {
  try {
    const data = await client.get({
      endpoint: 'wq-daily',
    });
    return data.contents as WqDaily[];
  } catch (error) {
    console.warn('Failed to fetch wq-daily:', error);
    return [];
  }
};

export const getWqStandardList = async () => {
  try {
    const data = await client.get({
      endpoint: 'wq-standard',
      queries: { limit: 100 },
    });
    return data.contents as WqStandard[];
  } catch (error) {
    console.warn('Failed to fetch wq-standard:', error);
    return [];
  }
};

export const getWqTankList = async () => {
  try {
    const data = await client.get({
      endpoint: 'wq-tank',
    });
    return data.contents as WqTank[];
  } catch (error) {
    console.warn('Failed to fetch wq-tank:', error);
    return [];
  }
};
