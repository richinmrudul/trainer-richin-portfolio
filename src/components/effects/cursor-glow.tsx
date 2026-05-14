"use client";

import { useReducedMotion } from "framer-motion";
import { useMouseDepth } from "@/hooks/use-mouse-depth";

/**
 * Cursor-reactive spotlight (CSS vars on `#portfolio-main`).
 * Single subscription site for pointer smoothing + spotlight.
 */
export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  useMouseDepth(8);

  if (reduceMotion) return null;

  return (
    <div
      className="portfolio-cursor-spot pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    />
  );
}
