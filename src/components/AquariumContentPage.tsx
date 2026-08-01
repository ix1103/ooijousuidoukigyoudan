"use client";

import { getStaticContent } from "@/data/static-content";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Droplets,
  ExternalLink,
  FileText,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import {
  AquariumAtmosphere,
  BubbleVortex,
  FishShoal,
  Jellyfish,
} from "./AquariumAtmosphere";

export function AquariumContentPage({ pathname }: { pathname: string }) {
  const page = getStaticContent(pathname);
  const reduced = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(rawProgress, {
    stiffness: reduced ? 1000 : 82,
    damping: reduced ? 1000 : 26,
    mass: 0.3,
  });
  const backgroundColor = useTransform(
    progress,
    [0, 0.24, 0.58, 1],
    ["#0b6681", "#06415f", "#031f3b", "#010d1c"],
  );
  const heroY = useTransform(progress, [0, 0.22], ["0%", "18%"]);
  const heroOpacity = useTransform(progress, [0, 0.2], [1, 0]);
  const rayOpacity = useTransform(progress, [0, 0.45, 1], [0.48, 0.18, 0.04]);
  const rayY = useTransform(progress, [0, 1], ["0%", "24%"]);
  const depthFill = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={pageRef}
      style={{ backgroundColor }}
      className="relative overflow-hidden pb-20 pt-20 text-white sm:pb-28 sm:pt-24"
    >
      <AquariumAtmosphere density={48} depthMax={Number.parseInt(page.depth, 10) + 42 || 60} showDepthHud tone="deep" />

      <motion.div style={{ opacity: rayOpacity, y: rayY }} className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[16%] left-[3%] h-[110%] w-[26%] origin-top -rotate-[10deg] bg-[linear-gradient(180deg,rgba(223,255,255,.42),rgba(130,233,239,.04)_72%,transparent)] blur-2xl [clip-path:polygon(32%_0,68%_0,100%_100%,0_100%)]" />
        <div className="absolute -top-[14%] left-[42%] h-[95%] w-[17%] origin-top rotate-[7deg] bg-[linear-gradient(180deg,rgba(242,255,255,.3),rgba(154,239,244,.025)_75%,transparent)] blur-3xl [clip-path:polygon(38%_0,63%_0,100%_100%,0_100%)]" />
        <div className="absolute -top-[18%] right-[5%] h-[108%] w-[24%] origin-top rotate-[13deg] bg-[linear-gradient(180deg,rgba(191,249,251,.3),rgba(90,204,223,.02)_72%,transparent)] blur-3xl [clip-path:polygon(36%_0,67%_0,100%_100%,0_100%)]" />
      </motion.div>

      <section className="relative flex min-h-[72svh] items-center overflow-hidden px-5 pb-36 pt-20 sm:min-h-[76svh] sm:px-8 sm:pb-40 sm:pt-24 lg:px-12">
        <BubbleVortex className="opacity-55" />
        <FishShoal className="bottom-[10%] left-0 w-[330px] opacity-35 sm:w-[520px]" />
        <Jellyfish className="right-[3%] top-[15%] w-28 opacity-40 sm:right-[10%] sm:w-44" delay={1.2} duration={15} />

        <motion.div
          animate={reduced ? undefined : { x: ["-5%", "4%", "-5%"], y: [0, -18, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 opacity-55"
          aria-hidden="true"
        >
          <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="h-full w-full">
            <path d="M-20 640C205 421 311 753 559 540C778 352 963 588 1230 315C1340 204 1430 185 1510 171" fill="none" stroke="rgba(190,255,254,.42)" strokeWidth="2" />
            <path d="M-50 214C150 77 349 352 570 202C800 45 1018 317 1300 130" fill="none" stroke="rgba(220,255,255,.23)" strokeWidth="1.5" />
          </svg>
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-4 text-[10px] font-black tracking-[.3em] text-cyan-100">
            <span>{page.eyebrow}</span>
            <span className="h-px w-10 bg-cyan-100/40" />
            <span>DEPTH {page.depth}</span>
          </div>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1fr_280px] lg:gap-20">
            <div>
              <p className="text-[11px] font-bold tracking-[.25em] text-cyan-100/55 sm:text-xs">OOI WATER / IMMERSIVE INFORMATION LAYER</p>
              <h1 className="mt-5 max-w-5xl text-balance font-[family-name:var(--font-noto-serif-jp)] text-[clamp(3rem,7vw,7.2rem)] font-bold leading-[1.06] tracking-[-.06em]">
                {page.title}
              </h1>
              <p className="mt-8 max-w-3xl text-sm leading-8 text-white/74 sm:text-lg sm:leading-9">{page.lead}</p>
            </div>

            <div className="relative hidden aspect-square place-items-center lg:grid" aria-hidden="true">
              {[0, 1, 2].map((ring) => (
                <motion.span
                  key={ring}
                  animate={reduced ? undefined : { scale: [0.88 + ring * 0.07, 1.12 + ring * 0.07], opacity: [0.46, 0] }}
                  transition={{ duration: 4.2, delay: ring * 1.3, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-8 rounded-full border border-cyan-100/35"
                />
              ))}
              <div className="aquarium-glass-panel relative grid h-36 w-36 place-items-center rounded-full text-center">
                <span>
                  <Waves className="mx-auto h-7 w-7 text-cyan-100" />
                  <span className="mt-3 block font-mono text-xs font-bold tracking-[.2em]">{page.depth}</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={reduced ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 left-5 z-10 flex items-center gap-3 text-[9px] font-black tracking-[.28em] text-cyan-100/72 sm:left-8 lg:left-12"
        >
          DESCEND TO DETAILS <ArrowDown className="h-4 w-4" />
        </motion.div>

        <svg viewBox="0 0 1200 170" preserveAspectRatio="none" className="absolute -bottom-px left-0 z-10 h-28 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="content-wave-depth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(3,31,59,.22)" />
              <stop offset="100%" stopColor="#031f3b" />
            </linearGradient>
            <filter id="content-wave-blur" x="-8%" y="-30%" width="116%" height="160%"><feGaussianBlur stdDeviation="10" /></filter>
          </defs>
          <path d="M0 84C119 18 207 143 332 76C458 8 546 145 668 73C796 0 878 145 1008 70C1092 22 1157 54 1200 35V170H0Z" fill="url(#content-wave-depth)" />
          <path d="M0 84C119 18 207 143 332 76C458 8 546 145 668 73C796 0 878 145 1008 70C1092 22 1157 54 1200 35" fill="none" stroke="rgba(211,255,251,.4)" strokeWidth="18" filter="url(#content-wave-blur)" />
          <path d="M0 84C119 18 207 143 332 76C458 8 546 145 668 73C796 0 878 145 1008 70C1092 22 1157 54 1200 35" fill="none" stroke="rgba(225,255,253,.68)" strokeWidth="2" />
        </svg>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="pointer-events-none absolute left-8 top-24 hidden h-[calc(100%-9rem)] w-px bg-white/12 lg:block" aria-hidden="true">
          <motion.span style={{ height: depthFill }} className="block w-px bg-gradient-to-b from-cyan-100 via-cyan-300/60 to-transparent" />
        </div>

        <div className="space-y-7 sm:space-y-10 lg:pl-14">
          {page.sections.map((section, index) => (
            <motion.article
              key={`${section.heading}-${index}`}
              initial={{ opacity: 0, y: 56, rotateX: 4 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.95, delay: Math.min(index * 0.07, 0.21), ease: [0.16, 1, 0.3, 1] }}
              className="aquarium-glass-panel aquarium-edge-glow group relative overflow-hidden rounded-[2rem] p-6 sm:rounded-[2.5rem] sm:p-10 lg:p-12"
            >
              <motion.div
                animate={reduced ? undefined : { x: ["-18%", "110%"], opacity: [0, 0.14, 0] }}
                transition={{ duration: 7.5, delay: index * 0.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                className="pointer-events-none absolute -top-1/3 h-[170%] w-[18%] rotate-[17deg] bg-[linear-gradient(90deg,transparent,rgba(221,255,255,.3),transparent)] blur-xl"
                aria-hidden="true"
              />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(230px,.48fr)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <div className="flex items-center gap-4">
                    <motion.span
                      whileHover={reduced ? undefined : { scale: 1.1, rotate: 8 }}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan-100/30 bg-cyan-100/10 text-cyan-100 shadow-[inset_0_0_24px_rgba(165,248,255,.08)]"
                    >
                      <Droplets className="h-5 w-5" />
                    </motion.span>
                    <p className="text-[10px] font-black tracking-[.28em] text-cyan-200">LAYER {String(index + 1).padStart(2, "0")}</p>
                  </div>
                  <h2 className="mt-6 max-w-md font-[family-name:var(--font-noto-serif-jp)] text-[clamp(1.9rem,3.4vw,3.2rem)] font-bold leading-[1.32] tracking-[-.035em]">
                    {section.heading}
                  </h2>
                </div>

                <div className="min-w-0 lg:pt-2">
                  <p className="max-w-3xl whitespace-pre-line text-sm leading-8 text-white/74 sm:text-base sm:leading-9">{section.body}</p>
                  {section.links && (
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {section.links.map((link) =>
                        link.external ? (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group/link flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-cyan-100/16 bg-white/[.045] px-5 py-4 text-sm font-bold leading-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-100/55 hover:bg-cyan-100/10"
                          >
                            <span className="flex min-w-0 items-center gap-3"><FileText className="h-4 w-4 shrink-0 text-cyan-200" /><span>{link.label}</span></span>
                            <ExternalLink className="h-4 w-4 shrink-0 text-cyan-100/70 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                          </a>
                        ) : (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="group/link flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-cyan-100/16 bg-white/[.045] px-5 py-4 text-sm font-bold leading-6 transition duration-500 hover:-translate-y-1 hover:border-cyan-100/55 hover:bg-cyan-100/10"
                          >
                            <span>{link.label}</span>
                            <ChevronRight className="h-5 w-5 shrink-0 text-cyan-100/70 transition group-hover/link:translate-x-1" />
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-5 overflow-hidden rounded-[2rem] border border-cyan-100/16 bg-[radial-gradient(circle_at_80%_15%,rgba(103,229,224,.2),transparent_25%),#03192b]/90 sm:mx-8 sm:rounded-[2.75rem] lg:mx-auto lg:max-w-7xl">
        <Jellyfish className="-right-6 -top-8 w-36 opacity-30 sm:w-52" delay={2} duration={16} />
        <FishShoal className="bottom-0 left-0 w-[300px] opacity-25" reverse />
        <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
          <div>
            <p className="text-[10px] font-black tracking-[.28em] text-cyan-200">CONTACT / SEA FLOOR</p>
            <h2 className="mt-4 font-[family-name:var(--font-noto-serif-jp)] text-3xl font-bold leading-tight sm:text-5xl">水道に関するご相談は、<br />企業団事務局へ。</h2>
            <p className="mt-5 text-sm leading-7 text-white/58">平日 8:30–17:15　道路上の漏水など緊急連絡は24時間</p>
          </div>
          <a href="tel:0547-46-4130" className="inline-flex items-center gap-3 text-2xl font-black text-cyan-100 transition hover:text-white sm:text-3xl">0547-46-4130 <ArrowUpRight className="h-5 w-5" /></a>
        </div>
      </section>
    </motion.div>
  );
}
