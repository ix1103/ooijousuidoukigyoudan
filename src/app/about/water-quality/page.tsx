"use client";

import React from 'react';
import { Droplets, FlaskConical, FileText, Download, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';

export default function WaterQualityPage() {
    const plans = [
        { label: '令和8年度 水質検査計画（案）', href: 'http://www.ooijousuidoukigyoudan.or.jp/r8suisitukeikakuan.pdf' },
        { label: '令和7年度 水質検査計画', href: 'http://www.ooijousuidoukigyoudan.or.jp/r7suishitsukeikaku.pdf' },
    ];

    const standardResults = [
        { year: '令和7年度上半期', href: 'http://www.ooijousuidoukigyoudan.or.jp/r7suisitukensakekkakamiki.pdf' },
        { year: '令和6年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r6suishitukekka.pdf' },
        { year: '令和5年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r5suishitukekka.pdf' },
        { year: '令和4年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/R4suishitukekka.pdf' },
        { year: '令和3年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/R3suishitukekka.pdf' },
        { year: '令和2年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r2suisitsukekka.pdf' },
    ];

    const managementResults = [
        { year: '令和7年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r7mokuhyoukanrikekka.pdf' },
        { year: '令和6年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r6mokuhyoukanrikekka.pdf' },
        { year: '令和5年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r5mokuhyoukanrikekka.pdf' },
        { year: '令和4年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r4mokuhyoukanrikekka.pdf' },
        { year: '令和3年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r3mokuhyoukanrikekka.pdf' },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="水質情報"
                subtitle="大井上水道企業団が供給する水道水の水質検査計画や検査結果をご案内します。"
                enTitle="Water Quality"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">
                {/* イントロ・水質検査について */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[3rem] flex items-center justify-center p-12 overflow-hidden shadow-premium border border-blue-100">
                            <Droplets className="absolute w-full h-full text-primary-deep/5" strokeWidth={1} />
                            <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-soft-xl max-w-sm">
                                <FlaskConical size={48} className="text-primary-main mb-6" />
                                <p className="text-primary-deep font-black text-xl md:text-2xl leading-tight mb-4">
                                    安全・安心な<br />水道水をお届け
                                </p>
                                <div className="flex items-center gap-2 text-primary-main font-bold text-sm bg-primary-main/10 px-4 py-2 rounded-full">
                                    <CheckCircle2 size={16} />
                                    基準適合確認済み
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-3xl font-black text-primary-deep">水質検査の実施について</h2>
                        </div>
                        <p className="text-text-sub text-sm md:text-lg leading-relaxed md:leading-loose mb-8">
                            当企業団では、水道法に基づき定期的な水質検査を実施し、国が定める水質基準に適合した安全な水道水を供給しています。
                            年間の水質検査計画に基づき、採水・検査・結果公表を行い、皆様に安心してご利用いただける水道水の確保に努めています。
                        </p>
                        <div className="space-y-4">
                            {[
                                { label: '検査項目', value: '水質基準51項目（法定）＋水質管理目標設定項目' },
                                { label: '検査機関', value: '厚生労働大臣登録水質検査機関等に委託' },
                                { label: '情報公開', value: '当ウェブページなどで検査計画・結果を随時公表' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 border border-slate-100/50 rounded-2xl gap-3">
                                    <span className="text-xs font-black text-primary-main bg-white px-4 py-1.5 rounded-full w-fit uppercase tracking-widest shadow-sm">{item.label}</span>
                                    <p className="font-bold text-primary-deep text-sm md:text-base">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 各種PDFダウンロードセクション */}
                <section className="bg-slate-50 p-8 md:p-16 rounded-[2rem] md:rounded-[3.5rem] border border-slate-100 shadow-soft-xl">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-black text-primary-deep mb-4">水質検査に関する公表資料</h2>
                        <p className="text-text-sub text-sm md:text-base">
                            「水質検査計画」や「水質検査結果」のPDFファイルをダウンロードしてご覧いただけます。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* 左カラム：検査計画 */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-primary-deep mb-6 flex items-center gap-3">
                                    <FileText className="text-secondary-vibrant" size={28} />
                                    水質検査計画
                                </h3>
                                <div className="space-y-3">
                                    {plans.map((plan, idx) => (
                                        <a
                                            key={idx}
                                            href={plan.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-main/30 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary-main/5 flex items-center justify-center text-primary-main group-hover:bg-primary-main group-hover:text-white transition-colors">
                                                    <Download size={18} />
                                                </div>
                                                <span className="font-bold text-primary-deep group-hover:text-primary-main transition-colors text-sm md:text-base">
                                                    {plan.label}
                                                </span>
                                            </div>
                                            <ChevronRight className="text-slate-300 group-hover:text-primary-main group-hover:translate-x-1 transition-all" size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-primary-deep mb-6 flex items-center gap-3">
                                    <FileText className="text-secondary-vibrant" size={28} />
                                    水質管理目標設定項目
                                </h3>
                                <div className="space-y-3">
                                    {managementResults.map((doc, idx) => (
                                        <a
                                            key={idx}
                                            href={doc.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-main/30 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary-main/5 flex items-center justify-center text-primary-main group-hover:bg-primary-main group-hover:text-white transition-colors">
                                                    <Download size={18} />
                                                </div>
                                                <span className="font-bold text-primary-deep group-hover:text-primary-main transition-colors text-sm md:text-base">
                                                    水質管理目標設定項目 （{doc.year}）
                                                </span>
                                            </div>
                                            <ChevronRight className="text-slate-300 group-hover:text-primary-main group-hover:translate-x-1 transition-all" size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 右カラム：検査結果 */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-primary-deep mb-6 flex items-center gap-3">
                                <FileText className="text-secondary-vibrant" size={28} />
                                水質基準項目 検査結果
                            </h3>
                            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-main/5 rounded-full blur-3xl" />
                                <div className="relative z-10 space-y-3">
                                    {standardResults.map((doc, idx) => (
                                        <a
                                            key={idx}
                                            href={doc.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-secondary-vibrant/10 flex items-center justify-center text-secondary-vibrant group-hover:bg-secondary-vibrant group-hover:text-primary-deep transition-colors">
                                                    <Download size={16} />
                                                </div>
                                                <span className="font-bold text-primary-deep group-hover:text-primary-main transition-colors text-sm md:text-base">
                                                    {doc.year} 検査結果
                                                </span>
                                            </div>
                                            <ChevronRight className="text-slate-300 group-hover:text-primary-main group-hover:translate-x-1 transition-all" size={18} />
                                        </a>
                                    ))}
                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <p className="text-xs text-text-sub leading-relaxed">
                                            ※ 旧年度（平成30年度以前）のデータは省略して表示しております。<br />
                                            過去のデータについては、企業団窓口までお問い合わせください。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
