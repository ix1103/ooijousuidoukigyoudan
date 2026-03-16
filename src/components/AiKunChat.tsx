"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ExternalLink, Sparkles, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  AI_KUN_KNOWLEDGE_V19, 
  SYNONYMS, 
  AI_KUN_PERSONALITY, 
  AI_KUN_CHATTER,
  KnowledgeItem,
  EmotionContext
} from '@/constants/knowledge-base-v19';

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
   * V19 超超精度検索エンジン（極限進化）
   * - 完全一致ショートカット
   * - メタIntent（感情推論・緊急度）のサポート
   * - タイブレーク時の厳密な優先順位付けと動的配点の緻密化
   */
  const handleLogic = (query: string): { response: string; link?: { title: string; url: string } } => {
    // 0. 特殊ショートカット（雑な入力への最速回答）
    if (query === '料金' || query === '水道代') {
      return { response: '水道料金についてだね！基本料金は2ヶ月で1,815円（13/20mm）から。詳しい料金表や支払い方法はこのページを見てね！', link: { title: '水道料金表', url: '/resident/price' } };
    }
    
    // 1. ノイズ（ストップワード）の除去と正規化の極限進化
    const normalizeText = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
        .replace(/[\u30a1-\u30f6]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 0x60)) // カタカナ→ひらがな
        .replace(/[ー〜、。！？!?,.\s　]/g, '');
    };

    let normalizedQuery = normalizeText(query);
    // V19: 方言や感情表現のノイズ除去を強化
    const stopWords = ['について', 'おしえて', 'とはなに', 'とは', 'ってなに', 'しりたい', 'ください', 'どうすれば', 'します', 'ですか', 'ますか', 'こんにちは', 'どうも', 'だら', 'だに', 'でしょ', 'だけど', 'なんですが'];
    stopWords.forEach(word => {
      normalizedQuery = normalizedQuery.replace(word, '');
    });

    if (!normalizedQuery) normalizedQuery = normalizeText(query); // 全部消えちゃった場合のフェイルセーフ

    // 2. メタIntent（基本カテゴリ＋感情推論＋緊急度）の推定
    let estimatedIntent: 'money' | 'procedure' | 'trouble' | 'about' | 'faq' | 'general' = 'general';
    let emotion: EmotionContext = 'neutral';
    let urgency: 'high' | 'normal' = 'normal';

    if (/(りょうきん|だいきん|いくら|はらう|ねあげ|しはらい|くれじっと|こうざ|ペイペイ|paypay)/i.test(normalizedQuery)) estimatedIntent = 'money';
    else if (/(ひっこし|てつづき|かいし|ちゅうし|めいぎ|しんせい|かえる|あける|とめる|だうんろーど)/i.test(normalizedQuery)) estimatedIntent = 'procedure';
    else if (/(もれる|ろうすい|こわれる|しゅうり|とまる|でない|だんすい|さぎ|どろぼう|あやしい|とうけつ|にごる|あかみず|しろい)/i.test(normalizedQuery)) estimatedIntent = 'trouble';
    else if (/(どこ|でんわ|じかん|えいぎょう|やすみ|きぎょうだん|ばしょ)/i.test(normalizedQuery)) estimatedIntent = 'about';

    // 感情・緊急度推論
    if (/(こわい|ふあん|たすけて|パニック|あせる)/.test(normalizeText(query))) emotion = 'anxious';
    else if (/(くるしい|かなしい|つらい|なみだ|ぴえん|おちこむ)/.test(normalizeText(query))) emotion = 'sad';
    else if (/(むかつく|いらいら|はらたつ|さいあく)/.test(normalizeText(query))) emotion = 'angry';
    else if (/(うれしい|たのしい|はっぴー|わーい)/.test(normalizeText(query))) emotion = 'happy';

    if (estimatedIntent === 'trouble' && (emotion === 'anxious' || /(よる|きゅう|いま|すぐ)/.test(normalizedQuery))) {
      urgency = 'high';
    }

    // 3. 雑談・雑学・感情チェック（優先）
    let bestChatKey = null;
    let maxChatScore = 0;
    
    // 実務キーワードと雑談が被る場合の判別（例：水漏れして「最悪」）
    const isDirectTrouble = (estimatedIntent === 'trouble' && urgency === 'high');

    if (!isDirectTrouble) {
      for (const [key, chat] of Object.entries(AI_KUN_CHATTER)) {
        let chatScore = 0;
        chat.keywords.forEach(kw => {
          const normKw = normalizeText(kw);
          if (normalizedQuery.includes(normKw)) chatScore += chat.weight * (1 + normKw.length * 0.25);
        });
        
        // V19 タイブレーク用：入力の長さとキーワードの長さの比率で純度をみる
        if (chatScore === maxChatScore && bestChatKey) {
            const currentPure = chat.keywords.some(k => normalizeText(query) === normalizeText(k)) ? 1 : 0;
            const bestPure = AI_KUN_CHATTER[bestChatKey].keywords.some(k => normalizeText(query) === normalizeText(k)) ? 1 : 0;
            if (currentPure > bestPure) bestChatKey = key;
        }

        if (chatScore > maxChatScore) {
          maxChatScore = chatScore;
          bestChatKey = key;
        }
      }

      if (bestChatKey && maxChatScore >= 4.0) { // 閾値調整
        return { response: AI_KUN_CHATTER[bestChatKey].response };
      }
    }

    // 4. 実務知識検索（V19ロジック）
    let bestItem: KnowledgeItem | null = null;
    let maxScore = 0;

    AI_KUN_KNOWLEDGE_V19.forEach(item => {
      let score = 0;
      let hitCount = 0;

      // A. 意図（Intent）マッチングボーナス
      if (item.category === estimatedIntent) {
        score += 15;
      } else if (estimatedIntent !== 'general') {
        score -= 10; // V19：誤爆ペナルティ強化
      }

      // B. 完全一致・フレーズマッチング
      if (item.phrases) {
        item.phrases.forEach(phrase => {
          const normalizedPhrase = normalizeText(phrase);
          if (normalizedQuery === normalizedPhrase) {
            score += 200; // 完全一致は即回答
            hitCount += 2;
          } else if (normalizedPhrase.includes(normalizedQuery) || normalizedQuery.includes(normalizedPhrase)) {
            score += 50 + (normalizedQuery.length * 2.5); // 包含関係の配点増強
            hitCount++;
          }
        });
      }

      // C. キーワード＆シノニムマッチング
      item.keywords.forEach(kw => {
        let keywordHit = false;
        const normKw = normalizeText(kw.word);
        
        // TF-IDF的：長いキーワードは希少（価値が高い）
        const lengthMultiplier = 1 + (normKw.length * 0.4);

        if (normalizedQuery.includes(normKw)) {
          score += kw.weight * lengthMultiplier;
          keywordHit = true;
        }
        (SYNONYMS[kw.word] || []).forEach(syn => {
          const normSyn = normalizeText(syn);
          if (normalizedQuery.includes(normSyn)) {
            // シノニムも同等の重みで評価
            score += kw.weight * lengthMultiplier * 0.98;
            keywordHit = true;
          }
        });
        if (keywordHit) hitCount++;
      });
      
      // D. タイトルマッチング
      const normTitle = normalizeText(item.title);
      if (normalizedQuery.includes(normTitle) || normTitle.includes(normalizedQuery)) {
        score += 30; // タイトル一致の配点も強化
        hitCount++;
      }

      // E. 複数ヒットボーナス
      if (hitCount >= 2) score += 20;
      if (hitCount >= 3) score += 40;
      
      // タイブレーク：スコアが同じなら、文字数の短いアイテム（よりピンポイントな回答）を優先
      if (score === maxScore && bestItem) {
          if (item.content.length < bestItem.content.length) {
              bestItem = item;
          }
      } else if (score > maxScore) {
        maxScore = score;
        bestItem = item;
      }
    });

    // スコア閾値チェック
    if (bestItem && maxScore >= 8) {
      const item = bestItem as KnowledgeItem;
      const endings = AI_KUN_PERSONALITY.endings;
      const ending = endings[Math.floor(Math.random() * endings.length)];
      
      // V19 感情・緊急度による前置きの動的生成
      let empathy = item.empathy ? `${item.empathy}\n\n` : '';
      if (urgency === 'high' && item.category === 'trouble') {
          empathy = `【緊急】大変！水漏れや故障はパニックになるよね。落ち着いて聞いてね。\n\n`;
      } else if (emotion === 'angry') {
          empathy = `イライラさせてごめんね。すぐに役立つ情報を教えるよ！\n\n`;
      } else if (emotion === 'sad') {
          empathy = `落ち込まないで。私がしっかりサポートするから安心して！\n\n`;
      }

      let content = item.content;
      if (content.endsWith('。')) content = content.slice(0, -1);
      
      return { 
        response: `${empathy}「${item.title}」についてだね。${content}${ending}`,
        link: item.url ? { title: item.title, url: item.url } : undefined
      };
    }

    // 5. フォールバック
    const philosophies = AI_KUN_PERSONALITY.philosophies;
    const philosophy = philosophies[Math.floor(Math.random() * philosophies.length)];
    return { 
      response: `ごめんね、「${query}」については、私のデータベースを隅々まで調べたけど見つからなかったよ。\nでも、こんな言葉を贈るね。「${philosophy}」\n料金・手続き・水漏れなど、短い単語で聞いてくれると答えやすいかも！`
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
