"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] right-6 sm:bottom-8 sm:right-8 z-[60] w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md text-primary-main rounded-full shadow-glow border border-primary-main/10 flex items-center justify-center group hover:bg-primary-main hover:text-white transition-all duration-300 active:scale-90 overflow-hidden"
                    aria-label="ページトップへ戻る"
                >
                    {/* 波紋演出 */}
                    <div className="absolute inset-0 bg-primary-main scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                    <ChevronUp size={24} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
