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
  QUIZ_POOL
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

  // V22: ローカルストレージから過去の傾向（興味のあるカテゴリ）を読み込む
  useEffect(() => {
    try {
      const storedFav = localStorage.getItem('aikun_favorite_category');
      if (storedFav) setFavoriteCategory(storedFav);
    } catch (e) {
      console.error('LocalStorage read error:', e);
    }
  }, []);

  // チャット開始時の初期メッセージ
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
        
        // 記憶に基づいたパーソナライズ前置き
        let introParams = "";
        if (favoriteCategory === 'money') introParams = "\n※いつも料金について見てくれてありがとう！今日も節約のお手伝いするよ！";
        else if (favoriteCategory === 'trouble') introParams = "\n※トラブル解決の情報をよく見てくれてるね。何か困ったことがあればすぐ教えてね！";

        addAssistantMessage(greetingData.response + introParams, undefined, 'chat', greetingData.suggest, greetingData.emotionEffect);
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

    // V22: Typo補正（レーベンシュタイン距離）
    const applyTypoCorrection = (text: string) => {
      let correctedText = text;
      Object.keys(SYNONYMS).forEach(canonical => {
        [canonical, ...SYNONYMS[canonical]].forEach(kw => {
           const normKw = normalizeText(kw);
           if (normKw.length >= 3) {
             const dist = levenshteinDistance(text, normKw);
             if (dist === 1 || (normKw.length >= 5 && dist <= 2)) {
               correctedText = normKw;
             }
           }
        });
      });
      return correctedText;
    };
    
    normalizedQuery = applyTypoCorrection(normalizedQuery);

    const stopWords = ['について', 'おしえて', 'とはなに', 'とは', 'ってなに', 'しりたい', 'ください', 'どうすれば', 'します', 'ですか', 'ますか', 'こんにちは', 'どうも'];
    stopWords.forEach(word => {
      normalizedQuery = normalizedQuery.replace(word, '');
    });

    if (!normalizedQuery) normalizedQuery = normalizeText(query);

    // 意図の推定
    let estimatedIntent: 'money' | 'procedure' | 'trouble' | 'about' | 'faq' | 'general' | 'chat' = 'general';
    let emotion: EmotionContext = 'neutral';
    let urgency: 'high' | 'normal' = 'normal';

    if (/(りょうきん|だいきん|いくら|はらう|ねあげ|しはらい|くれじっと|こうざ|ペイペイ|paypay)/i.test(normalizedQuery)) estimatedIntent = 'money';
    else if (/(ひっこし|てつづき|かいし|ちゅうし|めいぎ|しんせい|かえる|あける|とめる|だうんろーど)/i.test(normalizedQuery)) estimatedIntent = 'procedure';
    else if (/(もれる|ろうすい|こわれる|しゅうり|とまる|でない|だんすい|さぎ|どろぼう|あやしい|とうけつ|にごる|あかみず|しろい)/i.test(normalizedQuery)) estimatedIntent = 'trouble';
    else if (/(どこ|でんわ|じかん|えいぎょう|やすみ|きぎょうだん|ばしょ)/i.test(normalizedQuery)) estimatedIntent = 'about';

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
      const quiz = QUIZ_POOL.find(q => q.id === currentQuizId);
      if (quiz) {
        // ユーザーの回答を番号で判定（1,2,3 or １,２,３）
        let userAnswer = -1;
        if (/(1|１)/.test(query)) userAnswer = 0;
        else if (/(2|２)/.test(query)) userAnswer = 1;
        else if (/(3|３)/.test(query)) userAnswer = 2;

        if (userAnswer === quiz.correctIndex) {
          setCurrentQuizId(null);
          return { 
            response: `大正解！🎉\n${quiz.correctExplanation}`, 
            category: 'chat',
            suggestedTopics: ['次のクイズ', '違うクイズだして'],
            emotionEffect: 'bounce'
          };
        } else {
          setCurrentQuizId(null);
          return {
            response: `ざんねん…！ハズレだよ。\n${quiz.wrongExplanation}\n次は頑張って！`,
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

    if (estimatedIntent === 'trouble' && (emotion === 'anxious' || /(よる|きゅう|いま|すぐ)/.test(normalizedQuery))) {
      urgency = 'high';
    }

    // 雑談チェック
    let bestChatKey = null;
    let maxChatScore = 0;
    for (const [key, chat] of Object.entries(AI_KUN_CHATTER)) {
      let chatScore = 0;
      chat.keywords.forEach(kw => {
        const normKw = normalizeText(kw);
        if (normalizedQuery.includes(normKw)) chatScore += chat.weight * (1 + normKw.length * 0.25);
      });
      if (chatScore > maxChatScore) {
        maxChatScore = chatScore;
        bestChatKey = key;
      }
    }

    if (bestChatKey && maxChatScore >= 4.0) {
      // クイズ発火時はQUIZ_POOLからランダムに出題
      if (bestChatKey === 'quiz_start') {
        const randomQuiz = QUIZ_POOL[Math.floor(Math.random() * QUIZ_POOL.length)];
        setCurrentQuizId(randomQuiz.id);
        const questionText = `それじゃあ、アイ君のクイズ！デデン！\n\nQ. ${randomQuiz.question}\n\n【1】${randomQuiz.choices[0]}\n【2】${randomQuiz.choices[1]}\n【3】${randomQuiz.choices[2]}\n\n番号で答えてね！`;
        return {
          response: questionText,
          category: 'quiz_running',
          suggestedTopics: ['1', '2', '3'],
          emotionEffect: 'bounce'
        };
      }
      return { 
        response: AI_KUN_CHATTER[bestChatKey].response, 
        category: 'chat', 
        suggestedTopics: AI_KUN_CHATTER[bestChatKey].suggest,
        emotionEffect: AI_KUN_CHATTER[bestChatKey].emotionEffect
      };
    }

    // 実務知識検索
    let bestItem: KnowledgeItem | null = null;
    let maxScore = 0;

    AI_KUN_KNOWLEDGE_V22.forEach(item => {
      let score = 0;
      if (item.category === estimatedIntent) score += 15;
      
      if (item.phrases) {
        item.phrases.forEach(phrase => {
          const normalizedPhrase = normalizeText(phrase);
          if (normalizedQuery === normalizedPhrase) score += 200;
          else if (normalizedPhrase.includes(normalizedQuery) || normalizedQuery.includes(normalizedPhrase)) score += 50;
        });
      }

      item.keywords.forEach(kw => {
        const normKw = normalizeText(kw.word);
        if (normalizedQuery.includes(normKw)) {
          score += kw.weight * (1 + normKw.length * 0.4);
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestItem = item;
      }
    });

    if (bestItem && maxScore >= 3.5) {
      const item = bestItem as KnowledgeItem;
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

    const philosophies = AI_KUN_PERSONALITY.philosophies;
    const philosophy = philosophies[Math.floor(Math.random() * philosophies.length)];
    return { 
      response: `ごめんね、「${query}」については分からなかったよ。\nでも、こんな言葉を贈るね。「${philosophy}」\n料金・手続き・トラブルなど、具体的な単語で聞いてみてね！`,
      category: 'general'
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
                    <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-black">v22</span>
                  </div>
                  <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Ai-kun Chatbot Agent</p>
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
