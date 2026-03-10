"use client";

import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { FileText, Phone, ChevronRight, Calendar, Loader2, Download, ArrowUpRight, Info, Mail, ClipboardList } from 'lucide-react';
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

// ダウンロード用コンポーネント（contractor/page.tsx と一貫性を持たせる）
function FormRow({ item }: { item: any }) {
    const mainHref = item.pdf || item.excel || item.word || item.zip;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 md:px-8 py-4 hover:bg-slate-50/50 transition-colors gap-3 border-b border-slate-100 last:border-0">
            <div className="flex items-start space-x-3">
                <FileText size={18} className="text-primary-main shrink-0 mt-1" />
                <div>
                    <a href={mainHref} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary-deep hover:text-primary-main transition-colors flex items-center gap-2 leading-tight">
                        {item.name}
                        <ArrowUpRight size={14} className="opacity-30" />
                    </a>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                {item.pdf && <DownloadButton href={item.pdf} label="PDF" color="bg-rose-50 text-rose-600 border-rose-100" />}
                {item.word && <DownloadButton href={item.word} label="Word" color="bg-blue-50 text-blue-600 border-blue-100" />}
                {item.excel && <DownloadButton href={item.excel} label="Excel" color="bg-emerald-50 text-emerald-600 border-emerald-100" />}
                {item.zip && <DownloadButton href={item.zip} label="ZIP" color="bg-amber-50 text-amber-700 border-amber-200" />}
            </div>
        </div>
    );
}

function DownloadButton({ href, label, color }: { href: string; label: string; color: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            download
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border font-black text-[10px] transition-all hover:shadow-sm active:scale-95 ${color}`}
        >
            <Download size={10} />
            {label}
        </a>
    );
}

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

                {/* --- 令和7・8年度 入札参加資格申請（指名願）セクション --- */}
                <div className="mt-20 md:mt-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 bg-primary-main text-white text-[10px] font-black rounded-full uppercase tracking-widest">Application</span>
                                <div className="h-px w-12 bg-primary-main/30" />
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black text-primary-deep leading-tight">
                                令和7・8年度 入札参加資格申請<br className="md:hidden" />
                                <span className="text-primary-main">（指名願）</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* 左：ガイド */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-glow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-main/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                    <Info size={20} className="text-secondary-vibrant" />
                                    申請ガイド
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Period</p>
                                        <p className="font-bold text-sm">定時受付：令和7年2月28日まで</p>
                                        <p className="text-xs text-white/60 mt-1">※令和7年3月1日以降も随時受け付けています。</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Method</p>
                                        <p className="font-bold text-sm">原則郵送（持参も可）</p>
                                        <p className="text-xs text-white/60 mt-1 leading-relaxed">
                                            A4判フラットファイル（原則<span className="text-emerald-400 font-bold">緑色</span>）に綴じて提出してください。
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Documents</p>
                                        <p className="text-xs text-white/60 leading-relaxed">
                                            法人税・消費税等の納税証明書（3ヶ月以内、コピー可）が必要です。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary-main/5 border border-primary-main/10 rounded-3xl p-8">
                                <h3 className="text-lg font-black text-primary-deep mb-4 flex items-center gap-2">
                                    <Mail size={18} className="text-primary-main" />
                                    書類提出先
                                </h3>
                                <address className="not-italic text-sm text-text-sub space-y-2">
                                    <p className="font-bold">〒428-0013</p>
                                    <p>静岡県島田市金谷東一丁目1255-2</p>
                                    <p>大井上水道企業団 工務係</p>
                                    <div className="pt-2 flex items-center gap-2 text-primary-main font-black">
                                        <Phone size={14} />
                                        0547-46-4111（代表）
                                    </div>
                                </address>
                            </div>
                        </div>

                        {/* 右：ダウンロードリスト */}
                        <div className="lg:col-span-2 space-y-8">
                            {[
                                {
                                    title: '建設工事',
                                    allZip: 'http://www.ooijousuidoukigyoudan.or.jp/kouji_yousiki/nyusatu-kouji-sinseisyo.zip',
                                    items: [
                                        { name: '入札参加資格審査申請書', excel: 'http://www.ooijousuidoukigyoudan.or.jp/kouji_yousiki/nyusatu-kouji-sinseisyo.xlsx' },
                                        { name: '営業所一覧表', excel: 'http://www.ooijousuidoukigyoudan.or.jp/kouji_yousiki/nyusatu-kouji-eigyousyo.xlsx' },
                                        { name: '工事経歴書', excel: 'http://www.ooijousuidoukigyoudan.or.jp/kouji_yousiki/nyusatu-kouji-keireki.xlsx' },
                                        { name: '技術者経歴書', excel: 'http://www.ooijousuidoukigyoudan.or.jp/kouji_yousiki/nyusatu-kouji-gijutusyakeireki.xlsx' },
                                    ]
                                },
                                {
                                    title: '測量・建設コンサルタント等',
                                    allZip: 'http://www.ooijousuidoukigyoudan.or.jp/soku_kon_yousiki/nyusatu-soku-sinseisyo.zip',
                                    items: [
                                        { name: '入札参加資格審査申請書', excel: 'http://www.ooijousuidoukigyoudan.or.jp/soku_kon_yousiki/nyusatu-soku-sinseisyo.xlsx' },
                                        { name: '営業所一覧表', excel: 'http://www.ooijousuidoukigyoudan.or.jp/soku_kon_yousiki/nyusatu-soku-eigyousyo.xlsx' },
                                        { name: '測量等実績高', excel: 'http://www.ooijousuidoukigyoudan.or.jp/soku_kon_yousiki/nyusatu-soku-sokuryojisseki.xlsx' },
                                        { name: '技術者経歴書', excel: 'http://www.ooijousuidoukigyoudan.or.jp/soku_kon_yousiki/nyusatu-soku-gijutusyakeireki.xlsx' },
                                    ]
                                },
                                {
                                    title: '物品の製造・役務の提供',
                                    allZip: 'http://www.ooijousuidoukigyoudan.or.jp/buppin_yousiki/nyusatu-buppin-sinseisyo.zip',
                                    items: [
                                        { name: '入札参加資格審査申請書', excel: 'http://www.ooijousuidoukigyoudan.or.jp/buppin_yousiki/nyusatu-buppin-sinseisyo.xlsx' },
                                        { name: '営業所一覧表', excel: 'http://www.ooijousuidoukigyoudan.or.jp/buppin_yousiki/nyusatu-buppin-eigyousyo.xlsx' },
                                        { name: '製造・販売、役務の実績', excel: 'http://www.ooijousuidoukigyoudan.or.jp/buppin_yousiki/nyusatu-buppin-jisseki.xlsx' },
                                    ]
                                },
                                {
                                    title: '共通書類・その他',
                                    items: [
                                        { name: '使用印鑑届', word: 'http://www.ooijousuidoukigyoudan.or.jp/kouji_yousiki/nyusatu-inkan.docx' },
                                        { name: '誓約書', word: 'http://www.ooijousuidoukigyoudan.or.jp/kouji_yousiki/nyusatu-seiyakusyo.docx' },
                                        { name: '委任状', word: 'http://www.ooijousuidoukigyoudan.or.jp/kouji_yousiki/nyusatu-inin.docx' },
                                        { name: '変更届（島田市の様式等も可）', desc: '独自の様式はありません。' },
                                    ]
                                }
                            ].map((group, gi) => (
                                <motion.div
                                    key={group.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: gi * 0.1 }}
                                    className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm"
                                >
                                    <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
                                        <h4 className="font-black text-primary-deep flex items-center gap-2">
                                            <ClipboardList size={20} className="text-primary-main" />
                                            {group.title}
                                        </h4>
                                        {group.allZip && (
                                            <a href={group.allZip} download className="text-[10px] font-black text-primary-main flex items-center gap-1 hover:underline">
                                                <Download size={12} /> 一括ダウンロード(ZIP)
                                            </a>
                                        )}
                                    </div>
                                    <div className="divide-y divide-slate-50">
                                        {group.items.map((item, ii) => (
                                            <FormRow key={ii} item={item} />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 bg-slate-50 rounded-2xl p-6 md:p-10 border border-slate-100">
                    <h3 className="font-black text-primary-deep mb-3 uppercase tracking-wider text-xs opacity-50">Support</h3>
                    <h4 className="text-xl font-black text-primary-deep mb-3">入札・指名願に関するお問い合わせ</h4>
                    <p className="text-text-sub text-sm leading-relaxed mb-6">
                        申請書類の書き方や提出期限について不明な点がある場合は、下記担当窓口までお問い合わせください。
                    </p>
                    <a href="tel:0547-46-4111" className="inline-flex items-center gap-3 bg-white border border-primary-main/20 text-primary-main px-6 py-3 rounded-xl font-black hover:bg-primary-main hover:text-white transition-all shadow-sm">
                        <Phone size={18} />
                        0547-46-4111（代表 / 工務係）
                    </a>
                </div>
            </div>
        </div>
    );
}
