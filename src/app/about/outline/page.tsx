"use client";

import React from 'react';
import { Building2, Target, ChevronRight, ShieldCheck, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { PageHeader } from '@/components/PageHeader';

export default function AboutPage() {
    const sections = [
        {
            title: '組織概要',
            icon: <Building2 className="text-secondary-vibrant" />,
            content: [
                { label: '名称', value: '大井上水道企業団' },
                { label: '設立', value: '1970年（昭和45年）' },
                { label: '構成自治体', value: '島田市、吉田町、川根本町' },
                { label: '事務所所在地', value: '静岡県島田市金谷東一丁目1255番地の2' },
            ],
            link: { label: '事業概要の詳細はこちら', href: 'http://www.ooijousuidoukigyoudan.or.jp/jigyou-gaiyou.html' }
        },
        {
            title: '基本理念',
            icon: <Target className="text-secondary-vibrant" />,
            content: '「安心・安全な水を、未来の世代まで。地域社会の基盤として、常に信頼される水道事業を目指します。」',
            details: [
                '水質の徹底管理と安全性の確保',
                '災害に強い強靭なインフラ構築',
                '持続可能な経営基盤の確立',
                '環境に配慮した事業運営'
            ]
        },
        {
            title: '地域水道ビジョン',
            icon: <Globe className="text-secondary-vibrant" />,
            content: '将来にわたって安全な水を安定的に供給するための指針です。',
            details: [
                '【安心】安全で良質な水をお届けします',
                '【強靭】災害時でも断水しない強い水道を築きます',
                '【持続】健全な経営で次世代へ資産を繋ぎます'
            ]
        },
        {
            title: '災害・地震対策',
            icon: <ShieldCheck className="text-secondary-vibrant" />,
            content: '2025年1月に新しく「耐震化計画」を策定し、強靭な水道網を整備しています。',
            details: [
                '重要施設（配水池等）の耐震化を15年で完了',
                '避難所や透析医療機関への重要管路を最優先整備',
                '激甚化する自然災害への迅速な復旧体制の強化'
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="企業団について"
                subtitle="私たちは島田市・吉田町・川根本町の3自治体が手を取り合い、地域の水インフラを支える特別地方公共団体です。"
                enTitle="About Us"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">
                {/* イントロセクション */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-4 md:mb-6">
                            <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                            <span className="tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm uppercase">Organization Origin</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-6 md:mb-10 leading-tight">
                            3自治体の協力による、<br />
                            <span className="text-secondary-vibrant">効率的で安定した</span>水道経営。
                        </h2>
                        <p className="text-text-sub text-sm md:text-lg leading-relaxed md:leading-loose">
                            大井上水道企業団は、島田市、吉田町、川根本町の1市2町で構成される「地方公営企業」としての側面を持つ特別地方公共団体です。広域的な視点で水道事業を統合・運営することで、コストの最適化と質の高いサービスの両立を実現しています。
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-slate-50 p-8 md:p-16 rounded-2xl md:rounded-[3.5rem] border border-slate-100 shadow-soft-xl"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                            <div className="space-y-3 md:space-y-4">
                                <div className="text-primary-main bg-white p-3 md:p-4 rounded-xl md:rounded-2xl w-fit shadow-premium">
                                    <ShieldCheck size={24} className="md:hidden" />
                                    <ShieldCheck size={28} className="hidden md:block" />
                                </div>
                                <h4 className="text-base md:text-xl font-black text-primary-deep">水質の透明性</h4>
                                <p className="text-text-sub text-xs md:text-sm leading-relaxed">毎月の水質検査結果を公開し、安心をお届けします。</p>
                            </div>
                            <div className="space-y-3 md:space-y-4">
                                <div className="text-primary-main bg-white p-3 md:p-4 rounded-xl md:rounded-2xl w-fit shadow-premium">
                                    <Globe size={24} className="md:hidden" />
                                    <Globe size={28} className="hidden md:block" />
                                </div>
                                <h4 className="text-base md:text-xl font-black text-primary-deep">広域連携</h4>
                                <p className="text-text-sub text-xs md:text-sm leading-relaxed">地域を超えた連携で災害時の復旧体制を強化しています。</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 詳細グリッド */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-white p-6 md:p-16 rounded-2xl md:rounded-[3.5rem] border border-slate-100/80 shadow-sm hover:shadow-glow transition-all duration-500"
                        >
                            <div className="flex items-center space-x-4 md:space-x-6 mb-6 md:mb-12">
                                <div className="bg-primary-main/5 p-3 md:p-5 rounded-xl md:rounded-2xl">
                                    {React.cloneElement(section.icon as React.ReactElement<any>, { size: 28, strokeWidth: 2.5 })}
                                </div>
                                <h3 className="text-xl md:text-3xl font-black text-primary-deep">{section.title}</h3>
                            </div>

                            {typeof section.content === 'string' ? (
                                <div className="space-y-6 md:space-y-10">
                                    <p className="text-base md:text-xl font-bold text-primary-main leading-relaxed italic">
                                        {section.content}
                                    </p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        {(section.details as string[]).map((detail, i) => (
                                            <li key={i} className="flex items-center space-x-3 text-text-sub text-sm font-medium">
                                                <div className="w-1.5 h-1.5 bg-secondary-vibrant rounded-full shrink-0" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="space-y-4 md:space-y-8">
                                    {(section.content as any[]).map((item, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 md:py-5 border-b border-slate-50 group hover:border-primary-main/20 transition-colors">
                                            <span className="text-xs md:text-sm font-black text-primary-main/40 uppercase tracking-widest mb-1 sm:mb-0">{item.label}</span>
                                            <span className="text-base md:text-lg font-bold text-primary-deep">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {(section as any).link && (
                                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end">
                                    <Link
                                        href={(section as any).link.href}
                                        className="inline-flex items-center gap-2 text-primary-main font-bold text-xs md:text-sm hover:underline"
                                    >
                                        <ChevronRight size={16} />
                                        {(section as any).link.label}
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </section>

                {/* 事業の沿革（年表） */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">History</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-8 md:mb-12">事業の沿革</h2>
                    <div className="relative">
                        {/* タイムラインの縦線 */}
                        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-primary-main/10" />
                        <div className="space-y-6 md:space-y-8">
                            {[
                                { year: '1970年', event: '大井上水道企業団を設立（島田市・吉田町・川根本町）' },
                                { year: '1972年', event: '第一期拡張事業に着手。大井川からの取水を開始' },
                                { year: '1985年', event: '第二期拡張事業完了。給水区域を拡大' },
                                { year: '2000年', event: '浄水場の高度処理設備を導入' },
                                { year: '2008年', event: '「地域水道ビジョン」を策定' },
                                { year: '2016年', event: '耐震型継手の送水管路比率50%達成' },
                                { year: '2025年', event: '「上下水道耐震化計画」を策定。15年計画で重要施設の耐震化完了を目指す' },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-start pl-10 md:pl-16 relative"
                                >
                                    <div className="absolute left-2.5 md:left-4 top-1.5 w-3 h-3 md:w-4 md:h-4 bg-primary-main rounded-full border-2 border-white shadow-sm" />
                                    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm flex-1">
                                        <span className="text-xs md:text-sm font-black text-primary-main">{item.year}</span>
                                        <p className="text-sm md:text-base text-primary-deep font-bold mt-1">{item.event}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 事業の推移 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Statistics</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-8 md:mb-12">事業の推移</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { label: '給水人口', value: '約10万人', sub: '1市2町の住民の皆様' },
                            { label: '給水戸数', value: '約43,000戸', sub: '一般家庭・事業所' },
                            { label: '一日最大給水量', value: '約45,000㎥', sub: '安定供給を確保' },
                            { label: '管路延長', value: '約900km', sub: '送水管・配水管の総延長' },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm text-center"
                            >
                                <p className="text-2xl md:text-4xl font-black text-primary-main mb-1">{stat.value}</p>
                                <p className="text-sm md:text-base font-black text-primary-deep mb-1">{stat.label}</p>
                                <p className="text-[10px] md:text-xs text-text-sub">{stat.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 組織と業務内容 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Organization</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-8 md:mb-12">組織と業務内容</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {[
                            { dept: '庶務係', tasks: ['料金の徴収・収納', '開栓・閉栓・名義変更の受付', '予算・決算の管理', '議会に関する事務'] },
                            { dept: '工務係', tasks: ['水道施設の維持管理', '配水管の新設・布設替え', '漏水修理・緊急対応（24時間）', '給水装置工事の審査'] },
                            { dept: '浄水係', tasks: ['浄水場の運転管理', '水質検査の実施', '薬品の管理・投入', '設備の点検と整備'] },
                            { dept: '企業長', tasks: ['企業団の統括', '構成自治体との連携調整', '事業計画の策定', '対外的な代表'] },
                        ].map((org, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <h3 className="text-lg md:text-xl font-black text-primary-deep mb-4 pb-3 border-b border-slate-100">{org.dept}</h3>
                                <ul className="space-y-2">
                                    {org.tasks.map((task, i) => (
                                        <li key={i} className="flex items-center space-x-2 text-text-sub text-xs md:text-sm">
                                            <div className="w-1 h-1 bg-primary-main rounded-full shrink-0" />
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 議会情報 */}
                <section className="bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 md:py-20 rounded-2xl md:rounded-3xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                            <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                            <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Assembly</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-4 md:mb-6">議会について</h2>
                        <p className="text-text-sub text-sm md:text-base leading-relaxed mb-8">
                            大井上水道企業団議会は、構成自治体（島田市・吉田町・川根本町）から選出された議員で構成されます。
                            予算の審議・決算の認定、条例の制定・改廃などを行い、企業団の運営を議会の立場から監視しています。
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { label: '議員定数', value: '10名' },
                                { label: '定例会', value: '年2回（3月・9月）' },
                                { label: '構成', value: '島田市6名・吉田町2名・川根本町2名' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-4 md:p-6 rounded-xl border border-slate-100 text-center">
                                    <p className="text-xs text-text-sub mb-1">{item.label}</p>
                                    <p className="text-sm md:text-base font-black text-primary-deep">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* 事務所所在地（アクセスマップ） */}
            <section id="access" className="bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 md:py-24 rounded-2xl md:rounded-3xl">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Access Map</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-12">交通アクセス</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* 地図埋め込み */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-full aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-premium border border-white"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.50348!2d138.13447!3d34.82822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQ5JzQxLjYiTiAxMzjCsDA4JzEyLjEiRQ!5e0!3m2!1sja!2sjp!4v1711234567890!5m2!1sja!2sjp"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </motion.div>

                        {/* アクセス情報テキスト */}
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary-main">
                                    <MapPin size={24} />
                                    <h3 className="text-xl font-black">所在地</h3>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                    <p className="text-lg font-black text-primary-deep mb-1">大井上水道企業団 本庁舎</p>
                                    <p className="text-text-sub text-sm leading-relaxed">
                                        〒428-0013 静岡県島田市金谷東一丁目1255番地の2
                                    </p>
                                    <div className="mt-4 flex gap-3">
                                        <Link
                                            href="https://maps.google.com/?q=大井上水道企業団"
                                            target="_blank"
                                            className="inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-primary-main px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                                        >
                                            <ArrowUpRight size={14} />
                                            Google Mapsで開く
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-primary-main">
                                    <ChevronRight size={24} className="bg-primary-main/10 rounded-full p-1" />
                                    <h3 className="text-xl font-black">交通のご案内</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                            <span className="text-xl">🚃</span>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-primary-deep mb-1">電車でお越しの方</h4>
                                            <p className="text-text-sub text-sm leading-relaxed">
                                                JR金谷駅・大井川鐵道金谷駅から徒歩約10分。<br />
                                                踏切を渡って最初の信号を左折（北進）し、突き当たりまでお進みください。
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                                            <span className="text-xl">🚗</span>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-primary-deep mb-1">お車でお越しの方</h4>
                                            <p className="text-text-sub text-sm leading-relaxed">
                                                国道1号バイパス「大代IC」から約5分。<br />
                                                新東名高速道路「島田金谷IC」から約10分。<br />
                                                ※敷地内に来客用駐車場がございます。
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
