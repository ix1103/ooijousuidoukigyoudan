"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ExternalLink, Building, Landmark, Link as LinkIcon } from 'lucide-react';

export default function LinksPage() {
    const linkCategories = [
        {
            title: "構成市町",
            icon: <Building className="w-6 h-6 text-primary-main" />,
            description: "大井上水道企業団を構成している3市町（島田市、吉田町、川根本町）の公式ホームページです。",
            links: [
                { name: "島田市", url: "https://www.city.shimada.shizuoka.jp/" },
                { name: "吉田町", url: "https://www.town.yoshida.shizuoka.jp/" },
                { name: "川根本町", url: "https://www.town.kawanehon.shizuoka.jp/" }
            ]
        },
        {
            title: "関連行政機関",
            icon: <Landmark className="w-6 h-6 text-indigo-500" />,
            description: "水道行政に関連する国および県の機関です。",
            links: [
                { name: "厚生労働省（水道対策）", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/topics/bukyoku/kenkou/suido/" },
                { name: "環境省", url: "https://www.env.go.jp/" },
                { name: "静岡県", url: "https://www.pref.shizuoka.jp/" }
            ]
        },
        {
            title: "関連団体",
            icon: <LinkIcon className="w-6 h-6 text-teal-500" />,
            description: "水道事業に関わる各種関係機関・団体です。",
            links: [
                { name: "公益社団法人 日本水道協会", url: "http://www.jwwa.or.jp/" },
                { name: "大井川広域水道企業団", url: "https://www.ooigawakouiki-suidou.or.jp/" }
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="リンク集"
                subtitle="関連機関・構成市町のホームページへのリンク集です。"
                enTitle="Helpful Links"
            />

            <section className="py-16 md:py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {linkCategories.map((category, idx) => (
                        <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-slate-50/50 p-6 md:p-8 border-b border-slate-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-white rounded-xl shadow-sm">
                                        {category.icon}
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black text-primary-deep">{category.title}</h2>
                                </div>
                                <p className="text-text-sub text-sm md:text-base leading-relaxed pl-2 md:pl-0">
                                    {category.description}
                                </p>
                            </div>
                            <div className="p-6 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {category.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-primary-main/30 hover:bg-primary-50 transition-all active:scale-95 shadow-sm hover:shadow-md"
                                        >
                                            <span className="font-bold text-primary-deep group-hover:text-primary-main transition-colors text-sm">
                                                {link.name}
                                            </span>
                                            <ExternalLink size={16} className="text-slate-400 group-hover:text-primary-main transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
