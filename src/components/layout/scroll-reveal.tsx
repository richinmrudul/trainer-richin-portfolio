"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  duration,
  easeOutExpo,
  fadeIn,
  fadeUp,
  scaleIn,
  slideLeft,
  slideRight,
  scrollRevealViewport,
  reducedMotionVariants,
} from "@/lib/motion-presets";

export type ScrollRevealVariant =
  | "fadeUp"
  | "fadeIn"
  | "scaleIn"
  | "slideLeft"
  | "slideRight";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: ScrollRevealVariant;
  /** Stagger delay when used inside a stagger parent */
  delay?: number;
  once?: boolean;
};

const VARIANTS = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight,
} as const;

export function ScrollReveal({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  const variants = useMemo(() => {
    if (reduceMotion) return reducedMotionVariants;
    const base = VARIANTS[variant];
    const vis = base.visible as Record<string, unknown> & {
      transition?: { duration?: number; ease?: typeof easeOutExpo };
    };
    const baseTransition = vis.transition ?? {
      duration: duration.medium,
      ease: easeOutExpo,
    };
    const d =
      variant === "scaleIn" ? duration.slow : duration.medium;
    return {
      hidden: base.hidden,
      visible: {
        ...vis,
        transition: { ...baseTransition, duration: d, ease: easeOutExpo, delay },
      },
    };
  }, [delay, reduceMotion, variant]);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...scrollRevealViewport, once }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
