"use client";

import { ArrowUpRight, ChevronRight, Droplets, ExternalLink, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { getStaticContent } from "@/data/static-content";

export function AquariumContentPage({ pathname }: { pathname: string }) {
  const page = getStaticContent(pathname);
  const reduced = useReducedMotion();

  return <div className="overflow-hidden bg-[#031426] pb-20 pt-20 text-white sm:pb-24 sm:pt-24">
    <section className="relative flex min-h-[58svh] items-center overflow-hidden border-b border-cyan-100/15 bg-[radial-gradient(circle_at_72%_12%,rgba(111,231,231,.34),transparent_24%),linear-gradient(160deg,#0d7290_0%,#063a63_46%,#031426_100%)] px-5 pb-28 pt-20 sm:min-h-[62svh] sm:px-8 sm:pb-32 sm:pt-24 lg:px-12">
      <motion.div animate={reduced ? undefined : { x: ["-5%", "4%", "-5%"], y: [0, -16, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute inset-0 opacity-45" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="h-full w-full"><path d="M-20 640C205 421 311 753 559 540C778 352 963 588 1230 315C1340 204 1430 185 1510 171" fill="none" stroke="rgba(190,255,254,.42)" strokeWidth="2"/><path d="M-50 214C150 77 349 352 570 202C800 45 1018 317 1300 130" fill="none" stroke="rgba(220,255,255,.23)" strokeWidth="1.5"/></svg>
      </motion.div>
      {Array.from({ length: 14 }).map((_, index) => <motion.span key={index} animate={reduced ? undefined : { y: ["112vh", "-20vh"], opacity: [0, .7, 0] }} transition={{ duration: 8 + index % 5, delay: index * .45, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute bottom-0 rounded-full border border-cyan-50/60 bg-cyan-50/10" style={{ left: `${4 + (index * 17) % 92}%`, height: 5 + index % 5 * 3, width: 5 + index % 5 * 3 }} />)}
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="flex items-center gap-4 text-[10px] font-black tracking-[.3em] text-cyan-100">
          <span>{page.eyebrow}</span>
          <span className="h-px w-10 bg-cyan-100/40" />
          <span>DEPTH {page.depth}</span>
        </div>
        <p className="mt-12 text-[11px] font-bold tracking-[.25em] text-cyan-100/55 sm:mt-16 sm:text-xs">OOI WATER DEPTH JOURNEY</p>
        <h1 className="mt-5 max-w-5xl font-[family-name:var(--font-noto-serif-jp)] text-[clamp(2.75rem,6.2vw,5.8rem)] font-bold leading-[1.12] tracking-[-.045em] text-balance">{page.title}</h1>
        <p className="mt-7 max-w-3xl text-sm leading-8 text-white/74 sm:mt-8 sm:text-lg sm:leading-9">{page.lead}</p>
      </div>
      <svg viewBox="0 0 1200 150" preserveAspectRatio="none" className="absolute -bottom-px left-0 h-24 w-full" aria-hidden="true"><path d="M0 84C119 18 207 143 332 76C458 8 546 145 668 73C796 0 878 145 1008 70C1092 22 1157 54 1200 35V150H0Z" fill="#031426"/><path d="M0 84C119 18 207 143 332 76C458 8 546 145 668 73C796 0 878 145 1008 70C1092 22 1157 54 1200 35" fill="none" stroke="rgba(211,255,251,.65)" strokeWidth="3"/></svg>
    </section>
    <section className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="absolute left-8 top-12 hidden h-[calc(100%-6rem)] w-px bg-gradient-to-b from-cyan-100/0 via-cyan-100/20 to-cyan-100/0 lg:block" />
      {page.sections.map((section, index) => <motion.article key={`${section.heading}-${index}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .14 }} transition={{ duration: .72, delay: Math.min(index * .06, .18) }} className="relative grid gap-7 border-b border-white/12 py-10 first:pt-4 last:border-b-0 sm:py-14 lg:grid-cols-[minmax(220px,.48fr)_minmax(0,1fr)] lg:gap-14 lg:py-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cyan-100/30 bg-cyan-100/10 text-cyan-100"><Droplets className="h-5 w-5" /></span>
            <p className="text-[10px] font-black tracking-[.28em] text-cyan-200">LAYER {String(index + 1).padStart(2, "0")}</p>
          </div>
          <h2 className="mt-5 max-w-md font-[family-name:var(--font-noto-serif-jp)] text-[clamp(1.75rem,3vw,2.7rem)] font-bold leading-[1.35] tracking-[-.025em]">{section.heading}</h2>
        </div>
        <div className="min-w-0 lg:pt-2">
          <p className="max-w-3xl text-sm leading-8 text-white/74 sm:text-base sm:leading-9">{section.body}</p>
          {section.links && <div className="mt-7 grid gap-3 sm:grid-cols-2">{section.links.map((link) => link.external ? <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-cyan-100/18 bg-white/[.035] px-5 py-4 text-sm font-bold leading-6 transition hover:-translate-y-0.5 hover:border-cyan-100/60 hover:bg-cyan-100/10"><span className="flex min-w-0 items-center gap-3"><FileText className="h-4 w-4 shrink-0 text-cyan-200" /><span>{link.label}</span></span><ExternalLink className="h-4 w-4 shrink-0 text-cyan-100/70" /></a> : <Link key={link.href} href={link.href} className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-cyan-100/18 bg-white/[.035] px-5 py-4 text-sm font-bold leading-6 transition hover:-translate-y-0.5 hover:border-cyan-100/60 hover:bg-cyan-100/10"><span>{link.label}</span><ChevronRight className="h-5 w-5 shrink-0 text-cyan-100/70 transition group-hover:translate-x-1" /></Link>)}</div>}
        </div>
      </motion.article>)}
    </section>
    <section className="mx-5 overflow-hidden rounded-[2rem] border border-cyan-100/16 bg-[radial-gradient(circle_at_80%_15%,rgba(103,229,224,.2),transparent_25%),#062840] sm:mx-8 lg:mx-auto lg:max-w-7xl">
      <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
        <div>
          <p className="text-[10px] font-black tracking-[.28em] text-cyan-200">CONTACT / SEA FLOOR</p>
          <h2 className="mt-4 font-[family-name:var(--font-noto-serif-jp)] text-3xl font-bold leading-tight sm:text-4xl">水道に関するご相談は、<br />企業団事務局へ。</h2>
          <p className="mt-5 text-sm leading-7 text-white/58">平日 8:30–17:15　道路上の漏水など緊急連絡は24時間</p>
        </div>
        <a href="tel:0547-46-4130" className="inline-flex items-center gap-3 text-2xl font-black text-cyan-100 transition hover:text-white sm:text-3xl">0547-46-4130 <ArrowUpRight className="h-5 w-5" /></a>
      </div>
    </section>
  </div>;
}
