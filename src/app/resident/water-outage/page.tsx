"use client";

import React from 'react';
import { AlertTriangle, Radio, Phone, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export default function WaterOutagePage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="断水情報"
                subtitle={<>突発断水・計画断水の状況をお知らせします。<br />緊急の場合は <strong className="text-secondary-vibrant">0547-46-4130</strong> へご連絡ください。</>}
                enTitle="Water Outage"
            />

            {/* 緊急電話バナー */}
            <div className="bg-red-600 py-4 md:py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white text-center">
                    <div className="flex items-center gap-2 font-black text-sm md:text-base">
                        <AlertTriangle size={18} />
                        <span>道路上の漏水など緊急連絡は24時間受付中</span>
                    </div>
                    <a href="tel:0547-46-4130" className="bg-white text-red-600 font-black px-6 py-2 rounded-full text-base md:text-lg tracking-wide flex items-center gap-2 hover:bg-red-50 transition-colors active:scale-95">
                        <Phone size={18} />
                        0547-46-4130
                    </a>
                </div>
            </div>

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* 現在の断水状況 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/40 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-start gap-4 md:gap-6">
                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0">
                                <Radio className="w-7 h-7 md:w-8 md:h-8 text-green-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-2">現在の断水状況</h2>
                                <p className="text-text-sub text-sm md:text-base mb-4">
                                    現在、当企業団の管轄区域内において概ね50件以上に影響する断水は発生していません。
                                </p>
                                <p className="text-xs text-slate-400 mb-4">
                                    ※ 少規模な断水（工事に伴う一時的な断水など）については、事前に対象の方へ個別にご連絡いたします。
                                </p>
                                <Link href="/news" className="inline-flex items-center gap-2 text-xs font-black text-primary-main hover:underline">
                                    <ChevronRight size={14} />
                                    最新のお知らせ・断水情報はこちら
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* 断水情報の種類 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/40 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-start gap-4 md:gap-6">
                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0">
                                <Clock className="w-7 h-7 md:w-8 md:h-8 text-amber-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-4 md:mb-6">断水の種類について</h2>
                                <div className="space-y-4">
                                    <div className="bg-white/70 rounded-xl p-4 md:p-5">
                                        <h3 className="font-black text-primary-deep text-sm md:text-base mb-1">突発断水</h3>
                                        <p className="text-text-sub text-sm leading-relaxed">
                                            水道管の破損・事故などにより、予告なく発生する断水です。原因解消・復旧後、速やかにこのページおよびお知らせにてご連絡します。
                                        </p>
                                    </div>
                                    <div className="bg-white/70 rounded-xl p-4 md:p-5">
                                        <h3 className="font-black text-primary-deep text-sm md:text-base mb-1">計画断水</h3>
                                        <p className="text-text-sub text-sm leading-relaxed">
                                            水道施設の工事・点検などのために、事前に日時をお知らせして実施する断水です。事前に対象地域の方へご通知いたします。
                                        </p>
                                    </div>
                                    <div className="bg-white/70 rounded-xl p-4 md:p-5">
                                        <h3 className="font-black text-primary-deep text-sm md:text-base mb-1">停電に伴う断水</h3>
                                        <p className="text-text-sub text-sm leading-relaxed">
                                            台風・大規模災害による停電が発生した場合、浄水場・配水施設のポンプが停止し、断水が発生することがあります。
                                            非常用電源により一定時間の給水継続が可能ですが、停電が長引く場合は断水となります。
                                            このような場合も、速やかにお知らせにてご案内いたします。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 断水時の対応 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200/40 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-start gap-4 md:gap-6">
                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0">
                                <AlertTriangle className="w-7 h-7 md:w-8 md:h-8 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-4 md:mb-6">断水中の対応と備え</h2>
                                <ul className="space-y-3">
                                    {[
                                        '断水が予想される場合は、事前に浴槽や容器に水を確保してください。',
                                        '給水が再開されたとき、最初は赤水（さび・濁り水）が出ることがあります。しばらく流してからご使用ください。',
                                        '長時間断水が続く場合は、応急給水（給水車など）を行う場合があります。詳細はお知らせします。',
                                        '断水の原因が宅内（お客様の敷地内）の場合は、指定工事店にご依頼ください。',
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

                    {/* 関連リンク */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        <Link href="/resident/trouble" className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-glow hover:border-primary-main/20 transition-all group">
                            <div>
                                <p className="font-black text-primary-deep text-sm md:text-base">水道トラブル対処法</p>
                                <p className="text-xs text-slate-400 mt-1">漏水・凍結などの対処法</p>
                            </div>
                            <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all" />
                        </Link>
                        <Link href="/resident/repair-shops" className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-glow hover:border-primary-main/20 transition-all group">
                            <div>
                                <p className="font-black text-primary-deep text-sm md:text-base">宅内漏水修理当番店</p>
                                <p className="text-xs text-slate-400 mt-1">修理業者の一覧（PDF）</p>
                            </div>
                            <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* フッターバナー */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-br from-primary-deep via-primary-main to-primary-deep" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <AlertTriangle size={36} className="mx-auto mb-4 text-secondary-vibrant" />
                    <h2 className="text-2xl md:text-4xl font-black mb-4">お困りの場合はいつでも</h2>
                    <p className="text-white/60 mb-8 text-sm md:text-base">道路上の漏水など緊急の場合は24時間受け付けております。</p>
                    <a href="tel:0547-46-4130" className="btn-shine inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-lg md:text-xl shadow-glow hover:shadow-glow-lg transition-all active:scale-95">
                        <Phone size={22} />
                        0547-46-4130
                    </a>
                </div>
            </section>
        </div>
    );
}
