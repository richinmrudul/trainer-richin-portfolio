"use client";

import { motion, useReducedMotion } from "framer-motion";

const heroMetaChips = [
  "Purdue CS",
  "Backend Systems",
  "AI Engineering",
  "Machine Intelligence",
] as const;

const heroMetrics = [
  { label: "Submissions processed", value: "8.5M+" },
  { label: "Sellers supported", value: "500+" },
  { label: "Pipeline reduction", value: "96%" },
] as const;

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
      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-10 md:py-32 lg:py-36">
        {/* Layered backdrop */}
        <div
          className="pointer-events-none absolute inset-x-6 inset-y-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/25 md:inset-x-10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-6 inset-y-8 rounded-2xl opacity-[0.04] md:inset-x-10"
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
          className="relative grid gap-14 lg:grid-cols-12 lg:gap-10 lg:items-start"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="space-y-8 lg:col-span-7">
            <motion.div variants={itemVariants}>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                Incoming Software Engineer Intern @ Pendo
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
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
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-pretty text-base leading-relaxed text-zinc-400 md:text-[17px] md:leading-[1.65]"
            >
              Building AI-powered systems, scalable backend infrastructure,
              and product-focused developer experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
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
            </motion.div>
          </div>

          <motion.aside
            variants={itemVariants}
            className="relative lg:col-span-5"
            aria-label="Impact signals"
          >
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
              <div className="flex items-center justify-between border-b border-zinc-800/70 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                  Production signals
                </span>
                <span className="font-mono text-[10px] text-zinc-700">●</span>
              </div>
              <ul className="mt-5 divide-y divide-zinc-800/80">
                {heroMetrics.map((m) => (
                  <li
                    key={m.label}
                    className="flex items-baseline justify-between gap-4 py-4 first:pt-0"
                  >
                    <span className="text-xs text-zinc-500">{m.label}</span>
                    <span className="font-mono text-lg tabular-nums text-zinc-100">
                      {m.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pointer-events-none absolute -bottom-3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
