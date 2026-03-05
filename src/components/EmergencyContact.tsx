"use client";

import React from 'react';
import { AlertTriangle, Phone, Wrench } from 'lucide-react';
import { WaterLogoIcon } from './WaterLogoIcon';
import { motion } from 'framer-motion';

export const EmergencyContact = () => {
    const contacts = [
        {
            title: '漏水・破裂',
            desc: '道路や宅地内での水漏れを見つけたとき',
            icon: <WaterLogoIcon className="text-secondary-vibrant w-6 h-6" />,
            action: '指定工事店へ連絡',
            gradient: 'from-secondary-vibrant/5 to-primary-main/5'
        },
        {
            title: '断水・濁り',
            desc: '水が出ない、水が濁っているとき',
            icon: <AlertTriangle className="text-amber-500 w-6 h-6" />,
            action: '企業団へ問い合わせ',
            gradient: 'from-amber-50 to-orange-50'
        },
        {
            title: '修理のご相談',
            desc: '蛇口のパッキン交換や器具の故障など',
            icon: <Wrench className="text-slate-500 w-6 h-6" />,
            action: '指定給水装置工事事業者',
            gradient: 'from-slate-50 to-slate-100/50'
        }
    ];

    return (
        <section className="py-16 md:py-32 relative overflow-hidden">
            {/* 装飾的な背景要素 */}
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent-soft/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-secondary-vibrant/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-3 md:mb-4">
                            <div className="w-8 md:w-12 h-1.5 bg-gradient-to-r from-secondary-vibrant to-primary-main rounded-full" />
                            <span className="tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm">EMERGENCY SUPPORT</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-black text-primary-deep">お困りのときは</h2>
                    </motion.div>

                    {/* 電話ボタン（パルスリング付き） */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <a
                            href="tel:0547-46-4130"
                            className="bg-gradient-to-br from-primary-deep to-primary-main p-5 md:p-8 rounded-2xl md:rounded-3xl flex items-center space-x-4 md:space-x-6 shadow-glow-lg relative overflow-hidden group active:scale-95 transition-transform block"
                        >
                            {/* ホバーオーバーレイ */}
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* パルスリング付き電話アイコン */}
                            <div className="relative">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="bg-red-500 p-3 md:p-4 rounded-xl md:rounded-2xl text-white shadow-lg pulse-ring relative z-10"
                                >
                                    <Phone size={22} strokeWidth={2.5} className="md:w-7 md:h-7" />
                                </motion.div>
                            </div>

                            <div className="relative z-10">
                                <p className="text-secondary-vibrant text-[10px] md:text-xs font-black uppercase tracking-widest mb-1">24時間受付</p>
                                <p className="text-2xl md:text-4xl font-black text-white leading-none">
                                    0547-46-4130
                                </p>
                            </div>
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {contacts.map((contact, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100/80 bg-gradient-to-br ${contact.gradient} transition-all duration-500 shadow-sm hover:shadow-glow group relative overflow-hidden active:scale-[0.98]`}
                        >
                            {/* ホバー装飾 */}
                            <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-secondary-vibrant/5 rounded-full translate-x-8 md:translate-x-12 -translate-y-8 md:-translate-y-12 group-hover:scale-[2] transition-transform duration-700" />

                            <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-premium inline-block mb-4 md:mb-6 relative z-10 group-hover:shadow-glow transition-shadow duration-500">
                                {contact.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-primary-deep mb-2 md:mb-3 relative z-10">{contact.title}</h3>
                            <p className="text-text-sub text-xs md:text-sm leading-relaxed mb-6 md:mb-8 relative z-10">{contact.desc}</p>

                            <div className="flex items-center space-x-2 text-secondary-vibrant font-black text-xs md:text-sm relative z-10">
                                <span>詳細を確認する</span>
                                <div className="w-6 h-px bg-gradient-to-r from-secondary-vibrant to-primary-main group-hover:w-10 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
