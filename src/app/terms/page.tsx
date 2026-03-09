"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { FileText, Link2, AlertTriangle, Copyright, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsPage() {
    const policies = [
        {
            icon: <Copyright className="text-primary-main" size={24} />,
            title: "著作権について",
            content: "当サイトに掲載されている情報（文字、写真、イラスト等）の著作権は、原則として大井上水道企業団に帰属します。私的使用のための複製や引用など、著作権法上認められた場合を除き、無断で転載・複製することはできません。"
        },
        {
            icon: <Link2 className="text-primary-main" size={24} />,
            title: "リンクについて",
            content: "当サイトへのリンクは原則として自由ですが、リンク元のホームページの内容が法律や法令等に違反している場合や、公序良俗に反する場合などは、リンクをお断りすることがあります。"
        },
        {
            icon: <AlertTriangle className="text-primary-main" size={24} />,
            title: "免責事項",
            content: "当サイトに掲載されている情報の正確さには万全を期していますが、企業団は利用者が当サイトの情報を用いて行う一切の行為について、いかなる責任も負いません。また、予告なしに内容を変更または削除する場合があります。"
        },
        {
            icon: <ExternalLink className="text-primary-main" size={24} />,
            title: "外部サイトへのリンク",
            content: "当サイトから外部へリンクしている場合がありますが、それらの外部サイトの内容について、企業団は何ら責任を負うものではありません。"
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="サイトポリシー"
                subtitle="当サイトをご利用いただくにあたってのお願いと、権利関係・免責事項について。"
                enTitle="Site Policy"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-premium p-8 md:p-16 space-y-12">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-8">
                        <div className="bg-primary-main/5 p-4 rounded-2xl">
                            <FileText size={32} className="text-primary-main" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-primary-deep">ご利用にあたって</h2>
                            <p className="text-text-sub text-sm mt-1">当ウェブサイトの適切な利用をお願いいたします。</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {policies.map((policy, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-3">
                                    {policy.icon}
                                    <h3 className="text-lg font-black text-primary-deep">{policy.title}</h3>
                                </div>
                                <p className="text-text-sub text-sm md:text-base leading-relaxed pl-9">
                                    {policy.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                        <p className="text-text-sub/60 text-xs text-center">
                            大井上水道企業団 庶務係<br />
                            情報は2026年03月07日時点のものです。最新の規約をご確認ください。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
