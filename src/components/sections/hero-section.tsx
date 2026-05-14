"use client";

import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { PokemonPanel } from "@/components/ui/pokemon-panel";
import { SectionReveal } from "@/components/effects/section-reveal";
import { useHeroScrollMotion } from "@/hooks/use-parallax";
import { TrainerCardFlip } from "@/components/hero/trainer-card-flip";
import { links } from "@/content/links";

const heroMetaChips = [
  "Purdue CS",
  "Backend Systems",
  "AI Engineering",
  "Machine Intelligence",
] as const;

const BIO =
  "Hi, I’m Richin Mrudul, a Computer Science student at Purdue University concentrating in Machine Intelligence. I’m interested in software engineering, machine learning, and building systems that turn ideas into useful products. Outside of this, I enjoy going to the gym, playing and listening to music, and spending time with friends.";

function MetaRow({
  k,
  v,
}: {
  k: string;
  v: string;
}) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-0.5 border-b border-[#f5f0e6]/[0.08] py-2 last:border-b-0">
      <span className="min-w-[5.5rem] font-mono text-[10px] uppercase tracking-[0.18em] text-[#c9b896]/90">
        {k}
      </span>
      <span className="text-sm font-medium leading-snug text-[#f4efe4]/90">{v}</span>
    </div>
  );
}

function QuickLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const common =
    "inline-flex items-center gap-1.5 rounded-lg border border-[#c9b896]/25 bg-black/25 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#f0ebe3] transition-[border-color,background-color,transform] duration-200 hover:border-[#e8dcc8]/45 hover:bg-[#1a2224]/90 active:translate-y-px";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={common}
      >
        {label}
        <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
      </a>
    );
  }
  return (
    <a href={href} className={common}>
      {label}
    </a>
  );
}

export function HeroSection({ embedded = false }: { embedded?: boolean }) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scale, y } = useHeroScrollMotion(sectionRef);

  return (
    <section
      ref={sectionRef}
      id={embedded ? undefined : "home"}
      aria-labelledby="hero-heading"
      className="relative border-b border-[#c9b896]/15"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {!reduceMotion ? (
          <>
            <div className="hero-route-glow absolute -left-[12%] top-[4%] h-[min(46vw,380px)] w-[min(46vw,380px)] rounded-full bg-emerald-400/[0.07] blur-3xl" />
            <div
              className="hero-route-glow absolute -right-[8%] bottom-[8%] h-[min(42vw,340px)] w-[min(42vw,340px)] rounded-full bg-amber-200/[0.06] blur-3xl"
              style={{ animationDelay: "-5s" }}
            />
            <div className="absolute left-1/2 top-[12%] h-32 w-[55%] -translate-x-1/2 rounded-full bg-[#fef3c7]/[0.04] blur-3xl" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(254,243,199,0.05),transparent)]" />
        )}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9b896]/25 to-transparent" />
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-8 md:px-10 md:py-28 lg:py-32"
        style={
          reduceMotion
            ? undefined
            : {
                scale,
                y,
                transformOrigin: "50% 0%",
                willChange: "transform",
              }
        }
      >
        <SectionReveal variant="cinematic" delay={0.02}>
          <PokemonPanel variant="trainer" label="Trainer profile · identity card" showGrid>
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="min-w-0 space-y-6 text-center lg:text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c9b896]/95">
                  Trainer profile
                </p>

                <div className="mx-auto max-w-md space-y-0 rounded-lg border border-[#f5f0e6]/[0.1] bg-black/20 px-4 py-1 lg:mx-0">
                  <MetaRow
                    k="Status"
                    v="Incoming Software Engineer Intern @ Pendo"
                  />
                  <MetaRow k="Region" v="Purdue Computer Science" />
                  <MetaRow k="Specialty" v="AI · Backend · Systems" />
                </div>

                <div>
                  <div className="flex flex-wrap items-end justify-center gap-x-3 gap-y-1 lg:justify-start">
                    <h1
                      id="hero-heading"
                      className="text-balance text-4xl font-semibold tracking-[-0.03em] text-[#faf8f3] sm:text-5xl lg:text-[3.1rem] lg:leading-[1.08]"
                    >
                      Richin Mrudul
                    </h1>
                    <span className="hidden font-mono text-xs text-[#c9b896]/70 sm:inline lg:mb-1.5">
                      /
                    </span>
                    <span className="font-mono text-xs text-[#d6cfc0] lg:mb-1.5">
                      SWE · Systems
                    </span>
                  </div>
                </div>

                <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-[#d4cdc0] md:text-[17px] md:leading-[1.65] lg:mx-0">
                  {BIO}
                </p>

                <div
                  className="flex flex-wrap justify-center gap-2 lg:justify-start"
                  aria-label="Focus areas"
                >
                  {heroMetaChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-[#c9b896]/25 bg-black/30 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#e8e2d8] transition-[border-color,background-color] duration-200 hover:border-[#e8dcc8]/45 hover:bg-[#1a2224]/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col items-center gap-6 border-t border-[#f5f0e6]/[0.08] pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {!reduceMotion ? (
                  <div
                    className="pointer-events-none absolute left-1/2 top-12 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-200/14 via-sky-400/10 to-transparent blur-2xl lg:top-16"
                    aria-hidden
                  />
                ) : null}

                <TrainerCardFlip />

                <div className="flex w-full max-w-[300px] flex-wrap justify-center gap-2 lg:justify-center">
                  <QuickLink href={links.github} label="GitHub" external />
                  <QuickLink href={links.linkedIn} label="LinkedIn" external />
                  <QuickLink href={links.resumePdf} label="Resume PDF" external />
                </div>
              </div>
            </div>
          </PokemonPanel>
        </SectionReveal>
      </motion.div>
    </section>
  );
}
