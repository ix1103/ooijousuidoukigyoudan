"use client";

import React from 'react';
import { Wrench, FileText, AlertTriangle, ChevronRight, Phone, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { PageHeader } from '@/components/PageHeader';

export default function ContractorPage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="工事業者向け情報"
                subtitle="指定給水装置工事事業者の方へ向けた各種情報・様式を掲載しています。"
                enTitle="Contractor"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* 指定給水装置工事事業者について */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Designated Contractor</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-4 md:mb-6">指定給水装置工事事業者</h2>
                    <p className="text-text-sub text-sm md:text-base leading-relaxed mb-8 md:mb-12 max-w-3xl">
                        水道の新設・増設・改造・修繕等の給水装置工事は、企業団が指定した「指定給水装置工事事業者」が施工しなければなりません。
                        指定を受けるには、水道法の定める基準を満たし、企業団への申請が必要です。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {[
                            { icon: <Wrench size={28} />, title: '指定の要件', items: ['給水装置工事主任技術者の選任', '適切な機器の所持', '水道法に基づく技能の保持'] },
                            { icon: <ClipboardList size={28} />, title: '届出が必要な場合', items: ['新規指定の申請', '届出事項の変更（住所・代表者等）', '廃業届', '指定の更新（5年ごと）'] },
                            { icon: <AlertTriangle size={28} />, title: '注意事項', items: ['無届工事は水道法違反です', '変更届は変更後30日以内に提出', '工事施工時は企業団への事前申請が必要'] },
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <div className="text-primary-main bg-primary-main/5 p-3 rounded-xl w-fit mb-4">
                                    {card.icon}
                                </div>
                                <h3 className="text-base md:text-lg font-black text-primary-deep mb-4">{card.title}</h3>
                                <ul className="space-y-2">
                                    {card.items.map((item, i) => (
                                        <li key={i} className="flex items-start space-x-2 text-text-sub text-xs md:text-sm">
                                            <div className="w-1 h-1 bg-primary-main rounded-full shrink-0 mt-1.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 各種様式 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Forms</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-4 md:mb-6">指定様式一覧</h2>
                    <p className="text-text-sub text-sm md:text-base leading-relaxed mb-8 md:mb-12">
                        給水装置工事に関する各種申請書・届出書の様式です。必要書類をご確認の上、窓口にご提出ください。
                    </p>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        {[
                            { name: '給水装置工事申込書', desc: '新設・増設・改造時に提出', type: '申請' },
                            { name: '給水装置工事完了届', desc: '工事完了後に提出', type: '届出' },
                            { name: '指定給水装置工事事業者指定申請書', desc: '新規指定の申請', type: '申請' },
                            { name: '指定給水装置工事事業者変更届出書', desc: '届出事項変更時に提出', type: '届出' },
                            { name: '指定給水装置工事事業者廃止届出書', desc: '廃業時に提出', type: '届出' },
                            { name: '給水装置工事主任技術者選任届', desc: '主任技術者の選任・変更時', type: '届出' },
                        ].map((form, idx) => (
                            <div key={idx} className={`flex items-center justify-between px-5 md:px-8 py-4 md:py-5 ${idx !== 0 ? 'border-t border-slate-50' : ''} hover:bg-slate-50/50 transition-colors`}>
                                <div className="flex items-center space-x-3 md:space-x-4">
                                    <FileText size={18} className="text-primary-main shrink-0" />
                                    <div>
                                        <p className="text-sm md:text-base font-bold text-primary-deep">{form.name}</p>
                                        <p className="text-[10px] md:text-xs text-text-sub mt-0.5">{form.desc}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shrink-0 ${form.type === '申請' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                                    }`}>
                                    {form.type}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-text-sub/60 text-xs mt-4">※ 様式のダウンロードは窓口にて配布、または公式サイトの「公表」ページからご確認ください。</p>
                </section>

                {/* 資材変更のお知らせ */}
                <section className="bg-amber-50 rounded-2xl md:rounded-3xl p-6 md:p-12 border border-amber-200">
                    <div className="flex items-start space-x-3 md:space-x-4">
                        <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg md:text-2xl font-black text-amber-800 mb-3">給水装置工事に使用する資材の変更について</h2>
                            <p className="text-amber-700 text-xs md:text-sm leading-relaxed mb-4">
                                企業団では、給水装置工事に使用できる資材（管材・継手等）を定めています。
                                資材の変更がある場合は、施工前に必ず最新の情報をご確認ください。
                                変更の詳細については、工務係までお問い合わせください。
                            </p>
                            <a
                                href="tel:0547-46-4130"
                                className="inline-flex items-center space-x-2 bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-amber-700 transition-colors active:scale-95"
                            >
                                <Phone size={14} />
                                <span>工務係に問い合わせ（0547-46-4130）</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
