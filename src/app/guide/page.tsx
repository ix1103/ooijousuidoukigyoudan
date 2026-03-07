"use client";

import React from 'react';
import { CreditCard, FileText, Wrench, ChevronRight, Download, HelpCircle, ArrowRight, Droplets, ShieldCheck, Info } from 'lucide-react';
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

                    {/* 料金計算例 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="bg-white border border-slate-100/80 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-glow transition-all duration-500">
                            <h3 className="font-black text-primary-deep text-base md:text-xl mb-4 md:mb-6">料金の仕組み（2ヶ月分）</h3>
                            <div className="space-y-3 md:space-y-4 text-sm md:text-base text-text-sub">
                                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                    <span className="font-bold">計算式</span>
                                    <span className="text-primary-deep font-black text-xs md:text-sm">基本料金 ＋ 従量料金</span>
                                </div>
                                <div className="bg-accent-soft/30 rounded-xl md:rounded-2xl p-4 md:p-6">
                                    <p className="text-xs text-text-sub font-bold mb-2 uppercase tracking-wider">計算例（口径20mm・160㎡使用）</p>
                                    <p className="text-primary-deep font-black text-sm md:text-base leading-relaxed">
                                        1,815円 + (160㎡ − 16㎡) × 155.1円
                                        <span className="block text-secondary-vibrant text-lg md:text-2xl mt-2">= 約24,149円</span>
                                        <span className="text-xs text-text-sub font-normal">（2ヶ月分・消費税10%込）</span>
                                    </p>
                                </div>
                                <p className="text-xs text-text-sub leading-relaxed">
                                    口径サイズが大きくなるほど基本料金が高くなります。詳細な料金表（PDF）は企業団窓口またはお電話でご請求ください。
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100/80 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-glow transition-all duration-500">
                            <h3 className="font-black text-primary-deep text-base md:text-xl mb-4 md:mb-6">お支払い方法</h3>
                            <div className="space-y-3 md:space-y-4">
                                {[
                                    { step: '①', title: '金融機関・コンビニ窓口', desc: '納入通知書をお持ちいただき、取扱い金融機関またはコンビニエンスストアでお支払いください。' },
                                    { step: '②', title: '口座振替（自動引き落とし）', desc: '毎回の手続き不要で便利です。通帳と届出印を持参して企業団窓口または金融機関でお申し込みください。' },
                                    { step: '③', title: 'スマートフォン決済', desc: '納入通知書のバーコードをスマートフォンで読み取るだけ。※納付期限を過ぎると使用不可。' },
                                ].map((p, i) => (
                                    <div key={i} className="flex items-start gap-3 md:gap-4">
                                        <div className="bg-gradient-to-br from-primary-main to-secondary-vibrant text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            {p.step}
                                        </div>
                                        <div>
                                            <p className="font-black text-primary-deep text-sm md:text-base">{p.title}</p>
                                            <p className="text-text-sub text-xs md:text-sm leading-relaxed mt-1">{p.desc}</p>
                                        </div>
                                    </div>
                                ))}
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
