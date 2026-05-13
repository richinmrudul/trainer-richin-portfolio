"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Experience } from "@/content/experience";
import { PokemonPanel } from "@/components/ui/pokemon-panel";

type ExperienceTimelineCardProps = {
  experience: Experience;
};

export function ExperienceTimelineCard({
  experience,
}: ExperienceTimelineCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inFocus = useInView(ref, {
    amount: 0.45,
    margin: "-22% 0px -22% 0px",
  });

  return (
    <motion.article
      ref={ref}
      className={`max-w-xl transition-[box-shadow] duration-500 ${
        inFocus && !reduceMotion
          ? "shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_24px_70px_-40px_rgba(0,0,0,0.65)]"
          : "shadow-none"
      }`}
    >
      <PokemonPanel variant="dark" label={experience.routeMarker} showGrid>
        <header className="flex flex-col gap-3 border-b border-zinc-800/70 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
              {experience.organization}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-zinc-400">
              {experience.role}
            </p>
          </div>
          <div className="shrink-0 font-mono text-[11px] leading-snug text-zinc-500">
            <p>{experience.dates}</p>
            <p className="mt-1 text-zinc-600">{experience.location}</p>
          </div>
        </header>

        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-zinc-400">
          {experience.highlights.map((h, i) => (
            <li key={`${experience.id}-h-${i}`} className="flex gap-2.5">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600"
                aria-hidden
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {experience.tech.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {experience.tech.map((t) => (
              <li key={t}>
                <span className="inline-block rounded-md border border-zinc-800/80 bg-zinc-950/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-zinc-400">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </PokemonPanel>
    </motion.article>
  );
}
