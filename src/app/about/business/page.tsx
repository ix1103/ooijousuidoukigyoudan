"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Droplets, Target, ShieldCheck, TrendingUp, History, Flag } from 'lucide-react';

import { PageHeader } from '@/components/PageHeader';

export default function BusinessOverviewPage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="事業概要"
                subtitle="大井上水道企業団の設立からの歩みと、事業拡張の歴史をご紹介します。"
                enTitle="Business Overview"
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: '企業団について', href: '/about' },
                    { name: '事業概要', href: '#' }
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* イントロダクション */}
                <section className="bg-white p-8 md:p-16 rounded-2xl md:rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center space-x-3 text-secondary-vibrant font-black">
                            <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                            <span className="tracking-[0.15em] text-xs md:text-sm uppercase">About Our Business</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black text-primary-deep leading-tight">
                            地域に根ざし、<br />
                            進化を続ける水道事業
                        </h2>
                        <p className="text-text-sub text-sm md:text-base leading-relaxed">
                            昭和23年の設立以来、大井上水道企業団は構成市町の発展と人口増加に対応するため、幾度もの拡張事業を重ねてきました。
                            現在は第6期変更事業のもと、より安全で安定した水の供給と、強靭な水道インフラの構築を目指しています。
                        </p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="bg-primary-main/5 p-6 rounded-2xl text-center">
                            <TrendingUp className="text-primary-main mx-auto mb-3" size={32} />
                            <p className="text-2xl font-black text-primary-deep mb-1">6<span className="text-sm font-bold">期</span></p>
                            <p className="text-xs text-text-sub font-bold">拡張事業の歩み</p>
                        </div>
                        <div className="bg-secondary-vibrant/10 p-6 rounded-2xl text-center">
                            <ShieldCheck className="text-secondary-vibrant mx-auto mb-3" size={32} />
                            <p className="text-2xl font-black text-primary-deep mb-1">1970<span className="text-sm font-bold">年</span></p>
                            <p className="text-xs text-text-sub font-bold">地方公営企業法適用</p>
                        </div>
                    </div>
                </section>

                {/* 事業の変遷（拡張事業） */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10 text-center justify-center">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Expansion Projects</span>
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-8 md:mb-16 text-center">拡張事業の変遷</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { period: '第1期', years: 'S40〜S43', pop: '20,000人', vol: '5,000', perCapita: '250', desc: '大井川からの取水を開始' },
                            { period: '第2期', years: 'S44〜S51', pop: '13,000人', vol: '7,500', perCapita: '500', desc: '相良町の分離、金谷町営統合' },
                            { period: '第3期', years: 'S52〜S54', pop: '18,500人', vol: '12,200', perCapita: '513', desc: '新事務所建築・竣工' },
                            { period: '第4期', years: 'S55〜H2', pop: '19,500人', vol: '15,700', perCapita: '513', desc: '消石灰自動連続溶解注入設備竣工' },
                            { period: '第5期', years: 'H4〜H15', pop: '22,140人', vol: '18,200', perCapita: '619', desc: '大代地区への給水開始' },
                            { period: '第6期(変更)', years: 'H19〜H27', pop: '21,700人', vol: '12,700', perCapita: '599', desc: '市町村合併に伴う構成変更' },
                        ].map((phase, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-glow transition-all"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Droplets size={80} className="text-primary-main" />
                                </div>
                                <div className="flex justify-between items-end mb-4 border-b border-primary-main/10 pb-4">
                                    <div>
                                        <p className="text-xs font-bold text-secondary-vibrant mb-1">{phase.years}年度</p>
                                        <h3 className="text-xl font-black text-primary-deep">{phase.period}拡張事業</h3>
                                    </div>
                                </div>
                                <div className="space-y-3 relative z-10">
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                        <span className="text-xs font-bold text-text-sub">計画給水人口</span>
                                        <span className="text-sm font-black text-primary-deep">{phase.pop}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                        <span className="text-xs font-bold text-text-sub">計画給水量 (㎥/日)</span>
                                        <span className="text-sm font-black text-primary-deep">{phase.vol}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                        <span className="text-xs font-bold text-text-sub">1人1日最大 (L)</span>
                                        <span className="text-sm font-black text-primary-deep">{phase.perCapita}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-text-sub mt-4 mt-auto pt-3 border-t border-slate-50 line-clamp-2">
                                    {phase.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 事業の沿革（詳細年表） */}
                <section className="bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 md:py-24 rounded-3xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10 text-center justify-center">
                            <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                            <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Timeline History</span>
                            <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        </div>
                        <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-12 text-center">沿革（設立からの歩み）</h2>

                        <div className="relative border-l-2 border-primary-main/20 pl-6 md:pl-10 space-y-10 md:space-y-12 ml-4 md:ml-0">
                            {[
                                { year: '昭和23年', month: '6月', event: '大井上水道組合設立認可' },
                                { year: '昭和25年', month: '7月', event: '工事完了 通水式（給水戸数1,070戸 / 給水人口7,066人）' },
                                { year: '昭和30年', month: '10月', event: '構成町分担金打切り、以降独立採算制となる' },
                                { year: '昭和42年', month: '4月', event: '地方公営企業法適用、大井上水道企業団と改称' },
                                { year: '昭和43年', month: '4月', event: '県営榛南水道供給事業発足に伴って相良町の大部分分離' },
                                { year: '昭和53年', month: '12月', event: '新事務所竣工' },
                                { year: '昭和63年', month: '3月', event: '消石灰自動連続溶解注入設備竣工' },
                                { year: '平成14年', month: '10月', event: '大代地区への給水開始' },
                                { year: '平成17年', month: '10月', event: '市町村合併により構成が島田市、牧之原市（当時）となる' },
                                { year: '令和元年', month: '10月', event: '基本料金等の料金改定（用途別から口径別へ）' },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="relative"
                                >
                                    <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-4 md:w-5 h-4 md:h-5 bg-white border-4 border-primary-main rounded-full" />
                                    <div className="mb-1 flex items-baseline gap-2">
                                        <span className="text-lg md:text-xl font-black text-primary-main">{item.year}</span>
                                        <span className="text-sm font-bold text-primary-main/60">{item.month}</span>
                                    </div>
                                    <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <p className="text-sm md:text-base font-bold text-primary-deep">{item.event}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ビジョン・今後への誘導 */}
                <section className="text-center max-w-3xl mx-auto space-y-6">
                    <Flag className="text-secondary-vibrant mx-auto w-12 h-12" />
                    <h2 className="text-2xl md:text-4xl font-black text-primary-deep">次の世代へ、<br className="md:hidden" />確かな水を繋ぐ</h2>
                    <p className="text-text-sub text-sm md:text-base leading-relaxed">
                        これまでの拡張の歴史から得た教訓と強固な基盤をもとに、これからは「施設の耐震化」や「老朽管の更新」を重点項目とし、未来へ向けた持続可能な水道経営を推し進めていきます。
                    </p>
                </section>

            </div>
        </div>
    );
}
