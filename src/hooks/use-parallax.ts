"use client";

import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { RefObject } from "react";

function pair(reduce: boolean | null, a: number, b: number): [number, number] {
  return reduce ? [0, 0] : [a, b];
}

/**
 * Lightweight scroll parallax for the background only (Y-only, small ranges).
 */
export function usePortfolioParallax() {
  const reduceMotion = useReducedMotion();
  const off = Boolean(reduceMotion);
  const { scrollYProgress } = useScroll();

  const yFar = useTransform(scrollYProgress, [0, 1], pair(off, 0, -72));
  const yMid = useTransform(scrollYProgress, [0, 1], pair(off, 0, -120));
  const yFore = useTransform(scrollYProgress, [0, 1], pair(off, 0, -160));
  const ribbonY = useTransform(scrollYProgress, [0, 1], pair(off, 28, -88));

  return {
    scrollYProgress,
    yFar,
    yMid,
    yFore,
    ribbonY,
  };
}

export type HeroScrollMotion = {
  scale: MotionValue<number>;
  y: MotionValue<number>;
};

/**
 * Hero scroll “camera” — opt-in; keep hook for experiments without wiring by default.
 */
export function useHeroScrollMotion(
  sectionRef: RefObject<HTMLElement | null>,
): HeroScrollMotion {
  const reduceMotion = useReducedMotion();
  const off = Boolean(reduceMotion);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    off ? [1, 1] : [1, 0.972],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    off ? [0, 0] : [0, -20],
  );

  return { scale, y };
}
