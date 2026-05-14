"use client";

import { motion, useReducedMotion } from "framer-motion";

type RouteSignHeaderProps = {
  /** Uppercase route label, e.g. "PROJECT TEAM" */
  label: string;
  className?: string;
};

/**
 * Pokémon Center–inspired section marker: cream pill, pixel edge, status dots.
 */
export function RouteSignHeader({ label, className = "" }: RouteSignHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`inline-flex items-center gap-2.5 ${className}`}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: -10, y: 8, boxShadow: "0 0 0 rgba(0,0,0,0)" }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        boxShadow: "0 0 36px -14px rgba(245, 240, 220, 0.09)",
      }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="route-sign-pill inline-flex items-center gap-2 rounded-md border border-[#c9b896]/45 bg-[#f4efe4]/[0.12] px-3 py-1.5 shadow-[inset_0_1px_0_0_rgba(255,253,248,0.35)] backdrop-blur-sm"
        aria-hidden
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#dc2626] shadow-[0_0_6px_rgba(220,38,38,0.55)]" />
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb] shadow-[0_0_6px_rgba(37,99,235,0.45)]" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f0e6]">
          {label}
        </span>
      </span>
    </motion.div>
  );
}
