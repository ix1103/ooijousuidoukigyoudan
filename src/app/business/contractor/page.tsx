"use client";

import React from 'react';
import { Wrench, FileText, AlertTriangle, ChevronRight, Phone, ClipboardList, ArrowUpRight, Download } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { PageHeader } from '@/components/PageHeader';

function FormRow({ item }: { item: any }) {
    const mainHref = item.pdf || item.excel || item.word || item.zip;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 md:px-8 py-5 hover:bg-slate-50/50 transition-colors gap-4">
            <div className="flex items-start space-x-3 md:space-x-4">
                <FileText size={20} className="text-primary-main shrink-0 mt-1" />
                <div>
                    <a href={mainHref} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-bold text-primary-deep hover:text-primary-main transition-colors flex items-center gap-2 leading-tight">
                        {item.name}
                        <ArrowUpRight size={14} className="opacity-30" />
                    </a>
                    {item.desc && <p className="text-[10px] md:text-xs text-text-sub mt-1">{item.desc}</p>}
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
            download
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-black text-[10px] md:text-xs transition-all hover:shadow-sm active:scale-95 ${color}`}
        >
            <Download size={12} />
            {label}
        </a>
    );
}

export default function ContractorPage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="工事業者向け情報"
                subtitle="指定給水装置工事事業者の方へ向けた各種情報・様式を掲載しています。"
                enTitle="Contractor"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32 space-y-16 md:space-y-32">

                {/* 指定給水装置工事事業者について */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Designated Contractor</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-4 md:mb-6">指定給水装置工事事業者</h2>
                    <p className="text-text-sub text-sm md:text-base leading-relaxed mb-8 md:mb-12 max-w-3xl">
                        水道の新設・増設・改造・修繕等の給水装置工事は、企業団が指定した「指定給水装置工事事業者」が施工しなければなりません。
                        指定を受けるには、水道法の定める基準を満たし、企業団への申請が必要です。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {[
                            { icon: <Wrench size={28} />, title: '指定の要件', items: ['給水装置工事主任技術者の選任', '適切な機器の所持', '水道法に基づく技能の保持'] },
                            { icon: <ClipboardList size={28} />, title: '届出が必要な場合', items: ['新規指定の申請', '届出事項の変更（住所・代表者等）', '廃業届', '指定の更新（5年ごと）'] },
                            { icon: <AlertTriangle size={28} />, title: '注意事項', items: ['無届工事は水道法違反です', '変更届は変更後30日以内に提出', '工事施工時は企業団への事前申請が必要'] },
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <div className="text-primary-main bg-primary-main/5 p-3 rounded-xl w-fit mb-4">
                                    {card.icon}
                                </div>
                                <h3 className="text-base md:text-lg font-black text-primary-deep mb-4">{card.title}</h3>
                                <ul className="space-y-2">
                                    {card.items.map((item, i) => (
                                        <li key={i} className="flex items-start space-x-2 text-text-sub text-xs md:text-sm">
                                            <div className="w-1 h-1 bg-primary-main rounded-full shrink-0 mt-1.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* 手数料・分担金 */}
                    <div className="mt-8 md:mt-12 bg-slate-50 border border-slate-100 rounded-2xl md:rounded-3xl p-6 md:p-10">
                        <h3 className="text-lg md:text-xl font-black text-primary-deep mb-6">申請手数料・分担金</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xs font-black text-secondary-vibrant uppercase tracking-widest mb-3">指定申請手数料</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                        <span className="text-sm font-bold text-text-sub">新規指定手数料</span>
                                        <span className="text-primary-deep font-black">8,000円</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                        <span className="text-sm font-bold text-text-sub">指定更新手数料（5年ごと）</span>
                                        <span className="text-primary-deep font-black">8,000円</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-secondary-vibrant uppercase tracking-widest mb-3">加入分担金（税込）</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                        <span className="font-bold text-text-sub">口径 13mm</span>
                                        <span className="text-primary-deep font-black">44,000円</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                        <span className="font-bold text-text-sub">口径 20mm</span>
                                        <span className="text-primary-deep font-black">132,000円</span>
                                    </div>
                                    <p className="text-[10px] text-text-sub/60 mt-2 italic leading-relaxed">
                                        ※口径25mm以上の分担金については別途お問い合わせください。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 md:mt-12 bg-primary-main/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-primary-main text-white p-3 rounded-xl">
                                <ClipboardList size={24} />
                            </div>
                            <div>
                                <p className="text-primary-deep font-black text-lg md:text-xl">指定給水装置工事事業者名簿</p>
                                <p className="text-text-sub text-xs md:text-sm mt-1">最新の指定工事店一覧（PDF）をご確認いただけます。</p>
                            </div>
                        </div>
                        <a
                            href="http://www.ooijousuidoukigyoudan.or.jp/R08_Jan_siteikoujiten(2).pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-shine inline-flex items-center gap-2 bg-primary-main text-white px-8 py-4 rounded-xl font-black shadow-premium hover:shadow-glow transition-all active:scale-95"
                        >
                            <FileText size={18} />
                            <span>指定工事店一覧を表示 (PDF)</span>
                        </a>
                    </motion.div>
                </section>

                {/* 各種様式 */}
                <section>
                    <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-10">
                        <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                        <span className="tracking-[0.15em] text-xs md:text-sm uppercase">Forms</span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-primary-deep mb-4 md:mb-6">指定様式一覧</h2>
                    <p className="text-text-sub text-sm md:text-base leading-relaxed mb-8 md:mb-12">
                        給水装置工事に関する各種申請書・届出書の様式です。必要書類をご確認の上、窓口にご提出ください。
                    </p>

                    <div className="space-y-12">
                        {/* カテゴリ1: 指定・更新・届出 */}
                        <div>
                            <h3 className="text-lg md:text-xl font-black text-primary-deep mb-6 flex items-center gap-2">
                                <ClipboardList className="text-secondary-vibrant" size={24} />
                                1. 事業者の指定・更新・届出
                            </h3>
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                                {[
                                    { name: '指定給水装置工事事業者指定申請書（様式第1）', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_no1_R03_May.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_no1_R03_May.doc' },
                                    { name: '誓約書（様式第2）', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_no2_R03_May.pdf' },
                                    { name: '機械器具の名称、性能及び数（別表）', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_betu_R03_May.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_betu_R03_May.doc' },
                                    { name: '指定給水装置工事事業者変更届出書（様式第4）', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_no4_R03_May.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_no4_R03_May.doc' },
                                    { name: '指定給水装置工事事業者廃止・休止・再開届出書（様式第5）', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_no5_R03_May.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_no5_R03_May.doc' },
                                    { name: '給水装置工事主任技術者選任・解任届出書（様式第6）', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_no6_R03_May.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuisitei_no6_R03_May.doc' },
                                    { name: '指定更新時確認事項届出書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/R2siteikousinjikou_R03_May.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/R2siteikousinjikou_R03_May.docx' },
                                    { name: '指定申請関係書類 一式', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyusui_sitei_all_R03_May.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/kyusui_sitei_all_R03_May.doc' },
                                ].map((item, i) => (
                                    <FormRow key={i} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* カテゴリ2: 給水装置工事 申請・承諾書 */}
                        <div>
                            <h3 className="text-lg md:text-xl font-black text-primary-deep mb-6 flex items-center gap-2">
                                <FileText className="text-blue-500" size={24} />
                                2. 給水装置工事 申請・承諾書
                            </h3>
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                                {[
                                    { name: '給水装置工事申込書類 一式（ZIP）', zip: 'http://www.ooijousuidoukigyoudan.or.jp/ooi_kyuusui_ver3_2.zip' },
                                    { name: '給水装置工事申込書（Ver.4）', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_mousikomi3.pdf', excel: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_syorui_ooi3.xls' },
                                    { name: '給水装置工事申込変更申請書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_mousikomi3_henkou.pdf' },
                                    { name: '給水装置工事事前協議書', excel: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusuikyougisyo.xlsx' },
                                    { name: '給水装置工事申込チェックリスト', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_check_list.pdf' },
                                    { name: '私有地埋設承諾書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_siyutimaisetu2.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/siyuutimaisetu_ooi.doc' },
                                    { name: '給水管所有者分岐承諾書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_bunnki2.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_bunnki_ooi.doc' },
                                    { name: '給水装置一部先行工事等注意事項承諾書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_sennkousyoudaku2.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_sennkousyoudaku.doc' },
                                    { name: '給水管管理に関する承諾書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_kannrisyoudaku2.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_kannrisyoudaku.doc' },
                                    { name: '受水槽を設置しないことに関する誓約書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/jusuisou_seiyakusho.pdf', word: 'http://www.ooijousuidoukigyoudan.or.jp/jusuisou_seiyakusho.doc' },
                                ].map((item, i) => (
                                    <FormRow key={i} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* カテゴリ3: 材料調書・検査・完了 */}
                        <div>
                            <h3 className="text-lg md:text-xl font-black text-primary-deep mb-6 flex items-center gap-2">
                                <ClipboardList className="text-emerald-500" size={24} />
                                3. 材料調書・検査・完了
                            </h3>
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                                {[
                                    { name: '給水装置工事完了届・検査請求書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_kennsasinnsei2.pdf' },
                                    { name: '給水装置工事 屋外配管使用材料調書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_zairyou_okugai2.pdf' },
                                    { name: '給水装置工事 屋内配管使用材料調書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_zairyou_okunai2.pdf' },
                                    { name: '屋外配管使用材料調書 【記入例】', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_zairyou_okugai_TEST2.pdf' },
                                    { name: '量水器ボックス設置例', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/kyuusui_haikann_rei2.pdf' },
                                ].map((item, i) => (
                                    <FormRow key={i} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* カテゴリ4: 請求書・報告書 */}
                        <div>
                            <h3 className="text-lg md:text-xl font-black text-primary-deep mb-6 flex items-center gap-2">
                                <FileText className="text-purple-500" size={24} />
                                4. 請求書・報告書（インボイス対応）
                            </h3>
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                                {[
                                    { name: '請求書（工事用）', excel: 'http://www.ooijousuidoukigyoudan.or.jp/seikyuu%20kouji(new).xlsx' },
                                    { name: '請求書（物品用）', excel: 'http://www.ooijousuidoukigyoudan.or.jp/seikyuu%20buppin(new2).xlsx' },
                                    { name: '請求書（入札工事用）', word: 'http://www.ooijousuidoukigyoudan.or.jp/4jou_seikyusyo.docx' },
                                    { name: '漏水修理等修繕報告書', pdf: 'http://www.ooijousuidoukigyoudan.or.jp/rousui_houkoku1.pdf', excel: 'http://www.ooijousuidoukigyoudan.or.jp/rousui_houkoku1.xls' },
                                ].map((item, i) => (
                                    <FormRow key={i} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-text-sub/60 text-xs mt-4">※ 様式のダウンロードは窓口にて配布、または公式サイトの「公表」ページからご確認ください。</p>
                </section>

                {/* 資材変更のお知らせ */}
                <section className="bg-amber-50 rounded-2xl md:rounded-3xl p-6 md:p-12 border border-amber-200">
                    <div className="flex items-start space-x-3 md:space-x-4">
                        <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg md:text-2xl font-black text-amber-800 mb-3">給水装置工事に使用する資材の変更について</h2>
                            <p className="text-amber-700 text-xs md:text-sm leading-relaxed mb-4">
                                企業団では、給水装置工事に使用できる資材（管材・継手等）を定めています。
                                資材の変更がある場合は、施工前に必ず最新の情報をご確認ください。
                                変更の詳細については、工務係までお問い合わせください。
                            </p>
                            <a
                                href="tel:0547-46-4130"
                                className="inline-flex items-center space-x-2 bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-amber-700 transition-colors active:scale-95"
                            >
                                <Phone size={14} />
                                <span>工務係に問い合わせ（0547-46-4130）</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
