"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Gauge, AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function MeterExchangePage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="水道メーターの定期交換"
                subtitle="正確な計量と安全な給水のため、計量法に基づき8年ごとに水道メーターを交換しています。"
                enTitle="Meter Exchange"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
                {/* 概要セクション */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-secondary-vibrant/20 rounded-2xl">
                                <Gauge className="w-8 h-8 text-primary-deep" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-primary-deep">定期交換の目的</h2>
                        </div>
                        <p className="text-text-sub leading-relaxed md:text-lg mb-8">
                            水道メーターは、ご家庭で使用された水量を正確に計量するための大切な機器です。計量法により、水道メーターの有効期間は<strong>8年間</strong>と定められています。大井上水道企業団では、有効期間が満了する前に、順次新しいメーターへの交換作業を無料で実施しています。
                        </p>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
                            <h3 className="font-bold text-primary-main mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                皆様へのお願い
                            </h3>
                            <ul className="space-y-3 text-sm md:text-base text-text-sub">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-vibrant mt-2 shrink-0" />
                                    <span>メーターボックスの上には車や物を置かないでください。</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-vibrant mt-2 shrink-0" />
                                    <span>ボックス内は泥や水が入らないよう、いつもきれいにしておいてください。</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-vibrant mt-2 shrink-0" />
                                    <span>犬は出入り口やメーターボックスから離して繋いでください。</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </section>

                {/* 交換作業について */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-secondary-vibrant/20 rounded-2xl">
                                <Calendar className="w-8 h-8 text-primary-deep" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-primary-deep">交換作業の流れ</h2>
                        </div>

                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                            {[
                                { title: "事前のお知らせ", desc: "交換対象となるご家庭には、事前にハガキ等で「水道メーター交換のお知らせ」を送付いたします。" },
                                { title: "訪問・交換作業", desc: "企業団が委託した指定給水装置工事事業者がお伺いし、作業を行います。作業中（15分〜30分程度）は水道がご使用になれません。" },
                                { title: "作業完了", desc: "お留守の場合でも敷地内に入らせていただき、作業を実施いたします。完了後には「交換完了のお知らせ」をポスト等に投函します。" }
                            ].map((step, idx) => (
                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-main text-white font-black text-sm absolute left-0 md:left-1/2 -translate-x-1/2 z-10 shadow-sm">
                                        {idx + 1}
                                    </div>
                                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 bg-slate-50 p-6 rounded-2xl border border-slate-100 group-hover:border-primary-main/20 group-hover:shadow-soft transition-all">
                                        <h4 className="font-black text-primary-deep mb-2">{step.title}</h4>
                                        <p className="text-sm text-text-sub leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 注意事項 */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-amber-50 p-8 md:p-12 rounded-3xl border border-amber-200/50"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <AlertTriangle className="w-8 h-8 text-amber-600" />
                            <h2 className="text-xl md:text-2xl font-black text-amber-900">ご注意ください</h2>
                        </div>
                        <ul className="space-y-4 text-amber-900/80 text-sm md:text-base">
                            <li className="flex gap-3">
                                <span className="shrink-0">•</span>
                                <span>水道メーターの交換費用をお客様に請求することは<strong>絶対にありません。</strong></span>
                            </li>
                            <li className="flex gap-3">
                                <span className="shrink-0">•</span>
                                <span>委託業者は、必ず企業団が発行した「身分証明書」を携帯し、腕章を着用しています。不審に思われた場合は身分証明書の提示を求めるか、企業団へお問い合わせください。</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="shrink-0">•</span>
                                <span>交換作業後、使い始めに空気や濁り水が出ることがあります。その場合は、少し水を出して濁りが取れてからご使用ください。（※濁り水の場合は浄水器などを通さないでください）</span>
                            </li>
                        </ul>
                    </motion.div>
                </section>

                <div className="text-center pt-8 border-t border-slate-100">
                    <p className="text-text-sub mb-6">ご不明な点がございましたら、お気軽にお問い合わせください。</p>
                    <Link href="/about/outline#access" className="inline-flex items-center justify-center px-8 py-4 bg-primary-main hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
                        企業団へのお問い合わせはこちら
                    </Link>
                </div>
            </div>
        </div>
    );
}
