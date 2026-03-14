import { createClient } from 'microcms-js-sdk';

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
  // 開発初期段階ではエラーを投げず、警告のみにしておきます（後で環境変数を設定してもらうため）
  console.warn('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is not defined');
}

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN || 'example', // プレースホルダー
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || 'xxx', // プレースホルダー
});

// --- 型定義 ---

// 1. お知らせ・入札情報（リスト型: endpoint='news'）
export type News = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  category: string[];      // ['お知らせ', '入札結果'など]
  content?: string;        // 本文（リッチエディタ）
  fiscalYear?: string;     // 年度（入札用）
  price?: string;          // 金額（入札用）
  pdfUrl?: string;         // PDFリンク
};

// 2. よくある質問（リスト型: endpoint='faq'）
export type Faq = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;           // 旧：質問（互換性のため維持）
  question?: string;        // 新：質問（microCMS側のフィールド名）
  category?: string | string[]; // カテゴリ（配列または文字列）
  answer: string;          // 回答
};

// 3. サイト資料メンバ（SiteStatus内の繰り返しフィールド用）
export type PublicDocument = {
  id?: string;
  title: string;
  category: string[];
  pdfFile?: { url: string };
  pdfUrl?: string;
  fiscalYear?: string;
  isLatest?: boolean;
  publishedAt?: string;
  createdAt?: string;
};

// 4. サイト全体のステータス（シングル型: endpoint='status'）
export type SiteStatus = {
  id: string;
  // 緊急バナー
  isEmergencyActive: boolean;
  emergencyMessage?: string;
  emergencyLinkUrl?: string;
  emergencyLinkLabel?: string;
  // 断水状況
  isWaterOutage: boolean;
  waterOutageSituation?: string;
  // 資料リストの統合（繰り返しフィールド）
  documents?: PublicDocument[];
};

// --- フェッチ関数 ---

// News（お知らせ・入札）取得
export const getNewsList = async (limit = 10, category?: string) => {
  try {
    const queries: any = { limit, orders: '-publishedAt' };
    if (category) {
      queries.filters = `category[contains]${category}`;
    }
    const data = await client.get({ endpoint: 'news', queries });
    return data.contents as News[];
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
};

export const getNewsDetail = async (contentId: string) => {
  try {
    return await client.get({ endpoint: 'news', contentId }) as News;
  } catch (error) {
    console.error('Failed to fetch news detail:', error);
    return null;
  }
};

// FAQ 取得
export const getFaqList = async (limit = 100) => {
  try {
    const data = await client.get({ endpoint: 'faq', queries: { limit } });
    return data.contents as Faq[];
  } catch (error) {
    console.error('Failed to fetch FAQ:', error);
    return [];
  }
};

// サイトステータス（緊急・断水・PDF資料）取得
// ※インポート機能（JSON）を利用するため、リスト型として作成し最初の1件を使用します
export const getSiteStatus = async (): Promise<SiteStatus | null> => {
  try {
    const data = await client.get<{ contents: SiteStatus[] }>({
      endpoint: 'status',
      queries: { limit: 1 }
    });
    return data.contents[0] || null;
  } catch (error) {
    // endpointが存在しない場合などは警告のみにする
    // console.warn('Failed to fetch site status:', error);
    return null;
  }
};

// 下位互換用：入札情報の取得
export const getBiddingList = (limit = 20) => getNewsList(limit, '入札');

// 下位互換用：旧 getPublicDocuments は SiteStatus 経由で取得するように
export const getPublicDocuments = async (categoryFilter?: string): Promise<PublicDocument[]> => {
  const status = await getSiteStatus();
  if (!status || !status.documents) return [];
  if (!categoryFilter) return status.documents;
  return status.documents.filter(doc => doc.category?.includes(categoryFilter));
};
