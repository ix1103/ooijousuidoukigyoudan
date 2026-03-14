"use client";

import React from 'react';
import { getNewsList, News } from '@/lib/microcms';
import { Calendar, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Skeleton } from './Skeleton';

export const NewsSection = () => {
    const [news, setNews] = React.useState<News[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsItems = await getNewsList(3);
                setNews(newsItems);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // フォールバックデモデータ
    const fallbackNews = [
        { id: 'demo-1', title: '【重要】令和8年度の水道料金改定に関するお知らせ', publishedAt: new Date().toISOString(), category: ['重要'] },
        { id: 'demo-2', title: '水道管清掃作業に伴う断水のご協力について', publishedAt: new Date().toISOString(), category: ['お知らせ'] },
        { id: 'demo-3', title: '令和7年度 第1回 大井上水道企業団議会の開催について', publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), category: ['議会情報'] }
    ] as News[];

    const displayNews = news.length > 0 ? news : fallbackNews;

    // 14日以内をNEWコンテンツと判定する関数
    const isNewArticle = (dateString: string) => {
        const publishedDate = new Date(dateString).getTime();
        const now = Date.now();
        const diffDays = (now - publishedDate) / (1000 * 60 * 60 * 24);
        return diffDays <= 14;
    };

    return (
        <section className="pt-12 md:pt-24 pb-12 md:pb-20 relative overflow-hidden">
            {/* 背景装飾 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff] via-white to-[#f0f9ff]" />
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-secondary-vibrant/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-end mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center space-x-3 text-primary-main font-black mb-3 md:mb-4">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-full" />
                            <span className="tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm uppercase">Updates</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-black text-primary-deep">最新のお知らせ</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link
                            href="/news"
                            className="hidden md:flex items-center space-x-3 text-primary-main font-black hover:text-secondary-vibrant transition-all py-2 border-b-2 border-primary-main/10 hover:border-secondary-vibrant group"
                        >
                            <span>全ての情報を表示</span>
                            <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {loading ? (
                        [...Array(3)].map((_, idx) => (
                            <div key={idx} className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border border-slate-100/80 shadow-sm relative overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 flex-grow pl-3 md:pl-5">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-24 h-4" />
                                        <Skeleton className="w-16 h-4 rounded-full" />
                                    </div>
                                    <Skeleton className="w-full md:w-2/3 h-6" />
                                </div>
                                <Skeleton className="hidden md:block w-11 h-11 rounded-xl shrink-0" />
                            </div>
                        ))
                    ) : (
                        displayNews.map((item, idx) => {
                            const isNew = isNewArticle(item.publishedAt);
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    <Link
                                        href={`/news/${item.id}`}
                                        className={`bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 border shadow-sm hover:shadow-glow transition-all duration-500 group active:scale-[0.99] relative overflow-hidden ${isNew ? 'border-secondary-vibrant/20' : 'border-slate-100/80'
                                            }`}
                                    >
                                        {/* グラデーション左ボーダー */}
                                        <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl md:rounded-l-3xl ${isNew ? 'bg-gradient-to-b from-red-400 via-red-500 to-red-600' : 'bg-gradient-to-b from-secondary-vibrant to-primary-main opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                                            }`} />

                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 flex-grow pl-3 md:pl-5">
                                            <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                                <div className="flex items-center space-x-2 text-text-sub font-bold text-xs md:text-sm">
                                                    <Calendar size={14} className="text-primary-main/40" />
                                                    <span>{new Date(item.publishedAt).toLocaleDateString('ja-JP')}</span>
                                                </div>

                                                {isNew && (
                                                    <span className="flex items-center gap-1 bg-gradient-to-r from-red-50 to-red-100 text-red-600 text-[10px] md:text-xs font-black px-2.5 py-0.5 rounded-full border border-red-200/60">
                                                        <Sparkles size={11} />
                                                        NEW
                                                    </span>
                                                )}
                                            </div>

                                            {item.category && (
                                                <div className="flex gap-2">
                                                    {(Array.isArray(item.category) ? item.category : [item.category]).map((cat: string, i: number) => (
                                                        <span
                                                            key={i}
                                                            className="bg-gradient-to-r from-primary-main/5 to-secondary-vibrant/10 text-primary-main text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-widest border border-primary-main/5"
                                                        >
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <h3 className="text-sm md:text-base font-bold text-primary-deep group-hover:text-primary-main transition-colors leading-snug">
                                                {item.title || item.news_title || item.title_text || ''}
                                            </h3>
                                        </div>

                                        <div className="hidden md:flex items-center justify-center bg-slate-50 p-3 rounded-xl group-hover:bg-gradient-to-br group-hover:from-primary-main group-hover:to-secondary-vibrant group-hover:text-white transition-all duration-500 shrink-0 group-hover:shadow-premium">
                                            <ChevronRight size={20} />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })
                    )}
                </div>

                <div className="mt-8 md:hidden">
                    <Link
                        href="/news"
                        className="w-full flex items-center justify-center space-x-3 btn-shine bg-gradient-to-r from-primary-deep to-primary-main text-white py-4 rounded-2xl font-black shadow-glow active:scale-95 transition-transform"
                    >
                        <span>すべて見る</span>
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};
