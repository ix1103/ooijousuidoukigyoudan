"use client";

import React from 'react';
import { Droplets, Shield, ClipboardCheck, Building2, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WaterQualityPage() {
    // 主な水質基準項目（代表的なもの）
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

    // 毎日検査項目
    const dailyItems = [
        { item: '色', description: '水に異常な色がないか確認します。' },
        { item: '濁り', description: '水に濁りがないか確認します。' },
        { item: '残留塩素', description: '消毒効果が維持されているか確認します。' },
    ];

    // 受水槽管理のポイント
    const tankManagement = [
        { title: '定期清掃', desc: '1年に1回以上、受水槽の清掃を行ってください。' },
        { title: '定期検査', desc: '簡易専用水道（10㎥超）は年1回の法定検査が必要です。' },
        { title: '水質確認', desc: '色・濁り・臭い・味・残留塩素を定期的に確認してください。' },
        { title: '届出', desc: '設置・変更・廃止の際は企業団への届出が必要です。' },
    ];

    return (
        <div className="min-h-screen pt-20">
            {/* ページヘッダー */}
            <div className="bg-primary-deep py-16 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-br from-primary-deep via-primary-main to-primary-light opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/50 via-transparent to-transparent" />
                <div className="absolute top-[20%] right-[10%] w-32 md:w-48 h-32 md:h-48 bg-secondary-vibrant/10 rounded-full blur-[60px] animate-float" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center space-x-2 md:space-x-3 text-xs md:text-sm font-black text-secondary-vibrant uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-10"
                    >
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={12} strokeWidth={3} className="md:hidden" />
                        <ChevronRight size={14} strokeWidth={3} className="hidden md:block" />
                        <span className="text-white">Water Quality</span>
                    </motion.nav>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-3xl md:text-7xl font-black text-white leading-tight text-shadow-strong"
                    >
                        水質情報
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-5 md:mt-8 text-white/90 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-bold"
                    >
                        51項目の厳しい水質基準に適合した<br className="md:hidden" />安全な水をお届けしています。
                    </motion.p>
                </div>

                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-[40px] md:h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="var(--background)" opacity=".3"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="var(--background)"></path>
                    </svg>
                </div>
            </div>

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

                {/* 毎日検査項目 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Daily Inspection</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-8 md:mb-12">毎日行っている検査</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {dailyItems.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-primary-main/5 p-6 md:p-8 rounded-2xl border border-primary-main/10"
                            >
                                <div className="flex items-center space-x-3 mb-3">
                                    <CheckCircle2 size={20} className="text-green-500" />
                                    <h3 className="text-lg md:text-xl font-black text-primary-deep">{item.item}</h3>
                                </div>
                                <p className="text-text-sub text-xs md:text-sm leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
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
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-black">検査項目</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-black">基準値</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-black">分類</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {qualityStandards.map((row, idx) => (
                                        <tr key={idx} className={`border-b border-slate-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                            <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-bold text-primary-deep">{row.item}</td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-text-sub">{row.standard}</td>
                                            <td className="px-4 md:px-6 py-3 md:py-4">
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
                    <p className="text-text-sub/60 text-xs mt-4">※ 検査結果の詳細は毎年10月と4月に公表しています。</p>
                </section>

                {/* 受水槽の管理 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Tank Management</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-4 md:mb-6">受水槽の管理について</h2>
                    <p className="text-text-sub text-sm md:text-base mb-8 md:mb-12">
                        マンションやビルなどで受水槽（貯水槽）を設置している場合、<br className="hidden md:block" />
                        施設の所有者が適切な管理を行う必要があります。
                    </p>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 md:p-8 mb-8">
                        <div className="flex items-start space-x-3">
                            <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-black text-amber-800 text-sm md:text-base mb-1">簡易専用水道（10㎥超）をご利用の方へ</p>
                                <p className="text-amber-700 text-xs md:text-sm leading-relaxed">
                                    有効容量が10立方メートルを超える受水槽は「簡易専用水道」に該当し、<br className="hidden md:block" />
                                    維持管理は施設所有者の責任となります。年1回の法定検査が義務づけられています。
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {tankManagement.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <div className="flex items-center space-x-3 mb-3">
                                    <Building2 size={20} className="text-primary-main" />
                                    <h3 className="text-base md:text-lg font-black text-primary-deep">{item.title}</h3>
                                </div>
                                <p className="text-text-sub text-xs md:text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
