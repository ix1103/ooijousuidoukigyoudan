/**
 * アイ君のための知識ベース（V9：スコアリング検索エンジン仕様）
 * 単なるキーワード検索ではなく、重み付けとシノニム（類義語）による高精度マッチングを実現。
 */

// 類義語辞書（シノニム）
export const SYNONYMS: Record<string, string[]> = {
  '料金': ['代金', '水道代', '価格', '請求', '支払い', '払う'],
  '中止': ['止める', '解約', '転出', '引越し', '退去'],
  '開始': ['使う', '入居', '転入', '開ける'],
  '漏水': ['水漏れ', '漏れる', '漏ら', '破裂', '吹き出す'],
  '安全': ['水質', '塩素', '飲める', '基準', '成分'],
  '交換': ['取り替え', '新しく', '期限', 'リプレース'],
  '不審': ['詐欺', '怪しい', '偽物', 'だま', '訪問販売'],
};

export type KnowledgeItem = {
  id: string;
  title: string;
  keywords: { word: string; weight: number }[];
  summary: string;
  content: string;
  url?: string;
};

export const AI_KUN_KNOWLEDGE_V9: KnowledgeItem[] = [
  {
    id: 'billing_revision',
    title: '令和7年10月の料金改定',
    keywords: [
      { word: '料金', weight: 5 }, { word: '改定', weight: 5 }, { word: '値上げ', weight: 5 }, 
      { word: '理由', weight: 3 }, { word: '老朽化', weight: 3 }, { word: '耐震', weight: 2 }
    ],
    summary: '令和7年10月からの新料金体系についてだよ。',
    content: '老朽化した水道管の更新、大規模地震への耐震化、物価やエネルギーコストの上昇が理由さ。持続可能な水道のために必要な決断だったんだ。一般家庭（20mm以下）の基本料金は1,650円から1,815円に（+165円）変わるよ。',
    url: '/resident/billing-update'
  },
  {
    id: 'procedure_rules',
    title: '水道の開始・中止',
    keywords: [
      { word: '開始', weight: 5 }, { word: '中止', weight: 5 }, { word: '引越し', weight: 5 },
      { word: '届', weight: 3 }, { word: '手続', weight: 3 }, { word: '窓口', weight: 2 }
    ],
    summary: '水道の使用開始や中止の手続きについてさ。',
    content: '開栓・閉栓は前営業日までに連絡が必要さ。電話（0547-46-4130）または窓口で受け付けているよ。土日祝は作業できないから気をつけて。立ち会いは原則不要だよ。',
    url: '/resident/procedure'
  },
  {
    id: 'leak_trouble',
    title: '漏水の対処法',
    keywords: [
      { word: '漏水', weight: 5 }, { word: '水漏れ', weight: 5 }, { word: '道路', weight: 4 },
      { word: '宅内', weight: 4 }, { word: '修理', weight: 3 }, { word: '元栓', weight: 3 }
    ],
    summary: '水が漏れている時の対処について教えるよ。',
    content: '道路なら企業団（0547-46-4130）へ。家の中なら、まずは止水栓（元栓）を閉めてね。修理は指定工事店に依頼するんだ。パイロットが回っていたら漏水のサインさ。',
    url: '/resident/trouble'
  },
  {
    id: 'meter_exchange',
    title: 'メーター交換の仕組み',
    keywords: [
      { word: 'メーター', weight: 5 }, { word: '交換', weight: 5 }, { word: '有効期限', weight: 4 },
      { word: '8年', weight: 5 }, { word: '無料', weight: 4 }, { word: '計量法', weight: 2 }
    ],
    summary: '8年ごとのメーター定期交換についてだよ。',
    content: '水道メーターは計量法により8年の有効期限があるんだ。企業団が無料で交換しているよ。事前にハガキやチラシで通知するから安心してね。交換時間は15〜30分程度さ。',
    url: '/resident/meter'
  },
  {
    id: 'water_safety',
    title: '水道水の安全性',
    keywords: [
      { word: '安全', weight: 5 }, { word: '検査', weight: 4 }, { word: '塩素', weight: 3 },
      { word: 'カルキ', weight: 3 }, { word: '飲む', weight: 3 }, { word: '基準', weight: 2 }
    ],
    summary: '水道水の質と安全性についてさ。',
    content: '水道法に基づく51項目の厳しい基準をすべてクリアしているよ。私たちの水は自信を持って「飲める」と言えるね。カルキ臭が気になる時は冷やすかレモンを入れると消えるよ。',
    url: '/resident/quality'
  },
  {
    id: 'frozen_pipes',
    title: '水道管の凍結対策',
    keywords: [
      { word: '凍', weight: 5 }, { word: '破裂', weight: 5 }, { word: 'ぬるま湯', weight: 4 },
      { word: '冬', weight: 3 }, { word: '対策', weight: 3 }, { word: '管', weight: 2 }
    ],
    summary: '冬場の凍結対策と解消法だよ。',
    content: 'マイナス4度以下になると危ないよ。蛇口にタオルを巻いてぬるま湯（40度）をゆっくりかけるんだ。熱湯は管が割れるから絶対ダメだよ。露出している配管には保温材を巻いておこう。',
    url: '/resident/trouble#freeze'
  },
  {
    id: 'fake_staff',
    title: '悪質訪問販売への注意',
    keywords: [
      { word: '不審', weight: 5 }, { word: '偽物', weight: 5 }, { word: '点検', weight: 3 },
      { word: '騙', weight: 4 }, { word: '詐欺', weight: 5 }, { word: '警察', weight: 2 }
    ],
    summary: '企業団を装った悪質な業者に気をつけて。',
    content: '企業団が突然訪問して点検や工事を勧めることはないよ。怪しいと思ったら身分証を確認するか、すぐに企業団へ電話して。絶対にその場で契約しちゃダメだよ。',
    url: '/resident/trouble#bad-sales'
  },
  {
    id: 'organization_origin',
    title: '企業団の概要と歴史',
    keywords: [
      { word: '組織', weight: 3 }, { word: '歴史', weight: 4 }, { word: '設立', weight: 4 },
      { word: '概要', weight: 3 }, { word: '市町', weight: 3 }, { word: '1970', weight: 5 }
    ],
    summary: '大井上水道企業団の成り立ちについてさ。',
    content: '島田市、吉田町、川根本町の1市2町で構成される特別地方公共団体だよ。1970年（昭和45年）に設立されたんだ。広域的な運営で効率的に安全な水を届けているよ。',
    url: '/about'
  }
];

// その他、性格やおしゃべり系
export const AI_KUN_PERSONALITY = {
  greetings: ['やあ！大井上水道企業団の案内役、アイ君だよ。', 'こんにちは！水のことなら何でも聞いてね。', 'お疲れ様！今日も美味しい水、届いてるかな？'],
  philosophies: [
    '水は方円の器に従う。私も柔軟でありたいね。',
    '水道管は街の血管だ。脈動を感じるよ。',
    '「当たり前」を守る。それが最大の挑戦さ。'
  ],
  random_tips: [
    '朝一番の水は、バケツ一杯分くらい雑用水に使うのがおすすめだよ。',
    '震災時は一人一日3リットルの水が必要さ。備えは大丈夫かい？',
    '私たちの水は、大井川の豊かな恵みから作られているんだ。'
  ]
};
