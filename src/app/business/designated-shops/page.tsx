"use client";

import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight, Phone, Search, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { getPublicDocuments, PublicDocument } from '@/lib/microcms';

export default function DesignatedShopsPage() {
    const [documents, setDocuments] = useState<PublicDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // '指定工事店' カテゴリのドキュメントを取得
        getPublicDocuments('指定工事店').then((data) => {
            setDocuments(data);
            setLoading(false);
        });
    }, []);
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="指定工事店一覧"
                subtitle="当企業団の指定給水装置工事事業者の一覧です。"
                enTitle="Designated Contractors"
            />

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* 指定工事店について */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200/40 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-start gap-4 md:gap-6">
                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm shrink-0">
                                <Search className="w-7 h-7 md:w-8 md:h-8 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-4 md:mb-6">指定工事店（指定給水装置工事事業者）とは</h2>
                                <ul className="space-y-3">
                                    {[
                                        '水道法に基づき、給水装置工事を適正に施工できる者として、水道事業者（当企業団）に指定を受けた事業者です。',
                                        '水道の新設・改造・修理・撤去などの給水装置工事は、必ず指定給水装置工事事業者に依頼してください。',
                                        '指定を受けていない業者が行った工事で事故が起きた場合、費用の補償等ができないことがあります。',
                                        '一覧の内容は定期的に更新されます。最新版のPDFをご確認ください。',
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
                            <h2 className="text-xl md:text-2xl font-black text-primary-deep">指定工事店一覧（PDF）</h2>
                        </div>
                        <div className="space-y-3">
                            {loading ? (
                                <div className="space-y-3">
                                    <div className="h-24 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                                    <div className="h-24 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                                </div>
                            ) : documents.length > 0 ? (
                                documents.map((doc, idx) => {
                                    const pdfUrl = doc.pdfFile?.url || doc.pdfUrl || '#';
                                    const isLatest = doc.isLatest !== false && idx === 0;

                                    return (
                                        <a
                                            key={doc.id || idx}
                                            href={pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-between p-4 md:p-5 rounded-2xl transition-all group border ${
                                                isLatest 
                                                    ? 'bg-slate-50 hover:bg-primary-main/5 border-slate-100 hover:border-primary-main/20' 
                                                    : 'bg-slate-50 border-slate-100 opacity-80 hover:opacity-100'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-xl ${isLatest ? 'bg-primary-main/10' : 'bg-slate-200/60'}`}>
                                                    <FileText size={18} className={isLatest ? 'text-primary-main' : 'text-slate-500'} />
                                                </div>
                                                <div>
                                                    <p className={`font-black text-sm md:text-base ${isLatest ? 'text-primary-deep' : 'text-slate-500'}`}>
                                                        {doc.title}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-0.5">
                                                        PDF　更新：{new Date(doc.publishedAt || doc.createdAt || Date.now()).toLocaleDateString('ja-JP')}
                                                        {!isLatest && '　※最新版ではありません'}
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className={`${isLatest ? 'text-primary-main/40 group-hover:text-primary-main' : 'text-slate-300 group-hover:text-slate-500'} group-hover:translate-x-1 transition-all`} />
                                        </a>
                                    );
                                })
                            ) : (
                                // MicroCMSに一つも登録されていない場合のフォールバック
                                <>
                                    <a
                                        href="http://www.ooijousuidoukigyoudan.or.jp/R08_Jan_siteikoujiten(2).pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-primary-main/5 border border-slate-100 hover:border-primary-main/20 rounded-2xl transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary-main/10 p-2 rounded-xl">
                                                <FileText size={18} className="text-primary-main" />
                                            </div>
                                            <div>
                                                <p className="font-black text-primary-deep text-sm md:text-base">指定工事店一覧（令和8年1月更新版）</p>
                                                <p className="text-xs text-slate-400 mt-0.5">PDF　更新：R08.01.14</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all" />
                                    </a>
                                    <a
                                        href="http://www.ooijousuidoukigyoudan.or.jp/R06_Oct_siteikoujiten.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 md:p-5 bg-slate-50 hover:bg-primary-main/5 border border-slate-100 hover:border-primary-main/20 rounded-2xl transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-200/60 p-2 rounded-xl">
                                                <FileText size={18} className="text-slate-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-500 text-sm md:text-base">指定工事店一覧（令和6年10月更新版）</p>
                                                <p className="text-xs text-slate-400 mt-0.5">PDF　更新：R06.11.01　※最新版ではありません</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                                    </a>
                                </>
                            )}
                        </div>

                    </motion.div>

                    {/* 申請・お問い合わせ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-br from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-glow-lg"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.1),transparent)]" />
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-3xl font-black mb-3">指定に関するお問い合わせ</h3>
                            <p className="text-white/60 text-sm md:text-base mb-6">指定申請・更新等については企業団工務係までお問い合わせください。</p>
                            <a
                                href="tel:0547-46-4130"
                                className="btn-shine inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-base md:text-lg shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
                            >
                                <Phone size={18} className="inline-block mr-1 -mt-0.5" />0547-46-4130（工務係）</a>
                            <p className="mt-4 text-white/40 text-xs">平日 8:30〜17:15（土日祝・年末年始を除く）</p>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
