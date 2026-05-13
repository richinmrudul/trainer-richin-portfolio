"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";

type UseScrollProgressOptions = {
  offset?: ["start start", "end end"] | ["start end", "end start"];
};

/**
 * Stable ref + scroll progress for the route world container.
 * Prefer `scrollYProgress` for 0–1 mapping (trainer path, etc.).
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  options?: UseScrollProgressOptions,
) {
  const ref = useRef<T | null>(null);
  const offset = options?.offset ?? (["start start", "end end"] as const);

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset,
  });

  return { ref, scrollYProgress, scrollY };
}
