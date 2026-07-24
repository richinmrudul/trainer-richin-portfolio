"use client";

import { motion, useReducedMotion } from "framer-motion";

type RouteSignHeaderProps = {
  /** Uppercase route label, e.g. "PROJECT TEAM" */
  label: string;
  className?: string;
};

/**
 * Route marker with a tactile cream sign face and compact game-label type.
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
        boxShadow: "0 14px 34px -20px rgba(17, 24, 39, 0.7)",
      }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="route-sign inline-flex items-center gap-2.5 px-3.5 py-2"
      >
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 shrink-0 rounded-full border border-[#8f2630] bg-[var(--accent-red)]" />
          <span className="h-2 w-2 shrink-0 rounded-full border border-[#2e5f89] bg-[var(--accent-blue)]" />
        </span>
        <span className="game-label text-[var(--surface-dialogue-ink)]">
          {label}
        </span>
      </span>
    </motion.div>
  );
}
