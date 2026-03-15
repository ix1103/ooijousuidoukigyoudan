/**
 * アイ君のための知識ベース（全記事・全コンテンツ超徹底学習版 V8）
 * サイト内の文章、数値、歴史、FAQを詳細に網羅。
 */
export const AI_KUN_KNOWLEDGE = {
  // 基本組織情報
  organization: {
    name: '大井上水道企業団',
    description: '島田市、吉田町、川根本町の1市2町で構成される特別地方公共団体。独立採算制で運営されているよ。',
    mission: '安心・安全な水を、未来の世代まで。地域社会の基盤として信頼される水道事業を目指すことさ。',
    vision: '【安心】安全で良質な水、【強靭】災害に強い水道、【持続】健全な経営。これが三本柱だよ。',
    established: '1970年（昭和45年）設立。元は海軍の施設などを引き継いだ歴史があるんだ。',
    members: ['島田市', '吉田町', '川根本町'],
    address: '〒428-0013 静岡県島田市金谷東一丁目1255番地の2',
    phone_main: '0547-46-4130',
    business_hours: '平日 8:15〜17:00（土日祝・年末年始休み）',
    access: {
      train: 'JR金谷駅・大井川鐵道金谷駅から徒歩約10分',
      car: '国道1号バイパス大代ICから約5分、新東名 島田金谷ICから約10分'
    },
    history: [
      { year: '1970年', event: '企業団設立' },
      { year: '1972年', event: '第一期拡張事業。大井川からの取水開始' },
      { year: '1985年', event: '第二期拡張事業完了' },
      { year: '2000年', event: '高度処理設備導入' },
      { year: '2025年', event: '上下水道耐震化計画策定。15年で重要施設の耐震化完了を目指すよ' }
    ],
    assembly: {
      count: '10名',
      breakdown: '島田市6名、吉田町2名、川根本町2名',
      schedule: '年2回（3月・9月）'
    }
  },

  // サイト記事・深層コンテンツ（V8で大幅強化）
  articles: {
    billing_revision: {
      title: '令和7年10月からの料金改定',
      reason: '老朽化した水道管の更新、大規模地震への耐震化、物価やエネルギーコストの上昇が理由さ。持続可能な水道のために必要な決断だったんだ。',
      impact: '一般家庭（20mm以下）の基本料金は1,650円から1,815円に（+165円）変わるよ。'
    },
    seismic_plan: {
      title: '耐震化計画',
      details: '2025年1月に策定。避難所や医療機関への管路を最優先で整備し、15年かけて重要施設の耐震化を完了させる計画だよ。'
    },
    procedure_rules: {
      title: '手続きのルール',
      note: '開栓・閉栓は前営業日までに連絡が必要さ。土日祝は作業できないから気をつけて。立ち会いは原則不要だよ。'
    },
    meter_exchange: {
      title: 'メーター交換',
      details: '8年ごとに定期交換するよ。法律で決まっていることで、費用は無料（企業団負担）さ。怪しい業者には気をつけてね。'
    },
    water_safety: {
      title: '水の安全・水質',
      details: '水道法に基づく51項目の厳しい基準をすべてクリアしているよ。私たちの水は自信を持って「飲める」と言えるね。'
    },
    frozen_pipes: {
      title: '凍結対策',
      details: 'マイナス4度以下になると危ないよ。タオルを巻いてぬるま湯をゆっくりかけるんだ。熱湯は管が割れるから絶対ダメだよ。'
    },
    fake_staff: {
      title: '不審な訪問者',
      details: '企業団が突然訪問して点検や工事を勧めることはないよ。怪しいと思ったら身分証を確認するか、すぐに企業団へ電話して。'
    }
  },

  // メニューマッピング
  menu_knowledge: [
    { keywords: ['インボイス', '登録番号'], title: 'インボイス制度', url: '/business/invoice', summary: '適格請求書発行事業者の登録番号などを掲載しているよ。' },
    { keywords: ['入札', '公告', '契約'], title: '入札・契約情報', url: '/business/bidding', summary: '工事の入札公告や結果はこちらで確認できるよ。' },
    { keywords: ['指定店', '修理', '業者'], title: '指定給水装置工事事業者', url: '/resident/repair-shops', summary: '宅内の修理は企業団が認めた指定店に依頼してね。' },
    { keywords: ['クロスコネクション', '井戸水'], title: 'クロスコネクション', url: '/resident/cross-connection', summary: '水道と他の水を繋ぐのは法律で禁止されているよ。' },
    { keywords: ['公開', '開示', '公文書'], title: '情報公開', url: '/about/disclosure', summary: '企業団の公文書公開に関する手続きはこちらさ。' },
    { keywords: ['検針', 'メーター'], title: '検針・メーター交換', url: '/resident/meter', summary: '2ヶ月に一度の検針と、8年ごとのメーター交換についてだよ。' },
    { keywords: ['財政', '予算', '決算'], title: '財政状況', url: '/about/finance', summary: '毎年度の予算や決算報告を公開しているよ。' },
    { keywords: ['議会', '議員'], title: '企業団議会', url: '/about/assembly', summary: '構成自治体の議員による議会運営についてさ。' },
    { keywords: ['断水', '濁り'], title: '断水・濁水情報', url: '/resident/water-outage', summary: '現在の断水情報や、濁りが出た時の対応だよ。' },
    { keywords: ['料金改定', '値上げ'], title: '料金改定のお知らせ', url: '/resident/billing-update', summary: '令和7年10月からの新料金体系についてさ。' },
    { keywords: ['様式', '申請書', '書式'], title: '申請書ダウンロード', url: '/resident/downloads', summary: '各種届け出に必要な書類が揃っているよ。' },
    { keywords: ['Q&A', 'FAQ', '質問'], title: 'よくある質問', url: '/resident/faq', summary: '困った時のQA集さ。検索もできるよ。' },
    { keywords: ['水質', '検査'], title: '水質情報', url: '/resident/quality', summary: '安全性を証明する検査結果を公開しているよ。' }
  ],

  // 雑学・科学（短縮版）
  science: {
    chlorine: 'カルキ臭は安全の証。冷やすかレモンで消えるよ。',
    world: '水道水が飲めるのは世界で10カ国程度。日本はその一つさ。',
    history: '江戸の玉川上水から続く、日本の水道技術は世界一だ。',
    sdgs: '「安全な水とトイレを世界中に」。私たちの誇りさ。'
  },

  // シナリオ
  scenarios: {
    leak: {
      keywords: ['漏水', '水漏れ'],
      initial_question: '漏水かい！場所は「道路」かな？それとも「家の中」かな？',
      branches: {
        road: { keywords: ['道路', '外'], answer: '道路か！企業団（0547-46-4130）へ急いで連絡して。24時間受付だ。' },
        house: { 
          keywords: ['家', '内'], 
          next_question: '家の中だね。止水栓（元栓）は閉めたかい？',
          branches: {
            yes: { keywords: ['閉めた', 'はい'], answer: 'よし。あとは指定工事店に修理を。一覧は「住民の方へ」メニューにあるよ。' },
            no: { keywords: ['どこ', 'いいえ'], answer: '玄関近くの青い箱の中さ。時計回りに回して止めるんだ。' }
          }
        }
      }
    }
  },

  philosophy: {
    quotes: [
      '水は方円の器に従う。私も柔軟でありたいね。',
      '水道管は街の血管だ。脈動を感じるよ。',
      '「当たり前」を守る。それが最大の挑戦さ。'
    ]
  }
} as const;
