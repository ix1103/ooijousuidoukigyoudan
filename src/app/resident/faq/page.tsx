"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, Search, X, Filter, Info, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Skeleton } from '@/components/Skeleton';
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

const FaqItemComponent: React.FC<{ item: FaqItem & { id?: string }; index: number; defaultOpen?: boolean }> = ({ item, index, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    React.useEffect(() => {
        if (defaultOpen) setIsOpen(true);
    }, [defaultOpen]);

    return (
        <motion.div
            id={item.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 md:px-7 pb-5 md:pb-7 flex items-start gap-4 border-t border-slate-50 pt-5">
                            <div className="bg-secondary-vibrant/10 text-secondary-vibrant text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                                A
                            </div>
                            <div
                                className="flex-1 text-text-sub text-sm md:text-base leading-relaxed rich-text-content"
                                dangerouslySetInnerHTML={{ __html: item.a }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FaqPage() {
    const [faqGroups, setFaqGroups] = useState<GroupedFaq[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
    const [targetFaqId, setTargetFaqId] = useState<string | null>(null);

    React.useEffect(() => {
        const fetchFaq = async () => {
            try {
                const list = await getFaqList();
                if (list && list.length > 0) {
                    const groups: Record<string, (FaqItem & { id: string })[]> = {};
                    list.forEach(item => {
                        const cat = Array.isArray(item.category) ? item.category[0] : (item.category || 'その他');
                        if (!groups[cat]) groups[cat] = [];
                        groups[cat].push({ 
                            id: item.id,
                            q: item.question || item.title || '', 
                            a: item.answer 
                        });
                    });

                    const formatted = Object.keys(groups).map(key => ({
                        category: key,
                        items: groups[key]
                    }));
                    setFaqGroups(formatted as any);
                } else {
                    setFaqGroups([]);
                }
            } catch (error) {
                console.error('Failed to fetch FAQ:', error);
            } finally {
                setLoading(false);
            }
        };

        // URLパラメータからIDを取得してアンカー設定
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            setTargetFaqId(id);
            // データ取得後にスクロール
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 1000);
        }

        fetchFaq();
    }, []);

    const categories = useMemo(() => {
        const data = faqGroups.length > 0 ? faqGroups : FALLBACK_FAQ;
        return ['すべて', ...data.map(g => g.category)];
    }, [faqGroups]);

    const filteredFaq = useMemo(() => {
        const data = faqGroups.length > 0 ? faqGroups : FALLBACK_FAQ;
        return data.map(group => {
            if (selectedCategory !== 'すべて' && group.category !== selectedCategory) {
                return { ...group, items: [] };
            }
            if (!searchQuery) return group;

            const lowerQuery = searchQuery.toLowerCase();
            const filteredItems = group.items.filter(item =>
                item.q.toLowerCase().includes(lowerQuery) ||
                item.a.toLowerCase().includes(lowerQuery)
            );
            return { ...group, items: filteredItems };
        }).filter(group => group.items.length > 0);
    }, [faqGroups, searchQuery, selectedCategory]);

    const totalResults = useMemo(() => {
        return filteredFaq.reduce((acc, group) => acc + group.items.length, 0);
    }, [filteredFaq]);

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="よくある質問"
                subtitle="水道料金・お手続き・水質・トラブルに関するよくあるご質問をまとめました。"
                enTitle="FAQ"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
                {/* 検索・フィルターエリア */}
                <div className="max-w-4xl mx-auto mb-16 space-y-8">
                    {/* 検索バー */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-2xl blur opacity-10 group-focus-within:opacity-20 transition duration-500"></div>
                        <div className="relative flex items-center bg-white border-2 border-slate-100 rounded-2xl shadow-sm group-focus-within:border-primary-main group-focus-within:shadow-glow transition-all">
                            <div className="pl-6 text-slate-400 group-focus-within:text-primary-main transition-colors">
                                <Search size={24} />
                            </div>
                            <input
                                type="text"
                                placeholder="調べたいキーワードを入力してください（例：料金、漏水）"
                                className="w-full py-5 px-6 bg-transparent outline-none text-base md:text-lg font-bold text-primary-deep placeholder:text-slate-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="pr-6 text-slate-300 hover:text-primary-main transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* カテゴリフィルター */}
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-black transition-all border-2 ${selectedCategory === cat
                                    ? 'bg-primary-main border-primary-main text-white shadow-glow'
                                    : 'bg-white border-slate-100 text-text-sub hover:border-primary-main hover:text-primary-main'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* 結果件数 */}
                    <AnimatePresence>
                        {(searchQuery || selectedCategory !== 'すべて') && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <span className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-6 py-2 rounded-full text-xs md:text-sm font-black text-text-sub">
                                    <Filter size={14} className="text-primary-main" />
                                    検索結果: <span className="text-primary-main text-lg">{totalResults}</span> 件
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <section className="max-w-3xl mx-auto">
                    <div className="space-y-12 md:space-y-20">
                        {loading ? (
                            <div className="space-y-12 md:space-y-20">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i}>
                                        <div className="flex items-center space-x-3 mb-6 md:mb-8">
                                            <Skeleton className="w-8 md:w-12 h-1.5 rounded-full" />
                                            <Skeleton className="w-48 h-8" />
                                        </div>
                                        <div className="space-y-3 md:space-y-4">
                                            {[...Array(3)].map((_, j) => (
                                                <Skeleton key={j} className="w-full h-16 rounded-2xl" />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredFaq.length > 0 ? (
                            <motion.div layout className="space-y-16 md:space-y-24">
                                {filteredFaq.map((group) => (
                                    <div key={group.category} className="space-y-8">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                                            <h2 className="text-xl md:text-3xl font-black text-primary-deep">{group.category}</h2>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <AnimatePresence mode="popLayout">
                                                {group.items.map((item: any, i) => (
                                                    <FaqItemComponent 
                                                        key={item.id || `faq-${i}`} 
                                                        item={item} 
                                                        index={i} 
                                                        defaultOpen={item.id === targetFaqId}
                                                    />
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200"
                            >
                                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-slate-300">
                                    <Search size={40} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-primary-deep mb-2">該当する項目が見つかりませんでした</h3>
                                <p className="text-text-sub text-sm">キーワードを変えてお試しいただくか、お電話でお問い合わせください。</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('すべて'); }}
                                    className="mt-8 flex items-center gap-2 mx-auto text-primary-main font-black hover:opacity-80 transition-opacity"
                                >
                                    <Trash2 size={18} />
                                    <span>検索条件をリセットする</span>
                                </button>
                            </motion.div>
                        )}

                        {/* 解決しない場合バナー */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-glow-lg mt-12"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.1),transparent)]" />
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-3xl font-black mb-3 text-white">解決しない場合は</h3>
                                <p className="text-white/60 text-sm md:text-base mb-6">専門スタッフが丁寧にご対応いたします。</p>
                                <a
                                    href="tel:0547-46-4130"
                                    className="btn-shine inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep px-8 py-4 rounded-2xl font-black text-base md:text-lg shadow-glow hover:shadow-glow-lg transition-all active:scale-95"
                                >
                                    お電話でお問い合わせ
                                </a>
                                <p className="mt-4 text-white/40 text-xs text-white">0547-46-4130（平日 8:30〜17:15）</p>
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
