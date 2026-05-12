"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "@/content/experience";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ExperienceTimelineCard } from "@/components/experience/experience-timeline-card";

export function ExperienceSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionContainer id="experience" aria-labelledby="experience-heading">
      <motion.header
        className="max-w-3xl space-y-4"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          Region route
        </p>
        <h2
          id="experience-heading"
          className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl"
        >
          Experience journey
        </h2>
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-zinc-400">
          Systems, infrastructure, AI tooling, and production engineering across
          research, education, and SaaS platforms.
        </p>
      </motion.header>

      <div className="relative mx-auto mt-16 max-w-5xl">
        <div
          className="pointer-events-none absolute bottom-0 left-6 top-2 w-px bg-gradient-to-b from-zinc-700/40 via-zinc-800/90 to-zinc-900 lg:left-1/2 lg:-translate-x-1/2"
          aria-hidden
        />

        <ol className="relative space-y-14 lg:space-y-20">
          {experiences.map((exp, i) => (
            <li key={exp.id} className="relative">
              <div
                className="absolute left-6 top-9 z-10 h-2 w-2 -translate-x-1/2 rounded-full border border-zinc-600 bg-zinc-950 lg:left-1/2 lg:-translate-x-1/2"
                aria-hidden
              />

              <div
                className={`pl-14 lg:pl-0 ${
                  i % 2 === 0
                    ? "lg:pr-[calc(50%+2rem)]"
                    : "lg:pl-[calc(50%+2rem)]"
                }`}
              >
                <ExperienceTimelineCard experience={exp} index={i} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionContainer>
  );
}
