"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/content/experience";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionReveal, ScrollReveal } from "@/components/effects/section-reveal";
import { RouteSignHeader } from "@/components/ui/route-sign-header";
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
        <SectionReveal>
          <header className="max-w-3xl space-y-5">
            <RouteSignHeader label="Region route" />
            <h2
              id="experience-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-[#faf8f3] md:text-3xl"
            >
              Experience journey
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-[#d4cdc0]">
              Systems, infrastructure, AI tooling, and production engineering across
              research, education, and SaaS platforms.
            </p>
          </header>
        </SectionReveal>

      <div ref={regionRef} className="relative mx-auto mt-16 max-w-5xl">
        <motion.div
          className="pointer-events-none absolute bottom-0 left-6 top-2 w-px origin-top bg-gradient-to-b from-[#c9b896]/50 via-[#2563eb]/25 to-zinc-900 lg:left-1/2 lg:-translate-x-1/2"
          style={{ scaleY: lineScale }}
          aria-hidden
        />

        <ol className="relative space-y-14 lg:space-y-20">
          {experiences.map((exp, i) => (
            <li key={exp.id} className="relative">
              <ScrollReveal variant="fadeUp" delay={i * 0.12}>
                <motion.span
                  className="absolute left-6 top-9 z-10 flex h-7 min-w-[1.75rem] -translate-x-1/2 items-center justify-center rounded-md border border-[#c9b896]/35 bg-[#141a1c] px-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#e8e0d4] shadow-[0_0_16px_rgba(37,99,235,0.15)] lg:left-1/2 lg:-translate-x-1/2"
                  aria-hidden
                  initial={reduceMotion ? false : { scale: 0.75, opacity: 0.4 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-12% 0px" }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>

                <div
                  className={`pl-14 lg:pl-0 ${
                    i % 2 === 0
                      ? "lg:pr-[calc(50%+2rem)]"
                      : "lg:pl-[calc(50%+2rem)]"
                  }`}
                >
                  <ExperienceTimelineCard
                    experience={exp}
                    routeLeg={i + 1}
                  />
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </SectionContainer>
  );
}
