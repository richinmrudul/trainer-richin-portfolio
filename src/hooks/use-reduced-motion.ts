"use client";

/**
 * Motion-safe reduced motion (Framer subtree).
 * For non-Framer / SSR-first checks, use `usePrefersReducedMotion`.
 */
export { useReducedMotion } from "framer-motion";

export { usePrefersReducedMotion } from "./use-prefers-reduced-motion";
