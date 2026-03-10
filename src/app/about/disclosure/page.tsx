"use client";

import React from 'react';
import { FileText, ChevronRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';

const documents = [
    {
        category: '耐震化計画',
        items: [
            {
                label: '上下水道耐震化計画',
                href: null, // 旧サイトに掲載、URLが不明確のためnull
                note: '令和7年3月28日掲載',
            },
        ],
    },
    {
        category: '水質情報',
        items: [
            {
                label: '水質検査計画（令和8年度）',
                href: 'http://www.ooijousuidoukigyoudan.or.jp/suisitu-jyouhou.html',
                note: '令和8年1月9日掲載',
            },
        ],
    },
    {
        category: '議会資料',
        items: [
            {
                label: '令和8年第1回議会定例会 資料（3月5日開催）',
                href: 'http://www.ooijousuidoukigyoudan.or.jp/gikai-main.html',
                note: '令和8年3月掲載',
            },
        ],
    },
];

export default function DisclosurePage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="公表資料"
                subtitle="情報公開の観点から、各種計画・報告書などを掲載しています。"
                enTitle="Public Disclosure"
            />

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                    {/* 公表の趣旨 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200/40 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-start gap-4 md:gap-6">
                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0">
                                <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-slate-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-3">情報公表について</h2>
                                <p className="text-text-sub text-sm md:text-base leading-relaxed">
                                    大井上水道企業団では、透明性の高い事業運営を推進するため、各種計画書・報告書・財政状況等を積極的に公表しています。
                                    住民の皆様や事業者の皆様からのご意見・情報公開請求については、企業団窓口にてご対応いたします。
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* カテゴリ別ドキュメント一覧 */}
                    {documents.map((section, si) => (
                        <motion.div
                            key={section.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: si * 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                                <h2 className="text-xl md:text-2xl font-black text-primary-deep">{section.category}</h2>
                            </div>
                            <div className="space-y-3">
                                {section.items.map((item, i) => (
                                    item.href ? (
                                        <a
                                            key={i}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 md:p-5 bg-white hover:bg-primary-main/5 border border-slate-100 hover:border-primary-main/20 rounded-2xl shadow-sm transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary-main/10 p-2 rounded-xl shrink-0">
                                                    <FileText size={18} className="text-primary-main" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-primary-deep text-sm md:text-base">{item.label}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{item.note}</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all shrink-0" />
                                        </a>
                                    ) : (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between p-4 md:p-5 bg-white border border-slate-100 rounded-2xl shadow-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="bg-slate-100 p-2 rounded-xl shrink-0">
                                                    <FileText size={18} className="text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-primary-deep text-sm md:text-base">{item.label}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{item.note}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-400 font-bold shrink-0">窓口にてご確認ください</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* お問い合わせ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-glow-lg"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.1),transparent)]" />
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-3xl font-black mb-3">情報公開請求・お問い合わせ</h3>
                            <p className="text-white/60 text-sm md:text-base mb-6">資料の閲覧・情報公開請求は企業団窓口へご連絡ください。</p>
                            <a
                                href="tel:0547-46-4130"
                                className="btn-shine inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-base md:text-lg shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
                            >
                                0547-46-4130
                            </a>
                            <p className="mt-4 text-white/40 text-xs">平日 8:30〜17:15（土日祝・年末年始を除く）</p>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
