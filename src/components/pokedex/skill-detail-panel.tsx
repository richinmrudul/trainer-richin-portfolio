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
    <div className="pokedex-detail-screen">
      <div aria-hidden className="pokedex-detail-screen__grid" />
      {skill ? <PokemonTypeOrb type={skill.pokemonType} /> : null}

      {skill && !reduceMotion ? (
        <div key={`scan-${skill.id}`} aria-hidden className="pokedex-detail-scan" />
      ) : null}

      <div className="pokedex-detail-screen__content">
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
              className="pokedex-detail"
            >
              <header className="pokedex-detail__header">
                <div className="pokedex-detail__eyebrow">
                  <span
                    className={`pokedex-detail__accent ${ACCENT_DOT[skill.accent] ?? ACCENT_DOT.slate}`}
                    aria-hidden
                  />
                  <span>
                    {skillCategoryLabels[skill.category]}
                  </span>
                  <span aria-hidden>·</span>
                  <span>
                    {skill.typeLabel}
                  </span>
                </div>
                <h3 className="pokedex-detail__name">
                  {skill.name}
                </h3>
              </header>

              <SkillMeter
                key={skill.id}
                proficiency={skill.proficiency}
                accent={skill.accent}
              />

              <p className="pokedex-detail__description">
                {skill.description}
              </p>

              <div className="pokedex-detail__group">
                <p className="pokedex-screen-label">
                  Used in
                </p>
                <ul className="pokedex-detail__chips">
                  {skill.usedIn.map((place) => (
                    <li key={place}>
                      <span className="pokedex-detail__used-in">
                        {place}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pokedex-detail__group pokedex-detail__group--tags">
                <p className="pokedex-screen-label">
                  Tags
                </p>
                <ul className="pokedex-detail__chips">
                  {skill.tags.map((tag) => (
                    <li key={tag}>
                      <span className="pokedex-detail__tag">
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
              className="pokedex-detail__empty"
            >
              <span aria-hidden>NO SCAN DATA</span>
              <span>{emptyMessage}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
