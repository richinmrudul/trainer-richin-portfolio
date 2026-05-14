"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  fadeIn,
  fadeUp,
  scaleIn,
  slideLeft,
  slideRight,
  cinematic,
  scrollRevealViewport,
  reducedMotionVariants,
} from "@/lib/motion-presets";

export type ScrollRevealVariant =
  | "fadeUp"
  | "fadeIn"
  | "scaleIn"
  | "slideLeft"
  | "slideRight"
  | "cinematic";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: ScrollRevealVariant;
  delay?: number;
  once?: boolean;
};

const VARIANTS = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight,
  cinematic,
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
      transition?: { duration?: number; ease?: readonly [number, number, number, number]; delay?: number };
    };
    const t = vis.transition ?? {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    };
    return {
      hidden: base.hidden,
      visible: {
        ...vis,
        transition: { ...t, delay: delay + (t.delay ?? 0) },
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
