"use client";

import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const EmergencyAlert = () => {
    // 実際にはmicroCMS等から「緊急」「重要」カテゴリの最新記事を取得する想定
    const isEmergency = true; // 緊急情報があるかどうかのフラグ
    const emergencyTitle = "令和8年度の水道料金改定に関する重要なお知らせ";
    const emergencyLink = "/news/demo-1";

    if (!isEmergency) return null;

    return (
        <section className="bg-red-50 border-b border-red-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
                <Link href={emergencyLink} className="flex flex-col md:flex-row items-center justify-between group">
                    <div className="flex items-center space-x-3 w-full md:w-auto mb-2 md:mb-0">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="bg-red-500 text-white p-1.5 md:p-2 rounded-full shrink-0 shadow-sm shadow-red-500/30"
                        >
                            <AlertTriangle size={18} className="md:w-5 md:h-5" />
                        </motion.div>
                        <span className="bg-red-100 text-red-700 text-[10px] md:text-xs font-black px-2 py-0.5 rounded border border-red-200 shrink-0">
                            緊急・重要
                        </span>
                        <h3 className="text-red-800 text-sm md:text-base font-bold group-hover:underline truncate pl-1">
                            {emergencyTitle}
                        </h3>
                    </div>

                    <div className="hidden md:flex items-center text-red-600 font-bold text-xs md:text-sm group-hover:translate-x-1 transition-transform">
                        <span>詳細を見る</span>
                        <ChevronRight size={16} />
                    </div>
                </Link>
            </div>
        </section>
    );
};
