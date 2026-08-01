export type ContentLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ContentSection = {
  heading: string;
  body: string;
  links?: ContentLink[];
};

export type ContentPage = {
  depth: string;
  eyebrow: string;
  title: string;
  lead: string;
  sections: ContentSection[];
};

const origin = "http://www.ooijousuidoukigyoudan.or.jp/";
const source = (path: string) =>
  `${origin}${path.split("/").map((segment) => encodeURIComponent(segment)).join("/")}`;
const external = (label: string, path: string): ContentLink => ({
  label,
  href: source(path),
  external: true,
});

export const staticAnnouncements = [
  {
    id: "water-quality-r7",
    date: "2026-04-06",
    title: "令和7年度 水質検査結果を掲載しました",
    category: ["水質情報"],
    type: "news" as const,
    url: "/resident/quality",
  },
  {
    id: "council-r8-1",
    date: "2026-03-05",
    title: "令和8年第1回議会定例会の資料を掲載しました",
    category: ["議会"],
    type: "news" as const,
    url: "/about/council",
  },
  {
    id: "shops-r8",
    date: "2026-01-14",
    title: "指定給水装置工事事業者一覧を更新しました",
    category: ["事業者向け"],
    type: "news" as const,
    url: "/business/designated-shops",
  },
  {
    id: "quality-plan-r8",
    date: "2026-01-09",
    title: "令和8年度 水質検査計画を掲載しました",
    category: ["水質情報"],
    type: "news" as const,
    url: "/resident/quality",
  },
];

export type StaticAnnouncement = (typeof staticAnnouncements)[number];

const pages: Record<string, ContentPage> = {
  "/resident/procedure": {
    depth: "06M",
    eyebrow: "START / STOP",
    title: "水道の使用開始・中止",
    lead: "開栓・閉栓・名義変更は、まず企業団へお電話ください。土日祝祭日の開閉栓作業は行っていません。",
    sections: [
      {
        heading: "使用を始める",
        body: "使用開始日、ご契約者名、水道料金のお支払い方法などを確認します。開栓手数料は300円です。手続き方法をご案内しますので、事前に0547-46-4130へご連絡ください。",
      },
      {
        heading: "使用を中止する",
        body: "使用中止日、現在のご契約者名、未納分と中止日までの料金のお支払い方法を確認します。閉栓手数料はかかりません。",
      },
      {
        heading: "名義・支払方法を変える",
        body: "名義変更や口座変更も電話でご用件をお知らせください。口座変更は、取扱金融機関または企業団窓口で、口座情報が分かるものと銀行印をご用意のうえお手続きください。",
        links: [
          { label: "水道料金と支払方法", href: "/resident/price" },
          external("旧サイトの料金・手続き案内", "ryoukin-jyouhou.html"),
        ],
      },
    ],
  },
  "/resident/billing-update": {
    depth: "09M",
    eyebrow: "PAYMENT UPDATE",
    title: "お支払い方法の変更",
    lead: "水道料金は、口座振替・納入通知書・スマートフォン決済でお支払いいただけます。",
    sections: [
      {
        heading: "口座振替",
        body: "振替日は偶数月の28日です。休業日の場合は翌営業日となります。企業団窓口または取扱金融機関で、口座情報が分かるものと銀行印をご用意のうえお申し込みください。",
      },
      {
        heading: "納入通知書",
        body: "偶数月の14日前後に郵送します。納付書取扱窓口、コンビニエンスストア等、企業団窓口でお支払いください。納付期限を過ぎるとコンビニでは使用できません。",
      },
      {
        heading: "スマートフォン決済",
        body: "納入通知書のバーコードをスマートフォンで読み取って支払います。納付期限を過ぎた通知書は利用できません。クレジットカード払いには対応していません。",
        links: [external("取扱金融機関・支払方法の詳細", "ryoukin-jyouhou.html")],
      },
    ],
  },
  "/resident/price": {
    depth: "12M",
    eyebrow: "WATER RATES",
    title: "水道料金",
    lead: "令和7年4月1日以降の使用分から適用される、口径別の水道料金をご案内します。",
    sections: [
      {
        heading: "料金表（2か月・税込）",
        body: "13mm・20mmは16㎥まで1,815円、25mmは16㎥まで2,299円です。30mmは3,630円、40mmは4,840円、50mmは6,215円、75mmは12,100円、100mmは78,650円、150mmは94,380円の基本料金となり、従量料金は1㎥につき155.1円です。",
        links: [
          external("13mm・20mm 料金早見表", "R7.13mm.20mm.pdf"),
          external("25mm 料金早見表", "R7.25mm.pdf"),
          external("30mm 料金早見表", "R7.30mm.pdf"),
          external("40mm 料金早見表", "R7.40mm.pdf"),
          external("50mm 料金早見表", "R7.50mm.pdf"),
          external("75mm 料金早見表", "R7.75mm.pdf"),
          external("100mm 料金早見表", "R7.100mm.pdf"),
          external("150mm 料金早見表", "R7.150mm.pdf"),
        ],
      },
      {
        heading: "計算例",
        body: "口径20mmで160㎥使用した場合は、1,815円＋（160㎥－16㎥）×155.1円＝24,149円です。計算結果の円未満は切り捨てます。",
      },
      {
        heading: "料金改定",
        body: "老朽管・水源施設・配水池等の更新と耐震化を継続するため、令和7年4月1日以降の使用分から料金を改定しています。",
        links: [
          external("令和7年度 水道料金改定のお知らせ", "R7kaitei.html"),
          external("料金・手続きの原本ページ", "ryoukin-jyouhou.html"),
        ],
      },
    ],
  },
  "/resident/meter": {
    depth: "15M",
    eyebrow: "METER / READING",
    title: "水道メーターと検針",
    lead: "検針は2か月に一度、奇数月の25日前後に行います。",
    sections: [
      {
        heading: "検針へのご協力",
        body: "メーターボックスの上に物を置かず、水や泥が入らないようにしてください。増改築の際は検針しやすい場所へ移設し、犬は出入口やメーターボックスから離れた場所につないでください。",
      },
      {
        heading: "検針票",
        body: "検針票は口座振替の領収書の代わりになり、前回使用量との比較や漏水の判断材料にもなります。必ず内容をご確認ください。",
        links: [external("検針票の見方", "D449BAA5.pdf"), { label: "漏水時の確認方法", href: "/resident/trouble" }],
      },
      {
        heading: "メーター交換",
        body: "水道メーターは企業団から貸与しています。計量法に基づき8年に一度交換し、交換費用は無料です。メーターボックスはお客様の所有物です。",
      },
    ],
  },
  "/resident/quality": {
    depth: "18M",
    eyebrow: "WATER QUALITY",
    title: "水質情報",
    lead: "水質基準51項目、毎日検査3項目、管理目標設定37項目を確認し、安全な水道水をお届けしています。",
    sections: [
      {
        heading: "検査のしくみ",
        body: "水道法に基づく水質基準項目に加え、色・濁り・残留塩素を配水系ごとに毎日確認します。将来にわたり安全性を確保するため、水質管理目標設定項目も検査しています。",
      },
      {
        heading: "最新の検査結果",
        body: "水質基準項目と水質管理目標設定項目の結果を年度ごとに公表しています。",
        links: [
          external("令和7年度 水質基準項目検査結果", "r7suishitukekka.pdf"),
          external("令和7年度 水質管理目標設定項目結果", "r7mokuhyoukanrikekka.pdf"),
          external("令和6年度 水質基準項目検査結果", "r6suishitukekka.pdf"),
        ],
      },
      {
        heading: "水質検査計画",
        body: "水源の状況や過去の検査結果に応じ、検査項目・地点・頻度を定めています。",
        links: [
          external("令和8年度 水質検査計画", "r8suisitukeikaku.pdf"),
          external("旧サイトの水質情報", "suisitu-jyouhou.html"),
        ],
      },
      {
        heading: "受水槽の管理",
        body: "受水槽は容量に応じた台帳提出、年1回以内ごとの水質・外観・残留塩素検査、変更・廃止時の届出が必要です。10㎥を超える施設は各市の水道担当窓口にもご確認ください。",
      },
    ],
  },
  "/resident/water-outage": {
    depth: "22M",
    eyebrow: "OUTAGE STATUS",
    title: "断減水・濁り水情報",
    lead: "旧サイト確認時点で、概ね50件以上を伴う突発断水情報は掲載されていません。",
    sections: [
      {
        heading: "突発断水",
        body: "概ね50件以上の断水を伴うものを掲載します。道路上の漏水など緊急の場合は、0547-46-4130へご連絡ください。緊急連絡は24時間受け付けています。",
      },
      {
        heading: "工事による断減水・濁水",
        body: "対象となるお客様や濁水発生の可能性があるお客様には、個別に通知を配布します。",
        links: [
          external("旧サイトの断水情報", "dansui-info.html"),
          { label: "水の色や濁りに関するQ&A", href: "/resident/faq" },
        ],
      },
      {
        heading: "断水解除後の白い水",
        body: "白濁は細かな空気による場合があります。透明なコップに取り、2分程度で下から透明になれば害はありません。長時間改善しない場合は企業団へご連絡ください。",
      },
    ],
  },
  "/resident/trouble": {
    depth: "26M",
    eyebrow: "TROUBLE GUIDE",
    title: "水道トラブル",
    lead: "道路上の漏水は企業団へ、宅内漏水は指定給水装置工事事業者へご相談ください。",
    sections: [
      {
        heading: "道路に水が出ている",
        body: "道路上で湧き水のように水が出ている場合は、水道管破損の可能性があります。道路陥没などの二次災害につながるおそれがあるため、0547-46-4130へご連絡ください。",
      },
      {
        heading: "宅地内の漏水",
        body: "すべての蛇口を閉め、メーターのパイロットを確認してください。回っている場合はメーターから蛇口までの漏水が疑われます。指定工事事業者へ修理をご依頼ください。宅内配管の修理費はお客様負担です。",
        links: [{ label: "指定工事事業者を探す", href: "/business/designated-shops" }],
      },
      {
        heading: "水が出ない",
        body: "他の蛇口、メーターボックス内のバルブ、近隣の状況をご確認ください。受水槽のある建物は停電やポンプ故障の可能性があるため、建物管理者へご連絡ください。",
      },
      {
        heading: "訪問販売にご注意",
        body: "企業団は、戸別訪問による販売・水質調査・アンケート、依頼のない修理を行っていません。不審な訪問があった場合は身分証明書の提示を求め、企業団へご確認ください。",
        links: [external("旧サイトの水道トラブル案内", "suidou-trouble.html")],
      },
    ],
  },
  "/resident/repair-shops": {
    depth: "29M",
    eyebrow: "REPAIR DUTY",
    title: "宅内漏水修理当番店",
    lead: "宅内漏水の修理は、大井上水道企業団の指定を受けた工事事業者へご相談ください。",
    sections: [
      {
        heading: "当番店一覧",
        body: "当番表は旧サイトで公開されている最新版をご確認ください。修理内容、費用、訪問時間は依頼前に事業者へ直接ご確認ください。",
        links: [
          external("令和8年度 宅内漏水修理当番店", "FYR8toubanten.pdf"),
          { label: "指定工事事業者一覧", href: "/business/designated-shops" },
        ],
      },
    ],
  },
  "/resident/cross-connection": {
    depth: "31M",
    eyebrow: "SAFETY NOTICE",
    title: "クロスコネクションの禁止",
    lead: "水道管と井戸水などの別配管を直接接続することは、汚染・逆流防止のため禁止されています。",
    sections: [
      {
        heading: "クロスコネクションとは",
        body: "水道水を給水する管と、井戸水・共同水道等の別の管を連結する状態です。バルブで切り替えて使用できる構造もクロスコネクションに該当します。",
      },
      {
        heading: "発見した場合",
        body: "水道管との切り離しが確認できるまで、水道法と給水条例に基づき給水を一時停止する場合があります。増改築や修繕時に誤接続しないよう管理してください。",
        links: [
          external("旧サイトの詳しい案内", "information.html"),
          { label: "指定工事事業者へ相談", href: "/business/designated-shops" },
        ],
      },
    ],
  },
  "/resident/downloads": {
    depth: "33M",
    eyebrow: "FORMS / DOWNLOAD",
    title: "申請書・資料",
    lead: "給水装置工事や事業者指定に関する主な様式をまとめています。",
    sections: [
      {
        heading: "給水装置工事",
        body: "申込書、材料表、検査申請書、各種承諾書等は事業者向けページからダウンロードできます。",
        links: [
          external("給水装置工事申込みについて", "kyusuimoushikominituite_Ver4_R5_11_28.pdf"),
          external("給水装置工事申込書", "kyuusui_syorui_ooi3.xls"),
          external("受水槽を設置しないことに関する誓約書", "jusuisou_seiyakusho.pdf"),
          { label: "事業者向け様式一覧", href: "/business/contractor" },
        ],
      },
    ],
  },
  "/resident/faq": {
    depth: "35M",
    eyebrow: "FAQ",
    title: "よくある質問",
    lead: "料金・漏水・水質について、旧サイトで多く寄せられている質問をまとめました。",
    sections: [
      {
        heading: "使用量が急に増えた",
        body: "地下や床下など見えない場所で漏水していることがあります。すべての蛇口を閉め、メーターのパイロットをご確認ください。",
        links: [{ label: "漏水時の確認", href: "/resident/trouble" }],
      },
      {
        heading: "口座振替申請後に納付書が届いた",
        body: "金融機関の承認には時間がかかります。納付書が届いた場合はその回を納付書で支払い、次回以降の振替をご確認ください。",
      },
      {
        heading: "水が赤い・白い",
        body: "赤水は屋内給水管の鉄さびや工事による流れの変化が考えられます。白水が下から透明になる場合は細かな空気です。長時間続く場合や近隣でも発生している場合は企業団へご連絡ください。",
      },
      {
        heading: "新しく水道を引きたい",
        body: "指定給水装置工事事業者へ依頼してください。加入分担金、開栓手数料300円、設計審査手数料、道路占用申請手数料等が必要です。",
        links: [
          external("旧サイト Q&A全文", "q_and_a.html"),
          { label: "指定工事事業者一覧", href: "/business/designated-shops" },
        ],
      },
    ],
  },
  "/business/contractor": {
    depth: "38M",
    eyebrow: "FOR CONTRACTORS",
    title: "水道工事事業者の方へ",
    lead: "指定申請・更新、給水装置工事、請求書等の様式を掲載しています。",
    sections: [
      {
        heading: "指定・更新申請",
        body: "指定給水装置工事事業者の新規指定、変更、廃止・休止・再開、更新に必要な様式です。",
        links: [
          external("指定申請書 様式第1（PDF）", "kyuusuisitei_no1_R03_May.pdf"),
          external("誓約書 様式第2（PDF）", "kyuusuisitei_no2_R03_May.pdf"),
          external("機械器具調書 別表（PDF）", "kyuusuisitei_betu_R03_May.pdf"),
          external("指定更新時確認事項届出書（PDF）", "R2siteikousinjikou_R03_May.pdf"),
          external("指定事項変更届 様式第4（PDF）", "kyuusuisitei_no4_R03_May.pdf"),
          external("廃止・休止・再開届 様式第5（PDF）", "kyuusuisitei_no5_R03_May.pdf"),
          external("主任技術者選任・解任届 様式第6（PDF）", "kyuusuisitei_no6_R03_May.pdf"),
        ],
      },
      {
        heading: "給水装置工事",
        body: "工事申込書、材料表、検査申請書、チェックリスト、承諾書等は旧サイトの事業者向けページで公開しています。",
        links: [
          external("給水装置工事申込書（Excel）", "kyuusui_syorui_ooi3.xls"),
          external("給水装置工事申込書（PDF）", "kyuusui_mousikomi3.pdf"),
          external("給水装置工事チェックリスト", "kyuusui_check_list.pdf"),
          external("給水装置工事申込みについて", "kyusuimoushikominituite_Ver4_R5_11_28.pdf"),
          external("旧サイトの全様式", "suidou-jigyousya.html"),
        ],
      },
    ],
  },
  "/business/bidding": {
    depth: "41M",
    eyebrow: "BID QUALIFICATION",
    title: "入札参加資格申請",
    lead: "令和7・8年度の建設工事、測量・コンサルタント、物品・役務等に係る資格審査申請を受け付けています。",
    sections: [
      {
        heading: "受付方法",
        body: "通常受付期間は令和6年12月2日から令和7年2月28日までです。2月28日以降も随時受け付けますが、受付後の入札分から参加資格を有します。原則郵送で、持参による提出も受け取ります。提出先は〒428-0013 静岡県島田市金谷東一丁目1255番地の2 大井上水道企業団 工務係です。",
      },
      {
        heading: "ファイルと記載事項",
        body: "A4ファイル（グリーン。なければ別色可）に綴じ、表紙と背表紙へ「令和7・8年度 入札参加資格申請書」「建設工事・測量コンサルタント・物品役務等の区分」「法人名または個人名」を記載してください。",
      },
      {
        heading: "申請様式",
        body: "区分ごとに指定様式と一括ダウンロードが用意されています。変更届は企業団独自様式がないため、島田市様式または共通様式をご利用ください。",
        links: [
          external("建設工事 申請書", "kouji_yousiki/nyusatu-kensetu-sinseisyo.xlsx"),
          external("測量・コンサルタント 申請書", "soku_kon_yousiki/nyusatu-soku-sinseisyo.xlsx"),
          external("物品・役務等 申請書", "buppin_yousiki/nyusatu-buppin-sinseisyo2.xlsx"),
          external("旧サイトの申請書一覧", "simeisanka.html"),
        ],
      },
    ],
  },
  "/business/bidding/results": {
    depth: "44M",
    eyebrow: "BID RESULTS",
    title: "入札・見積結果",
    lead: "工事・業務委託・物品購入等の入札結果を公表しています。",
    sections: [
      {
        heading: "公表内容",
        body: "旧サイトでは、工事名・業務委託名、入札書比較価格、落札価格（税抜）、落札業者名、執行日を年度ごとに掲載しています。",
        links: [external("入札・見積結果の公表", "newpage1.html")],
      },
    ],
  },
  "/business/designated-shops": {
    depth: "47M",
    eyebrow: "DESIGNATED SHOPS",
    title: "指定給水装置工事事業者",
    lead: "給水装置の新設・改造・修理は、企業団の指定を受けた工事事業者へご依頼ください。",
    sections: [
      {
        heading: "指定事業者一覧",
        body: "工事内容、費用、対応時期は依頼前に各事業者へ直接ご確認ください。企業団職員が住宅内の漏水修理を直接行うことはありません。",
        links: [
          external("指定給水装置工事事業者一覧（令和8年1月14日更新）", "R08_Jan_siteikoujiten(2).pdf"),
          { label: "宅内漏水修理当番店", href: "/resident/repair-shops" },
        ],
      },
    ],
  },
  "/business/invoice": {
    depth: "50M",
    eyebrow: "INVOICE",
    title: "インボイス制度",
    lead: "大井上水道企業団は適格請求書発行事業者として登録しています。",
    sections: [
      {
        heading: "登録番号",
        body: "登録番号は T9-0000-2022-8109 です。令和5年10月1日からインボイス制度が開始されています。",
      },
      {
        heading: "水道料金",
        body: "令和5年9月検針分から「水道使用量等のお知らせ（検針票）」と、現金払いの方の「納入通知書（青色）」をインボイスとして交付します。督促状と再振替のお知らせはインボイス対応ではありません。",
      },
      {
        heading: "保管する書類",
        body: "口座振替の方は検針票を、納付書払いの方は水道料金納入通知書兼領収書または検針票を保管してください。",
        links: [
          external("旧サイトのインボイス案内", "invoice.html"),
          {
            label: "国税庁 適格請求書発行事業者公表サイト",
            href: "https://www.invoice-kohyo.nta.go.jp/regno-search/detail?selRegNo=9000020228109",
            external: true,
          },
        ],
      },
    ],
  },
  "/about": {
    depth: "53M",
    eyebrow: "ABOUT OOI WATER",
    title: "大井上水道企業団",
    lead: "島田市金谷地区、牧之原市、菊川市の一部へ、安全で良質な水を安定して供給しています。",
    sections: [
      {
        heading: "所在地・連絡先",
        body: "〒428-0013 静岡県島田市金谷東一丁目1255番地の2。電話0547-46-4130、FAX0547-46-1095です。",
      },
      {
        heading: "業務時間",
        body: "月曜日から金曜日の8時30分から17時15分までです。土日、祝祭日、12月29日から1月3日を除きます。道路上の漏水や大規模断水などの緊急連絡は時間外も電話がつながります。",
      },
      {
        heading: "アクセス",
        body: "国道1号大代インター、県道島田金谷線、牧之原市方面からお越しいただけます。詳しい道順は旧サイトをご確認ください。",
        links: [
          external("アクセス・道順", "access-ooi.html"),
          { label: "事業概要・沿革", href: "/about/business" },
          { label: "パンフレット", href: "/about/brochure" },
        ],
      },
    ],
  },
  "/about/business": {
    depth: "56M",
    eyebrow: "HISTORY / SERVICE",
    title: "事業概要・沿革",
    lead: "昭和23年の組合設立から、地域の発展とともに水道施設を整備してきました。",
    sections: [
      {
        heading: "はじまり",
        body: "旧軍用水道の遊休施設を活用し、当時の金谷町、相良町、勝間田村、菅山村、初倉村、萩間村が昭和23年6月16日に大井上水道組合を設立しました。同年11月1日に工事着手、昭和25年7月24日に完成・通水しています。",
      },
      {
        heading: "企業団への改称",
        body: "昭和42年4月1日に地方公営企業法を適用し、大井上水道企業団へ改称しました。拡張事業と施設更新を重ね、現在の給水区域を支えています。",
        links: [external("旧サイトの事業概要・沿革", "jigyou-gaiyou.html")],
      },
    ],
  },
  "/about/brochure": {
    depth: "58M",
    eyebrow: "BROCHURE",
    title: "企業団パンフレット",
    lead: "企業団の役割、施設、水が届くまでの流れをまとめた2025年版パンフレットです。",
    sections: [
      {
        heading: "パンフレット2025",
        body: "PDFで閲覧できます。ファイルサイズが大きい場合があるため、通信環境をご確認ください。",
        links: [external("大井上水道企業団パンフレット2025", "2025brochure.pdf")],
      },
    ],
  },
  "/about/assembly": {
    depth: "60M",
    eyebrow: "ASSEMBLY",
    title: "企業団議会",
    lead: "議会の開催案内、議案書、議決結果を公開しています。",
    sections: [
      {
        heading: "令和8年第1回定例会",
        body: "令和8年3月5日（木）午後2時30分から開催されました。企業長提出議案と令和8年度水道事業会計予算等を掲載しています。",
        links: [
          external("議事日程", "R8giai1/nittei.pdf"),
          external("令和8年度予算案", "R8giai1/2-2yosan.pdf"),
          { label: "議決結果・過去資料", href: "/about/council" },
        ],
      },
    ],
  },
  "/about/council": {
    depth: "61M",
    eyebrow: "COUNCIL ARCHIVE",
    title: "議案・議決結果",
    lead: "企業団議会の議案書と過去の議決結果を掲載しています。",
    sections: [
      {
        heading: "令和8年第1回定例会",
        body: "静岡県市町総合事務組合の規約変更、令和8年度水道事業会計予算等の資料です。",
        links: [
          external("議案第1号 鏡文", "R8giai1/1-1kagami.pdf"),
          external("議案第1号 変更規約", "R8giai1/1-2henkoukiyaku.pdf"),
          external("議案第1号 新旧対照表", "R8giai1/1-3sinkyuu.pdf"),
          external("議案第2号 鏡文", "R8giai1/2-1kagami.pdf"),
          external("議案第2号 予算案", "R8giai1/2-2yosan.pdf"),
        ],
      },
      {
        heading: "過去の議決結果",
        body: "令和5年から令和7年までの定例会・臨時会資料は旧サイトで公開されています。",
        links: [external("議会資料一覧", "gikai-main.html")],
      },
    ],
  },
  "/about/finance": {
    depth: "64M",
    eyebrow: "BUDGET / FINANCE",
    title: "予算・決算",
    lead: "水道事業会計の予算書・決算書を年度ごとに公表しています。",
    sections: [
      {
        heading: "最新資料",
        body: "令和8年度予算書、令和7年度予算書、令和6年度決算書を掲載しています。",
        links: [
          external("令和8年度 予算書", "R8yosan.pdf"),
          external("令和7年度 予算書", "FYR7yosansyo.pdf"),
          external("令和6年度 決算書", "r6kesasn.pdf"),
          external("令和6年度 予算書", "R6yosan.pdf"),
        ],
      },
      {
        heading: "経営情報",
        body: "経営戦略、事業規模の推移、経営比較分析表も公表しています。",
        links: [
          external("経営戦略2026", "keieisenryaku2026.pdf"),
          external("事業規模の推移", "R06suiitokibo.pdf"),
          external("経営比較分析表", "99ooijosui_suido_2024.pdf"),
        ],
      },
    ],
  },
  "/about/disclosure": {
    depth: "67M",
    eyebrow: "PUBLIC INFORMATION",
    title: "情報公開・各種計画",
    lead: "水道ビジョン、耐震化、環境・人事・情報管理に関する計画と実績を公表しています。",
    sections: [
      {
        heading: "水道・耐震化",
        body: "地域水道ビジョン、管路耐震化状況、上下水道耐震化計画、重要給水施設管路図を掲載しています。",
        links: [
          external("地域水道ビジョン", "water_vision.pdf"),
          external("管路耐震化状況", "taisin-R05.pdf"),
          external("上下水道耐震化計画", "R7taishinkakeikaku.pdf"),
          external("重要給水施設管路図", "R7juuyoukanrozu.pdf"),
        ],
      },
      {
        heading: "組織・情報管理",
        body: "温暖化対策、特定事業主行動計画、個人情報ファイル簿、情報セキュリティポリシー、人事行政運営状況等を公開しています。",
        links: [
          external("地球温暖化対策実行計画", "ondanka.pdf"),
          external("特定事業主行動計画", "tokukoudoukeikaku.pdf"),
          external("個人情報ファイル簿", "kojinnjouhoufairubo.pdf"),
          external("情報セキュリティポリシー", "2025jouhousequrityporicy.pdf"),
          external("人事行政の運営状況", "R7jinnjikouhyou.pdf"),
          external("公表資料一覧", "koukoku.html"),
        ],
      },
    ],
  },
  "/emergency": {
    depth: "23M",
    eyebrow: "EMERGENCY",
    title: "緊急・断水情報",
    lead: "断水、濁り水、道路上の漏水に関する緊急情報をご案内します。",
    sections: [
      {
        heading: "緊急連絡",
        body: "道路上の漏水、大規模な漏水、断水などは0547-46-4130へご連絡ください。緊急連絡は24時間受け付けています。",
        links: [
          { label: "断減水・濁り水情報", href: "/resident/water-outage" },
          { label: "水道トラブル", href: "/resident/trouble" },
        ],
      },
    ],
  },
  "/news": {
    depth: "42M",
    eyebrow: "NEWS ARCHIVE",
    title: "お知らせ",
    lead: "水質、議会、指定工事事業者、料金・手続きに関する最新情報です。",
    sections: staticAnnouncements.map((item) => ({
      heading: item.title,
      body: `${item.date.replaceAll("-", ".")} 更新`,
      links: [{ label: "詳しく見る", href: item.url }],
    })),
  },
  "/recruit": {
    depth: "70M",
    eyebrow: "RECRUIT",
    title: "職員採用",
    lead: "大井上水道企業団の職員採用情報を掲載します。",
    sections: [
      {
        heading: "現在の募集状況",
        body: "旧サイト掲載の令和7年度会計年度任用職員（技術・一般事務）の受付は終了しています。新しい募集がある場合はこのページでお知らせします。",
        links: [external("旧サイトの職員採用情報", "syokuinsaiyou.html")],
      },
    ],
  },
  "/privacy": {
    depth: "74M",
    eyebrow: "PRIVACY",
    title: "個人情報保護方針",
    lead: "個人情報を適切に取り扱い、安全に管理します。",
    sections: [
      {
        heading: "取り扱いについて",
        body: "収集目的を明確にし、必要な範囲で適正に取得します。法令に基づく場合を除き、本人の同意なく目的外利用や第三者提供を行いません。",
        links: [external("旧サイトのプライバシーポリシー", "privacy_policy.html")],
      },
    ],
  },
  "/terms": {
    depth: "76M",
    eyebrow: "SITE POLICY",
    title: "サイトポリシー",
    lead: "当サイトの利用条件と外部リンクについてご案内します。",
    sections: [
      {
        heading: "掲載情報",
        body: "内容の正確性に努めていますが、制度・様式・受付状況は変更される場合があります。重要な手続きは企業団へご確認ください。",
      },
      {
        heading: "外部ファイル",
        body: "PDF・Word・Excel等は旧サイトに掲載された原本へリンクしています。ファイル形式に対応したアプリケーションをご利用ください。",
      },
    ],
  },
  "/links": {
    depth: "78M",
    eyebrow: "RELATED LINKS",
    title: "関連リンク",
    lead: "手続きや制度の確認に役立つ公式情報です。",
    sections: [
      {
        heading: "行政・制度",
        body: "インボイス制度など、外部の公式情報をご確認いただけます。",
        links: [
          {
            label: "国税庁 インボイス制度公表サイト",
            href: "https://www.invoice-kohyo.nta.go.jp/",
            external: true,
          },
          external("大井上水道企業団 旧サイト", "index.html"),
        ],
      },
    ],
  },
  "/sitemap": {
    depth: "80M",
    eyebrow: "SITE MAP",
    title: "サイトマップ",
    lead: "暮らし、事業者、企業団に関する情報を目的別に探せます。",
    sections: [
      {
        heading: "くらしの情報",
        body: "開始・中止、料金、水質、トラブル、よくある質問。",
        links: [
          { label: "水道の使用開始・中止", href: "/resident/procedure" },
          { label: "水道料金", href: "/resident/price" },
          { label: "水質情報", href: "/resident/quality" },
          { label: "水道トラブル", href: "/resident/trouble" },
        ],
      },
      {
        heading: "事業者・企業団",
        body: "工事様式、入札、議会、財政、情報公開。",
        links: [
          { label: "水道工事事業者の方へ", href: "/business/contractor" },
          { label: "入札参加資格申請", href: "/business/bidding" },
          { label: "企業団について", href: "/about" },
          { label: "情報公開", href: "/about/disclosure" },
        ],
      },
    ],
  },
};

export function getStaticContent(pathname: string): ContentPage {
  if (pages[pathname]) return pages[pathname];

  if (pathname.startsWith("/news/")) return pages["/news"];

  if (pathname.startsWith("/pages/")) {
    return {
      depth: "46M",
      eyebrow: "ARCHIVE",
      title: "お知らせ・公開資料",
      lead: "旧サイトを正本として、関連する公開情報をご案内します。",
      sections: [
        {
          heading: "関連情報",
          body: "お探しの資料が見つからない場合は、企業団事務局へお問い合わせください。",
          links: [
            { label: "お知らせ一覧", href: "/news" },
            external("旧サイト", "index.html"),
          ],
        },
      ],
    };
  }

  return {
    depth: "46M",
    eyebrow: "OOI WATER",
    title: "水と暮らしの情報",
    lead: "必要な情報を、目的別に整理しています。",
    sections: [
      {
        heading: "案内メニュー",
        body: "暮らしの手続き、事業者向け情報、企業団情報からお選びください。",
        links: [
          { label: "くらしの情報", href: "/resident/procedure" },
          { label: "事業者の方へ", href: "/business/contractor" },
          { label: "企業団について", href: "/about" },
        ],
      },
    ],
  };
}
