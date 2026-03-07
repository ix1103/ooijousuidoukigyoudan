"use client";

import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { BarChart2, BookOpen, ArrowUpRight } from 'lucide-react';

/**
 * 財政状況・公表資料ページ（/about/finance）
 * 毎年の決算情報などを掲載します。
 */
export default function FinancePage() {
    const documents = [
        { year: '令和5年度', title: '決算報告書', href: 'http://www.ooijousuidoukigyoudan.or.jp/koukoku.html' },
        { year: '令和5年度', title: '経営比較分析表', href: 'http://www.ooijousuidoukigyoudan.or.jp/koukoku.html' },
        { year: '令和4年度', title: '決算報告書', href: 'http://www.ooijousuidoukigyoudan.or.jp/koukoku.html' },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="財政状況・公表資料"
                subtitle="地方公営企業法に基づく財政状況や各種公表資料を掲載しています。"
                enTitle="Finance & Disclosure"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {[{ icon: <BarChart2 size={28} />, title: '経営比較分析表', desc: '全国の水道事業者との比較による経営状況分析報告書を公表しています。' },
                    { icon: <BookOpen size={28} />, title: '予算・決算情報', desc: '各年度の予算書・決算書を公表しています。公表・公告ページからご覧いただけます。' }
                    ].map((card, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-slate-100 rounded-2xl p-6 md:p-10 shadow-sm">
                            <div className="text-primary-main bg-primary-main/5 p-3 rounded-xl w-fit mb-4">{card.icon}</div>
                            <h3 className="font-black text-primary-deep text-lg mb-2">{card.title}</h3>
                            <p className="text-text-sub text-sm leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
                <h2 className="text-xl font-black text-primary-deep mb-6">公表書類一覧</h2>
                <div className="space-y-3">
                    {documents.map((doc, idx) => (
                        <a key={idx} href={doc.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl p-4 md:p-6 hover:shadow-md transition-all group">
                            <div>
                                <p className="text-xs text-text-sub font-bold mb-1">{doc.year}</p>
                                <p className="font-black text-primary-deep text-sm md:text-base">{doc.title}</p>
                            </div>
                            <ArrowUpRight size={18} className="text-primary-main opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
