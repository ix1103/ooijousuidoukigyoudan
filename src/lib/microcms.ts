import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  // 開発初期段階ではエラーを投げず、警告のみにしておきます（後で環境変数を設定してもらうため）
  console.warn('MICROCMS_SERVICE_DOMAIN is not defined');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || 'example', // プレースホルダー
  apiKey: process.env.MICROCMS_API_KEY || 'xxx', // プレースホルダー
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
