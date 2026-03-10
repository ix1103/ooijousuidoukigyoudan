"use client";

import React from 'react';
import { FileText, Phone, ChevronRight, Wrench, AlertTriangle, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export default function RepairShopsPage() {
    const pdfLinks = [
        {
            year: '令和7年度',
            href: 'http://www.ooijousuidoukigyoudan.or.jp/FYR7_suidoutouban.pdf',
            icon: <Calendar size={24} />,
            color: 'bg-primary-main'
        },
        {
            year: '令和8年度',
            href: 'http://www.ooijousuidoukigyoudan.or.jp/FYR8toubanten.pdf',
            icon: <Calendar size={24} />,
            color: 'bg-secondary-vibrant'
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="宅内漏水修理当番店"
                subtitle="宅地内の漏水修理に対応している当番店の一覧です。"
                enTitle="Repair Shops On Duty"
            />

            {/* 緊急電話バナー */}
            <div className="bg-red-600 py-4 md:py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white text-center">
                    <div className="flex items-center gap-2 font-black text-sm md:text-base">
                        <AlertTriangle size={18} />
                        <span>水が止まらない・大量に漏れている場合は今すぐ電話！</span>
                    </div>
                    <a href="tel:0547-46-4130" className="bg-white text-red-600 font-black px-6 py-2 rounded-full text-base md:text-lg tracking-wide flex items-center gap-2 hover:bg-red-50 transition-colors active:scale-95">
                        <Phone size={18} />
                        0547-46-4130
                    </a>
                </div>
            </div>

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* 当番店について */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200/40 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-start gap-4 md:gap-6">
                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0">
                                <Wrench className="w-7 h-7 md:w-8 md:h-8 text-cyan-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-4 md:mb-6">当番店とは</h2>
                                <ul className="space-y-3">
                                    {[
                                        '「宅内漏水修理当番店」とは、宅地内（お客様の敷地内）の水道管の漏水修理に対応する、当企業団の指定給水装置工事事業者のうち当番制で対応する業者のことです。',
                                        '夜間・休日でも対応できる業者を輪番制で指名しており、急な漏水でもご相談いただけます。',
                                        '宅地内の修理費用はお客様のご負担となります。修理前に費用の目安を確認されることをおすすめします。',
                                        '道路上の漏水は企業団が対応します。お気軽に企業団（0547-46-4130）へご連絡ください。',
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <ChevronRight size={16} className="text-primary-main mt-0.5 shrink-0" />
                                            <p className="text-text-sub text-sm md:text-base leading-relaxed">{text}</p>
                                        </li>
                                    ))}
                                </ul>

                                {/* 当番店 vs 指定工事店の違い */}
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="bg-cyan-600 rounded-xl p-4 text-white">
                                        <p className="font-black text-sm mb-1">🔧 当番店（このページ）</p>
                                        <p className="text-xs text-white/80 leading-relaxed">夜間・休日対応の輪番制業者。急な漏水はまずこちら。</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                                        <p className="font-black text-sm mb-1 text-primary-deep">📋 指定工事店（全業者）</p>
                                        <p className="text-xs text-text-sub leading-relaxed">全指定工事店の一覧。「急ぎではない工事相談」はこちら。</p>
                                        <Link href="/business/designated-shops" className="inline-flex items-center gap-1 text-[10px] font-black text-primary-main mt-2 hover:underline">
                                            一覧を見る <ChevronRight size={10} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* PDF一覧 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-2xl font-black text-primary-deep">当番店一覧（PDF）</h2>
                        </div>
                        <div className="space-y-3">
                            {pdfLinks.map((shop, i) => (
                                <a
                                    key={i}
                                    href={shop.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center space-x-3 p-6 rounded-2xl border-2 transition-all group ${shop.color.replace('bg-', 'border-').replace('text-', 'hover:bg-').replace('hover:bg-', 'hover:border-')} bg-white shadow-sm hover:shadow-premium`}
                                >
                                    <div className={`${shop.color} text-white p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                                        {shop.icon}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-text-sub text-xs font-bold leading-none mb-1">{shop.year} 当番店</p>
                                        <p className="text-primary-deep font-black text-lg">一覧を表示 (PDF)</p>
                                    </div>
                                    <ArrowUpRight size={20} className="text-slate-300 group-hover:text-primary-main transition-colors ml-auto" />
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-slate-400 mt-4">
                            ※ 指定工事店の一覧（全業者）は
                            <Link href="/business/designated-shops" className="text-primary-main underline underline-offset-2 ml-1">指定工事店一覧ページ</Link>
                            をご覧ください。
                        </p>
                    </motion.div>

                    {/* 関連リンク */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link href="/resident/trouble" className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-glow hover:border-primary-main/20 transition-all group">
                            <div>
                                <p className="font-black text-primary-deep text-sm md:text-base">水道トラブル対処法も確認する</p>
                                <p className="text-xs text-slate-400 mt-1">漏水・凍結・水が出ないときの対処法</p>
                            </div>
                            <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
