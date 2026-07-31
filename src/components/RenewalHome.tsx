"use client";

import type { StaticAnnouncement } from "@/data/static-content";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Droplets,
  FileText,
  FlaskConical,
  HandCoins,
  Leaf,
  Phone,
  ShieldCheck,
  Sparkles,
  Waves,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

const services = [
  {
    index: "01",
    label: "水道の使用開始・中止",
    english: "START / STOP",
    note: "お引越し・名義変更",
    action: "使う",
    tone: "#087b9a",
    href: "/resident/procedure",
    icon: Droplets,
  },
  {
    index: "02",
    label: "水道料金を調べる",
    english: "WATER RATES",
    note: "料金・お支払い方法",
    action: "払う",
    tone: "#176f86",
    href: "/resident/price",
    icon: HandCoins,
  },
  {
    index: "03",
    label: "断水・緊急情報",
    english: "EMERGENCY",
    note: "いま知りたい情報",
    action: "備える",
    tone: "#075681",
    href: "/resident/water-outage",
    icon: AlertTriangle,
  },
  {
    index: "04",
    label: "修理・水のトラブル",
    english: "TROUBLE",
    note: "漏水・指定工事店",
    action: "直す",
    tone: "#285e65",
    href: "/resident/trouble",
    icon: Wrench,
  },
];

const promises = [
  {
    index: "01",
    english: "SAFETY",
    title: "安全であること",
    copy: "水源からご家庭の蛇口まで。検査と監視を積み重ね、毎日の安心を守り続けます。",
    color: "#0b8fac",
    background: "#064966",
    symbol: "澄",
    icon: ShieldCheck,
    href: "/resident/quality",
  },
  {
    index: "02",
    english: "RELIABILITY",
    title: "途切れないこと",
    copy: "施設と管路を計画的に整備し、災害時にも地域を支えられる強い水道をつくります。",
    color: "#14788f",
    background: "#073a59",
    symbol: "絶",
    icon: Waves,
    href: "/about/business",
  },
  {
    index: "03",
    english: "SUSTAINABILITY",
    title: "未来へつなぐこと",
    copy: "限りある水と環境を大切にしながら、次の世代へ持続可能な水道を引き継ぎます。",
    color: "#155f7d",
    background: "#052b4c",
    symbol: "継",
    icon: Leaf,
    href: "/about/outline",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SceneProgress({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="pointer-events-none fixed bottom-8 right-5 top-28 z-40 hidden w-px bg-white/20 lg:block xl:right-7">
      <motion.div style={{ height }} className="w-px bg-cyan-100" />
      <span className="absolute -left-[7px] top-0 h-3.5 w-3.5 rounded-full border border-white/50 bg-[#073650]" />
      <span className="absolute -bottom-1 -left-[3px] h-1.5 w-1.5 rounded-full bg-cyan-100" />
    </div>
  );
}

function WaterLens({ compact = false }: { compact?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const shapeId = useId().replace(/:/g, "");
  const dropPath =
    "M150 8C150 8 31 151 31 274C31 365 82 428 150 428C218 428 269 365 269 274C269 151 150 8 150 8Z";

  return (
    <div className="relative h-full w-full drop-shadow-[0_38px_70px_rgba(0,30,68,.34)]">
      <motion.svg
        viewBox="0 0 300 440"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.035, 1], opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-[9%] h-[118%] w-[118%] overflow-visible"
        aria-hidden="true"
      >
        <path d={dropPath} fill="none" stroke="rgba(210,247,255,.42)" strokeWidth="1.2" />
      </motion.svg>

      <svg viewBox="0 0 300 440" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden={compact}>
        <defs>
          <radialGradient id={`${shapeId}-glass`} cx="31%" cy="18%" r="88%">
            <stop offset="0%" stopColor="rgba(255,255,255,.88)" />
            <stop offset="24%" stopColor="rgba(220,250,255,.46)" />
            <stop offset="54%" stopColor="rgba(73,203,222,.24)" />
            <stop offset="100%" stopColor="rgba(5,74,139,.46)" />
          </radialGradient>
          <linearGradient id={`${shapeId}-depth`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(87,232,239,.12)" />
            <stop offset="100%" stopColor="rgba(0,44,108,.66)" />
          </linearGradient>
          <clipPath id={`${shapeId}-clip`}>
            <path d={dropPath} />
          </clipPath>
          <filter id={`${shapeId}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id={`${shapeId}-water`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.016 0.045" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <path d={dropPath} fill={`url(#${shapeId}-glass)`} filter={`url(#${shapeId}-water)`} />
        <g clipPath={`url(#${shapeId}-clip)`}>
          <rect x="0" y="192" width="300" height="250" fill={`url(#${shapeId}-depth)`} />
          <motion.ellipse
            cx="76"
            cy="92"
            rx="62"
            ry="29"
            fill="rgba(255,255,255,.42)"
            filter={`url(#${shapeId}-glow)`}
            animate={shouldReduceMotion ? undefined : { cx: [65, 100, 65], cy: [86, 105, 86] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.g
            animate={shouldReduceMotion ? undefined : { x: [-26, 8, -26] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M-40 236C26 197 78 263 145 226C207 192 254 253 340 207V460H-40Z"
              fill="rgba(89,221,233,.42)"
            />
            <path
              d="M-40 265C35 220 91 291 165 247C229 208 282 276 340 236V460H-40Z"
              fill="rgba(10,118,178,.58)"
            />
            <path
              d="M-40 295C28 255 99 320 179 276C238 244 291 300 340 271V460H-40Z"
              fill="rgba(2,51,117,.76)"
            />
          </motion.g>
          <path d="M24 196H278" stroke="rgba(255,255,255,.72)" strokeWidth="1" />
          <path d="M52 36C22 137 31 281 94 378" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="4" />
          <path d="M-18 154C42 127 95 179 154 151C213 123 259 161 327 132" fill="none" stroke="rgba(255,255,255,.38)" strokeWidth="2" />
          <path d="M-18 168C42 141 95 193 154 165C213 137 259 175 327 146" fill="none" stroke="rgba(196,249,255,.25)" strokeWidth="4" />
          <motion.circle
            cx="238"
            cy="118"
            r="13"
            fill="rgba(255,255,255,.58)"
            filter={`url(#${shapeId}-glow)`}
            animate={shouldReduceMotion ? undefined : { opacity: [0.25, 0.85, 0.25], r: [10, 15, 10] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        <path d={dropPath} fill="none" stroke="rgba(231,253,255,.82)" strokeWidth="1.25" />
        {!compact && (
          <>
            <text x="150" y="348" textAnchor="middle" fill="rgba(255,255,255,.66)" fontSize="8" fontWeight="800" letterSpacing="4">
              SOURCE 01
            </text>
            <text
              x="150"
              y="378"
              textAnchor="middle"
              fill="white"
              fontSize="21"
              fontWeight="400"
              letterSpacing="6"
              fontFamily="var(--font-noto-serif-jp)"
            >
              大井の水
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

function AquariumFish({
  top,
  delay,
  duration,
  size,
  reverse = false,
}: {
  top: string;
  delay: number;
  duration: number;
  size: number;
  reverse?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 150 70"
      initial={{ x: reverse ? "112vw" : "-24vw" }}
      animate={shouldReduceMotion ? undefined : { x: reverse ? "-28vw" : "118vw", y: [0, -13, 5, 0] }}
      transition={{
        x: { duration, delay, repeat: Infinity, ease: "linear" },
        y: { duration: 5.5, delay, repeat: Infinity, ease: "easeInOut" },
      }}
      className="pointer-events-none absolute left-0 z-[2] text-[#032d4a]/55"
      style={{ top, width: size }}
      aria-hidden="true"
    >
      <g transform={reverse ? "translate(150 0) scale(-1 1)" : undefined}>
        <path
          d="M42 34C61 8 105 9 127 33C105 58 62 60 42 37L8 57L18 34L8 12Z"
          fill="currentColor"
        />
        <circle cx="110" cy="28" r="2.6" fill="rgba(208,250,255,.75)" />
      </g>
    </motion.svg>
  );
}

function SkeletonFish({
  top,
  delay,
  duration,
  size,
  reverse = false,
  flip = false,
  className = "",
}: {
  top: string;
  delay: number;
  duration: number;
  size: number;
  reverse?: boolean;
  flip?: boolean;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 240 96"
      initial={{ x: reverse ? "110vw" : "-28vw" }}
      animate={shouldReduceMotion ? undefined : { x: reverse ? "-32vw" : "116vw", y: [0, -15, 8, -5, 0], rotate: [0, reverse ? -1.2 : 1.2, reverse ? 1 : -1, 0] }}
      transition={{
        x: { duration, delay, repeat: Infinity, ease: "linear" },
        y: { duration: 4.9, delay, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4.9, delay, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`pointer-events-none absolute left-0 z-[2] text-white/85 drop-shadow-[0_0_12px_rgba(226,255,255,.36)] ${className}`}
      style={{ top, width: size }}
      aria-hidden="true"
    >
      <g transform={flip ? "translate(240 0) scale(-1 1)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 52C24 37 43 36 60 42L70 52L60 62C43 68 24 67 12 52Z" strokeWidth="3.6" />
        <path d="M18 52H43M47 43L58 52L47 61M60 43L74 35M60 61L74 69" strokeWidth="2.3" />
        <circle cx="30" cy="47" r="2.5" fill="currentColor" stroke="none" />
        <g fill="currentColor" stroke="none">
          {[42, 48, 54, 60, 66, 72].map((x, index) => <circle key={`skull-a-${x}`} cx={x} cy={index % 2 === 0 ? 37 : 67} r="3.6" />)}
          {[47, 53, 59, 65, 71].map((x, index) => <circle key={`skull-b-${x}`} cx={x} cy={index % 2 === 0 ? 45 : 59} r="3" />)}
        </g>
        <path d="M70 52C107 49 163 50 207 52" strokeWidth="4.6" />
        <path d="M82 50C87 27 91 22 96 19M96 50C102 25 108 18 114 17M113 51C120 24 128 18 135 20M132 51C140 27 149 23 157 28M151 51C161 33 171 32 180 38" strokeWidth="2.7" />
        <path d="M82 54C87 77 92 82 98 86M98 54C104 78 111 86 118 87M116 54C123 78 132 85 140 82M136 54C145 75 155 80 164 75M154 54C164 69 174 71 182 66" strokeWidth="2.7" />
        <path d="M108 50L99 30M131 53L123 75M160 51L151 34" strokeWidth="2.1" />
        <path d="M205 52L235 24M205 52L235 80M216 42L238 52L216 62" strokeWidth="3.8" />
        {[80, 94, 109, 125, 142, 160, 178, 194].map((x) => <circle key={x} cx={x} cy="52" r="3.7" fill="#06172b" strokeWidth="2.2" />)}
      </g>
    </motion.svg>
  );
}

function DiveBubbles({ count = 20, className = "" }: { count?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, bubble) => {
        const size = 4 + (bubble % 6) * 3;
        return (
          <motion.span
            key={bubble}
            animate={shouldReduceMotion ? undefined : { y: ["22vh", "-132vh"], x: [0, bubble % 2 ? -18 : 22, 0], opacity: [0, 0.7, 0] }}
            transition={{ duration: 6.5 + (bubble % 7) * 0.9, delay: (bubble % 9) * 0.48, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] rounded-full border border-white/70 bg-cyan-50/10 shadow-[inset_1px_1px_4px_rgba(255,255,255,.7),0_0_12px_rgba(169,247,255,.22)]"
            style={{ left: `${3 + ((bubble * 23) % 94)}%`, width: size, height: size }}
          />
        );
      })}
    </div>
  );
}

function UnderwaterCurrent({
  fish = false,
  className = "",
}: {
  fish?: boolean;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.svg
        animate={shouldReduceMotion ? undefined : { x: ["-7%", "3%", "-7%"], y: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 1500 850"
        preserveAspectRatio="none"
        className="absolute -left-[10%] top-0 h-full w-[125%]"
      >
        <path
          d="M-80 650C173 467 313 753 565 543C785 359 983 583 1249 313C1344 216 1432 191 1580 178"
          fill="none"
          stroke="rgba(125,232,238,.18)"
          strokeWidth="2"
        />
        <path
          d="M-40 263C165 95 334 358 568 214C803 68 1002 318 1278 139C1384 71 1473 62 1580 91"
          fill="none"
          stroke="rgba(220,255,252,.09)"
          strokeWidth="1.5"
        />
        <path
          d="M185 930C264 690 538 766 697 587C860 403 1042 472 1217 306C1351 179 1453 169 1578 198"
          fill="none"
          stroke="rgba(70,180,208,.13)"
          strokeWidth="1.5"
        />
      </motion.svg>

      {Array.from({ length: 9 }).map((_, bubble) => {
        const size = 4 + (bubble % 4) * 3;
        return (
          <motion.span
            key={bubble}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [40, -520 - bubble * 28],
                    x: [0, bubble % 2 === 0 ? 18 : -14, 0],
                    opacity: [0, 0.38, 0],
                  }
            }
            transition={{
              duration: 9 + (bubble % 5) * 1.4,
              delay: bubble * 0.85,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[-8%] rounded-full border border-cyan-100/35 bg-cyan-100/5"
            style={{ left: `${7 + ((bubble * 19) % 88)}%`, width: size, height: size }}
          />
        );
      })}

      {fish && (
        <>
          <AquariumFish top="24%" delay={1} duration={24} size={70} />
          <AquariumFish top="69%" delay={8} duration={29} size={52} reverse />
        </>
      )}
    </div>
  );
}

function PromiseScene({
  item,
  position,
}: {
  item: (typeof promises)[number];
  position: number;
}) {
  const sceneRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const Icon = item.icon;
  const { scrollYProgress: rawProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(rawProgress, {
    stiffness: shouldReduceMotion ? 1000 : 82,
    damping: shouldReduceMotion ? 1000 : 24,
    mass: 0.32,
  });
  const titleY = useTransform(progress, [0, 0.3, 0.72, 1], ["14%", "0%", "0%", "-12%"]);
  const contentOpacity = useTransform(progress, [0, 0.16, 0.78, 1], [0.2, 1, 1, 0.25]);
  const orbX = useTransform(progress, [0, 0.52, 1], ["42%", "-5%", "-34%"]);
  const orbY = useTransform(progress, [0, 0.48, 1], ["28%", "-2%", "-26%"]);
  const orbScale = useTransform(progress, [0, 0.55, 1], [0.72, 1, 1.22]);
  const symbolX = useTransform(progress, [0, 1], ["12%", "-14%"]);
  const lineWidth = useTransform(progress, [0.06, 0.88], ["0%", "100%"]);
  const nextY = useTransform(progress, [0.7, 1], ["40%", "0%"]);

  return (
    <section ref={sceneRef} className="relative h-[155vh]" style={{ backgroundColor: item.background }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden text-white">
        <AquariumFish
          top={`${22 + position * 17}%`}
          delay={position * 3}
          duration={23 + position * 4}
          size={58 + position * 12}
          reverse={position === 1}
        />
        <motion.p
          style={{ x: symbolX }}
          className="pointer-events-none absolute -left-[4vw] top-1/2 -translate-y-1/2 font-[family-name:var(--font-noto-serif-jp)] text-[clamp(24rem,55vw,64rem)] font-black leading-none text-white/[0.035]"
        >
          {item.symbol}
        </motion.p>

        <motion.div
          style={{ x: orbX, y: orbY, scale: orbScale, backgroundColor: item.color }}
          className="pointer-events-none absolute right-[-7vw] top-[17%] aspect-[0.88] w-[min(62vw,760px)] overflow-hidden rounded-[50%] opacity-75 shadow-[0_0_120px_rgba(74,208,228,.16)]"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { rotate: [0, 360] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[18%] rounded-[42%] border-[2px] border-white/20"
          />
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: ["-8%", "10%", "-8%"], rotate: [-4, 4, -4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-[-22%] top-[42%] h-[34%] rounded-[50%] bg-cyan-100/18 blur-2xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,.34),transparent_32%),linear-gradient(145deg,transparent_20%,rgba(255,255,255,.15)_51%,transparent_70%)]" />
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity, y: titleY }}
          className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.33fr_1.67fr] lg:px-12"
        >
          <div className="flex items-start justify-between lg:block">
            <span className="text-sm font-black tracking-[0.22em] text-white/48">{item.index} / 03</span>
            <span className="text-[10px] font-black tracking-[0.3em] text-cyan-100 lg:mt-16 lg:block">
              PROMISE {position + 1}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <Icon className="h-6 w-6 text-cyan-100 sm:h-8 sm:w-8" />
              <p className="text-[10px] font-black tracking-[0.3em] text-cyan-100 sm:text-xs">{item.english}</p>
            </div>
            <h3 className="mt-7 max-w-[1100px] font-[family-name:var(--font-noto-serif-jp)] text-[clamp(3rem,8.2vw,9rem)] font-bold leading-[1.04] tracking-[-0.065em]">
              {item.title}
            </h3>
            <div className="mt-10 flex max-w-4xl flex-col gap-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-sm font-medium leading-8 text-white/68 sm:text-base sm:leading-9">{item.copy}</p>
              <Link
                href={item.href}
                className="group/link inline-flex shrink-0 items-center gap-4 text-[10px] font-black tracking-[0.18em] sm:text-xs"
              >
                VIEW DETAIL
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/28 transition-all duration-500 group-hover/link:rotate-45 group-hover/link:bg-white group-hover/link:text-[#061f3b]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="absolute inset-x-5 bottom-7 z-10 flex items-end gap-5 sm:inset-x-8 lg:inset-x-12">
          <span className="text-[9px] font-black tracking-[0.24em] text-white/42">SCROLL STORY</span>
          <div className="mb-1 h-px flex-1 bg-white/14">
            <motion.div style={{ width: lineWidth }} className="h-px bg-cyan-100" />
          </div>
          <span className="text-[9px] font-black tracking-[0.24em] text-white/42">{item.index}</span>
        </div>

        {position < promises.length - 1 && (
          <motion.p
            style={{ y: nextY }}
            className="pointer-events-none absolute bottom-16 right-7 hidden text-[9px] font-black tracking-[0.25em] text-white/35 lg:block"
          >
            NEXT PROMISE ↓
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function RenewalHome({
  initialAnnouncements = [],
}: {
  initialAnnouncements?: StaticAnnouncement[];
}) {
  const heroSceneRef = useRef<HTMLElement>(null);
  const networkSceneRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [introVisible, setIntroVisible] = useState(true);
  const announcements = initialAnnouncements;

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroVisible(false), 1650);
    return () => {
      window.clearTimeout(introTimer);
    };
  }, []);

  const { scrollYProgress: heroProgressRaw } = useScroll({
    target: heroSceneRef,
    offset: ["start start", "end end"],
  });
  const heroProgress = useSpring(heroProgressRaw, {
    stiffness: shouldReduceMotion ? 1000 : 90,
    damping: shouldReduceMotion ? 1000 : 26,
    mass: 0.32,
  });

  const backgroundScale = useTransform(heroProgress, [0, 0.65, 1], [1.05, 1.16, 1.25]);
  const backgroundY = useTransform(heroProgress, [0, 1], ["0%", "8%"]);
  const backgroundOpacity = useTransform(heroProgress, [0, 0.72, 0.92], [1, 1, 0]);
  const heroTitleOpacity = useTransform(heroProgress, [0, 0.24, 0.4], [1, 1, 0]);
  const heroTitleY = useTransform(heroProgress, [0, 0.38], ["0%", "-22%"]);
  const portalScale = useTransform(heroProgress, [0, 0.28, 0.6], [1, 1.12, 0.62]);
  const portalY = useTransform(heroProgress, [0, 0.65], ["0%", "-42%"]);
  const portalOpacity = useTransform(heroProgress, [0, 0.48, 0.68], [1, 1, 0]);
  const missionOpacity = useTransform(heroProgress, [0.28, 0.43, 0.72, 0.87], [0, 1, 1, 0]);
  const missionY = useTransform(heroProgress, [0.28, 0.48, 0.82], ["18%", "0%", "-12%"]);
  const plungeOpacity = useTransform(heroProgress, [0.42, 0.58, 0.86, 1], [0, 1, 0.85, 0]);
  const plungeScale = useTransform(heroProgress, [0.42, 0.9], [0.82, 1.2]);
  const sceneWipe = useTransform(heroProgress, [0.78, 0.96], ["100%", "0%"]);

  const { scrollYProgress: networkProgressRaw } = useScroll({
    target: networkSceneRef,
    offset: ["start start", "end end"],
  });
  const networkProgress = useSpring(networkProgressRaw, {
    stiffness: shouldReduceMotion ? 1000 : 80,
    damping: shouldReduceMotion ? 1000 : 24,
    mass: 0.35,
  });
  const waterDepthColor = useTransform(
    networkProgress,
    [0, 0.24, 0.58, 1],
    ["#d9f2e8", "#62c4ca", "#08728e", "#031d42"],
  );
  const surfaceY = useTransform(networkProgress, [0, 0.38, 0.72], ["4%", "-62%", "-126%"]);
  const surfaceScale = useTransform(networkProgress, [0, 0.5], [1, 1.18]);
  const surfaceOpacity = useTransform(networkProgress, [0, 0.38, 0.62], [1, 0.8, 0]);
  const diveIntroOpacity = useTransform(networkProgress, [0, 0.12, 0.3, 0.42], [1, 1, 1, 0]);
  const aquariumOpacity = useTransform(networkProgress, [0.18, 0.36, 1], [0, 1, 1]);
  const lightOpacity = useTransform(networkProgress, [0, 0.35, 0.78], [0.7, 0.38, 0.08]);
  const mapScale = useTransform(networkProgress, [0.28, 0.58, 1], [0.58, 0.95, 1.12]);
  const mapRotate = useTransform(networkProgress, [0.28, 1], [-5, 2]);
  const mapY = useTransform(networkProgress, [0.25, 0.62, 1], ["22%", "0%", "-8%"]);
  const mapOpacity = useTransform(networkProgress, [0.26, 0.46, 0.9, 1], [0, 1, 1, 0.55]);
  const mapDraw = useTransform(networkProgress, [0.32, 0.75], [0, 1]);
  const networkTitleOpacity = useTransform(networkProgress, [0.3, 0.47, 0.76, 0.9], [0, 1, 1, 0]);
  const networkCopyOpacity = useTransform(networkProgress, [0.52, 0.68, 0.94], [0, 1, 1]);
  const depthLine = useTransform(networkProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-[#f8faf7] text-[#092f46]">
      <AnimatePresence>
        {introVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[20000] grid place-items-center overflow-hidden bg-white"
          >
            <motion.div
              initial={{ scale: 0.35, opacity: 0 }}
              animate={{ scale: [0.35, 1, 14], opacity: [0, 1, 1] }}
              transition={{ duration: 1.55, times: [0, 0.55, 1], ease: [0.76, 0, 0.24, 1] }}
              className="relative h-24 w-16"
            >
              <WaterLens compact />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: [0, 1, 0], y: [12, 0, -10] }}
              transition={{ duration: 1.3 }}
              className="absolute bottom-[18%] text-[10px] font-black tracking-[0.35em] text-[#083851]"
            >
              OOI WATER
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <section ref={heroSceneRef} id="overview" className="relative h-[285vh] bg-[#072e5d]">
        <div className="sticky top-0 h-screen overflow-hidden text-white">
          <motion.div style={{ scale: backgroundScale, y: backgroundY, opacity: backgroundOpacity }} className="absolute inset-0">
            <Image
              src="/images/water-surface-aquarium-v1.png"
              alt="地域の暮らしを支える水源と浄水施設"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[64%_center]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,25,68,.12),rgba(1,32,75,.42))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_53%_46%,transparent_0%,rgba(1,29,69,.18)_42%,rgba(1,23,59,.58)_100%)]" />
          <motion.div
            animate={shouldReduceMotion ? undefined : { backgroundPositionX: ["0%", "100%"] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
            className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.32)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.32)_1px,transparent_1px)] [background-size:96px_96px]"
          />

          <SceneProgress progress={heroProgress} />

          <motion.div
            style={{ opacity: heroTitleOpacity, y: heroTitleY }}
            className="absolute inset-0 z-10 flex items-center justify-center px-5 pb-12 pt-24 sm:px-8 xl:pt-28"
          >
            <div className="relative grid w-full max-w-[1320px] items-center gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div className="order-2 text-center lg:order-1 lg:text-left">
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.6 }}
                  className="text-[9px] font-black tracking-[0.32em] text-cyan-100 sm:text-[11px]"
                >
                  SURFACE 00M / OOI WATER
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 font-[family-name:var(--font-noto-serif-jp)] text-[clamp(2.5rem,5vw,4.8rem)] font-bold leading-[1.12] tracking-[-0.065em]"
                >
                  水を読み、
                  <br />
                  <span className="lg:whitespace-nowrap">暮らしを支える。</span>
                </motion.h1>
                <p className="mx-auto mt-5 max-w-md text-xs font-medium leading-7 text-white/62 lg:mx-0 lg:text-sm">
                  水面から、地域の未来へ。大井の水がめぐる物語をたどります。
                </p>
              </div>

              <motion.div
                style={{ scale: portalScale, y: portalY, opacity: portalOpacity }}
                className="relative order-1 mx-auto h-[285px] w-[196px] sm:h-[360px] sm:w-[248px] lg:order-2 lg:h-[470px] lg:w-[330px]"
              >
                <WaterLens />
                <div className="absolute -right-16 bottom-[8%] top-[12%] hidden w-11 flex-col justify-between text-[7px] font-black tracking-[0.15em] text-cyan-100/55 sm:flex">
                  <span>00M</span>
                  <span className="h-px w-full bg-cyan-100/35" />
                  <span>06M</span>
                  <span className="h-px w-3/4 bg-cyan-100/25" />
                  <span>12M</span>
                  <span className="h-px w-1/2 bg-cyan-100/20" />
                  <span>18M</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: missionOpacity, y: missionY }}
            className="absolute inset-0 z-10 flex items-center justify-center px-6 py-28 sm:px-12"
          >
            <div className="w-full max-w-[1080px]">
              <p className="text-[10px] font-black tracking-[0.32em] text-cyan-100 sm:text-xs">OUR MISSION</p>
              <h2 className="mt-8 font-[family-name:var(--font-noto-serif-jp)] text-[clamp(2rem,4.2vw,4.2rem)] font-bold leading-[1.55] tracking-[-0.02em]">
                <span className="sm:hidden">
                  あたりまえに
                  <br />
                  水が使える
                  <br />
                  毎日を守り、
                  <br />
                  地域の未来へつなぐ。
                </span>
                <span className="hidden sm:inline">
                  あたりまえに水が使える
                  <br />
                  毎日を守り、
                  <br />
                  地域の未来へつなぐ。
                </span>
              </h2>
              <div className="mt-10 grid gap-6 text-sm font-medium leading-8 text-white/72 sm:grid-cols-2 sm:text-base sm:leading-9">
                <p>
                  水源、浄水施設、管路、そして人。見えない場所で積み重ねる仕事が、地域の暮らしと産業を支えています。
                </p>
                <p>
                  大井上水道企業団は、災害にも強く、次の世代へ続く水道を地域とともにつくります。
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: plungeOpacity, scale: plungeScale }} className="pointer-events-none absolute inset-0 z-[24]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(38,205,211,.42),transparent_45%),linear-gradient(180deg,transparent_0%,rgba(18,160,183,.16)_55%,rgba(2,45,96,.38)_100%)]" />
            <motion.svg
              animate={shouldReduceMotion ? undefined : { x: ["-3%", "3%", "-3%"] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              viewBox="0 0 1200 220"
              preserveAspectRatio="none"
              className="absolute bottom-[-2%] left-[-5%] h-[38%] w-[110%] opacity-70"
              aria-hidden="true"
            >
              <path d="M0 86C122 20 222 168 356 88C486 9 590 156 722 77C845 4 1004 161 1200 52V220H0Z" fill="rgba(90,225,230,.3)" />
              <path d="M0 101C142 42 238 170 380 106C527 39 628 175 782 96C918 26 1045 152 1200 83" fill="none" stroke="rgba(235,255,255,.88)" strokeWidth="3" />
            </motion.svg>
          </motion.div>

          <div className="absolute bottom-7 left-6 z-20 flex items-center gap-4 text-[9px] font-black tracking-[0.28em] sm:left-10 xl:left-8">
            SCROLL
            <motion.span
              animate={shouldReduceMotion ? undefined : { y: [0, 9, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </div>

          <motion.svg
            style={{ y: sceneWipe }}
            viewBox="0 0 1200 1000"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-30 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hero-wave-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d9f8f2" />
                <stop offset="35%" stopColor="#55c4cb" />
                <stop offset="100%" stopColor="#07517e" />
              </linearGradient>
              <filter id="hero-wave-soft" x="-5%" y="-25%" width="110%" height="150%">
                <feGaussianBlur stdDeviation="12" />
              </filter>
            </defs>
            <path d="M0 82C95 18 177 146 286 77C391 11 479 151 595 71C711 -9 802 141 920 68C1035 -3 1116 103 1200 46V1000H0Z" fill="url(#hero-wave-fill)" />
            <path d="M0 82C95 18 177 146 286 77C391 11 479 151 595 71C711 -9 802 141 920 68C1035 -3 1116 103 1200 46" fill="none" stroke="rgba(235,255,255,.76)" strokeWidth="18" filter="url(#hero-wave-soft)" />
            <path d="M0 82C95 18 177 146 286 77C391 11 479 151 595 71C711 -9 802 141 920 68C1035 -3 1116 103 1200 46" fill="none" stroke="rgba(249,255,255,.92)" strokeWidth="3.5" />
            <path d="M0 109C105 52 178 161 299 100C418 39 490 167 613 91C732 16 812 157 934 94C1050 35 1129 124 1200 77" fill="none" stroke="rgba(205,250,249,.6)" strokeWidth="8" />
          </motion.svg>
        </div>
      </section>

      <section ref={networkSceneRef} id="about" className="relative h-[340vh] bg-[#d9f2e8]">
        <div className="pointer-events-none absolute -top-20 inset-x-0 z-30 h-40 bg-[linear-gradient(180deg,rgba(7,81,126,.7),rgba(85,196,203,.32)_44%,rgba(217,242,232,0)_100%)] blur-2xl" aria-hidden="true" />
        <motion.div style={{ backgroundColor: waterDepthColor }} className="sticky top-0 h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[12] h-[32%] bg-[linear-gradient(180deg,#064d61_0%,rgba(8,113,139,.82)_28%,rgba(74,190,196,.38)_60%,rgba(217,242,232,0)_100%)]" aria-hidden="true" />
          <motion.svg
            animate={shouldReduceMotion ? undefined : { x: ["-3%", "3%", "-3%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            viewBox="0 0 1200 260"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -left-[4%] top-0 z-[13] h-[34%] w-[108%] opacity-80"
            aria-hidden="true"
          >
            <defs><filter id="depth-boundary-blur" x="-8%" y="-35%" width="116%" height="170%"><feGaussianBlur stdDeviation="10" /></filter></defs>
            <path d="M0 80C119 11 216 151 341 79C468 8 562 152 688 73C817 -8 912 145 1042 66C1111 25 1162 50 1200 37" fill="none" stroke="rgba(206,255,251,.52)" strokeWidth="26" filter="url(#depth-boundary-blur)" />
            <path d="M0 80C119 11 216 151 341 79C468 8 562 152 688 73C817 -8 912 145 1042 66C1111 25 1162 50 1200 37" fill="none" stroke="rgba(228,255,252,.72)" strokeWidth="3" />
            <path d="M0 130C105 68 215 178 350 119C482 59 581 176 716 111C851 44 947 160 1063 101C1120 73 1173 90 1200 80" fill="none" stroke="rgba(175,244,240,.34)" strokeWidth="8" />
          </motion.svg>
          <motion.div style={{ opacity: lightOpacity }} className="pointer-events-none absolute inset-0 z-[1]">
            <div className="absolute -top-[8%] left-[5%] h-[105%] w-[28%] origin-top -rotate-[9deg] bg-[linear-gradient(180deg,rgba(237,255,251,.55),rgba(152,242,238,.08)_72%,transparent)] blur-xl [clip-path:polygon(28%_0,72%_0,100%_100%,0_100%)]" />
            <div className="absolute -top-[8%] left-[36%] h-[92%] w-[18%] origin-top rotate-[7deg] bg-[linear-gradient(180deg,rgba(255,255,255,.4),rgba(179,249,244,.04)_76%,transparent)] blur-2xl [clip-path:polygon(35%_0,66%_0,100%_100%,0_100%)]" />
            <div className="absolute -top-[8%] right-[8%] h-[110%] w-[30%] origin-top rotate-[12deg] bg-[linear-gradient(180deg,rgba(223,255,252,.42),rgba(126,224,224,.03)_70%,transparent)] blur-2xl [clip-path:polygon(40%_0,68%_0,100%_100%,0_100%)]" />
          </motion.div>

          <motion.div
            style={{ y: surfaceY, scale: surfaceScale, opacity: surfaceOpacity }}
            className="pointer-events-none absolute inset-x-[-12%] top-[-2%] z-20 h-[52%]"
          >
            <motion.svg
              animate={shouldReduceMotion ? undefined : { x: ["-4%", "4%", "-4%"] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              viewBox="0 0 1200 130"
              preserveAspectRatio="none"
              className="absolute inset-x-0 top-0 h-28 w-full"
              aria-hidden="true"
            >
              <path
                d="M0 58C117 4 214 104 336 53C468 -2 563 105 704 48C858 -14 994 109 1200 39V130H0Z"
                fill="rgba(211,249,241,.74)"
              />
              <path
                d="M0 77C151 28 221 119 383 69C538 21 671 115 815 66C942 23 1040 95 1200 58"
                fill="none"
                stroke="rgba(255,255,255,.9)"
                strokeWidth="3"
              />
            </motion.svg>
            <div className="absolute inset-x-0 top-24 h-full bg-[linear-gradient(180deg,rgba(203,246,236,.32),transparent)]" />
          </motion.div>

          <motion.div
            style={{ opacity: diveIntroOpacity }}
            className="absolute inset-0 z-30 flex items-center justify-center px-5 text-center text-[#064d61]"
          >
            <div className="-mt-8">
              <p className="text-[10px] font-black tracking-[0.34em]">SCROLL TO DIVE / ABOUT OOI WATER</p>
              <h2 className="mt-7 font-[family-name:var(--font-noto-serif-jp)] text-[clamp(3.8rem,10vw,10rem)] font-bold leading-none tracking-[-0.07em]">
                水の中へ。
              </h2>
              <p className="mx-auto mt-7 max-w-md text-xs font-medium leading-7 text-[#0a6675]/72 sm:text-sm sm:leading-8">
                水面の下に広がる、静かな循環。スクロールして、大井の水を支える地域のつながりへ。
              </p>
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto mt-10 flex w-fit flex-col items-center gap-2 text-[9px] font-black tracking-[0.25em]"
              >
                DIVE
                <ArrowDown className="h-4 w-4" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: aquariumOpacity }} className="pointer-events-none absolute inset-0 z-[2]">
            <DiveBubbles count={32} />

            <AquariumFish top="28%" delay={0} duration={19} size={105} />
            <AquariumFish top="56%" delay={5} duration={26} size={72} reverse />
            <AquariumFish top="72%" delay={10} duration={22} size={88} />
          </motion.div>

          <motion.div
            style={{ scale: mapScale, rotate: mapRotate, y: mapY, opacity: mapOpacity }}
            className="absolute inset-0 z-[5] flex items-center justify-center"
          >
            <svg viewBox="0 0 1000 700" className="h-[112%] w-[112%]" aria-hidden="true">
              <motion.path
                d="M-30 540 C 110 440, 145 590, 280 470 S 500 250, 630 330 S 830 510, 1040 120"
                fill="none"
                stroke="rgba(155,246,246,.72)"
                strokeWidth="2.5"
                strokeDasharray="8 12"
                style={{ pathLength: mapDraw }}
              />
              <motion.path
                d="M60 -20 C 170 120, 320 55, 400 190 S 430 440, 620 510 S 800 580, 1030 650"
                fill="none"
                stroke="rgba(211,255,251,.48)"
                strokeWidth="1.5"
                style={{ pathLength: mapDraw }}
              />
              <motion.path
                d="M860 -30 C 780 130, 895 230, 730 350 S 510 520, 540 740"
                fill="none"
                stroke="rgba(104,227,231,.34)"
                strokeWidth="1.5"
                style={{ pathLength: mapDraw }}
              />
            </svg>

            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -11, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[8%] top-[28%] grid h-[150px] w-[170px] place-items-center rounded-[50%] border border-cyan-100/35 bg-cyan-50/10 text-white shadow-[inset_0_0_55px_rgba(137,240,238,.12),0_25px_70px_rgba(0,36,69,.18)] backdrop-blur-md sm:left-[30%] sm:top-[44%] sm:h-[200px] sm:w-[230px]"
            >
              <span className="text-center">
                <span className="block text-[9px] font-black tracking-[0.22em] text-cyan-100 sm:text-[11px]">SHIMADA</span>
                <span className="mt-2 block font-[family-name:var(--font-noto-serif-jp)] text-xl font-bold sm:text-3xl">島田市</span>
              </span>
            </motion.div>
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, 13, 0], rotate: [1, -1.5, 1] }}
              transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[-10%] top-[40%] grid h-[150px] w-[175px] place-items-center rounded-[48%] border border-cyan-100/35 bg-[#42c7cf]/12 text-white shadow-[inset_0_0_65px_rgba(157,242,239,.1),0_25px_70px_rgba(0,36,69,.18)] backdrop-blur-md sm:right-[11%] sm:top-[36%] sm:h-[290px] sm:w-[340px]"
            >
              <span className="text-center">
                <span className="block text-[9px] font-black tracking-[0.22em] text-cyan-100 sm:text-[11px]">MAKINOHARA</span>
                <span className="mt-2 block font-[family-name:var(--font-noto-serif-jp)] text-xl font-bold sm:text-3xl">牧之原市</span>
              </span>
            </motion.div>
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], rotate: [-1.5, 1, -1.5] }}
              transition={{ duration: 7.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[18%] left-[58%] grid h-[110px] w-[130px] place-items-center rounded-[48%] border border-cyan-100/35 bg-[#8bd4cc]/10 text-white shadow-[inset_0_0_45px_rgba(182,255,245,.1),0_25px_70px_rgba(0,36,69,.18)] backdrop-blur-md sm:bottom-[8%] sm:left-[36%] sm:h-[220px] sm:w-[255px]"
            >
              <span className="text-center">
                <span className="block text-[9px] font-black tracking-[0.22em] text-cyan-100 sm:text-[11px]">KIKUGAWA</span>
                <span className="mt-2 block font-[family-name:var(--font-noto-serif-jp)] text-xl font-bold sm:text-3xl">菊川市</span>
              </span>
            </motion.div>

            <motion.div
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], y: [0, -7, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-[47%] h-[122px] w-[94px] -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_0_35px_rgba(127,246,249,.62)] sm:h-[164px] sm:w-[126px]"
            >
              <svg viewBox="0 0 120 164" className="h-full w-full" aria-hidden="true">
                <path
                  d="M60 3S8 68 8 113C8 143 30 161 60 161C90 161 112 143 112 113C112 68 60 3 60 3Z"
                  fill="rgba(22,163,191,.82)"
                  stroke="rgba(215,255,255,.9)"
                  strokeWidth="1.5"
                />
                <path d="M36 49C25 77 24 115 45 137" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="5" />
              </svg>
              <span className="absolute inset-0 grid place-items-center pt-9 text-center">
                <span>
                  <Droplets className="mx-auto h-5 w-5 sm:h-7 sm:w-7" />
                  <span className="mt-2 block text-[8px] font-black tracking-[0.18em] sm:text-[10px]">OOI WATER</span>
                </span>
              </span>
            </motion.div>
          </motion.div>

          <motion.svg
            style={{ opacity: aquariumOpacity }}
            viewBox="0 0 1440 260"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[28%] w-full text-[#021b37]/68"
            aria-hidden="true"
          >
            <path d="M0 210C180 148 329 240 481 195C650 144 789 235 961 181C1102 137 1271 213 1440 163V260H0Z" fill="currentColor" />
            <path d="M95 226C88 153 113 115 126 66C142 126 119 169 126 226M179 231C165 174 172 136 151 92C196 129 203 176 190 231M1230 218C1208 161 1228 117 1215 71C1253 118 1262 170 1244 221M1310 228C1295 175 1319 145 1341 101C1346 160 1328 189 1325 230" fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" />
          </motion.svg>

          <motion.div style={{ opacity: networkTitleOpacity }} className="absolute left-6 top-24 z-10 sm:left-10 sm:top-28 lg:left-[7%]">
            <p className="text-[10px] font-black tracking-[0.28em] text-cyan-100">WATER MAP / DEPTH 18M</p>
            <h2 className="mt-5 font-[family-name:var(--font-noto-serif-jp)] text-[clamp(2.8rem,6.8vw,7rem)] font-bold leading-[1.08] tracking-[-0.065em] text-white">
              水のめぐりを、
              <br />
              可視化する。
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: networkCopyOpacity }}
            className="absolute bottom-12 left-5 right-5 z-10 max-w-none sm:bottom-16 sm:left-auto sm:right-10 sm:max-w-lg lg:right-[7%]"
          >
            <p className="font-[family-name:var(--font-noto-serif-jp)] text-2xl font-bold leading-[1.55] text-white sm:text-4xl">
              3つの地域を、
              <br />
              ひとつの水で結ぶ。
            </p>
            <p className="mt-5 max-w-sm text-xs font-medium leading-7 text-cyan-50/64 sm:text-sm">
              島田市、牧之原市、菊川市の一部へ。地域の境界を越えて、安全で良質な水を安定して届けます。
            </p>
          </motion.div>

          <div className="absolute bottom-8 right-5 top-28 z-40 hidden w-px bg-white/18 lg:block">
            <motion.div style={{ height: depthLine }} className="w-px bg-cyan-100" />
            <span className="absolute -left-16 top-0 text-[8px] font-black tracking-[0.2em] text-white/55">00M</span>
            <span className="absolute -bottom-1 -left-16 text-[8px] font-black tracking-[0.2em] text-cyan-100">24M</span>
          </div>
        </motion.div>
      </section>

      <section id="promise" className="relative overflow-clip bg-[#061f3b] text-white">
        <div className="relative flex min-h-screen items-center overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
          <UnderwaterCurrent fish className="opacity-60" />
          <motion.div
            animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-0 top-8 flex w-max whitespace-nowrap"
          >
            {[0, 1].map((copy) => (
              <p
                key={copy}
                className="pr-20 font-[family-name:var(--font-noto-serif-jp)] text-[clamp(4rem,10vw,10rem)] font-bold leading-none tracking-[-0.07em] text-white/[0.045]"
              >
                守る。つなぐ。めぐらせる。—&nbsp;
              </p>
            ))}
          </motion.div>

          <div className="relative mx-auto grid w-full max-w-[1500px] gap-12 lg:grid-cols-[0.42fr_1.58fr] lg:items-end">
            <Reveal>
              <p className="text-[11px] font-black tracking-[0.3em] text-cyan-200">OUR PROMISE</p>
              <div className="mt-5 h-px w-16 bg-cyan-200" />
              <p className="mt-10 max-w-xs text-xs font-medium leading-7 text-white/45">
                日常の当たり前を、明日も変わらず届けるために。3つの視点で水道の未来を守ります。
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mb-5 text-[10px] font-black tracking-[0.22em] text-white/40">01 — 03 / SCROLL STORY</p>
              <h2 className="font-[family-name:var(--font-noto-serif-jp)] text-[clamp(3.3rem,8vw,9rem)] font-bold leading-[1.08] tracking-[-0.065em]">
                水道を守る、
                <br />
                <span className="text-cyan-100">3つの約束。</span>
              </h2>
            </Reveal>
          </div>

          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, 12, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[9px] font-black tracking-[0.25em] text-white/42"
          >
            DISCOVER
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </div>

        {promises.map((item, index) => (
          <PromiseScene key={item.index} item={item} position={index} />
        ))}
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#052b4c_0%,#03233f_45%,#021a34_100%)] py-24 text-white sm:py-32 lg:py-40">
        <UnderwaterCurrent fish className="opacity-70" />
        <div className="pointer-events-none absolute inset-0 opacity-35">
          <motion.div
            animate={shouldReduceMotion ? undefined : { x: ["-8%", "8%", "-8%"], rotate: [-3, 3, -3] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-[18%] -top-[45%] h-[900px] w-[900px] rounded-[48%] border border-cyan-100/20"
          />
          <div className="absolute -left-[10%] bottom-[-30%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12">
          <Reveal className="grid gap-10 lg:grid-cols-[0.43fr_1.57fr] lg:items-end">
            <div>
              <p className="text-[11px] font-black tracking-[0.3em] text-cyan-200">QUICK ACCESS / DEPTH 32M</p>
              <div className="mt-5 h-px w-16 bg-cyan-200" />
              <p className="mt-9 max-w-xs text-xs font-medium leading-7 text-white/48">
                手続き、料金、緊急情報。目的から選ぶだけで、必要なページへすぐに進めます。
              </p>
            </div>
            <h2 className="font-[family-name:var(--font-noto-serif-jp)] text-[clamp(3rem,6.5vw,7.5rem)] font-bold leading-[1.12] tracking-[-0.06em]">
              水との暮らしを、
              <br />
              <span className="text-cyan-100">迷わず動かす。</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid overflow-hidden border border-white/14 bg-white/[0.025] backdrop-blur-sm sm:mt-24 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/14 md:odd:border-r xl:border-b-0 xl:border-r xl:last:border-r-0"
                >
                  <Link
                    href={service.href}
                    className="group relative flex min-h-[470px] flex-col justify-between overflow-hidden p-7 outline-none sm:min-h-[540px] sm:p-9"
                  >
                    <div
                      className="absolute inset-x-0 bottom-0 h-8 transition-[height] duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:h-full group-focus-visible:h-full"
                      style={{ backgroundColor: service.tone }}
                    >
                      <motion.svg
                        animate={shouldReduceMotion ? undefined : { x: ["-18%", "0%", "-18%"] }}
                        transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                        viewBox="0 0 600 90"
                        preserveAspectRatio="none"
                        className="absolute -left-[22%] top-[-54px] h-14 w-[150%]"
                        aria-hidden="true"
                      >
                        <path
                          d="M0 58C75 8 137 82 212 42C296 -3 357 87 442 42C506 8 549 24 600 46V90H0Z"
                          fill={service.tone}
                        />
                      </motion.svg>
                    </div>

                    {[0, 1, 2].map((bubble) => (
                      <motion.span
                        key={bubble}
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: [30, -300 - bubble * 45],
                                opacity: [0, 0.42, 0],
                                scale: [0.7, 1, 0.78],
                              }
                        }
                        transition={{
                          duration: 5.5 + bubble,
                          delay: index * 0.5 + bubble * 1.4,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                        className="pointer-events-none absolute bottom-5 z-10 rounded-full border border-white/50 opacity-0"
                        style={{
                          left: `${24 + bubble * 21}%`,
                          width: `${8 + bubble * 5}px`,
                          height: `${8 + bubble * 5}px`,
                        }}
                      />
                    ))}

                    <div className="relative z-20 flex items-start justify-between transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                      <span className="text-xs font-black tracking-[0.22em] text-cyan-200/70 transition-colors duration-500 group-hover:text-cyan-100 group-focus-visible:text-cyan-100">
                        {service.index}
                      </span>
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-cyan-100/25 text-cyan-200 transition-all duration-500 group-hover:rotate-12 group-hover:border-white/45 group-hover:text-white group-focus-visible:border-white/45 group-focus-visible:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <p className="relative z-20 -ml-1 font-[family-name:var(--font-noto-serif-jp)] text-[clamp(4.6rem,7vw,7.8rem)] font-bold leading-none tracking-[-0.09em] text-white/[0.045] transition-all duration-700 group-hover:-translate-y-4 group-hover:text-white/10 group-focus-visible:text-white/10">
                      {service.action}
                    </p>

                    <div className="relative z-20 transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                      <p className="text-[9px] font-black tracking-[0.25em] text-cyan-200 transition-colors duration-500 group-hover:text-cyan-100 group-focus-visible:text-cyan-100">
                        {service.english}
                      </p>
                      <h3 className="mt-3 text-xl font-bold leading-snug sm:text-2xl">{service.label}</h3>
                      <p className="mt-2 text-xs text-white/44 transition-colors duration-500 group-hover:text-white/65 group-focus-visible:text-white/65">
                        {service.note}
                      </p>
                      <div className="mt-7 flex items-center justify-between border-t border-white/14 pt-5 transition-colors duration-500 group-hover:border-white/25 group-focus-visible:border-white/25">
                        <span className="text-[9px] font-black tracking-[0.18em]">OPEN SERVICE</span>
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#021a34_0%,#02152b_100%)] py-24 text-white sm:py-32 lg:py-40">
        <UnderwaterCurrent fish className="opacity-70" />
        <DiveBubbles count={22} className="opacity-70" />
        <div className="absolute inset-0 opacity-55">
          <div className="absolute -right-[8%] -top-[40%] h-[780px] w-[780px] rounded-[48%] border border-cyan-100/12" />
          <div className="absolute -right-[2%] -top-[28%] h-[600px] w-[600px] rounded-[48%] border border-cyan-100/10" />
          <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-cyan-400/[0.055] blur-[90px]" />
          <motion.div
            animate={shouldReduceMotion ? undefined : { x: ["-14%", "14%", "-14%"], y: ["-4%", "7%", "-4%"], opacity: [0.12, 0.35, 0.12] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-[16%] top-[5%] h-[86%] w-[42%] origin-top rotate-[18deg] bg-[linear-gradient(180deg,rgba(216,255,255,.25),transparent_74%)] blur-2xl [clip-path:polygon(48%_0,74%_0,100%_100%,0_100%)]"
          />
        </div>
        <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-12">
          <Reveal>
            <p className="text-[11px] font-black tracking-[0.28em] text-cyan-200">WATER QUALITY / DEPTH 40M</p>
            <h2 className="mt-6 font-[family-name:var(--font-noto-serif-jp)] text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[1.25] tracking-[-0.05em]">
              安心は、
              <br />
              <span className="text-cyan-100">数字で確かめる。</span>
            </h2>
            <p className="mt-8 max-w-xl text-sm font-medium leading-8 text-white/52 sm:text-base sm:leading-9">
              毎日届ける水だからこそ、感覚ではなく検査とデータで安全を確認します。水質検査の結果を公開し、透明性のある情報発信を続けます。
            </p>
          </Reveal>
          <Reveal delay={0.12} className="grid grid-cols-2 gap-3">
            <Link href="/resident/quality" className="group min-h-[240px] border border-white/12 bg-white/[0.045] p-6 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-white/[0.09] sm:min-h-[280px] sm:p-8">
              <FlaskConical className="h-7 w-7 text-cyan-200" />
              <span className="mt-20 block text-xl font-bold">水質情報</span>
              <span className="mt-2 block text-xs text-white/42">検査結果を確認</span>
              <ArrowUpRight className="ml-auto mt-5 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
            <Link href="/resident/downloads" className="group min-h-[240px] border border-white/12 bg-white/[0.045] p-6 backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-white/[0.09] sm:min-h-[280px] sm:p-8">
              <FileText className="h-7 w-7 text-cyan-200" />
              <span className="mt-20 block text-xl font-bold">資料・申請書</span>
              <span className="mt-2 block text-xs text-white/42">各種書類を確認</span>
              <ArrowUpRight className="ml-auto mt-5 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="news" className="relative overflow-hidden bg-[linear-gradient(180deg,#02152b_0%,#031426_100%)] py-24 text-white sm:py-32 lg:py-40">
        <UnderwaterCurrent fish className="opacity-45" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <Reveal className="flex items-end justify-between gap-8">
            <div>
              <p className="text-[11px] font-black tracking-[0.28em] text-cyan-200">CURRENT NEWS / DEPTH 46M</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">NEWS FLOW</h2>
            </div>
            <Link href="/news" className="group hidden items-center gap-3 text-xs font-black tracking-[0.12em] sm:flex">
              VIEW ALL
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-14 border-t border-white/14">
            {announcements.length > 0 ? (
              announcements.map((item) => (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={item.url}
                  className="group grid gap-3 border-b border-white/12 py-8 transition-all hover:border-cyan-200/50 hover:bg-white/[0.025] sm:grid-cols-[150px_1fr_auto] sm:items-center sm:gap-7 sm:px-4"
                >
                  <span className="flex items-center gap-2 text-xs font-medium text-white/42">
                    <CalendarDays className="h-4 w-4 text-cyan-200" />
                    {new Date(item.date).toLocaleDateString("ja-JP")}
                  </span>
                  <span className="text-sm font-bold leading-7 transition-colors group-hover:text-cyan-100 sm:text-base">{item.title}</span>
                  <ArrowUpRight className="hidden h-5 w-5 text-white/25 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-100 sm:block" />
                </Link>
              ))
            ) : (
              <div className="border-b border-white/12 py-10 text-sm text-white/45">現在、新しいお知らせはありません。</div>
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-[linear-gradient(180deg,#031426_0%,#01101e_100%)] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <UnderwaterCurrent className="opacity-30" />
        <SkeletonFish key="skeleton-mobile-primary" top="59%" delay={0} duration={31} size={68} flip className="sm:hidden" />
        <SkeletonFish key="skeleton-mobile-secondary" top="77%" delay={5} duration={23} size={48} reverse className="sm:hidden" />
        <SkeletonFish key="skeleton-desktop-primary" top="19%" delay={0} duration={31} size={92} flip className="hidden sm:block" />
        <SkeletonFish key="skeleton-desktop-secondary" top="49%" delay={6} duration={24} size={64} reverse className="hidden sm:block" />
        <Sparkles className="absolute -right-20 -top-20 h-72 w-72 text-cyan-100/5" strokeWidth={0.4} />
        <div className="relative mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <p className="text-[11px] font-black tracking-[0.28em] text-cyan-200">CONTACT / SEA FLOOR</p>
            <h2 className="mt-6 font-[family-name:var(--font-noto-serif-jp)] text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.35]">
              水道に関する
              <br />
              ご相談・お問い合わせ
            </h2>
            <p className="mt-6 text-sm leading-8 text-white/60">ご不明な点がありましたら、お気軽にお問い合わせください。</p>
          </Reveal>
          <Reveal delay={0.12}>
            <a href="tel:0547-46-4130" className="group flex items-center justify-between border-y border-white/25 py-7">
              <span className="flex items-center gap-5">
                <Phone className="h-7 w-7 text-cyan-200" />
                <span>
                  <span className="block text-[10px] font-bold tracking-[0.12em] text-white/50">平日 8:30〜17:15</span>
                  <span className="mt-2 block text-2xl font-black tracking-[0.05em] sm:text-3xl">0547-46-4130</span>
                </span>
              </span>
              <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
