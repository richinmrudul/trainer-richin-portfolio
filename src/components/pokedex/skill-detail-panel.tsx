"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Skill, SkillAccent } from "@/content/skills";
import { skillCategoryLabels } from "@/content/skills";
import { SkillMeter } from "./skill-meter";
import { PokemonTypeOrb } from "./pokemon-type-orb";

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
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-xl border border-[#ede6d8]/14 bg-gradient-to-b from-[#141a1c]/92 to-[#0e1211]/95 p-5 shadow-[inset_0_1px_0_0_rgba(255,250,240,0.05),inset_0_0_40px_rgba(0,0,0,0.35)] md:min-h-[360px] md:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.35) 2px, rgba(255,255,255,0.35) 3px)",
          backgroundSize: "100% 100%",
        }}
      />

      {!reduceMotion ? (
        <div
          aria-hidden
          className="portfolio-scan-sweep pointer-events-none absolute inset-x-0 top-0 z-[5] h-px bg-gradient-to-r from-transparent via-rose-400/30 to-transparent"
        />
      ) : null}

      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-rose-600/12 via-transparent to-transparent blur-2xl"
      />
      {skill ? <PokemonTypeOrb type={skill.pokemonType} /> : null}

      <div
        aria-hidden
        className="pokedex-screen-glow pointer-events-none absolute inset-0 opacity-70"
      />

      <div
        aria-hidden
        className="absolute left-5 top-5 flex gap-1.5 md:left-6 md:top-6"
      >
        <span className="relative h-1.5 w-1.5">
          {!reduceMotion ? (
            <span className="absolute inset-0 animate-pulse rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          ) : (
            <span className="absolute inset-0 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          )}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70 shadow-[0_0_6px_rgba(251,191,36,0.35)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500/60 shadow-[0_0_6px_rgba(244,63,94,0.35)]" />
      </div>

      <div className="relative z-10 mt-6 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          {skill ? (
            <motion.div
              key={skill.id}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-1 flex-col gap-5"
            >
              <header className="space-y-2 border-b border-[#ede6d8]/10 pb-4 pr-20 md:pr-24">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${ACCENT_DOT[skill.accent] ?? ACCENT_DOT.slate}`}
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a89f91]">
                    {skillCategoryLabels[skill.category]}
                  </span>
                  <span className="text-[#5c564c]">·</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-200/75">
                    {skill.typeLabel}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-[#faf8f3] md:text-3xl">
                  {skill.name}
                </h3>
              </header>

              <SkillMeter
                key={skill.id}
                proficiency={skill.proficiency}
                accent={skill.accent}
              />

              <p className="text-pretty text-sm leading-relaxed text-[#c9c2b6] md:text-[15px]">
                {skill.description}
              </p>

              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a89f91]">
                  Used in
                </p>
                <ul className="flex flex-wrap gap-2">
                  {skill.usedIn.map((place) => (
                    <li key={place}>
                      <span className="inline-flex rounded-md border border-[#2a3230]/90 bg-black/35 px-2.5 py-1 text-xs text-[#d4cdc0] transition-colors hover:border-[#c9b896]/30">
                        {place}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto space-y-2 pt-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a89f91]">
                  Tags
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <li key={tag}>
                      <span className="rounded border border-[#2a3230]/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#8a8275]">
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
