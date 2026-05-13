"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/content/experience";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { ExperienceTimelineCard } from "@/components/experience/experience-timeline-card";

export function ExperienceSection({ embedded = false }: { embedded?: boolean }) {
  const reduceMotion = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: regionRef,
    offset: ["start 0.85", "end 0.35"],
  });
  const lineScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.08, 1],
  );

  return (
    <SectionContainer
      id={embedded ? undefined : "experience"}
      aria-labelledby="experience-heading"
    >
      <ScrollReveal variant="fadeUp">
        <header className="max-w-3xl space-y-4">
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
        </header>
      </ScrollReveal>

      <div ref={regionRef} className="relative mx-auto mt-16 max-w-5xl">
        <motion.div
          className="pointer-events-none absolute bottom-0 left-6 top-2 w-px origin-top bg-gradient-to-b from-zinc-700/40 via-zinc-800/90 to-zinc-900 lg:left-1/2 lg:-translate-x-1/2"
          style={{ scaleY: lineScale }}
          aria-hidden
        />

        <ol className="relative space-y-14 lg:space-y-20">
          {experiences.map((exp, i) => (
            <li key={exp.id} className="relative">
              <ScrollReveal variant="fadeUp" delay={i * 0.12}>
                <motion.span
                  className="absolute left-6 top-9 z-10 block h-2 w-2 -translate-x-1/2 rounded-full border border-zinc-600 bg-zinc-950 shadow-[0_0_12px_rgba(56,189,253,0.22)] lg:left-1/2 lg:-translate-x-1/2"
                  aria-hidden
                  initial={reduceMotion ? false : { scale: 0.65, opacity: 0.35 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-12% 0px" }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                <div
                  className={`pl-14 lg:pl-0 ${
                    i % 2 === 0
                      ? "lg:pr-[calc(50%+2rem)]"
                      : "lg:pl-[calc(50%+2rem)]"
                  }`}
                >
                  <ExperienceTimelineCard experience={exp} />
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </SectionContainer>
  );
}
