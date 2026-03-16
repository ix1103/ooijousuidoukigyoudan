"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ExternalLink, Sparkles, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  AI_KUN_KNOWLEDGE_V22, 
  SYNONYMS, 
  AI_KUN_PERSONALITY, 
  AI_KUN_CHATTER,
  KnowledgeItem,
  EmotionContext,
  UIEmotionEffect,
  QUIZ_POOL,
  DAILY_TRIVIA,
  FRIENDSHIP_LEVELS,
  STREAK_MILESTONES
} from '@/constants/knowledge-base-v22';

/**
 * レーベンシュタイン距離を計算する関数（V22: Typo補正用）
 * 2つの文字列がどれだけ似ているかを数値化します。
 */
const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
  for (let j = 0; j <= a.length; j++) { matrix[0][j] = j; }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // 置換
          matrix[i][j - 1] + 1,     // 挿入
          matrix[i - 1][j] + 1      // 削除
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  link?: { title: string; url: string };
  category?: string;
  suggestedTopics?: string[];
  emotionEffect?: UIEmotionEffect;
}

// V22: 感情に基づくUIアニメーション設定
const bubbleAnimationVariants = {
  none: { scale: 1, rotate: 0 },
  shake: { x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.4 } },
  bounce: { y: [0, -8, 0], transition: { duration: 0.4, repeat: 2, repeatType: "reverse" as const } },
  pulse: { scale: [1, 1.05, 1], transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" as const } },
  glow: { boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 15px rgba(0,180,255,0.6)", "0px 0px 0px rgba(0,0,0,0)"], transition: { duration: 1.2, repeat: Infinity } },
  spin: { rotate: [0, 360], transition: { duration: 0.8 } },
  wiggle: { rotate: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } }
};

export const AiKunChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [proactiveMessage, setProactiveMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const proactiveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [favoriteCategory, setFavoriteCategory] = useState<string | null>(null);
  const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);
  const [visitCount, setVisitCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [friendshipLevel, setFriendshipLevel] = useState(FRIENDSHIP_LEVELS[0]);

  // V22: ローカルストレージから過去の傾向（興味のあるカテゴリ）を読み込む
  useEffect(() => {
    try {
      const storedFav = localStorage.getItem('aikun_favorite_category');
      if (storedFav) setFavoriteCategory(storedFav);

      // 訪問トラッキング
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const storedVisits = parseInt(localStorage.getItem('aikun_visit_count') || '0');
      const lastVisitDate = localStorage.getItem('aikun_last_visit') || '';
      const storedStreak = parseInt(localStorage.getItem('aikun_streak') || '0');

      let newVisits = storedVisits;
      let newStreak = storedStreak;

      if (lastVisitDate !== today) {
        // 今日初訪問
        newVisits = storedVisits + 1;
        
        // ストリーク計算（昨日訪問していたら継続、そうでなければリセット）
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastVisitDate === yesterdayStr) {
          newStreak = storedStreak + 1;
        } else {
          newStreak = 1; // リセット
        }

        localStorage.setItem('aikun_visit_count', newVisits.toString());
        localStorage.setItem('aikun_last_visit', today);
        localStorage.setItem('aikun_streak', newStreak.toString());
      }

      setVisitCount(newVisits);
      setStreak(newStreak);

      // 友好度レベル計算
      const level = [...FRIENDSHIP_LEVELS].reverse().find(l => newVisits >= l.minVisits) || FRIENDSHIP_LEVELS[0];
      setFriendshipLevel(level);
    } catch (e) {
      console.error('LocalStorage read error:', e);
    }
  }, []);

  // チャット開始時の初期メッセージ（友好度・日替わり豆知識・ストリーク祈福付き）
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const hour = new Date().getHours();
        let greetingKey = 'greeting_day';
        if (hour >= 5 && hour < 11) greetingKey = 'greeting_morning';
        else if (hour >= 11 && hour < 17) greetingKey = 'greeting_day';
        else if (hour >= 17 && hour < 23) greetingKey = 'greeting_evening';
        else greetingKey = 'greeting_night';

        const greetingData = AI_KUN_CHATTER[greetingKey];
        
        // 友好度に応じた挨拶（配列の場合はランダム選択）
        let baseGreeting = Array.isArray(greetingData.response) 
          ? greetingData.response[Math.floor(Math.random() * greetingData.response.length)] 
          : greetingData.response;
          
        let greeting = baseGreeting;
        if (visitCount > 1) {
          greeting = `${friendshipLevel.greeting}\n${baseGreeting}`;
        }

        // 記憶に基づいたパーソナライズ
        if (favoriteCategory === 'money') greeting += '\n※いつも料金について見てくれてありがとう！今日も節約のお手伝いするよ！';
        else if (favoriteCategory === 'trouble') greeting += '\n※トラブル解決の情報をよく見てくれてるね。何か困ったことがあればすぐ教えてね！';

        // ストリーク祈福
        const streakMsg = STREAK_MILESTONES[streak];
        if (streakMsg) {
          greeting += `\n\n${streakMsg}`;
        } else if (streak >= 2) {
          greeting += `\n\n🔥 ${streak}日連続訪問中！素晴らしい！`;
        }

        // 日替わり豆知識
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        const dailyTrivia = DAILY_TRIVIA[dayOfYear % DAILY_TRIVIA.length];
        greeting += `\n\n【今日の水道豆知識】\n${dailyTrivia}`;

        // 初期提案トピックのランダム化（V22.3）
        const majorTopics = ['料金シミュレーター', '支払い方法', '引っ越し', '漏水・故障', '水質・安全性', 'よくある質問', '電話', 'クイズ', '占い'];
        // シャッフルして2〜3個選ぶ
        const shuffled = [...majorTopics].sort(() => 0.5 - Math.random());
        const randomSuggest = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2個か3個

        addAssistantMessage(greeting, undefined, 'chat', randomSuggest, greetingData.emotionEffect);
      }, 400);
      setProactiveMessage(null);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 600);
    }
  }, [isOpen]);

  // 自律的な話しかけロジック
  useEffect(() => {
    if (!isOpen && !proactiveMessage) {
      proactiveTimerRef.current = setTimeout(() => {
        const tips = AI_KUN_PERSONALITY.random_tips;
        const msg = tips[Math.floor(Math.random() * tips.length)];
        setProactiveMessage(msg);
      }, 15000);
    }
    return () => {
      if (proactiveTimerRef.current) clearTimeout(proactiveTimerRef.current);
    };
  }, [isOpen, proactiveMessage]);

  // プロアクティブメッセージの自動消去
  useEffect(() => {
    if (proactiveMessage) {
      const autoHideTimer = setTimeout(() => {
        setProactiveMessage(null);
      }, 5000);
      return () => clearTimeout(autoHideTimer);
    }
  }, [proactiveMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addAssistantMessage = (content: string, link?: { title: string; url: string }, category?: string, suggestedTopics?: string[], emotionEffect?: UIEmotionEffect) => {
    const newMessage: Message = { id: Date.now().toString(), role: 'assistant', content, link, category, suggestedTopics, emotionEffect };
    setMessages(prev => [...prev, newMessage]);
    
    // カテゴリの記憶（LocalStorage）
    if (category && category !== 'chat' && category !== 'general' && category !== 'quiz_running') {
      try {
        localStorage.setItem('aikun_favorite_category', category);
        setFavoriteCategory(category);
      } catch (e) {
        console.error('LocalStorage write error:', e);
      }
    }
  };

  /**
   * V22 究極検索ロジック
   */
  const handleLogic = (query: string, pastMessages: Message[] = []): { response: string; link?: { title: string; url: string }, category?: string, suggestedTopics?: string[], emotionEffect?: UIEmotionEffect } => {
    
    const normalizeText = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
        .replace(/[\u30a1-\u30f6]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 0x60)) // カタカナ→ひらがな
        .replace(/[ー〜、。！？!?,.\s　]/g, '');
    };

    let normalizedQuery = normalizeText(query);

    // V22.2: シノニム展開（表記ゆれ・同義語の吸収）
    // ユーザーの入力にシノニムが含まれていれば、正規化されたクエリに「代表語」を裏で追加する。
    // これにより「クレカ」と打つだけで「クレジットカード」にもマッチするようになる。
    let expandedQuery = normalizedQuery;
    Object.keys(SYNONYMS).forEach(canonical => {
      SYNONYMS[canonical].forEach(syn => {
        const normSyn = normalizeText(syn);
        if (normSyn.length > 0 && normalizedQuery.includes(normSyn)) {
          expandedQuery += ' ' + normalizeText(canonical);
        }
      });
    });

    // V22.1: ストップワード除去（タイポ補正より先に実行）
    const stopWords = ['について', 'おしえて', 'とはなに', 'とは', 'ってなに', 'しりたい', 'ください', 'どうすれば', 'します', 'ですか', 'ますか', 'どうも'];
    stopWords.forEach(word => {
      expandedQuery = expandedQuery.replace(word, '');
    });
    if (!expandedQuery.trim()) expandedQuery = normalizeText(query); // 全部消えちゃったら元に戻す

    // 意図の推定（漢字も追加してヒット率大幅UP）
    let estimatedIntent: 'money' | 'procedure' | 'trouble' | 'about' | 'faq' | 'general' | 'chat' = 'general';
    let emotion: EmotionContext = 'neutral';
    let urgency: 'high' | 'normal' = 'normal';

    if (/(りょうきん|だいきん|いくら|はらう|ねあげ|しはらい|くれじっと|こうざ|ペイペイ|paypay|料金|代金|支払|引落|口座|クレジットカード)/i.test(expandedQuery)) estimatedIntent = 'money';
    else if (/(ひっこし|てつづき|かいし|ちゅうし|めいぎ|しんせい|かえる|あける|とめる|だうんろーど|引越|手続|開始|中止|名義|申請)/i.test(expandedQuery)) estimatedIntent = 'procedure';
    else if (/(もれる|ろうすい|こわれる|しゅうり|とまる|でない|だんすい|さぎ|どろぼう|あやしい|とうけつ|にごる|あかみず|しろい|漏水|水漏|修理|故障|断水|水出ない|凍結|詐欺|濁)/i.test(expandedQuery)) estimatedIntent = 'trouble';
    else if (/(どこ|でんわ|じかん|えいぎょう|やすみ|きぎょうだん|ばしょ|電話|時間|営業|企業団|場所)/i.test(expandedQuery)) estimatedIntent = 'about';

    // 文脈（Context）理解
    let contextCategory = '';
    if (pastMessages.length > 0) {
      for (let i = pastMessages.length - 1; i >= 0; i--) {
        if (pastMessages[i].role === 'assistant' && pastMessages[i].category) {
          contextCategory = pastMessages[i].category as string;
          break;
        }
      }
    }

    // クイズ回答判定（QUIZ_POOLベース）
    if (contextCategory === 'quiz_running' && currentQuizId) {
      const quiz = QUIZ_POOL.find(q => q.question === currentQuizId);
      if (quiz) {
        let userAnswer = -1;
        if (/(1|１)/.test(query)) userAnswer = 0;
        else if (/(2|２)/.test(query)) userAnswer = 1;
        else if (/(3|３)/.test(query)) userAnswer = 2;

        if (userAnswer === quiz.answer) {
          setCurrentQuizId(null);
          return { 
            response: `大正解！🎉\n${quiz.explanation}`, 
            category: 'chat',
            suggestedTopics: ['次のクイズ', '違うクイズだして'],
            emotionEffect: 'bounce'
          };
        } else {
          setCurrentQuizId(null);
          return {
            response: `ざんねん…！ハズレだよ。\n正解は【${quiz.answer + 1}】番でした！\n${quiz.explanation}\n次は頑張って！`,
            category: 'chat',
            suggestedTopics: ['もう一回クイズ！', '次のクイズ'],
            emotionEffect: 'shake'
          };
        }
      }
    }

    // 感情・緊急度推論
    if (/(こわい|ふあん|たすけて|パニック|あせる)/.test(normalizeText(query))) emotion = 'anxious';
    else if (/(くるしい|かなしい|つらい|なみだ|ぴえん|おちこむ)/.test(normalizeText(query))) emotion = 'sad';
    else if (/(むかつく|いらいら|はらたつ|さいあく)/.test(normalizeText(query))) emotion = 'angry';
    else if (/(うれしい|たのしい|はっぴー|わーい)/.test(normalizeText(query))) emotion = 'happy';

    if (estimatedIntent === 'trouble' && (emotion === 'anxious' || /(よる|きゅう|いま|すぐ|夜|急|今|直ぐ)/.test(expandedQuery))) {
      urgency = 'high';
    }

    // ── 雑談チェック（精度重視のマッチング） ──
    let bestChatKey: string | null = null;
    let maxChatScore = 0;
    for (const [key, chat] of Object.entries(AI_KUN_CHATTER)) {
      // weight:0 のグリーティングはここではスキップ（専用ルーティング用）
      if (chat.weight === 0) continue;
      
      let chatScore = 0;
      let matchedKeywordsCount = 0;

      chat.keywords.forEach(kw => {
        const normKw = normalizeText(kw);
        if (normKw.length > 0 && expandedQuery.includes(normKw)) {
          chatScore += chat.weight * (1 + normKw.length * 0.3);
          matchedKeywordsCount++;
        }
      });
      
      // 複数キーワードボーナス
      if (matchedKeywordsCount >= 3) chatScore *= 1.5;
      else if (matchedKeywordsCount >= 2) chatScore *= 1.2;

      if (chatScore > maxChatScore) {
        maxChatScore = chatScore;
        bestChatKey = key;
      }
    }

    // しきい値: 短いキーワード（2文字）× weight5 × (1+0.6) = 8.0
    // 確実にマッチした場合のみ発火するようにする
    if (bestChatKey && maxChatScore >= 5.0) {
      // クイズ発火
      if (bestChatKey === 'quiz_start') {
        const randomQuiz = QUIZ_POOL[Math.floor(Math.random() * QUIZ_POOL.length)];
        setCurrentQuizId(randomQuiz.question);
        const questionText = `それじゃあ、アイ君のクイズ！デデン！\n\nQ. ${randomQuiz.question}\n\n【1】${randomQuiz.options[0]}\n【2】${randomQuiz.options[1]}\n【3】${randomQuiz.options[2]}\n\n番号で答えてね！`;
        return {
          response: questionText,
          category: 'quiz_running',
          suggestedTopics: ['1', '2', '3'],
          emotionEffect: 'bounce'
        };
      }
      // 占い発火（ランダム結果）
      if (bestChatKey === 'fortune_good') {
        const fortunes = [
          { result: '【🌟大吉（湧水レベル）🌟】', message: '今日のラッキーアクションは「朝一番のうがい」。淀みない川のように、素晴らしい一日になるはずさ！', effect: 'glow' as UIEmotionEffect },
          { result: '【✨吉（清流レベル）✨】', message: '今日のラッキーアイテムは「マイボトル」。水を持ち歩けば運気もアップ！お出かけ先でもリフレッシュできるよ。', effect: 'bounce' as UIEmotionEffect },
          { result: '【💧中吉（せせらぎレベル）💧】', message: '今日のラッキーカラーは「水色」。穏やかな一日になりそう。午後にお茶を一杯飲むと、さらに運気が上がるかも！', effect: 'pulse' as UIEmotionEffect },
          { result: '【🌊小吉（雨上がりレベル）🌊】', message: '今日は少し波がある日かも。でも大丈夫、雨の後にはきっと虹が出る！冷たいお水を飲んで気分転換しよう。', effect: 'wiggle' as UIEmotionEffect },
          { result: '【⛈末吉（にわか雨レベル）⛈】', message: '今日はちょっぴりツイてない日かも…？でも末吉は「未来は良くなる」という意味もあるんだ。お風呂にゆっくり浸かって明日に備えよう！', effect: 'shake' as UIEmotionEffect },
        ];
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        return {
          response: `アイ君の【水みくじ】！\nシャカシャカシャカ……ポンッ！\n\n${fortune.result}\n${fortune.message}`,
          category: 'chat',
          suggestedTopics: ['もう一回占い！', 'クイズ'],
          emotionEffect: fortune.effect
        };
      }
      const chatData = AI_KUN_CHATTER[bestChatKey];
      const chatResponse = Array.isArray(chatData.response) 
        ? chatData.response[Math.floor(Math.random() * chatData.response.length)] 
        : chatData.response;

      return { 
        response: chatResponse, 
        category: 'chat', 
        suggestedTopics: chatData.suggest,
        emotionEffect: chatData.emotionEffect
      };
    }

    const knowledgeCandidates: { item: KnowledgeItem, score: number }[] = [];

    AI_KUN_KNOWLEDGE_V22.forEach(item => {
      let score = 0;
      let matchedKeywordsCount = 0;

      if (item.category === estimatedIntent) score += 15;
      // 文脈ボーナス
      if (contextCategory === item.category) score += 10;
      
      if (item.phrases) {
        item.phrases.forEach(phrase => {
          const normalizedPhrase = normalizeText(phrase);
          if (normalizedQuery === normalizedPhrase || expandedQuery === normalizedPhrase) score += 150;
        });
      }

      item.keywords.forEach(kw => {
        const normKw = normalizeText(kw.word);
        if (expandedQuery.includes(normKw)) {
          score += kw.weight * (1 + normKw.length * 0.4);
          matchedKeywordsCount++;
        }
      });

      // 複数キーワードボーナス
      if (matchedKeywordsCount >= 3) score *= 1.5;
      else if (matchedKeywordsCount >= 2) score *= 1.2;

      if (score > 3.5) {
        knowledgeCandidates.push({ item, score });
      }
    });

    // スコア順にソート
    knowledgeCandidates.sort((a, b) => b.score - a.score);

    // ── 曖昧性解消（聞き返し）ロジック ──
    // 1位と2位のスコアが近く、かつどちらも一定基準以上のスコアの場合
    if (knowledgeCandidates.length >= 2) {
      const first = knowledgeCandidates[0];
      const second = knowledgeCandidates[1];
      
      // スコア差が15%以内の場合は聞き返す
      if (first.score < second.score * 1.15 && first.score < 200) {
        return {
          response: `「${first.item.title}」と「${second.item.title}」、どちらについて知りたいかな？\n近いキーワードがいくつかあって迷っちゃった！`,
          category: 'general',
          suggestedTopics: [first.item.title, second.item.title],
          emotionEffect: 'wiggle'
        };
      }
    }

    if (knowledgeCandidates.length > 0) {
      const item = knowledgeCandidates[0].item;
      const endings = AI_KUN_PERSONALITY.endings;
      const ending = endings[Math.floor(Math.random() * endings.length)];

      let empathy = item.empathy ? `${item.empathy}\n\n` : '';
      if (urgency === 'high' && item.category === 'trouble') {
          empathy = `【緊急】大変！水漏れや故障はパニックになるよね。落ち着いて聞いてね。\n\n`;
      }

      let content = item.content;
      if (content.endsWith('。')) content = content.slice(0, -1);
      
      let suggestedTopics: string[] | undefined;
      if (item.category === 'money') suggestedTopics = ['料金シミュレーター', '支払い方法', '名義変更'];
      else if (item.category === 'procedure') suggestedTopics = ['申請書のダウンロード', '使用開始の手続き'];
      else if (item.category === 'trouble') suggestedTopics = ['指定工事店の一覧', '凍結防止対策'];

      return { 
        response: `${empathy}「${item.title}」についてだね。${content}${ending}`,
        link: item.url ? { title: item.title, url: item.url } : undefined,
        category: item.category,
        suggestedTopics,
        emotionEffect: item.emotionEffect
      };
    }

    // フォールバック応答（多様化）
    const fallbackResponses = [
      `ごめんね、「${query}」については分からなかったよ。料金・手続き・トラブルなど、具体的な言葉で聞いてみてね！`,
      `うーん、「${query}」かぁ。ちょっと難しい質問だね。「水道料金」「引越し」「水漏れ」みたいなキーワードで聞いてくれると答えやすいよ！`,
      `「${query}」…ちょっと私には荷が重いかも。でも水道のことなら任せて！「料金」「手続き」「故障」で聞いてみてね。`,
      `ごめんね、よく分からなかったよ。私は水道の専門家だから、水に関することなら得意なんだけどなぁ。もう少し具体的に教えてくれると嬉しいな！`,
      `むむむ…「${query}」は私のデータベースにないみたい。でも「クイズ」や「占い」で遊ぶこともできるよ！試してみて。`,
    ];
    const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    const philosophies = AI_KUN_PERSONALITY.philosophies;
    const philosophy = philosophies[Math.floor(Math.random() * philosophies.length)];
    return { 
      response: `${fallback}\n\nちなみに…「${philosophy}」`,
      category: 'general',
      suggestedTopics: ['料金表を見たい', '引っ越しの手続き', 'クイズ', '占い']
    };
  };

  const handleQuickSend = (text: string) => {
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(currentMessages => {
        const { response, link, category, suggestedTopics, emotionEffect } = handleLogic(text, currentMessages);
        setIsTyping(false);
        const assistantMsg: Message = { id: Date.now().toString(), role: 'assistant', content: response, link, category, suggestedTopics, emotionEffect };
        return [...currentMessages, assistantMsg];
      });
    }, 800);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue('');
    handleQuickSend(text);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] font-sans flex flex-col items-end">
      
      <AnimatePresence>
        {!isOpen && proactiveMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="mb-8 bg-white p-4 rounded-2xl shadow-2xl border border-primary-light/20 text-sm font-bold text-primary-deep cursor-pointer relative max-w-[200px] mr-2"
          >
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-primary-light/20" />
            <div className="flex items-start gap-2">
              <Sparkles size={16} className="text-secondary-vibrant shrink-0 mt-0.5 animate-pulse" />
              <span>{proactiveMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            className="mb-4 w-[90vw] sm:w-[400px] h-[70vh] sm:h-[600px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex-col flex origin-bottom-right"
          >
            {/* ヘッダー */}
            <div className="bg-primary-main p-5 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-white/20">
                  <Image src="/aikun.png" alt="アイ君" fill className="object-contain p-1 scale-110" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-xl">アイ君</h3>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-black">v22.1</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] opacity-90 font-bold">{friendshipLevel.emoji} {friendshipLevel.name}</span>
                    {streak >= 2 && <span className="text-[10px] opacity-90 font-bold">🔥{streak}日</span>}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1.5 bg-white/10 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* チャットエリア */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <motion.div 
                    variants={bubbleAnimationVariants}
                    animate={m.emotionEffect || "none"}
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                      m.role === 'user' ? 'bg-primary-main text-white rounded-tr-none' : 'bg-white text-primary-deep rounded-tl-none border border-slate-100'
                    }`}
                  >
                    {m.content}
                  </motion.div>
                  {m.link && (
                    <Link href={m.link.url} className="mt-2 flex items-center gap-2 bg-secondary-vibrant text-primary-deep px-4 py-2 rounded-xl text-xs font-black shadow-sm transition-transform hover:scale-105">
                      <ExternalLink size={14} />
                      {m.link.title}を見る
                    </Link>
                  )}
                  {m.suggestedTopics && m.suggestedTopics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.suggestedTopics.map(topic => (
                        <button key={topic} onClick={() => handleQuickSend(topic)} className="text-[12px] font-bold bg-white text-primary-deep border border-primary-light/30 px-3 py-1.5 rounded-full shadow-sm hover:bg-primary-light/10 transition-colors">
                          👉 {topic} 
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.span key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay }} className="w-2 h-2 bg-primary-main/30 rounded-full" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 入力エリア */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                  placeholder="メッセージを入力..."
                  className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary-main/20 outline-none transition-all"
                />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={!inputValue.trim() || isTyping} className="bg-primary-main text-white p-3.5 rounded-xl disabled:opacity-50">
                  <Send size={18} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-white rounded-full shadow-2xl border-2 border-primary-main/20 flex items-center justify-center overflow-hidden"
      >
        <div className="w-14 h-14 relative overflow-hidden rounded-full">
          <Image src="/aikun.png" alt="アイ君" fill className="object-contain scale-125" />
        </div>
      </motion.button>
    </div>
  );
};
