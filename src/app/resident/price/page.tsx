"use client";

import React from 'react';
import { CreditCard, FileText, Wrench, ChevronRight, Download, HelpCircle, ArrowRight, Droplets, ShieldCheck, Info, Building2, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { PageHeader } from '@/components/PageHeader';
import WaterBillSimulator from '@/components/WaterBillSimulator';

export default function GuidePage() {
    const guides = [
        {
            id: 'payment',
            title: '水道料金・お支払い',
            icon: <CreditCard className="text-secondary-vibrant" />,
            items: [
                { name: '納入通知書でのお支払い', href: '#' },
                { name: '口座振替での自動引き落とし', href: '#' },
                { name: 'クレジットカード払い', href: '#' },
                { name: 'スマートフォン決済アプリ', href: '#' },
            ]
        },
        {
            id: 'procedure',
            title: '各種お手続き',
            icon: <FileText className="text-secondary-vibrant" />,
            items: [
                { name: '使用開始（引っ越しで使い始めるとき）', href: '#' },
                { name: '使用中止（引っ越しで止めるとき）', href: '#' },
                { name: '所有者の名称変更・代表者の変更', href: '#' },
                { name: '給水停止・再開のお申し込み', href: '#' },
            ]
        },
        {
            id: 'contractors',
            title: '指定工事店・修理',
            icon: <Wrench className="text-secondary-vibrant" />,
            items: [
                { name: '島田市内の指定工事店一覧', href: '#' },
                { name: '吉田町内の指定工事店一覧', href: '#' },
                { name: '川根本町内の指定工事店一覧', href: '#' },
                { name: '水漏れ・故障時の対応フロー', href: '#' },
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="手続き・料金"
                subtitle="お引っ越しの際のお手続きや、毎月のお支払い方法、故障時の対応など、暮らしに役立つガイドです。"
                enTitle="Service Guide"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {guides.map((guide, idx) => (
                        <motion.div
                            key={guide.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-white p-6 md:p-14 rounded-2xl md:rounded-[3.5rem] border border-slate-100/80 shadow-sm hover:shadow-glow transition-all duration-500 group"
                        >
                            <div className="bg-primary-main/5 p-4 md:p-6 rounded-xl md:rounded-2xl w-fit mb-6 md:mb-12 group-hover:scale-110 transition-transform">
                                {React.cloneElement(guide.icon as React.ReactElement<any>, { size: 28, strokeWidth: 2.5 })}
                            </div>
                            <h2 className="text-xl md:text-3xl font-black text-primary-deep mb-6 md:mb-10">{guide.title}</h2>
                            <ul className="space-y-3 md:space-y-6">
                                {guide.items.map((item, i) => (
                                    <li key={i}>
                                        <Link
                                            href={item.href}
                                            className="flex items-center justify-between p-3 md:p-5 rounded-xl md:rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group/item active:bg-slate-100"
                                        >
                                            <span className="text-xs md:text-sm font-bold text-text-sub group-hover/item:text-primary-deep transition-colors leading-snug">{item.name}</span>
                                            <ArrowRight size={16} className="text-secondary-vibrant opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0 ml-2" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* 料金表セクション */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 md:mt-24"
                >
                    <div className="flex items-center space-x-3 mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                        <h2 className="text-xl md:text-3xl font-black text-primary-deep">水道料金について</h2>
                    </div>

                    {/* 料金体系の詳細 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="lg:col-span-2 bg-white border border-slate-100/80 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm">
                            <h3 className="font-black text-primary-deep text-lg md:text-xl mb-6 flex items-center gap-2">
                                <FileText className="text-secondary-vibrant" size={20} />
                                水道料金表（2ヶ月につき・消費税10%込）
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm md:text-base border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-primary-deep font-black">
                                            <th className="py-4 px-4 text-left border-b border-slate-200">口径</th>
                                            <th className="py-4 px-4 text-left border-b border-slate-200">基本料金<span className="text-[10px] font-normal block opacity-60">※基本水量分含む</span></th>
                                            <th className="py-4 px-4 text-left border-b border-slate-200">超過料金<span className="text-[10px] font-normal block opacity-60">※1m³あたり</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-text-sub font-bold">
                                        <tr className="hover:bg-blue-50/30 transition-colors">
                                            <td className="py-4 px-4 border-b border-slate-100">13mm / 20mm</td>
                                            <td className="py-4 px-4 border-b border-slate-100">1,815円 <span className="text-[10px] font-normal opacity-60">(16m³まで)</span></td>
                                            <td className="py-4 px-4 border-b border-slate-100">155.1円</td>
                                        </tr>
                                        <tr className="hover:bg-blue-50/30 transition-colors">
                                            <td className="py-4 px-4 border-b border-slate-100">25mm</td>
                                            <td className="py-4 px-4 border-b border-slate-100">2,299円 <span className="text-[10px] font-normal opacity-60">(16m³まで)</span></td>
                                            <td className="py-4 px-4 border-b border-slate-100">155.1円</td>
                                        </tr>
                                        <tr className="bg-slate-50/50">
                                            <td colSpan={3} className="py-3 px-4 text-[10px] text-primary-main/60 tracking-wider">※30mm以上は基本料金に使用分を含まない（0m³から有料）</td>
                                        </tr>
                                        {[
                                            { size: '30mm', price: '3,630円' },
                                            { size: '40mm', price: '4,840円' },
                                            { size: '50mm', price: '6,215円' },
                                            { size: '75mm', price: '12,100円' },
                                            { size: '100mm', price: '78,650円' },
                                            { size: '150mm', price: '94,380円' },
                                        ].map((item, i) => (
                                            <tr key={i} className="hover:bg-blue-50/30 transition-colors border-b border-slate-100 text-xs md:text-sm">
                                                <td className="py-3 px-4">{item.size}</td>
                                                <td className="py-3 px-4">{item.price}</td>
                                                <td className="py-3 px-4">155.1円</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-[10px] md:text-xs text-text-sub leading-relaxed italic">
                                ※水道使用料の円未満は切り捨てとなります。また、下水道使用料は別途、各市町（島田市・牧之原市等）より請求されます。
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white border border-slate-100/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
                                <h3 className="font-black text-primary-deep text-lg mb-4">お支払い方法</h3>
                                <div className="space-y-4 text-xs md:text-sm">
                                    <div className="flex gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg shrink-0"><Building2 size={18} className="text-primary-main" /></div>
                                        <div>
                                            <p className="font-black text-primary-deep">金融機関・窓口</p>
                                            <p className="text-text-sub leading-relaxed mt-1">静岡銀、スルガ、清水銀、ゆうちょ、島田掛川信金、JA大井川等</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="bg-emerald-50 p-2 rounded-lg shrink-0"><Droplets size={18} className="text-emerald-500" /></div>
                                        <div>
                                            <p className="font-black text-primary-deep">口座振替（推奨）</p>
                                            <p className="text-text-sub leading-relaxed mt-1">毎回の手続きが不要で、振替日に自動的に引き落とされます。</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="bg-purple-50 p-2 rounded-lg shrink-0"><Activity size={18} className="text-purple-500" /></div>
                                        <div>
                                            <p className="font-black text-primary-deep">スマホ決済アプリ</p>
                                            <p className="text-text-sub leading-relaxed mt-1">PayPay, LINE Pay, au PAY, d払い, FamiPay等が利用可能です。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-primary-main to-primary-deep text-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-glow">
                                <h4 className="font-black mb-3">計算例</h4>
                                <div className="text-sm border-l-2 border-secondary-vibrant/40 pl-4 space-y-2">
                                    <p className="text-white/60 text-xs">口径20mm・160m³使用の場合</p>
                                    <p className="font-black">基本料金 1,815円</p>
                                    <p className="font-black">従量料金 22,334円</p>
                                    <div className="pt-2 border-t border-white/10">
                                        <p className="text-secondary-vibrant font-black text-xl">合計 24,149円</p>
                                        <p className="text-[10px] text-white/40 leading-relaxed">(160-16) × 155.1 + 1815 = 24,149.4</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 水道料金シミュレーター */}
                    <WaterBillSimulator />

                    {/* 重要な注意事項 */}
                    <div className="mt-6 md:mt-8 bg-amber-50 border border-amber-200/60 rounded-2xl md:rounded-3xl p-5 md:p-8 flex items-start gap-4">
                        <div className="text-amber-500 shrink-0 mt-0.5">
                            <Info size={22} />
                        </div>
                        <div>
                            <p className="font-black text-amber-800 text-sm md:text-base mb-2">開栓・閉栓の手続きについて</p>
                            <p className="text-amber-700 text-xs md:text-sm leading-relaxed">
                                お引越しや名義変更など、お手続きはお早めにご連絡ください。<br />
                                <strong>土日・祝祭日の開閉栓作業は行えません</strong>のでご注意ください。
                            </p>
                        </div>
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 md:mt-32 bg-primary-deep p-8 md:p-20 rounded-2xl md:rounded-[4rem] text-white relative overflow-hidden shadow-glow-lg"
                >
                    <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-r from-primary-deep via-primary-main to-primary-light opacity-50" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(72,202,228,0.1),transparent_60%)]" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                        <div className="max-w-xl text-center md:text-left">
                            <h3 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 flex items-center justify-center md:justify-start gap-3 md:gap-4">
                                <HelpCircle className="text-secondary-vibrant" size={32} />
                                お困りですか？
                            </h3>
                            <p className="text-accent-soft/70 text-sm md:text-lg leading-relaxed md:leading-loose">
                                よくある質問や、オンライン申請の使い方がわからないなど、お電話でのお問い合わせも受け付けております。
                            </p>
                        </div>
                        <a
                            href="tel:0547-46-4111"
                            className="bg-white/10 backdrop-blur-xl p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-white/10 text-center w-full md:min-w-[300px] md:w-auto active:bg-white/20 transition-colors"
                        >
                            <p className="text-[10px] font-black text-secondary-vibrant uppercase tracking-widest mb-2 md:mb-3">お客様相談窓口</p>
                            <p className="text-2xl md:text-4xl font-black hover:text-secondary-vibrant transition-colors">
                                0547-46-4111
                            </p>
                            <p className="mt-4 md:mt-6 text-accent-soft/40 text-xs font-bold">平日 8:15 〜 17:00 受付</p>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* クイックリンクセクション */}
            <section className="pb-16 md:pb-32 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {[
                        { icon: <Download />, text: '申請書類ダウンロード' },
                        { icon: <Info />, text: '水質検査結果' },
                        { icon: <ShieldCheck />, text: '水道の適正使用' },
                        { icon: <Droplets />, text: '漏水の調べ方' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8 }}
                            className="bg-slate-50 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center text-center space-y-3 md:space-y-6 border border-slate-100 group cursor-pointer active:scale-95 transition-transform"
                        >
                            <div className="text-primary-main p-3 md:p-4 rounded-xl md:rounded-2xl bg-white shadow-premium group-hover:bg-primary-main group-hover:text-white transition-colors">
                                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 22 })}
                            </div>
                            <span className="font-black text-primary-deep text-xs md:text-sm leading-snug">{item.text}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* クロスコネクション禁止 */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
                <div className="bg-red-50 rounded-2xl md:rounded-3xl p-6 md:p-12 border border-red-200 mb-8">
                    <div className="flex items-start space-x-3 md:space-x-4">
                        <ShieldCheck size={28} className="text-red-600 shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg md:text-2xl font-black text-red-800 mb-3">クロスコネクション（二重配管）の禁止</h2>
                            <p className="text-red-700 text-xs md:text-sm leading-relaxed mb-4">
                                水道管と井戸水・工業用水・受水槽などの配管が直接つながっている状態を「クロスコネクション」といいます。
                                これは水道法第16条で禁止されている違法行為です。水道水に有害物質が混入し、周辺住民にも健康被害を及ぼす危険があります。
                            </p>
                            <ul className="space-y-2 text-red-700 text-xs md:text-sm">
                                <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-1.5" />
                                    <span>水道管と他の配管を直接接続しないでください</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-1.5" />
                                    <span>切替バルブによる接続も禁止です</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-1.5" />
                                    <span>発見した場合は直ちに解消が必要です</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* メーター定期交換 */}
                <div className="bg-blue-50 rounded-2xl md:rounded-3xl p-6 md:p-12 border border-blue-200">
                    <div className="flex items-start space-x-3 md:space-x-4">
                        <Info size={28} className="text-blue-600 shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg md:text-2xl font-black text-blue-800 mb-3">水道メーターの定期交換について</h2>
                            <p className="text-blue-700 text-xs md:text-sm leading-relaxed mb-4">
                                水道メーターは計量法により、有効期限（8年）が定められています。
                                企業団では有効期限が切れる前に、定期的に交換作業を行っています。
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { label: '交換費用', value: '無料', desc: '企業団が負担します' },
                                    { label: '交換周期', value: '8年ごと', desc: '計量法に基づく' },
                                    { label: 'ご協力', value: 'メーター周辺の整備', desc: '物を置かないでください' },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl text-center">
                                        <p className="text-lg font-black text-blue-700">{item.value}</p>
                                        <p className="text-xs font-bold text-blue-800 mt-1">{item.label}</p>
                                        <p className="text-[10px] text-blue-600/70 mt-0.5">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
