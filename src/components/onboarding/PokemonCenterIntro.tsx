"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";

const PORTFOLIO_MAIN_ID = "portfolio-main";

export function PokemonCenterIntro() {
  const reduceMotion = useReducedMotion();

  const scrollToPortfolio = () => {
    document.getElementById(PORTFOLIO_MAIN_ID)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(244 244 245) 1px, transparent 1px), linear-gradient(to bottom, rgb(244 244 245) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md rounded-xl border border-zinc-700/60 bg-zinc-900/90 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] backdrop-blur-sm"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Pokémon Center Terminal
          </span>
          <span className="font-mono text-[10px] text-zinc-600">v1.0</span>
        </div>

        <div className="space-y-6 px-6 py-8">
          <div className="space-y-2 font-mono text-sm leading-relaxed text-zinc-300">
            <p className="text-zinc-500">&gt; boot.sequence.init()</p>
            <p>
              Initializing{" "}
              <span className="text-zinc-100">{site.trainerName}</span>…
            </p>
          </div>

          <div className="h-px w-full bg-zinc-800" />

          <div className="space-y-1 font-mono text-xs text-zinc-500">
            <p>Subtitle · {site.subtitle}</p>
            <p>GitHub · @{site.githubUsername}</p>
          </div>

          <button
            type="button"
            onClick={scrollToPortfolio}
            className="w-full rounded-lg border border-zinc-600 bg-zinc-100 px-4 py-3 font-sans text-sm font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
          >
            Enter Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
