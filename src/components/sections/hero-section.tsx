"use client";

import type { ReactNode } from "react";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import { SectionReveal } from "@/components/effects/section-reveal";
import { HeroRouteEnvironment } from "@/components/hero/hero-route-environment";
import { TrainerCardFlip } from "@/components/hero/trainer-card-flip";
import { links } from "@/content/links";

const heroMetaChips = [
  "Purdue CS",
  "Backend Systems",
  "AI Engineering",
  "Machine Intelligence",
] as const;

const BIO =
  "Hi, I’m Richin Mrudul, a Computer Science student at Purdue University concentrating in Machine Intelligence. I’m interested in software engineering, machine learning, systems and infrastructure, and building things that turn ideas into useful products. Outside of this, I enjoy going to the gym, playing and listening to music, and spending time with friends.";

function MetaRow({
  k,
  v,
}: {
  k: string;
  v: string;
}) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-0.5 border-b border-[color-mix(in_srgb,var(--border-game)_20%,transparent)] py-2.5 last:border-b-0">
      <span className="min-w-[5.5rem] font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#74634d]">
        {k}
      </span>
      <span className="text-sm font-semibold leading-snug text-[var(--surface-dialogue-ink)]">
        {v}
      </span>
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
  "inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-[var(--border-game)] bg-[var(--surface-dialogue)] text-[var(--surface-dialogue-ink)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.58),2px_3px_0_rgba(31,35,47,0.35)] transition-[background-color,transform,color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#b43843] hover:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.7),3px_5px_0_rgba(31,35,47,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--focus-ring)] active:translate-y-px";

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
  return (
    <section
      id={embedded ? undefined : "home"}
      data-route-stop={embedded ? undefined : "home"}
      aria-labelledby="hero-heading"
      className={`hero-route-section route-section relative isolate overflow-hidden border-b border-[var(--border-game-soft)] ${
        embedded ? "min-h-0" : "min-h-[min(940px,100svh)]"
      }`}
    >
      <HeroRouteEnvironment />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-7 sm:py-20 md:px-10 md:py-24 lg:py-28">
        <SectionReveal variant="fadeUp" delay={0.02}>
          <div className="hero-location-banner mb-5 inline-flex max-w-full items-center gap-3 px-4 py-2.5 sm:px-5">
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
            <div className="min-w-0">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#7d5d4c]">
                Now entering
              </p>
              <p className="truncate font-mono text-sm font-black uppercase tracking-[0.14em] text-[var(--surface-dialogue-ink)] sm:text-base">
                Route 01 · Trainer Richin
              </p>
            </div>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.52fr)_minmax(280px,0.72fr)] lg:gap-7">
            <div className="hero-dialogue-panel min-w-0 overflow-hidden rounded-xl">
              <div className="hero-dialogue-panel__stripe" aria-hidden />

              <div className="p-5 sm:p-7 md:p-8 lg:p-9">
                <div className="hero-current-quest mb-7 flex flex-col gap-3 rounded-lg px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-[#7d2730]">
                      Current Quest
                    </p>
                    <p className="mt-1 text-sm font-bold leading-snug text-[var(--surface-dialogue-ink)] sm:text-base">
                      Learning anything and everything
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8f3039]/25 bg-white/60 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#6f2730]">
                    <span
                      className="hero-status-led h-2 w-2 rounded-full bg-[var(--accent-green)] shadow-[0_0_0_2px_rgba(45,90,55,0.16)]"
                      aria-hidden
                    />
                    In progress
                  </span>
                </div>

                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b694f]">
                  Trainer profile
                </p>

                <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
                  <h1
                    id="hero-heading"
                    className="text-balance text-4xl font-bold tracking-[-0.035em] text-[#262a37] sm:text-5xl lg:text-[3.55rem] lg:leading-[1.02]"
                  >
                    Richin Mrudul
                  </h1>
                  <span className="mb-1 font-mono text-xs font-bold text-[#8b694f]">
                    SWE · Systems
                  </span>
                </div>

                <div className="mt-6 max-w-xl space-y-0 rounded-lg border-2 border-[#7b6e5c]/35 bg-white/35 px-4 py-1">
                  <MetaRow k="Status" v="Looking for 2027 SWE Internships!" />
                  <MetaRow k="Region" v="Purdue Computer Science" />
                  <MetaRow k="Specialty" v="AI · Backend · Systems" />
                </div>

                <p className="mt-7 max-w-[68ch] text-pretty text-[15px] leading-[1.78] text-[#45434a] sm:text-base md:text-[17px]">
                  {BIO}
                </p>

                <div
                  className="mt-7 flex flex-wrap gap-2"
                  aria-label="Focus areas"
                >
                  {heroMetaChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border-2 border-[#4f594c]/45 bg-[#e4ead1] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#334337] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] sm:text-[11px]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#projects"
                    className="hero-primary-action inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-mono text-[11px] font-black uppercase tracking-[0.13em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--focus-ring)]"
                  >
                    View Projects
                    <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                  </a>
                  <a
                    href={links.resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-secondary-action inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-mono text-[11px] font-black uppercase tracking-[0.13em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--focus-ring)]"
                  >
                    <FileText className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                    View Résumé
                  </a>
                </div>
              </div>
            </div>

            <aside
              className="hero-trainer-station relative flex flex-col items-center gap-5 rounded-xl p-4 sm:p-6"
              aria-label="Trainer card and profile links"
            >
              <div className="flex w-full items-center justify-between gap-3 border-b-2 border-[#635c55]/25 pb-3">
                <div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-[#81664f]">
                    Trainer case
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[var(--surface-dialogue-ink)]">
                    Purdue CS · MI
                  </p>
                </div>
                <span
                  className="h-5 w-5 rounded-full border-[5px] border-[#9b313b] bg-[var(--surface-dialogue)] shadow-[0_0_0_2px_var(--border-game)]"
                  aria-hidden
                />
              </div>

              <TrainerCardFlip className="hero-trainer-card" />

              <p className="max-w-[28ch] text-center font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[0.12em] text-[#735f4d]">
                Tap, click, or hover the card to inspect trainer stats
              </p>

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
            </aside>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
