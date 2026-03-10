"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Hero = () => {
    return (
        <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-primary-deep pb-0">
            {/* === 背景システム === */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* 1. ベースグラデーション */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#021338] via-primary-deep/90 to-primary-main/80 opacity-95" />

                {/* 2. プレミアム背景画像（生成画像への差し替え） */}
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full mix-blend-screen"
                >
                    <Image
                        src="/images/premium_hero_water.png"
                        alt="Premium Water Visual"
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>

                {/* 3. 浮遊する水滴パーティクル演出 */}
                <div className="absolute inset-0 z-10 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                scale: Math.random() * 0.5 + 0.5,
                                opacity: 0
                            }}
                            animate={{
                                y: ["-10%", "110%"],
                                opacity: [0, 0.3, 0]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 15,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "linear"
                            }}
                            className="absolute w-20 h-20 bg-gradient-to-br from-secondary-vibrant/30 to-transparent rounded-full blur-2xl"
                        />
                    ))}
                </div>

                {/* 4. 深みと立体感を出す光の演出 */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,180,216,0.15),transparent_70%)]" />
                <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[radial-gradient(ellipse_at_top_right,rgba(72,202,228,0.1),transparent_60%)]" />
            </div>

            {/* === メインコンテンツ（奥行きのあるレイアウト） === */}
            <div className="w-full px-5 sm:px-8 relative z-10 flex flex-col items-center text-center pt-[clamp(3rem,8vh,5rem)] pb-[clamp(2rem,5vh,4rem)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col items-center max-w-4xl w-full"
                >
                    {/* キャッチフレーズ（ロゴなし、より洗練された印象に） */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center justify-center bg-white/5 backdrop-blur-sm text-white/60 px-6 py-2 rounded-full mb-[clamp(1rem,3vh,2.5rem)] border border-white/10"
                    >
                        <span className="text-[clamp(0.5625rem,1.5vh,0.75rem)] font-black tracking-[0.4em] uppercase">Trusted Water Infrastructure</span>
                    </motion.div>

                    {/* メインキャッチコピー（バランスと改行の最適化） */}
                    <div className="mb-[clamp(1.5rem,4vh,3rem)] w-full flex flex-col items-center">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="font-serif text-[clamp(1.8rem,min(8vw,8vh),5.5rem)] font-black leading-[1.15] tracking-tight w-full"
                        >
                            <span className="hidden md:inline-block text-white">
                                いつでも安心、<br />
                                <span className="bg-gradient-to-r from-secondary-vibrant via-cyan-300 to-white bg-clip-text text-transparent drop-shadow-2xl">未来へつなぐ水。</span>
                            </span>
                            <span className="block md:hidden text-white">
                                いつでも安心、<br />
                                <span className="bg-gradient-to-r from-secondary-vibrant via-cyan-300 to-white bg-clip-text text-transparent">未来へつなぐ水。</span>
                            </span>
                        </motion.h1>
                    </div>

                    {/* サブメッセージ（透明感と可読性の向上） */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mb-[clamp(1.5rem,4vh,4rem)]"
                    >
                        <p className="text-[clamp(0.875rem,2vh,1.25rem)] text-white/90 font-medium leading-relaxed md:leading-loose max-w-3xl text-center tracking-wider [text-shadow:0_2px_20px_rgba(0,0,0,0.3)] px-4">
                            大井上水道企業団は、24時間365日休むことなく、<br />
                            生命の源である「水」の安全を守り、<br />
                            皆様の暮らしを揺るぎない品質で支え続けます。
                        </p>
                    </motion.div>

                    {/* 統計データパネル（より透明感のあるデザイン） */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="relative w-full max-w-lg grid grid-cols-3 gap-2 md:gap-4 p-[clamp(1rem,2.5vh,2.5rem)] rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/5 shadow-2xl overflow-hidden"
                    >
                        {/* 内部の光のゆらめき */}
                        <div className="absolute -top-1/2 -right-10 w-64 h-64 bg-secondary-vibrant/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-1/2 -left-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

                        {[
                            { value: '24h', label: '監視体制' },
                            { value: '365d', label: '水質管理' },
                            { value: '3', label: '自治体' },
                        ].map((stat, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center">
                                <p className="text-[clamp(1.5rem,4vh,3rem)] font-black text-white leading-none tracking-tighter mb-[clamp(0.2rem,0.8vh,0.75rem)]">
                                    {stat.value}
                                </p>
                                <p className="text-[clamp(0.45rem,1vh,0.65rem)] text-white/40 font-black uppercase tracking-[0.2em]">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none text-[var(--background)] translate-y-[1px]">
                <svg className="relative block w-full h-[80px] md:h-[96px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <motion.path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        fill="currentColor"
                        opacity=".25"
                        animate={{
                            x: [-20, 20, -20],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5V0Z"
                        fill="currentColor"
                        opacity=".5"
                        animate={{
                            x: [20, -20, 20],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        fill="currentColor"
                        animate={{
                            x: [-10, 10, -10],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </svg>
            </div>
        </section>
    );
};
