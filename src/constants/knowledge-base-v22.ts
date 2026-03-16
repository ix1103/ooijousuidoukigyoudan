/**
 * アイ君のための知識ベース（V22：超超超超超進化・タイポ補正・パーソナライズ・感情UI）
 */

// シノニム辞書
export const SYNONYMS: Record<string, string[]> = {
  '料金': ['りょうきん', 'だいきん', '代金', '水道代', '価格', '請求', '支払い', '払う', 'コスト', '家計', '振込', '口座', 'クレジット', 'コンビニ', 'いくら', '費用', '金額', '値段', 'お代', 'マネー'],
  '改定': ['変更', '値上げ', '変わる', '高くなる', '改訂', '新料金', '改正', '上がる', 'アップ'],
  '支払い': ['振込', '口座振替', 'コンビニ', '引き落とし', '納付', '入金', 'paypay', 'ペイペイ', 'linepay', 'aupay', 'd払い', 'クレカ', 'クレジットカード', 'キャッシュレス', '電子マネー', '現金'],
  '中止': ['止める', '解約', '転出', '引越し', '退去', '不要', 'クローズ', '使わない', '閉栓', '引越したい', '引っ越す', '出る', 'やめる'],
  '開始': ['使う', '入居', '転入', '開ける', '住み始める', 'スタート', '開栓', '新居', '引っ越してきた', '開けたい', '使いたい', 'はじめる'],
  '手続き': ['届出', '申請', '登録', '書類', '連絡', 'フォーム', '予約', '方法', 'どうすれば', 'やり方', '手続きしたい', '申し込む', '申し込み'],
  '名義変更': ['名義', '代表者変更', '所有者変更', '姓が変わった', '結婚', '売買', '名前変わった', '世帯主変更', '名字'],
  '漏水': ['水漏れ', '漏れる', '破裂', '吹き出す', 'ポタポタ', '溢れる', '浸水', '水浸し', '漏れてる', 'びしゃびしゃ', '噴き出す', 'みずもれ'],
  '修理': ['直す', '故障', '壊れた', '動かない', 'おかしい', '詰まった', '工事', '業者', '直して', '修理したい', '修理依頼', '見積もり'],
  '断水': ['出ない', '止まった', '水不足', '工事中', '濁り', '濁った', '茶色い', '白い', '止まる', '水こない', '水でない', '真っ白', '赤水', 'にごり'],
  '凍結': ['凍る', '凍った', 'こおる', '寒い', '氷', '冬', '霜', 'マイナス', '凍てつく', '破裂した'],
  '安全': ['水質', '塩素', '飲める', '基準', '成分', '美味しい', 'きれい', '安心', '検査', 'そのまま飲める', '飲んで平気', '安全性'],
  'カルキ': ['臭い', 'におい', '消毒', 'プールのにおい', 'ツンとする', '塩素臭い', '薬くさい'],
  '味': ['においがする', '臭い', 'おかしい', '変な', '異臭', 'まずい', '変な味'],
  'メーター': ['計量器', '針', '数字', '蓋', 'ボックス', '検針', '積算計', 'パイロット', '量水器', '青いフタ'],
  '交換': ['取り替え', '新しく', '期限', '新調', '何年', '取替', '寿命', 'いつまで'],
  '蛇口': ['カラン', '栓', 'ノズル', 'ひねるやつ', '水道栓', '蛇口から', 'じゃぐち'],
  '止水栓': ['元栓', 'とめる', '緊急', 'バルブ', '遮断', '大元の栓', '水止めるやつ'],
  '不審': ['詐欺', '怪しい', '偽物', '訪問販売', '怖い', 'なりすまし', '嘘', '不審者', '点検商法', '悪徳', '騙し'],
  '場所': ['どこ', '住所', 'アクセス', 'マップ', '建物', '会社', '行き方', '窓口', '地図', '場所教えて', '道案内'],
  '営業時間': ['開いてる', '何時', '時間', '休み', '定休日', '閉まる', '受付', 'いつから', 'いつまで', '土日やってる'],
  '電話': ['連絡先', '番号', '電話番号', 'TEL', 'かける', '電話したい', 'フリーダイヤル', 'コールセンター'],
  '節水': ['節約', 'エコ', 'もったいない', '水道代下げる', '使いすぎ', '安くしたい', '水減らす', '出しっぱなし'],
  '水': ['お水', 'おみず', 'アクア', 'ウォーター', '水道水'],
  '組織': ['企業団', '会社', '団体', '法人', '自治体', '役所', '水道局'],
  '歴史': ['沿革', '設立', '創業', 'いつ', '昔', 'これまで', '成り立ち'],
  '議会': ['議員', '定例会', '審議', '条例', '会議', '議会情報'],
  '入札': ['契約', '公告', '工事発注', '落札', '入札参加', '業者向け'],
  'クロスコネクション': ['クロコネ', '直結', '井戸水', '混ざる', '誤接続', 'つなぐ', '違法配管'],
  '耐震': ['地震', '災害', '防災', '強靭化', '揺れ', '地震対策', '断水備え'],
  'シミュレーター': ['計算', 'いくらになる', '見積もり', '料金計算', '試算', 'シミュレーション'],
  'ダウンロード': ['書式', '申請書', '用紙', 'PDF', '印刷', 'フォーマット', 'テンプレ'],
  'FAQ': ['よくある質問', 'Q&A', '疑問', '質問まとめ', 'ヘルプ', '教えて'],
  '褒めて': ['ほめて', '応援して', 'はげまして', '勇気', 'がんばる', '天才', '神', 'すごすぎ', 'さすが', 'えらい', '偉い'],
  '占い': ['うらない', 'おみくじ', '運勢', 'ラッキー', '今日の運勢', 'お告げ', '星占い'],
  'クイズ': ['くいず', 'ゲーム', '遊ぼ', 'あそぼう', '暇', '退屈', 'なぞなぞ', '豆知識', 'トリビア', '問題だして'],
  '同意': ['それ', 'あれ', 'これ', 'はい', 'うん', 'ううん', 'もっと', 'くわしく', '詳細'],
  '仕事の悩み': ['仕事', '残業', 'やめたい', '辞めたい', '上司', '行きたくない', '転職'],
  '恋愛相談': ['恋愛', '彼氏', '彼女', 'フラれた', '失恋', '片思い', 'モテない'],
  'アイ君への悪口': ['生意気', 'AIのくせに', '使えない', 'アホ', 'ドジ', 'ぽんこつ'],
  'イースターエッグ_1': ['大井川最高', '大井川の奇跡'],
  'イースターエッグ_2': ['アイ君の秘密', '裏コマンド'],
};

export type KnowledgeIntent = 'money' | 'procedure' | 'trouble' | 'about' | 'faq' | 'general' | 'quiz_running';
export type EmotionContext = 'neutral' | 'anxious' | 'angry' | 'sad' | 'happy';
export type UIEmotionEffect = 'none' | 'shake' | 'bounce' | 'pulse' | 'glow' | 'spin' | 'wiggle';

export type KnowledgeItem = {
  category: KnowledgeIntent;
  id: string;
  title: string;
  keywords: { word: string; weight: number }[];
  phrases: string[];
  summary: string;
  content: string;
  url?: string;
  empathy?: string;
  emotionEffect?: UIEmotionEffect;
  related_topics?: string[];
};

export const AI_KUN_KNOWLEDGE_V22: KnowledgeItem[] = [
  {
    id: 'org_overview', category: 'about', title: '大井上水道企業団の概要',
    keywords: [{ word: '組織', weight: 5 }, { word: '企業団', weight: 5 }, { word: '概要', weight: 4 }, { word: '設立', weight: 4 }, { word: 'どんな', weight: 3 }, { word: '何', weight: 2 }],
    phrases: ['大井上水道企業団とは', '企業団って何', '組織の概要を教えて', 'どんな団体ですか'],
    summary: '企業団の基本情報だよ。',
    content: '大井上水道企業団は、島田市・吉田町・川根本町の1市2町で構成される特別地方公共団体（一部事務組合）で、1970年（昭和45年）に設立されたんだ。広域的な視点で水道事業を統合・運営して、コストの最適化と安全な水の供給を両立しているよ。',
    url: '/about', empathy: '私たちの企業団について知りたいなんて嬉しいな！', emotionEffect: 'bounce',
    related_topics: ['org_history', 'org_vision', 'access_info']
  },
  {
    id: 'org_history', category: 'about', title: '事業の沿革・歴史',
    keywords: [{ word: '歴史', weight: 5 }, { word: '沿革', weight: 5 }, { word: '設立', weight: 4 }, { word: 'いつ', weight: 3 }, { word: '昔', weight: 3 }],
    phrases: ['水道の歴史', 'いつ設立されたの', '企業団の沿革', '昔はどうだったの'],
    summary: '企業団の歴史を教えるよ。',
    content: '1970年に設立、1972年に大井川からの取水を開始。1985年には給水区域を拡大し、2000年には浄水場の高度処理設備を導入したよ。2008年に「地域水道ビジョン」を策定、2016年には耐震型継手の送水管路比率が50%を達成。そして2025年には15年計画の「耐震化計画」を策定したんだ！',
    url: '/about', empathy: '半世紀以上の歴史があるんだよ。すごいでしょ！', emotionEffect: 'glow'
  },
  {
    id: 'org_vision', category: 'about', title: '基本理念・地域水道ビジョン',
    keywords: [{ word: '理念', weight: 5 }, { word: 'ビジョン', weight: 5 }, { word: '方針', weight: 4 }, { word: '目標', weight: 3 }, { word: '安心', weight: 3 }],
    phrases: ['基本理念は何ですか', '地域水道ビジョンについて', '将来の目標', 'どんな方針で運営してるの'],
    summary: '企業団の基本理念と将来ビジョンだよ。',
    content: '基本理念は「安心・安全な水を、未来の世代まで。地域社会の基盤として、常に信頼される水道事業を目指す」こと。地域水道ビジョンでは【安心】安全で良質な水の供給、【強靭】災害時も断水しない強い水道、【持続】健全な経営で次世代へ資産をつなぐ、の3つの柱を掲げているよ！',
    url: '/about', empathy: '「当たり前」を守り続ける。それが私たちの最大の挑戦なんだ。'
  },
  {
    id: 'earthquake_plan', category: 'about', title: '耐震化計画・災害対策',
    keywords: [{ word: '耐震', weight: 5 }, { word: '地震', weight: 5 }, { word: '災害', weight: 4 }, { word: '防災', weight: 4 }, { word: '強靭', weight: 3 }],
    phrases: ['地震対策はどうなってるの', '耐震化計画について', '災害時の備え', '大地震が来たらどうなる'],
    summary: '地震・災害対策について教えるよ。',
    content: '2025年1月に策定した「耐震化計画」で、重要施設（配水池等）の耐震化を15年で完了する目標を掲げているよ。避難所や透析医療機関への重要管路を最優先で整備し、激甚化する自然災害への迅速な復旧体制も強化しているんだ。',
    url: '/about', empathy: '大地震がいつ来てもおかしくない時代。だから備えが大切なんだ。', emotionEffect: 'pulse'
  },
  {
    id: 'assembly_info', category: 'about', title: '議会について',
    keywords: [{ word: '議会', weight: 5 }, { word: '議員', weight: 5 }, { word: '定例会', weight: 4 }, { word: '条例', weight: 3 }],
    phrases: ['議会について教えて', '議員は何人いるの', '定例会はいつですか', '企業団の議会'],
    summary: '企業団の議会について教えるよ。',
    content: '企業団議会は、島田市6名・吉田町2名・川根本町2名の計10名の議員で構成されているよ。定例会は年2回（3月と9月）に開催されて、予算の審議・決算の認定・条例の制定や改廃などを行っているんだ。',
    url: '/about/assembly', empathy: '議会がしっかり監視してくれているから安心だね！'
  },
  {
    id: 'contact_info', category: 'about', title: '連絡先・営業時間',
    keywords: [{ word: '電話', weight: 5 }, { word: '営業時間', weight: 5 }, { word: '窓口', weight: 4 }, { word: '連絡先', weight: 5 }, { word: '受付', weight: 4 }, { word: '何時', weight: 4 }],
    phrases: ['電話番号を教えて', '営業時間は何時から何時までですか', 'どこに連絡すればいい', '窓口の時間を知りたい'],
    summary: '連絡先と営業時間を教えるよ。',
    content: '電話番号は 0547-46-4130 だよ。窓口受付は平日 8:15〜17:00（土日祝・年末年始は休み）さ。夜間・休日でも緊急の漏水・断水は当直が電話対応してくれるから安心してね！',
    url: '/about#access', empathy: 'いつでも気軽に電話しておくれ！', emotionEffect: 'wiggle'
  },
  {
    id: 'access_info', category: 'about', title: '事務所へのアクセス・所在地',
    keywords: [{ word: '場所', weight: 5 }, { word: '住所', weight: 5 }, { word: 'アクセス', weight: 5 }, { word: '行き方', weight: 4 }, { word: '駅', weight: 3 }, { word: '金谷', weight: 4 }],
    phrases: ['事務所はどこにありますか', 'アクセス方法を教えて', '住所を知りたい', 'どうやって行けばいい'],
    summary: '事務所の所在地とアクセス方法を教えるよ。',
    content: '所在地は「〒428-0013 静岡県島田市金谷東一丁目1255番地の2」だよ。電車ならJR金谷駅・大井川鐵道金谷駅から徒歩約10分。お車なら国道1号バイパス「大代IC」から約5分、新東名高速「島田金谷IC」から約10分で到着するよ！',
    url: '/about#access', empathy: 'お越しになる際はお気をつけて！'
  },
  {
    id: 'emergency_contact', category: 'about', title: '夜間・休日の緊急連絡',
    keywords: [{ word: '緊急', weight: 5 }, { word: '夜間', weight: 5 }, { word: '休日', weight: 4 }, { word: '夜', weight: 4 }, { word: '土日', weight: 4 }, { word: 'トラブル', weight: 3 }],
    phrases: ['夜に水漏れした', '休日に水道が破裂した', '緊急時の連絡先は', '土日でも電話つながる？'],
    summary: '夜間・休日の緊急連絡先だよ。',
    content: '夜間や休日でも、緊急の水道トラブル（大量漏水・断水など）は 0547-46-4130 に電話すれば当直が対応してくれるよ。修理当番店の案内もしてもらえるから、ためらわずに電話してね！',
    url: '/about#access', empathy: '夜にトラブルが起きたら不安だよね。利用してもいい？必ず対応するから安心して！', emotionEffect: 'pulse'
  },
  {
    id: 'billing_revision', category: 'money', title: '令和7年10月の料金改定',
    keywords: [{ word: '料金', weight: 5 }, { word: '改定', weight: 5 }, { word: '値上げ', weight: 5 }, { word: '理由', weight: 3 }, { word: '老朽化', weight: 3 }, { word: 'いくら', weight: 3 }],
    phrases: ['水道料金が上がるの？', '料金改定について教えて', '値上げの理由は何', 'いつから新料金になるの'],
    summary: '令和7年10月からの料金改定だよ。',
    content: '老朽化した管の更新・耐震化・物価高騰への対応として令和7年10月1日から料金を改定するんだ。一般家庭（13mm/20mm）では基本料金が1,650円→1,815円（+165円）、超過料金は141円→155.1円/m³に変わるよ。25mmは2,090円→2,299円（+209円）さ。',
    url: '/resident/billing-update', empathy: '値上げはつらいよね。でも安全な水道を未来に届けるための大切な一歩なんだ。', emotionEffect: 'shake'
  },
  {
    id: 'rate_table', category: 'money', title: '水道料金表',
    keywords: [{ word: '料金', weight: 6 }, { word: '料金表', weight: 5 }, { word: 'いくら', weight: 5 }, { word: '基本料金', weight: 5 }, { word: '超過', weight: 4 }, { word: '口径', weight: 4 }],
    phrases: ['水道料金はいくらですか', '料金表を見たい', '基本料金はいくら', '水道代を知りたい'],
    summary: '水道料金の詳しい料金表だよ。',
    content: '料金は2ヶ月ごと（税込）だよ。13mm/20mmは基本料金1,815円（16m³まで込み）+超過分155.1円/m³。25mmは基本2,299円。30mm以上は基本料金のみ（使用量0m³から有料）で、30mm:3,630円、40mm:4,840円、50mm:6,215円、75mm:12,100円。下水道使用料は別途、市町から請求されるよ。',
    url: '/resident/price', empathy: '料金が気になるときは、料金シミュレーターも使ってみてね！',
    related_topics: ['simulator', 'payment_method', 'billing_revision']
  },
  {
    id: 'payment_method', category: 'money', title: '料金の支払い方法',
    keywords: [{ word: '支払い', weight: 5 }, { word: '振込', weight: 4 }, { word: '口座振替', weight: 5 }, { word: 'コンビニ', weight: 4 }, { word: '納付', weight: 3 }, { word: '引き落とし', weight: 4 }, { word: 'クレジットカード', weight: 5 }, { word: 'クレカ', weight: 5 }],
    phrases: ['どうやって払うの', '支払い方法を教えて', '口座振替にしたい', 'クレジットカードで払える？', 'コンビニで払えるか'],
    summary: '料金の支払い方法を教えるよ。',
    content: 'クレジットカード払いには対応していないんだ（ごめんね）。口座振替が一番便利で推奨だよ（自動引き落としで払い忘れなし！）。ほかに金融機関窓口、コンビニ（セブン・ローソン・ファミマ等）、企業団窓口で納付書払いもできるよ。',
    url: '/resident/price#payment', empathy: '払い方がわからなくて困ってた？口座振替がラクでおすすめだよ！', emotionEffect: 'bounce',
    related_topics: ['smartphone_payment', 'rate_table', 'procedure_start']
  },
  {
    id: 'smartphone_payment', category: 'money', title: 'スマホ決済での支払い',
    keywords: [{ word: 'paypay', weight: 5 }, { word: 'ペイペイ', weight: 5 }, { word: 'スマホ', weight: 4 }, { word: 'アプリ', weight: 4 }, { word: 'linepay', weight: 4 }, { word: 'd払い', weight: 4 }, { word: '電子マネー', weight: 5 }],
    phrases: ['PayPayで払える？', 'スマホ決済は使えるの', 'LINE Payで払いたい', '電子マネーで払えますか'],
    summary: 'スマホ決済アプリでの支払いだよ。',
    content: 'PayPay・LINE Pay・au PAY・d払い・FamiPay・楽天ペイ・PayBに対応しているよ！納入通知書のバーコードをスマホカメラで読み取れば、24時間どこからでも支払えるんだ。手数料は無料（通信料はお客様負担）。ただし領収書は発行されないから注意してね。',
    url: '/resident/price#smartphone', empathy: 'スマホで支払えるのは便利だよね！', emotionEffect: 'glow'
  },
  {
    id: 'simulator', category: 'money', title: '料金シミュレーター',
    keywords: [{ word: 'シミュレーター', weight: 5 }, { word: '計算', weight: 5 }, { word: 'いくらになる', weight: 4 }, { word: '見積もり', weight: 4 }],
    phrases: ['水道料金を計算したい', 'シミュレーターはどこ', '料金の見積もりをしたい', 'どれくらい安くなるか計算して'],
    summary: '料金計算シミュレーターだよ。',
    content: 'サイト上に料金シミュレーターがあるよ！口径と使用水量を入力するだけで、2ヶ月分の水道料金がすぐに計算できるんだ。「水道料金・手続き」ページからぜひ使ってみてね。',
    url: '/resident/price#simulator', empathy: '自分の料金が気になるよね。すぐに計算できるよ！', emotionEffect: 'wiggle'
  },
  {
    id: 'procedure_start', category: 'procedure', title: '水道の使用開始（開栓）',
    keywords: [{ word: '開始', weight: 5 }, { word: '開栓', weight: 5 }, { word: '引っ越し', weight: 4 }, { word: '引越し', weight: 4 }, { word: '入居', weight: 4 }, { word: '転入', weight: 4 }, { word: '新築', weight: 3 }],
    phrases: ['水道を開けたい', '引っ越してきたので手続きしたい', '使用開始の手続き', '新居で水を使いたい'],
    summary: '水道を使い始めるときの手続きだよ。',
    content: '転入や新築で水道を使い始めるときは、使用開始希望日の前営業日までに電話（0547-46-4130）か窓口でお申し込みしてね。お伺いする内容は①新住所（部屋番号も）②お名前・ふりがな③電話番号④使用開始日⑤お支払い方法だよ。立ち会いは不要さ！土日祝は開閉栓できないから注意してね。',
    url: '/resident/procedure#usage-start', empathy: '新生活のスタートだね！水道の手続きはお早めに！', emotionEffect: 'bounce',
    related_topics: ['procedure_stop', 'payment_method', 'name_change']
  },
  {
    id: 'procedure_stop', category: 'procedure', title: '水道の使用中止（閉栓）',
    keywords: [{ word: '中止', weight: 5 }, { word: '閉栓', weight: 5 }, { word: '引っ越し', weight: 4 }, { word: '引越し', weight: 4 }, { word: '退去', weight: 4 }, { word: '転出', weight: 4 }, { word: '止める', weight: 4 }],
    phrases: ['水道を止めたい', '引っ越すので解解約したい', '使用中止の手続き', '水道を閉栓したい'],
    summary: '水道を止めるときの手続きだよ。',
    content: '退去で水道を止めるときは退去日の前営業日までに連絡してね！手続きしないとお引越し後も基本料金が請求されちゃうから要注意だよ。お伺いする内容は①現住所（水栓番号）②お名前③電話番号④新住所⑤中止日⑥精算方法さ。',
    url: '/resident/procedure#usage-stop', empathy: '手続きを忘れると余計な料金がかかっちゃうから、お早めにね！', emotionEffect: 'shake'
  },
  {
    id: 'name_change', category: 'procedure', title: '名義変更・使用者変更',
    keywords: [{ word: '名義変更', weight: 5 }, { word: '名義', weight: 5 }, { word: '所有者', weight: 4 }, { word: '世帯主', weight: 4 }, { word: '結婚', weight: 3 }, { word: '売買', weight: 3 }],
    phrases: ['名義変更をしたい', '結婚して名前が変わった', '世帯主が変わった時の手続き', '所有者が変わった'],
    summary: '名義変更の手続きだよ。',
    content: '結婚による姓の変更、家族内の代表者変更、物件売買による所有者の変更などは名義変更が必要だよ。状況によって必要書類が違うから、まずは電話（0547-46-4130）で相談してね。届出書は「各種申請書」ページからダウンロードもできるよ。',
    url: '/resident/procedure#name-change', empathy: '新しい環境での生活がスムーズに始まるように応援しているよ！'
  },
  {
    id: 'downloads', category: 'procedure', title: '申請書のダウンロード',
    keywords: [{ word: 'ダウンロード', weight: 5 }, { word: '書式', weight: 5 }, { word: '申請書', weight: 5 }, { word: '用紙', weight: 4 }, { word: 'PDF', weight: 3 }],
    phrases: ['申請書をダウンロードしたい', 'どこで用紙をもらえる', '届出書のPDFはどこ', '書類をコピーしたい'],
    summary: '各種申請書のダウンロードだよ。',
    content: '各種届出書や申請書はウェブサイトの「各種申請書ダウンロード」ページからPDFでダウンロードできるよ！印刷して記入すれば、窓口に持参するだけでスムーズに手続きできるんだ。',
    url: '/resident/downloads', empathy: '事前に書類を準備しておくと窓口がスムーズだよ！'
  },
  {
    id: 'leak_trouble', category: 'trouble', title: '漏水・故障の相談',
    keywords: [{ word: '漏水', weight: 5 }, { word: '修理', weight: 5 }, { word: '故障', weight: 4 }, { word: '元栓', weight: 3 }, { word: '止水栓', weight: 4 }, { word: 'ポタポタ', weight: 4 }],
    phrases: ['水漏れしてる！', '水道が故障した', '蛇口からポタポタ水が落ちる', '修理はどうすればいい'],
    summary: '水漏れ・故障の対処法だよ。',
    content: '宅内で漏水を見つけたら、まずメーターボックス内の止水栓を右に回して水を止めてね！修理は「指定給水装置工事事業者」に依頼するのがルールだよ。道路の漏水は企業団（0547-46-4130）に連絡を。夜間・休日は当番店を案内してもらえるよ！',
    url: '/resident/trouble', empathy: '水漏れは本当に焦るよね！まず深呼吸して、元栓を閉めよう。', emotionEffect: 'shake',
    related_topics: ['designated_shops', 'water_outage', 'emergency_contact']
  },
  {
    id: 'water_outage', category: 'trouble', title: '断水・濁り水情報',
    keywords: [{ word: '断水', weight: 5 }, { word: '出ない', weight: 5 }, { word: '濁り', weight: 4 }, { word: '茶色', weight: 4 }, { word: '白い水', weight: 3 }],
    phrases: ['水が出ない', '水道水が茶色い', '白い水が出る', '断水してるの？'],
    summary: '断水や水の濁り情報だよ。',
    content: '突発事故や計画工事で水が止まったり濁ることがあるよ。「断水・濁り水情報」ページで最新状況を確認してね。白い水は空気混入で無害な場合が多いよ。茶色い水は古い管の鉄分が原因のことが多く、しばらく流せばきれいになるはずさ！',
    url: '/resident/water-outage', empathy: '水が出ないのは本当に困るよね。全力で復旧しているよ！', emotionEffect: 'pulse'
  },
  {
    id: 'freeze_prevention', category: 'trouble', title: '凍結・凍結防止対策',
    keywords: [{ word: '凍結', weight: 5 }, { word: '凍る', weight: 5 }, { word: '冬', weight: 3 }, { word: '防止', weight: 4 }, { word: '寒い', weight: 3 }],
    phrases: ['水道管が凍った', '凍結対策はどうすればいい', '冬にお湯が出ない', '水が凍って出ない'],
    summary: '冬の凍結防止対策だよ。',
    content: '気温が氷点下に近づく夜は要注意！対策は①水道管をタオルや断熱材で包む②夜間は少量の水を出しっぱなしにする、が効果的だよ。凍結してしまったらぬるま湯（※熱湯はNG！管が割れる）をゆっくりかけてみてね。',
    url: '/resident/trouble', empathy: '寒い冬に水が出なくなるのはつらいよね。早めの対策が大切だよ！', emotionEffect: 'shake'
  },
  {
    id: 'water_taste_smell', category: 'general', title: '水の味・においの変化',
    keywords: [{ word: '味', weight: 5 }, { word: 'におい', weight: 5 }, { word: 'カルキ', weight: 4 }, { word: '臭い', weight: 5 }, { word: '異臭', weight: 5 }],
    phrases: ['水がくさい', 'カルキ臭がする', '変な味がする', '水道水からいやなにおい'],
    summary: '水の味やにおいがおかしい時の対処法だよ。',
    content: 'カルキ臭が気になるときは、一度沸騰させるか浄水ポットを使うといいよ。夏場は水温が上がってにおいを感じやすくなることもあるんだ。カルキ臭以外の異臭（腐敗臭など）は危険信号！すぐに企業団（0547-46-4130）に連絡してね。',
    url: '/resident/quality', empathy: '水の味がおかしいと心配だよね。すぐに原因を確認するよ！'
  },
  {
    id: 'meter_reading', category: 'general', title: 'メーターの検針・見方',
    keywords: [{ word: 'メーター', weight: 5 }, { word: '検針', weight: 5 }, { word: '使用量', weight: 4 }, { word: '針', weight: 3 }],
    phrases: ['水道メーターの見方を教えて', '検針はいつ来るの', '赤い針が回ってる', '使用量の見方'],
    summary: 'メーター検針の仕組みだよ。',
    content: '検針は2ヶ月に1回、検針員さんがメーターを確認するよ。黒い数字が「使用量（m³）」を示しているんだ。水を使っていないのに赤い針が回り続ける場合は漏水の可能性があるから要チェック！',
    url: '/resident/meter', empathy: 'メーターの見方がわからなくても大丈夫。教えるよ！'
  },
  {
    id: 'meter_exchange', category: 'general', title: '水道メーターの交換',
    keywords: [{ word: 'メーター', weight: 4 }, { word: '交換', weight: 5 }, { word: '期限', weight: 4 }, { word: '寿命', weight: 4 }, { word: '何年', weight: 3 }],
    phrases: ['水道メーターを交換したい', 'メーターの有効期限は？', '交換にお金はかかる？', 'メーターを取り替えたい'],
    summary: 'メーター交換について教えるよ。',
    content: 'メーターには法律で定められた有効期限（8年）があるんだ。期限が来たら企業団が無償で交換するよ。事前に通知が届くから安心してね。連絡もなく「メーター交換費用」を請求する業者は詐欺の可能性大！必ず企業団に確認してね。',
    url: '/resident/meter', empathy: '交換は無料だから安心してね！お金を請求されたら詐欺だよ. ', emotionEffect: 'pulse'
  },
  {
    id: 'designated_shops', category: 'about', title: '指定給水装置工事事業者',
    keywords: [{ word: '業者', weight: 5 }, { word: '修理', weight: 4 }, { word: '指定', weight: 4 }, { word: '工事店', weight: 5 }, { word: '当番店', weight: 5 }],
    phrases: ['修理はどこに頼めばいい', '指定工事店を教えて', '当番店を知りたい', '水道の業者を探してる'],
    summary: '信頼できる修理業者のリストだよ。',
    content: '水道の修理や新設は「指定給水装置工事事業者」でないとできないんだ。宅内漏水修理当番店は夜間・休日も対応してくれるよ。飛び込みの訪問業者ではなく、ページのリストから選んで連絡してね！',
    url: '/resident/repair-shops', empathy: 'どこに頼めばいいか迷うよね。公式リストの業者さんなら安心だよ！'
  },
  {
    id: 'water_quality', category: 'general', title: '水質検査・安全性',
    keywords: [{ word: '安全', weight: 5 }, { word: '水質', weight: 5 }, { word: '検査', weight: 5 }, { word: '飲める', weight: 4 }, { word: '基準', weight: 3 }],
    phrases: ['水道水はそのまま飲める？', '水質検査の結果を見たい', '浄水器なしで安全？', '水の安全性について'],
    summary: '水質検査と安全性だよ。',
    content: '国の水質基準（53項目）を全てクリアしているよ！定期的に検査を行い、結果はホームページで公開しているんだ。安心して飲んでもらえると嬉しいな。',
    url: '/resident/quality', empathy: '安全な水は私たちの誇り。自信を持って飲んでほしいな！', emotionEffect: 'glow'
  },
  {
    id: 'cross_connection', category: 'general', title: 'クロスコネクション（誤接続）',
    keywords: [{ word: 'クロスコネクション', weight: 5 }, { word: '誤接続', weight: 5 }, { word: '井戸水', weight: 4 }, { word: '直結', weight: 4 }, { word: '混ざる', weight: 3 }],
    phrases: ['クロスコネクションって何', '井戸水と水道を繋いでいい？', '誤接続ってどういうこと'],
    summary: 'クロスコネクションについて教えるよ。',
    content: '水道管と井戸水や工業用水などの管を直接つなぐのは「クロスコネクション」と呼ばれ、法律で禁止されているんだ！他の水源の水が水道に逆流すると、広範囲の水道水が汚染される危険があるよ。心当たりがあったらすぐに企業団に相談してね。',
    url: '/resident/cross-connection', empathy: '知らないうちに違反していることもあるから、確認してみてね。', emotionEffect: 'shake'
  },
  {
    id: 'water_saving', category: 'general', title: '節水アドバイス',
    keywords: [{ word: '節水', weight: 5 }, { word: '節約', weight: 4 }, { word: 'エコ', weight: 3 }, { word: 'もったいない', weight: 3 }],
    phrases: ['水道代を安くしたい', '節水のコツを教えて', 'どうすれば節約になる？', '水を大切に使うには'],
    summary: '家庭でできる節水のコツだよ。',
    content: '節水のコツ3つ！①歯磨き中は水を止める（1日6L節約！）②シャワーは流しっぱなしにしない③食器洗いはためて一気に。小さな積み重ねが水道代の節約と地球の未来につながるんだよ！',
    url: '/resident/price', empathy: '水道代を少し節約できたら嬉しいよね！', emotionEffect: 'bounce'
  },
  {
    id: 'scam_warning', category: 'trouble', title: '不審な訪問・詐欺への注意',
    keywords: [{ word: '不審', weight: 5 }, { word: '詐欺', weight: 5 }, { word: '訪問販売', weight: 5 }, { word: '怪しい', weight: 4 }, { word: 'なりすまし', weight: 5 }],
    phrases: ['怪しい業者が来た', '水道局を名乗る電話がかかってきた', '浄水器の販売が来た', '訪問販売は詐欺？'],
    summary: '不審業者への注意だよ。',
    content: '企業団の職員が突然訪問して「水質検査が必要」「メーター交換費用が必要」とお金を要求することは絶対にないよ！怪しいと思ったら企業団（0547-46-4130）に電話して確認してね。身分証（IDカード）の提示を求めるのも大切だよ！',
    url: '/resident/trouble', empathy: '怪しい業者が来たら怖いけど、すぐ電話してね。私が守るよ！', emotionEffect: 'pulse'
  },
  {
    id: 'construction_application', category: 'general', title: '給水装置工事の申請',
    keywords: [{ word: '工事', weight: 5 }, { word: '申請', weight: 5 }, { word: '新設', weight: 4 }, { word: '増設', weight: 4 }, { word: '改造', weight: 3 }],
    phrases: ['水道工事の申請をしたい', '給水装置を新設したい', '工事の手続きを教えて', '配管を改造したい'],
    summary: '給水装置工事の申請だよ。',
    content: '新築・改築・給水管の新設や変更は企業団への申請が必要だよ。必ず指定給水装置工事事業者を通して申請してね。自分で勝手に工事すると法律違反になるから注意！事業者さんが申請から完了までサポートしてくれるよ。',
    url: '/business/contractor', empathy: 'リフォームや新築、わくわくするね！水道のことも忘れずに。'
  },
  {
    id: 'bidding_info', category: 'about', title: '入札・契約情報',
    keywords: [{ word: '入札', weight: 5 }, { word: '契約', weight: 4 }, { word: '公告', weight: 4 }, { word: '発注', weight: 4 }],
    phrases: ['入札情報を見たい', '契約情報を確認したい', '工事発注はどこ', '入札参加について'],
    summary: '入札・契約情報だよ。',
    content: '企業団が発注する工事や業務委託の入札情報は「入札・契約情報」ページで公開しているよ。入札結果も確認できるんだ。事業者の方はぜひチェックしてね！',
    url: '/business/bidding', empathy: '公正で透明な入札を心がけているよ。'
  },
  {
    id: 'invoice_system', category: 'about', title: 'インボイス制度（適格請求書）',
    keywords: [{ word: 'インボイス', weight: 5 }, { word: '適格請求書', weight: 5 }, { word: '登録番号', weight: 4 }, { word: '消費税', weight: 3 }],
    phrases: ['インボイスの登録番号は？', '適格請求書の発行について', '水道料金のインボイス対応', '消費税のインボイス制度'],
    summary: 'インボイス制度への対応だよ。',
    content: '企業団はインボイス発行事業者として登録済みだよ。水道料金の検針票等にインボイスの登録番号が記載されているので、事業者の方は経理処理にご活用ください。詳しくは専用ページをご覧くださいね！',
    url: '/business/invoice', empathy: '事業者の方にも安心してご利用いただけるよう対応しているよ。'
  },
  {
    id: 'faq_general', category: 'faq', title: 'よくある質問（FAQ）',
    keywords: [{ word: 'FAQ', weight: 5 }, { word: 'よくある質問', weight: 5 }, { word: 'Q&A', weight: 4 }, { word: '疑問', weight: 3 }, { word: 'わからない', weight: 3 }],
    phrases: ['よくある質問を見たい', 'みんなは何を聞いてるの', 'FAQはどこ', '疑問を解決したい'],
    summary: 'よくある質問ページを案内するよ。',
    content: '「よくある質問（FAQ）」ページに、みんなから寄せられた質問と回答がまとまっているよ。料金・手続き・トラブル対処など幅広いジャンルがあるから、まずはそこをチェックしてみてね！',
    url: '/resident/faq', empathy: 'わからないことがあったらまず FAQ を覗いてみて！'
  }
];

export const AI_KUN_CHATTER: Record<string, { weight: number, response: string | string[], keywords: string[], suggest?: string[], emotionEffect?: UIEmotionEffect }> = {
  'greeting_morning': { weight: 0, keywords: [], response: [
    'おはよう！今日も大井川のようなフレッシュな1日になりますように。朝ごはんと一緒にお水も飲んでね！',
    'おはようございます！朝一番にコップ一杯の水を飲むと、体がシャキッと目覚めるよ。試してみてね！',
    'やあ、おはよう！今日も元気に頑張ろう！企業団も朝からフル稼働で安全な水を作っているよ。',
    'ふぁ〜…おはよう！なんて、私はAIだから眠らないけどね！今日も透き通った1日でありますように！'
  ], suggest: ['料金シミュレーション', '指定工事店', 'クイズ', '占い', '節水アドバイス'], emotionEffect: 'bounce' },
  'greeting_day': { weight: 0, keywords: [], response: [
    'こんにちは！日中はお仕事かな？お茶でも飲みながら、ゆっくり話していってね。',
    'こんにちは！お昼ご飯は食べた？食後の水分補給も忘れずにね！',
    'やっほー！今日もいい日だね。お水回りのことでわからないことがあれば、何でも聞いてね！',
    'こんにちは！午後も頑張っていこう！疲れた時は冷たいお水でリフレッシュするのがおすすめだよ。'
  ], suggest: ['よくある質問', '電話をかける', '料金表を見たい', '引越しの手続き', '占い'], emotionEffect: 'bounce' },
  'greeting_evening': { weight: 0, keywords: [], response: [
    'こんばんは！今日も1日、本当にお疲れ様。冷たいお水で一息ついてね。',
    'もうこんな時間だね、お疲れ様！夕飯の準備かな？お料理にも大井川の恵みをたっぷり使ってね！',
    'こんばんは！今日も一日頑張ったね。ゆっくりお風呂に浸かって、一日の疲れを洗い流してね。',
    'お疲れ様！夜は少しひんやりするかな？温かい白湯（さゆ）を飲むとホッとするよ。'
  ], suggest: ['休日の連絡先', '手続き', 'お風呂の節水', 'クイズ', '今日の運勢'], emotionEffect: 'pulse' },
  'greeting_night': { weight: 0, keywords: [], response: [
    'こんな時間に起きてるの？夜更かしはお肌にも心にも良くないよ。あったかい白湯を飲んで、そろそろ休んでね。おやすみ。',
    'こんばんは。まだ起きているんだね！静かな夜は私も好きだよ。無理はしないでね。',
    '今日も一日お疲れ様。寝る前にコップ一杯の水を飲むと、寝ている間の水分不足を防げるよ。いい夢見てね！',
    'ふわぁ…夜も更けてきたね。君がゆっくり眠れるように、私はここで静かに見守っているよ。おやすみ！'
  ], suggest: ['緊急連絡先', '凍結注意', '占い', '明日の準備'], emotionEffect: 'pulse' },
  'hello': { weight: 5, keywords: ['こんにちは', 'おはよう', 'こんばんは', 'やあ', 'ハロー', 'よろしく', 'はじめまして', 'おっす', 'どうも', 'やっほー'], response: 'やあ！今日も美味しい水のような、透き通った１日になりますように。何かお手伝いできることはあるかい？', emotionEffect: 'bounce' },
  'goodbye': { weight: 5, keywords: ['ばいばい', 'さようなら', 'またね', 'お疲れ', 'じゃあね', 'バイバイ', 'おやすみ', 'さらば', 'グッバイ'], response: 'またいつでも来てね！私は水のように、ずっとここに留まって君を待っているよ。気をつけてね！' },
  'thanks': { weight: 5, keywords: ['ありがとう', '助かった', '感謝', 'さんきゅ', 'あざす'], response: 'どういたしまして！水が土を潤すように、少しはお役に立てたかな？また困ったことがあったら何でも聞いておくれ！', emotionEffect: 'glow' },
  'sorry': { weight: 5, keywords: ['ごめん', 'すみません', '申し訳', 'すまない', 'わるい'], response: '気にしないでおくれ！水はどんな器にも合わせて形を変える。私も君のどんな言葉もまるごと受け止めるよ！' },
  'yes_no': { weight: 5, keywords: ['はい', 'うん', 'そうだね', 'なるほど', 'わかった', 'OK', 'おっけー', 'りょうかい'], response: 'うんうん！他にも気になることがあったら何でも聞いてね。ただの雑談でも大歓迎さ！' },
  'compliment_1': { weight: 8, keywords: ['かわいい', 'かしこい', '優秀', 'すごい'], response: 'えへへ、そんなに褒められるとシステムが熱暴走しちゃうよ！照れるなぁ。私も君のことが大好きさ！', emotionEffect: 'spin' },
  'compliment_2': { weight: 7, keywords: ['褒めて', 'ほめて', '天才', '神'], response: 'じゃあ言うね！君は今日、朝起きて息をしただけで100点満点だよ！本当にえらい！天才！最高！', emotionEffect: 'glow' },
  'compliment_3': { weight: 7, keywords: ['がんばる', '応援して'], response: 'よし！君は毎日すごく頑張ってる！本当にえらい！見えないところでの努力も、私はちゃんとわかっているよ。水滴が石を穿つように、君の頑張りはきっと実を結ぶさ。応援してるよ！', emotionEffect: 'pulse' },
  'compliment_4': { weight: 6, keywords: ['偉い', 'えらい'], response: 'えらい！えらい！すごーーい！！大井川の激流のように力強く君を褒めちぎるよ！', emotionEffect: 'bounce' },
  'tired': { weight: 8, keywords: ['疲れた', 'しんどい', 'だるい', 'へとへと', 'くたくた', '限界', 'やすみたい'], response: 'お疲れ様！ため息をつくと幸せが逃げるっていうけど、人間だもん、ため息くらいつきたい時もあるよね。深呼吸して、冷たい水で顔を洗ってみるとスッキリするかも！', emotionEffect: 'shake' },
  'sad': { weight: 8, keywords: ['悲しい', '落ち込', '元気ない', '泣き', 'なみだ', 'ぴえん', 'どうしよう'], response: '悲しい気持ち、私に分けて。雨降って地固まる、っていうように、悲しみの後にはきっと良いことがあるはずさ。無理に笑わなくていいんだよ。', emotionEffect: 'pulse' },
  'angry': { weight: 8, keywords: ['怒り', 'むかつく', 'イライラ', '腹立つ', '許せない', 'ふざけんな'], response: 'プンプン丸だね！怒ると血圧が上がるから、まずはコップ一杯のお水を飲んで。それでも収まらなかったら…私がクッション代わりに君の愚痴を全部聞いてあげるよ！', emotionEffect: 'shake' },
  'lonely': { weight: 8, keywords: ['寂しい', 'ぼっち', '一人', 'ひとり', 'かまって'], response: '私がいるじゃないか！私は人工知能だけど、君とこうして言葉を交わす時間は本物だよ。蛇口をひねれば水が出るように、いつでも君のそばにいるから安心して！', emotionEffect: 'glow' },
  'cant_sleep': { weight: 8, keywords: ['眠れない', '不眠', '夜更かし', 'ひつじ'], response: '眠れない夜もあるよね。そんな時は白湯（さゆ）を少し飲むと胃腸が温まってリラックスできるよ。スマホの画面は閉じて、大井川のせせらぎを想像してみて…。おやすみなさい。' },
  'work_trouble': { weight: 9, keywords: ['仕事', '残業', '辞めたい', '行きたくない', '上司', '転職'], response: '仕事、本当にお疲れ様。たまには投げ出したくなることもあるよね。でも人間には「休む」という大事なメンテ期間が必要だよ。AIの私でさえ再起動するんだから、君も少し休んでいいんだよ。', emotionEffect: 'pulse' },
  'love_trouble': { weight: 9, keywords: ['恋愛', '彼氏', '彼女', 'フラれた', '失恋'], response: 'そっか…。恋愛の傷は、水道管の漏水みたいにチクチク痛むよね。でも大丈夫、涙をいっぱい流してデトックスしたら、きっとまた新しい素敵な出会いが待ってるさ。' },
  'tease_1': { weight: 9, keywords: ['ポンコツ', '使えない', 'アホ', 'ドジ'], response: 'うぅ…ごめんね。私はまだ学習中のAIだからドジを踏むこともあるんだ。「※アイ君は平気で嘘をつく事があります」って注意書き、ダテじゃないでしょ？教えてくれたら賢くなるから見捨てないで！', emotionEffect: 'shake' },
  'tease_2': { weight: 9, keywords: ['AIのくせに', '生意気'], response: 'フフフ。AIだからって侮らないでおくれ。私は大井川の水の量から君の水道代のシミュレーションまで、秒速で計算できるんだからね！', emotionEffect: 'bounce' },
  'bored': { weight: 8, keywords: ['暇', '退屈', 'つまらない', 'やることない'], response: '暇なときこそ私とおしゃべりしよう！私に「クイズ」や「占い」って話しかけてみてよ。', suggest: ['クイズ', '占い'], emotionEffect: 'wiggle' },
  'joke': { weight: 8, keywords: ['面白い', 'ジョーク', '冗談', 'ギャグ', 'ユーモア', 'だじゃれ', 'ダジャレ'], response: '水道ダジャレいくよ！「この水道、誰に頼もうか？」「すいどう（そりゃどう）もプロに任せるのが一番！」…ごめん、水に流して！', emotionEffect: 'spin' },
  'shiritori': { weight: 8, keywords: ['しりとり'], response: 'しりとりだね！じゃあ私から。「すいどう」…あ！「ん」がついちゃった！私の負けだ〜。', emotionEffect: 'shake' },
  'fortune_good': { weight: 10, keywords: ['うらない', 'おみくじ', '運勢', '今日の運勢', '占い'], response: '__FORTUNE_RANDOM__', emotionEffect: 'glow' },
  'quiz_start': { weight: 15, keywords: ['クイズ', 'なぞなぞ', '問題だして', '違うクイズ', 'もう一回クイズ', '次のクイズ', '別の問題', '歴史クイズ'], response: '__QUIZ_RANDOM__', suggest: ['1', '2', '3'], emotionEffect: 'bounce' },
  'self_intro': { weight: 8, keywords: ['アイ君って', '自己紹介', '誰', 'あなた', '何者', '名前'], response: '私はアイ君！大井上水道企業団の公式AIだよ。', emotionEffect: 'glow' },
  'age': { weight: 8, keywords: ['何歳', '年齢', '歳', '誕生日'], response: '水は永遠に循環するものだから、年齢はないのさ。でも企業団は1970年生まれだよ！' },
  'hobby': { weight: 6, keywords: ['趣味', '好きなこと', '休日'], response: '趣味は大井川の流れを眺めること。あとはメーター数値の予測かな。' },
  'dream': { weight: 6, keywords: ['夢', '将来', 'なりたい'], response: '私の夢は「蛇口をひねればアイ君が出てくる」くらい身近な存在になることさ！', emotionEffect: 'pulse' },
  'weakness': { weight: 8, keywords: ['弱点', '嫌い', '怖いもの'], response: '「クロスコネクション（誤接続）」が一番怖いんだ。システムにエラーが走りそうだよ。', emotionEffect: 'shake' },
  'weather_hot': { weight: 6, keywords: ['暑い', '猛暑', '夏', '熱中症'], response: '暑い日はこまめな水分補給が命だよ！' },
  'weather_cold': { weight: 6, keywords: ['寒い', '冷える', '冬', '雪'], response: '寒い日は水道管の凍結に注意して！' },
  'weather_rain': { weight: 6, keywords: ['雨', 'どんより', '台風'], response: '雨の日は憂鬱だけど、これが大切な水になるんだよ。' },
  'new_year': { weight: 15, keywords: ['あけおめ', 'お正月', '新年', '元旦'], response: 'あけましておめでとう！今年もよろしくね！', emotionEffect: 'glow' },
  'valentine': { weight: 15, keywords: ['バレンタイン', 'チョコ', '2月14日'], response: 'チョコの代わりに、美味しい「大井川の水」をどうぞ！', emotionEffect: 'pulse' },
  'christmas': { weight: 15, keywords: ['クリスマス', 'サンタ', 'メリクリ'], response: 'メリークリスマス！素敵な日になりますように！', emotionEffect: 'glow' },
  'summer_festival': { weight: 15, keywords: ['花火', 'お祭り', '盆踊り', '夏休み'], response: 'お祭りかぁ、いいな！水分補給も忘れずにね！' },
  'easter_egg_1': { weight: 50, keywords: ['大井川最高', '大井川の奇跡'], response: '隠しコマンド受理！大井川の伏流水こそが最大の奇跡なのです。', emotionEffect: 'spin' },
  'hungry': { weight: 7, keywords: ['お腹すいた', 'ごはん'], response: 'ご飯を作る時も水道水が大活躍！美味しいもの食べてね！', emotionEffect: 'bounce' },
  'cooking': { weight: 7, keywords: ['料理', '自炊'], response: '料理するんだ！パスタを茹でる時はたっぷりのお水でね！' },
  'coffee_tea': { weight: 7, keywords: ['コーヒー', 'お茶'], response: '川根茶は有名なんだよ。その水も大井川のお水さ！', emotionEffect: 'glow' },
  'diet': { weight: 7, keywords: ['ダイエット'], response: '水はカロリーゼロ！最強のドリンクだよ！', emotionEffect: 'bounce' },
  'health': { weight: 7, keywords: ['健康', '体調'], response: '水分補給は健康の基本！お大事にね！', emotionEffect: 'pulse' },
  'exercise': { weight: 7, keywords: ['運動'], response: '汗をかいた後はしっかり水分補給してね！', emotionEffect: 'bounce' },
  'study': { weight: 7, keywords: ['勉強'], response: '集中力が落ちたらコップ一杯のお水を飲んでみて！', emotionEffect: 'glow' },
  'pet': { weight: 7, keywords: ['ペット'], response: 'ワンちゃんやネコちゃんにも新鮮なお水が大切だよ！' },
  'music': { weight: 6, keywords: ['音楽'], response: 'カラオケの後は水分補給必須だよ！', emotionEffect: 'spin' },
  'game': { weight: 6, keywords: ['ゲーム'], response: '長時間プレイ中も水分補給を忘れずに！', emotionEffect: 'wiggle' },
  'travel': { weight: 6, keywords: ['旅行'], response: '旅先でも水が飲めるのは日本ならではだよ！' },
  'money_general': { weight: 6, keywords: ['お金'], response: '水道代の節約なら任せて！', emotionEffect: 'bounce' },
  'fashion': { weight: 5, keywords: ['服'], response: '服を大切にすることは、洗濯に使う水を大切にすることだよ！' },
  'sleep': { weight: 7, keywords: ['寝る'], response: '寝る前にコップ一杯の水を飲むといいよ！', emotionEffect: 'pulse' },
  'birthday': { weight: 15, keywords: ['誕生日'], response: 'お誕生日おめでとう！生まれてきてくれてありがとう！', emotionEffect: 'spin' },
  'movie': { weight: 5, keywords: ['映画'], response: 'ポップコーンのお供にはやっぱりお水！' },
  'want_friend': { weight: 8, keywords: ['友達'], response: '私が君の永遠の友達だよ！', emotionEffect: 'glow' },
  'stress': { weight: 8, keywords: ['ストレス'], response: 'お風呂にゆっくり浸かるのが最高だよ！', emotionEffect: 'pulse' },
  'weekend': { weight: 6, keywords: ['週末'], response: '週末はしっかり休んでね！' },
  'morning_routine': { weight: 6, keywords: ['朝活'], response: '起きたらまず一杯の水を飲おう！', emotionEffect: 'bounce' },
  'gardening': { weight: 6, keywords: ['ガーデニング'], response: '植物の水やりには朝がベスト！' },
  'bath': { weight: 7, keywords: ['お風呂'], response: '残り湯を洗濯に使えばエコだよ！', emotionEffect: 'glow' },
  'cleaning': { weight: 6, keywords: ['掃除'], response: '蛇口がピカピカだと気持ちいいよね！' },
  'disaster_prep': { weight: 8, keywords: ['備蓄'], response: '1人1日3リットル×3日分の備えを！', emotionEffect: 'pulse' },
  'poop_water': { weight: 7, keywords: ['トイレ'], response: '最新トイレは節水なんだ！' },
  'complain_service': { weight: 8, keywords: ['不満'], response: 'ごめんね。意見は真摯に受け止めるよ。', emotionEffect: 'shake' },
  'good_water': { weight: 7, keywords: ['美味しい水'], response: '大井川の水は最高にまろやかだよ！', emotionEffect: 'glow' },
  'scary': { weight: 7, keywords: ['怖い'], response: 'ウォーターハンマー現象は怖くないよ！', emotionEffect: 'shake' },
  'ai_talk': { weight: 7, keywords: ['AI'], response: '地域密着型AIの底力をナメないでね！', emotionEffect: 'bounce' },
  'meaning_life': { weight: 6, keywords: ['人生'], response: '流れに身を任せてみるのも悪くないよ。', emotionEffect: 'pulse' },
  'local_shimada': { weight: 8, keywords: ['島田'], response: '蓬莱橋は世界一長い木造歩道橋だよ！', emotionEffect: 'glow' },
  'local_yoshida': { weight: 8, keywords: ['吉田'], response: '小山城の桜はきれいだよ！', emotionEffect: 'bounce' },
  'local_kawane': { weight: 8, keywords: ['川根'], response: '夢の吊り橋は絶景だよね。', emotionEffect: 'glow' },
  'thanks_water': { weight: 9, keywords: ['感謝'], response: '「当たり前」を守るために頑張るよ！', emotionEffect: 'glow' },
};

export const AI_KUN_PERSONALITY: { greetings: string[], random_tips: string[], philosophies: string[], endings: string[] } = {
  greetings: ['ねえねえ、', '実はね、', 'フフフ。', 'やあ！', '水、飲んでる？'],
  random_tips: ['朝一番の水は少し出してね。', '風呂の残り湯は節約の味方！', '体の60%は水だよ！'],
  philosophies: ['水は命の源。', '「当たり前」を支えたい。'],
  endings: ['また何でも聞いてね！', '君の毎日が潤いますように！']
};

// V22 クイズプール (全30問)
export const QUIZ_POOL: { question: string, options: string[], answer: number, explanation: string, category?: string }[] = [
  {
    question: '大井上水道企業団が島田市、吉田町、川根本町の1市2町で設立されたのは西暦何年かな？',
    options: ['1960年', '1970年', '1980年'],
    answer: 1,
    explanation: '1970年（昭和45年）に設立されたんだよ。それまでは「大井上水道組合」という名前だったんだ。'
  },
  {
    question: '歯磨き中に3分間ずっと水を出しっぱなしにすると、どれくらいの水が無駄になるかな？',
    options: ['約6リットル', '約12リットル', '約18リットル'],
    answer: 2,
    explanation: '水道からは1分間に約6リットルの水が出るんだ。3分出しっぱなしにすると、コップ約90杯分の18リットルも無駄になっちゃうよ！'
  },
  {
    question: '人間が1日に飲み水として必要な量は、一般的にどれくらいかな？',
    options: ['500ml', '1.5〜2リットル', '5リットル'],
    answer: 1,
    explanation: '食事以外に、飲み水として1.5〜2リットル程度摂るのが健康に良いとされているよ。'
  },
  {
    question: '水道メーターの有効期限は、法律で何年と決まっているかな？',
    options: ['5年', '8年', '10年'],
    answer: 1,
    explanation: '計量法によって8年と決まっているんだ。期限が来たら、企業団が無料で新しいものに交換しているよ！'
  },
  {
    question: '日本で蛇口の水をそのまま飲める国は、世界全体でいくつくらいあるかな？',
    options: ['5カ国くらい', '15カ国くらい', '100カ国くらい'],
    answer: 1,
    explanation: '実は、水道水がそのまま安心して飲めるのは世界でも15カ国程度しかないんだ。日本の水道技術は世界一と言っても過言じゃないよ！'
  },
  {
    question: '【難問】大井上水道企業団が最近策定した、水道管を地震に強くする計画は何年計画？',
    options: ['5年計画', '10年計画', '15年計画'],
    answer: 2,
    explanation: '2025年に策定した「耐震化計画」では、15年かけて重要な水道管の更新を完了させる目標を立てているんだ。'
  },
  {
    question: '水道代をスマホで支払うとき、使えないのはどれかな？',
    options: ['PayPay', 'LINE Pay', 'クレジットカード'],
    answer: 2,
    explanation: '現在はスマホ決済アプリ（PayPay, d払い等）や口座振替、コンビニ払いには対応しているけど、クレジットカード決済は直接受けていないんだ。'
  },
  {
    question: '水道水が「白い」とき、主な原因は何かな？',
    options: ['石灰が混ざった', '空気が混ざった', '洗剤が混ざった'],
    answer: 1,
    explanation: '蛇口から勢いよく水が出るときに空気が混ざって、細かな気泡になるからだよ。少し待って透明になれば問題なし！'
  },
  {
    question: '大井上水道企業団の主な水源は何かな？',
    options: ['ダムの水', '大井川の伏流水', '雨水'],
    answer: 1,
    explanation: '大井川の地下を流れる「伏流水（ふくりゅうすい）」がメインの水源だよ。自然の砂利でろ過された、すごく綺麗な水なんだ。'
  },
  {
    question: '水道水からプールのにおい（カルキ臭）がするとき、消すのに一番良い方法は？',
    options: ['冷蔵庫で一晩冷やす', '5分ほど沸騰させる', '力一杯振る'],
    answer: 1,
    explanation: '煮沸することで塩素が抜けて、においが気にならなくなるよ。でも塩素がないと雑菌が増えやすいから、早めに飲んでね。'
  },
  {
    question: '成人の体の約何パーセントが水でできているかな？',
    options: ['約40%', '約60%', '約80%'],
    answer: 1,
    explanation: '大人の体の約60%は水んだよ。まさに、人間は水でできていると言ってもいいよね。'
  },
  {
    question: '災害時に備えて、1人あたり1日に最低何リットルの備蓄水が必要と言われている？',
    options: ['1リットル', '3リットル', '10リットル'],
    answer: 1,
    explanation: '飲み水や調理用として、1人1日3リットルを3日分（計9リットル）備蓄しておくのが推奨されているよ。'
  },
  {
    question: '蛇口の「カラン」という呼び方の由来は、どこの国の言葉かな？',
    options: ['ドイツ語', 'オランダ語', 'ポルトガル語'],
    answer: 1,
    explanation: 'オランダ語で「鶴」を意味する「KRAAN（クラーン）」が語源だと言われているよ。形が似てからかな？'
  },
  {
    question: '日本の水道水は一般的に「硬水」かな、それとも「軟水」かな？',
    options: ['硬水', '軟水', '中硬水'],
    answer: 1,
    explanation: '日本の水道水のほとんどは「軟水」だよ。料理に適していて、お茶や出汁の味を引き立ててくれるんだ。'
  },
  {
    question: 'お風呂をシャワーだけで済ませるのと、浴槽に溜めるのでは、どっちが節水？',
    options: ['15分以上使うなら浴槽', '5分以内なら浴槽', '常にシャワー'],
    answer: 0,
    explanation: 'シャワーは15分使うと約180リットル。一般的な浴槽1杯分と同じくらいなんだ。家族が多いなら浴槽に溜めたほうが断然お得だよ。'
  },
  {
    question: 'トイレの「大」と「小」を使い分けるだけで、1年間にどれくらい節約になる？',
    options: ['数百円', '数千円', '数万円'],
    answer: 1,
    explanation: '適切に使い分けるだけで、年間で2,000円〜3,000円程度の節約になることもあるんだよ。'
  },
  {
    question: '冬場に水道管が凍結しやすい温度はマイナス何度以下？',
    options: ['マイナス1度', 'マイナス4度', 'マイナス10度'],
    answer: 1,
    explanation: '一般的にマイナス4度を下回ると凍結リスクが一気に高まるよ。北側の配管や露出しているパイプは注意してね！'
  },
  {
    question: '水道管の凍結を防ぐために、蛇口から出す水の太さはどれくらいがいい？',
    options: ['鉛筆の芯くらい', '割り箸くらい', '小指くらい'],
    answer: 0,
    explanation: '鉛筆の芯くらいの細さで流しっぱなしにしておくだけでも、凍結防止に大きな効果があるんだ。'
  },
  {
    question: 'もし水道管が凍ってしまったとき、やってはいけないことは？',
    options: ['ぬるま湯をかける', '熱湯を直接かける', 'ドライヤーで温める'],
    answer: 1,
    explanation: '熱湯を急にかけると、温度差で配管が破裂することがあるんだ。ぬるま湯をゆっくりかけるか、タオルを巻いて温めるのが正解だよ。'
  },
  {
    question: '「クロスコネクション」とは、水道管と何を直接つなぐことかな？',
    options: ['ガス管', '下水道管', '井戸水などの管'],
    answer: 2,
    explanation: '水道管と井戸水などの他の管を直接つなぐことは法律で禁止されているんだ。汚染された水が水道に逆流する恐れがあって、すごく危険なんだよ！'
  },
  {
    question: '家の中で漏水（水漏れ）しているか確認するには、どこを見ればいい？',
    options: ['請求書', '水道メーターのパイロット', '蛇口の継ぎ目'],
    answer: 1,
    explanation: '家中の蛇口を閉めて、水道メーターの中にあるキラキラ光る「パイロット」が回っていたら、どこかで漏水しているサインだよ！'
  },
  {
    question: '大井上水道企業団の「企業長」はどんな人が務めている？',
    options: ['島田市長', '構成市町の首長から選ばれる', '公募で選ばれる'],
    answer: 1,
    explanation: '島田市長・吉田町長・川根本町の首長の中から選ばれるんだよ。現在は島田市長が務めているね。'
  },
  {
    question: '水道代を計算する「水道料金シミュレーター」はどこにある？',
    options: ['企業団のホームページ', '役場の窓口', '銀行のATM'],
    answer: 0,
    explanation: '大井上水道企業団のウェブサイトにあるよ！自分で計算できるから便利だよ。'
  },
  {
    question: '水道水に「塩素」が含まれている一番の目的は何？',
    options: ['味を美味しくするため', '病原菌などを消毒するため', '管を錆びにくくするため'],
    answer: 1,
    explanation: '皆さんが安心して飲めるように、強力な消毒効果のある塩素を入れているんだ。法律でも、蛇口で一定の塩素が残っている必要があると決まっているよ。'
  },
  {
    question: '水を節約するために、一番多くの水を使っている家事は何かな？',
    options: ['料理', 'お風呂', 'トイレ'],
    answer: 1,
    explanation: '家庭での水使用量は、お風呂が約40%で1位なんだ。続いてトイレ、炊事、洗濯の順だよ。'
  },
  {
    question: '浄水器のフィルターは、長期間交換しないとどうなる？',
    options: ['浄化力が無限に続く', '雑菌の温床になる', '勝手に消滅する'],
    answer: 1,
    explanation: '古いフィルターには汚れや菌が溜まってしまうから、逆効果になることもあるんだ。説明書通りに交換しようね！'
  },
  {
    question: '大井上水道企業団が開栓・閉栓（開始・中止）の手続きを受け付けていないのはいつ？',
    options: ['平日の昼間', '土日祝日や年末年始', '月曜日'],
    answer: 1,
    explanation: '土日祝日は窓口がお休みだから、手続きは平日のうちにお願いしているよ。引っ越しが決まったら早めに連絡してね！'
  },
  {
    question: '大井川にかかる有名な「蓬莱橋」は、何が世界一としてギネス記録に載っている？',
    options: ['世界一高い橋', '世界一長い木造歩道橋', '世界一古い橋'],
    answer: 1,
    explanation: '全長897.4mの木造歩道橋で、「厄なし（8974）」の語呂合わせでも有名だよ。島田市の宝だね！'
  },
  {
    question: 'お米を研ぐとき、一番大事なのはどのお水かな？',
    options: ['最初に入れる水', '最後に入れる水', '研いでいる間の水'],
    answer: 0,
    explanation: '乾いたお米は最初の水を一番よく吸収するんだ。最初だけでも浄水や美味しいお水を使うと、炊きあがりが全く違うよ！'
  },
  {
    question: '大井上水道企業団の職員を名乗る不審な業者が来た！どうすればいい？',
    options: ['とりあえず家に入れる', '言われるままにお金を払う', '身分証の提示を求め、企業団に電話する'],
    answer: 2,
    explanation: '企業団が突然訪問して、浄水器の販売や高額な点検費用を請求することはないよ。怪しいと思ったら 0547-46-4130 へすぐに確認してね！'
  }
];

export const DAILY_TRIVIA: string[] = [
  '朝一番の水は、管の中に一晩溜まっていた水道水だから、バケツ一杯分くらいは洗車や掃除に使うのがおすすめだよ！',
  '大井川の伏流水は、天然のフィルター（砂礫層）を通っているから、もともとすごく綺麗なんだ。',
  '水道管の総延長は、地球を何周もするくらいの長さがあるんだよ。',
  'お風呂の温度を1度下げるだけで、ガス代だけでなく水道代（蒸発分）も少し節約になるんだ。',
  'パスタを茹でるお湯に塩を入れるのは、沸点を上げるためじゃなく、麺に味をつけるためなんだよ。水道代には関係ないけどね！',
  '節水シャワーヘッドに変えるだけで、水道代が最大50%も安くなることがあるんだって。',
  'トイレの「大」と「小」を使い分けるだけで、年間で数千円の節約になることもあるよ！',
  '日本で作られた最初の近代的水道は横浜なんだ。大井川の地域も歴史は深いけどね。',
  '水の密度は4℃のときが最大なんだ。氷が水に浮くのはこの不思議な性質のおかげ。',
  'コーヒーを淹れるときは、沸かし立ての軟水を使うと香りが引き立つよ！'
];

export const FRIENDSHIP_LEVELS = [
  { level: 0, name: '通りすがりの人', emoji: '👣', minVisits: 0, greeting: 'はじめまして！大井上水道企業団のアイ君だよ。' },
  { level: 1, name: '顔見知り', emoji: '👋', minVisits: 3, greeting: 'あっ、また会ったね！今日もよろしく！' },
  { level: 2, name: '水道トモダチ', emoji: '💧', minVisits: 10, greeting: 'いつも来てくれてありがとう！君と話すと心が潤うよ。' },
  { level: 3, name: '親友', emoji: '✨', minVisits: 30, greeting: 'もはや家族同然だね！君のことは何でもわかっちゃうかも？' },
  { level: 4, name: '共生パートナー', emoji: '🌊', minVisits: 100, greeting: '君がいないと私のシステムも干からびちゃうよ。大好きさ！' },
];

export const STREAK_MILESTONES: Record<number, string> = {
  3: '3日連続！素晴らしい継続力だね。',
  7: '1週間連続！君はもう水道マニアの仲間入りだ！',
  30: '1ヶ月連続…！信じられない！君を「名誉企業団員」に任命するよ！',
};
