"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Users, FileText, Calendar, Building, ChevronRight, Gavel, Download } from 'lucide-react';

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

    const parliamentData = [
        {
            year: "令和8年 第1回議会",
            items: [
                { title: "議案", url: "http://www.ooijousuidoukigyoudan.or.jp/R8giai1/1-1kagami.pdf" },
                { title: "変更規約", url: "http://www.ooijousuidoukigyoudan.or.jp/R8giai1/1-2henkoukiyaku.pdf" },
                { title: "新旧対比表", url: "http://www.ooijousuidoukigyoudan.or.jp/R8giai1/1-3sinkyuu.pdf" },
                { title: "議案", url: "http://www.ooijousuidoukigyoudan.or.jp/R8giai1/2-1kagami.pdf" },
                { title: "予算", url: "http://www.ooijousuidoukigyoudan.or.jp/R8giai1/2-2yosan.pdf" },
                { title: "日程表", url: "http://www.ooijousuidoukigyoudan.or.jp/R8giai1/nittei.pdf" }
            ]
        }
    ];

    const resultsData = [
        { title: "令和7年 第1回議会", url: "http://www.ooijousuidoukigyoudan.or.jp/R7_1_giketukekka.pdf" },
        { title: "令和6年 第2回議会", url: "http://www.ooijousuidoukigyoudan.or.jp/R6-2gikaikekka.pdf" },
        { title: "令和6年 第1回議会", url: "http://www.ooijousuidoukigyoudan.or.jp/R5-1kekka.pdf" },
        { title: "令和5年 第2回議会", url: "http://www.ooijousuidoukigyoudan.or.jp/R5_2nd_giketsu.pdf" },
        { title: "令和5年 第1回議会", url: "http://www.ooijousuidoukigyoudan.or.jp/R5_1st_giketsu.pdf" }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="議会について"
                subtitle="大井上水道企業団の意思決定機関である「議会」の組織と活動、各種資料をご案内します。"
                enTitle="Assembly"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16 md:space-y-24">

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
                    <h2 className="text-2xl md:text-4xl font-black text-primary-deep mb-12">会議の開催</h2>

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

                {/* 議案・資料 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Documents</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-primary-deep mb-6">議案・資料</h2>
                    <p className="text-text-sub text-sm md:text-base mb-10">議会に提出された議案や関連資料をPDF形式で公開しています。</p>

                    <div className="space-y-8">
                        {parliamentData.map((data, idx) => (
                            <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                                    <h3 className="font-black text-primary-deep text-lg flex items-center gap-2">
                                        <FileText size={20} className="text-primary-main" />
                                        {data.year}
                                    </h3>
                                </div>
                                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {data.items.map((item, itemIdx) => (
                                        <a
                                            key={itemIdx}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex flex-col justify-between p-4 rounded-2xl border border-slate-100 hover:border-primary-main/30 hover:shadow-md transition-all bg-white"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="bg-primary-main/10 p-2 rounded-xl group-hover:bg-primary-main group-hover:text-white transition-colors text-primary-main">
                                                    <Download size={18} />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">PDF</span>
                                            </div>
                                            <h4 className="font-bold text-sm text-primary-deep group-hover:text-primary-main transition-colors line-clamp-2">
                                                {item.title}
                                            </h4>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 議決結果 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Results</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-primary-deep mb-6">議決結果一覧</h2>
                    <p className="text-text-sub text-sm md:text-base mb-10">過去の会議における議案の議決結果を公開しています。</p>

                    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                        <ul className="divide-y divide-slate-100">
                            {resultsData.map((result, idx) => (
                                <li key={idx}>
                                    <a
                                        href={result.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-5 md:px-8 hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="bg-slate-100 p-2.5 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all text-slate-500 group-hover:text-primary-main">
                                                <FileText size={20} />
                                            </div>
                                            <span className="font-bold text-sm md:text-base text-primary-deep group-hover:text-primary-main transition-colors">
                                                {result.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">PDF</span>
                                            <ChevronRight size={18} className="text-slate-300 group-hover:text-secondary-vibrant group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
