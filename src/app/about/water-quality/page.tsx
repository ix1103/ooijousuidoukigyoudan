"use client";

import React from 'react';
import { FileText, ChevronRight, Droplets, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';

export default function WaterQualityPage() {
    const standards = [
        { item: '一般細菌', standard: '1mLの検水で形成される集落数が100以下', result: '適合' },
        { item: '大腸菌', standard: '検出されないこと', result: '適合' },
        { item: '塩素酸', standard: '0.6mg/L以下', result: '適合' },
        { item: '塩化物イオン', standard: '200mg/L以下', result: '適合' },
        { item: '有機物（全有機炭素の量）', standard: '3mg/L以下', result: '適合' },
        { item: 'pH値', standard: '5.8以上8.6以下', result: '適合' },
        { item: '味', standard: '異常でないこと', result: '適合' },
        { item: '臭気', standard: '異常でないこと', result: '適合' },
        { item: '色度', standard: '5度以下', result: '適合' },
        { item: '濁度', standard: '2度以下', result: '適合' },
        { item: '残留塩素', standard: '0.1mg/L以上（末端）', result: '適合' },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="水質情報"
                subtitle="大井上水道企業団が供給する水道水の水質検査結果をご案内します。"
                enTitle="Water Quality"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* 水質検査について */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div className="relative">
                        <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[3rem] flex items-center justify-center p-12 overflow-hidden shadow-premium border border-blue-100">
                            <Droplets className="w-full h-full text-primary-deep/5" strokeWidth={1} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <FlaskConical size={48} className="text-primary-main mb-6" />
                                <p className="text-primary-deep font-black text-xl md:text-2xl leading-tight">
                                    安全・安心な<br />水道水をお届け
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-3xl font-black text-primary-deep">水質検査の実施について</h2>
                        </div>
                        <p className="text-text-sub text-sm md:text-lg leading-relaxed md:leading-loose mb-8">
                            当企業団では、水道法に基づき定期的な水質検査を実施し、国が定める水質基準に適合した安全な水道水を供給しています。
                            年間の水質検査計画に基づき、採水・検査・結果公表を行い、皆様に安心してご利用いただける水道水の確保に努めています。
                        </p>
                        <div className="space-y-3">
                            {[
                                { label: '検査項目', value: '水質基準51項目（法定）＋独自項目' },
                                { label: '検査機関', value: '登録水質検査機関に委託' },
                                { label: '公表', value: '当ページおよび窓口にて閲覧可能' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl gap-2">
                                    <span className="text-[10px] font-black text-primary-main bg-primary-main/5 px-3 py-1 rounded-full w-fit uppercase tracking-widest">{item.label}</span>
                                    <p className="font-black text-primary-deep text-sm md:text-base">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 主な水質検査結果 */}
                <section>
                    <div className="flex items-center space-x-3 mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                        <h2 className="text-2xl md:text-4xl font-black text-primary-deep">主な水質検査結果</h2>
                    </div>
                    <p className="text-text-sub text-sm mb-8">以下は代表的な検査項目の結果です（前年度実績）。全項目が水質基準に適合しています。</p>

                    <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-primary-deep text-white">
                                    <th className="text-left px-5 py-4 font-black text-xs md:text-sm">検査項目</th>
                                    <th className="text-left px-5 py-4 font-black text-xs md:text-sm">基準値</th>
                                    <th className="text-left px-5 py-4 font-black text-xs md:text-sm">結果</th>
                                </tr>
                            </thead>
                            <tbody>
                                {standards.map((row, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.04 }}
                                        className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                                    >
                                        <td className="px-5 py-4 font-bold text-primary-deep text-xs md:text-sm">{row.item}</td>
                                        <td className="px-5 py-4 text-text-sub text-xs md:text-sm">{row.standard}</td>
                                        <td className="px-5 py-4">
                                            <span className="bg-green-100 text-green-700 font-black text-xs px-3 py-1 rounded-full">{row.result}</span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 詳細・水質検査計画 */}
                <section className="bg-primary-deep rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden text-center">
                    <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-r from-primary-deep via-primary-main to-primary-light opacity-30" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <FlaskConical className="text-secondary-vibrant mx-auto mb-6" size={48} />
                        <h2 className="text-2xl md:text-4xl font-black mb-6">水質検査計画・詳細結果</h2>
                        <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-10">
                            水質検査計画書（年次計画）および詳細な検査結果は旧公式サイトにて公開しています。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="http://www.ooijousuidoukigyoudan.or.jp/suisitu-jyouhou.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep font-black px-8 py-4 rounded-2xl hover:opacity-90 transition-all shadow-glow active:scale-95"
                            >
                                <FileText size={18} />
                                水質情報を見る（旧サイト）
                                <ChevronRight size={18} />
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
