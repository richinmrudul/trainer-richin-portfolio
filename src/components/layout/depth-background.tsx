"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMouseDepth } from "@/hooks/use-mouse-depth";

/**
 * Layered route atmosphere + scroll parallax (transform-only).
 * Decorative only — `aria-hidden` on wrapper in parent optional; this root is inert.
 */
export function DepthBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const yFar = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -60],
  );
  const yMid = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -120],
  );
  const yFore = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -180],
  );

  const mouseBg = useMouseDepth(8);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Far: soft route sky / tall grass tint */}
      <motion.div
        style={{ y: yFar }}
        className="absolute inset-[-18%] will-change-transform"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, rgba(15, 40, 35, 0.55) 0%, rgba(8, 22, 32, 0.5) 38%, rgba(9, 9, 11, 0.92) 100%), radial-gradient(ellipse 120% 80% at 50% -20%, rgba(56, 189, 248, 0.07), transparent 55%), radial-gradient(ellipse 90% 60% at 100% 30%, rgba(34, 197, 94, 0.05), transparent 50%), radial-gradient(ellipse 70% 50% at 0% 70%, rgba(244, 63, 94, 0.04), transparent 45%)",
          }}
        />
      </motion.div>

      {/* Mid: faint route texture + silhouettes */}
      <motion.div
        style={{ y: yMid }}
        className="absolute inset-[-12%] will-change-transform"
      >
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.04) 45%, transparent 70%), repeating-linear-gradient(-12deg, transparent, transparent 18px, rgba(228,228,231,0.06) 18px, rgba(228,228,231,0.06) 19px), repeating-linear-gradient(78deg, transparent, transparent 22px, rgba(161,161,170,0.05) 22px, rgba(161,161,170,0.05) 23px)",
            backgroundSize: "100% 100%, 100% 100%, 100% 100%",
            maskImage:
              "radial-gradient(ellipse 85% 70% at 50% 55%, black 20%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-[-5%] h-[42%] opacity-[0.07]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 65%), radial-gradient(ellipse 55% 40% at 18% 100%, rgba(20,50,35,0.55), transparent 70%), radial-gradient(ellipse 50% 38% at 78% 100%, rgba(25,45,55,0.5), transparent 68%)",
            filter: "blur(1px)",
          }}
        />
        <div
          className="absolute inset-x-[-10%] bottom-[6%] h-[28%] opacity-[0.09]"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(34,197,94,0.08) 6px, rgba(34,197,94,0.08) 7px)",
            maskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
      </motion.div>

      {/* Foreground haze + light motes (no canvas) */}
      <motion.div
        style={{ y: yFore }}
        className="absolute inset-[-8%] will-change-transform"
      >
        <motion.div
          style={{
            x: reduceMotion ? 0 : mouseBg.x,
            y: reduceMotion ? 0 : mouseBg.y,
          }}
          className="absolute inset-0 opacity-[0.35]"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.04), transparent 42%), radial-gradient(circle at 72% 35%, rgba(250,204,21,0.03), transparent 38%), radial-gradient(circle at 50% 80%, rgba(14,165,233,0.035), transparent 45%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Readability: vignette + content wells */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 18%, transparent 30%, rgba(0,0,0,0.38) 100%), radial-gradient(ellipse 90% 50% at 50% 100%, transparent 35%, rgba(0,0,0,0.55) 100%), linear-gradient(to bottom, rgba(9,9,11,0.25), transparent 22%, transparent 78%, rgba(9,9,11,0.35))",
        }}
      />
    </div>
  );
}
