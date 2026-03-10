"use client";

import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { FileText, Phone, ChevronRight, Calendar, Loader2, Download, ArrowUpRight, Info, Mail, ClipboardList } from 'lucide-react';
import React from 'react';

/**
 * 入札参加資格申請ページ（/business/bidding）
 * 指名願に関する情報と提出書類のダウンロードを掲載します。
 */

// ダウンロード用コンポーネント
function FormRow({ item }: { item: any }) {
    const mainHref = item.pdf || item.excel || item.word || item.zip;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 md:px-8 py-4 hover:bg-slate-50/50 transition-colors gap-3 border-b border-slate-100 last:border-0">
            <div className="flex items-start space-x-3">
                <FileText size={18} className="text-primary-main shrink-0 mt-1" />
                <div>
                    {mainHref ? (
                        <a href={mainHref} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary-deep hover:text-primary-main transition-colors flex items-center gap-2 leading-tight">
                            {item.name}
                            <ArrowUpRight size={14} className="opacity-30" />
                        </a>
                    ) : (
                        <span className="text-sm font-bold text-primary-deep leading-tight">{item.name}</span>
                    )}
                    {item.desc && <p className="text-[10px] text-text-sub mt-1">{item.desc}</p>}
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
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="入札参加資格申請"
                subtitle="指名入札参加資格申請（指名願）に関する情報や提出用様式を掲載しています。"
                enTitle="Bid Qualification"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">
                {/* 令和7・8年度 入札参加資格申請（指名願） */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-bold mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Application</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-primary-deep mb-4 md:mb-6">
                        入札参加資格申請<span className="text-primary-main">（指名願）</span>
                    </h2>
                    <p className="text-text-sub text-sm md:text-base leading-relaxed mb-8 md:mb-12 max-w-3xl">
                        令和7・8年度の入札参加資格審査申請（指名願）の受付を行っています。
                        各区分（指名願）を提出される方は、以下の案内及び様式をご確認ください。
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* 左：ガイド */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-primary-deep text-white rounded-3xl p-8 shadow-premium relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Info size={20} className="text-secondary-vibrant" />
                                    申請ガイド
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Period</p>
                                        <p className="font-bold text-sm">定時受付：令和7年2月28日まで</p>
                                        <p className="text-xs text-white/60 mt-1">※令和7年3月1日以降も随時受け付けています。</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Method</p>
                                        <p className="font-bold text-sm">原則郵送（持参も可）</p>
                                        <p className="text-xs text-white/60 mt-1 leading-relaxed">
                                            A4判フラットファイル（原則<span className="text-emerald-400 font-bold">緑色</span>）に綴じて提出してください。
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Documents</p>
                                        <p className="text-xs text-white/60 leading-relaxed font-bold">
                                            法人税・消費税等の納税証明書（3ヶ月以内、コピー可）が必要です。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary-main/5 border border-primary-main/10 rounded-3xl p-8">
                                <h3 className="text-lg font-bold text-primary-deep mb-4 flex items-center gap-2">
                                    <Mail size={18} className="text-primary-main" />
                                    書類提出先
                                </h3>
                                <address className="not-italic text-sm text-text-sub space-y-2">
                                    <p className="font-bold">〒428-0013</p>
                                    <p>静岡県島田市金谷東一丁目1255-2</p>
                                    <p>大井上水道企業団 工務係</p>
                                    <div className="pt-2 flex items-center gap-2 text-primary-main font-bold">
                                        <Phone size={14} />
                                        0547-46-4130（代表）
                                    </div>
                                </address>
                            </div>
                        </div>

                        {/* 右：ダウンロードリスト */}
                        <div className="lg:col-span-2 space-y-8 text-primary-deep">
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
                                    <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center transition-colors">
                                        <h4 className="font-bold text-primary-deep flex items-center gap-2">
                                            <ClipboardList size={20} className="text-primary-main" />
                                            {group.title}
                                        </h4>
                                        {group.allZip && (
                                            <a href={group.allZip} download className="text-[10px] font-bold text-primary-main flex items-center gap-1 hover:underline">
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

                    <div className="mt-16 md:mt-32 bg-slate-50 rounded-2xl p-6 md:p-10 border border-slate-100">
                        <h3 className="font-bold text-primary-deep mb-3 uppercase tracking-wider text-xs opacity-50">Support</h3>
                        <h4 className="text-xl font-bold text-primary-deep mb-3">入札・指名願に関するお問い合わせ</h4>
                        <p className="text-text-sub text-sm leading-relaxed mb-6 font-bold">
                            申請書類の書き方や提出期限について不明な点がある場合は、下記担当窓口までお問い合わせください。
                        </p>
                        <a href="tel:0547-46-4130" className="inline-flex items-center gap-3 bg-white border border-primary-main/20 text-primary-main px-6 py-3 rounded-xl font-bold hover:bg-primary-main hover:text-white transition-all shadow-sm">
                            <Phone size={18} />
                            0547-46-4130（代表 / 工務係）
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
