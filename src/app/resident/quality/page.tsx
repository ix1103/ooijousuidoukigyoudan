"use client";

import React, { useState, useEffect } from 'react';
import { Droplets, Shield, ClipboardCheck, Building2, ChevronRight, AlertTriangle, CheckCircle2, ArrowUpRight, FileText, Download, FlaskConical } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { PageHeader } from '@/components/PageHeader';
import { getPublicDocuments, PublicDocument } from '@/lib/microcms';
import { ROUTES } from '@/constants/routes';

export default function WaterQualityPage() {
    const [documents, setDocuments] = useState<PublicDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublicDocuments('水質').then((data) => {
            setDocuments(data);
            setLoading(false);
        });
    }, []);

    const plansFallback = [
        { label: '令和8年度 水質検査計画（案）', href: 'http://www.ooijousuidoukigyoudan.or.jp/r8suisitukeikakuan.pdf' },
        { label: '令和7年度 水質検査計画', href: 'http://www.ooijousuidoukigyoudan.or.jp/r7suishitsukeikaku.pdf' },
    ];

    const standardResultsFallback = [
        { year: '令和7年度上半期', href: 'http://www.ooijousuidoukigyoudan.or.jp/r7suisitukensakekkakamiki.pdf' },
        { year: '令和6年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r6suishitukekka.pdf' },
        { year: '令和5年度', href: 'http://www.ooijousuidoukigyoudan.or.jp/r5suishitukekka.pdf' },
    ];

    const plans = loading ? [] : (documents.filter(d => d.category.includes('水質検査計画')).length > 0 ? documents.filter(d => d.category.includes('水質検査計画')) : plansFallback);
    const standardResults = loading ? [] : (documents.filter(d => d.category.includes('水質検査結果')).length > 0 ? documents.filter(d => d.category.includes('水質検査結果')) : standardResultsFallback);

    // 主な水質基準項目
    const qualityStandards = [
        { item: '一般細菌', standard: '100個/mL以下', category: '健康' },
        { item: '大腸菌', standard: '検出されないこと', category: '健康' },
        { item: '鉛及びその化合物', standard: '0.01mg/L以下', category: '健康' },
        { item: '水銀及びその化合物', standard: '0.0005mg/L以下', category: '健康' },
        { item: 'ヒ素及びその化合物', standard: '0.01mg/L以下', category: '健康' },
        { item: 'フッ素及びその化合物', standard: '0.8mg/L以下', category: '健康' },
        { item: '塩素酸', standard: '0.6mg/L以下', category: '健康' },
        { item: '臭気強度（TON）', standard: '3以下', category: '性状' },
        { item: '色度', standard: '5度以下', category: '性状' },
        { item: '濁度', standard: '2度以下', category: '性状' },
        { item: 'pH値', standard: '5.8～8.6', category: '性状' },
        { item: '残留塩素', standard: '0.1mg/L以上', category: '管理' },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="水質情報"
                subtitle="大井上水道企業団では、厳しい水質基準に基づき、毎日安全な水をお届けしています。"
                enTitle="Water Quality"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* 水質検査の概要 */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {[
                        { icon: <Shield size={28} />, title: '水質基準項目', count: '51項目', desc: '人の飲用・生活利用に必須の検査項目です。すべて基準値を満たしています。' },
                        { icon: <ClipboardCheck size={28} />, title: '毎日検査', count: '3項目', desc: '色・濁り・残留塩素を毎日検査し、異常がないことを確認しています。' },
                        { icon: <Droplets size={28} />, title: '管理目標設定項目', count: '27項目', desc: '将来にわたる安全性のため、追加で監視している項目です。' },
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="text-primary-main bg-primary-main/5 p-3 md:p-4 rounded-xl w-fit mb-4 md:mb-6">
                                {card.icon}
                            </div>
                            <p className="text-3xl md:text-4xl font-black text-primary-deep mb-2">{card.count}</p>
                            <h3 className="text-base md:text-lg font-black text-primary-deep mb-3">{card.title}</h3>
                            <p className="text-text-sub text-xs md:text-sm leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                </section>

                {/* 公表資料ダウンロード (旧 /about/water-quality の機能) */}
                <section className="bg-slate-50 p-8 md:p-16 rounded-[2rem] md:rounded-[3.5rem] border border-slate-100 shadow-soft-xl">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-black text-primary-deep mb-4">水質検査資料</h2>
                        <p className="text-text-sub text-sm md:text-base">
                            「水質検査計画」や「水質検査結果」のPDFファイルを公開しています。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-primary-deep mb-6 flex items-center gap-3">
                                <FileText className="text-secondary-vibrant" size={28} />
                                水質検査計画
                            </h3>
                            <div className="space-y-3">
                                {loading ? (
                                    <div className="h-16 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                                ) : plans.map((plan: any, idx) => (
                                    <a
                                        key={plan.id || idx}
                                        href={(plan as PublicDocument).pdfFile?.url || plan.pdfUrl || plan.href || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-main/30 transition-all duration-300 gap-3"
                                    >
                                        <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                                            <div className="w-10 h-10 shrink-0 rounded-full bg-primary-main/5 flex items-center justify-center text-primary-main group-hover:bg-primary-main group-hover:text-white transition-colors">
                                                <Download size={18} />
                                            </div>
                                            <span className="font-bold text-primary-deep group-hover:text-primary-main transition-colors text-sm md:text-base truncate">
                                                {plan.title || plan.label}
                                            </span>
                                        </div>
                                        <ChevronRight className="hidden sm:block text-slate-300 group-hover:text-primary-main group-hover:translate-x-1 transition-all shrink-0" size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-primary-deep mb-6 flex items-center gap-3">
                                <FileText className="text-secondary-vibrant" size={28} />
                                水質基準項目 検査結果
                            </h3>
                            <div className="space-y-3">
                                {loading ? (
                                    <div className="h-16 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                                ) : standardResults.map((doc: any, idx) => (
                                    <a
                                        key={doc.id || idx}
                                        href={(doc as PublicDocument).pdfFile?.url || doc.pdfUrl || doc.href || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-main/30 transition-all duration-300 gap-3"
                                    >
                                        <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
                                            <div className="w-10 h-10 shrink-0 rounded-full bg-secondary-vibrant/10 flex items-center justify-center text-secondary-vibrant group-hover:bg-secondary-vibrant group-hover:text-primary-deep transition-colors">
                                                <Download size={18} />
                                            </div>
                                            <span className="font-bold text-primary-deep group-hover:text-primary-main transition-colors text-sm md:text-base truncate">
                                                {doc.title || `${doc.year} 検査結果`}
                                            </span>
                                        </div>
                                        <ChevronRight className="hidden sm:block text-slate-300 group-hover:text-primary-main group-hover:translate-x-1 transition-all shrink-0" size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 主な水質基準テーブル */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Quality Standards</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-4 md:mb-6">主な水質基準項目</h2>
                    <p className="text-text-sub text-sm md:text-base mb-8 md:mb-12">水道法に基づく51項目の基準のうち、代表的なものを掲載しています。</p>

                    <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-primary-deep text-white">
                                        <th className="px-6 py-4 text-sm font-black">検査項目</th>
                                        <th className="px-6 py-4 text-sm font-black">基準値</th>
                                        <th className="px-6 py-4 text-sm font-black">分類</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {qualityStandards.map((row, idx) => (
                                        <tr key={idx} className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                            <td className="px-6 py-4 text-sm font-bold text-primary-deep">{row.item}</td>
                                            <td className="px-6 py-4 text-sm text-text-sub font-bold">{row.standard}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-full ${row.category === '健康' ? 'bg-red-50 text-red-600' :
                                                    row.category === '性状' ? 'bg-blue-50 text-blue-600' :
                                                        'bg-green-50 text-green-600'
                                                    }`}>
                                                    {row.category}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* 受水槽の管理 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Tank Management</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-4 md:mb-6">受水槽の管理について</h2>
                    <p className="text-text-sub text-sm md:text-base mb-8 md:mb-12">
                        マンションやビルなどで受水槽を設置している場合、設置者による適切な管理が必要です。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-black text-primary-deep mb-4 flex items-center gap-2">
                                <Building2 size={24} className="text-primary-main" />
                                設置者の義務
                            </h3>
                            <ul className="space-y-3 text-sm text-text-sub">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary-main rounded-full mt-1.5 shrink-0" />
                                    <span>受水槽の掃除（1年以内ごとに1回）</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary-main rounded-full mt-1.5 shrink-0" />
                                    <span>水槽の点検（蓋の施錠、有害物の混入防止）</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary-main rounded-full mt-1.5 shrink-0" />
                                    <span>水質の点検（蛇口の水の異常確認）</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
                            <h3 className="text-lg font-black text-amber-900 mb-4 flex items-center gap-2">
                                <AlertTriangle size={24} className="text-amber-600" />
                                法定検査
                            </h3>
                            <p className="text-sm text-amber-800 leading-relaxed mb-4">
                                有効容量が10立方メートルを超える受水槽（簡易専用水道）は、水道法により年1回の定期検査が義務付けられています。
                            </p>
                            <Link href={ROUTES.RESIDENT.PROCEDURE} className="text-amber-900 font-bold text-sm underline hover:text-amber-700">
                                届出・手続きについてはこちら
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
