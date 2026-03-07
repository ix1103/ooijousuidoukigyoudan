"use client";

import { Hero } from "@/components/Hero";
import { EmergencyAlert } from "@/components/EmergencyAlert";
import { EmergencyContact } from "@/components/EmergencyContact";
import { NewsSection } from "@/components/NewsSection";
import { Info, FileText, Wrench, Building2, ShieldCheck, Activity } from "lucide-react";
import { WaterLogoIcon } from "@/components/WaterLogoIcon";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const quickNav = [
    {
      title: "水道料金・お支払い",
      icon: <FileText className="text-secondary-vibrant" />,
      href: "/resident/price",
      desc: "検針の流れや、納入通知書・口座振替などのお支払い方法。"
    },
    {
      title: "使用開始・中止",
      icon: <Info className="text-secondary-vibrant" />,
      href: "/resident/procedure",
      desc: "お引っ越し等に伴う水道の手続き、各種申請書類はこちら。"
    },
    {
      title: "指定工事店一覧",
      icon: <Wrench className="text-secondary-vibrant" />,
      href: "/business/contractor",
      desc: "水道の新設・改造・修繕工事を行う「指定工事事業者」一覧。"
    },
    {
      title: "企業団の紹介",
      icon: <Building2 className="text-secondary-vibrant" />,
      href: "/about/outline",
      desc: "大井上水道企業団の組織概要、議会情報、水質検査結果など。"
    },
  ];

  const features = [
    {
      title: "徹底した水質管理",
      icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />,
      desc: "皆様の蛇口まで常に高品質な水をお届けするため、厳しい自社基準による24時間体制の監視を行っています。"
    },
    {
      title: "災害に強い水道網",
      icon: <Activity className="w-8 h-8 md:w-10 md:h-10" />,
      desc: "管路の耐震化や施設の補強を進め、万が一の災害時にも、安定した水の供給を継続できる体制を整えています。"
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* 1. ヒーローセクション */}
      <Hero />

      {/* 2. 緊急のお知らせ（最優先情報） */}
      <EmergencyAlert />

      {/* 3. ★特大タイルボタン3つ（電話を減らす最重要UI） */}
      <section className="py-10 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-black tracking-[0.2em] text-text-sub uppercase mb-6">よくあるお問い合わせはこちらからすぐ解決</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                emoji: '🏠',
                title: '開栓・閉栓の\nお申し込み',
                desc: 'お引越しで水を\n使い始める・止める',
                href: '/resident/procedure',
                color: 'from-blue-500 to-blue-700',
                border: 'border-blue-200',
                bg: 'bg-blue-50',
              },
              {
                emoji: '🚨',
                title: '水漏れ・\n水道トラブル',
                desc: '水が止まらない・\n出ない・濁っている',
                href: '/resident/trouble',
                color: 'from-red-500 to-rose-700',
                border: 'border-red-200',
                bg: 'bg-red-50',
              },
              {
                emoji: '💳',
                title: '料金・\nお支払い変更',
                desc: '口座振替・\nコンビニ払いなど',
                href: '/resident/price',
                color: 'from-emerald-500 to-teal-700',
                border: 'border-emerald-200',
                bg: 'bg-emerald-50',
              },
            ].map((tile, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href={tile.href} className={`flex items-center md:flex-col md:items-center gap-5 md:gap-3 p-5 md:p-8 rounded-2xl md:rounded-3xl border-2 ${tile.border} ${tile.bg} hover:shadow-xl transition-all duration-300 group block`}>
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${tile.color} flex items-center justify-center text-3xl md:text-4xl shadow-lg shrink-0`}>
                    {tile.emoji}
                  </div>
                  <div className="md:text-center">
                    <p className="font-black text-primary-deep text-lg md:text-xl leading-tight whitespace-pre-line">{tile.title}</p>
                    <p className="text-text-sub text-xs md:text-sm mt-1 md:mt-2 leading-snug whitespace-pre-line">{tile.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. お知らせセクション（最新のお知らせ一覧） */}
      <NewsSection />

      {/* 5. 緊急連絡先セクション */}
      <EmergencyContact />

      {/* 5. クイックナビゲーション */}
      <section className="py-16 md:py-32 relative">
        {/* セクション背景装飾 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-vibrant/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16 text-center"
          >
            <div className="flex items-center justify-center space-x-3 text-secondary-vibrant font-black mb-3 md:mb-4">
              <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
              <span className="tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm uppercase">Services</span>
              <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-primary-deep mb-4">各種お手続き・ご案内</h2>
            <p className="text-text-sub text-sm md:text-base">よく利用されるサービスや情報をまとめています。</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {quickNav.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group block p-5 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-100/80 hover:border-secondary-vibrant/20 shadow-sm hover:shadow-glow transition-all duration-500 relative overflow-hidden h-full"
                >
                  {/* ホバー時に広がる背景グラデーション */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-vibrant/5 to-primary-main/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-primary-main/5 to-secondary-vibrant/10 p-3 md:p-4 rounded-xl md:rounded-2xl inline-block mb-4 md:mb-6 group-hover:scale-110 group-hover:shadow-premium transition-all duration-500">
                      {item.icon}
                    </div>
                    <h3 className="text-sm md:text-lg font-black text-primary-deep mb-2 md:mb-3 group-hover:text-primary-main transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-text-sub text-xs md:text-sm leading-relaxed hidden sm:block">
                      {item.desc}
                    </p>
                    <div className="mt-3 md:mt-5 flex items-center space-x-2 text-secondary-vibrant font-black text-[9px] md:text-[10px] tracking-widest uppercase">
                      <span>詳細</span>
                      <div className="w-4 md:w-6 h-px bg-secondary-vibrant group-hover:w-8 md:group-hover:w-10 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 特徴・信頼のセクション */}
      <section className="py-20 md:py-32 relative bg-white overflow-hidden">
        {/* 装飾 */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-soft/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-vibrant/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-1.5 bg-secondary-vibrant rounded-full" />
                <span className="tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm uppercase">Our Mission</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-primary-deep mb-6 md:mb-10 leading-tight">
                「当たり前」の品質を、<br />
                <span className="text-gradient-water">揺るぎない覚悟</span>で。
              </h2>
              <p className="text-text-sub text-sm md:text-lg leading-relaxed md:leading-loose mb-8 md:mb-12">
                水道は生活に不可欠なインフラです。私たちは、技術革新と日々のメンテナンスを積み重ね、どのような状況下でも変わらない安全な水をお届けします。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="space-y-3 md:space-y-4 group"
                  >
                    <div className="text-secondary-vibrant bg-gradient-to-br from-accent-soft/40 to-secondary-vibrant/10 p-3 md:p-4 rounded-xl md:rounded-2xl w-fit group-hover:shadow-premium transition-shadow">
                      {f.icon}
                    </div>
                    <h4 className="text-base md:text-xl font-black text-primary-deep">{f.title}</h4>
                    <p className="text-text-sub text-xs md:text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] md:aspect-[4/5] rounded-2xl md:rounded-[3rem] overflow-hidden shadow-glow-lg"
            >
              {/* メッシュ背景 */}
              <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-br from-primary-deep via-primary-main to-primary-light" />
              {/* 波紋装飾 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/10 rounded-full animate-ripple" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] border border-white/10 rounded-full animate-ripple" style={{ animationDelay: '1s' }} />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center text-white">
                <div className="bg-white/10 backdrop-blur-2xl p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white/15 shadow-2xl">
                  <WaterLogoIcon className="w-10 h-10 md:w-16 md:h-16 text-secondary-vibrant mx-auto mb-4 md:mb-8" />
                  <p className="text-3xl md:text-4xl font-black mb-2 md:mb-4">100%</p>
                  <p className="text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-60">Pure Water Supply</p>
                  <p className="mt-4 md:mt-8 text-accent-soft/70 leading-relaxed text-xs md:text-sm">
                    私たちは自治体を超えた協力体制で、<br />最適な水道事業を運営しています。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. 水質バナー */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* メッシュ背景 */}
        <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-br from-primary-deep via-primary-main to-primary-deep" />
        {/* オーバーレイ装飾 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(72,202,228,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,119,182,0.2),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left relative z-10">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-xl md:text-3xl font-black text-white italic tracking-tight">Reliable Water, Better Future.</h2>
            <p className="text-accent-soft/40 font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] uppercase">Sustainability &amp; Trust since 1970</p>
          </div>
          <div className="flex gap-10 md:gap-16 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-16">
            <div className="text-center">
              <p className="text-3xl md:text-6xl font-black text-secondary-vibrant">24<span className="text-sm md:text-lg">h</span></p>
              <p className="text-[9px] md:text-[10px] text-white/30 font-black uppercase tracking-widest mt-2 md:mt-3">Monitoring</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-6xl font-black text-secondary-vibrant">365<span className="text-sm md:text-lg">d</span></p>
              <p className="text-[9px] md:text-[10px] text-white/30 font-black uppercase tracking-widest mt-2 md:mt-3">Maintenance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
