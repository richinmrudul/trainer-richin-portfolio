"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/content/skills";
import { skillCategoryLabels, skillCategories } from "@/content/skills";

type SkillCategoryTabsProps = {
  active: SkillCategory;
  onChange: (c: SkillCategory) => void;
};

export function SkillCategoryTabs({ active, onChange }: SkillCategoryTabsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      aria-label="Skill categories"
      className="relative flex flex-wrap gap-2 border-b border-zinc-800/80 pb-3"
    >
      {skillCategories.map((cat) => {
        const isActive = active === cat;
        return (
          <motion.button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            id={`pokedex-tab-${cat}`}
            tabIndex={0}
            onClick={() => onChange(cat)}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`relative z-10 rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500/60 ${
              isActive
                ? "text-rose-50"
                : "text-zinc-500 hover:bg-zinc-900/55 hover:text-zinc-200"
            }`}
          >
            {isActive && !reduceMotion ? (
              <motion.span
                layoutId="pokedex-tab-pill"
                className="absolute inset-0 -z-10 rounded-lg bg-zinc-900 ring-1 ring-rose-900/80"
                transition={{ type: "spring", stiffness: 460, damping: 34 }}
              />
            ) : null}
            {isActive && reduceMotion ? (
              <span
                className="absolute inset-0 -z-10 rounded-lg bg-zinc-900 ring-1 ring-rose-900/80"
                aria-hidden
              />
            ) : null}
            {skillCategoryLabels[cat]}
          </motion.button>
        );
      })}
    </div>
  );
}
