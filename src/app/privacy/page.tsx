"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ShieldAlert } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="個人情報保護方針"
                subtitle="大井上水道企業団における個人情報の取り扱いについて"
                enTitle="Privacy Policy"
            />

            <section className="py-16 md:py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 prose prose-slate max-w-none">
                        <div className="flex items-center gap-3 mb-8 text-primary-deep">
                            <ShieldAlert className="w-8 h-8 text-primary-main" />
                            <h2 className="text-2xl mt-0 mb-0 font-black tracking-widest border-none">基本的な考え方</h2>
                        </div>

                        <p className="lead text-lg text-text-main font-medium leading-relaxed mb-10">
                            大井上水道企業団（以下「当企業団」といいます。）は、当サイトを通じて提供を受けた個人情報について、「個人情報の保護に関する法律」その他の関係法令に基づき、適正に取り扱います。
                        </p>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xl font-bold text-primary-deep border-b-2 border-primary-main/20 pb-3 mb-4">1. 個人情報とは</h3>
                                <p className="text-text-sub leading-relaxed">
                                    当サイトを通じて当企業団が提供を受けた、住所、氏名、電話番号、E-mailアドレス等、個人が特定され得る情報をいいます。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-primary-deep border-b-2 border-primary-main/20 pb-3 mb-4">2. 個人情報の収集・取得について</h3>
                                <p className="text-text-sub leading-relaxed mb-4">
                                    当サイトを通じて当企業団が個人情報を収集する際は、利用者ご本人の意思による情報の提供を原則とします。
                                    個人情報の収集にあたっては、その目的を明示し、明示した目的を達成するために必要な範囲内でこれを行います。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-primary-deep border-b-2 border-primary-main/20 pb-3 mb-4">3. 個人情報の利用制限について</h3>
                                <p className="text-text-sub leading-relaxed">
                                    皆様から提供いただいた個人情報は、あらかじめ明示した収集目的の範囲内で利用いたします。
                                    個人情報の収集目的を越えた当該企業団内における利用及び当該企業団以外の者への提供は、法令等で定める場合を除き、一切行いません。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-primary-deep border-b-2 border-primary-main/20 pb-3 mb-4">4. 個人情報の管理について</h3>
                                <p className="text-text-sub leading-relaxed">
                                    収集しました個人情報については、厳重に管理し、漏洩、不正流用、改ざん等の防止に適切な対策を講じます。
                                    また、保有する必要がなくなった個人情報は、確実かつ速やかに消去します。
                                </p>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-12">
                                <h4 className="font-bold text-primary-deep mb-2">お問い合わせ窓口</h4>
                                <p className="text-sm text-text-sub">
                                    大井上水道企業団 総務課<br />
                                    〒428-0013 静岡県島田市金谷東一丁目1255番地の2<br />
                                    電話：0547-46-4111<br />
                                    FAX：0547-46-1095
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
