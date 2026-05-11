"use client";

import type { SkillCategory } from "@/content/skills";
import { skillCategoryLabels, skillCategories } from "@/content/skills";

type SkillCategoryTabsProps = {
  active: SkillCategory;
  onChange: (c: SkillCategory) => void;
};

export function SkillCategoryTabs({ active, onChange }: SkillCategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Skill categories"
      className="flex flex-wrap gap-2 border-b border-zinc-800/80 pb-3"
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
            className={`rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500/60 ${
              isActive
                ? "bg-zinc-900 text-rose-100 ring-1 ring-rose-900/80"
                : "text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300"
            }`}
          >
            {skillCategoryLabels[cat]}
          </button>
        );
      })}
    </div>
  );
}
