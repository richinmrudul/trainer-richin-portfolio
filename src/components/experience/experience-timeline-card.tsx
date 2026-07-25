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
    <article className="experience-location-card max-w-xl">
      <PokemonPanel
        variant="light"
        label={experience.routeMarker}
        showGrid={false}
        className="experience-location-panel"
      >
        <div className="experience-location-sign" aria-hidden>
          <span>Checkpoint {String(routeLeg).padStart(2, "0")}</span>
        </div>
        <header className="flex flex-col gap-3 border-b border-[#756649]/20 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-[#29251f]">
              {experience.organization}
            </h3>
            <p className="mt-0.5 text-sm font-semibold text-[#65563d]">
              {experience.role}
            </p>
          </div>
          <div className="shrink-0 font-mono text-[11px] leading-snug text-[#5f5749]">
            <p>{experience.dates}</p>
            <p className="mt-1 text-[#756b5b]">{experience.location}</p>
          </div>
        </header>

        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#494238]">
          {experience.highlights.map((h, i) => (
            <li key={`${experience.id}-h-${i}`} className="flex gap-2.5">
              <span
                className="experience-location-bullet mt-2 h-1.5 w-1.5 shrink-0 rounded-sm"
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
                <span className="experience-location-tech inline-block rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide">
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
