"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AlertCircle } from 'lucide-react';

export const FloatingContact = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // 300px 以上スクロールしたら表示
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    className="fixed bottom-24 right-6 z-40 xl:hidden"
                >
                    <a
                        href="tel:0547-46-4130"
                        className="relative flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl active:scale-95 transition-transform group"
                    >
                        {/* パルス波アニメーション */}
                        <motion.div
                            animate={{ scale: [1, 1.4, 1.6], opacity: [0.5, 0.3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0 bg-red-500 rounded-full -z-10"
                        />
                        <Phone size={24} fill="currentColor" />

                        {/* ツールチップ的な表示 */}
                        <div className="absolute right-full mr-4 bg-primary-deep text-white text-[10px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-premium">
                            緊急連絡先 (24h)
                        </div>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
