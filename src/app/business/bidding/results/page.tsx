"use client";

import React from 'react';
import { FileText, ChevronRight, Calendar, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

// 入札結果のサンプルデータ（MicroCMS未連動時）
const results = [
    {
        date: '令和8年1月14日',
        title: '令和7年度 薬品購入（次亜塩素酸ナトリウム）業務委託',
        type: '落札結果',
        winner: '公開中',
        pdfUrl: null,
    },
    {
        date: '令和7年3月28日',
        title: '令和6年度 施設修繕工事（3号配水池外壁塗装）',
        type: '落札結果',
        winner: '公開中',
        pdfUrl: null,
    },
    {
        date: '令和6年11月1日',
        title: '令和6年度 計量機器定期点検業務委託',
        type: '落札結果',
        winner: '公開中',
        pdfUrl: null,
    },
];

const typeColor: Record<string, string> = {
    '落札結果': 'bg-green-100 text-green-700',
    '入札公告': 'bg-blue-100 text-blue-700',
};

export default function BiddingResultsPage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="入札等結果"
                subtitle="入札・見積合わせの結果を掲載しています。"
                enTitle="Bidding Results"
            />

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* 注意書き */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5 md:p-6 flex items-start gap-3"
                    >
                        <Trophy size={18} className="text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-amber-800 leading-relaxed">
                            以下は参考表示です。正式な入札等結果については企業団へお問い合わせいただくか、今後このページで随時更新予定の公式資料をご確認ください。
                        </p>
                    </motion.div>

                    {/* 結果一覧 */}
                    <div className="space-y-4">
                        {results.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.07 }}
                                className="bg-white border border-slate-100 rounded-2xl p-5 md:p-8 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-lg transition-all"
                            >
                                <span className={`text-xs font-black px-3 py-1 rounded-full w-fit ${typeColor[item.type] ?? 'bg-slate-100 text-slate-600'}`}>
                                    {item.type}
                                </span>
                                <div className="flex-1">
                                    <p className="font-black text-primary-deep text-sm md:text-base">{item.title}</p>
                                    <p className="text-text-sub text-xs mt-1 flex items-center gap-1">
                                        <Calendar size={12} />
                                        {item.date}
                                    </p>
                                </div>
                                {item.pdfUrl ? (
                                    <a
                                        href={item.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-bold text-primary-main hover:underline"
                                    >
                                        <FileText size={14} />PDF
                                        <ChevronRight size={14} />
                                    </a>
                                ) : (
                                    <span className="text-xs text-slate-400 font-bold">詳細は窓口まで</span>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* 入札参加資格への案内 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link href="/business/bidding" className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-glow hover:border-primary-main/20 transition-all group">
                            <div>
                                <p className="font-black text-primary-deep text-sm md:text-base">入札参加資格申請書関係</p>
                                <p className="text-xs text-slate-400 mt-1">入札参加登録・資格書類はこちら</p>
                            </div>
                            <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all" />
                        </Link>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
