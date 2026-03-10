"use client";

import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { WaterLogoIcon } from './WaterLogoIcon';

export const Footer = () => {
    return (
        <footer className="bg-primary-deep text-white relative overflow-hidden">
            {/* 上部アクセントライン */}
            <div className="h-1 bg-gradient-to-r from-primary-main via-secondary-vibrant to-primary-light" />

            {/* メインフッターコンテンツ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-10">

                {/* 上段：4カラムレイアウト */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10 md:mb-14">

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

                    {/* カラム2：住民・事業者向け */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-black text-white/80 border-b border-white/10 pb-2 mb-4">住民の皆様へ</h3>
                            <nav className="flex flex-col space-y-2.5">
                                <Link href="/resident/price" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    水道料金・手続き
                                </Link>
                                <Link href="/resident/billing-update" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    水道料金改定のお知らせ
                                </Link>
                                <Link href="/resident/water-outage" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    断水情報
                                </Link>
                                <Link href="/resident/trouble" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    水道トラブル
                                </Link>
                                <Link href="/resident/repair-shops" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    宅内漏水修理当番店
                                </Link>
                                <Link href="/resident/faq" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    よくある質問
                                </Link>
                                <Link href="/resident/downloads" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    各種申請書ダウンロード
                                </Link>
                            </nav>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white/80 border-b border-white/10 pb-2 mb-4">事業者の皆様へ</h3>
                            <nav className="flex flex-col space-y-2.5">
                                <Link href="/business/contractor" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    水道工事等業者向け
                                </Link>
                                <Link href="/business/bidding" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    入札参加資格申請書
                                </Link>
                                <Link href="/business/bidding/results" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    入札等結果
                                </Link>
                                <Link href="/business/designated-shops" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    指定工事店一覧
                                </Link>
                                <Link href="/business/invoice" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    インボイス制度
                                </Link>
                            </nav>
                        </div>
                    </div>

                    {/* カラム3：組織情報・その他 */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-black text-white/80 border-b border-white/10 pb-2 mb-4">企業団について</h3>
                            <nav className="flex flex-col space-y-2.5">
                                <Link href="/about/outline" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    組織概要・アクセス
                                </Link>
                                <Link href="/about/water-quality" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    水質情報
                                </Link>
                                <Link href="/about/disclosure" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    公表資料
                                </Link>
                                <Link href="/about/council" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    水道料金等審議会
                                </Link>
                                <Link href="/recruit" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    職員採用
                                </Link>
                                <Link href="/about/assembly" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    企業団議会
                                </Link>
                                <Link href="/about/brochure" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    パンフレット・広報資料
                                </Link>
                            </nav>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white/80 border-b border-white/10 pb-2 mb-4">その他</h3>
                            <nav className="flex flex-col space-y-2.5">
                                <Link href="/news" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    お知らせ一覧
                                </Link>
                                <Link href="/sitemap" className="text-white/50 hover:text-white text-xs md:text-sm flex items-center group transition-colors">
                                    <ChevronRight size={12} className="mr-2 text-white/20 group-hover:text-secondary-vibrant transition-colors" />
                                    サイトマップ
                                </Link>
                            </nav>
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
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="flex flex-col space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <Phone size={14} className="text-secondary-vibrant" />
                                        <span className="text-[10px] text-white/60 font-bold">お問い合わせ・緊急（24時間）</span>
                                    </div>
                                    <a href="tel:0547-46-4130" className="text-xl font-black text-white hover:text-secondary-vibrant transition-colors tracking-wider">
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
