"use client";

import { AnimatePresence, motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import type { Skill, SkillAccent } from "@/content/skills";
import { skillCategoryLabels } from "@/content/skills";
import { SkillMeter } from "./skill-meter";

const ACCENT_DOT: Record<SkillAccent, string> = {
  ruby: "bg-rose-400",
  sky: "bg-sky-400",
  violet: "bg-violet-400",
  amber: "bg-amber-400",
  emerald: "bg-emerald-400",
  cyan: "bg-cyan-400",
  slate: "bg-zinc-400",
  teal: "bg-teal-400",
};

type SkillDetailPanelProps = {
  skill: Skill | null;
  emptyMessage?: string;
};

export function SkillDetailPanel({
  skill,
  emptyMessage = "Select a skill from the catalog.",
}: SkillDetailPanelProps) {
  return (
    <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-950/40 p-5 shadow-inner shadow-black/40 md:min-h-[360px] md:p-6">
      {/* Screen texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.35) 2px, rgba(255,255,255,0.35) 3px)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Scanner lens */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-rose-600/12 via-transparent to-transparent blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-5 h-14 w-14 rounded-full border border-rose-900/25 bg-zinc-900/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-rose-950/30"
      />

      {/* Status LEDs */}
      <div
        aria-hidden
        className="absolute left-5 top-5 flex gap-1.5 md:left-6 md:top-6"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70 shadow-[0_0_6px_rgba(251,191,36,0.35)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500/60 shadow-[0_0_6px_rgba(244,63,94,0.35)]" />
      </div>

      <div className="relative z-10 mt-6 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          {skill ? (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: easeOutExpo }}
              className="flex flex-1 flex-col gap-5"
            >
              <header className="space-y-2 border-b border-zinc-800/80 pb-4 pr-16">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${ACCENT_DOT[skill.accent] ?? ACCENT_DOT.slate}`}
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    {skillCategoryLabels[skill.category]}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-200/70">
                    {skill.typeLabel}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                  {skill.name}
                </h3>
              </header>

              <SkillMeter proficiency={skill.proficiency} accent={skill.accent} />

              <p className="text-pretty text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                {skill.description}
              </p>

              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Used in
                </p>
                <ul className="flex flex-wrap gap-2">
                  {skill.usedIn.map((place) => (
                    <li key={place}>
                      <span className="inline-flex rounded-md border border-zinc-700/80 bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-300">
                        {place}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto space-y-2 pt-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Tags
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <li key={tag}>
                      <span className="rounded border border-zinc-800/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-zinc-500"
            >
              {emptyMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
