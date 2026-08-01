"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WaterLogoIcon } from "./WaterLogoIcon";

const storyNavigation = [
  { label: "OVERVIEW", href: "/#overview", japanese: "私たちの使命" },
  { label: "ABOUT", href: "/#about", japanese: "地域と水道" },
  { label: "PROMISE", href: "/#promise", japanese: "3つの約束" },
  { label: "NEWS", href: "/#news", japanese: "お知らせ" },
  { label: "CONTACT", href: "/#contact", japanese: "お問い合わせ" },
];

const mobileNavigation = [
  { label: "くらしの手続き", href: "/resident/procedure" },
  { label: "水道料金", href: "/resident/price" },
  { label: "断水・緊急情報", href: "/resident/water-outage" },
  { label: "事業者の方へ", href: "/business/contractor" },
  { label: "企業団について", href: "/about" },
];

export function RenewalHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-auto fixed left-5 right-5 top-4 z-[10001] hidden xl:block">
        <div
          className={`mx-auto flex h-[72px] max-w-[1540px] items-center rounded-full border px-4 pl-5 text-white shadow-[0_18px_60px_rgba(0,18,39,.2)] backdrop-blur-2xl transition-all duration-500 ${
            scrolled || !isHome
              ? "border-cyan-100/14 bg-[#031b31]/88"
              : "border-white/18 bg-[#042b46]/32"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-3.5" aria-label="大井上水道企業団 トップページ">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cyan-100/12 ring-1 ring-cyan-100/25">
              <WaterLogoIcon className="h-6 w-6 text-cyan-100" />
            </span>
            <span>
              <span className="block text-sm font-bold tracking-[0.06em]">大井上水道企業団</span>
              <span className="mt-0.5 block text-[7px] font-bold tracking-[0.2em] text-cyan-100/48">
                WATER DEPTH JOURNEY
              </span>
            </span>
          </Link>

          <nav className="mx-auto flex items-center gap-1" aria-label="ページ内メニュー">
            {storyNavigation.map((item, index) => (
              <Link
                key={item.label}
                href={isHome ? item.href : `/${item.href.slice(1)}`}
                className="group relative rounded-full px-4 py-2.5 transition-colors hover:bg-white/8"
              >
                <span className="mr-2 text-[8px] font-black text-cyan-200/45">0{index + 1}</span>
                <span className="text-[11px] font-bold tracking-[0.08em] text-white/76 transition-colors group-hover:text-white">
                  {item.japanese}
                </span>
              </Link>
            ))}
          </nav>

          <Link
            href="/resident/procedure"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-cyan-100 px-5 py-3 text-[11px] font-black tracking-[0.06em] text-[#04253d] transition-transform hover:scale-[1.03]"
          >
            くらしの手続き
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>
      </header>

      <header
        className={`pointer-events-auto fixed left-0 right-0 top-0 z-[10001] transition-all duration-500 xl:hidden ${
          scrolled || !isHome
            ? "border-b border-slate-200/70 bg-white/92 text-[#082f47] shadow-sm backdrop-blur-xl"
            : "border-b border-white/15 bg-[#052d46]/15 text-white backdrop-blur-sm"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="大井上水道企業団 トップページ">
            <span
              className={`grid h-11 w-11 place-items-center rounded-full ${
                scrolled || !isHome ? "bg-[#0a7895] text-white" : "bg-white/10 ring-1 ring-white/25"
              }`}
            >
              <WaterLogoIcon className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-[15px] font-bold tracking-[0.05em]">大井上水道企業団</span>
              <span className={`mt-0.5 block text-[8px] font-bold tracking-[0.17em] ${scrolled || !isHome ? "text-slate-500" : "text-white/55"}`}>
                OOI WATER SUPPLY AUTHORITY
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`grid h-11 w-11 place-items-center rounded-full ${
              scrolled || !isHome ? "bg-slate-100" : "bg-white/10 ring-1 ring-white/20"
            }`}
            aria-label="メニューを開く"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 42px) 38px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 42px) 38px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 42px) 38px)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="pointer-events-auto fixed inset-0 z-[10002] bg-[#052d46] text-white xl:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-5 sm:px-10">
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                    <WaterLogoIcon className="h-6 w-6" />
                  </span>
                  <span className="font-bold tracking-wider">大井上水道企業団</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-12 w-12 place-items-center rounded-full bg-white/10"
                  aria-label="メニューを閉じる"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="my-auto" aria-label="スマートフォンメニュー">
                <p className="mb-7 text-[10px] font-bold tracking-[0.3em] text-cyan-200/70">MENU</p>
                {mobileNavigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-white/12 py-5 text-lg font-bold"
                    >
                      {item.label}
                      <ChevronRight className="h-5 w-5 text-cyan-200/60" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10">
                <p className="text-xs text-white/55">平日 8:30〜17:15</p>
                <a href="tel:0547-46-4130" className="mt-2 flex items-center gap-3 text-xl font-bold">
                  <Phone className="h-5 w-5 text-cyan-200" />
                  0547-46-4130
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
