"use client";

import React from 'react';
import { getNewsList, News } from '@/lib/microcms';
import { Calendar, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { PageHeader } from '@/components/PageHeader';

export default function NewsPage() {
    const [news, setNews] = React.useState<News[]>([]);

    React.useEffect(() => {
        const fetchNews = async () => {
            const newsItems = await getNewsList(20);
            setNews(newsItems);
        };
        fetchNews();
    }, []);

    const fallbackNews = [
        { id: 'demo-1', title: '【重要】令和8年度の水道料金改定に関するお知らせ', publishedAt: new Date().toISOString(), category: ['重要'] },
        { id: 'demo-2', title: '水道管清掃作業に伴う断水のご協力について', publishedAt: new Date().toISOString(), category: ['お知らせ'] },
        { id: 'demo-3', title: '令和7年度 第1回 大井上水道企業団議会の開催について', publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), category: ['議会情報'] },
        { id: 'demo-4', title: '年末年始の窓口業務休業について', publishedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), category: ['お知らせ'] },
        { id: 'demo-5', title: '水質検査結果（令和6年11月分）の公表', publishedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), category: ['水質情報'] },
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
        <div className="min-h-screen pt-20">
            <PageHeader
                title="お知らせ"
                subtitle={<>企業団からの最新情報、議会報告、工事情報など<br className="md:hidden" />市民の皆様へ向けた情報を随時更新しています。</>}
                enTitle="News"
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                <div className="flex flex-col space-y-4 md:space-y-6">
                    {displayNews.map((item, idx) => {
                        const isNew = isNewArticle(item.publishedAt);
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                            >
                                <Link
                                    href={`/news/${item.id}`}
                                    className="bg-white p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 shadow-soft-xl hover:shadow-2xl hover:-translate-y-1 transition-all group border border-transparent hover:border-primary-main/5 active:scale-[0.98] relative overflow-hidden"
                                >
                                    {isNew && (
                                        <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-red-500 rounded-l-2xl md:rounded-l-[2.5rem]" />
                                    )}
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 flex-grow pl-3 md:pl-4">
                                        <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                            <div className="flex items-center space-x-2 text-text-sub font-bold text-xs md:text-sm">
                                                <Calendar size={16} className="text-primary-main/40" />
                                                <span>{new Date(item.publishedAt).toLocaleDateString('ja-JP')}</span>
                                            </div>

                                            {isNew && (
                                                <span className="flex items-center gap-1 bg-red-50 text-red-600 text-[10px] md:text-xs font-black px-2 py-0.5 rounded-md border border-red-100">
                                                    <Sparkles size={12} />
                                                    NEW
                                                </span>
                                            )}
                                        </div>

                                        {item.category && item.category.length > 0 && (
                                            <div className="flex gap-2">
                                                {item.category.map((cat, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-slate-50 text-slate-500 text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-widest border border-slate-100"
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <h2 className="text-base md:text-xl font-bold text-primary-deep group-hover:text-primary-main transition-colors leading-snug">
                                            {item.title}
                                        </h2>
                                    </div>

                                    <div className="hidden md:block bg-slate-50 p-4 rounded-2xl group-hover:bg-primary-main group-hover:text-white transition-all transform group-hover:scale-110 shrink-0">
                                        <ArrowUpRight size={22} />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
