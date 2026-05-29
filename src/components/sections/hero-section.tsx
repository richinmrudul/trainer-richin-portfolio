"use client";

import type { ReactNode } from "react";
import { FileText } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { PokemonPanel } from "@/components/ui/pokemon-panel";
import { SectionReveal } from "@/components/effects/section-reveal";
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

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconSpotify({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

const iconLinkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9b896]/25 bg-black/25 text-[#e8e0d4] transition-[border-color,background-color,transform,color] duration-200 hover:border-[#e8dcc8]/45 hover:bg-[#1a2224]/90 hover:text-[#faf8f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9b896]/55 active:translate-y-px";

function HeroIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={iconLinkClass}
    >
      {children}
    </a>
  );
}

export function HeroSection({ embedded = false }: { embedded?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
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

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-8 md:px-10 md:py-28 lg:py-32">
        <SectionReveal variant="fadeUp" delay={0.02}>
          <PokemonPanel variant="trainer" label="Trainer profile · identity card" showGrid>
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="min-w-0 space-y-6 text-center lg:text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c9b896]/95">
                  Trainer profile
                </p>

                <div className="mx-auto max-w-md space-y-0 rounded-lg border border-[#f5f0e6]/[0.1] bg-black/20 px-4 py-1 lg:mx-0">
                  <MetaRow
                    k="Status"
                    v="Software Engineer Intern @ Pendo"
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

                <div
                  className="flex items-center justify-center gap-2.5"
                  aria-label="Social and resume links"
                >
                  <HeroIconLink href={links.github} label="GitHub">
                    <IconGitHub className="h-[18px] w-[18px]" />
                  </HeroIconLink>
                  <HeroIconLink href={links.linkedIn} label="LinkedIn">
                    <IconLinkedIn className="h-[18px] w-[18px]" />
                  </HeroIconLink>
                  <HeroIconLink href={links.spotify} label="Spotify profile">
                    <IconSpotify className="h-[18px] w-[18px]" />
                  </HeroIconLink>
                  <HeroIconLink href={links.resumePdf} label="View resume PDF">
                    <FileText className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </HeroIconLink>
                </div>
              </div>
            </div>
          </PokemonPanel>
        </SectionReveal>
      </div>
    </section>
  );
}
