"use client";

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { ChevronRight, Droplets, Building2, UserCircle, MessageCircle, Link as LinkIcon, FileText } from 'lucide-react';

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
                { title: '水道料金・手続き', href: '/resident/price' },
                { title: '水道料金改定のお知らせ', href: '/resident/billing-update' },
                { title: '断水情報', href: '/resident/water-outage' },
                { title: '水道トラブル（漏水・断水・凍結など）', href: '/resident/trouble' },
                { title: '宅内漏水修理当番店', href: '/resident/repair-shops' },
                { title: 'よくある質問（Q&A）', href: '/resident/faq' },
                { title: '各種申請書ダウンロード', href: '/resident/downloads' },
            ]
        },
        {
            category: '事業者の皆様へ',
            icon: <Building2 className="w-6 h-6 text-amber-500" />,
            links: [
                { title: '水道工事等業者向け情報・様式', href: '/business/contractor' },
                { title: '入札参加資格申請', href: '/business/bidding' },
                { title: '指定工事店一覧', href: '/business/designated-shops' },
                { title: 'インボイス制度について', href: '/business/invoice' },
            ]
        },
        {
            category: '公表資料',
            icon: <FileText className="w-6 h-6 text-secondary-vibrant" />,
            links: [
                { title: '公表資料（各種計画・予算・決算）', href: '/about/disclosure' },
                { title: '水質情報（検査計画・結果）', href: '/about/water-quality' },
                { title: '入札・見積結果公表', href: '/business/bidding/results' },
            ]
        },
        {
            category: '大井上水道企業団について',
            icon: <MessageCircle className="w-6 h-6 text-emerald-500" />,
            links: [
                { title: '組織概要・アクセス', href: '/about/outline' },
                { title: '水道料金等審議会', href: '/about/council' },
                { title: '職員採用情報', href: '/recruit' },
                { title: '議会について', href: '/about/assembly' },
                { title: 'パンフレット・広報資料', href: '/about/brochure' },
            ]
        },
        {
            category: 'その他',
            icon: <LinkIcon className="w-6 h-6 text-slate-500" />,
            links: [
                { title: '個人情報保護方針', href: '/privacy' },
                { title: 'サイトマップ', href: '/sitemap' },
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
