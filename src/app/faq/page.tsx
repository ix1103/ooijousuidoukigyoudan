"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
                subtitle="水道料金・水質に関するよくあるご質問をまとめました。"
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
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold">現在、掲載されている質問はありません。</p>
                                <p className="text-slate-300 text-xs mt-2">MicroCMSから新しい質問を追加するとここに表示されます。</p>
                            </div>
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
