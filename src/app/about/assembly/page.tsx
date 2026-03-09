"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Users, FileText, Calendar, Building, ChevronRight, Gavel } from 'lucide-react';

export default function AssemblyPage() {
    const structure = [
        { label: '議員定数', value: '8名', desc: '構成市町の議員から選出されます' },
        { label: '内訳', value: '島田市：5名 ／ 牧之原市：3名', desc: '人口比等に基づき配分されます' },
        { label: '任期', value: '選出市町での議員任期と同じ', desc: '（原則4年）' },
    ];

    const meetings = [
        { title: '定例会（3月）', desc: '新年度予算案の審議、条例案の審議など' },
        { title: '定例会（9月）', desc: '前年度決算の認定、事業報告など' },
        { title: '臨時会', desc: '必要に応じて開催されます' },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="企業団議会"
                subtitle="大井上水道企業団の意思決定機関である「議会」の組織と活動についてご案内します。"
                enTitle="Assembly"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* 議会の役割 */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div className="relative">
                        <div className="aspect-[4/3] bg-slate-100 rounded-[3rem] flex items-center justify-center p-12 overflow-hidden shadow-premium">
                            <Gavel className="w-full h-full text-primary-deep/5" strokeWidth={1} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <Building size={48} className="text-primary-main mb-6" />
                                <p className="text-primary-deep font-black text-xl md:text-2xl leading-tight">
                                    広域連合による<br />民主的な水道運営
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6">
                            <Users size={24} />
                            <h2 className="text-xl md:text-3xl font-black text-primary-deep">議会の仕組みと役割</h2>
                        </div>
                        <p className="text-text-sub text-sm md:text-lg leading-relaxed md:leading-loose mb-8">
                            当企業団は一部事務組合であり、構成自治体（島田市・牧之原市）から選出された議員によって構成される議会を置いています。
                            議会は、予算の議決や決算の認定、条例の制定・改正など、企業団の運営に関する重要事項を決定する役割を担っています。
                        </p>
                        <div className="space-y-4">
                            {structure.map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl gap-2">
                                    <span className="text-[10px] font-black text-primary-main bg-primary-main/5 px-3 py-1 rounded-full w-fit uppercase tracking-widest">{item.label}</span>
                                    <div className="text-right">
                                        <p className="font-black text-primary-deep text-sm md:text-base">{item.value}</p>
                                        <p className="text-[10px] text-text-sub/60 mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 会議の開催 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Meetings</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-12">会議の開催</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {meetings.map((meeting, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className="bg-primary-main/5 p-4 rounded-2xl w-fit mb-6">
                                    <Calendar size={24} className="text-primary-main" />
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-primary-deep mb-4">{meeting.title}</h3>
                                <p className="text-text-sub text-sm leading-relaxed">{meeting.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 議事録・公表資料 */}
                <section className="bg-primary-deep rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden text-center">
                    <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-r from-primary-deep via-primary-main to-primary-light opacity-30" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <FileText className="text-secondary-vibrant mx-auto mb-6" size={48} />
                        <h2 className="text-2xl md:text-4xl font-black mb-6">議事録の公開について</h2>
                        <p className="text-accent-soft/70 text-sm md:text-lg leading-relaxed mb-10">
                            会議の詳細は議事録としてまとめられ、公式サイトや企業団窓口にて閲覧いただけます。
                            透明性の高い議会運営を行い、適正な水道事業の執行を監視しています。
                        </p>
                        <a
                            href="http://www.ooijousuidoukigyoudan.or.jp/gikai-main.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-primary-deep font-black px-8 py-4 rounded-2xl hover:bg-secondary-vibrant hover:text-primary-deep transition-all shadow-lg active:scale-95"
                        >
                            <span>議会の詳細を見る（公式サイト）</span>
                            <ChevronRight size={18} />
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
