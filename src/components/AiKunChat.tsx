"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ExternalLink, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  AI_KUN_KNOWLEDGE_V14, 
  SYNONYMS, 
  AI_KUN_PERSONALITY, 
  AI_KUN_CHATTER,
  KnowledgeItem 
} from '@/constants/knowledge-base-v14';

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

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const greetings = AI_KUN_PERSONALITY.greetings;
        addAssistantMessage(greetings[Math.floor(Math.random() * greetings.length)] + " どんなことでも気軽に話しかけてね。今日の気分はどうだい？");
      }, 500);
      setProactiveMessage(null); // 開いたら吹き出しは消す
    }
  }, [isOpen]);

  // 自律的な話しかけロジック (V13/V14)
  useEffect(() => {
    if (!isOpen && !proactiveMessage) {
      proactiveTimerRef.current = setTimeout(() => {
        const tips = AI_KUN_PERSONALITY.random_tips;
        const msg = tips[Math.floor(Math.random() * tips.length)];
        setProactiveMessage(msg);
      }, 15000); // 15秒後に話しかける
    }
    return () => {
      if (proactiveTimerRef.current) clearTimeout(proactiveTimerRef.current);
    };
  }, [isOpen, proactiveMessage]);

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
   * 究極スコアリング & 雑談・雑学エンジン (V14)
   */
  const handleLogic = (query: string): { response: string; link?: { title: string; url: string } } => {
    const normalizedQuery = query.toLowerCase().replace(/[、。！？!?,. ]/g, '');
    
    // 1. 雑談・雑学・おしゃべりチェック (優先)
    let bestChatKey = null;
    let maxChatScore = 0;
    for (const [key, chat] of Object.entries(AI_KUN_CHATTER)) {
      let chatScore = 0;
      chat.keywords.forEach(kw => {
        if (normalizedQuery.includes(kw)) chatScore += chat.weight;
      });
      if (chatScore > maxChatScore) {
        maxChatScore = chatScore;
        bestChatKey = key;
      }
    }

    if (bestChatKey && maxChatScore >= 3) {
      return { response: AI_KUN_CHATTER[bestChatKey].response };
    }

    // 2. 実務知識検索（シノニム対応スコアリング）
    let bestItem: KnowledgeItem | null = null;
    let maxScore = 0;

    AI_KUN_KNOWLEDGE_V14.forEach(item => {
      let score = 0;
      item.keywords.forEach(kw => {
        // 直接マッチング
        if (normalizedQuery.includes(kw.word)) score += kw.weight;
        // シノニムマッチング
        (SYNONYMS[kw.word] || []).forEach(syn => {
          if (normalizedQuery.includes(syn)) score += kw.weight * 0.95; // ほぼ同等として扱う
        });
      });
      
      // タイトル・IDマッチング (超強力)
      if (normalizedQuery.includes(item.title) || item.title.includes(normalizedQuery)) score += 15;
      
      if (score > maxScore) {
        maxScore = score;
        bestItem = item;
      }
    });

    if (bestItem && maxScore >= 4) {
      const item = bestItem as KnowledgeItem;
      const endings = AI_KUN_PERSONALITY.endings;
      const ending = endings[Math.floor(Math.random() * endings.length)];
      const empathy = item.empathy ? `${item.empathy} ` : '';
      let content = item.content;
      if (content.endsWith('。')) content = content.slice(0, -1);
      
      return { 
        response: `${empathy}${item.title}について教えるよ。${content}${ending}`,
        link: item.url ? { title: item.title, url: item.url } : undefined
      };
    }

    // 3. ヒットしない場合の「究極知性」的な返し
    const philosophies = AI_KUN_PERSONALITY.philosophies;
    const philosophy = philosophies[Math.floor(Math.random() * philosophies.length)];
    return { 
      response: `ほほう、${query}についてだね。私のデータベースを隅々まで探してみたけれど、ぴったりの答えは見つからなかったよ。でも、こんな言葉を贈るさ。「${philosophy}」 具体的な手続きや、水の雑学（歴史や科学など）について聞きたいときは、いつでも教えてね！`
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
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-[9999] font-sans flex flex-col items-end">
      {/* 吹き出し (V13/V14/V15) */}
      <AnimatePresence>
        {!isOpen && proactiveMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="mb-6 bg-white p-4 rounded-2xl shadow-2xl border border-primary-light/20 text-sm font-bold text-primary-deep cursor-pointer relative group max-w-[200px]"
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="mb-4 w-[calc(100vw-1.5rem)] sm:w-[400px] h-[75dvh] sm:h-[600px] max-h-[700px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col origin-bottom-right"
          >
            {/* ヘッダー */}
            <div className="bg-primary-main p-5 sm:p-6 flex items-center justify-between text-white shrink-0 shadow-lg relative overflow-hidden">
              {/* 背景の装飾的な波紋 */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] border-[20px] border-white rounded-full animate-[spin_20s_linear_infinite]" />
              </div>

              <div className="flex items-center gap-3 relative">
                <motion.div 
                  initial={{ rotate: -10 }} animate={{ rotate: 0 }}
                  className="relative w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full overflow-hidden border-2 border-white/20 shadow-inner"
                >
                  <Image src="/aikun.png" alt="アイ君" fill className="object-contain p-0.5 scale-125" />
                </motion.div>
                <div>
                  <h3 className="font-black text-lg sm:text-xl leading-tight">アイ君</h3>
                  <p className="text-[10px] opacity-70 font-bold uppercase tracking-[0.2em]">Grand Concierge v15</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:rotate-90 transition-transform p-1.5 bg-white/10 rounded-full relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* チャットエリア */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 bg-slate-50/50">
              {messages.map((m) => (
                <motion.div 
                  key={m.id} 
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
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

            {/* 入力エリア */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                <input
                  type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                  placeholder="なんでも話しかけておくれ！"
                  className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 sm:py-3.5 text-sm focus:ring-2 focus:ring-primary-main/20 outline-none transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" disabled={!inputValue.trim() || isTyping}
                  className="bg-primary-main text-white p-3 sm:p-3.5 rounded-xl disabled:opacity-50 shadow-glow"
                >
                  <Send size={18} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={!isOpen ? {
          y: [0, -10, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        } : { y: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }} 
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-white p-1 rounded-full shadow-2xl border-2 sm:border-4 border-primary-main"
      >
        {/* 背景のパルス波紋 (V15) */}
        {!isOpen && (
          <div className="absolute inset-0 -z-10 bg-primary-main/20 rounded-full animate-ping opacity-75" />
        )}
        
        <div className="w-12 h-12 sm:w-16 sm:h-16 relative overflow-hidden rounded-full font-bold">
           <motion.div
             animate={!isOpen ? { scale: [1.3, 1.4, 1.3] } : { scale: 1.3 }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="w-full h-full relative"
           >
             <Image src="/aikun.png" alt="アイ君" fill className="object-contain p-0" />
           </motion.div>
        </div>
      </motion.button>
    </div>
  );
};
