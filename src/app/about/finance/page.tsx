"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, ShieldCheck, PieChart, Download, ArrowUpRight } from 'lucide-react';

export default function FinancePage() {
    const documents = [
        { year: '令和6年度', title: '予算公告及び予算説明書', date: '2024.03.20' },
        { year: '令和5年度', title: '水道事業会計決算報告書', date: '2024.09.30' },
        { year: '令和5年度', title: '事業年報', date: '2024.11.15' },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="財政状況・決算"
                subtitle="大井上水道企業団の予算、決算、経営状況に関する資料を公開しています。"
                enTitle="Finance"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* 経営の基本方針 */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div>
                        <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6">
                            <TrendingUp size={24} />
                            <h2 className="text-xl md:text-3xl font-black text-primary-deep">健全な経営の維持</h2>
                        </div>
                        <p className="text-text-sub text-sm md:text-lg leading-relaxed md:leading-loose mb-8">
                            当企業団は独立採算制を基本とし、安全で高品質な水を安定的に供給するため、長期的な視点に立った効率的な経営に努めています。
                            アセットマネジメント（資産管理）に基づき、老朽化した施設の計画的な更新を進め、将来にわたって持続可能な水道事業を目指しています。
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <ShieldCheck className="text-primary-main mb-3" size={24} />
                                <h4 className="font-black text-primary-deep text-sm mb-1">公営企業会計</h4>
                                <p className="text-xs text-text-sub leading-relaxed">複式簿記による透明性の高い経理処理を行っています。</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <PieChart className="text-primary-main mb-3" size={24} />
                                <h4 className="font-black text-primary-deep text-sm mb-1">効率的運営</h4>
                                <p className="text-xs text-text-sub leading-relaxed">事務の電算化や共同業務により低コストな運営を実現しています。</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary-deep rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-br from-primary-deep via-primary-main to-primary-deep opacity-30" />
                        <h3 className="text-xl font-black mb-8 relative z-10">水道事業の収支構造</h3>
                        <div className="space-y-6 relative z-10">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest text-white/60">
                                    <span>収入 (収益的収入)</span>
                                    <span>水道料金が主</span>
                                </div>
                                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-secondary-vibrant w-[90%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest text-white/60">
                                    <span>支出 (収益的支出)</span>
                                    <span>維持管理・減価償却費等</span>
                                </div>
                                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-main w-[70%]" />
                                </div>
                            </div>
                        </div>
                        <p className="mt-8 text-xs text-white/40 leading-relaxed italic">
                            ※水道事業は皆様からいただく水道料金のみで運営（独立採算）されています。
                        </p>
                    </div>
                </section>

                {/* 公表資料一覧 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Publications</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-4 md:mb-6">公表資料・報告書</h2>
                    <p className="text-text-sub text-sm md:text-base mb-8 md:mb-12">
                        地方公営企業法に基づき、毎年度の予算・決算情報を公開しています。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {documents.map((doc, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:border-primary-main/20 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-primary-main/5 p-3 rounded-xl group-hover:bg-primary-main group-hover:text-white transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-primary-main bg-primary-main/5 px-2 py-0.5 rounded-full mb-1 inline-block uppercase tracking-wider">{doc.year}</span>
                                        <h3 className="text-sm md:text-base font-bold text-primary-deep">{doc.title}</h3>
                                        <p className="text-[10px] text-text-sub/60 mt-0.5">公表日: {doc.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-text-sub/40 hover:text-primary-main transition-colors" title="PDF表示">
                                        <ArrowUpRight size={18} />
                                    </button>
                                    <button className="p-2 text-text-sub/40 hover:text-primary-main transition-colors" title="ダウンロード">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <a
                            href="http://www.ooijousuidoukigyoudan.or.jp/koukoku.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-black text-primary-main hover:underline"
                        >
                            過去の資料一覧（公式サイト）
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
