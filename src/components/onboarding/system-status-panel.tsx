"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

type SystemStatusPanelProps = {
  className?: string;
  /** Tighter layout for the intro top bar */
  compact?: boolean;
};

export function SystemStatusPanel({
  className = "",
  compact = false,
}: SystemStatusPanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={fadeIn}
      className={`pointer-events-none select-none rounded-xl border border-zinc-700/50 bg-zinc-950/55 backdrop-blur-md ${compact ? "px-3 py-2 sm:px-4 sm:py-2.5" : "px-4 py-3 sm:px-5 sm:py-4"} ${className}`}
      aria-hidden
    >
      <dl
        className={`font-mono uppercase leading-relaxed tracking-[0.14em] text-zinc-400 ${compact ? "space-y-1 text-[9px] sm:text-[10px] sm:tracking-[0.14em]" : "space-y-2 text-[10px] sm:text-[11px] sm:tracking-[0.16em]"}`}
      >
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
          <dt className="shrink-0 text-zinc-600">Profile</dt>
          <dd className="text-zinc-300">Richin Mrudul</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
          <dt className="shrink-0 text-zinc-600">Status</dt>
          <dd className="text-zinc-300">Incoming SWE intern @ Pendo</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
          <dt className="shrink-0 text-zinc-600">Focus</dt>
          <dd className="text-zinc-300">AI systems / backend / product</dd>
        </div>
        <div
          className={`border-t border-zinc-800/80 ${compact ? "pt-1.5" : "pt-2"}`}
        >
          <dt className="text-zinc-600">Signals</dt>
          <dd className="mt-1 normal-case tracking-normal text-zinc-500">
            8.5M+ submissions · 500+ sellers · 96% pipeline reduction
          </dd>
        </div>
      </dl>
    </motion.div>
  );
}
