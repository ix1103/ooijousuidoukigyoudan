"use client";

import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { FileText, Phone, ChevronRight, Calendar, Loader2 } from 'lucide-react';
import React from 'react';
import { getBiddingList, Bidding } from '@/lib/microcms';

/**
 * 入札・契約情報ページ（/business/bidding）
 * MicroCMSの `bidding` エンドポイント（リスト型）から情報を取得します。
 * API取得失敗時（環境変数未設定等）はフォールバックとして静的な内容を表示します。
 */

// MicroCMS未設定時に表示するフォールバックデータ
const FALLBACK_ITEMS: Bidding[] = [
    { id: '1', createdAt: '', publishedAt: '2025-04-01', title: '令和7年度 薬品購入（次亜塩素酸ナトリウム）', type: '入札公告' },
    { id: '2', createdAt: '', publishedAt: '2025-03-15', title: '令和6年度 施設修繕工事（3号配水池）', type: '落札結果' },
    { id: '3', createdAt: '', publishedAt: '2024-10-01', title: '令和6年度 計量機器定期点検業務', type: '入札公告' },
];

const typeColor: Record<string, string> = {
    '入札公告': 'bg-blue-100 text-blue-700',
    '落札結果': 'bg-green-100 text-green-700',
    'お知らせ': 'bg-amber-100 text-amber-700',
};

export default function BiddingPage() {
    const [items, setItems] = React.useState<Bidding[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isCmsData, setIsCmsData] = React.useState(false);

    React.useEffect(() => {
        getBiddingList().then((data) => {
            if (data && data.length > 0) {
                setItems(data);
                setIsCmsData(true);
            } else {
                // MicroCMS未設定またはデータなし → フォールバックを表示
                setItems(FALLBACK_ITEMS);
            }
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="入札・契約情報"
                subtitle="入札公告・落札結果・指名参加業者等の情報を掲載しています。"
                enTitle="Bidding & Contracts"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">

                {/* MicroCMS未連動の場合の注意書き */}
                {!isCmsData && !loading && (
                    <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-bold">
                        ⚠ 現在、MicroCMSとの連動が未設定のため、サンプルデータを表示しています。
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-20 text-slate-400">
                        <Loader2 size={24} className="animate-spin mr-2" />
                        <span className="font-bold">読み込み中...</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.06 }}
                                className="bg-white border border-slate-100 rounded-2xl p-5 md:p-8 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-lg transition-all"
                            >
                                <span className={`text-xs font-black px-3 py-1 rounded-full w-fit ${typeColor[item.type] ?? 'bg-slate-100 text-slate-600'}`}>
                                    {item.type}
                                </span>
                                <div className="flex-1">
                                    <p className="font-black text-primary-deep text-sm md:text-base">{item.title}</p>
                                    <p className="text-text-sub text-xs mt-1 flex items-center gap-1">
                                        <Calendar size={12} />
                                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('ja-JP') : ''}
                                    </p>
                                </div>
                                {item.pdfUrl && (
                                    <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-bold text-primary-main hover:underline">
                                        <FileText size={14} />PDF
                                        <ChevronRight size={14} />
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}

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
