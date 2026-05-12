"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PokemonPanel } from "@/components/ui/pokemon-panel";
import { HeroPortraitCard } from "./hero-headshot";

const heroMetaChips = [
  "Purdue CS",
  "Backend Systems",
  "AI Engineering",
  "Machine Intelligence",
] as const;

const BIO =
  "Hi, I’m Richin Mrudul, a Computer Science student at Purdue University concentrating in Machine Intelligence. I’m interested in software engineering, machine learning, and building systems that turn ideas into useful products. Outside of this, I enjoy going to the gym, playing and listening to music, and spending time with friends.";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const containerVariants = reduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.07, delayChildren: 0.05 },
        },
      };

  const itemVariants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative border-b border-zinc-900/80"
    >
      {/* Local depth layer — slow parallax feel vs global grid */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        {!reduceMotion ? (
          <>
            <div className="hero-ambient-orb absolute -left-[12%] top-[8%] h-[min(52vw,420px)] w-[min(52vw,420px)] rounded-full bg-sky-500/[0.06] blur-3xl" />
            <div
              className="hero-ambient-orb absolute -right-[8%] bottom-[12%] h-[min(48vw,380px)] w-[min(48vw,380px)] rounded-full bg-rose-500/[0.05] blur-3xl"
              style={{ animationDelay: "-4s" }}
            />
            <div className="absolute left-[55%] top-[20%] h-32 w-32 rounded-full bg-amber-400/[0.04] blur-2xl" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_20%,rgba(56,189,248,0.05),transparent)]" />
        )}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/35 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] px-6 py-24 sm:px-8 md:px-10 md:py-32 lg:py-36">
        <div
          className="pointer-events-none absolute inset-x-4 inset-y-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 shadow-[0_0_80px_-40px_rgba(0,0,0,0.6)] sm:inset-x-6 md:inset-x-8"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-4 inset-y-8 rounded-2xl opacity-[0.035] sm:inset-x-6 md:inset-x-8"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(228 228 231) 1px, transparent 1px), linear-gradient(to bottom, rgb(228 228 231) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />

        <motion.div
          className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
          >
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
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex w-full justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md transition-transform duration-500 ease-out lg:max-w-none">
              {!reduceMotion ? (
                <div
                  className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent opacity-60 blur-xl"
                  aria-hidden
                />
              ) : null}
              <HeroPortraitCard />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
