"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AI_KUN_KNOWLEDGE_V9, SYNONYMS, AI_KUN_PERSONALITY, KnowledgeItem } from '@/constants/knowledge-base-v9';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const greetings = AI_KUN_PERSONALITY.greetings;
        addAssistantMessage(greetings[Math.floor(Math.random() * greetings.length)] + " サイト内の手続き、料金改定、水道のトラブルなど、何でも詳しく教えるよ。どんなことにお困りかな？");
      }, 500);
    }
  }, [isOpen]);

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
   * 高精度スコアリング検索エンジン (V9)
   */
  const findBestMatch = (query: string): { item: KnowledgeItem | null; score: number } => {
    const normalizedQuery = query.toLowerCase().replace(/[、。！？!?,.]/g, '');
    let bestItem: KnowledgeItem | null = null;
    let maxScore = 0;

    AI_KUN_KNOWLEDGE_V9.forEach(item => {
      let score = 0;

      // 1. キーワードマッチ（重み付け）
      item.keywords.forEach(kw => {
        if (normalizedQuery.includes(kw.word)) {
          score += kw.weight;
        }

        // 2. 類義語（シノニム）マッチ
        const synonyms = SYNONYMS[kw.word] || [];
        synonyms.forEach(syn => {
          if (normalizedQuery.includes(syn)) {
            score += kw.weight * 0.8; // シノニムは少し重みを下げる
          }
        });
      });

      // 3. タイトル一致ボーナス
      if (normalizedQuery.includes(item.title) || item.title.includes(normalizedQuery)) {
        score += 10;
      }

      if (score > maxScore) {
        maxScore = score;
        bestItem = item;
      }
    });

    return { item: bestItem, score: maxScore };
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const query = userMessage.content;
      const { item, score } = findBestMatch(query);

      let response = "";
      let foundLink = undefined;

      // 閾値（スコア3以上でヒットとみなす）
      if (item && score >= 3) {
        response = `${item.title}について教えるよ。${item.content}`;
        if (item.url) foundLink = { title: item.title, url: item.url };
      } else {
        // ヒットしない場合は水の雑学やおしゃべり
        if (query.includes('こんにちは') || query.includes('おはよう') || query.includes('こんばんは')) {
          response = "やあ！今日もいい日になるといいね。何かお手伝いできることはあるかな？";
        } else if (query.includes('だれ') || query.includes('君は')) {
          response = "私はアイ君。大井上水道企業団のグランド・コンシェルジュさ！";
        } else {
          const tips = AI_KUN_PERSONALITY.random_tips;
          const quote = AI_KUN_PERSONALITY.philosophies[Math.floor(Math.random() * AI_KUN_PERSONALITY.philosophies.length)];
          response = `ふむ、それについては勉強不足で答えられないかもしれない。${quote} もしかしたら「料金改定」「漏水」「引越し」「メーター交換」といったキーワードで聞いてもらえると、詳しく答えられるかもしれないよ。`;
        }
      }

      setIsTyping(false);
      addAssistantMessage(response, foundLink);
    }, 800);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[calc(100vw-1.5rem)] sm:w-[400px] h-[75dvh] sm:h-[600px] max-h-[700px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* ヘッダー */}
            <div className="bg-primary-main p-5 sm:p-6 flex items-center justify-between text-white shrink-0 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full overflow-hidden border-2 border-white/20 shadow-inner">
                  <Image src="/aikun.png" alt="アイ君" fill className="object-contain p-0.5 scale-125" />
                </div>
                <div>
                  <h3 className="font-black text-lg sm:text-xl leading-tight">アイ君</h3>
                  <p className="text-[10px] opacity-70 font-bold uppercase tracking-[0.2em]">Grand Concierge v11</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1.5 bg-white/10 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* チャットエリア */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 bg-slate-50/50">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[90%] sm:max-w-[85%] p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
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
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-premium flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary-main/30 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-primary-main/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-primary-main/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* 入力エリア */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                <input
                  type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                  placeholder="質問を入力..."
                  className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 sm:py-3.5 text-sm focus:ring-2 focus:ring-primary-main/20 outline-none"
                />
                <button
                  type="submit" disabled={!inputValue.trim() || isTyping}
                  className="bg-primary-main text-white p-3 sm:p-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-glow"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-white p-1 rounded-full shadow-2xl border-2 sm:border-4 border-primary-main"
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 relative overflow-hidden rounded-full font-bold">
           <Image src="/aikun.png" alt="アイ君" fill className="object-contain p-0 scale-[1.3]" />
        </div>
      </motion.button>
    </div>
  );
};
