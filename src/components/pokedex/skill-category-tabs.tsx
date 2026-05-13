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
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            id={`pokedex-tab-${cat}`}
            tabIndex={0}
            onClick={() => onChange(cat)}
            className={`relative z-10 rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-[transform,colors] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500/60 active:scale-[0.98] ${
              isActive
                ? "text-rose-50"
                : "text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300"
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
          </button>
        );
      })}
    </div>
  );
}
