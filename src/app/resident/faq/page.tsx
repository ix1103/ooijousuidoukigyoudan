"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {  ChevronDown , Phone } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { getFaqList, Faq } from '@/lib/microcms';

type FaqItem = {
    q: string;
    a: string;
};

type GroupedFaq = {
    category: string;
    items: FaqItem[];
};

// MicroCMSにデータがない場合のフォールバック静的QA
const FALLBACK_FAQ: GroupedFaq[] = [
    {
        category: '水道料金について',
        items: [
            {
                q: '水道料金はどうやって確認できますか？',
                a: '水道料金は2ヶ月ごとにお届けする「納入通知書」に記載されています。また、口座振替をご利用の場合はご指定の金融機関の通帳でご確認ください。',
            },
            {
                q: '水道料金の支払い方法を教えてください。',
                a: '金融機関の窓口・口座振替・スマートフォン決済アプリ（PayPay・LINE Pay・au PAY・d払い・FamiPay等）がご利用いただけます。口座振替は自動で引き落とされるため便利です。',
            },
            {
                q: '水道料金の引き落とし日はいつですか？',
                a: '口座振替の場合、原則として検針の翌月の末日に引き落とされます。詳しくは納入通知書または企業団窓口にてご確認ください。',
            },
            {
                q: '引っ越しで水道の使用を開始・中止したいのですが？',
                a: 'ご入居・退去の前日までにお電話（<Phone size={14} className="inline-block mr-0.5 -mt-0.5" />0547-46-4130）または窓口にてお申し込みください。土日・祝日の開閉栓作業は行えませんのでご注意ください。',
            },
            {
                q: '水道メーターの交換時期が来たようですが、費用はかかりますか？',
                a: '計量法により定められた有効期限（8年）に基づく定期交換ですので、<strong>交換費用はお客様にはかかりません（無料）</strong>。企業団の委託業者が順次訪問して交換作業を行いますので、メーター周辺に物を置かないようご協力をお願いいたします。',
            },
        ],
    },
    {
        category: '水質・水道水について',
        items: [
            {
                q: '水道水は安全ですか？',
                a: 'はい。当企業団では水道法に基づく定期的な水質検査を実施しており、国が定める51項目の水質基準を全てクリアしています。より詳しい検査結果は<a href="/about/water-quality" style="color:#00B4D8;text-decoration:underline">水質情報ページ</a>をご覧ください。',
            },
            {
                q: '水道水が濁っている・臭いがするのですが？',
                a: '工事後や断水後に一時的に赤水（さび・濁り）が出ることがあります。しばらく流してもご改善いただけない場合は企業団（<Phone size={14} className="inline-block mr-0.5 -mt-0.5" />0547-46-4130）へご連絡ください。',
            },
        ],
    },
    {
        category: '水道トラブルについて',
        items: [
            {
                q: '突然水が出なくなりました。',
                a: '①止水栓（元栓）が閉まっていないか、②近隣でも同様か（計画断水・突発断水の可能性）、③料金未納による停止の可能性をご確認ください。いずれでもない場合は企業団（<Phone size={14} className="inline-block mr-0.5 -mt-0.5" />0547-46-4130）へご連絡ください。',
            },
            {
                q: '宅地内で水が漏れているのですが誰に連絡すれば？',
                a: '宅地内（お客様の敷地内）の配管はお客様の管理となります。まず元栓を閉めてから、当番店一覧または指定給水装置工事事業者へご依頼ください。<a href="/resident/repair-shops" style="color:#00B4D8;text-decoration:underline">当番店一覧はこちら</a>',
            },
            {
                q: '水道管が凍結しました。どうすればいいですか？',
                a: '蛇口にタオルを被せ、ぬるま湯（約40℃）をゆっくりかけてください。熱湯は管が破裂するおそれがあるため絶対に使わないでください。管が破裂した場合はすぐに元栓を閉め、企業団または指定工事店へご連絡ください。',
            },
            {
                q: '水道局を名乗る人が訪問してきましたが大丈夫ですか？',
                a: '当企業団では、事前連絡なしに訪問して水道設備の点検・工事を行うことは一切ありません。不審な場合は契約せず、すぐに企業団または警察にご連絡ください。',
            },
        ],
    },
];

const FaqItemComponent: React.FC<{ item: FaqItem; index: number }> = ({ item, index }) => {
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
                <div className="px-5 md:px-7 pb-5 md:pb-7 flex items-start gap-4 border-t border-slate-50 pt-5">
                    <div className="bg-secondary-vibrant/10 text-secondary-vibrant text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                        A
                    </div>
                    <div
                        className="flex-1 text-text-sub text-sm md:text-base leading-relaxed rich-text-content"
                        dangerouslySetInnerHTML={{ __html: item.a }}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default function FaqPage() {
    const [faqGroups, setFaqGroups] = React.useState<GroupedFaq[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchFaq = async () => {
            try {
                const list = await getFaqList();
                if (list && list.length > 0) {
                    const groups: Record<string, FaqItem[]> = {};
                    list.forEach(item => {
                        const cat = item.category || 'その他';
                        if (!groups[cat]) groups[cat] = [];
                        groups[cat].push({ q: item.question, a: item.answer });
                    });

                    const formatted = Object.keys(groups).map(key => ({
                        category: key,
                        items: groups[key]
                    }));
                    setFaqGroups(formatted);
                } else {
                    setFaqGroups([]);
                }
            } catch (error) {
                console.error('Failed to fetch FAQ:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaq();
    }, []);

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="よくある質問"
                subtitle="水道料金・お手続き・水質・トラブルに関するよくあるご質問をまとめました。"
                enTitle="FAQ"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">
                <section>
                    <div className="max-w-3xl mx-auto lg:px-0 space-y-12 md:space-y-20">
                        {loading ? (
                            <div className="text-center py-20 text-slate-400 font-bold">読み込み中...</div>
                        ) : faqGroups.length > 0 ? (
                            faqGroups.map((section) => (
                                <div key={section.category}>
                                    <div className="flex items-center space-x-3 mb-6 md:mb-8">
                                        <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                                        <h2 className="text-xl md:text-3xl font-black text-primary-deep">{section.category}</h2>
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        {section.items.map((item, i) => (
                                            <FaqItemComponent key={i} item={item} index={i} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            // MicroCMSにデータがない場合はフォールバック静的FAQを表示
                            FALLBACK_FAQ.map((section) => (
                                <div key={section.category}>
                                    <div className="flex items-center space-x-3 mb-6 md:mb-8">
                                        <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                                        <h2 className="text-xl md:text-3xl font-black text-primary-deep">{section.category}</h2>
                                    </div>
                                    <div className="space-y-3 md:space-y-4">
                                        {section.items.map((item, i) => (
                                            <FaqItemComponent key={i} item={item} index={i} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}

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

            <style jsx global>{`
                .rich-text-content p {
                    margin-bottom: 1rem;
                }
                .rich-text-content p:last-child {
                    margin-bottom: 0;
                }
                .rich-text-content a {
                    color: #00B4D8;
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}
