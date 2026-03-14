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
  title: string;           // タイトル
  news_title?: string;     // 別名候補1
  title_text?: string;     // 別名候補2
  content: string;         // 本文
  category?: string | string[]; // カテゴリ（配列または文字列）
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
  showInNews?: boolean;    // お知らせ欄に表示するかどうか
};

// --- お知らせ・FAQ統合用の型 ---
export type Announcement = {
  id: string;
  date: string;       // publishedAt または updatedAt
  title: string;
  category: string[];
  type: 'news' | 'faq';
  url: string;        // 遷移先URL
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

// 5. 固定ページ（リスト型: endpoint='pages'）
export type PageContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;           // ページタイトル
  slug: string;            // URLスラッグ
  content: string;         // 本文（リッチエディタ）
  menuLocation?: 'resident' | 'business' | 'bidding' | 'outline' | 'none'; // メニュー配置
  priority?: number;       // 並び順優先度
  subtitle?: string;       // サブタイトル
  english_title?: string;  // 英語タイトル
};

// 4. サイト全体のステータス（シングル型: endpoint='status'）
export type SiteStatus = {
  id: string;
  // 緊急バナー
  isEmergencyActive: boolean;
  emergencyMessage?: string;
  emergencyLinkUrl?: string; // 外部用リンク（任意）
  emergencyLinkLabel?: string;
  emergencyContent?: string; // ← 新規：緊急情報詳細ページ用の本文
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

// --- 【新規】お知らせとFAQをマージして取得する関数 ---
export const getMergedAnnouncements = async (limit = 10): Promise<Announcement[]> => {
  try {
    // 両方のデータを並行して取得
    const [newsList, faqList] = await Promise.all([
      getNewsList(limit),
      getFaqList(limit)
    ]);

    // Newsを共通型に変換
    const newsAnnouncements: Announcement[] = newsList.map(item => ({
      id: item.id,
      date: item.publishedAt || item.createdAt,
      title: item.title || item.news_title || item.title_text || '無題のお知らせ',
      category: Array.isArray(item.category) ? item.category : (item.category ? [item.category] : []),
      type: 'news',
      url: `/news/${item.id}`
    }));

    // Faqを共通型に変換（showInNews が true のものだけ抽出）
    const faqAnnouncements: Announcement[] = faqList
      .filter(item => item.showInNews === true)
      .map(item => ({
        id: item.id,
        date: item.updatedAt || item.publishedAt,
        title: `[更新] ${item.question || item.title || 'よくある質問'}`,
        category: ['よくある質問'],
        type: 'faq',
        url: `/resident/faq?id=${item.id}`
      }));

    // 結合して日付順にソート（降順）
    return [...newsAnnouncements, ...faqAnnouncements]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch merged announcements:', error);
    return [];
  }
};

// --- 固定ページ取得関数 ---

// 特定のスラッグからページ情報を取得
export const getPageBySlug = async (slug: string): Promise<PageContent | null> => {
  try {
    // フィルタ機能は空白に弱いため、全件取得してJS側でトリム比較する
    const data = await client.get<{ contents: PageContent[] }>({
      endpoint: 'pages',
      queries: {
        limit: 100
      }
    });
    
    // スラッグをトリムして比較
    return data.contents.find(p => p.slug?.trim() === slug.trim()) || null;
  } catch (error) {
    console.error(`Failed to fetch page with slug: ${slug}`, error);
    return null;
  }
};


// 指定したメニュー配置のページ一覧を取得
export const getPagesByMenu = async (location: 'resident' | 'business' | 'bidding' | 'outline'): Promise<PageContent[]> => {
  try {
    // フィルタを使わず全件取得（最大100件）して、JS側で柔軟に判定する
    const data = await client.get<{ contents: any[] }>({
      endpoint: 'pages',
      queries: {
        limit: 100,
        orders: 'priority',
      }
    });

    const pages = data.contents.filter(page => {
      const loc = page.menuLocation;
      if (!loc) return false;

      // 配列の場合と文字列の場合の両方に対応し、トリムも行う
      if (Array.isArray(loc)) {
        return loc.some(v => typeof v === 'string' && v.trim() === location);
      }
      return typeof loc === 'string' && loc.trim() === location;
    }) as PageContent[];

    // JS側で確実にソート（優先度が未設定の場合は一番下にする）
    return pages.sort((a, b) => {
      const priorityA = a.priority ?? 9999;
      const priorityB = b.priority ?? 9999;
      return priorityA - priorityB;
    });
  } catch (error) {
    console.error(`Failed to fetch pages for menu: ${location}`, error);
    return [];
  }
};


