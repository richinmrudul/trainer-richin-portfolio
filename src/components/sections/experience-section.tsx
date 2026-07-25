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
    reduceMotion ? [1, 1] : [0.04, 1],
  );
  const trainerProgress = useTransform(scrollYProgress, [0, 1], ["1%", "96%"]);

  return (
    <SectionContainer
      id={embedded ? undefined : "experience"}
      aria-labelledby="experience-heading"
      className="experience-route-section"
    >
      <div className="experience-route-environment" aria-hidden>
        <span className="experience-route-sun" />
        <span className="experience-route-ridge experience-route-ridge--far" />
        <span className="experience-route-ridge experience-route-ridge--near" />
      </div>

      <div className="relative z-[1]">
        <SectionReveal>
          <header className="mx-auto max-w-3xl space-y-5 text-center">
            <RouteSignHeader label="Sinnoh career route" />
            <h2
              id="experience-heading"
              className="text-balance text-2xl font-semibold tracking-tight text-[#fffaf0] md:text-3xl"
            >
              Experience journey
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-[#ece3d2]">
              Follow the connected route through systems, infrastructure, AI
              tooling, and production engineering.
            </p>
          </header>
        </SectionReveal>

        <div ref={regionRef} className="experience-route-map relative mx-auto mt-14 max-w-6xl">
          <div className="experience-route-track" aria-hidden>
            <span className="experience-route-track__base" />
            <motion.span
              className="experience-route-track__progress"
              style={{ scaleY: lineScale }}
            />
          </div>

          {!reduceMotion ? (
            <motion.span
              className="experience-route-trainer"
              style={{ top: trainerProgress }}
              aria-hidden
            >
              <span />
            </motion.span>
          ) : null}

          <ol className="experience-route-list relative">
            {experiences.map((exp, i) => (
              <li
                key={exp.id}
                className="experience-route-stop relative"
                data-route-side={i % 2 === 0 ? "left" : "right"}
                data-route-biome={i + 1}
              >
                <ScrollReveal
                  className="experience-route-stop__reveal"
                  variant="fadeUp"
                  delay={i * 0.1}
                >
                  <span className="experience-route-node" aria-hidden>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </span>

                  <div className="experience-route-card-wrap">
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
      </div>
    </SectionContainer>
  );
}
