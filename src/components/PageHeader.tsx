"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Breadcrumb = {
    name: string;
    href: string;
};

type PageHeaderProps = {
    title: string;
    subtitle?: React.ReactNode;
    enTitle: string;
    breadcrumbs?: Breadcrumb[];
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, enTitle, breadcrumbs }) => {
    return (
        <div className="bg-primary-deep py-16 md:py-32 relative overflow-hidden">
            {/* バックグラウンドメッシュ・グラデーション */}
            <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-br from-primary-deep via-primary-main to-primary-light opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/50 via-transparent to-transparent" />

            {/* フローティング装飾 */}
            <div className="absolute top-[20%] right-[10%] w-32 md:w-48 h-32 md:h-48 bg-secondary-vibrant/10 rounded-full blur-[60px] animate-float" />
            <div className="absolute bottom-[30%] left-[5%] w-24 md:w-40 h-24 md:h-40 bg-primary-light/15 rounded-full blur-[50px] animate-float-slow" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm font-black text-secondary-vibrant uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-10 text-shadow-premium"
                >
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    {breadcrumbs && breadcrumbs.map((crumb, idx) => (
                        <React.Fragment key={idx}>
                            <ChevronRight size={12} strokeWidth={3} className="md:hidden" />
                            <ChevronRight size={14} strokeWidth={3} className="hidden md:block" />
                            <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.name}</Link>
                        </React.Fragment>
                    ))}
                    <ChevronRight size={12} strokeWidth={3} className="md:hidden" />
                    <ChevronRight size={14} strokeWidth={3} className="hidden md:block" />
                    <span className="text-white">{enTitle}</span>
                </motion.nav>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl md:text-7xl font-black text-white leading-tight text-shadow-strong"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-5 md:mt-8 text-white/90 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-bold text-shadow-premium"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>

            {/* 下部ウェーブ */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-[40px] md:h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="var(--background)" opacity=".3"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="var(--background)"></path>
                </svg>
            </div>
        </div>
    );
};
