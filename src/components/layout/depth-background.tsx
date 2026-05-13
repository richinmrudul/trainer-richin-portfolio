"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMouseDepth } from "@/hooks/use-mouse-depth";

const DEPTH_MOTES = [11, 23, 41, 58, 72, 18, 86, 34, 65, 9, 52, 77] as const;

/**
 * Layered route atmosphere: CSS-drift auroras, scroll parallax, ribbon, tiles,
 * drifting motes. Cursor spotlight is a fixed layer (CSS vars from useMouseDepth).
 */
export function DepthBackground() {
  const reduceMotion = useReducedMotion();
  /** Subscribes global mouse + drives `--portfolio-spot-*` on #portfolio-main */
  useMouseDepth(8);

  const { scrollYProgress } = useScroll();

  const yFar = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -120],
  );
  const yMid = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -220],
  );
  const yFore = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -320],
  );
  const ribbonY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [60, -160],
  );

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        {/* Base wash — not pure black */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(168deg, #0f1f1c 0%, #0b1620 42%, #070f12 100%)",
          }}
        />

        {/* Layer 1 — large drifting auroras (CSS) */}
        {!reduceMotion ? (
          <div className="absolute inset-[-30%] overflow-hidden">
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
          </div>
        ) : (
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(34, 197, 94, 0.08), transparent 55%), radial-gradient(ellipse 80% 60% at 100% 40%, rgba(56, 189, 248, 0.06), transparent 50%)",
            }}
          />
        )}

        {/* Far parallax stack */}
        <motion.div
          style={{ y: yFar }}
          className="absolute inset-[-20%] will-change-transform"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 130% 90% at 40% -5%, rgba(56, 189, 248, 0.18), transparent 58%), radial-gradient(ellipse 100% 70% at 95% 35%, rgba(34, 197, 94, 0.14), transparent 52%), radial-gradient(ellipse 85% 60% at 5% 75%, rgba(244, 63, 94, 0.08), transparent 50%)",
            }}
          />
        </motion.div>

        {/* Layer 2 — sandy route ribbon + mid parallax */}
        <motion.div
          style={{ y: ribbonY }}
          className="absolute inset-[-15%] will-change-transform"
        >
          <div
            className="absolute inset-x-[-15%] top-[18%] h-[42%] opacity-[0.16] depth-ribbon-drift"
            style={{
              background:
                "radial-gradient(ellipse 55% 38% at 50% 50%, rgba(212, 196, 168, 0.38), rgba(180, 160, 130, 0.14) 42%, transparent 68%)",
              filter: "blur(1px)",
            }}
          />
        </motion.div>

        <motion.div
          style={{ y: yMid }}
          className="absolute inset-[-14%] will-change-transform"
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
        </motion.div>

        {/* Layer 3 — pixel tile read */}
        <motion.div
          style={{ y: yFore }}
          className="absolute inset-[-10%] will-change-transform"
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
          {/* Layer 4 — light motes drifting up */}
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
        </motion.div>

        {/* Readability — softer than before */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 82% 58% at 50% 14%, transparent 38%, rgba(2, 10, 12, 0.42) 100%), radial-gradient(ellipse 95% 55% at 50% 100%, transparent 42%, rgba(2, 8, 10, 0.38) 100%), linear-gradient(to bottom, rgba(4, 12, 14, 0.28), transparent 20%, transparent 78%, rgba(3, 10, 12, 0.32))",
          }}
        />
      </div>

      {!reduceMotion ? (
        <div
          className="portfolio-cursor-spot pointer-events-none fixed inset-0 z-[1]"
          aria-hidden
        />
      ) : null}
    </>
  );
}
