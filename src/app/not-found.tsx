"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Droplets } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export default function NotFound() {
    return (
        <div className="min-h-screen pt-20 flex flex-col">
            <PageHeader
                title="404 - Page Not Found"
                subtitle="お探しのページは見つかりませんでした。"
                enTitle="NOT FOUND"
            />

            <div className="flex-grow flex items-center justify-center px-4 py-20">
                <div className="max-w-xl w-full text-center space-y-12">
                    {/* アニメーション付きアイコン */}
                    <div className="relative">
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-primary-main/20 flex justify-center"
                        >
                            <Droplets size={240} strokeWidth={1} />
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-7xl font-black text-primary-deep tracking-tighter">404</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black text-primary-deep">
                            ページが移動したか、<br className="md:hidden" />削除された可能性があります。
                        </h2>
                        <p className="text-text-sub text-base md:text-lg">
                            入力したURLが正しいかご確認ください。<br />
                            お探しの情報が見つからない場合は、ホームからお探しください。
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-main text-white px-8 py-4 rounded-2xl font-black shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
                        >
                            <Home size={20} />
                            <span>ホームへ戻る</span>
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-slate-100 text-primary-deep px-8 py-4 rounded-2xl font-black hover:border-primary-main hover:text-primary-main transition-all active:scale-95"
                        >
                            <ArrowLeft size={20} />
                            <span>前のページへ戻る</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
