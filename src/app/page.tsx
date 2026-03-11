"use client";

import { Hero } from "@/components/Hero";
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
      {/* 2. ヒーローセクション */}
      <Hero />


      {/* 4. お知らせセクション（最新のお知らせ一覧） */}
      <NewsSection />

      {/* 5. 緊急連絡先セクション */}
      <EmergencyContact />

      {/* 5. クイックナビゲーション */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-slate-50/50">
        {/* セクション背景装飾 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary-vibrant/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-24 text-left"
          >
            <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-4 md:mb-6">
              <div className="w-10 md:w-16 h-1 bg-secondary-vibrant rounded-full" />
              <span className="tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm uppercase font-black">Quick Services</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary-deep mb-6 tracking-tight">各種お手続き・ご案内</h2>
            <p className="text-text-sub text-sm md:text-lg leading-relaxed max-w-3xl">
              水道の使用開始・中止のお申し込みや、料金のお支払い方法など、<br className="hidden md:block" />
              日常生活に必要な情報を分かりやすくまとめています。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                  className="group block p-8 md:p-10 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 hover:border-secondary-vibrant/30 shadow-sm hover:shadow-premium transition-all duration-700 relative overflow-hidden h-full"
                >
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-primary-main/5 to-secondary-vibrant/10 p-4 md:p-5 rounded-2xl md:rounded-3xl inline-block mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-primary-main group-hover:text-white transition-all duration-500">
                      <div className="transition-colors duration-500">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-primary-deep mb-3 md:mb-4 group-hover:text-primary-main transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-text-sub text-xs md:text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.desc}
                    </p>
                    <div className="mt-6 md:mt-8 flex items-center space-x-3 text-secondary-vibrant font-black text-[10px] md:text-xs tracking-widest uppercase">
                      <span>VIEW DETAILS</span>
                      <div className="w-6 md:w-10 h-px bg-secondary-vibrant group-hover:w-12 md:group-hover:w-16 transition-all duration-500" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 特徴・信頼のセクション */}
      <section className="py-12 md:py-24 relative bg-white overflow-hidden">
        {/* 装飾 */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-soft/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-vibrant/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center space-x-3 text-secondary-vibrant font-black mb-6 md:mb-8">
                <div className="w-12 md:w-20 h-1 bg-secondary-vibrant rounded-full" />
                <span className="tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm uppercase font-black">Our Mission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary-deep mb-8 md:mb-12 leading-[1.15] tracking-tight">
                「当たり前」の品質を、<br />
                <span className="text-gradient-water">揺るぎない覚悟</span>で。
              </h2>
              <p className="text-text-sub text-base md:text-xl leading-relaxed md:leading-loose mb-10 md:mb-16 opacity-80">
                水道は生活に不可欠なインフラです。私たちは、技術革新と日々のメンテナンスを積み重ね、どのような状況下でも変わらない安全な水をお届けします。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="space-y-4 md:space-y-6 group"
                  >
                    <div className="text-secondary-vibrant bg-gradient-to-br from-accent-soft/40 to-secondary-vibrant/10 p-4 md:p-5 rounded-2xl md:rounded-3xl w-fit group-hover:shadow-premium group-hover:bg-secondary-vibrant group-hover:text-white transition-all duration-500">
                      {f.icon}
                    </div>
                    <h4 className="text-lg md:text-2xl font-black text-primary-deep tracking-tight">{f.title}</h4>
                    <p className="text-text-sub text-sm md:text-base leading-relaxed opacity-70">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative aspect-square md:aspect-[4/5] min-h-[400px] md:min-h-0 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-glow-lg"
            >
              {/* メッシュ背景 */}
              <div className="absolute inset-0 animate-mesh-bg bg-gradient-to-br from-primary-deep via-primary-main to-primary-light" />
              {/* 波紋装飾 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/5 rounded-full animate-ripple" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-16 text-center text-white">
                <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl relative z-10 w-full max-w-[calc(100%-2rem)]">
                  <WaterLogoIcon className="w-12 h-12 md:w-24 md:h-24 text-secondary-vibrant mx-auto mb-6 md:mb-12 drop-shadow-glow" />
                  <p className="text-4xl md:text-7xl font-black mb-3 md:mb-6 tracking-tighter leading-none">100%</p>
                  <p className="text-[10px] md:text-sm font-black tracking-[0.2em] md:tracking-[0.4em] uppercase opacity-50 mb-6 md:mb-12">Pure Water Supply</p>
                  <p className="text-accent-soft/80 leading-relaxed text-xs md:text-base font-medium">
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
