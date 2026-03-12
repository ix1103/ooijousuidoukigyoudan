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
export type Faq = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  question: string;
  answer: string;
  category: string;
};

// 緊急情報バナーの型定義（シングルコンテンツ型）
export type Emergency = {
  id: string;
  isActive: boolean;       // true のときだけバナーを表示
  message: string;         // 表示するテキスト
  linkUrl?: string;        // クリック先URL（省略可能）
  linkLabel?: string;      // ボタンのラベル（省略可能）
};

// 入札・契約情報の型定義
export type Bidding = {
  id: string;
  createdAt: string;
  publishedAt: string;
  title: string;
  type: string;            // '入札公告' | '落札結果' | '見積結果' | 'お知らせ'
  fiscalYear?: string;     // 年度 (例: '令和6年度')
  price?: string;          // 金額 (例: '2,888,000円')
  pdfUrl?: string;         // PDFリンク（省略可能）
  content?: string;        // 本文（省略可能）
};

// 【新規】断水情報の型定義（シングルコンテンツ型）
export type WaterOutage = {
  id: string;
  isOutage: boolean;       // 断水発生中かどうか
  situationInfo: string;   // 断水状況の説明用テキスト（「現在、断水は発生していません」など）
};

// 【新規】各種公表PDF・名簿等の汎用型定義（リスト型）
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
export const getFaqList = async (limit = 100) => {
  try {
    const data = await client.get({
      endpoint: 'faq',
      queries: { limit: limit },
    });
    return data.contents as Faq[];
  } catch (error) {
    console.error('Failed to fetch faq list:', error);
    return [];
  }
};

// 緊急情報を取得する関数（シングルコンテンツAPIを使用）
export const getEmergencyInfo = async (): Promise<Emergency | null> => {
  try {
    const data = await client.get({
      endpoint: 'emergency',
    });
    return data as Emergency;
  } catch (error) {
    console.error('Failed to fetch emergency info:', error);
    return null; // エラー時はnullを返し、バナーを非表示にする
  }
};

// 入札・契約情報一覧を取得する関数
export const getBiddingList = async (limit = 20) => {
  try {
    const data = await client.get({
      endpoint: 'bidding',
      queries: { limit: limit, orders: '-publishedAt' },
    });
    return data.contents as Bidding[];
  } catch (error) {
    console.error('Failed to fetch bidding list:', error);
    return []; // エラー時は空配列を返す
  }
};

// 【新規】断水情報を取得する関数（シングル）
export const getWaterOutageInfo = async (): Promise<WaterOutage | null> => {
  try {
    const data = await client.get({
      endpoint: 'water-outage',
    });
    return data as WaterOutage;
  } catch (error) {
    console.error('Failed to fetch water outage info:', error);
    return null;
  }
};

// 【新規】汎用ドキュメント一覧を取得する関数
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
