"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

const LERP = 0.09;
const SCROLL_PARALLAX_FACTOR = 0.06;

/**
 * Global depth: scroll-parallax layers + soft cursor spotlight.
 * Updates CSS variables on `#portfolio-main` only — no React re-renders per frame.
 */
export function PortfolioAtmosphere() {
  const reduceMotion = useReducedMotion();
  const mouseTarget = useRef({ x: 0.5, y: 0.35 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.35 });
  const scrollY = useRef(0);
  const rafScroll = useRef<number | null>(null);
  const rafMouse = useRef<number | null>(null);

  const applyScrollVars = useCallback((el: HTMLElement, y: number) => {
    const p = y * SCROLL_PARALLAX_FACTOR;
    el.style.setProperty("--portfolio-parallax", `${p}px`);
    el.style.setProperty("--portfolio-parallax-slow", `${p * 0.45}px`);
    el.style.setProperty("--portfolio-fog-shift", `${y * 0.02}px`);
  }, []);

  const applySpotlight = useCallback((el: HTMLElement) => {
    const { x, y } = mouseCurrent.current;
    const px = `${(x * 100).toFixed(2)}%`;
    const py = `${(y * 100).toFixed(2)}%`;
    el.style.setProperty("--spot-x", px);
    el.style.setProperty("--spot-y", py);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const main = document.getElementById("portfolio-main");
    if (!main || !(main instanceof HTMLElement)) return;

    const onScroll = () => {
      scrollY.current = window.scrollY || 0;
      if (rafScroll.current != null) return;
      rafScroll.current = requestAnimationFrame(() => {
        rafScroll.current = null;
        applyScrollVars(main, scrollY.current);
      });
    };

    applyScrollVars(main, window.scrollY || 0);
    window.addEventListener("scroll", onScroll, { passive: true });

    const tickMouse = () => {
      rafMouse.current = null;
      const tx = mouseTarget.current.x;
      const ty = mouseTarget.current.y;
      const cx = mouseCurrent.current.x;
      const cy = mouseCurrent.current.y;
      const nx = cx + (tx - cx) * LERP;
      const ny = cy + (ty - cy) * LERP;
      mouseCurrent.current = { x: nx, y: ny };
      applySpotlight(main);
      if (
        Math.abs(tx - nx) > 0.0015 ||
        Math.abs(ty - ny) > 0.0015
      ) {
        rafMouse.current = requestAnimationFrame(tickMouse);
      }
    };

    applySpotlight(main);

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mouseTarget.current = {
        x: e.clientX / w,
        y: e.clientY / h,
      };
      if (rafMouse.current == null) {
        rafMouse.current = requestAnimationFrame(tickMouse);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      if (rafScroll.current != null) cancelAnimationFrame(rafScroll.current);
      if (rafMouse.current != null) cancelAnimationFrame(rafMouse.current);
    };
  }, [reduceMotion, applyScrollVars, applySpotlight]);

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(244,63,94,0.06),transparent_50%),radial-gradient(ellipse_70%_50%_at_100%_40%,rgba(14,165,233,0.05),transparent_45%)]" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Fog + vignette — shifts slightly with scroll via CSS var */}
      <div
        className="absolute inset-[-20%] translate-y-[var(--portfolio-fog-shift,0px)] opacity-100 transition-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(244,63,94,0.07), transparent 52%), radial-gradient(ellipse 65% 55% at 100% 35%, rgba(14,165,233,0.06), transparent 48%), radial-gradient(ellipse 55% 45% at 0% 60%, rgba(250,204,21,0.04), transparent 45%), radial-gradient(ellipse 80% 70% at 50% 100%, rgba(0,0,0,0.5), transparent 55%)",
        }}
      />

      {/* Deep grid — moves slower than foreground */}
      <div
        className="absolute inset-[-8%] opacity-[0.055]"
        style={{
          transform: "translate3d(0, var(--portfolio-parallax-slow, 0px), 0)",
          willChange: "transform",
          backgroundImage:
            "linear-gradient(to right, rgb(228 228 231) 1px, transparent 1px), linear-gradient(to bottom, rgb(228 228 231) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Mid grid */}
      <div
        className="absolute inset-[-5%] opacity-[0.04]"
        style={{
          transform: "translate3d(0, var(--portfolio-parallax, 0px), 0)",
          willChange: "transform",
          backgroundImage:
            "linear-gradient(to right, rgb(161 161 170) 1px, transparent 1px), linear-gradient(to bottom, rgb(161 161 170) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Cursor spotlight — soft, large radius */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-[0.14]"
        style={{
          background:
            "radial-gradient(42vw 42vw at var(--spot-x, 50%) var(--spot-y, 40%), rgba(255,255,255,0.09), transparent 68%)",
        }}
      />

      {/* Drifting particles — GPU transforms only */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLE_SEEDS.map((p, i) => (
          <span
            key={i}
            className="portfolio-particle absolute h-px w-px rounded-full bg-zinc-400/35 shadow-[0_0_6px_rgba(255,255,255,0.25)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.d}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const PARTICLE_SEEDS = [
  { x: 12, y: 18, d: 38, delay: 0 },
  { x: 78, y: 12, d: 44, delay: 2 },
  { x: 55, y: 42, d: 36, delay: 1 },
  { x: 22, y: 68, d: 42, delay: 3 },
  { x: 88, y: 58, d: 40, delay: 0.5 },
  { x: 40, y: 28, d: 46, delay: 2.5 },
  { x: 65, y: 82, d: 39, delay: 1.2 },
  { x: 8, y: 45, d: 41, delay: 4 },
];
