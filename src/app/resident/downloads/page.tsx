"use client";

import React from 'react';
import { FileText, ChevronRight, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

// ダウンロード書類の一覧データ
const downloadItems = [
    {
        category: '住民の皆様向け（お手続き）',
        desc: '引っ越し・名義変更・口座振替など各種お手続き書類です。',
        items: [
            {
                label: '水道使用開始・中止・名義変更申込書',
                href: 'http://www.ooijousuidoukigyoudan.or.jp/syoukai.html',
                note: '旧サイト（窓口でも配布）',
                updated: '随時',
            },
            {
                label: '口座振替依頼書',
                href: 'http://www.ooijousuidoukigyoudan.or.jp/syoukai.html',
                note: '旧サイト（窓口でも配布）',
                updated: '随時',
            },
            {
                label: '受水槽を設置しないことに関する誓約書',
                href: 'http://www.ooijousuidoukigyoudan.or.jp/jusuisou_seiyakusho.pdf',
                note: 'PDF',
                updated: 'R05.12.05',
            },
        ],
    },
    {
        category: '当番店・修理関係',
        desc: '宅内漏水修理に対応している当番店の一覧です。',
        items: [
            {
                label: '宅内漏水修理当番店一覧（令和7年度）',
                href: 'http://www.ooijousuidoukigyoudan.or.jp/FYR7_suidoutouban.pdf',
                note: 'PDF',
                updated: 'R07年度',
            },
            {
                label: '宅内漏水修理当番店一覧（令和8年度）',
                href: 'http://www.ooijousuidoukigyoudan.or.jp/FYR8toubanten.pdf',
                note: 'PDF',
                updated: 'R08年度',
            },
        ],
    },
    {
        category: '水道工事事業者向け',
        desc: '給水装置工事を行う事業者向けの書類です。',
        items: [
            {
                label: '給水装置工事申込書について（記載要領）',
                href: 'http://www.ooijousuidoukigyoudan.or.jp/kyusuimoushikominituite_Ver4_R5_11_28.pdf',
                note: 'PDF',
                updated: 'R05.12.05',
            },
            {
                label: '指定工事店一覧（最新版）',
                href: 'http://www.ooijousuidoukigyoudan.or.jp/R08_Jan_siteikoujiten(2).pdf',
                note: 'PDF',
                updated: 'R08.01.14',
            },
        ],
    },
];

export default function DownloadsPage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="各種申請書・様式ダウンロード"
                subtitle="お手続きに必要な書類をこちらからダウンロードできます。"
                enTitle="Downloads"
            />

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                    {/* 注意書き */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5 md:p-6 flex items-start gap-3"
                    >
                        <FileText size={18} className="text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-amber-800 leading-relaxed">
                            PDFファイルのご覧にはAdobe Acrobat Reader等のPDF閲覧ソフトが必要です。
                            お手続きに不明点がある場合は、企業団窓口（0547-46-4130）へお問い合わせください。
                            お急ぎの場合や書類の入手が難しい場合は、窓口にて直接お渡しします。
                        </p>
                    </motion.div>

                    {/* カテゴリ別一覧 */}
                    {downloadItems.map((section, si) => (
                        <motion.div
                            key={section.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: si * 0.1 }}
                        >
                            <div className="mb-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                                    <h2 className="text-xl md:text-2xl font-black text-primary-deep">{section.category}</h2>
                                </div>
                                {section.desc && (
                                    <p className="text-text-sub text-xs md:text-sm ml-11 md:ml-15">{section.desc}</p>
                                )}
                            </div>
                            <div className="space-y-3">
                                {section.items.map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 md:p-5 bg-white hover:bg-primary-main/5 border border-slate-100 hover:border-primary-main/20 rounded-2xl shadow-sm transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary-main/10 p-2 rounded-xl shrink-0">
                                                <Download size={18} className="text-primary-main" />
                                            </div>
                                            <div>
                                                <p className="font-black text-primary-deep text-sm md:text-base">{item.label}</p>
                                                <p className="text-xs text-slate-400 mt-0.5">{item.note}　更新：{item.updated}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all shrink-0" />
                                    </a>
                                ))}
                            </div>
                            {/* 事業者向けカテゴリに詳細ページへの誘導 */}
                            {section.category === '水道工事事業者向け' && (
                                <div className="mt-3">
                                    <Link
                                        href="/business/contractor"
                                        className="inline-flex items-center gap-2 text-xs font-black text-primary-main hover:underline"
                                    >
                                        <ExternalLink size={12} />
                                        事業者向け情報はこちらのページも参照ください
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* パンフレットへの誘導 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/about/brochure"
                            className="flex items-center justify-between p-5 bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-2xl hover:shadow-glow hover:border-primary-main/20 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-primary-main/10 p-2 rounded-xl shrink-0">
                                    <FileText size={18} className="text-primary-main" />
                                </div>
                                <div>
                                    <p className="font-black text-primary-deep text-sm md:text-base">企業団パンフレット・広報資料</p>
                                    <p className="text-xs text-slate-400 mt-0.5">企業団の概要や事業紹介のパンフレット（PDF）</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-primary-main/40 group-hover:text-primary-main group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                    </motion.div>

                    {/* お問い合わせ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-glow-lg"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.1),transparent)]" />
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-3xl font-black mb-3">必要な書類が見つからない場合</h3>
                            <p className="text-white/60 text-sm md:text-base mb-6">お電話またはご来庁にてお気軽にご相談ください。書式はその場で配布いたします。</p>
                            <a
                                href="tel:0547-46-4130"
                                className="btn-shine inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-base md:text-lg shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
                            >
                                0547-46-4130
                            </a>
                            <p className="mt-4 text-white/40 text-xs">平日 8:30〜17:15（土日祝・年末年始を除く）</p>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
