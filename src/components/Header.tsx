"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { WaterLogoIcon } from './WaterLogoIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { getPagesByMenu, PageContent } from '@/lib/microcms';

export const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [customPages, setCustomPages] = React.useState<{resident: any[], business: any[], bidding: any[], outline: any[]}>({ 
        resident: [], business: [], bidding: [], outline: [] 
    });
    const pathname = usePathname();

    React.useEffect(() => {
        const fetchCustomPages = async () => {
            const [resPages, busPages, bidPages, outPages] = await Promise.all([
                getPagesByMenu('resident'),
                getPagesByMenu('business'),
                getPagesByMenu('bidding'),
                getPagesByMenu('outline')
            ]);
            setCustomPages({
                resident: resPages.map(p => ({ name: p.title, href: `/pages/${p.slug}`, desc: '企業団からのお知らせ', priority: p.priority ?? 9999 })),
                business: busPages.map(p => ({ name: p.title, href: `/pages/${p.slug}`, desc: '事業者向け案内', priority: p.priority ?? 9999 })),
                bidding: bidPages.map(p => ({ name: p.title, href: `/pages/${p.slug}`, desc: '公表資料', priority: p.priority ?? 9999 })),
                outline: outPages.map(p => ({ name: p.title, href: `/pages/${p.slug}`, desc: '組織・あゆみ', priority: p.priority ?? 9999 }))
            });
        };
        fetchCustomPages();
    }, []);

    // ホームへ戻る（同じページならスクロールトップ）
    const handleHomeClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // メニュー展開時にbodyスクロールをロック
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const navCategories = [
        { name: 'ホーム', href: '/', items: [] },
        {
            name: '住民の皆様へ',
            items: [
                ...customPages.resident,
                { name: '水道料金・手続き', href: '/resident/price', desc: 'お支払い・各種申請', priority: 1 },
                { name: '水道料金改定のお知らせ', href: '/resident/billing-update', desc: '令和7年度の料金改定について', priority: 2 },
                { name: '断水情報', href: '/resident/water-outage', desc: '突発・計画断水のお知らせ', priority: 3 },
                { name: '水道トラブル', href: '/resident/trouble', desc: '漏水・断水・凍結の対処法', priority: 4 },
                { name: '宅内漏水修理当番店', href: '/resident/repair-shops', desc: '修理当番店一覧（年度別PDF）', priority: 5 },
                { name: 'よくある質問', href: '/resident/faq', desc: '料金・水質のQ&A', priority: 6 },
                { name: '各種申請書ダウンロード', href: '/resident/downloads', desc: '誓約書・給水装置申込書等', priority: 7 }
            ].sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999))
        },
        {
            name: '事業者の皆様へ',
            items: [
                ...customPages.business,
                { name: '水道工事等業者向け', href: '/business/contractor', desc: '給水装置工事・様式', priority: 1 },
                { name: '入札参加資格申請', href: '/business/bidding', desc: '入札参加登録・資格書類', priority: 2 },
                { name: '指定工事店一覧', href: '/business/designated-shops', desc: '指定給水装置工事事業者一覧', priority: 3 },
                { name: 'インボイス制度', href: '/business/invoice', desc: '適格請求書等保存方式について', priority: 4 }
            ].sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999))
        },
        {
            name: '公表',
            items: [
                ...customPages.bidding,
                { name: '入札・見積結果公表', href: '/business/bidding/results', desc: '執行結果の公表', priority: 1 },
                { name: '公表資料', href: '/about/disclosure', desc: '耐震化計画・各種公表書類', priority: 2 },
                { name: '水質情報', href: '/about/water-quality', desc: '水質検査計画・検査結果', priority: 3 }
            ].sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999))
        },
        {
            name: '企業団について',
            items: [
                ...customPages.outline,
                { name: '組織概要・アクセス', href: '/about/outline', desc: '本庁舎の所在地・案内', priority: 1 },
                { name: '水道料金等審議会', href: '/about/council', desc: '料金審議機関の活動', priority: 2 },
                { name: '職員採用', href: '/recruit', desc: '採用試験・募集情報', priority: 3 },
                { name: '議会について', href: '/about/assembly', desc: '議会の組織と活動', priority: 4 },
                { name: 'パンフレット・広報資料', href: '/about/brochure', desc: '企業団パンフレットPDF', priority: 5 }
            ].sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999))
        },
        { name: 'お知らせ', href: '/news', items: [] },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full transition-all duration-500 ${scrolled
                    ? 'bg-white shadow-lg py-2'
                    : 'bg-primary-deep py-3 md:py-4'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14 md:h-16">
                        {/* ロゴコンテナ */}
                        <Link href="/" onClick={handleHomeClick} className="flex items-center space-x-3 md:space-x-4 group relative z-10">
                            <motion.div
                                whileHover={{ rotate: 180, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className={`p-2 md:p-2.5 rounded-xl md:rounded-2xl transition-all duration-500 ${scrolled ? 'bg-primary-main text-white shadow-premium' : 'bg-white/15 text-white'
                                    }`}
                            >
                                <WaterLogoIcon className="w-5 h-5 md:w-6 md:h-6" />
                            </motion.div>
                            <div className="flex flex-col">
                                <h1 className={`text-base md:text-xl font-black transition-colors duration-500 tracking-tight ${scrolled ? 'text-primary-deep' : 'text-white'
                                    }`}>
                                    大井上水道企業団
                                </h1>
                                <p className={`text-[8px] md:text-[9px] font-bold tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 uppercase ${scrolled ? 'text-primary-main/50' : 'text-white/60'
                                    }`}>
                                    OOI JOUSUIDOU KIGYOUDAN
                                </p>
                            </div>
                        </Link>

                        {/* デスクトップナビ */}
                        <nav className="hidden xl:flex items-center space-x-1">
                            {navCategories.map((category) => {
                                const isActive = category.href === '/'
                                    ? pathname === '/'
                                    : (category.href && pathname.startsWith(category.href)) ||
                                    (category.items.some(item => pathname === item.href));

                                return (
                                    <div key={category.name} className="relative group">
                                        {category.items.length === 0 ? (
                                            <Link
                                                href={category.href!}
                                                onClick={category.href === '/' ? handleHomeClick : undefined}
                                                className={`px-4 py-2 text-[14px] font-black transition-all rounded-full relative block whitespace-nowrap ${isActive
                                                    ? (scrolled ? 'text-primary-main' : 'text-white')
                                                    : (scrolled ? 'text-primary-deep/60 hover:text-primary-main hover:bg-primary-main/5' : 'text-white/60 hover:text-white hover:bg-white/10')
                                                    }`}
                                            >
                                                {category.name}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="nav-active"
                                                        className={`absolute inset-0 rounded-full -z-10 ${scrolled ? 'bg-primary-main/5' : 'bg-white/10'}`}
                                                    />
                                                )}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="nav-icon"
                                                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 transition-colors ${scrolled ? 'text-primary-main' : 'text-white'}`}
                                                    >
                                                        <WaterLogoIcon className="w-2.5 h-2.5" />
                                                    </motion.div>
                                                )}
                                            </Link>
                                        ) : (
                                            <div className="relative">
                                                <button
                                                    className={`flex items-center gap-1.5 px-4 py-2 text-[14px] font-black transition-all rounded-full whitespace-nowrap relative ${isActive
                                                        ? (scrolled ? 'text-primary-main' : 'text-white')
                                                        : (scrolled ? 'text-primary-deep/60 hover:text-primary-main hover:bg-primary-main/5' : 'text-white/60 hover:text-white hover:bg-white/10')
                                                        }`}
                                                >
                                                    {category.name}
                                                    <ChevronDown size={14} className={`transition-transform duration-300 group-hover:rotate-180`} />
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="nav-active"
                                                            className={`absolute inset-0 rounded-full -z-10 ${scrolled ? 'bg-primary-main/5' : 'bg-white/10'}`}
                                                        />
                                                    )}
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="nav-icon"
                                                            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 transition-colors ${scrolled ? 'text-primary-main' : 'text-white'}`}
                                                        >
                                                            <WaterLogoIcon className="w-2.5 h-2.5" />
                                                        </motion.div>
                                                    )}
                                                </button>

                                                {/* ドロップダウンメニュー */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                                                    <div className="bg-white rounded-2xl shadow-premium border border-slate-100 p-2 min-w-[240px] flex flex-col gap-1 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                                                        {category.items.map((subItem) => {
                                                            const isSubActive = pathname === subItem.href;
                                                            return (
                                                                <Link
                                                                    key={subItem.href}
                                                                    href={subItem.href}
                                                                    className={`px-4 py-3 rounded-xl transition-colors group/item block ${isSubActive ? 'bg-primary-main/5' : 'hover:bg-slate-50'}`}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <span className={`font-bold text-sm transition-colors ${isSubActive ? 'text-primary-main' : 'text-primary-deep group-hover/item:text-primary-main'}`}>{subItem.name}</span>
                                                                        <ChevronRight size={14} className={`text-secondary-vibrant transition-all ml-auto ${isSubActive ? 'translate-x-0.5 opacity-100' : 'opacity-0 group-hover/item:translate-x-1 group-hover/item:opacity-100'}`} />
                                                                    </div>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <div className="ml-4 pl-4 border-l border-current/10 flex items-center">
                            </div>
                        </nav>

                        {/* モバイルメニューボタン & 緊急連絡 */}
                        <div className="flex items-center xl:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`p-2.5 rounded-xl transition-all ${scrolled ? 'text-primary-deep' : 'text-white'
                                    }`}
                                aria-label="メニューを開く"
                            >
                                {isOpen ? <X size={26} /> : <Menu size={26} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* モバイルフルスクリーンメニュー */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="xl:hidden fixed inset-0 z-[60] bg-primary-deep p-6 overflow-y-auto overscroll-contain pb-24"
                    >
                        <div className="flex justify-between items-center mb-10 pt-4 md:pt-0">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary-main p-2 rounded-xl text-white">
                                    <WaterLogoIcon className="w-5 h-5" />
                                </div>
                                <span className="text-white font-black text-lg">メニュー</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white p-2.5 rounded-full border border-white/20 bg-white/5 active:scale-90 transition-all"
                                aria-label="メニューを閉じる"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            {navCategories.map((category, idx) => (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="space-y-3"
                                >
                                    {category.items.length === 0 ? (
                                        <Link
                                            href={category.href!}
                                            className="flex items-center text-white/90 hover:text-white group"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <h3 className="text-lg font-black">{category.name}</h3>
                                            <ChevronRight size={20} className="ml-2 text-white/30 group-hover:text-white/70 transition-colors" />
                                        </Link>
                                    ) : (
                                        <>
                                            <h3 className="text-sm font-black text-secondary-vibrant uppercase tracking-widest">{category.name}</h3>
                                            <div className="grid grid-cols-1 gap-2 pl-2 border-l-2 border-white/10">
                                                {category.items.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10 active:bg-white/20 transition-all group"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <div>
                                                            <p className="text-base font-bold">{item.name}</p>
                                                            {item.desc && <p className="text-[10px] text-white/40 mt-0.5">{item.desc}</p>}
                                                        </div>
                                                        <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 pt-8 border-t border-white/10"
                        >
                            <p className="text-center text-white/40 text-[10px] mt-4 font-bold tracking-widest uppercase">
                                大井上水道企業団
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
