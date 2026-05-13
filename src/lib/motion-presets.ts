import type { Variants } from "framer-motion";
import {
  duration,
  easeOutExpo,
  fadeIn as fadeInBase,
  fadeUp as fadeUpBase,
  softScale,
} from "@/lib/motion";

export { duration, easeOutExpo };

export const fadeIn: Variants = fadeInBase;
export const fadeUp: Variants = fadeUpBase;
export const scaleIn: Variants = softScale;

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.medium, ease: easeOutExpo },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.medium, ease: easeOutExpo },
  },
};

export const scrollRevealViewport = {
  once: true as const,
  margin: "-10% 0px -8% 0px" as const,
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
  visible: { opacity: 1, x: 0, y: 0, scale: 1 },
};
