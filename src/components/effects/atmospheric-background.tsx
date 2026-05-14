"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { usePortfolioParallax } from "@/hooks/use-parallax";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { ParallaxLayer } from "./parallax-layer";

const DEPTH_MOTES = [11, 23, 41, 58, 72, 18, 86, 34, 65, 9, 52, 77] as const;

/**
 * Layered cinematic environment (scroll + subtle pointer drift).
 * L1 far wash · L2 ribbon/terrain · L3 texture/fog · L4 micro-motes + film treatments.
 */
export function AtmosphericBackground() {
  const reduceMotion = useReducedMotion();
  const { yFar, yMid, yFore, ribbonY, xFar, xMid, glowX, glowY } =
    usePortfolioParallax();
  const { x: mx, y: my } = useMousePosition(6);

  const farLayerX = useTransform([xFar, mx], ([xf, px]) => Number(xf) + Number(px) * 0.32);
  const farLayerY = useTransform([yFar, my], ([yf, py]) => Number(yf) + Number(py) * 0.38);

  const midLayerX = useTransform([xMid, mx], ([xm, px]) => Number(xm) + Number(px) * 0.22);
  const midLayerY = useTransform([yMid, my], ([ym, py]) => Number(ym) + Number(py) * 0.28);

  const foreLayerY = useTransform([yFore, my], ([yf, py]) => Number(yf) + Number(py) * 0.18);

  const ribbonLayerX = useTransform(mx, (v) => Number(v) * 0.12);
  const ribbonLayerY = useTransform([ribbonY, my], ([yr, py]) => Number(yr) + Number(py) * 0.15);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(168deg, #122220 0%, #0e1a24 38%, #0a1214 100%)",
          }}
        />

        <motion.div
          className="absolute inset-0 opacity-[0.55]"
          style={{ x: glowX, y: glowY, willChange: "transform" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 75% at 50% -8%, rgba(245, 240, 220, 0.055), transparent 48%), radial-gradient(ellipse 90% 55% at 85% 18%, rgba(185, 28, 28, 0.045), transparent 52%), radial-gradient(ellipse 70% 50% at 12% 35%, rgba(14, 116, 144, 0.06), transparent 55%)",
            }}
          />
        </motion.div>

        <div className="portfolio-film-grain absolute inset-0 mix-blend-overlay" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 72% 62% at 50% 50%, transparent 40%, rgba(2, 8, 10, 0.55) 100%)",
          }}
        />

        {!reduceMotion ? (
          <ParallaxLayer
            className="absolute inset-[-30%] overflow-hidden will-change-transform"
            x={farLayerX}
            y={farLayerY}
          >
            <div
              className="depth-aurora-a absolute -left-[20%] top-[-15%] h-[85%] w-[75%] rounded-full opacity-90"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(34, 197, 94, 0.22), rgba(14, 165, 233, 0.12) 45%, transparent 72%)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="depth-aurora-b absolute -right-[18%] bottom-[-20%] h-[90%] w-[70%] rounded-full opacity-85"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(56, 189, 248, 0.2), rgba(45, 212, 191, 0.1) 48%, transparent 72%)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 130% 90% at 40% -5%, rgba(56, 189, 248, 0.18), transparent 58%), radial-gradient(ellipse 100% 70% at 95% 35%, rgba(34, 197, 94, 0.14), transparent 52%), radial-gradient(ellipse 85% 60% at 5% 75%, rgba(244, 63, 94, 0.08), transparent 50%)",
              }}
            />
          </ParallaxLayer>
        ) : (
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(34, 197, 94, 0.08), transparent 55%), radial-gradient(ellipse 80% 60% at 100% 40%, rgba(56, 189, 248, 0.06), transparent 50%)",
            }}
          />
        )}

        <ParallaxLayer
          className="absolute inset-[-15%] will-change-transform"
          x={ribbonLayerX}
          y={ribbonLayerY}
        >
          <div
            className="absolute inset-x-[-15%] top-[18%] h-[42%] opacity-[0.16] depth-ribbon-drift"
            style={{
              background:
                "radial-gradient(ellipse 55% 38% at 50% 50%, rgba(212, 196, 168, 0.38), rgba(180, 160, 130, 0.14) 42%, transparent 68%)",
              filter: "blur(1px)",
            }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          className="absolute inset-[-14%] will-change-transform"
          x={midLayerX}
          y={midLayerY}
        >
          <div
            className="absolute inset-0 opacity-[0.085]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-11deg, transparent, transparent 16px, rgba(228,228,231,0.09) 16px, rgba(228,228,231,0.09) 17px), repeating-linear-gradient(79deg, transparent, transparent 20px, rgba(161,161,170,0.07) 20px, rgba(161,161,170,0.07) 21px)",
              maskImage:
                "radial-gradient(ellipse 88% 72% at 50% 52%, black 22%, transparent 74%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[38%] opacity-[0.12]"
            style={{
              background:
                "linear-gradient(to top, rgba(6, 14, 16, 0.75) 0%, transparent 62%), radial-gradient(ellipse 58% 42% at 22% 100%, rgba(22, 78, 52, 0.35), transparent 68%)",
            }}
          />
          {!reduceMotion ? (
            <div
              className="atm-env-grass pointer-events-none absolute inset-x-[-10%] bottom-[-4%] h-[22%] opacity-[0.14]"
              aria-hidden
            />
          ) : null}
        </ParallaxLayer>

        <ParallaxLayer
          className="absolute inset-[-10%] will-change-transform"
          y={foreLayerY}
        >
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage:
                "radial-gradient(ellipse 95% 80% at 50% 45%, black 18%, transparent 78%)",
            }}
          />
          {!reduceMotion ? (
            <>
              <div className="atm-env-scan pointer-events-none absolute inset-0 opacity-[0.06]" />
              <div className="atm-env-haze pointer-events-none absolute inset-[8%] rounded-[40%] opacity-[0.07]" />
            </>
          ) : null}
          {!reduceMotion
            ? DEPTH_MOTES.map((pct, i) => (
                <span
                  key={i}
                  className="depth-depth-mote particle-float absolute h-1 w-1 rounded-full bg-cyan-200/35 shadow-[0_0_10px_rgba(165,243,252,0.45)]"
                  style={{
                    left: `${pct}%`,
                    bottom: `${(i * 7) % 35}%`,
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: `${10 + (i % 5)}s`,
                  }}
                />
              ))
            : null}
        </ParallaxLayer>

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 82% 58% at 50% 14%, transparent 38%, rgba(8, 16, 18, 0.5) 100%), radial-gradient(ellipse 95% 55% at 50% 100%, transparent 42%, rgba(6, 12, 14, 0.42) 100%), linear-gradient(to bottom, rgba(8, 14, 16, 0.32), transparent 20%, transparent 78%, rgba(6, 12, 14, 0.36))",
          }}
        />
      </div>
    </>
  );
}
