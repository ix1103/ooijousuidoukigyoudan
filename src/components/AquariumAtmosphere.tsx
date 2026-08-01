"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AquariumAtmosphereProps = {
  density?: number;
  depthMax?: number;
  showDepthHud?: boolean;
  tone?: "surface" | "deep";
};

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  phase: number;
  alpha: number;
};

const pseudo = (index: number, seed: number) => {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

function ParticleCanvas({ density, tone }: { density: number; tone: "surface" | "deep" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let scrollTarget = 0;
    let scrollDepth = 0;
    let pointerX = -1000;
    let pointerY = -1000;
    let pointerActive = false;
    let particles: Particle[] = [];

    const makeParticles = () =>
      Array.from({ length: density }, (_, index) => ({
        x: pseudo(index, 1) * width,
        y: pseudo(index, 2) * height,
        radius: 0.55 + pseudo(index, 3) * 2.15,
        speed: 0.09 + pseudo(index, 4) * 0.32,
        drift: 7 + pseudo(index, 5) * 32,
        phase: pseudo(index, 6) * Math.PI * 2,
        alpha: 0.12 + pseudo(index, 7) * 0.38,
      }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.55);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = makeParticles();
    };

    const updateScroll = () => {
      const available = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollTarget = Math.min(window.scrollY / available, 1);
    };

    const updatePointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = event.pointerType === "mouse";
    };

    const leavePointer = () => {
      pointerActive = false;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      scrollDepth += (scrollTarget - scrollDepth) * 0.055;
      const seconds = time * 0.001;

      context.globalCompositeOperation = "screen";

      for (const particle of particles) {
        const currentStrength = 0.55 + scrollDepth * 1.2;
        const x = particle.x + Math.sin(seconds * 0.34 + particle.phase) * particle.drift;
        const travel = (seconds * particle.speed * 28 * currentStrength) % (height + 80);
        const y = (particle.y - travel + height + 40) % (height + 80) - 40;
        const pulse = 0.6 + Math.sin(seconds * 1.2 + particle.phase) * 0.4;
        const alpha = particle.alpha * pulse * (tone === "surface" ? 0.72 : 1);

        context.beginPath();
        context.arc(x, y, particle.radius * (0.8 + scrollDepth * 0.45), 0, Math.PI * 2);
        context.fillStyle = `rgba(${tone === "surface" ? "205,253,255" : "126,229,245"},${alpha})`;
        context.fill();
      }

      if (pointerActive && width > 760) {
        const glow = context.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, 170);
        glow.addColorStop(0, "rgba(214,255,255,.1)");
        glow.addColorStop(0.45, "rgba(83,222,235,.035)");
        glow.addColorStop(1, "rgba(83,222,235,0)");
        context.fillStyle = glow;
        context.fillRect(pointerX - 170, pointerY - 170, 340, 340);
      }

      context.globalCompositeOperation = "source-over";
      if (!reduced) frame = window.requestAnimationFrame(draw);
    };

    resize();
    updateScroll();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", leavePointer);

    if (reduced) draw(0);
    else frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", leavePointer);
    };
  }, [density, reduced, tone]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

function DepthHud({ depthMax }: { depthMax: number }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: reduced ? 1000 : 95,
    damping: reduced ? 1000 : 28,
    mass: 0.25,
  });
  const markerY = useTransform(progress, [0, 1], [0, 156]);
  const lineScale = useTransform(progress, [0, 1], [0.02, 1]);
  const [depth, setDepth] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    const nextDepth = Math.round(latest * depthMax);
    setDepth((current) => (current === nextDepth ? current : nextDepth));
  });

  return (
    <div className="pointer-events-none fixed bottom-8 left-6 z-[90] hidden items-end gap-3 text-white mix-blend-difference lg:flex" aria-hidden="true">
      <div className="relative h-40 w-px bg-white/18">
        <motion.span style={{ scaleY: lineScale, transformOrigin: "top" }} className="absolute inset-0 bg-cyan-100/80" />
        <motion.span style={{ y: markerY }} className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-white shadow-[0_0_14px_rgba(194,255,255,.95)]" />
      </div>
      <div className="pb-0.5">
        <span className="block text-[7px] font-black tracking-[0.28em] text-white/55">CURRENT DEPTH</span>
        <span className="mt-1 block font-mono text-[12px] font-bold tracking-[0.18em]">{String(depth).padStart(2, "0")}M</span>
      </div>
    </div>
  );
}

export function AquariumAtmosphere({
  density = 42,
  depthMax = 60,
  showDepthHud = false,
  tone = "deep",
}: AquariumAtmosphereProps) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const causticY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const causticOpacity = useTransform(scrollYProgress, [0, 0.3, 1], tone === "surface" ? [0.22, 0.12, 0.04] : [0.12, 0.07, 0.025]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[45] overflow-hidden" aria-hidden="true">
        <ParticleCanvas density={density} tone={tone} />
        <motion.div
          style={{ y: causticY, opacity: causticOpacity }}
          animate={reduced ? undefined : { backgroundPosition: ["0% 0%", "100% 55%", "0% 0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="aquarium-caustics absolute -inset-[20%] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-16%,rgba(197,255,255,.1),transparent_46%)] mix-blend-screen" />
      </div>
      {showDepthHud && <DepthHud depthMax={depthMax} />}
    </>
  );
}

export function BubbleVortex({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: 28 }).map((_, index) => {
        const size = 5 + (index % 7) * 3;
        const side = index % 2 === 0 ? 1 : -1;
        return (
          <motion.span
            key={index}
            animate={
              reduced
                ? undefined
                : {
                    y: ["20vh", "-125vh"],
                    x: [0, side * (35 + (index % 5) * 16), side * -18, 0],
                    scale: [0.5, 1.2, 0.75],
                    opacity: [0, 0.72, 0],
                  }
            }
            transition={{
              duration: 6.5 + (index % 8) * 0.75,
              delay: (index % 11) * 0.42,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[-12%] rounded-full border border-white/65 bg-cyan-50/8 shadow-[inset_1px_1px_5px_rgba(255,255,255,.72),0_0_16px_rgba(120,240,255,.2)]"
            style={{ left: `${4 + ((index * 29) % 92)}%`, width: size, height: size }}
          />
        );
      })}
    </div>
  );
}

export function Jellyfish({
  className = "",
  delay = 0,
  duration = 11,
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 180 260"
      animate={reduced ? undefined : { y: [18, -22, 18], x: [-8, 12, -8], rotate: [-2, 2, -2] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute text-cyan-100/28 drop-shadow-[0_0_30px_rgba(130,242,255,.2)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`jelly-${delay}`} cx="50%" cy="18%" r="78%">
          <stop offset="0%" stopColor="rgba(245,255,255,.7)" />
          <stop offset="48%" stopColor="rgba(122,225,241,.2)" />
          <stop offset="100%" stopColor="rgba(53,146,184,.02)" />
        </radialGradient>
      </defs>
      <path d="M30 100C30 35 150 35 150 100C150 126 125 139 90 139C55 139 30 126 30 100Z" fill={`url(#jelly-${delay})`} stroke="currentColor" strokeWidth="1.2" />
      <path d="M36 103C57 84 63 119 89 101C112 84 127 117 146 102" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {[52, 72, 91, 110, 130].map((x, index) => (
        <motion.path
          key={x}
          d={`M${x} 128C${x - 13} 166 ${x + 16} 186 ${x - 5} 236`}
          fill="none"
          stroke="currentColor"
          strokeWidth={index === 2 ? 2 : 1.2}
          animate={reduced ? undefined : { d: [`M${x} 128C${x - 13} 166 ${x + 16} 186 ${x - 5} 236`, `M${x} 128C${x + 14} 164 ${x - 16} 192 ${x + 6} 236`, `M${x} 128C${x - 13} 166 ${x + 16} 186 ${x - 5} 236`] }}
          transition={{ duration: 5.4 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.svg>
  );
}

export function FishShoal({ className = "", reverse = false }: { className?: string; reverse?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 420 180"
      initial={{ x: reverse ? "105vw" : "-45vw" }}
      animate={reduced ? undefined : { x: reverse ? "-48vw" : "108vw", y: [0, -22, 8, 0] }}
      transition={{
        x: { duration: 34, repeat: Infinity, ease: "linear" },
        y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`pointer-events-none absolute text-[#001d38]/42 ${className}`}
      aria-hidden="true"
    >
      <g transform={reverse ? "translate(420 0) scale(-1 1)" : undefined}>
        {Array.from({ length: 18 }).map((_, index) => {
          const column = index % 6;
          const row = Math.floor(index / 6);
          const x = 24 + column * 60 + row * 16;
          const y = 32 + row * 52 + (column % 2) * 13;
          const scale = 0.65 + (index % 4) * 0.1;
          return (
            <g key={index} transform={`translate(${x} ${y}) scale(${scale})`}>
              <path d="M0 0C13-13 35-12 48 0C35 12 13 13 0 1L-15 10L-10 0L-15-10Z" fill="currentColor" />
            </g>
          );
        })}
      </g>
    </motion.svg>
  );
}
