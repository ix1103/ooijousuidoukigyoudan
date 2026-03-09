"use client";

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { ChevronRight, Droplets, Building2, UserCircle, MessageCircle, Link as LinkIcon } from 'lucide-react';

export default function SitemapPage() {
    const sitemapData = [
        {
            category: 'ホーム',
            icon: <UserCircle className="w-6 h-6 text-primary-main" />,
            links: [
                { title: 'トップページ', href: '/' },
                { title: 'お知らせ一覧', href: '/news' },
            ]
        },
        {
            category: '住民の皆様へ',
            icon: <Droplets className="w-6 h-6 text-blue-500" />,
            links: [
                { title: '各種手続き（開栓・閉栓・名義変更）', href: '/resident/procedure' },
                { title: '水道料金のしくみ・お支払い', href: '/resident/price' },
                { title: '水道メーター・定期交換', href: '/resident/meter' },
                { title: '水質情報（基準・検査結果）', href: '/resident/quality' },
                { title: 'クロスコネクションの禁止', href: '/resident/cross-connection' },
                { title: '水道トラブル（水が出ない・漏水・困ったとき）', href: '/resident/trouble' },
                { title: 'よくある質問（Q&A）', href: '/resident/faq' },
            ]
        },
        {
            category: '事業者の皆様へ',
            icon: <Building2 className="w-6 h-6 text-amber-500" />,
            links: [
                { title: '入札・契約情報', href: '/business/bidding' },
                { title: '指定給水装置工事事業者向け情報・様式', href: '/business/contractor' },
            ]
        },
        {
            category: '大井上水道企業団について',
            icon: <MessageCircle className="w-6 h-6 text-emerald-500" />,
            links: [
                { title: '企業団の概要・組織・アクセス', href: '/about/outline' },
                { title: '財政状況・公表資料', href: '/about/finance' },
                { title: '企業団議会', href: '/about/assembly' },
            ]
        },
        {
            category: 'その他',
            icon: <LinkIcon className="w-6 h-6 text-slate-500" />,
            links: [
                { title: '個人情報保護方針', href: '/privacy' },
                { title: '利用規約', href: '/terms' },
                { title: 'お役立ちリンク集', href: '/links' },
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="サイトマップ"
                subtitle="大井上水道企業団ホームページのコンテンツ一覧です。"
                enTitle="Sitemap"
            />

            <section className="py-16 md:py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
                        <div className="space-y-12">
                            {sitemapData.map((section, idx) => (
                                <motion.div
                                    key={section.category}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                >
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                        <div className="p-2 bg-slate-50 rounded-lg">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-xl font-black text-primary-deep">{section.category}</h2>
                                    </div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2 md:pl-4">
                                        {section.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="flex items-center gap-2 group p-2 rounded-xl hover:bg-slate-50 transition-colors"
                                                >
                                                    <ChevronRight size={16} className="text-secondary-vibrant group-hover:translate-x-1 transition-transform" />
                                                    <span className="text-text-main group-hover:text-primary-main transition-colors font-bold text-sm md:text-base">
                                                        {link.title}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
