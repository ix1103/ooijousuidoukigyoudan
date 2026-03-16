"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ExternalLink, Sparkles, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  AI_KUN_KNOWLEDGE_V18, 
  SYNONYMS, 
  AI_KUN_PERSONALITY, 
  AI_KUN_CHATTER,
  KnowledgeItem 
} from '@/constants/knowledge-base-v18';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  link?: { title: string; url: string };
}

export const AiKunChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [proactiveMessage, setProactiveMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const proactiveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // チャットを開いたときの初期挨拶
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const greetings = AI_KUN_PERSONALITY.greetings;
        addAssistantMessage(greetings[Math.floor(Math.random() * greetings.length)] + " どんなことでも気軽に話しかけてね！");
      }, 400);
      setProactiveMessage(null);
    }
    // チャットを開いたらキーボードフォーカス（モバイル対応）
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

  // 吹き出しを2秒後に自動消去
  useEffect(() => {
    if (proactiveMessage) {
      const autoHideTimer = setTimeout(() => {
        setProactiveMessage(null);
      }, 2000);
      return () => clearTimeout(autoHideTimer);
    }
  }, [proactiveMessage]);

  // メッセージ追加のたびに下へスクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addAssistantMessage = (content: string, link?: { title: string; url: string }) => {
    const newMessage: Message = { id: Date.now().toString(), role: 'assistant', content, link };
    setMessages(prev => [...prev, newMessage]);
  };

  /**
   * V18 極限精度検索エンジン
   * - ストップワード除去
   * - 完全な表記ゆれ吸収（カタカナ→ひらがな、長音符削除）
   * - 意図（Intent）カテゴリによる特大ボーナス
   * - 文字数による動的スコアリング
   */
  const handleLogic = (query: string): { response: string; link?: { title: string; url: string } } => {
    // 1. ノイズ（ストップワード）の除去と正規化の極限進化
    // カタカナをひらがなに変換、全角英数を半角に、長音符（ー）や空白・記号を完全に削除
    const normalizeText = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
        .replace(/[\u30a1-\u30f6]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 0x60)) // カタカナ→ひらがな
        .replace(/[ー〜、。！？!?,.\s　]/g, '');
    };

    let normalizedQuery = normalizeText(query);
    const stopWords = ['について', 'おしえて', 'とはなに', 'とは', 'ってなに', 'しりたい', 'ください', 'どうすれば', 'します', 'ですか', 'ますか', 'こんにちは', 'どうも'];
    stopWords.forEach(word => {
      normalizedQuery = normalizedQuery.replace(word, '');
    });

    if (!normalizedQuery) normalizedQuery = normalizeText(query); // 全部消えちゃった場合のフェイルセーフ

    // 2. 意図（Intent）の推定
    let estimatedIntent: 'money' | 'procedure' | 'trouble' | 'about' | 'faq' | 'general' = 'general';
    if (/(りょうきん|だいきん|いくら|はらう|ねあげ|しはらい|くれじっと|こうざ|ペイペイ|paypay)/i.test(normalizedQuery)) estimatedIntent = 'money';
    else if (/(ひっこし|てつづき|かいし|ちゅうし|めいぎ|しんせい|かえる|あける|とめる|だうんろーど)/i.test(normalizedQuery)) estimatedIntent = 'procedure';
    else if (/(もれる|ろうすい|こわれる|しゅうり|とまる|でない|だんすい|さぎ|どろぼう|あやしい|とうけつ|にごる|あかみず|しろい)/i.test(normalizedQuery)) estimatedIntent = 'trouble';
    else if (/(どこ|でんわ|じかん|えいぎょう|やすみ|きぎょうだん|ばしょ)/i.test(normalizedQuery)) estimatedIntent = 'about';

    // 3. 雑談・雑学チェック（優先）
    let bestChatKey = null;
    let maxChatScore = 0;
    for (const [key, chat] of Object.entries(AI_KUN_CHATTER)) {
      let chatScore = 0;
      chat.keywords.forEach(kw => {
        const normKw = normalizeText(kw);
        // キーワード文字数による動的重み付け（長いほどボーナス）
        if (normalizedQuery.includes(normKw)) chatScore += chat.weight * (1 + normKw.length * 0.2);
      });
      if (chatScore > maxChatScore) {
        maxChatScore = chatScore;
        bestChatKey = key;
      }
    }

    if (bestChatKey && maxChatScore >= 3.5) {
      return { response: AI_KUN_CHATTER[bestChatKey].response };
    }

    // 4. 実務知識検索（V18ロジック）
    let bestItem: KnowledgeItem | null = null;
    let maxScore = 0;

    AI_KUN_KNOWLEDGE_V18.forEach(item => {
      let score = 0;
      let hitCount = 0;

      // A. 意図（Intent）マッチングボーナス
      if (item.category === estimatedIntent) {
        score += 15; // カテゴリが合致したら基礎点アップ
      } else if (estimatedIntent !== 'general') {
        score -= 5; // カテゴリが外れたらペナルティ（誤爆防止）
      }

      // B. フレーズマッチング（Q&A想定質問）
      if (item.phrases) {
        item.phrases.forEach(phrase => {
          const normalizedPhrase = normalizeText(phrase);
          if (normalizedPhrase.includes(normalizedQuery) || normalizedQuery.includes(normalizedPhrase)) {
            // クエリが長いほど特大ボーナス
            score += 50 + (normalizedQuery.length * 2); 
            hitCount++;
          }
        });
      }

      // C. キーワード＆シノニムマッチング
      item.keywords.forEach(kw => {
        let keywordHit = false;
        const normKw = normalizeText(kw.word);
        
        // 文字数による動的重み付け
        const lengthMultiplier = 1 + (normKw.length * 0.3);

        if (normalizedQuery.includes(normKw)) {
          score += kw.weight * lengthMultiplier;
          keywordHit = true;
        }
        (SYNONYMS[kw.word] || []).forEach(syn => {
          const normSyn = normalizeText(syn);
          if (normalizedQuery.includes(normSyn)) {
            score += kw.weight * lengthMultiplier * 0.95;
            keywordHit = true;
          }
        });
        if (keywordHit) hitCount++;
      });
      
      // D. タイトルマッチング
      const normTitle = normalizeText(item.title);
      if (normalizedQuery.includes(normTitle) || normTitle.includes(normalizedQuery)) {
        score += 25;
        hitCount++;
      }

      // E. 複数ヒットボーナス（AND検索）
      if (hitCount >= 2) score += 15;
      if (hitCount >= 3) score += 30;
      
      if (score > maxScore) {
        maxScore = score;
        bestItem = item;
      }
    });

    // スコア閾値チェック（V18はペナルティもあるため閾値を少し高めに）
    if (bestItem && maxScore >= 8) {
      const item = bestItem as KnowledgeItem;
      const endings = AI_KUN_PERSONALITY.endings;
      const ending = endings[Math.floor(Math.random() * endings.length)];
      const empathy = item.empathy ? `${item.empathy}\n\n` : '';
      let content = item.content;
      if (content.endsWith('。')) content = content.slice(0, -1);
      
      return { 
        response: `${empathy}「${item.title}」についてだね。${content}${ending}`,
        link: item.url ? { title: item.title, url: item.url } : undefined
      };
    }

    // 5. フォールバック（ヒットなし時）
    const philosophies = AI_KUN_PERSONALITY.philosophies;
    const philosophy = philosophies[Math.floor(Math.random() * philosophies.length)];
    return { 
      response: `ほほう、「${query}」についてだね。私のデータベースを隅々まで探してみたけれど、ぴったりの答えは見つからなかったよ。でも、こんな言葉を贈ろう。「${philosophy}」\n\n料金・手続き・水道工事・トラブルなど、具体的な単語で聞いてくれると力になれるかも！`
    };
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const { response, link } = handleLogic(userMessage.content);
      setIsTyping(false);
      addAssistantMessage(response, link);
    }, 800);
  };

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-[9999] font-sans flex flex-col items-end">
      
      {/* 吹き出し */}
      <AnimatePresence>
        {!isOpen && proactiveMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="mb-8 bg-white p-4 rounded-2xl shadow-2xl border border-primary-light/20 text-sm font-bold text-primary-deep cursor-pointer relative group max-w-[180px] sm:max-w-[200px] mr-2"
          >
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-primary-light/20" />
            <div className="flex items-start gap-2">
              <Sparkles size={16} className="text-secondary-vibrant shrink-0 mt-0.5 animate-pulse" />
              <span>{proactiveMessage}</span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setProactiveMessage(null); }}
              className="absolute -top-2 -right-2 bg-slate-200 text-slate-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== チャットウィンドウ ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* ── スマホ用：ボトムシート（全幅・四角） ── */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="
                fixed inset-x-0 bottom-0 z-[9999]
                flex flex-col
                h-[85dvh]
                bg-white
                rounded-t-2xl
                shadow-2xl
                border-t border-slate-200
                sm:hidden
              "
            >
              {/* ドラッグハンドル */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 bg-slate-300 rounded-full" />
              </div>

              {/* スマホ用ヘッダー */}
              <div className="bg-primary-main px-4 py-3 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 bg-white rounded-full overflow-hidden border-2 border-white/30 shadow-inner shrink-0">
                    <Image src="/aikun.png" alt="アイ君" fill className="object-contain p-0.5 scale-125" />
                  </div>
                  <div>
                    <h3 className="font-black text-base leading-tight">アイ君</h3>
                    <p className="text-[9px] opacity-60 font-bold uppercase tracking-widest">※アイ君は平気で嘘をつく事があります</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 bg-white/10 rounded-full flex items-center gap-1 text-xs font-bold"
                >
                  <ChevronDown size={18} />
                </button>
              </div>

              {/* スマホ用チャットエリア */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((m) => (
                  <motion.div 
                    key={m.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user' 
                        ? 'bg-primary-main text-white rounded-2xl rounded-br-sm shadow-sm' 
                        : 'bg-white text-primary-deep rounded-2xl rounded-bl-sm shadow-sm border border-slate-100'
                    }`}>
                      {m.content}
                    </div>
                    {m.link && (
                      <Link 
                        href={m.link.url}
                        className="mt-2 flex items-center gap-2 bg-secondary-vibrant text-primary-deep px-4 py-2 rounded-xl text-xs font-black shadow-sm hover:opacity-90 transition-opacity"
                      >
                        <ExternalLink size={13} />
                        {m.link.title}を見る
                      </Link>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 flex gap-1.5"
                    >
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.span 
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay }}
                          className="w-2 h-2 bg-primary-main/40 rounded-full" 
                        />
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>

              {/* スマホ用入力エリア */}
              <div className="px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t border-slate-100 shrink-0">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="メッセージを送る..."
                    className="flex-1 bg-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-main/30 transition-all"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-primary-main text-white p-3 rounded-2xl disabled:opacity-40 shadow-sm shrink-0"
                  >
                    <Send size={18} />
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* スマホ用背景オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-[9998] sm:hidden"
            />


            {/* ── PC用：フローティングウィンドウ（既存デザイン維持） ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="hidden sm:flex mb-4 w-[400px] h-[600px] max-h-[700px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex-col origin-bottom-right"
            >
              {/* PC用ヘッダー */}
              <div className="bg-primary-main p-5 flex items-center justify-between text-white shrink-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] border-[20px] border-white rounded-full animate-[spin_20s_linear_infinite]" />
                </div>
                <div className="flex items-center gap-3 relative">
                  <motion.div 
                    initial={{ rotate: -10 }} animate={{ rotate: 0 }}
                    className="relative w-14 h-14 bg-white rounded-full overflow-hidden border-2 border-white/20 shadow-inner"
                  >
                    <Image src="/aikun.png" alt="アイ君" fill className="object-contain p-0.5 scale-125" />
                  </motion.div>
                  <div>
                    <h3 className="font-black text-xl leading-tight">アイ君</h3>
                    <p className="text-[10px] opacity-70 font-bold uppercase tracking-[0.2em]">※アイ君は平気で嘘をつく事があります</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="hover:rotate-90 transition-transform p-1.5 bg-white/10 rounded-full relative z-10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* PC用チャットエリア */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/50">
                {messages.map((m) => (
                  <motion.div 
                    key={m.id} 
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user' ? 'bg-primary-main text-white rounded-tr-none shadow-glow' : 'bg-white text-primary-deep rounded-tl-none shadow-premium'
                    }`}>
                      {m.content}
                    </div>
                    {m.link && (
                      <Link 
                        href={m.link.url}
                        className="mt-2 flex items-center gap-2 bg-secondary-vibrant text-primary-deep px-4 py-2.5 rounded-xl text-xs font-black shadow-premium hover:scale-105 transition-all outline-none"
                      >
                        <ExternalLink size={14} />
                        {m.link.title}を見る
                      </Link>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-4 rounded-2xl rounded-tl-none shadow-premium flex gap-1.5"
                    >
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.span 
                          key={i}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay }}
                          className="w-2 h-2 bg-primary-main/30 rounded-full" 
                        />
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>

              {/* PC用入力エリア */}
              <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                  <input
                    type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                    placeholder="なんでも話しかけておくれ！"
                    className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary-main/20 outline-none transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" disabled={!inputValue.trim() || isTyping}
                    className="bg-primary-main text-white p-3.5 rounded-xl disabled:opacity-50 shadow-glow"
                  >
                    <Send size={18} />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* チャット開閉ボタン（半分隠れた控えめスタイル） */}
      <motion.button
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-white p-0.5 rounded-full shadow-lg border-2 border-primary-main/60 translate-y-[40%] hover:translate-y-0 transition-transform duration-300"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 relative overflow-hidden rounded-full">
          <Image src="/aikun.png" alt="アイ君" fill className="object-contain scale-125" />
        </div>
      </motion.button>
    </div>
  );
};
