"use client";

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Home, UserX, Edit, ChevronRight, Phone, Clock, FileText, CheckCircle2, AlertTriangle, Download } from 'lucide-react';
import Link from 'next/link';

export default function ProcedurePage() {
    return (
        <div className="min-h-screen pt-20">
            <PageHeader
                title="各種手続き"
                subtitle="お引越しに伴う水道の使用開始・中止や、名義変更のお手続きをご案内します。"
                enTitle="Procedures"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12 md:space-y-16">

                {/* お願いバナー */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-amber-50 border border-amber-200/60 rounded-2xl md:rounded-3xl p-6 flex items-start gap-4"
                >
                    <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-black text-amber-800 text-sm md:text-base mb-2">お手続きはお早めに（土日祝は開閉栓ができません）</h3>
                        <p className="text-amber-700 text-xs md:text-sm leading-relaxed">
                            水道の「使用開始（開栓）」や「使用中止（閉栓）」の作業は、平日の営業時間内に行います。
                            <strong>土日・祝日・年末年始の作業は行っておりません</strong>ので、お引越し日が決まりましたら、あらかじめ余裕をもって（ご希望日の数日前までに）お申し込みください。
                        </p>
                    </div>
                </motion.div>

                {/* 1. 使用開始（開栓） */}
                <motion.div
                    id="usage-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl md:rounded-3xl border border-blue-100 shadow-sm overflow-hidden scroll-mt-24"
                >
                    <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-6 md:p-8 border-b border-blue-100 flex items-center gap-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                            <Home className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-blue-900">使用開始（使い始めるとき）</h2>
                            <p className="text-sm text-blue-700 mt-1">転入や新築などで、新しく水道を使い始めるときのお手続きです。</p>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 space-y-6">
                        <div>
                            <h3 className="flex items-center gap-2 font-bold text-primary-deep mb-3 border-l-4 border-blue-500 pl-3">お申し込み方法</h3>
                            <p className="text-sm text-text-sub ml-4">
                                使用開始をご希望する日の**前営業日まで**に、お電話または企業団窓口にてお申し込みください。<br />
                                <span className="text-xs text-slate-500">※開栓作業でお客様にお立ち会いいただく必要はありません。</span>
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-sm text-primary-deep mb-3 flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-blue-500" />
                                お手続きの際にお伺いする内容
                            </h3>
                            <ul className="text-sm text-text-sub space-y-2 grid grid-cols-1 md:grid-cols-2">
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-blue-400 mt-0.5 shrink-0" />水を使用する場所（新住所、アパート・マンション名と部屋番号）</li>
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-blue-400 mt-0.5 shrink-0" />ご使用者様のお名前、ふりがな</li>
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-blue-400 mt-0.5 shrink-0" />ご連絡先お電話番号（携帯電話可）</li>
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-blue-400 mt-0.5 shrink-0" />使用を開始する日（引越し日等）</li>
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-blue-400 mt-0.5 shrink-0" />料金のお支払い方法（口座振替・納入通知書）</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* 2. 使用中止（閉栓） */}
                <motion.div
                    id="usage-stop"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl md:rounded-3xl border border-violet-100 shadow-sm overflow-hidden scroll-mt-24"
                >
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 md:p-8 border-b border-violet-100 flex items-center gap-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                            <UserX className="w-6 h-6 md:w-8 md:h-8 text-violet-500" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-violet-900">使用中止（お止めになるとき）</h2>
                            <p className="text-sm text-violet-700 mt-1">転出や家の取り壊しなどで、水道の使用をやめるときのお手続きです。</p>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 space-y-6">
                        <div>
                            <h3 className="flex items-center gap-2 font-bold text-primary-deep mb-3 border-l-4 border-violet-500 pl-3">ご連絡のお願い</h3>
                            <p className="text-sm text-text-sub ml-4 leading-relaxed">
                                使用中止の手続きがないままだと、お引越し後も引き続き「基本料金」が請求されてしまいます。<br />
                                退去される日の**前営業日まで**に必ずご連絡をお願いいたします。<br />
                                <span className="text-xs text-slate-500">※閉栓作業でお客様にお立ち会いいただく必要はありません。（精算等の都合で立ち会いをお願いする場合もあります）</span>
                            </p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-sm text-primary-deep mb-3 flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-violet-500" />
                                お手続きの際にお伺いする内容
                            </h3>
                            <ul className="text-sm text-text-sub space-y-2 grid grid-cols-1 md:grid-cols-2">
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-violet-400 mt-0.5 shrink-0" />水を使用している場所（現住所、水栓番号が分かれば水栓番号も）</li>
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-violet-400 mt-0.5 shrink-0" />ご使用者様のお名前</li>
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-violet-400 mt-0.5 shrink-0" />日中繋がるご連絡先お電話番号</li>
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-violet-400 mt-0.5 shrink-0" />お引越し先の新しいご住所</li>
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-violet-400 mt-0.5 shrink-0" />使用を中止する日（退去日等）</li>
                                <li className="flex items-start gap-2"><ChevronRight size={16} className="text-violet-400 mt-0.5 shrink-0" />最終料金のご精算方法</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* 3. 名義変更 */}
                <motion.div
                    id="name-change"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl md:rounded-3xl border border-emerald-100 shadow-sm overflow-hidden scroll-mt-24"
                >
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 md:p-8 border-b border-emerald-100 flex items-center gap-4">
                        <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                            <Edit className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-emerald-900">名義変更・使用者の変更</h2>
                            <p className="text-sm text-emerald-700 mt-1">世帯主が変わったときや、所有者が変わったときのお手続きです。</p>
                        </div>
                    </div>
                    <div className="p-6 md:p-8 space-y-4">
                        <p className="text-sm text-text-sub leading-relaxed">
                            ご結婚等による姓の変更、ご家族内での代表者の変更、あるいは物件の売買等で所有者が変わる場合は、名義変更のお手続きが必要となります。<br />
                            新・旧所有者の確認事項や、料金の引き継ぎの有無によって必要書類が異なる場合がありますので、まずはお電話にてご相談ください。
                        </p>
                        <div className="mt-4">
                            <Link href="/resident/downloads" className="inline-flex items-center gap-2 text-primary-main hover:text-primary-deep font-bold text-sm bg-primary-main/5 px-4 py-2 rounded-lg transition-colors">
                                <FileText size={16} className="shrink-0" />
                                届出書のダウンロードはこちら（各種申請書ページ）
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* お問い合わせ・申し込み先 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary-deep to-primary-main rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-glow-lg"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.1),transparent)]" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <div>
                            <h3 className="text-xl md:text-3xl font-black mb-2">お電話・窓口でのお申し込み</h3>
                            <p className="text-white/80 text-sm">インターネットからの直接受付は現在行っておりません。<br className="hidden sm:block" />お手数ですが、営業時間内にお電話またはご来庁ください。</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                            <p className="text-white font-bold mb-4">大井上水道企業団 窓口・お客様センター</p>
                            <a href="tel:0547-46-4130" className="btn-shine mx-auto inline-flex items-center gap-3 bg-secondary-vibrant text-primary-deep font-black text-2xl md:text-3xl px-8 py-4 rounded-2xl hover:bg-white transition-all shadow-lg active:scale-95 group">
                                <Phone size={28} className="group-hover:animate-pulse" /><Phone size={20} className="inline-block mr-1 -mt-0.5" />0547-46-4130</a>
                            <div className="flex items-center justify-center gap-2 mt-4 text-xs md:text-sm text-white/80">
                                <Clock size={16} />
                                <p>営業時間：平日 8:15〜17:00 （土日祝・年末年始休み）</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
