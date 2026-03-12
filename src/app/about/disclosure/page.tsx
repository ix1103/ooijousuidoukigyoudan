"use client";

import React, { useState, useEffect } from 'react';
import { FileText, Download, ChevronRight, BookOpen, Calculator, ShieldCheck, Users, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { getPublicDocuments, PublicDocument } from '@/lib/microcms';

export default function DisclosurePage() {
    const [documents, setDocuments] = useState<PublicDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublicDocuments('公表資料').then((data) => {
            setDocuments(data);
            setLoading(false);
        });
    }, []);

    const categoriesDefinition = [
        {
            title: '事業計画・経営戦略',
            icon: <BookOpen className="text-secondary-vibrant" size={28} />,
            description: '大井上水道企業団の将来に向けた事業理念や中長期的な経営戦略に関する資料です。',
            fallbackItems: [
                { label: '大井上水道ビジョン', href: 'http://www.ooijousuidoukigyoudan.or.jp/water_vision.pdf' },
                { label: '大井上水道企業団 経営戦略2020', href: 'http://www.ooijousuidoukigyoudan.or.jp/2020keieisenryaku.pdf' },
                { label: '大井上水道企業団経営比較分析表（令和4年度決算）', href: 'http://www.ooijousuidoukigyoudan.or.jp/36oijyosui_suido_2023.pdf' },
                { label: '類似団体との経営比較分析表', href: 'http://www.ooijousuidoukigyoudan.or.jp/R06suiitokibo.pdf' },
            ]
        },
        {
            title: '災害・インフラ対策（耐震化）',
            icon: <ShieldCheck className="text-secondary-vibrant" size={28} />,
            description: '安全で安定した給水を維持するための、施設の耐震化に関する計画および重要管路図です。',
            fallbackItems: [
                { label: '管路の耐震化計画', href: 'http://www.ooijousuidoukigyoudan.or.jp/taisin-R05.pdf' },
                { label: '上下水道耐震化計画', href: 'http://www.ooijousuidoukigyoudan.or.jp/R7taishinkakeikaku.pdf' },
                { label: '重要管路図（A3版）', href: 'http://www.ooijousuidoukigyoudan.or.jp/R7juuyoukanrozu.pdf' },
            ]
        },
        {
            title: '予算・決算情報',
            icon: <Calculator className="text-secondary-vibrant" size={28} />,
            description: '企業団の毎年度の予算案や決算状況を公開し、透明性のある経営に努めています。',
            fallbackItems: [
                { label: '令和7年度 予算書等', href: 'http://www.ooijousuidoukigyoudan.or.jp/FYR7yosansyo.pdf' },
                { label: '令和6年度 予算書等', href: 'http://www.ooijousuidoukigyoudan.or.jp/R6yosan.pdf' },
                { label: '令和6年度 決算書等', href: 'http://www.ooijousuidoukigyoudan.or.jp/r6kesasn.pdf' },
                { label: '令和5年度 予算書等', href: 'http://www.ooijousuidoukigyoudan.or.jp/R5yosan.pdf' },
                { label: '令和5年度 決算書等', href: 'http://www.ooijousuidoukigyoudan.or.jp/R5kessan.pdf' },
                { label: '令和4年度 予算書等', href: 'http://www.ooijousuidoukigyoudan.or.jp/R4yosan.pdf' },
                { label: '令和4年度 決算書等', href: 'http://www.ooijousuidoukigyoudan.or.jp/R4kessan.pdf' },
                { label: '令和3年度 予算書等', href: 'http://www.ooijousuidoukigyoudan.or.jp/R3%201-3-1%20%20yosan.pdf' },
                { label: '令和3年度 決算書等', href: 'http://www.ooijousuidoukigyoudan.or.jp/R3kessan.pdf' },
            ]
        },
        {
            title: '人事・組織関連',
            icon: <Users className="text-secondary-vibrant" size={28} />,
            description: '職員の勤務環境向上や、透明性のある人事行政に関する情報を公表しています。',
            fallbackItems: [
                { label: '人事行政の運営等の状況の公表', href: 'http://www.ooijousuidoukigyoudan.or.jp/R6jinjijoukyou.pdf' },
                { label: '特定事業主行動計画', href: 'http://www.ooijousuidoukigyoudan.or.jp/tokukoudoukeikaku.pdf' },
                { label: '特定事業主行動計画の実施状況の公表', href: 'http://www.ooijousuidoukigyoudan.or.jp/R7tokuteijigyounusi.pdf' },
                { label: '職員の給与の男女の差異の情報の公表', href: 'http://www.ooijousuidoukigyoudan.or.jp/R7kyuuyosai.pdf' },
            ]
        },
        {
            title: '環境・情報セキュリティ',
            icon: <ShieldAlert className="text-secondary-vibrant" size={28} />,
            description: '地球環境への配慮に関する計画や、情報保護のための基本方針です。',
            fallbackItems: [
                { label: '大井上水道企業団 地球温暖化対策実行計画', href: 'http://www.ooijousuidoukigyoudan.or.jp/ondanka.pdf' },
                { label: '大井上水道企業団 情報セキュリティポリシー', href: 'http://www.ooijousuidoukigyoudan.or.jp/2025jouhousequrityporicy.pdf' },
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="公表資料"
                subtitle="事業計画、予算・決算、耐震化計画など、大井上水道企業団の各種公表資料をご案内します。"
                enTitle="Public Disclosure"
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-text-sub text-sm md:text-base leading-relaxed">
                        当企業団では、住民の皆様へ透明性のある事業運営をお約束するため、経営方針や水道事業に関する各種計画、並びに予算・決算などの重要な情報を積極的に公表しています。<br />
                        以下のリストからPDFファイル形式にてご確認いただけます。
                    </p>
                </div>

                <div className="space-y-12 md:space-y-16">
                    {categoriesDefinition.map((category, idx) => (
                        <motion.section
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                                {/* 左側タイトル */}
                                <div className="md:w-1/3 flex flex-col pt-2">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-white rounded-2xl shadow-sm inline-block shrink-0">
                                            {category.icon}
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black text-primary-deep leading-tight">
                                            {category.title}
                                        </h2>
                                    </div>
                                    <p className="text-text-sub text-sm leading-relaxed mb-6">
                                        {category.description}
                                    </p>
                                </div>

                                {/* 右側リンク一覧 */}
                                <div className="md:w-2/3 space-y-3">
                                    {loading ? (
                                        <div className="space-y-3">
                                            <div className="h-16 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                                            <div className="h-16 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                                        </div>
                                    ) : (() => {
                                        const cmsItems = documents.filter(doc => doc.category.includes(category.title));
                                        const displayItems = cmsItems.length > 0 
                                            ? cmsItems.map(d => ({ label: d.title, href: d.pdfFile?.url || d.pdfUrl || '#' })) 
                                            : category.fallbackItems;
                                            
                                        return displayItems.map((item, itemIdx) => (
                                            <a
                                                key={itemIdx}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-transparent shadow-sm hover:shadow-md hover:border-primary-main/20 transition-all duration-300 gap-3"
                                            >
                                                <div className="flex items-center gap-3 md:gap-4 flex-1 overflow-hidden">
                                                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary-main/5 flex items-center justify-center text-primary-main group-hover:bg-primary-main group-hover:text-white transition-colors">
                                                        <Download size={18} />
                                                    </div>
                                                    <span className="font-bold text-primary-deep group-hover:text-primary-main transition-colors text-sm md:text-base leading-snug truncate">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <div className="hidden sm:flex items-center text-xs text-text-sub font-bold px-3 py-1 bg-slate-50 rounded-full shrink-0">
                                                    <FileText size={12} className="mr-1.5" />
                                                    PDF
                                                </div>
                                                <ChevronRight className="hidden sm:block text-slate-300 group-hover:text-primary-main group-hover:translate-x-1 transition-all shrink-0" size={20} />
                                            </a>
                                        ));
                                    })()}
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </div>
    );
}
