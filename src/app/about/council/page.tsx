"use client";

import React from 'react';
import { ChevronRight, Phone, Users, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export default function CouncilPage() {
    const members = [
        { role: '会長', org: '島田市' },
        { role: '副会長', org: '牧之原市' },
        { role: '委員', org: '各構成市町の代表者' },
    ];

    const agendaItems = [
        '水道料金の改定に関する審議',
        '給水サービスの水準・品質に関する審議',
        '事業計画・財政計画に関する意見聴取',
        '住民意見の反映に関する検討',
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="水道料金等審議会"
                subtitle="水道料金やサービスに関する事項を審議する諮問機関についてご案内します。"
                enTitle="Rate Review Committee"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* 審議会の役割 */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div className="relative">
                        <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[3rem] flex items-center justify-center p-12 overflow-hidden shadow-premium border border-purple-100">
                            <Scale className="w-full h-full text-primary-deep/5" strokeWidth={1} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <Users size={48} className="text-primary-main mb-6" />
                                <p className="text-primary-deep font-black text-xl md:text-2xl leading-tight">
                                    公正・透明な<br />料金決定プロセス
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-3xl font-black text-primary-deep">審議会の役割</h2>
                        </div>
                        <p className="text-text-sub text-sm md:text-lg leading-relaxed md:leading-loose mb-8">
                            水道料金等審議会は、水道料金の改定や給水サービスに関する重要事項について、住民の皆様の立場から意見を反映させるための諮問機関です。
                            構成市町の代表者や有識者等で構成され、公平・公正な料金設定と経営の透明性確保に寄与しています。
                        </p>
                        <div className="space-y-3">
                            {members.map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl gap-2">
                                    <span className="text-[10px] font-black text-primary-main bg-primary-main/5 px-3 py-1 rounded-full w-fit uppercase tracking-widest">{item.role}</span>
                                    <p className="font-black text-primary-deep text-sm md:text-base">{item.org}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 主な審議事項 */}
                <section>
                    <div className="flex items-center space-x-3 mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                        <h2 className="text-2xl md:text-4xl font-black text-primary-deep">主な審議事項</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {agendaItems.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all flex items-start gap-4"
                            >
                                <div className="bg-primary-main/10 p-3 rounded-xl shrink-0">
                                    <ChevronRight size={18} className="text-primary-main" />
                                </div>
                                <p className="font-bold text-primary-deep text-sm md:text-base leading-relaxed">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 料金改定ページへの案内 */}
                <section className="bg-primary-deep rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
                    <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-r from-primary-deep via-primary-main to-primary-light opacity-30" />
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <Scale className="text-secondary-vibrant mx-auto mb-6" size={48} />
                        <h2 className="text-2xl md:text-4xl font-black mb-6">審議会の詳細・料金改定について</h2>
                        <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-10">
                            審議会の開催結果や水道料金の改定内容については旧公式サイトおよび料金改定お知らせページをご覧ください。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/resident/billing-update"
                                className="inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep font-black px-8 py-4 rounded-2xl hover:opacity-90 transition-all shadow-glow active:scale-95"
                            >
                                料金改定のお知らせへ
                                <ChevronRight size={18} />
                            </Link>
                            <a
                                href="tel:0547-46-4130"
                                className="inline-flex items-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all active:scale-95"
                            >
                                <Phone size={18} />
                                お電話で確認
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
