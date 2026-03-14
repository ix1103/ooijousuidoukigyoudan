"use client";

import React from 'react';
import { getMergedAnnouncements, Announcement } from '@/lib/microcms';
import { Calendar, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { PageHeader } from '@/components/PageHeader';

export default function NewsPage() {
    const [announcements, setAnnouncements] = React.useState<Announcement[]>([]);

    React.useEffect(() => {
        const fetchAnnouncements = async () => {
            const items = await getMergedAnnouncements(20);
            setAnnouncements(items);
        };
        fetchAnnouncements();
    }, []);

    // 14日以内をNEWコンテンツと判定する関数
    const isNewArticle = (dateString: string) => {
        const date = new Date(dateString).getTime();
        const now = Date.now();
        const diffDays = (now - date) / (1000 * 60 * 60 * 24);
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
                    {announcements.map((item, idx) => {
                        const isNew = isNewArticle(item.date);
                        const isFaq = item.type === 'faq';
                        return (
                            <motion.div
                                key={`${item.type}-${item.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                            >
                                <Link
                                    href={item.url}
                                    className="bg-white p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 shadow-soft-xl hover:shadow-2xl hover:-translate-y-1 transition-all group border border-transparent hover:border-primary-main/5 active:scale-[0.98] relative overflow-hidden"
                                >
                                    {isNew && (
                                        <div className={`absolute top-0 left-0 w-1 md:w-2 h-full rounded-l-2xl md:rounded-l-[2.5rem] ${
                                            isFaq ? 'bg-amber-500' : 'bg-red-500'
                                        }`} />
                                    )}
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-12 flex-grow pl-3 md:pl-4">
                                        <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                            <div className="flex items-center space-x-2 text-text-sub font-bold text-xs md:text-sm">
                                                <Calendar size={16} className="text-primary-main/40" />
                                                <span>{new Date(item.date).toLocaleDateString('ja-JP')}</span>
                                            </div>

                                            {isNew && (
                                                <span className={`flex items-center gap-1 text-[10px] md:text-xs font-black px-2 py-0.5 rounded-md border ${
                                                    isFaq ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-red-50 text-red-600 border-red-100'
                                                }`}>
                                                    <Sparkles size={12} />
                                                    {isFaq ? 'UPDATE' : 'NEW'}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            {item.category.map((cat: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className={`${
                                                        isFaq ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                                                    } text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-widest border`}
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>

                                        <h2 className={`text-base md:text-xl font-bold transition-colors leading-snug ${
                                            isFaq ? 'text-amber-900 group-hover:text-amber-600' : 'text-primary-deep group-hover:text-primary-main'
                                        }`}>
                                            {item.title}
                                        </h2>
                                    </div>

                                    <div className={`hidden md:block p-4 rounded-2xl transition-all transform group-hover:scale-110 shrink-0 ${
                                        isFaq ? 'bg-amber-50 group-hover:bg-amber-500 group-hover:text-white' : 'bg-slate-50 group-hover:bg-primary-main group-hover:text-white'
                                    }`}>
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
