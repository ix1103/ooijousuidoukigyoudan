"use client";

import React from 'react';
import { AlertTriangle, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getEmergencyInfo, Emergency } from '@/lib/microcms';

/**
 * 緊急情報バナー
 * MicroCMSの `emergency` エンドポイント（シングル型）から情報を取得します。
 * - isActive === true のときだけバナーを表示します。
 * - API取得失敗時（環境変数未設定等）は非表示になります（安全なフォールバック）。
 * - ユーザーが×ボタンでバナーを閉じることができます。
 */
export const EmergencyAlert = () => {
    const [info, setInfo] = React.useState<Emergency | null>(null);
    const [dismissed, setDismissed] = React.useState(false);

    React.useEffect(() => {
        getEmergencyInfo().then((data) => {
            if (data && data.isActive) {
                setInfo(data);
            }
        });
    }, []);

    // 非表示条件：取得失敗・isActive=false・ユーザーが閉じた
    if (!info || dismissed) return null;

    const content = (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-4 md:pb-6">
            <div className="flex items-end gap-3 min-h-[1.5rem] md:min-h-[2rem]">
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
                <p className="text-red-800 text-sm md:text-base font-bold flex-1 truncate">
                    {info.message}
                </p>
                {info.linkUrl && (
                    <Link href={info.linkUrl} className="hidden md:flex items-center text-red-600 font-bold text-xs md:text-sm hover:underline shrink-0">
                        {info.linkLabel || '詳細を見る'}
                        <ChevronRight size={16} />
                    </Link>
                )}
                <button
                    onClick={() => setDismissed(true)}
                    aria-label="バナーを閉じる"
                    className="text-red-400 hover:text-red-600 transition-colors shrink-0"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            <motion.section
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-red-50 border-b border-red-100 relative z-40 pt-[56px] md:pt-[64px]"
            >
                {info.linkUrl ? (
                    <Link href={info.linkUrl} className="block hover:bg-red-100/50 transition-colors">
                        {content}
                    </Link>
                ) : (
                    content
                )}
            </motion.section>
        </AnimatePresence>
    );
};
