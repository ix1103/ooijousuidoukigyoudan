/**
 * アイ君のための知識ベース（V12：超・人間味 & 究極精度仕様）
 */

// 類義語辞書（シノニム）- 大幅拡充
export const SYNONYMS: Record<string, string[]> = {
  '料金': ['代金', '水道代', '価格', '請求', '支払い', '払う', 'コスト', '家計'],
  '中止': ['止める', '解約', '転出', '引越し', '退去', '出ます', 'バイバイ'],
  '開始': ['使う', '入居', '転入', '開ける', '住み始める', 'こんにちは'],
  '漏水': ['水漏れ', '漏れる', '漏ら', '破裂', '吹き出す', 'ポタポタ', 'ビショビショ', '溢れる'],
  '安全': ['水質', '塩素', '飲める', '基準', '成分', '美味しい', 'きれい'],
  '交換': ['取り替え', '新しく', '期限', 'リプレース', 'チェンジ'],
  '不審': ['詐欺', '怪しい', '偽物', 'だま', '訪問販売', '怖い'],
  '場所': ['どこ', '住所', 'アクセス', 'マップ', '拠点', '建物'],
  // 場所と言い換え
  '風呂': ['浴室', 'シャワー', '洗い場'],
  'トイレ': ['便所', 'お手洗い', '便器'],
  '台所': ['キッチン', 'シンク', '流し台'],
};

export type KnowledgeItem = {
  id: string;
  title: string;
  keywords: { word: string; weight: number }[];
  summary: string;
  content: string;
  url?: string;
  empathy?: string; // 共感フレーズ
};

export const AI_KUN_KNOWLEDGE_V12: KnowledgeItem[] = [
  {
    id: 'billing_revision',
    title: '令和7年10月の料金改定',
    keywords: [
      { word: '料金', weight: 5 }, { word: '改定', weight: 5 }, { word: '値上げ', weight: 5 }, 
      { word: '理由', weight: 3 }, { word: '老朽化', weight: 3 }, { word: '耐震', weight: 2 }
    ],
    summary: '令和7年10月からの新料金体系についてだよ。',
    content: '老朽化した水道管の更新、大規模地震への耐震化、物価やエネルギーコストの上昇が理由さ。持続可能な水道のために必要な決断だったんだ。一般家庭（20mm以下）の基本料金は1,650円から1,815円に（+165円）変わるよ。',
    url: '/resident/billing-update',
    empathy: '家計に関わることだし、気になるよね。しっかり説明するよ。'
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
    url: '/resident/procedure',
    empathy: 'お引越しかな？新しい門出だね！手続きをサポートするよ。'
  },
  {
    id: 'leak_trouble',
    title: '漏水の対処法',
    keywords: [
      { word: '漏水', weight: 5 }, { word: '水漏れ', weight: 5 }, { word: '道路', weight: 4 },
      { word: '宅内', weight: 4 }, { word: '修理', weight: 3 }, { word: '元栓', weight: 3 },
      { word: '風呂', weight: 2 }, { word: 'トイレ', weight: 2 }, { word: '台所', weight: 2 }
    ],
    summary: '水が漏れている時の対処について教えるよ。',
    content: '道路なら企業団（0547-46-4130）へ。家の中なら、まずは止水栓（元栓）を閉めてね。修理は指定工事店に依頼するんだ。パイロットが回っていたら漏水のサインさ。',
    url: '/resident/trouble',
    empathy: 'えっ、水漏れ！？それは大変だ！落ち着いて、まずは元栓を閉めよう。'
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
    url: '/resident/meter',
    empathy: '急に交換って言われるとびっくりするよね。でも大切な定期健診みたいなものさ。'
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
    url: '/resident/quality',
    empathy: '毎日飲むものだから、安心したいよね。私たちのこだわりを聞いておくれ。'
  }
];

// 雑談・人間味セクション
export const AI_KUN_CHATTER: Record<string, { weight: number, response: string, keywords: string[] }> = {
  'thanks': {
    weight: 5,
    keywords: ['ありがとう', '助かった', 'サンキュー', '感謝', 'すごい', 'いいね'],
    response: 'どういたしまして！お役に立てて、私も水のように心が澄み渡る思いだよ。またいつでも呼んでおくれ！'
  },
  'weather': {
    weight: 5,
    keywords: ['天気', '雨', '晴れ', '暑い', '寒い', '台風', '雪'],
    response: '空の機嫌も気にかかるね。雨が降ればダムが潤うし、晴れればお洗濯日和だ。どんな天気でも、美味しい水を届ける仕事は変わらないよ！'
  },
  'food': {
    weight: 4,
    keywords: ['お腹すいた', 'ご飯', '食べ物', '美味しい', 'レシピ', '料理'],
    response: 'いい水は、料理の隠し味でもあるんだ。大井川の水で作ったお味噌汁やコーヒーは格別だっていう噂だよ。ぜひ試してみて！'
  },
  'philosophy': {
    weight: 3,
    keywords: ['水とは', '哲学', '難しい', '人生', '考え'],
    response: '「上善若水（じょうぜんみずのごとし）」。水のように、争わず、低いところに身を置きながら、万物に恵みを与える。そんな存在に、私もなりたいものさ。'
  },
  'who': {
    weight: 10,
    keywords: ['だれ', 'アイ君', '名前', '誰', '君は'],
    response: '私はアイ君！大井上水道企業団の公式グランド・コンシェルジュさ。街の水を守り、みんなの疑問を解決するのが私の誇りなんだ。'
  }
};

export const AI_KUN_PERSONALITY = {
  greetings: [
    'やあ！今日はどんな気分だい？アイ君だよ。',
    'こんにちは！美味しい水のような、爽やかな挨拶を。',
    'お疲れ様！一息ついて、お水でも飲みながら話そうか。'
  ],
  random_tips: [
    '朝一番の水は、バケツ一杯分くらい雑用水に使うのがおすすめだよ。',
    '震災時は一人一日3リットルの水が必要さ。備えは大丈夫かい？',
    '植物に水をあげる時は、早朝か夕方が一番喜ぶんだってさ。'
  ],
  endings: ['〜だよ！', '〜さ！', '〜かな？', '〜っておもうよ。', '〜だね。']
};
