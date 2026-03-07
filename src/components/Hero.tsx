"use client";

import React from 'react';
import { WaterLogoIcon } from './WaterLogoIcon';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Hero = () => {
    return (
        <section className="relative min-h-[80dvh] md:min-h-screen flex items-center overflow-hidden bg-primary-deep pb-12 md:pb-0">
            {/* === 背景システム === */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* 1. ベースグラデーション */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#021338] via-primary-deep to-primary-main opacity-95" />

                {/* 2. 巨大な企業ロゴの透かし（ウォーターマーク） */}
                <div className="absolute top-1/2 left-1/2 md:left-auto md:-right-1/2 -translate-x-1/2 -translate-y-[60%] md:-translate-x-0 md:-translate-y-1/2 w-[160%] md:w-[150%] h-[160%] md:h-[150%] opacity-[0.03] md:opacity-[0.04] text-white rotate-[-5deg] md:rotate-[-5deg] origin-center z-0">
                    <WaterLogoIcon className="w-full h-full" />
                </div>

                {/* 3. 深みと立体感を出す光の演出 */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,180,216,0.15),transparent_70%)]" />
                <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[radial-gradient(ellipse_at_top_right,rgba(72,202,228,0.1),transparent_60%)]" />
            </div>

            {/* === メインコンテンツ（2カラムスプリット） === */}
            <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-10 lg:gap-16 items-center">

                {/* 左側：タイポグラフィ空間 */}
                <div className="lg:col-span-5 2xl:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-20 mt-[-4rem] md:mt-0">
                    {/* バッジ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="inline-flex flex-row items-center space-x-3 bg-white/[0.05] backdrop-blur-md border border-white/10 text-secondary-vibrant px-4 py-2 md:px-5 md:py-2.5 rounded-full mb-8 md:mb-12 w-fit shadow-lg shadow-black/10"
                    >
                        <div className="bg-secondary-vibrant/20 p-1 md:p-1.5 rounded-full">
                            <WaterLogoIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">Water Infrastructure Pride</span>
                    </motion.div>

                    {/* メインタイトル */}
                    <div className="space-y-2 md:space-y-4 mb-8 md:mb-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black text-white leading-[1.1] tracking-tight drop-shadow-xl"
                        >
                            いつでも安心、
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black leading-[1.1] tracking-tight"
                        >
                            <span className="bg-gradient-to-r from-secondary-vibrant via-[#48CAE4] to-white bg-clip-text text-transparent drop-shadow-2xl">
                                未来へつなぐ水。
                            </span>
                        </motion.h1>
                    </div>

                    {/* サブテキスト */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="text-sm md:text-lg text-white/60 mb-10 md:mb-14 leading-relaxed max-w-lg font-medium tracking-wide"
                    >
                        大井上水道企業団は、24時間365日休むことなく、
                        生命の源である「水」の安全を守り、皆様の暮らしを
                        揺るぎない品質で支え続けます。
                    </motion.p>

                    {/* 統計バー */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="flex items-center gap-6 md:gap-10 border-t border-white/10 pt-8"
                    >
                        {[
                            { value: '24h', label: '監視体制' },
                            { value: '365d', label: '水質管理' },
                            { value: '3', label: '自治体連携' },
                        ].map((stat, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <div className="w-px h-8 bg-white/10" />}
                                <div>
                                    <p className="text-2xl md:text-4xl font-black text-white leading-none tracking-tight mb-2">
                                        {stat.value}
                                    </p>
                                    <p className="text-[10px] md:text-xs text-secondary-vibrant font-bold uppercase tracking-widest">
                                        {stat.label}
                                    </p>
                                </div>
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>

                {/* 右側：ビジュアルエリア（生成画像） */}
                <motion.div
                    initial={{ opacity: 0, x: 40, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-7 2xl:col-span-7 order-1 lg:order-2 relative w-11/12 mx-auto md:w-full aspect-[2/1] md:aspect-[4/3] lg:aspect-auto lg:h-[700px] xl:translate-x-6 z-10 pointer-events-none"
                >
                    {/* 画像の境界をぼかし、透過させて背景に溶け込ませる */}
                    <div
                        className="absolute inset-0 w-full h-full opacity-40 md:opacity-50 mix-blend-screen"
                        style={{
                            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
                        }}
                    >
                        <Image
                            src="/images/herobg.png"
                            alt="Premium Water Abstract"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover object-center transform hover:scale-105 transition-transform duration-[2000ms] ease-out will-change-transform"
                        />
                    </div>
                </motion.div>
            </div>

            {/* 下部のウェーブ装飾 */}
            <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none text-[var(--background)]">
                <svg className="relative block w-full h-[40px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" opacity=".25" />
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5V0Z" fill="currentColor" opacity=".5" />
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor" />
                </svg>
            </div>
        </section>
    );
};
