"use client";

import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSiteSettings, SiteSettings } from '@/lib/microcms';

export const EmergencyAlert = () => {
    const [settings, setSettings] = React.useState<SiteSettings | null>(null);

    React.useEffect(() => {
        const fetchSettings = async () => {
            const data = await getSiteSettings();
            setSettings(data);
        };
        fetchSettings();
    }, []);

    if (!settings?.notice_banner) return null;

    return (
        <section className="bg-amber-50 border-b border-amber-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
                <div className="flex flex-col md:flex-row items-center justify-center group text-center">
                    <div className="flex items-center space-x-3 w-full md:w-auto mb-2 md:mb-0 justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="bg-amber-500 text-white p-1.5 md:p-2 rounded-full shrink-0 shadow-sm shadow-amber-500/30"
                        >
                            <AlertTriangle size={18} className="md:w-5 md:h-5" />
                        </motion.div>
                        <span className="bg-amber-100 text-amber-700 text-[10px] md:text-xs font-black px-2 py-0.5 rounded border border-amber-200 shrink-0">
                            重要なお知らせ
                        </span>
                        <h3 className="text-amber-900 text-sm md:text-base font-bold pl-1">
                            {settings.notice_banner}
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
};
