"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { WaterLogoIcon } from './WaterLogoIcon';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const pathname = usePathname();

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

    const navItems = [
        { name: 'ホーム', href: '/', desc: 'トップページへ' },
        { name: 'お知らせ', href: '/news', desc: '最新情報・議会報告' },
        { name: '手続き・料金', href: '/guide', desc: 'お支払い・各種申請' },
        { name: '水質情報', href: '/water-quality', desc: '水質基準・検査結果' },
        { name: '水道トラブル', href: '/trouble', desc: '漏水・断水・凍結の対処法' },
        { name: 'よくある質問', href: '/faq', desc: '料金・水質のQ&A' },
        { name: '企業団について', href: '/about', desc: '組織概要・アクセス' },
        { name: '工事業者向け', href: '/contractor', desc: '指定工事店・様式' },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
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
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={item.href === '/' ? handleHomeClick : undefined}
                                    className={`px-4 py-2 text-[13px] font-black transition-all rounded-full relative group whitespace-nowrap ${scrolled
                                        ? 'text-primary-deep/80 hover:text-primary-main hover:bg-primary-main/5'
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="ml-4 pl-4 border-l border-current/10 flex items-center">
                                <a
                                    href="tel:0547-46-4130"
                                    className="flex items-center space-x-2 bg-primary-main text-white px-5 py-2.5 rounded-2xl font-black text-xs shadow-lg hover:bg-primary-deep transition-all active:scale-95"
                                >
                                    <Phone size={14} fill="currentColor" />
                                    <span>緊急連絡先</span>
                                </a>
                            </div>
                        </nav>

                        {/* モバイルメニューボタン & 緊急連絡 */}
                        <div className="flex items-center space-x-2 xl:hidden">
                            <a
                                href="tel:0547-46-4130"
                                className={`p-2.5 rounded-xl transition-all ${scrolled ? 'bg-primary-main/10 text-primary-main' : 'bg-white/10 text-white'
                                    }`}
                            >
                                <Phone size={20} />
                            </a>
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
                        className="xl:hidden fixed inset-0 z-[60] bg-primary-deep p-6"
                    >
                        <div className="flex justify-between items-center mb-10">
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

                        <nav className="grid grid-cols-1 gap-3">
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 active:bg-white/20 transition-all group"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary-vibrant opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div>
                                                <p className="text-lg font-black">{item.name}</p>
                                                <p className="text-[10px] text-white/40 mt-1 font-medium tracking-wider">{item.desc}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-white/20" />
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 pt-8 border-t border-white/10"
                        >
                            <a
                                href="tel:0547-46-4130"
                                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-red-500 to-rose-600 text-white py-5 rounded-2xl font-black text-lg shadow-2xl active:scale-95 transition-transform"
                                onClick={() => setIsOpen(false)}
                            >
                                <Phone size={22} fill="currentColor" />
                                <span>24時間緊急受付</span>
                            </a>
                            <p className="text-center text-white/40 text-xs mt-4 font-bold tracking-widest">TEL: 0547-46-4130</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
