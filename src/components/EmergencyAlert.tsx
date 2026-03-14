"use client";

import React from 'react';
import { AlertTriangle, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getSiteStatus, SiteStatus } from '@/lib/microcms';

/**
 * 緊急情報バナー
 * MicroCMSの `emergency` エンドポイント（シングル型）から情報を取得します。
 * - isActive === true のときだけバナーを表示します。
 * - API取得失敗時（環境変数未設定等）は非表示になります（安全なフォールバック）。
 * - ユーザーが×ボタンでバナーを閉じることができます。
 */
export const EmergencyAlert = () => {
    const [info, setInfo] = React.useState<SiteStatus | null>(null);
    const [dismissed, setDismissed] = React.useState(false);

    React.useEffect(() => {
        getSiteStatus().then((data) => {
            if (data && data.isEmergencyActive) {
                setInfo(data);
            }
        });
    }, []);

    // 非表示条件：取得失敗・isActive=false・ユーザーが閉じた
    if (!info || dismissed) return null;

    const content = (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <div className="flex items-center gap-3 min-h-[1.5rem] md:min-h-[2rem]">
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
                    {info.emergencyMessage}
                </p>
                {(info.emergencyContent || info.emergencyLinkUrl) && (
                    <Link href={info.emergencyContent ? "/emergency" : (info.emergencyLinkUrl || "#")} className="flex items-center text-red-600 font-bold text-xs md:text-sm hover:underline shrink-0 whitespace-nowrap ml-2 md:ml-0">
                        {info.emergencyLinkLabel || '詳細を見る'}
                        <ChevronRight size={16} />
                    </Link>
                )}
                <button
                    onClick={() => setDismissed(true)}
                    aria-label="バナーを閉じる"
                    className="p-1.5 md:p-2 rounded-full bg-red-100/80 hover:bg-red-200 border border-red-200/50 text-red-600 hover:text-red-800 transition-all shrink-0 active:scale-95 shadow-sm"
                >
                    <X size={24} className="md:w-7 md:h-7" />
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
                className="bg-red-50 border-b border-red-100 relative z-40"
            >
                {content}
            </motion.section>
        </AnimatePresence>
    );
};
