"use client";

import type { Experience } from "@/content/experience";
import { PokemonPanel } from "@/components/ui/pokemon-panel";

type ExperienceTimelineCardProps = {
  experience: Experience;
  routeLeg: number;
};

export function ExperienceTimelineCard({
  experience,
  routeLeg,
}: ExperienceTimelineCardProps) {
  return (
    <article className="max-w-xl transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(201,184,150,0.14),0_18px_48px_-32px_rgba(0,0,0,0.45)]">
      <PokemonPanel
        variant="dark"
        label={experience.routeMarker}
        showGrid
        className="border-[#c9b896]/18 bg-gradient-to-br from-[#171e1e]/95 to-zinc-950/92"
      >
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#c9b896]/80">
          Checkpoint · leg {String(routeLeg).padStart(2, "0")}
        </p>
        <header className="flex flex-col gap-3 border-b border-[#f5f0e6]/[0.08] pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-[#faf8f3]">
              {experience.organization}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-[#d4cdc0]">
              {experience.role}
            </p>
          </div>
          <div className="shrink-0 font-mono text-[11px] leading-snug text-[#b8b0a4]">
            <p>{experience.dates}</p>
            <p className="mt-1 text-[#9a9288]">{experience.location}</p>
          </div>
        </header>

        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#d4cdc0]">
          {experience.highlights.map((h, i) => (
            <li key={`${experience.id}-h-${i}`} className="flex gap-2.5">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#2563eb]/70"
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
                <span className="inline-block rounded-md border border-[#c9b896]/20 bg-black/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[#d6cfc0]">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </PokemonPanel>
    </article>
  );
}
