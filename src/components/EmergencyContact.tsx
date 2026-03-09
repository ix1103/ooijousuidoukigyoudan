"use client";

import React from 'react';
import { AlertTriangle, Phone, Wrench } from 'lucide-react';
import { WaterLogoIcon } from './WaterLogoIcon';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const EmergencyContact = () => {
    const contacts = [
        {
            title: '漏水・破裂',
            desc: '道路や宅地内での水漏れを見つけたとき',
            icon: <WaterLogoIcon className="text-secondary-vibrant w-6 h-6" />,
            href: '/resident/trouble#road-leak',
            gradient: 'from-secondary-vibrant/5 to-primary-main/5'
        },
        {
            title: '断水・濁り',
            desc: '水が出ない、水が濁っているとき',
            icon: <AlertTriangle className="text-amber-500 w-6 h-6" />,
            href: '/resident/trouble#no-water',
            gradient: 'from-amber-50 to-orange-50'
        },
        {
            title: '修理のご相談',
            desc: '蛇口のパッキン交換や器具の故障など',
            icon: <Wrench className="text-slate-500 w-6 h-6" />,
            href: '/business/contractor',
            gradient: 'from-slate-50 to-slate-100/50'
        },
        {
            title: '24時間受付番号',
            desc: '夜間、休日などの緊急連絡先',
            icon: <Phone className="text-red-500 w-6 h-6" />,
            href: 'tel:0547-46-4130',
            gradient: 'from-red-50 to-rose-50'
        }
    ];

    return (
        <section className="pt-12 md:pt-24 pb-12 md:pb-24 relative overflow-hidden bg-white">
            {/* 装飾的な背景要素 */}
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent-soft/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-16 text-left"
                >
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-4">
                        <div className="w-10 md:w-16 h-1 bg-gradient-to-r from-secondary-vibrant to-primary-main rounded-full" />
                        <span className="tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm uppercase font-black font-black">Emergency Support</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-primary-deep tracking-tight">お困りのときは</h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {contacts.map((contact, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group h-full"
                        >
                            <Link
                                href={contact.href}
                                className={`p-8 md:p-10 rounded-[2.5rem] border border-slate-100/80 bg-gradient-to-br ${contact.gradient} transition-all duration-500 shadow-sm hover:shadow-premium group relative overflow-hidden active:scale-[0.98] block h-full`}
                            >
                                {/* ホバー装飾 */}
                                <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-white/20 rounded-full translate-x-8 md:translate-x-12 -translate-y-8 md:-translate-y-12 group-hover:scale-[2.5] transition-transform duration-700" />

                                <div className="bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-premium inline-block mb-6 md:mb-8 relative z-10 group-hover:shadow-glow transition-shadow duration-500">
                                    {contact.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-primary-deep mb-3 md:mb-4 relative z-10 group-hover:text-primary-main transition-colors leading-snug">
                                    {contact.title}
                                </h3>
                                <p className="text-text-sub text-xs md:text-sm leading-relaxed mb-8 md:mb-10 relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                                    {contact.desc}
                                </p>

                                <div className="flex items-center space-x-2 text-secondary-vibrant font-black text-[10px] md:text-xs tracking-widest uppercase relative z-10 mt-auto">
                                    {contact.href.startsWith('tel:') ? (
                                        <div className="flex items-center gap-2 text-red-600">
                                            <span>今すぐ電話する</span>
                                            <div className="w-6 h-px bg-red-600 group-hover:w-10 transition-all" />
                                        </div>
                                    ) : (
                                        <>
                                            <span>詳細を確認する</span>
                                            <div className="w-6 h-px bg-gradient-to-r from-secondary-vibrant to-primary-main group-hover:w-10 transition-all" />
                                        </>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
