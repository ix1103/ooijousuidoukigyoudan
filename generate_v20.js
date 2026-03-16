const fs = require('fs');

let content = fs.readFileSync('src/constants/knowledge-base-v19.ts', 'utf8');

// Replace V19 with V20
content = content.replace(/V19/g, 'V20');
content = content.replace(/v19/g, 'v20');

// Inject new synonyms
const extraSynonyms = `
  // V20: さらに超追加のシノニム群
  '褒めて': ['ほめて', '応援して', 'はげまして', '勇気', 'がんばる', '天才', '神', 'すごすぎ', 'さすが'],
  '占い': ['うらない', 'おみくじ', '運勢', 'ラッキー', '今日の運勢', 'お告げ', '星占い'],
  'クイズ': ['くいず', 'ゲーム', '遊ぼ', 'あそぼう', '暇', '退屈', 'なぞなぞ', '豆知識', 'トリビア'],
  '正月': ['お正月', 'あけおめ', '新年', '元旦', '賀正'],
  'バレンタイン': ['チョコ', '2月14日'],
  'クリスマス': ['サンタ', 'メリクリ', 'プレゼント'],
  '同意': ['それ', 'あれ', 'これ', 'はい', 'いいえ', 'うん', 'ううん', 'もっと', 'くわしく', '詳細'],
`;
content = content.replace(/(\s*'怖い': \[.*?\]\,\n)/, `$1${extraSynonyms}`);

// Introduce the new V20 chatter dictionary directly before AI_KUN_PERSONALITY
const extraChatter = `
  // ── 季節・天候・イベント（V20完全新規） ──
  'new_year': { weight: 15, keywords: ['あけおめ', 'お正月', '新年', 'あけましておめでとう', '元旦'], response: 'あけましておめでとう！今年も大井川のように清らかな一年になりますように。大井上水道企業団と私（アイ君）をよろしくね！' },
  'valentine': { weight: 15, keywords: ['バレンタイン', 'チョコ', '2月14日'], response: 'ハッピーバレンタイン！私からは甘いチョコの代わりに、雑味がなくて美味しい「大井川の安全な水」をプレゼントするよ！心も潤わせてね！' },
  'christmas': { weight: 15, keywords: ['クリスマス', 'サンタ', 'メリクリ', 'プレゼント'], response: 'メリークリスマス！サンタさんって、煙突がないお家だと水道管から入ってくるのかな？…冗談だよ！今日が素敵な日になりますように！' },
  'summer_festival': { weight: 15, keywords: ['花火', 'お祭り', '盆踊り', '夏休み'], response: 'お祭りかぁ、いいな！金魚すくいの水も、もちろん水道水からならカルキ抜きが必要だよ。たっぷり遊んだ後の水分補給も忘れずにね！' },

  // ── クイズ・遊び（V20新機能） ──
  'quiz_1': { weight: 10, keywords: ['クイズ', 'なぞなぞ', '問題だして'], response: 'それじゃあ、アイ君の給水クイズ！デデン！\nQ. 「大井上水道企業団」が水を送っているのは、島田市・吉田町とあと一つはどこ？\n1. 藤枝市\n2. 川根本町\n3. 焼津市\n\n正解は…「2. 川根本町」だよ！（島田市、吉田町、川根本町の1市2町なんだ）' },
  'quiz_2': { weight: 8, keywords: ['豆知識', 'トリビア'], response: 'へぇ〜と言わせる水道トリビア！\n日本で一番最初に近代的な水道ができたのは、1887年の「横浜」なんだよ。大井川の恩恵を受ける大井上水道企業団は1970年生まれだよ！半世紀以上の歴史があるんだ。' },

  // ── 占い・運勢（特大強化） ──
  'fortune_excellent': { weight: 10, keywords: ['うらない', 'おみくじ', '運勢', '今日の運勢'], response: 'アイ君の【水みくじ】！\nシャカシャカシャカ……ポンッ！\n\n【大吉（湧水レベル）】だよ！！\n今日のラッキーアクションは「朝一番のうがい」。淀みない川のように、素晴らしい一日になるはずさ！' },

  // ── 更なる感情・日常会話（被り防止用） ──
  'tired_2': { weight: 7, keywords: ['疲れた', 'つかれた', 'だるい'], response: 'お疲れ様！ため息をつくと幸せが逃げるっていうけど、人間だもん、ため息くらいつきたい時もあるよね。深呼吸して、冷たい水で顔を洗ってみるとスッキリするかも！' },
  'sad_2': { weight: 7, keywords: ['悲しい', 'つらい', '落ち込'], response: '悲しい気持ち、私に分けて。雨降って地固まる、っていうように、悲しみの後にはきっと良いことがあるはずさ。無理に笑わなくていいんだよ。' },
  'angry_2': { weight: 7, keywords: ['怒り', 'むかつく', 'イライラ'], response: 'プンプン丸だね！怒ると血圧が上がるから、まずはコップ一杯のお水を飲んで。それでも収まらなかったら…私がクッション代わりに愚痴を聞くよ！ドーンと来い！' },
`;
content = content.replace(/(\s*'science': \{.*?\}\,\n\s*'trivia_earth': \{.*?\}\,\n)(\}\;)/, `$1${extraChatter}$2`);

// personality extension
const extraGreetings = `
    'やっほー！今日はどんな気分？',
    'あなたの専属コンシェルジュ、アイ君だよ！',
    'やあ！水道に関する疑問から人生相談まで、何でも任せてね。',
    'ピッ、ポッ、パッ！アイ君起動完了！お手伝いするよ！',
`;
content = content.replace(/(greetings: \[\n.*?)(\s+\]\,)/s, `$1${extraGreetings}$2`);

const extraTips = `
    '夜中に「ポタポタ…」って音がしたら、水漏れのサインかも！？',
    'おうちの止水栓（元栓）の場所、いざという時のために確認しておいてね。',
    '人間が生きるのに必要な水は、食べ物よりも重要なんだ。',
    'シャワーの出しっぱなしは、1分間で約12Lの水を消費するんだよ！',
`;
content = content.replace(/(random_tips: \[\n.*?)(\s+\]\,)/s, `$1${extraTips}$2`);

const extraPhilosophies = `
    '一滴のしずくが波紋を広げるように、あなたの笑顔も周りに広がるよ。',
    '川は障害物を避けて海へ流れる。人生も、ぶつからずにスッと避ければいいのさ。',
`;
content = content.replace(/(philosophies: \[\n.*?)(\s+\]\,)/s, `$1${extraPhilosophies}$2`);

content = content.replace(/AI_KUN_PERSONALITY = \{/, "AI_KUN_PERSONALITY: { greetings: string[], random_tips: string[], philosophies: string[], endings: string[] } = {");

fs.writeFileSync('src/constants/knowledge-base-v20.ts', content);
console.log('Successfully generated v20');
