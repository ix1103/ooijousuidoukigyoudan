"use client";

import React from 'react';
import {
    CreditCard, FileText, Wrench, ChevronRight, Download,
    ArrowRight, Droplets, ShieldCheck, Info, Activity, Phone, AlertTriangle, CheckCircle2, Building2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { PageHeader } from '@/components/PageHeader';
import WaterBillSimulator from '@/components/WaterBillSimulator';

// お手続きカードのデータ
const guides = [
    {
        id: 'payment-guide',
        title: '水道料金・お支払い',
        icon: <CreditCard className="w-7 h-7 md:w-8 md:h-8 text-blue-500" />,
        color: 'from-blue-50 to-sky-50',
        border: 'border-blue-200/40',
        items: [
            {
                name: '口座振替の申し込み（推奨）',
                desc: '自動引き落としで手間いらず',
                href: '#bank-transfer',
            },
            {
                name: '金融機関・コンビニでの支払い',
                desc: '静岡銀・スルガ銀・ゆうちょ等',
                href: '#bank',
            },
            {
                name: 'スマホ決済アプリ',
                desc: 'PayPay・LINE Pay・au PAY 等',
                href: '#smartphone',
            },
            {
                name: '水道料金の計算シミュレーター',
                desc: 'ご自分の料金をすぐ計算',
                href: '#simulator',
            },
        ],
    },
    {
        id: 'procedure-guide',
        title: '各種お手続き',
        icon: <FileText className="w-7 h-7 md:w-8 md:h-8 text-violet-500" />,
        color: 'from-violet-50 to-purple-50',
        border: 'border-violet-200/40',
        items: [
            {
                name: '使用開始（引越しで使い始めるとき）',
                desc: '入居前日までにお申し込みください',
                href: '/resident/procedure#usage-start',
            },
            {
                name: '使用中止（引越しで止めるとき）',
                desc: '退去日の前日までにご連絡を',
                href: '/resident/procedure#usage-stop',
            },
            {
                name: '名義変更・代表者変更',
                desc: '所有者・使用者が変わるとき',
                href: '/resident/procedure#name-change',
            },
            {
                name: '申請書類ダウンロード',
                desc: '各種書式はこちらから',
                href: '/resident/downloads',
            },
        ],
    },
    {
        id: 'repair-guide',
        title: '修理・工事業者',
        icon: <Wrench className="w-7 h-7 md:w-8 md:h-8 text-emerald-500" />,
        color: 'from-emerald-50 to-teal-50',
        border: 'border-emerald-200/40',
        items: [
            {
                name: '宅内漏水修理当番店（夜間・休日）',
                desc: '急な漏水はまずこちら',
                href: '/resident/repair-shops',
            },
            {
                name: '指定工事店一覧（全業者）',
                desc: '通常の工事・修理相談',
                href: '/business/designated-shops',
            },
            {
                name: '水道トラブル対処法',
                desc: '凍結・漏水・水が出ないときは',
                href: '/resident/trouble',
            },
            {
                name: 'よくある質問（Q&A）',
                desc: '疑問をまず検索',
                href: '/resident/faq',
            },
        ],
    },
];

// 料金表データ
const rateTable = [
    { size: '13mm / 20mm', base: '1,815円', baseNote: '（16m³まで）', unit: '155.1円' },
    { size: '25mm', base: '2,299円', baseNote: '（16m³まで）', unit: '155.1円' },
];
const largePipes = [
    { size: '30mm', price: '3,630円' },
    { size: '40mm', price: '4,840円' },
    { size: '50mm', price: '6,215円' },
    { size: '75mm', price: '12,100円' },
    { size: '100mm', price: '78,650円' },
    { size: '150mm', price: '94,380円' },
];


export default function PricePage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="水道料金・手続き"
                subtitle={<>お引っ越しのお手続き・毎月のお支払い・修理業者の手配など、<br className="hidden md:block" />暮らしに役立つ情報をまとめました。</>}
                enTitle="Service Guide"
            />

            {/* お手続きガイド */}
            <section className="py-16 md:py-24 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8">

                    {/* 開閉栓の注意事項 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-amber-50 border border-amber-200/60 rounded-2xl md:rounded-3xl p-6 flex items-start gap-4 mb-8"
                    >
                        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-black text-amber-800 text-sm md:text-base mb-1">開栓・閉栓の手続きについて（お願い）</h3>
                            <p className="text-amber-700 text-xs md:text-sm leading-relaxed">
                                引越しや名義変更のお手続きはお早めにご連絡ください。
                                <strong>土日・祝日の開閉栓作業は承っておりません</strong>のであらかじめご計画ください。
                                お電話（<Phone size={14} className="inline-block mr-0.5 -mt-0.5" />0547-46-4130）または窓口にてお申し込みください。
                            </p>
                        </div>
                    </motion.div>

                    {guides.map((guide, idx) => (
                        <motion.div
                            key={guide.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className={`bg-gradient-to-br ${guide.color} border ${guide.border} rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-glow transition-all duration-500`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-premium shrink-0 self-start">
                                    {guide.icon}
                                </div>
                                <div className="flex-1 w-full">
                                    <h2 className="text-lg md:text-2xl font-black text-primary-deep mb-4 md:mb-6">
                                        {guide.title}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                        {guide.items.map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.href}
                                                className="bg-white/80 hover:bg-white p-4 rounded-xl border border-white/50 hover:border-slate-200 hover:shadow-sm transition-all group flex items-start justify-between gap-2"
                                            >
                                                <div>
                                                    <p className="font-bold text-primary-deep text-sm group-hover:text-primary-main transition-colors mb-1">{item.name}</p>
                                                    <p className="text-xs text-slate-500 leading-tight">{item.desc}</p>
                                                </div>
                                                <ChevronRight size={16} className="text-slate-300 group-hover:text-primary-main group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 水道料金について */}
            <section id="payment" className="py-16 md:py-24 bg-slate-50/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                        <h2 className="text-xl md:text-2xl font-black text-primary-deep">水道料金について</h2>
                    </div>

                    {/* 料金改定バナー */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link
                            href="/resident/billing-update"
                            className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl md:rounded-3xl p-5 md:p-6 text-white group hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-xl shadow-sm shrink-0">
                                    <Info size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-black text-base md:text-lg mb-0.5">令和7年10月〜 料金改定のお知らせ</h3>
                                    <p className="text-white/90 text-xs md:text-sm">新旧料金の比較表や改定の背景など詳細はこちらをご確認ください。</p>
                                </div>
                            </div>
                            <ChevronRight size={24} className="shrink-0 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all hidden sm:block" />
                        </Link>
                    </motion.div>

                    {/* 料金表 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <h3 className="font-black text-primary-deep text-base md:text-lg mb-6 flex items-center gap-3">
                            <FileText className="text-primary-main w-6 h-6" />
                            水道料金表（2ヶ月につき・消費税10%込）
                        </h3>
                        <div className="overflow-x-auto rounded-xl border border-slate-100 mb-4">
                            <table className="w-full text-sm border-collapse min-w-full">
                                <thead className="hidden md:table-header-group">
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="py-4 px-5 text-left font-black text-primary-deep">口径</th>
                                        <th className="py-4 px-5 text-left font-black text-primary-deep">基本料金<span className="md:block font-normal text-text-sub text-xs mt-1 ml-2 md:ml-0 inline-block">（基本水量分含む）</span></th>
                                        <th className="py-4 px-5 text-left font-black text-primary-deep">超過料金<span className="md:block font-normal text-text-sub text-xs mt-1 ml-2 md:ml-0 inline-block">（1m³あたり）</span></th>
                                    </tr>
                                </thead>
                                <tbody className="text-text-sub block md:table-row-group">
                                    {rateTable.map((row, i) => (
                                        <tr key={i} className="block md:table-row bg-white border border-slate-100 md:border-0 md:border-b mb-4 md:mb-0 rounded-xl md:rounded-none overflow-hidden hover:bg-slate-50/50 transition-colors shadow-sm md:shadow-none">
                                            <td className="block md:table-cell py-3 px-4 md:py-4 md:px-5 font-black text-primary-deep bg-slate-50 md:bg-transparent border-b border-slate-100 md:border-0">
                                                <span className="md:hidden text-xs text-slate-500 font-normal mr-2">口径:</span>
                                                {row.size}
                                            </td>
                                            <td className="block md:table-cell py-3 px-4 md:py-4 md:px-5 font-bold space-x-1 border-b border-slate-50 md:border-0 flex justify-between md:table-cell items-center">
                                                <span className="md:hidden text-xs text-slate-500 font-normal">基本料金:</span>
                                                <div>
                                                    <span className="text-[15px]">{row.base}</span>
                                                    <span className="text-xs text-slate-400 block md:inline md:ml-1 text-right md:text-left">{row.baseNote}</span>
                                                </div>
                                            </td>
                                            <td className="block md:table-cell py-3 px-4 md:py-4 md:px-5 font-bold flex justify-between md:table-cell items-center">
                                                <span className="md:hidden text-xs text-slate-500 font-normal">超過料金:</span>
                                                <span>{row.unit}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="block md:table-row mb-2 md:mb-0">
                                        <td colSpan={3} className="block md:table-cell py-2.5 px-5 text-xs text-slate-500 bg-slate-50/80 rounded-xl md:rounded-none border-b border-slate-100">
                                            ※ 30mm以上は基本料金に使用分を含まない（0m³から有料）
                                        </td>
                                    </tr>
                                    {largePipes.map((row, i) => (
                                        <tr key={i} className="block md:table-row bg-white border border-slate-100 md:border-0 md:border-b text-[13px] mb-3 md:mb-0 rounded-xl md:rounded-none overflow-hidden hover:bg-slate-50/30 transition-colors shadow-sm md:shadow-none">
                                            <td className="block md:table-cell py-2.5 px-4 md:py-3 md:px-5 font-black text-primary-deep/80 bg-slate-50 md:bg-transparent border-b border-slate-50 md:border-0 flex justify-between md:table-cell items-center">
                                                <span className="md:hidden text-xs text-slate-500 font-normal mr-2">口径:</span>
                                                {row.size}
                                            </td>
                                            <td className="block md:table-cell py-2.5 px-4 md:py-3 md:px-5 font-bold border-b border-slate-50 md:border-0 flex justify-between md:table-cell items-center">
                                                <span className="md:hidden text-xs text-slate-500 font-normal mr-2">基本料金:</span>
                                                {row.price}
                                            </td>
                                            <td className="block md:table-cell py-2.5 px-4 md:py-3 md:px-5 font-bold text-slate-500 flex justify-between md:table-cell items-center">
                                                <span className="md:hidden text-xs text-slate-500 font-normal mr-2">超過料金:</span>
                                                155.1円
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 mb-1">※ 水道使用料の円未満は切り捨てとなります。</p>
                        <p className="text-xs text-slate-500">※ <strong>下水道使用料は別途</strong>、市町（島田市・牧之原市等）より請求されます。</p>
                    </motion.div>

                    {/* お支払い方法 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm"
                    >
                        <h3 className="font-black text-primary-deep text-base md:text-lg mb-6 flex items-center gap-3">
                            <CreditCard className="text-primary-main w-6 h-6" />
                            お支払い方法
                        </h3>

                        <div className="space-y-6 md:space-y-8">
                            {/* 口座振替（推奨） */}
                            <div id="bank-transfer" className="flex flex-col md:flex-row gap-4 p-5 md:p-6 rounded-2xl border border-emerald-100 bg-emerald-50/30 scroll-mt-24">
                                <div className="bg-white p-3 rounded-xl shadow-sm shrink-0 h-fit flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-black text-primary-deep text-base md:text-lg">口座振替</h4>
                                        <span className="bg-emerald-100 text-emerald-700 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full">推奨</span>
                                    </div>
                                    <p className="text-sm md:text-base text-text-sub leading-relaxed">
                                        ご指定の預貯金口座から自動的に引き落とす、便利で確実なお支払い方法です。毎回の手続きが不要になり、払い忘れを防ぐことができます。<br />
                                        <span className="inline-block mt-2 text-primary-deep font-bold bg-amber-50 px-3 py-1 rounded-lg border border-amber-100/50">※口座振替依頼書は、当企業団または各金融機関の窓口にて配布しております。郵送での取り寄せも可能です。</span>
                                    </p>
                                </div>
                            </div>

                            {/* 金融機関・コンビニ */}
                            <div id="bank" className="flex flex-col md:flex-row gap-4 p-5 md:p-6 rounded-2xl border border-blue-100 bg-blue-50/30 scroll-mt-24">
                                <div className="bg-white p-3 rounded-xl shadow-sm shrink-0 h-fit flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-blue-500" />
                                </div>
                                <div className="flex-1 w-full flex flex-col">
                                    <h4 className="font-black text-primary-deep text-base md:text-lg mb-2">金融機関・コンビニ・窓口での支払い</h4>
                                    <p className="text-sm md:text-base text-text-sub leading-relaxed mb-4">
                                        納入通知書をお持ちになり、以下の窓口でお支払いください。
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                        <div className="bg-white p-4 rounded-xl border border-slate-100 h-full">
                                            <p className="font-bold text-primary-deep text-sm mb-2 border-b border-slate-100 pb-2">取扱金融機関（各本店・支店）</p>
                                            <ul className="text-xs text-text-sub space-y-1.5 list-disc list-inside">
                                                <li>静岡銀行</li>
                                                <li>スルガ銀行</li>
                                                <li>清水銀行</li>
                                                <li>島田掛川信用金庫</li>
                                                <li>大井川農業協同組合（JA大井川）</li>
                                                <li>ゆうちょ銀行・郵便局<br /><span className="text-[10px] text-slate-400 ml-4">※静岡・愛知・岐阜・三重県内に限ります</span></li>
                                            </ul>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="bg-white p-4 rounded-xl border border-slate-100">
                                                <p className="font-bold text-primary-deep text-sm mb-2 border-b border-slate-100 pb-2">コンビニエンスストア</p>
                                                <p className="text-xs text-text-sub leading-relaxed">
                                                    セブン-イレブン、ローソン、ファミリーマート、ミニストップ、デイリーヤマザキ、ポプラ 等
                                                </p>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl border border-slate-100 flex-1">
                                                <p className="font-bold text-primary-deep text-sm mb-2 border-b border-slate-100 pb-2">企業団窓口</p>
                                                <p className="text-xs text-text-sub leading-relaxed">大井上水道企業団 窓口（平日のみ）</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-start gap-2 text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-100">
                                        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                                        <p className="text-[11px] leading-relaxed">
                                            バーコードが印字されていないもの、金額が30万円を超えるものはコンビニエンスストアではお支払いできません。金融機関または企業団窓口をご利用ください。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* スマホ決済アプリ */}
                            <div id="smartphone" className="flex flex-col md:flex-row gap-4 p-5 md:p-6 rounded-2xl border border-purple-100 bg-purple-50/30 scroll-mt-24">
                                <div className="bg-white p-3 rounded-xl shadow-sm shrink-0 h-fit flex items-center justify-center">
                                    <Activity className="w-6 h-6 text-purple-500" />
                                </div>
                                <div className="flex-1 w-full">
                                    <h4 className="font-black text-primary-deep text-base md:text-lg mb-2">スマホ決済アプリでの支払い</h4>
                                    <p className="text-sm md:text-base text-text-sub leading-relaxed mb-4">
                                        専用アプリを利用し、納入通知書のバーコードをスマートフォンのカメラで読み取ることで、ご自宅にいながら24時間簡単にお支払いができます。
                                    </p>

                                    <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-100 mb-4">
                                        <p className="font-bold text-primary-deep text-sm mb-3">対応している決済アプリ</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['PayPay', 'LINE Pay', 'au PAY', 'd払い', 'FamiPay', '楽天ペイ', 'PayB'].map(app => (
                                                <span key={app} className="bg-slate-50 border border-slate-200 text-primary-deep font-bold text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
                                                    {app}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <ul className="space-y-2 text-xs text-text-sub bg-slate-50/80 p-4 rounded-xl">
                                        <li className="flex items-start gap-2">
                                            <div className="text-primary-main shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-primary-main/60" />
                                            <span>
                                                <strong>領収書は発行されません。</strong>領収書が必要な場合や、すぐに納税証明書等が必要な場合は、コンビニエンスストアまたは金融機関窓口でお支払いください。
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="text-primary-main shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-primary-main/60" />
                                            <span>決済手数料は無料ですが、通信料はお客様のご負担となります。</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* シミュレーター */}
            <section id="simulator" className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                        <h2 className="text-xl md:text-2xl font-black text-primary-deep">料金シミュレーター</h2>
                    </div>
                    <WaterBillSimulator />
                </div>
            </section>


            {/* フッターバナー */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-br from-primary-deep via-primary-main to-primary-deep" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <Phone size={36} className="mx-auto mb-4 text-secondary-vibrant" />
                    <h2 className="text-2xl md:text-4xl font-black mb-4">お問い合わせ窓口</h2>
                    <p className="text-white/80 mb-8 text-sm md:text-base leading-relaxed">
                        お手続きのご不明点・料金についてのご相談は、<br className="hidden sm:block" />
                        お電話またはご来庁にてお受けいたします。
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <a href="tel:0547-46-4130" className="btn-shine w-full sm:w-auto flex flex-col items-center gap-1 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl shadow-glow hover:shadow-glow-lg transition-all active:scale-95 group">
                            <span className="text-xs font-bold opacity-80 mb-1">お電話でのご相談（平日 8:15〜17:00）</span>
                            <span className="font-black text-xl md:text-2xl flex items-center gap-2">
                                <Phone size={20} className="group-hover:animate-pulse" />0547-46-4130</span>
                        </a>
                    </div>
                    <p className="text-xs text-white/60 mt-6">
                        ※ 夜間・休日の緊急時（漏水など）も上記の番号にて当直が対応し、修理当番店等をご案内いたします。
                    </p>
                </div>
            </section>
        </div>
    );
}
