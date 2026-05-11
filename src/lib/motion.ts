import type { Variants } from "framer-motion";

/** Premium ease — calm, not springy */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const duration = {
  fast: 0.35,
  medium: 0.55,
  slow: 0.75,
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.medium, ease: easeOutExpo },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: easeOutExpo },
  },
};

export const softScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
      ease: easeOutExpo,
    },
  },
};

/** Full-screen overlay: enter + exit as variant names */
export const overlayLifecycle: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.medium, ease: easeOutExpo },
  },
  leave: {
    opacity: 0,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};
