"use client";

import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Home, UserX, Edit, ChevronRight, Phone } from 'lucide-react';
import Link from 'next/link';

/**
 * 各種手続きページ（/resident/procedure）
 * 開栓・閉栓・名義変更などの手続き案内。
 */
export default function ProcedurePage() {
    const procedures = [
        {
            icon: <Home size={28} />,
            title: '使用開始（開栓）',
            desc: 'お引越しで水を使い始めるとき。引越し日の3日前までにご連絡ください。',
            steps: ['①企業団へお電話ください', '②ご住所・氏名・引越し日をお知らせください', '③担当者が開栓に伺います（立会い不要）']
        },
        {
            icon: <UserX size={28} />,
            title: '使用中止（閉栓）',
            desc: 'お引越しで水を止めるとき。退去予定日の前日までにご連絡ください。',
            steps: ['①企業団へお電話ください', '②現住所・退去日をお知らせください', '③担当者が閉栓に伺います（立会い不要の場合あり）']
        },
        {
            icon: <Edit size={28} />,
            title: '名義変更・その他',
            desc: '所有者の変更や代表者変更、再開栓のお申し込みはお電話またはご来庁ください。',
            steps: ['①企業団へお電話またはご来庁ください', '②必要書類をご確認の上お手続きください']
        },
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="各種手続き"
                subtitle="お引越しや名義変更など、水道の各種お手続きはこちらからご確認ください。"
                enTitle="Procedures"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
                    {procedures.map((item, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10">
                            <div className="text-primary-main bg-primary-main/5 p-3 md:p-4 rounded-xl w-fit mb-4 md:mb-6">{item.icon}</div>
                            <h3 className="font-black text-primary-deep text-lg mb-2 md:mb-3">{item.title}</h3>
                            <p className="text-text-sub text-sm leading-relaxed mb-4">{item.desc}</p>
                            <ul className="space-y-2">
                                {item.steps.map((step, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-text-sub">
                                        <ChevronRight size={14} className="text-primary-main shrink-0 mt-0.5" />{step}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
                <div className="bg-primary-deep rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center">
                    <h3 className="text-xl md:text-2xl font-black mb-3">お電話でのお申し込み</h3>
                    <p className="text-white/60 text-sm mb-6">平日 8:15〜17:00 受付（土日・祝日を除く）</p>
                    <a href="tel:0547-46-4130" className="inline-flex items-center gap-3 bg-white text-primary-deep font-black text-xl md:text-2xl px-8 py-4 rounded-2xl hover:bg-primary-main hover:text-white transition-all shadow-lg">
                        <Phone size={24} />0547-46-4130
                    </a>
                </div>
            </div>
        </div>
    );
}
