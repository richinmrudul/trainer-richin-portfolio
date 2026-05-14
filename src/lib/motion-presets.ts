import type { Variants } from "framer-motion";
import {
  duration,
  easeOutExpo,
  fadeIn as fadeInBase,
} from "@/lib/motion";

export { duration, easeOutExpo };

export const fadeIn: Variants = fadeInBase;

/** Default section entrance — clearly visible but controlled */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -56, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 56, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Premium section entrance — GPU-friendly (no blur). */
export const cinematic: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const scrollRevealViewport = {
  once: true as const,
  margin: "-6% 0px -4% 0px" as const,
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
  visible: { opacity: 1, x: 0, y: 0, scale: 1 },
};
