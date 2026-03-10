"use client";

import React from 'react';
import { ChevronRight, Phone, BookOpen, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';

export default function BrochurePage() {
    const brochures = [
        {
            label: '大井上水道企業団パンフレット（2025年版）',
            href: 'http://www.ooijousuidoukigyoudan.or.jp/2025brochure.pdf',
            note: 'PDF / 2025年発行',
            desc: '企業団の概要・事業内容・水道のしくみなどをまとめたパンフレットです。',
        },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="パンフレット・広報資料"
                subtitle="大井上水道企業団の广报パンフレット・刊行物をこちらからご覧いただけます。"
                enTitle="Brochures & PR"
            />

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* パンフレット一覧 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <h2 className="text-xl md:text-2xl font-black text-primary-deep">パンフレット一覧</h2>
                        </div>
                        <div className="space-y-4">
                            {brochures.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col md:flex-row md:items-center gap-4 p-5 md:p-6 bg-gradient-to-br from-blue-50 to-sky-50 hover:from-primary-main/10 hover:to-secondary-vibrant/5 border border-blue-100 hover:border-primary-main/20 rounded-2xl transition-all group"
                                >
                                    <div className="bg-white p-3 rounded-xl shadow-sm shrink-0 w-fit">
                                        <BookOpen size={24} className="text-primary-main" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-black text-primary-deep text-sm md:text-base">{item.label}</p>
                                        <p className="text-xs text-slate-500 mt-1">{item.note}</p>
                                        <p className="text-xs text-text-sub mt-2 leading-relaxed">{item.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-primary-main group-hover:text-primary-deep transition-colors shrink-0">
                                        <FileText size={14} />
                                        <span>開く（PDF）</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-slate-400 mt-4">
                            ※ PDFファイルのご覧にはAdobe Acrobat Reader等のPDF閲覧ソフトが必要です。
                        </p>
                    </motion.div>

                    {/* 紙版の請求について */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200/40 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <h2 className="text-lg md:text-xl font-black text-primary-deep mb-3">冊子・印刷物の入手について</h2>
                        <p className="text-text-sub text-sm md:text-base leading-relaxed mb-4">
                            印刷版のパンフレットをご希望の場合は、企業団窓口にてお配りしています。
                            郵送でのご対応も状況によりお受けする場合がありますので、お気軽にお問い合わせください。
                        </p>
                        <a
                            href="tel:0547-46-4130"
                            className="inline-flex items-center gap-2 font-black text-primary-main hover:underline text-sm"
                        >
                            <Phone size={16} /><Phone size={16} className="inline-block mr-1 -mt-0.5" />0547-46-4130（庶務係）</a>
                    </motion.div>

                    {/* お問い合わせバナー */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-br from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-glow-lg"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.1),transparent)]" />
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-3xl font-black mb-3">その他の資料・お問い合わせ</h3>
                            <p className="text-white/60 text-sm md:text-base mb-6">ご不明な点は窓口またはお電話でお気軽にご相談ください。</p>
                            <a
                                href="tel:0547-46-4130"
                                className="btn-shine inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-base md:text-lg shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
                            >
                                <Phone size={18} /><Phone size={20} className="inline-block mr-1 -mt-0.5" />0547-46-4130</a>
                            <p className="mt-4 text-white/40 text-xs">平日 8:30〜17:15（土日祝・年末年始を除く）</p>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
}
