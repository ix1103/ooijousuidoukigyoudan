"use client";

import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { FileText, Phone, Mail, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

/**
 * 入札・契約情報ページ（/business/bidding）
 * Phase 3でMicroCMS連動予定。現在はプレースホルダー表示。
 */
export default function BiddingPage() {
    const placeholderItems = [
        { type: '入札公告', title: '令和7年度 薬品購入（次亜塩素酸ナトリウム）', date: '2025-04-01', pdf: '#' },
        { type: '落札結果', title: '令和6年度 施設修繕工事（3号配水池）', date: '2025-03-15', pdf: '#' },
        { type: '入札公告', title: '令和6年度 計量機器定期点検業務', date: '2024-10-01', pdf: '#' },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="入札・契約情報"
                subtitle="入札公告・落札結果・指名参加業者等の情報を掲載しています。"
                enTitle="Bidding & Contracts"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
                <div className="space-y-4">
                    {placeholderItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-slate-100 rounded-2xl p-5 md:p-8 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-lg transition-all"
                        >
                            <span className={`text-xs font-black px-3 py-1 rounded-full w-fit ${item.type === '入札公告' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                {item.type}
                            </span>
                            <div className="flex-1">
                                <p className="font-black text-primary-deep text-sm md:text-base">{item.title}</p>
                                <p className="text-text-sub text-xs mt-1 flex items-center gap-1">
                                    <Calendar size={12} />{item.date}
                                </p>
                            </div>
                            <a href={item.pdf} className="flex items-center gap-2 text-xs font-bold text-primary-main hover:underline">
                                <FileText size={14} />PDF
                                <ChevronRight size={14} />
                            </a>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-12 bg-slate-50 rounded-2xl p-6 md:p-10 border border-slate-100">
                    <h3 className="font-black text-primary-deep mb-3">入札参加資格の申請について</h3>
                    <p className="text-text-sub text-sm leading-relaxed mb-4">
                        入札参加資格申請については、企業団へお問い合わせください。
                    </p>
                    <a href="tel:0547-46-4111" className="inline-flex items-center gap-2 font-black text-primary-main hover:underline text-sm">
                        <Phone size={16} />0547-46-4111（代表）
                    </a>
                </div>
            </div>
        </div>
    );
}
