"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { AlertOctagon, Droplets, ShieldAlert, XCircle } from 'lucide-react';

export default function CrossConnectionPage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="クロスコネクションの禁止"
                subtitle="水道水とそれ以外の水（井戸水や農業用水など）の配管を直接接続することは法律で固く禁止されています。"
                enTitle="Cross Connection"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">

                {/* 警告メッセージ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-red-50 border-l-4 border-red-500 p-6 md:p-8 rounded-r-2xl"
                >
                    <div className="flex items-center gap-3 text-red-700 font-black text-xl mb-4">
                        <AlertOctagon className="w-6 h-6" />
                        <h2>重要：水道法により禁止されています</h2>
                    </div>
                    <p className="text-red-900/80 leading-relaxed text-sm md:text-base">
                        大井上水道企業団が供給する「水道水（上水道）」の給水管と、「井戸水」「農業用水」「工業用水」などの配管を直接つなぐことを『クロスコネクション』といいます。
                        バルブや逆止弁を設けて切り替えて使用する場合であっても、クロスコネクションに該当し、<strong>水道法等により固く禁止されています。</strong>
                    </p>
                </motion.div>

                {/* 禁止されている理由 */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                            <ShieldAlert className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-primary-deep">なぜクロスコネクションはダメなの？</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                        >
                            <h3 className="text-lg font-black text-primary-deep mb-3 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm">1</span>
                                水質汚染の危険性
                            </h3>
                            <p className="text-text-sub text-sm leading-relaxed">
                                バルブの閉め忘れや故障などにより、井戸水などが水道本管（配水管）に逆流する恐れがあります。もし逆流した場合、周辺地域一帯の水道水が汚染され、<strong>甚大な健康被害</strong>を及ぼす大事故につながります。
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                        >
                            <h3 className="text-lg font-black text-primary-deep mb-3 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm">2</span>
                                莫大な損害賠償
                            </h3>
                            <p className="text-text-sub text-sm leading-relaxed">
                                上記のような水質汚染事故が発生した場合、汚染水域の管洗浄費用や、被害に遭われた方への給水対策費用など、<strong>多額の損害賠償を請求される</strong>ことになります。
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:col-span-2"
                        >
                            <h3 className="text-lg font-black text-primary-deep mb-3 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm">3</span>
                                水道料金の高額請求
                            </h3>
                            <p className="text-text-sub text-sm leading-relaxed">
                                反対に、水道水が井戸水等の配管に流れ込んでしまった場合、気づかないうちに大量の水道水が漏水し、<strong>高額な水道料金が請求される</strong>場合があります。この場合、料金の減免措置は適用されません。
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* 発見した場合の措置 */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 p-8 rounded-3xl border border-slate-200"
                    >
                        <h2 className="text-xl md:text-2xl font-black text-primary-deep mb-4">クロスコネクションが判明した場合</h2>
                        <p className="text-text-sub mb-6 leading-relaxed">
                            企業団では、安全な水道水の供給を守るため、厳格な措置をとらせていただきます。
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                                <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                                <div>
                                    <span className="font-bold text-primary-deep block mb-1">給水の停止措置</span>
                                    <span className="text-sm text-text-sub">クロスコネクションが確認された場合、管の切り離しが確認されるまでの間、直ちに<strong>給水を停止</strong>します。（大井上水道企業団給水条例に基づく措置）</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                                <Droplets className="w-6 h-6 text-blue-500 shrink-0" />
                                <div>
                                    <span className="font-bold text-primary-deep block mb-1">ご自身での費用負担</span>
                                    <span className="text-sm text-text-sub">水道管との切り離し工事にかかる費用は、すべて<strong>お客様のご負担</strong>となります。</span>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-8 p-4 bg-yellow-50 rounded-xl text-sm text-yellow-800 flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                            <span className="text-3xl shrink-0">🙏</span>
                            <p>
                                過去に設置された配管で、「直接つながっているかどうかわからない」等ご不安な場合は、指定給水装置工事事業者へ調査・配管の切り離し（有料）をご依頼ください。
                            </p>
                        </div>
                    </motion.div>
                </section>

            </div>
        </div>
    );
}
