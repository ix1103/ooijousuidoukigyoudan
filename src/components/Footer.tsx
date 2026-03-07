"use client";

import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { WaterLogoIcon } from './WaterLogoIcon';

export const Footer = () => {
    const navLinks = [
        { name: 'ホーム', href: '/' },
        { name: 'お知らせ', href: '/news' },
        { name: '手続き・料金', href: '/resident/price' },
        { name: '水質情報', href: '/resident/quality' },
        { name: '水道トラブル', href: '/resident/trouble' },
        { name: 'よくある質問', href: '/resident/faq' },
        { name: '企業団について', href: '/about/outline' },
        { name: '工事業者向け', href: '/business/contractor' },
    ];

    return (
        <footer className="bg-primary-deep text-white relative overflow-hidden">
            {/* 上部アクセントライン */}
            <div className="h-1 bg-gradient-to-r from-primary-main via-secondary-vibrant to-primary-light" />

            {/* メインフッターコンテンツ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-10">

                {/* 上段：3カラムレイアウト */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-10 md:mb-14">

                    {/* カラム1：組織情報 */}
                    <div className="space-y-5">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary-main p-2.5 rounded-xl">
                                <WaterLogoIcon className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-lg font-black">大井上水道企業団</p>
                                <p className="text-[8px] font-bold tracking-[0.3em] text-white/40 uppercase">OOI JOUSUIDOU KIGYOUDAN</p>
                            </div>
                        </div>
                        <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                            安心・安全な水を24時間365日お届けし、<br className="hidden md:block" />
                            地域の皆様の暮らしを支え続けます。
                        </p>
                    </div>

                    {/* カラム2：ナビゲーション */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-white/80">サイトメニュー</h3>
                        <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/50 hover:text-white text-xs md:text-sm py-1.5 flex items-center group transition-colors"
                                >
                                    <ChevronRight size={12} className="mr-1 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/sitemap" className="text-white/50 hover:text-white text-xs md:text-sm py-1.5 flex items-center group transition-colors">
                                <ChevronRight size={12} className="mr-1 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                サイトマップ
                            </Link>
                        </nav>

                        {/* 外部リンクセクション */}
                        <div className="pt-4 space-y-3">
                            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-widest">お役立ちリンク</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <a href="http://www.ooijousuidoukigyoudan.or.jp/2025brochure.pdf" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-[11px] flex items-center gap-1 transition-colors">
                                    <ChevronRight size={10} />
                                    企業団パンフレット
                                </a>
                                <Link href="/about/outline#assembly" className="text-white/40 hover:text-white text-[11px] flex items-center gap-1 transition-colors">
                                    <ChevronRight size={10} />
                                    議会について
                                </Link>
                                <Link href="/business/bidding" className="text-white/40 hover:text-white text-[11px] flex items-center gap-1 transition-colors">
                                    <ChevronRight size={10} />
                                    入札・契約情報
                                </Link>
                                <Link href="/about/finance" className="text-white/40 hover:text-white text-[11px] flex items-center gap-1 transition-colors">
                                    <ChevronRight size={10} />
                                    公表・公告
                                </Link>
                                <Link href="/links" className="text-white/40 hover:text-white text-[11px] flex items-center gap-1 transition-colors">
                                    <ChevronRight size={10} />
                                    リンク集
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* カラム3：お問い合わせ情報 */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-white/80">お問い合わせ</h3>
                        <div className="space-y-3">
                            {/* 所在地 */}
                            <a
                                href="https://www.google.com/maps/place/34%C2%B049'41.6%22N+138%C2%B008'12.1%22E"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start space-x-3 group"
                            >
                                <MapPin size={16} className="text-secondary-vibrant mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                                <p className="text-white/50 text-xs leading-relaxed group-hover:text-white transition-colors">
                                    〒428-0013<br />静岡県島田市金谷東一丁目1255番地の2
                                </p>
                            </a>

                            {/* 電話番号 */}
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Phone size={14} className="text-secondary-vibrant" />
                                        <span className="text-[10px] text-white/60 font-bold">料金・引越しなど</span>
                                    </div>
                                    <a href="tel:0547-46-4111" className="text-sm font-black text-white hover:text-secondary-vibrant transition-colors">
                                        0547-46-4111
                                    </a>
                                </div>
                                <div className="border-t border-white/10" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Phone size={14} className="text-red-400" />
                                        <span className="text-[10px] text-white/60 font-bold">緊急・漏水（24時間）</span>
                                    </div>
                                    <a href="tel:0547-46-4130" className="text-sm font-black text-white hover:text-secondary-vibrant transition-colors">
                                        0547-46-4130
                                    </a>
                                </div>
                            </div>

                            {/* FAX・メール */}
                            <div className="grid grid-cols-1 gap-2 text-xs">
                                <div className="flex items-center space-x-2 text-white/40">
                                    <span className="bg-white/10 text-[9px] px-1.5 py-0.5 rounded font-bold">FAX</span>
                                    <span>0547-46-1095</span>
                                </div>
                                <div className="flex items-center space-x-2 text-white/40">
                                    <Mail size={12} className="shrink-0" />
                                    <a href="mailto:jimukyoku@ooijousuidoukigyoudan.or.jp" className="hover:text-white transition-colors truncate">
                                        jimukyoku@ooijousuidoukigyoudan.or.jp
                                    </a>
                                </div>
                            </div>

                            {/* 業務時間 */}
                            <div className="flex items-center space-x-2 text-white/40 text-xs">
                                <Clock size={12} className="text-secondary-vibrant shrink-0" />
                                <span>8:30～17:15（土日祝・12/29～1/3を除く）</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 下段：コピーライト */}
                <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-white/25 text-[10px] font-bold tracking-wider">
                        &copy; {new Date().getFullYear()} 大井上水道企業団 All Rights Reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="text-white/25 hover:text-white/60 text-[10px] font-bold transition-colors">個人情報保護方針</Link>
                        <Link href="/terms" className="text-white/25 hover:text-white/60 text-[10px] font-bold transition-colors">利用規約</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
