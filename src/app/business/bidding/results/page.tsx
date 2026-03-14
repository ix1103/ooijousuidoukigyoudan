"use client";

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import {  ClipboardList, Calendar, Info, Loader2, ArrowUpRight, TrendingUp, Building2, Search , Phone } from 'lucide-react';
import { News, getBiddingList } from '@/lib/microcms';

/**
 * 入札・見積結果公表ページ (/business/bidding/results)
 * 旧サイト (newpage1.html) の情報を反映し、microCMSでの管理にも対応します。
 */

const FALLBACK_RESULTS: News[] = [
    // 令和7年度
    { id: 'r7-1', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2025-04-01', title: '金谷水源地新受水池築造工事', category: ['落札結果', '入札'], fiscalYear: '令和7年度', price: '12,700,000円', content: '' },
    { id: 'r7-2', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2025-04-01', title: '深井戸用水中モーターポンプ予備機購入', category: ['見積結果', '入札'], fiscalYear: '令和7年度', price: '1,673,000円', content: '' },
    { id: 'r7-3', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2025-04-01', title: '島田市竹下地内配水管切廻工事', category: ['見積結果', '入札'], fiscalYear: '令和7年度', price: '390,000円', content: '' },
    // 令和6年度
    { id: 'r6-1', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2024-04-01', title: '令和６年度 水質検査業務委託', category: ['落札結果', '入札'], fiscalYear: '令和6年度', price: '2,888,000円', content: '' },
    { id: 'r6-2', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2024-04-01', title: '金谷水源地直送配水池築造工事（2期工事）', category: ['落札結果', '入札'], fiscalYear: '令和6年度', price: '124,630,000円', content: '' },
    { id: 'r6-3', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2024-04-01', title: '市道三代島3号線配水管布設替工事', category: ['落札結果', '入札'], fiscalYear: '令和6年度', price: '23,670,000円', content: '' },
    { id: 'r6-4', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2024-04-01', title: '市道三代島3号線配水管布設替工事に伴う舗装復旧工事', category: ['落札結果', '入札'], fiscalYear: '令和6年度', price: '8,460,000円', content: '' },
    { id: 'r6-5', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2024-04-01', title: '第2配水池受水用緊急遮断弁保守点検業務委託', category: ['見積結果', '入札'], fiscalYear: '令和6年度', price: '138,000円', content: '' },
    { id: 'r6-6', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2024-04-01', title: '金谷配水池他11箇所自家用電気工作物保安管理業務委託', category: ['見積結果', '入札'], fiscalYear: '令和6年度', price: '1,020,000円', content: '' },
    { id: 'r6-7', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2024-04-01', title: '金谷東1丁目地内配水管漏水等修繕工事', category: ['見積結果', '入札'], fiscalYear: '令和6年度', price: '2,311,100円', content: '' },
    { id: 'r6-8', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2024-04-01', title: '令和6年度 給水装置工事図面等電子化業務委託', category: ['落札結果', '入札'], fiscalYear: '令和6年度', price: '1,490,000円', content: '' },
    { id: 'r6-9', createdAt: '', updatedAt: '', revisedAt: '', publishedAt: '2024-04-01', title: '令和6年度 薬品購入（次亜塩素酸ナトリウム）', category: ['見積結果', '入札'], fiscalYear: '令和6年度', price: '3,330,000円', content: '' },
];

export default function BiddingResultsPage() {
    const [items, setItems] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');

    useEffect(() => {
        async function fetchData() {
            try {
                const cmsData = await getBiddingList(100);
                // categoryに '落札結果' または '見積結果' を含むものだけを抽出
                const filteredData = cmsData.filter(item => {
                    if (Array.isArray(item.category)) {
                        return item.category.some(c => c === '落札結果' || c === '見積結果');
                    }
                    return item.category === '落札結果' || item.category === '見積結果';
                });

                if (filteredData.length > 0) {
                    setItems(filteredData);
                } else {
                    setItems(FALLBACK_RESULTS);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setItems(FALLBACK_RESULTS);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // 年度と案件区分でフィルタリング
    const filteredItems = items.filter(item => {
        const yearMatch = selectedYear === 'all' || item.fiscalYear === selectedYear;
        const typeMatch = selectedType === 'all' || (
            Array.isArray(item.category) 
                ? item.category.includes(selectedType) 
                : item.category === selectedType
        );
        return yearMatch && typeMatch;
    });

    // 年度リストの抽出
    const years = ['all', ...Array.from(new Set(items.map(item => item.fiscalYear).filter(Boolean))) as string[]].sort().reverse();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-main" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="入札・見積結果公表"
                subtitle="大井上水道企業団が執行した入札および見積合わせの結果を公表しています。"
                enTitle="Bidding Results"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">

                {/* フィルター・案内 */}
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-start justify-between">
                    <div className="max-w-2xl">
                        <div className="flex items-center space-x-3 text-secondary-vibrant font-bold mb-4">
                            <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                            <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Disclosure</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold text-primary-deep mb-4">執行結果の一覧</h2>
                        <p className="text-text-sub text-sm md:text-base leading-relaxed">
                            地方自治法施行令第167条の13の規定等に基づき、入札結果および見積結果を公開しています。
                            年度ごとに最新の情報を掲載しております。
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* 区分フィルター */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-full sm:w-48">
                            <label className="block text-[10px] font-bold text-primary-main uppercase tracking-widest mb-2 px-2">Type</label>
                            <div className="relative">
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-primary-deep appearance-none focus:ring-2 focus:ring-primary-main/20 outline-none cursor-pointer"
                                >
                                    <option value="all">すべての区分</option>
                                    <option value="落札結果">落札結果</option>
                                    <option value="見積結果">見積結果</option>
                                </select>
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-main/40 pointer-events-none" size={16} />
                            </div>
                        </div>

                        {/* 年度フィルター */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm w-full sm:w-48">
                            <label className="block text-[10px] font-bold text-primary-main uppercase tracking-widest mb-2 px-2">Fiscal Year</label>
                            <div className="relative">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-primary-deep appearance-none focus:ring-2 focus:ring-primary-main/20 outline-none cursor-pointer"
                                >
                                    <option value="all">すべての年度</option>
                                    {years.filter(y => y !== 'all').map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-main/40 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 結果テーブル */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse block md:table">
                            <thead className="hidden md:table-header-group">
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-5 text-xs font-bold text-primary-main uppercase tracking-widest slice">執行日 / 年度</th>
                                    <th className="px-6 py-5 text-xs font-bold text-primary-main uppercase tracking-widest">案件区分</th>
                                    <th className="px-6 py-5 text-xs font-bold text-primary-main uppercase tracking-widest">案件名</th>
                                    <th className="px-6 py-5 text-xs font-bold text-primary-main uppercase tracking-widest text-right">結果（比較価格等）</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 block md:table-row-group">
                                {filteredItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-20 text-center text-text-sub/60 italic">
                                            該当する結果が見つかりませんでした。
                                        </td>
                                    </tr>
                                ) : (
                                    filteredItems.map((item) => (
                                        <tr key={item.id} className="block md:table-row bg-white hover:bg-primary-main/[0.02] transition-colors group mb-4 md:mb-0 rounded-2xl md:rounded-none border md:border-0 border-slate-100 shadow-sm md:shadow-none overflow-hidden relative">
                                            <td className="block md:table-cell px-5 md:px-6 py-4 md:py-6 md:whitespace-nowrap border-b border-slate-50 md:border-0 bg-slate-50/50 md:bg-transparent flex justify-between md:table-cell items-center">
                                                <span className="md:hidden text-xs text-primary-main font-bold">執行日 / 年度</span>
                                                <div className="flex flex-col md:block text-right md:text-left">
                                                    <span className="text-xs text-text-sub font-bold">{item.fiscalYear || '年度不明'}</span>
                                                    <span className="text-[10px] text-text-sub/50">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('ja-JP') : '-'}</span>
                                                </div>
                                            </td>
                                            <td className="block md:table-cell px-5 md:px-6 py-3 md:py-6 md:whitespace-nowrap border-b border-slate-50 md:border-0 flex justify-between md:table-cell items-center">
                                                <span className="md:hidden text-xs text-primary-main font-bold">案件区分</span>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${(
                                                    Array.isArray(item.category) 
                                                        ? item.category.includes('落札結果') 
                                                        : item.category === '落札結果'
                                                    )
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'bg-emerald-50 text-emerald-600'
                                                    }`}>
                                                    {Array.isArray(item.category) 
                                                        ? item.category.find(c => c === '落札結果' || c === '見積結果') 
                                                        : (item.category === '落札結果' || item.category === '見積結果' ? item.category : '区分なし')}
                                                    {!item.category && '区分なし'}
                                                </span>
                                            </td>
                                            <td className="block md:table-cell px-5 md:px-6 py-4 md:py-6 border-b border-slate-50 md:border-0">
                                                <div className="md:hidden text-xs text-primary-main font-bold mb-1">案件名</div>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-sm md:text-base font-bold text-primary-deep leading-snug group-hover:text-primary-main transition-colors">
                                                        {item.title}
                                                    </span>
                                                    {item.pdfUrl && (
                                                        <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-primary-main/40 hover:text-primary-main mt-1">
                                                            <ArrowUpRight size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="block md:table-cell px-5 md:px-6 py-4 md:py-6 md:text-right md:whitespace-nowrap bg-slate-50/30 md:bg-transparent flex justify-between md:table-cell items-center">
                                                <span className="md:hidden text-xs text-primary-main font-bold">結果（比較価格等）</span>
                                                <div className="flex flex-col items-end md:items-end">
                                                    <span className="text-sm md:text-lg font-bold text-primary-deep tabular-nums">
                                                        {item.price || '公表なし'}
                                                    </span>
                                                    <span className="text-[10px] text-text-sub/40 font-bold">税込金額等は案件による</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 補足事項 */}
                <div className="mt-16 bg-primary-main/5 rounded-3xl p-8 border border-primary-main/10">
                    <div className="flex items-start gap-4">
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-primary-main/10 text-primary-main">
                            <Info size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-primary-deep mb-3">閲覧上の注意</h3>
                            <ul className="space-y-3 text-sm text-text-sub leading-relaxed">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary-main rounded-full shrink-0 mt-1.5" />
                                    <span>掲載内容は執行当時のものであり、現在の情報と異なる場合があります。</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary-main rounded-full shrink-0 mt-1.5" />
                                    <span>詳細な設計図書や仕様については、公表期間中のものに限り窓口での閲覧が可能です。</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary-main rounded-full shrink-0 mt-1.5" />
                                    <span>お問い合わせは、大井上水道企業団 工務係（<Phone size={14} className="inline-block mr-0.5 -mt-0.5" />0547-46-4130）までお願いいたします。</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
