"use client";

import React from 'react';
import { ChevronRight, Phone, FileText, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';

export default function InvoicePage() {
    const qaItems = [
        {
            q: '大井上水道企業団の登録番号は？',
            a: '当企業団は適格請求書発行事業者として登録しています。登録番号はT（番号）です。詳細は企業団窓口までお問い合わせください。',
        },
        {
            q: '水道料金の領収書はインボイスとして使えますか？',
            a: 'はい。当企業団が発行する領収書は適格簡易請求書（簡易インボイス）の要件を満たしています。確定申告等の際にご活用ください。',
        },
        {
            q: '請求書（インボイス）の発行はできますか？',
            a: '水道料金に係る適格請求書の発行については、企業団窓口にご相談ください。',
        },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="インボイス制度について"
                subtitle="適格請求書等保存方式（インボイス制度）に関する当企業団の対応について案内します。"
                enTitle="Invoice System"
            />

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* 制度概要 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/40 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-start gap-4 md:gap-6">
                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0">
                                <Receipt className="w-7 h-7 md:w-8 md:h-8 text-purple-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-4 md:mb-6">インボイス制度と当企業団の対応</h2>
                                <ul className="space-y-3">
                                    {[
                                        '令和5年10月1日より、適格請求書等保存方式（インボイス制度）が開始されました。',
                                        '当企業団は適格請求書発行事業者として登録しており、インボイスの発行が可能です。',
                                        '水道料金の納付書・領収書は、適格簡易請求書の記載要件を満たしています。',
                                        '仕入税額控除のご利用にあたっては、当企業団発行の書類をそのまま利用いただけます。',
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <ChevronRight size={16} className="text-primary-main mt-0.5 shrink-0" />
                                            <p className="text-text-sub text-sm md:text-base leading-relaxed">{text}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* よくある質問 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-2xl font-black text-primary-deep">よくある質問</h2>
                        </div>
                        <div className="space-y-4">
                            {qaItems.map((item, i) => (
                                <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                                    <div className="flex items-start gap-4 p-5 md:p-6 bg-slate-50">
                                        <div className="bg-gradient-to-br from-primary-main to-secondary-vibrant text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            Q
                                        </div>
                                        <p className="font-black text-primary-deep text-sm md:text-base">{item.q}</p>
                                    </div>
                                    <div className="flex items-start gap-4 p-5 md:p-6">
                                        <div className="bg-secondary-vibrant/10 text-secondary-vibrant text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                                            A
                                        </div>
                                        <p className="text-text-sub text-sm md:text-base leading-relaxed">{item.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 参考リンク */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-2xl font-black text-primary-deep">関連情報</h2>
                        </div>
                        <div className="space-y-3">
                            <a
                                href="http://www.ooijousuidoukigyoudan.or.jp/invoice.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-primary-main/5 border border-slate-100 hover:border-primary-main/20 rounded-2xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary-main/10 p-2 rounded-xl">
                                        <FileText size={18} className="text-primary-main" />
                                    </div>
                                    <div>
                                        <p className="font-black text-primary-deep text-sm md:text-base">インボイス制度について（旧サイト）</p>
                                        <p className="text-xs text-slate-400 mt-0.5">外部リンク</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all" />
                            </a>
                            <a
                                href="https://www.nta.go.jp/taxes/shiraberu/zeimokubetsu/shohi/keigenzeiritsu/invoice.htm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-primary-main/5 border border-slate-100 hover:border-primary-main/20 rounded-2xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary-main/10 p-2 rounded-xl">
                                        <FileText size={18} className="text-primary-main" />
                                    </div>
                                    <div>
                                        <p className="font-black text-primary-deep text-sm md:text-base">国税庁：インボイス制度の概要</p>
                                        <p className="text-xs text-slate-400 mt-0.5">国税庁公式サイト（外部リンク）</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all" />
                            </a>
                        </div>
                    </motion.div>

                    {/* お問い合わせ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gradient-to-br from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-glow-lg"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.1),transparent)]" />
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-3xl font-black mb-3">ご不明な点はお気軽に</h3>
                            <p className="text-white/60 text-sm md:text-base mb-6">インボイス制度に関するご質問は企業団窓口へ。</p>
                            <a
                                href="tel:0547-46-4130"
                                className="btn-shine inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-base md:text-lg shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
                            >
                                <Phone size={18} /><Phone size={20} className="inline-block mr-1 -mt-0.5" />0547-46-4130</a>
                            <p className="mt-4 text-white/40 text-xs">平日 8:30〜17:15（土日祝・年末年始を除く）</p>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
