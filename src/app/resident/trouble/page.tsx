"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, AlertTriangle, Droplets, Wrench, Snowflake, ShieldAlert, Phone, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

import { PageHeader } from '@/components/PageHeader';

export default function TroublePage() {
    const troubles = [
        {
            id: 'bad-sales',
            icon: <ShieldAlert className="w-7 h-7 md:w-8 md:h-8 text-red-500" />,
            title: '悪質な訪問販売にご注意を',
            color: 'from-red-50 to-orange-50',
            border: 'border-red-200/40',
            steps: [
                '「水道局の者ですが…」などと名乗り、点検等を行おうとする悪質業者が全国的に確認されています。',
                '当企業団では、事前連絡なしに訪問して水道設備の点検・工事を行うことは一切ありません。',
                '不審な訪問者があった場合は、契約せずにすぐに企業団または警察にご連絡ください。',
            ],
            action: null,
        },
        {
            id: 'road-leak',
            icon: <Droplets className="w-7 h-7 md:w-8 md:h-8 text-blue-500" />,
            title: '道路から水が出ている',
            color: 'from-blue-50 to-sky-50',
            border: 'border-blue-200/40',
            steps: [
                '道路からきれいな水が湧き出ている場合は、水道管の破裂・漏水の可能性があります。',
                '危険ですので近づかず、速やかに当企業団または役場へご連絡ください（24時間対応）。',
                '工事中の補修等については、当企業団の指定業者が対応します。費用のご負担は原則ありません。',
            ],
            action: 'tel',
        },
        {
            id: 'yard-leak',
            icon: <Droplets className="w-7 h-7 md:w-8 md:h-8 text-cyan-500" />,
            title: '宅地内で水が漏れている',
            color: 'from-cyan-50 to-teal-50',
            border: 'border-cyan-200/40',
            steps: [
                '庭先や建物の隙間から水が出ている場合は宅地内の給水管からの漏水の可能性があります。',
                'まず建物入口付近にある「止水栓（元栓）」を閉めて水を止めてください。',
                '宅地内の配管は所有者（お客様）の管理となります。指定給水装置工事事業者にご依頼ください。',
            ],
            action: 'contractor',
        },
        {
            id: 'no-water',
            icon: <AlertTriangle className="w-7 h-7 md:w-8 md:h-8 text-amber-500" />,
            title: '水が出ない',
            color: 'from-amber-50 to-yellow-50',
            border: 'border-amber-200/40',
            steps: [
                '止水栓（元栓）が閉まっていないか確認してください。',
                '近隣でも断水していないか確認してください（計画断水・緊急断水の可能性）。',
                '水道料金の未納による給水停止の可能性もあります。心当たりがある場合は企業団へご連絡ください。',
                '上記に該当しない場合は、宅内配管のトラブルの可能性があります。指定工事業者にご相談ください。',
            ],
            action: 'tel',
        },
        {
            id: 'freeze',
            icon: <Snowflake className="w-7 h-7 md:w-8 md:h-8 text-indigo-500" />,
            title: '水道管が凍結したら',
            color: 'from-indigo-50 to-blue-50',
            border: 'border-indigo-200/40',
            steps: [
                '蛇口にタオルを被せ、その上からぬるま湯（約40℃）をゆっくりかけてください。',
                '熱湯をかけると管が破裂することがあります。絶対に熱湯は使わないでください。',
                '管が破裂した場合はすぐに止水栓を閉め、指定工事業者または企業団にご連絡ください。',
                '凍結しやすい露出している配管には、保温材を巻くことで予防が可能です。',
            ],
            action: null,
        },
        {
            id: 'packing',
            icon: <Wrench className="w-7 h-7 md:w-8 md:h-8 text-slate-500" />,
            title: '蛇口のパッキン交換',
            color: 'from-slate-50 to-gray-50',
            border: 'border-slate-200/40',
            steps: [
                '蛇口のパッキン（ゴム製の部品）が劣化すると、水漏れが起きることがあります。',
                'ハンドルを外してパッキンを取り出し、同サイズの新しいパッキンと交換します。',
                '自分での交換が難しい場合や、交換後も水が漏れる場合は指定工事業者にご依頼ください。',
            ],
            action: 'contractor',
        },
        {
            id: 'cross-connection',
            icon: <ShieldAlert className="w-7 h-7 md:w-8 md:h-8 text-red-500" />,
            title: 'クロスコネクション（二重配管）の禁止',
            color: 'from-red-50 to-orange-50',
            border: 'border-red-200/40',
            steps: [
                '水道管と井戸水・工業用水・受水槽などの配管が直接つながっている状態を「クロスコネクション」といいます。',
                'これは水道法第16条で禁止されている違法行為であり、深刻な健康被害にも及ぶ危険があります。',
                'バルブ等による一時的な切替接続も禁止です。発見した場合は直ちに配管の切り離し（解消工事）が必要です。',
            ],
            action: null,
        },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="水道トラブル対処法"
                subtitle={<>よくある水道のトラブルとその対処法をご案内します。<br />緊急の場合は <strong className="text-secondary-vibrant"><Phone size={20} className="inline-block mr-1 -mt-0.5" /><Phone size={16} className="inline-block mr-1 -mt-0.5"/>0547-46-4130</strong> へご連絡ください。</>}
                enTitle="Water Trouble"
            />

            {/* 緊急電話バナー */}
            <div className="bg-red-600 py-4 md:py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white text-center">
                    <div className="flex items-center gap-2 font-black text-sm md:text-base">
                        <AlertTriangle size={18} />
                        <span>緊急の場合は今すぐ電話！</span>
                    </div>
                    <a href="tel:0547-46-4130" className="bg-white text-red-600 font-black px-6 py-2 rounded-full text-base md:text-lg tracking-wide flex items-center gap-2 hover:bg-red-50 transition-colors active:scale-95">
                        <Phone size={18} /><Phone size={20} className="inline-block mr-1 -mt-0.5" />0547-46-4130</a>
                    <span className="text-white/70 text-xs md:text-sm">（24時間対応）</span>
                </div>
            </div>

            {/* トラブル一覧 */}
            <section className="py-16 md:py-24 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8">
                    {troubles.map((trouble, idx) => (
                        <motion.div
                            key={trouble.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            id={trouble.id}
                            className={`bg-gradient-to-br ${trouble.color} border ${trouble.border} rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-glow transition-all duration-500`}
                        >
                            <div className="flex items-start gap-4 md:gap-6">
                                <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-premium shrink-0">
                                    {trouble.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-4 md:mb-6">
                                        {trouble.title}
                                    </h2>
                                    <ul className="space-y-3 md:space-y-4">
                                        {trouble.steps.map((step, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 size={16} className="text-primary-main mt-0.5 shrink-0 md:w-5 md:h-5" />
                                                <p className="text-text-sub text-sm md:text-base leading-relaxed">{step}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    {trouble.action === 'tel' && (
                                        <a
                                            href="tel:0547-46-4130"
                                            className="inline-flex items-center gap-2 mt-5 md:mt-6 bg-primary-deep text-white px-5 py-2.5 rounded-xl font-black text-sm md:text-base hover:bg-primary-main transition-colors shadow-premium active:scale-95"
                                        >
                                            <Phone size={16} />
                                            企業団へ連絡（0547-46-4130）
                                        </a>
                                    )}
                                    {trouble.action === 'contractor' && (
                                        <div className="flex flex-col sm:flex-row gap-3 mt-5 md:mt-6">
                                            <Link
                                                href="/business/designated-shops"
                                                className="inline-flex items-center gap-2 bg-primary-deep text-white px-5 py-2.5 rounded-xl font-black text-sm md:text-base hover:bg-primary-main transition-colors shadow-premium active:scale-95"
                                            >
                                                指定工事業者を探す
                                                <ChevronRight size={16} />
                                            </Link>
                                            <div className="flex gap-2">
                                                <a
                                                    href="http://www.ooijousuidoukigyoudan.or.jp/FYR7_suidoutouban.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 bg-white text-primary-deep border border-primary-deep/20 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm hover:bg-slate-50 transition-colors active:scale-95"
                                                >
                                                    <FileText size={14} />
                                                    R7当番店(PDF)
                                                </a>
                                                <a
                                                    href="http://www.ooijousuidoukigyoudan.or.jp/FYR8toubanten.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 bg-white text-primary-deep border border-primary-deep/20 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm hover:bg-slate-50 transition-colors active:scale-95"
                                                >
                                                    <FileText size={14} />
                                                    R8当番店(PDF)
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* フッターバナー */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-br from-primary-deep via-primary-main to-primary-deep" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <AlertTriangle size={36} className="mx-auto mb-4 text-secondary-vibrant" />
                    <h2 className="text-2xl md:text-4xl font-black mb-4">お困りの場合はいつでも</h2>
                    <p className="text-white/60 mb-8 text-sm md:text-base">解決しない場合や緊急の場合は、遠慮なく企業団にご連絡ください。</p>
                    <a href="tel:0547-46-4130" className="btn-shine inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-lg md:text-xl shadow-glow hover:shadow-glow-lg transition-all active:scale-95">
                        <Phone size={22} /><Phone size={20} className="inline-block mr-1 -mt-0.5" />0547-46-4130</a>
                </div>
            </section>
        </div>
    );
}
