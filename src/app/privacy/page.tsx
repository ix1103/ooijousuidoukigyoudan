"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Shield, Lock, EyeOff, UserCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
    const sections = [
        {
            icon: <Shield className="text-primary-main" size={24} />,
            title: "個人情報の収集について",
            content: "当企業団が提供するサービスの円滑な運営に必要な範囲で、利用者の皆様から情報を収集しています。収集した情報は適正に管理し、利用目的の範囲内でのみ利用します。"
        },
        {
            icon: <Lock className="text-primary-main" size={24} />,
            title: "適正な管理",
            content: "収集した個人情報の漏えい、亡失、改ざんを防止するために安全を確保し、厳重に管理します。保有する必要がなくなった情報は、速やかにかつ適正に廃棄または消去します。"
        },
        {
            icon: <EyeOff className="text-primary-main" size={24} />,
            title: "第三者への提供制限",
            content: "法令に基づく場合や、本人の同意がある場合を除き、個人情報を収集した目的以外に利用したり、第三者に提供したりすることはありません。"
        },
        {
            icon: <UserCheck className="text-primary-main" size={24} />,
            title: "法令の遵守",
            content: "「大井上水道企業団個人情報保護条例」および関係法令を遵守し、個人情報保護の取組みの継続的な改善に努めます。"
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="プライバシーポリシー"
                subtitle="皆様の大切な個人情報を安全に守るため、法令を遵守し適切な取り扱いに努めます。"
                enTitle="Privacy Policy"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-premium p-8 md:p-16 space-y-12">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-8">
                        <div className="bg-primary-main/5 p-4 rounded-2xl">
                            <ShieldAlert size={32} className="text-primary-main" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-primary-deep">基本的人格権の尊重</h2>
                            <p className="text-text-sub text-sm mt-1">当サイトでは、個人情報の重要性を認識し、その保護を徹底します。</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-3">
                                    {section.icon}
                                    <h3 className="text-lg font-black text-primary-deep">{section.title}</h3>
                                </div>
                                <p className="text-text-sub text-sm md:text-base leading-relaxed pl-9">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                        <p className="text-text-sub/60 text-xs">
                            お問い合わせ先：大井上水道企業団 庶務係<br />
                            電話：0547-46-4130
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
