"use client";

import React from 'react';
import { getNewsDetail, News } from '@/lib/microcms';
import { Calendar, ChevronLeft, Share2, Tag, ArrowLeft, Droplets } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NewsDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [news, setNews] = React.useState<News | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchNews = async () => {
            try {
                const item = await getNewsDetail(id);
                setNews(item);
            } catch (e) {
                console.error('Failed to fetch news detail:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    // フォーマット用
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-primary-main p-4 rounded-2xl shadow-xl"
                >
                    <Droplets className="text-white w-8 h-8" />
                </motion.div>
            </div>
        );
    }

    if (!news) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] pt-20">
                <h1 className="text-2xl font-black text-primary-deep mb-6">記事が見つかりませんでした</h1>
                <Link href="/news" className="bg-primary-main text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-lg">
                    <ArrowLeft size={18} />
                    <span>お知らせ一覧へ戻る</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-32">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary-main/10 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 md:pt-24">
                {/* Navigation / Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/news"
                        className="inline-flex items-center space-x-3 text-primary-main font-black text-sm hover:translate-x-[-8px] transition-transform"
                    >
                        <ArrowLeft size={20} />
                        <span className="tracking-widest uppercase">Back to List</span>
                    </Link>
                </motion.div>

                {/* Article Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white p-10 md:p-16 rounded-[3rem] shadow-soft-xl border border-slate-50 mb-12"
                >
                    <div className="flex flex-wrap items-center gap-6 mb-10">
                        <div className="flex items-center space-x-3 text-text-sub font-bold text-sm bg-slate-50 px-5 py-2 rounded-full">
                            <Calendar size={16} className="text-primary-main/40" />
                            <span>{formatDate(news.publishedAt)}</span>
                        </div>
                        {news.category?.map((cat, i) => (
                            <div key={i} className="flex items-center space-x-2 text-secondary-vibrant font-black text-[10px] uppercase tracking-[0.2em] border border-secondary-vibrant/20 px-5 py-2 rounded-full">
                                <Tag size={12} />
                                <span>{cat}</span>
                            </div>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-primary-deep leading-[1.3] mb-8">
                        {news.title}
                    </h1>

                    <div className="w-20 h-2 bg-secondary-vibrant rounded-full" />
                </motion.header>

                {/* Article Content */}
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-10 md:p-20 rounded-[3rem] shadow-soft-xl border border-slate-50 prose prose-lg prose-slate max-w-none"
                >
                    {news.content ? (
                        <div
                            className="news-content space-y-8 text-text-main leading-loose font-medium"
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />
                    ) : (
                        <p className="text-text-muted italic">本文の取得に失敗しました。詳細については企業団までお問い合わせください。</p>
                    )}

                    <div className="mt-20 pt-16 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-10">
                        <div className="flex items-center space-x-6">
                            <p className="text-xs font-black text-primary-main/40 uppercase tracking-widest">Share this news</p>
                            <div className="flex gap-4">
                                {[Share2].map((Icon, i) => (
                                    <button key={i} className="bg-slate-50 p-4 rounded-2xl text-primary-main hover:bg-primary-main hover:text-white transition-all shadow-premium">
                                        <Icon size={20} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/news"
                            className="bg-primary-deep text-white px-10 py-5 rounded-2xl font-black flex items-center gap-4 hover:bg-primary-main transition-all shadow-xl"
                        >
                            <span>他のお知らせを見る</span>
                            <ArrowLeft size={18} className="rotate-180" />
                        </Link>
                    </div>
                </motion.article>
            </div>

            <style jsx global>{`
        .news-content h2 {
          font-size: 1.875rem;
          font-weight: 900;
          color: #001D3D;
          margin-top: 4rem;
          margin-bottom: 2rem;
          position: relative;
          padding-left: 1.5rem;
        }
        .news-content h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0.25rem;
          background: #00B4D8;
          border-radius: 0.5rem;
        }
        .news-content p {
          margin-bottom: 2rem;
          font-size: 1.125rem;
        }
        .news-content ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 3rem;
        }
        .news-content li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 1rem;
        }
        .news-content li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #00B4D8;
          font-weight: 900;
        }
      `}</style>
        </div>
    );
}
