"use client";

import { MapPin, Phone, Mail, Clock, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { WaterLogoIcon } from './WaterLogoIcon';
import { getPagesByMenu } from '@/lib/microcms';

export const Footer = () => {
    const [customPages, setCustomPages] = React.useState<{resident: any[], business: any[], bidding: any[], outline: any[]}>({ 
        resident: [], business: [], bidding: [], outline: [] 
    });

    React.useEffect(() => {
        const fetchCustomPages = async () => {
            const [resPages, busPages, bidPages, outPages] = await Promise.all([
                getPagesByMenu('resident'),
                getPagesByMenu('business'),
                getPagesByMenu('bidding'),
                getPagesByMenu('outline')
            ]);
            setCustomPages({
                resident: resPages.map(p => ({ name: p.title, href: `/pages/${p.slug}`, priority: p.priority ?? 9999 })),
                business: busPages.map(p => ({ name: p.title, href: `/pages/${p.slug}`, priority: p.priority ?? 9999 })),
                bidding: bidPages.map(p => ({ name: p.title, href: `/pages/${p.slug}`, priority: p.priority ?? 9999 })),
                outline: outPages.map(p => ({ name: p.title, href: `/pages/${p.slug}`, priority: p.priority ?? 9999 }))
            });
        };
        fetchCustomPages();
    }, []);

    return (
        <footer className="bg-primary-deep text-white relative overflow-hidden">
            {/* 上部アクセントライン */}
            <div className="h-1 bg-gradient-to-r from-primary-main via-secondary-vibrant to-primary-light" />

            {/* メインフッターコンテンツ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

                {/* 上段：5カラムレイアウト (PC) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* カラム1：組織情報 */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary-main p-2.5 rounded-xl shadow-lg shadow-primary-main/20">
                                <WaterLogoIcon className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-lg font-black tracking-tight font-outfit">大井上水道企業団</p>
                                <p className="text-[8px] font-bold tracking-[0.2em] text-white/30 uppercase">OOI JOUSUIDOU KIGYOUDAN</p>
                            </div>
                        </div>
                        <p className="text-white/40 text-xs leading-relaxed max-w-[200px]">
                            安心・安全な水を24時間365日お届けし、地域の暮らしを支え続けます。
                        </p>
                        <div className="flex gap-3 pt-2">
                            <Link href="/news" className="text-white/40 hover:text-white hover:bg-white/5 transition-all">
                                <span className="text-xs font-bold border border-white/20 px-3 py-1.5 rounded-lg inline-block text-center min-w-[90px]">お知らせ</span>
                            </Link>
                            <Link href="/sitemap" className="text-white/40 hover:text-white hover:bg-white/5 transition-all">
                                <span className="text-xs font-bold border border-white/20 px-3 py-1.5 rounded-lg inline-block text-center min-w-[90px]">サイトマップ</span>
                            </Link>
                        </div>
                    </div>

                    {/* カラム2：住民の皆様へ */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-secondary-vibrant uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-3 bg-secondary-vibrant rounded-full" />
                            住民の皆様へ
                        </h3>
                        <nav className="flex flex-col space-y-3">
                            {[
                                ...customPages.resident,
                                { name: '水道料金・手続き', href: '/resident/price', priority: 1 },
                                { name: '水道料金改定', href: '/resident/billing-update', priority: 2 },
                                { name: '断水情報', href: '/resident/water-outage', priority: 3 },
                                { name: '水道トラブル', href: '/resident/trouble', priority: 4 },
                                { name: '宅内漏水修理当番店', href: '/resident/repair-shops', priority: 5 },
                                { name: 'よくある質問', href: '/resident/faq', priority: 6 },
                                { name: '申請書DL', href: '/resident/downloads', priority: 7 }
                            ].sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999)).map((item) => (
                                <Link key={item.href} href={item.href} className="text-white/50 hover:text-white text-xs flex items-center group transition-colors">
                                    <ChevronRight size={10} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-transform group-hover:translate-x-0.5" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* カラム3：事業者の皆様へ & 公表 */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-secondary-vibrant uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1 h-3 bg-secondary-vibrant rounded-full" />
                                事業者の皆様
                            </h3>
                            <nav className="flex flex-col space-y-3">
                                {[
                                    ...customPages.business,
                                    { name: '業者向け情報', href: '/business/contractor', priority: 1 },
                                    { name: '入札参加資格', href: '/business/bidding', priority: 2 },
                                    { name: '指定工事店一覧', href: '/business/designated-shops', priority: 3 },
                                    { name: 'インボイス制度', href: '/business/invoice', priority: 4 }
                                ].sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999)).map((item) => (
                                    <Link key={item.href} href={item.href} className="text-white/50 hover:text-white text-xs flex items-center group transition-colors">
                                        <ChevronRight size={10} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-transform group-hover:translate-x-0.5" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-secondary-vibrant uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1 h-3 bg-secondary-vibrant rounded-full" />
                                公表
                            </h3>
                            <nav className="flex flex-col space-y-3">
                                {[
                                    ...customPages.bidding,
                                    { name: '入札結果', href: '/business/bidding/results', priority: 1 },
                                    { name: '公表資料', href: '/about/disclosure', priority: 2 },
                                    { name: '水質情報', href: '/about/water-quality', priority: 3 }
                                ].sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999)).map((item) => (
                                    <Link key={item.href} href={item.href} className="text-white/50 hover:text-white text-xs flex items-center group transition-colors">
                                        <ChevronRight size={10} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-transform group-hover:translate-x-0.5" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* カラム4：企業団について・その他 */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-secondary-vibrant uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-3 bg-secondary-vibrant rounded-full" />
                            組織情報
                        </h3>
                        <nav className="flex flex-col space-y-3">
                            {[
                                ...customPages.outline,
                                { name: '概要・アクセス', href: '/about/outline', priority: 1 },
                                { name: '料金等審議会', href: '/about/council', priority: 2 },
                                { name: '職員採用', href: '/recruit', priority: 3 },
                                { name: '議会について', href: '/about/assembly', priority: 4 },
                                { name: 'パンフレット', href: '/about/brochure', priority: 5 }
                            ].sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999)).map((item) => (
                                <Link key={item.href} href={item.href} className="text-white/50 hover:text-white text-xs flex items-center group transition-colors">
                                    <ChevronRight size={10} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-transform group-hover:translate-x-0.5" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* カラム5：お問い合わせ */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-secondary-vibrant uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-3 bg-secondary-vibrant rounded-full" />
                            お問い合わせ
                        </h3>
                        <nav className="flex flex-col space-y-4">
                            <div className="space-y-3">
                                <a href="tel:0547-46-4130" className="text-white/50 hover:text-white text-sm flex items-center group transition-colors font-bold">
                                    <Phone size={16} className="mr-2 text-secondary-vibrant group-hover:scale-110 transition-transform" />
                                    0547-46-4130
                                </a>
                                <div className="text-white/40 text-xs leading-relaxed flex items-start">
                                    <MapPin size={14} className="mr-2 mt-0.5 shrink-0 text-white/20" />
                                    <span>〒428-0013 静岡県島田市金谷東一丁目1255番地の2</span>
                                </div>
                                <div className="text-white/40 text-xs flex items-center">
                                    <Clock size={14} className="mr-2 shrink-0 text-white/20" />
                                    <span>8:30～17:15 (平日)</span>
                                </div>
                                <a href="mailto:jimukyoku@ooijousuidoukigyoudan.or.jp" className="text-white/40 hover:text-white text-xs flex items-center group transition-colors pt-1">
                                    <Mail size={14} className="mr-2 text-white/20 group-hover:text-secondary-vibrant" />
                                    メールでお問い合わせ
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* 下段：コピーライト & 法的情報 */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center space-x-4">
                        <p className="text-white/20 text-[10px] font-bold tracking-widest font-outfit uppercase">
                            &copy; {new Date().getFullYear()} OOI JOUSUIDOU KIGYOUDAN
                        </p>
                    </div>
                    <div className="flex space-x-8">
                        <Link href="/privacy" className="text-white/30 hover:text-white text-[10px] font-bold transition-colors">個人情報保護方針</Link>
                        <Link href="/terms" className="text-white/30 hover:text-white text-[10px] font-bold transition-colors">利用規約</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
