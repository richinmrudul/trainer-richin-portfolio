"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();
  const tFast = reduceMotion ? 0 : 0.22;
  const tBar = reduceMotion ? 0 : 0.42;

  return (
    <div className="pokedex-meter">
      <div className="pokedex-meter__label">
        <span>
          {label}
        </span>
        <span className="sr-only">
          Proficiency {proficiency} out of 5
        </span>
        <span
          className="pokedex-meter__value"
          aria-hidden
        >
          {proficiency}/5
        </span>
      </div>
      <div
        className="pokedex-meter__segments"
        role="meter"
        aria-valuenow={proficiency}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-label={`${label}: ${proficiency} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((segment) => {
          const active = segment <= proficiency;
          const stagger = reduceMotion ? 0 : (segment - 1) * 0.045;
          return (
            <motion.div
              key={segment}
              className="pokedex-meter__segment"
              initial={false}
              animate={{
                opacity: active ? 1 : 0.35,
              }}
              transition={{
                duration: tFast,
                delay: stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className={`pokedex-meter__fill ${fillClass}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: active ? 1 : 0,
                  opacity: active ? 1 : 0,
                }}
                transition={{
                  duration: tBar,
                  delay: stagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ originX: 0 }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
