import { createClient } from 'microcms-js-sdk';

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
  // 開発初期段階ではエラーを投げず、警告のみにしておきます（後で環境変数を設定してもらうため）
  console.warn('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is not defined');
}

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN || 'example', // プレースホルダー
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || 'xxx', // プレースホルダー
});

// 【統合API 1】記事・コンテンツ汎用型（お知らせ、FAQ、入札情報など）
export type Post = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;           // タイトル
  category: string[];      // カテゴリ（'お知らせ', '入札情報', 'FAQ'など）
  content?: string;        // 本文（リッチエディタまたはテキスト）
  answer?: string;         // FAQの回答用
  fiscalYear?: string;     // 年度（入札情報などで使用）
  price?: string;          // 金額（入札情報などで使用）
  pdfUrl?: string;         // 関連URL（省略可能）
};

// 【統合API 2】各種公表PDF・名簿等の汎用型定義（リスト型）
export type PublicDocument = {
  id: string;
  createdAt: string;
  publishedAt: string;
  title: string;           // タイトル
  category: string[];      // カテゴリ（'指定工事店', '水質検査計画', '予算' など）
  pdfFile?: { url: string };// microCMSのファイルフィールド
  pdfUrl?: string;         // 外部リンクベタ書き用
  fiscalYear?: string;     // 年度（'令和7年度' など）
  isLatest?: boolean;      // 最新版としてハイライトするかどうか
};

// 【統合API 3】サイト全体のステータス／緊急情報（シングルコンテンツ型）
export type SiteStatus = {
  id: string;
  // 緊急バナー関連
  isEmergencyActive: boolean; 
  emergencyMessage?: string;   
  emergencyLinkUrl?: string;  
  emergencyLinkLabel?: string;
  // 断水情報関連
  isWaterOutage: boolean;     
  waterOutageSituation?: string; 
};

// ==========================================
// 統合API用フェッチ関数
// ==========================================

// 1. Post（記事・コンテンツ）取得用
export const getPosts = async (categoryFilter?: string, limit = 100) => {
  try {
    const queries: any = { limit: limit, orders: '-publishedAt' };
    if (categoryFilter) {
      queries.filters = `category[contains]${categoryFilter}`;
    }
    const data = await client.get({
      endpoint: 'posts',
      queries: queries,
    });
    return data.contents as Post[];
  } catch (error) {
    console.error(`Failed to fetch posts for category ${categoryFilter}:`, error);
    return [];
  }
};

export const getPostDetail = async (contentId: string) => {
  try {
    const detail = await client.get({
      endpoint: 'posts',
      contentId: contentId,
    });
    return detail as Post;
  } catch (error) {
    console.error(`Failed to fetch post detail for ${contentId}:`, error);
    return null;
  }
};

// 2. PublicDocument（PDF資料）取得用
export const getPublicDocuments = async (categoryFilter?: string, limit = 100) => {
  try {
    const queries: any = { limit: limit, orders: '-publishedAt' };
    if (categoryFilter) {
      queries.filters = `category[contains]${categoryFilter}`;
    }
    const data = await client.get({
      endpoint: 'documents',
      queries: queries,
    });
    return data.contents as PublicDocument[];
  } catch (error) {
    console.error(`Failed to fetch documents for category ${categoryFilter}:`, error);
    return [];
  }
};

// 3. SiteStatus（緊急バナー＆断水状況）取得用
export const getSiteStatus = async (): Promise<SiteStatus | null> => {
  try {
    const data = await client.get({
      endpoint: 'status',
    });
    return data as SiteStatus;
  } catch (error) {
    console.error('Failed to fetch site status:', error);
    return null;
  }
};

// ==========================================
// 下位互換用ヘルパー関数（既存コードの修正量を減らすため）
// ==========================================

export const getNewsList = async (limit = 3) => getPosts('お知らせ', limit);
export const getNewsDetail = getPostDetail;
export const getFaqList = async (limit = 100) => getPosts('FAQ', limit);
export const getBiddingList = async (limit = 20) => getPosts('入札情報', limit);
