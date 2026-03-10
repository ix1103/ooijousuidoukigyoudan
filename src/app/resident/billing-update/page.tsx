"use client";

import React from 'react';
import { FileText, Phone, ChevronRight, Info, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

// 改定前後の料金比較データ
const rateComparison = [
    {
        label: '13mm / 20mm（一般家庭）',
        oldRate: '1,650円',
        newRate: '1,815円',
        diff: '+165円',
        oldNote: '（基本16m³まで）',
        newNote: '（基本16m³まで）',
    },
    {
        label: '超過料金（1m³あたり）',
        oldRate: '141円',
        newRate: '155.1円',
        diff: '+14.1円',
        oldNote: '',
        newNote: '',
    },
    {
        label: '25mm',
        oldRate: '2,090円',
        newRate: '2,299円',
        diff: '+209円',
        oldNote: '',
        newNote: '',
    },
];

export default function BillingUpdatePage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="水道料金改定のお知らせ"
                subtitle="令和7年10月1日から水道料金を改定いたします。"
                enTitle="Rate Revision Notice"
            />

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* 改定の施行日バナー */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-6 md:p-8 text-white flex flex-col sm:flex-row items-center gap-4 shadow-glow"
                    >
                        <div className="bg-white/10 p-3 rounded-xl shrink-0">
                            <TrendingUp size={28} className="text-secondary-vibrant" />
                        </div>
                        <div>
                            <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-1">施行日</p>
                            <p className="text-xl md:text-2xl font-black">令和7年10月1日ご使用分（令和7年11月ご請求分）から</p>
                        </div>
                    </motion.div>

                    {/* 改定の背景・概要 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200/40 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-start gap-4 md:gap-6">
                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0">
                                <Info className="w-7 h-7 md:w-8 md:h-8 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-4 md:mb-6">改定の背景</h2>
                                <div className="space-y-3">
                                    {[
                                        '当企業団が管理する水道管の多くが高度経済成長期に布設されたもので、老朽化が進んでいます。',
                                        '大規模地震に備えた水道管の耐震化工事を計画的に進めるための財源が必要です。',
                                        '物価・エネルギーコストの上昇により、安定的な水道サービスの維持費用が増加しています。',
                                        '持続可能な水道サービスを将来にわたって提供し続けるため、適正な料金水準への改定が必要と判断しました。',
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <ChevronRight size={16} className="text-primary-main mt-0.5 shrink-0" />
                                            <p className="text-text-sub text-sm md:text-base leading-relaxed">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 料金改定 Before/After 比較表 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-2xl font-black text-primary-deep">主な改定内容（2ヶ月あたり・税込）</h2>
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-primary-deep text-white">
                                        <th className="text-left px-4 py-3 font-black text-xs md:text-sm">区分</th>
                                        <th className="text-center px-4 py-3 font-black text-xs md:text-sm">改定前</th>
                                        <th className="text-center px-4 py-3 font-black text-xs md:text-sm">改定後</th>
                                        <th className="text-center px-4 py-3 font-black text-xs md:text-sm text-secondary-vibrant">差額</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rateComparison.map((row, i) => (
                                        <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                            <td className="px-4 py-4 font-bold text-primary-deep text-xs md:text-sm">
                                                {row.label}
                                                {row.oldNote && <span className="block text-[10px] text-slate-400 font-normal mt-0.5">{row.oldNote}</span>}
                                            </td>
                                            <td className="px-4 py-4 text-center text-slate-500 text-xs md:text-sm line-through decoration-slate-400">{row.oldRate}</td>
                                            <td className="px-4 py-4 text-center font-black text-primary-deep text-xs md:text-sm">{row.newRate}</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="bg-amber-100 text-amber-700 font-black text-xs px-2 py-0.5 rounded-full">{row.diff}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-400 mt-3">※ 上記は代表的な口径のみ掲載。全口径の詳細は下記の公式資料をご確認ください。</p>
                    </motion.div>

                    {/* 関連書類ダウンロード */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-2xl font-black text-primary-deep">関連書類</h2>
                        </div>
                        <div className="space-y-3">
                            <a
                                href="http://www.ooijousuidoukigyoudan.or.jp/R7kaitei.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-primary-main/5 border border-slate-100 hover:border-primary-main/20 rounded-2xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary-main/10 p-2 rounded-xl">
                                        <FileText size={18} className="text-primary-main" />
                                    </div>
                                    <div>
                                        <p className="font-black text-primary-deep text-sm md:text-base">水道料金改定のお知らせ（令和7年度）詳細版</p>
                                        <p className="text-xs text-slate-400 mt-0.5">外部サイト（旧サイト）</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all" />
                            </a>
                            <Link
                                href="/about/council"
                                className="flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-primary-main/5 border border-slate-100 hover:border-primary-main/20 rounded-2xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary-main/10 p-2 rounded-xl">
                                        <ChevronRight size={18} className="text-primary-main" />
                                    </div>
                                    <div>
                                        <p className="font-black text-primary-deep text-sm md:text-base">水道料金等審議会について</p>
                                        <p className="text-xs text-slate-400 mt-0.5">料金改定の審議経緯・委員会情報</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* 新しい料金表への案内 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="bg-gradient-to-br from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-glow-lg">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.1),transparent)]" />
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-3xl font-black mb-3">改定後の料金を確認する</h3>
                                <p className="text-white/60 text-sm md:text-base mb-6">改定後の料金体系や手続きについては料金・手続きのページをご覧ください。</p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link
                                        href="/resident/price"
                                        className="btn-shine inline-flex items-center justify-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-base md:text-lg shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
                                    >
                                        水道料金・手続きページへ
                                        <ChevronRight size={20} />
                                    </Link>
                                    <a
                                        href="tel:0547-46-4130"
                                        className="inline-flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-black text-base md:text-lg hover:bg-white/20 transition-all active:scale-95"
                                    >
                                        <Phone size={18} />
                                        お電話で確認
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
