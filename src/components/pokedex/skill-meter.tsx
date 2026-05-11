"use client";

import { motion } from "framer-motion";
import type { SkillAccent } from "@/content/skills";

const ACCENT_BAR: Record<SkillAccent, string> = {
  ruby: "bg-rose-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  cyan: "bg-cyan-500",
  slate: "bg-zinc-500",
  teal: "bg-teal-500",
};

type SkillMeterProps = {
  proficiency: 1 | 2 | 3 | 4 | 5;
  accent: SkillAccent;
  label?: string;
};

export function SkillMeter({
  proficiency,
  accent,
  label = "Field strength",
}: SkillMeterProps) {
  const fillClass = ACCENT_BAR[accent] ?? ACCENT_BAR.slate;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {label}
        </span>
        <span className="sr-only">
          Proficiency {proficiency} out of 5
        </span>
        <span
          className="font-mono text-xs tabular-nums text-zinc-400"
          aria-hidden
        >
          {proficiency}/5
        </span>
      </div>
      <div
        className="flex gap-1.5"
        role="meter"
        aria-valuenow={proficiency}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-label={`${label}: ${proficiency} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((segment) => {
          const active = segment <= proficiency;
          return (
            <motion.div
              key={segment}
              className="h-2 min-w-0 flex-1 overflow-hidden rounded-sm bg-zinc-800/90 ring-1 ring-inset ring-zinc-700/50"
              initial={false}
              animate={{
                opacity: active ? 1 : 0.35,
              }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className={`h-full w-full ${fillClass}`}
                initial={false}
                animate={{
                  scaleX: active ? 1 : 0,
                  opacity: active ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
