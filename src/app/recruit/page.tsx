"use client";

import React from 'react';
import { ChevronRight, Phone, Users, Briefcase, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';

export default function RecruitPage() {
    const benefits = [
        { label: '給与', value: '地方公務員準拠の給与体系' },
        { label: '勤務時間', value: '午前8:30〜午後5:15（実働7時間45分）' },
        { label: '休日', value: '土曜・日曜・祝日・年末年始（12/29〜1/3）' },
        { label: '各種手当', value: '通勤手当・住居手当・期末手当など' },
        { label: '社会保険等', value: '共済組合加入' },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="職員採用関係"
                subtitle="大井上水道企業団の職員採用情報をご案内します。"
                enTitle="Recruitment"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* 採用について */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div className="relative">
                        <div className="aspect-[4/3] bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[3rem] flex items-center justify-center p-12 overflow-hidden shadow-premium border border-emerald-100">
                            <Users className="w-full h-full text-primary-deep/5" strokeWidth={1} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <Briefcase size={48} className="text-primary-main mb-6" />
                                <p className="text-primary-deep font-black text-xl md:text-2xl leading-tight">
                                    地域の水道を<br />守る仕事
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-3xl font-black text-primary-deep">採用についての概要</h2>
                        </div>
                        <p className="text-text-sub text-sm md:text-lg leading-relaxed md:leading-loose mb-8">
                            大井上水道企業団では、地域の水道を守り、住民の皆様に安全な水を届けるために、意欲的な職員を募集しています。
                            採用試験の実施時期・募集職種については、その都度お知らせページや旧公式サイトにて公告いたします。
                        </p>
                        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5 flex items-start gap-3">
                            <FileText size={16} className="text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-sm text-amber-800 leading-relaxed">
                                現在の募集状況については、企業団窓口または下記の旧サイトにてご確認ください。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 勤務条件 */}
                <section>
                    <div className="flex items-center space-x-3 mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                        <h2 className="text-2xl md:text-4xl font-black text-primary-deep">主な勤務条件</h2>
                    </div>
                    <p className="text-text-sub text-sm mb-8">以下は一般的な目安です。実際の条件は採用試験時の公告をご確認ください。</p>
                    <div className="space-y-4">
                        {benefits.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 bg-white border border-slate-100 rounded-2xl shadow-sm gap-2"
                            >
                                <span className="text-[10px] font-black text-primary-main bg-primary-main/5 px-3 py-1 rounded-full w-fit tracking-widest">{item.label}</span>
                                <p className="font-bold text-primary-deep text-sm md:text-base">{item.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 採用情報・お問い合わせ */}
                <section className="bg-primary-deep rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden text-center">
                    <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-r from-primary-deep via-primary-main to-primary-light opacity-30" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <Briefcase className="text-secondary-vibrant mx-auto mb-6" size={48} />
                        <h2 className="text-2xl md:text-4xl font-black mb-6">採用情報の詳細・お問い合わせ</h2>
                        <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-10">
                            採用試験の詳細・応募書類については旧公式サイトをご参照いただくか、直接企業団へお問い合わせください。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="http://www.ooijousuidoukigyoudan.or.jp/syokuinsaiyou.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep font-black px-8 py-4 rounded-2xl hover:opacity-90 transition-all shadow-glow active:scale-95"
                            >
                                採用情報を見る（旧サイト）
                                <ChevronRight size={18} />
                            </a>
                            <a
                                href="tel:0547-46-4130"
                                className="inline-flex items-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all active:scale-95"
                            >
                                <Phone size={18} />
                                お電話でお問い合わせ
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
