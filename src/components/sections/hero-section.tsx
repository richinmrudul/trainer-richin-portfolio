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
          transition: { staggerChildren: 0.06, delayChildren: 0.04 },
        },
      };

  const itemVariants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative border-b border-zinc-900/80"
    >
      <div className="relative mx-auto w-full max-w-[1320px] px-6 py-24 sm:px-8 md:px-10 md:py-32 lg:py-36">
        <div
          className="pointer-events-none absolute inset-x-4 inset-y-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/25 sm:inset-x-6 md:inset-x-8"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-4 inset-y-8 rounded-2xl opacity-[0.04] sm:inset-x-6 md:inset-x-8"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(228 228 231) 1px, transparent 1px), linear-gradient(to bottom, rgb(228 228 231) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-zinc-700/10 blur-3xl md:right-0"
          aria-hidden
        />

        <motion.div
          className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
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
                      className="rounded-md border border-zinc-800/90 bg-zinc-950/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-400"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </PokemonPanel>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex w-full justify-center lg:justify-end"
          >
            <HeroPortraitCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
