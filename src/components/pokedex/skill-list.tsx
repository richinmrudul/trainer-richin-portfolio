"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Skill } from "@/content/skills";

type SkillListProps = {
  skills: Skill[];
  selectedId: string;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (q: string) => void;
  listId: string;
};

export function SkillList({
  skills,
  selectedId,
  onSelect,
  search,
  onSearchChange,
  listId,
}: SkillListProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <label htmlFor="pokedex-search" className="sr-only">
        Search skills
      </label>
      <input
        id="pokedex-search"
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or tag…"
        autoComplete="off"
        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 px-3 py-2.5 font-sans text-sm text-zinc-200 placeholder:text-zinc-600 transition-[border-color,box-shadow] focus:border-rose-900/60 focus:outline-none focus:ring-1 focus:ring-rose-900/40"
      />
      <ul
        id={listId}
        role="listbox"
        aria-label="Skills"
        className="custom-scrollbar min-h-[200px] flex-1 space-y-1 overflow-y-auto pr-1 md:min-h-[320px] md:max-h-[min(52vh,520px)]"
      >
        {skills.length === 0 ? (
          <li className="px-2 py-6 text-center text-sm text-zinc-500">
            No skills match this filter.
          </li>
        ) : (
          skills.map((s) => {
            const isSelected = s.id === selectedId;
            return (
              <li key={s.id} role="none" className="relative">
                <motion.button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  layout={!reduceMotion}
                  onClick={() => onSelect(s.id)}
                  whileTap={reduceMotion ? undefined : { scale: 0.995 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500/50 ${
                    isSelected
                      ? "bg-rose-950/35 text-rose-50 ring-1 ring-rose-900/50"
                      : "text-zinc-300 hover:bg-zinc-900/60 hover:text-zinc-100"
                  }`}
                >
                  <span className="truncate font-medium">{s.name}</span>
                  <span className="shrink-0 font-mono text-[10px] tabular-nums text-zinc-500">
                    {s.proficiency}/5
                  </span>
                </motion.button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
