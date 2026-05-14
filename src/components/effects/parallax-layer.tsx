"use client";

import { motion, type MotionValue } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type ParallaxLayerProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
};

/**
 * GPU-only parallax shell. Compose scroll + pointer offsets upstream.
 */
export function ParallaxLayer({
  children,
  className = "",
  style,
  x,
  y,
}: ParallaxLayerProps) {
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{
        x,
        y,
        translateZ: 0,
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
