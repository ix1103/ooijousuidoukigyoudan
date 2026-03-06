"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

type FaqItem = {
    q: string;
    a: string;
};

const faqData: { category: string; items: FaqItem[] }[] = [
    {
        category: '水道料金について',
        items: [
            {
                q: '水道料金の請求は何ヶ月ごとですか？',
                a: '2ヶ月ごとにご請求しています。検針員が2ヶ月に1回メーターを検針し、使用水量を確認した後に納入通知書をお送りします。',
            },
            {
                q: '水道料金はどのように計算されますか？',
                a: '料金は「基本料金＋従量料金（使用量に応じた料金）」で計算されます。例えばメーター口径20mmで160㎡使用した場合、1,815円＋（160㎡－16㎡）×155.1円＝約24,149円（2ヶ月・消費税込）となります。',
            },
            {
                q: '水道料金の支払方法を教えてください。',
                a: '①取扱い金融機関・コンビニエンスストアでの窓口払い、②口座振替（自動引き落とし）、③スマートフォン決済（バーコード払い）の3種類からお選びいただけます。口座振替が最も便利です。',
            },
            {
                q: 'スマートフォン決済でいつまでに払えますか？',
                a: '納付期限内であれば、納入通知書に印刷されたバーコードをスマートフォンで読み取るだけでお支払いいただけます。期限を過ぎるとスマートフォン決済はご利用いただけません。',
            },
            {
                q: '引越し（転入・転出）の際の手続きは？',
                a: '転入時は「開栓（かいせん）」、転出時は「閉栓（へいせん）」のお手続きが必要です。お引越しの日程が決まりしだい、できるだけ早めに企業団へご連絡ください。なお、土日・祝祭日の開閉栓作業は行えませんのでご注意ください。',
            },
            {
                q: '名義変更はどうすればいいですか？',
                a: '相続や売買等による名義変更のお手続きは、企業団窓口までお越しいただくか、お電話でご相談ください。必要書類をご案内いたします。',
            },
            {
                q: '新しく水道を使いたい場合（加入）はどうすればいいですか？',
                a: '新規で給水装置を設置するには「加入分担金」が必要です。加入分担金は口径によって異なります。詳しくは企業団窓口またはお電話でお問い合わせください。',
            },
            {
                q: '急に水道料金が増えたのですが、なぜですか？',
                a: '急激な料金増加は宅地内での水漏れが原因の場合があります。水漏れ発見法を参考にご確認いただき、心配な場合は企業団またはご指定の工事業者へご相談ください。',
            },
        ],
    },
    {
        category: '水質について',
        items: [
            {
                q: '水道水は安全ですか？',
                a: '大井上水道企業団では、法令に定められた水質基準を満たす安全な水をお届けするため、定期的な水質検査を実施しています。検査結果はホームページで公開しています。',
            },
            {
                q: '最近、水が白く濁っています。大丈夫ですか？',
                a: '白い濁りの多くは水に溶けた空気が細かい気泡になることで起こる現象（白濁）です。コップに汲み置いてしばらくすると透明になる場合は問題ありません。濁りが長時間続く場合や色が白以外の場合は企業団へご連絡ください。',
            },
            {
                q: '水に塩素のにおいがしますが大丈夫ですか？',
                a: '水道水には衛生上の理由から塩素消毒が法律で義務付けられています。においが気になる場合は、汲み置きして少し時間をおくか、一度沸かしてからお使いいただくと和らぎます。',
            },
            {
                q: '受水槽（貯水タンク）の管理はどうすればいいですか？',
                a: 'マンションやビルなどに設置されている受水槽は、建物の設置者（管理者）が適切に管理する義務があります。定期的な清掃・点検（年1回以上）を実施してください。詳しくは企業団にお問い合わせください。',
            },
            {
                q: 'クロスコネクションとは何ですか？',
                a: 'クロスコネクションとは、水道管と雑用水（井戸水・工業用水等）の配管が直接つながってしまうことです。水質汚染の原因となるため、法律で厳しく禁止されています。リフォームや配管工事の際はご注意ください。',
            },
        ],
    },
];

const FaqItem: React.FC<{ item: FaqItem; index: number }> = ({ item, index }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="border border-slate-100/80 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-glow transition-all duration-500"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-start gap-4 p-5 md:p-7 text-left group"
                aria-expanded={isOpen}
            >
                <div className="bg-gradient-to-br from-primary-main to-secondary-vibrant text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    Q
                </div>
                <p className="flex-1 font-black text-sm md:text-base text-primary-deep group-hover:text-primary-main transition-colors leading-snug">
                    {item.q}
                </p>
                <ChevronDown
                    size={20}
                    className={`shrink-0 text-primary-main/40 transition-transform duration-300 mt-0.5 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {isOpen && (
                <div className="px-5 md:px-7 pb-5 md:pb-7 flex items-start gap-4">
                    <div className="bg-secondary-vibrant/10 text-secondary-vibrant text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                        A
                    </div>
                    <p className="flex-1 text-text-sub text-sm md:text-base leading-relaxed">{item.a}</p>
                </div>
            )}
        </motion.div>
    );
};

import { PageHeader } from '@/components/PageHeader';

export default function FaqPage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="よくある質問"
                subtitle="水道料金・水質に関するよくあるご質問をまとめました。"
                enTitle="FAQ"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">
                {/* FAQ本文 */}
                <section>
                    <div className="max-w-3xl mx-auto lg:px-0 space-y-12 md:space-y-20">
                        {faqData.map((section) => (
                            <div key={section.category}>
                                <div className="flex items-center space-x-3 mb-6 md:mb-8">
                                    <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                                    <h2 className="text-xl md:text-3xl font-black text-primary-deep">{section.category}</h2>
                                </div>
                                <div className="space-y-3 md:space-y-4">
                                    {section.items.map((item, i) => (
                                        <FaqItem key={i} item={item} index={i} />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* 解決しない場合バナー */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-glow-lg"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.1),transparent)]" />
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-3xl font-black mb-3">解決しない場合は</h3>
                                <p className="text-white/60 text-sm md:text-base mb-6">専門スタッフが丁寧にご対応いたします。</p>
                                <a
                                    href="tel:0547-46-4130"
                                    className="btn-shine inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-base md:text-lg shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
                                >
                                    お電話でお問い合わせ
                                </a>
                                <p className="mt-4 text-white/40 text-xs">0547-46-4130（平日 8:30〜17:15）</p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
}
