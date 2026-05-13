"use client";

import { useReducedMotion } from "framer-motion";
import { PokemonPanel } from "@/components/ui/pokemon-panel";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { HeroPortraitCard } from "./hero-headshot";

const heroMetaChips = [
  "Purdue CS",
  "Backend Systems",
  "AI Engineering",
  "Machine Intelligence",
] as const;

const BIO =
  "Hi, I’m Richin Mrudul, a Computer Science student at Purdue University concentrating in Machine Intelligence. I’m interested in software engineering, machine learning, and building systems that turn ideas into useful products. Outside of this, I enjoy going to the gym, playing and listening to music, and spending time with friends.";

function StatusDots() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute right-5 top-5 flex gap-1.5 sm:right-6 sm:top-6"
        aria-hidden
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/65" />
        <span className="h-1.5 w-1.5 rounded-full bg-sky-500/65" />
      </div>
    );
  }
  return (
    <div
      className="pointer-events-none absolute right-5 top-5 flex gap-1.5 sm:right-6 sm:top-6"
      aria-hidden
    >
      <span className="relative h-1.5 w-1.5">
        <span className="hero-status-led absolute inset-0 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(52,211,153,0.35)]" />
      </span>
      <span className="relative h-1.5 w-1.5">
        <span
          className="hero-status-led absolute inset-0 rounded-full bg-amber-400/75 shadow-[0_0_8px_rgba(251,191,36,0.28)]"
          style={{ animationDelay: "0.4s" }}
        />
      </span>
      <span className="relative h-1.5 w-1.5">
        <span
          className="hero-status-led absolute inset-0 rounded-full bg-sky-500/75 shadow-[0_0_8px_rgba(14,165,233,0.28)]"
          style={{ animationDelay: "0.9s" }}
        />
      </span>
    </div>
  );
}

export function HeroSection({ embedded = false }: { embedded?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={embedded ? undefined : "home"}
      aria-labelledby="hero-heading"
      className="relative border-b border-zinc-900/80"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {!reduceMotion ? (
          <>
            <div className="hero-route-glow absolute -left-[14%] top-[6%] h-[min(48vw,400px)] w-[min(48vw,400px)] rounded-full bg-emerald-500/[0.045] blur-3xl" />
            <div
              className="hero-route-glow absolute -right-[10%] bottom-[10%] h-[min(44vw,360px)] w-[min(44vw,360px)] rounded-full bg-sky-500/[0.05] blur-3xl"
              style={{ animationDelay: "-5s" }}
            />
            <div className="absolute left-[58%] top-[18%] h-28 w-28 rounded-full bg-amber-400/[0.035] blur-2xl" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_18%,rgba(56,189,248,0.04),transparent)]" />
        )}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/35 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] px-6 py-24 sm:px-8 md:px-10 md:py-32 lg:py-36">
        <div
          className="pointer-events-none absolute inset-x-4 inset-y-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 shadow-[0_0_80px_-40px_rgba(0,0,0,0.6)] sm:inset-x-6 md:inset-x-8"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-4 inset-y-8 rounded-2xl opacity-[0.028] sm:inset-x-6 md:inset-x-8"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(228 228 231) 1px, transparent 1px), linear-gradient(to bottom, rgb(228 228 231) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 15%, transparent 75%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <ScrollReveal variant="slideLeft" delay={0.02}>
            <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
              <StatusDots />
              <div className="relative transition-shadow duration-500 hover:shadow-[0_0_48px_-20px_rgba(255,255,255,0.06)]">
                <PokemonPanel variant="screen" label="Trainer profile" showGrid>
                  <div className="mx-auto space-y-8 text-center lg:mx-0 lg:max-w-none lg:text-left">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                        Incoming Software Engineer Intern @ Pendo
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-end justify-center gap-x-4 gap-y-2 lg:justify-start">
                        <h1
                          id="hero-heading"
                          className="text-balance text-4xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
                        >
                          Richin Mrudul
                        </h1>
                        <span className="hidden font-mono text-xs text-zinc-600 sm:inline lg:mb-2">
                          /
                        </span>
                        <span className="font-mono text-xs text-zinc-500 lg:mb-2">
                          SWE · Systems
                        </span>
                      </div>
                    </div>

                    <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-zinc-400 md:text-[17px] md:leading-[1.65] lg:mx-0">
                      {BIO}
                    </p>

                    <div
                      className="flex flex-wrap justify-center gap-2 lg:justify-start"
                      aria-label="Focus areas"
                    >
                      {heroMetaChips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-md border border-zinc-800/90 bg-zinc-950/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-400 transition-[border-color,background-color] duration-300 hover:border-zinc-700/90 hover:bg-zinc-900/70"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </PokemonPanel>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideRight" delay={0.12}>
            <div className="flex w-full justify-center lg:justify-end">
              <div className="relative w-full max-w-md transition-transform duration-500 ease-out lg:max-w-none">
                {!reduceMotion ? (
                  <>
                    <div
                      className="hero-headshot-pulse pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-cyan-400/14 via-emerald-500/10 to-transparent blur-2xl"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent opacity-70 blur-xl"
                      aria-hidden
                    />
                  </>
                ) : null}
                <HeroPortraitCard />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
