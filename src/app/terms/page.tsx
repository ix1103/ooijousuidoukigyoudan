"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { FileText } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="利用規約・免責事項"
                subtitle="大井上水道企業団ホームページの利用について"
                enTitle="Terms of Service"
            />

            <section className="py-16 md:py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 prose prose-slate max-w-none">
                        <div className="flex items-center gap-3 mb-8 text-primary-deep">
                            <FileText className="w-8 h-8 text-primary-main" />
                            <h2 className="text-2xl mt-0 mb-0 font-black tracking-widest border-none">サイトの利用について</h2>
                        </div>

                        <p className="lead text-lg text-text-main font-medium leading-relaxed mb-10">
                            大井上水道企業団ホームページ（以下「当サイト」といいます）をご利用いただくにあたっての条件や注意事項等を記載しています。ご一読の上、ご利用ください。
                        </p>

                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-primary-deep border-b-2 border-primary-main/20 pb-3 mb-4">1. 免責事項</h3>
                                <ul className="list-disc pl-5 space-y-2 text-text-sub leading-relaxed">
                                    <li>当サイトに掲載されている情報の正確性については万全を期していますが、当企業団は利用者が当サイトの情報を用いて行う一切の行為について、何ら責任を負うものではありません。</li>
                                    <li>当サイトのご利用にあたり生じた損害やトラブルについて、当企業団は一切責任を負いません。</li>
                                    <li>当サイトの情報やURLは、予告なしに変更、削除される場合があります。また、メンテナンス等の理由により当サイトの運用を一時休止または停止する場合があります。</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-primary-deep border-b-2 border-primary-main/20 pb-3 mb-4">2. 著作権について</h3>
                                <p className="text-text-sub leading-relaxed">
                                    当サイトに掲載されている文章、画像等の著作権は、大井上水道企業団または原著作者に帰属します。
                                    「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-primary-deep border-b-2 border-primary-main/20 pb-3 mb-4">3. リンクについて</h3>
                                <p className="text-text-sub leading-relaxed mb-4">
                                    当サイトへのリンクは、原則として自由です。事前のご連絡は不要ですが、リンク元のホームページの内容やリンクの方法によっては、リンクをお断りする場合があります。
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-text-sub leading-relaxed">
                                    <li>リンクを設定する際は、大井上水道企業団のホームページへのリンクである旨を明記してください。</li>
                                    <li>当サイトのページをフレーム内に表示させるリンク設定は行わないでください。</li>
                                    <li>当サイトから、または当サイトへリンクを張っている第三者のウェブサイトの内容は、それぞれの責任で管理されるものであり、当企業団の管理下にあるものではありません。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
