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
 * Page-level scroll depth: layered Y shifts + ambient glow drift (GPU transforms only).
 */
export function usePortfolioParallax() {
  const reduceMotion = useReducedMotion();
  const off = Boolean(reduceMotion);
  const { scrollYProgress } = useScroll();

  const yFar = useTransform(scrollYProgress, [0, 1], pair(off, 0, -140));
  const yMid = useTransform(scrollYProgress, [0, 1], pair(off, 0, -248));
  const yFore = useTransform(scrollYProgress, [0, 1], pair(off, 0, -340));
  const ribbonY = useTransform(scrollYProgress, [0, 1], pair(off, 56, -176));

  const xFar = useTransform(scrollYProgress, [0, 1], pair(off, 0, -22));
  const xMid = useTransform(scrollYProgress, [0, 1], pair(off, 0, 14));

  const glowX = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    off ? [0, 0, 0] : [-18, 8, 26],
  );
  const glowY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    off ? [0, 0, 0] : [10, -6, -22],
  );

  return {
    scrollYProgress,
    yFar,
    yMid,
    yFore,
    ribbonY,
    xFar,
    xMid,
    glowX,
    glowY,
  };
}

export type HeroScrollMotion = {
  scale: MotionValue<number>;
  y: MotionValue<number>;
};

/**
 * Hero “camera pull”: subtle scale + lift as the section leaves the viewport top.
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
