import React from 'react';
import { getSiteStatus } from '@/lib/microcms';
import { PageHeader } from '@/components/PageHeader';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '緊急情報',
    description: '大井上水道企業団からの緊急のお知らせです。',
};

export default async function EmergencyPage() {
    const status = await getSiteStatus();

    // 緊急情報がない場合、トップへ誘導
    if (!status || !status.isEmergencyActive) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f8f9fa] px-4">
                <h1 className="text-xl md:text-2xl font-black text-primary-deep mb-6 text-center">
                    現在、緊急のお知らせはありません
                </h1>
                <Link href="/" className="bg-primary-main text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-lg hover:bg-primary-deep transition-colors">
                    <ArrowLeft size={18} />
                    <span>トップページへ戻る</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-32 bg-[#f8f9fa]">
            <PageHeader
                title="緊急情報"
                enTitle="Emergency Info"
                breadcrumbs={[{ name: 'Emergency', href: '/emergency' }]}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 space-y-12">
                <article className="bg-white p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-premium border-2 border-red-500/20">
                    <div className="flex items-center gap-4 mb-8 md:mb-10 pb-6 md:pb-8 border-b border-red-100">
                        <div className="bg-red-500 text-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-lg shrink-0">
                            <AlertTriangle size={32} className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h1 className="text-xl md:text-3xl font-black text-red-600 leading-tight">
                            {status.emergencyMessage || '緊急情報'}
                        </h1>
                    </div>

                    <div className="prose prose-lg prose-red max-w-none text-text-main leading-loose font-medium">
                        {status.emergencyContent ? (
                            <div dangerouslySetInnerHTML={{ __html: status.emergencyContent }} />
                        ) : (
                            <p>現在、詳細な情報はありません。最新の情報はお電話等または各自治体の窓口でご確認ください。</p>
                        )}
                    </div>

                    <div className="mt-16 pt-10 border-t border-slate-100 flex justify-center">
                        <Link
                            href="/"
                            className="bg-primary-deep text-white px-10 py-5 rounded-2xl font-black flex items-center gap-4 hover:bg-primary-main transition-all shadow-xl"
                        >
                            <ArrowLeft size={18} />
                            <span>トップページへ戻る</span>
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
