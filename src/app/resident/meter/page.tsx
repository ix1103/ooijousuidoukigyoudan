"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Search, Info, CheckCircle2, Droplets, Wrench, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MeterPage() {
    const howToRead = [
        {
            title: '検針の時期',
            desc: '2ヶ月に1回、偶数月（一部地域は奇数月）の月初めに行われます。検針員が伺い、「水道使用量等のお知らせ（検針票）」をポストに投函します。',
            icon: <Info size={24} className="text-primary-main" />
        },
        {
            title: 'メーターの場所',
            desc: '玄関先や駐車場などの地面にある、青色または黒色の「量水器」と書かれたボックス内にあります。常に検針ができるよう、ボックスの上に物を置かないでください。',
            icon: <Search size={24} className="text-primary-main" />
        },
        {
            title: '数値の読み方',
            desc: 'メーター内の数字（黒地に白文字のデジタル部分）を左から読みます。単位は立方メートル（m³）です。前回の数値との差が、今回の使用量となります。',
            icon: <CheckCircle2 size={24} className="text-primary-main" />
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="水道メーターと検針"
                subtitle="メーターの読み方、検針の仕組み、漏水の調べ方、定期交換についてご案内します。"
                enTitle="Water Meter"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* メーターの見方 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Meter Reading</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-12">検針とメーターの見方</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {howToRead.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className="bg-primary-main/5 p-4 rounded-2xl w-fit mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-primary-deep mb-4">{item.title}</h3>
                                <p className="text-text-sub text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 漏水の調べ方 */}
                <section className="bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 md:py-24 rounded-2xl md:rounded-[4rem]">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center space-x-3 text-secondary-vibrant font-black mb-6">
                            <Droplets size={24} />
                            <h2 className="text-xl md:text-3xl font-black text-primary-deep">水漏れ（漏水）の調べ方</h2>
                        </div>
                        <p className="text-center text-text-sub text-sm md:text-lg mb-12 leading-relaxed">
                            「最近、使用量が急に増えたな」と思ったら、以下の方法で漏水チェックを行ってください。
                        </p>

                        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-premium border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-vibrant/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="space-y-8 relative z-10">
                                <div className="flex gap-4 md:gap-6 items-start">
                                    <div className="w-10 h-10 rounded-full bg-primary-deep text-white flex items-center justify-center font-black shrink-0">1</div>
                                    <p className="text-primary-deep font-bold text-sm md:text-lg mt-1.5">家中のすべての蛇口を閉めます。</p>
                                </div>
                                <div className="flex gap-4 md:gap-6 items-start">
                                    <div className="w-10 h-10 rounded-full bg-primary-deep text-white flex items-center justify-center font-black shrink-0">2</div>
                                    <div>
                                        <p className="text-primary-deep font-bold text-sm md:text-lg mt-1.5">水道メーター内の「パイロット」を確認します。</p>
                                        <p className="text-xs md:text-sm text-text-sub mt-2 leading-relaxed italic">
                                            ※パイロットは、デジタル数字の近くにある、シルバーまたは赤色の小さな円板（星型のようなもの）です。
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col items-center text-center">
                                    <AlertTriangle className="text-red-500 mb-3" size={32} />
                                    <p className="text-red-800 font-black text-lg md:text-xl mb-2">パイロットが回っていれば漏水です！</p>
                                    <p className="text-red-700 text-xs md:text-sm">
                                        蛇口をすべて閉めているのにパイロットが回っている場合は、どこかで水が漏れています。
                                        早急に指定給水装置工事事業者へ修理を依頼してください。
                                    </p>
                                    <Link
                                        href="/business/contractor"
                                        className="mt-6 inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors shadow-lg"
                                    >
                                        指定工事店一覧を見る
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* メーターの交換 */}
                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="space-y-6 md:space-y-8">
                            <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-4">
                                <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                                <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Meter Replacement</span>
                            </div>
                            <h2 className="text-2xl md:text-5xl font-black text-primary-deep leading-tight">メーターの定期交換にご協力ください</h2>
                            <p className="text-text-sub text-sm md:text-lg leading-relaxed md:leading-loose">
                                水道メーターは計量法により、<strong>8年の有効期限</strong>が定められています。
                                当企業団では常に正確な計量を行うため、有効期限が満了する前にメーターを無料で交換しています。
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: '交換費用', value: '無料（企業団が負担します）' },
                                    { label: '作業時間', value: '15〜30分程度（断水が伴います）' },
                                    { label: '事前連絡', value: '対象のご家庭には事前にハガキやチラシで通知します' },
                                ].map((row, i) => (
                                    <div key={i} className="flex gap-4 items-center p-4 bg-white border border-slate-100 rounded-2xl">
                                        <span className="text-[10px] md:text-xs font-black text-primary-main bg-primary-main/5 px-3 py-1 rounded-full uppercase tracking-widest">{row.label}</span>
                                        <span className="text-xs md:text-base font-bold text-primary-deep">{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-primary-main/20 via-secondary-vibrant/20 to-primary-deep/20 rounded-[3rem] animate-morph overflow-hidden p-8 md:p-16">
                                <Wrench className="w-full h-full text-primary-deep/10" strokeWidth={1} />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-premium text-center min-w-[240px]">
                                <p className="text-3xl md:text-5xl font-black text-primary-deep mb-2">8<span className="text-xl md:text-2xl ml-1">年</span></p>
                                <p className="text-xs font-bold text-text-sub tracking-widest uppercase">Replacement Cycle</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
