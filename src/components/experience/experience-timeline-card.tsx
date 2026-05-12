"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Experience } from "@/content/experience";

type ExperienceTimelineCardProps = {
  experience: Experience;
  index: number;
};

export function ExperienceTimelineCard({
  experience,
  index,
}: ExperienceTimelineCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.42,
        delay: reduceMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-xl"
    >
      <div className="rounded-xl border border-zinc-800/90 bg-zinc-900/35 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] sm:p-6">
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
      </div>
    </motion.article>
  );
}
