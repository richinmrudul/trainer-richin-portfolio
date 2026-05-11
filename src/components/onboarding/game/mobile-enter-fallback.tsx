"use client";

import { motion } from "framer-motion";

type MobileEnterFallbackProps = {
  onSelect: (target: string) => void;
  onSkip: () => void;
};

const QUICK_ROUTES = [
  { label: "Projects",    target: "#projects"   },
  { label: "Experience",  target: "#experience" },
  { label: "Resume",      target: "#resume"     },
];

export function MobileEnterFallback({ onSelect, onSkip }: MobileEnterFallbackProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      {/* Room preview – decorative mini room thumbnail */}
      <motion.div
        className="mb-8 overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_64px_-16px_rgba(0,0,0,0.8)]"
        style={{ width: 220, height: 140 }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Mini room art */}
        <div className="relative h-full w-full bg-[#14141a]">
          {/* Floor tiles */}
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 13px, rgba(255,255,255,.04) 13px, rgba(255,255,255,.04) 14px), repeating-linear-gradient(90deg, transparent, transparent 13px, rgba(255,255,255,.04) 13px, rgba(255,255,255,.04) 14px)",
            }}
          />
          {/* Counter */}
          <div className="absolute left-[16%] right-[16%] top-[20%] h-[22%] overflow-hidden rounded-md bg-[#f0ebe4]">
            <div className="flex h-[6px]">
              <div className="flex-1 bg-red-500" />
              <div className="flex-1 bg-sky-500" />
            </div>
          </div>
          {/* Receptionist dot */}
          <div className="absolute left-[46%] top-[8%] h-4 w-4 rounded-full bg-white/50 shadow" />
          {/* Trainer dot */}
          <div className="absolute bottom-[18%] left-[46%] h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.7)]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          Portfolio Center
        </p>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-white">
          Welcome, Trainer.
        </h2>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={() => onSelect("#home")}
          className="mb-4 w-full max-w-xs rounded-xl bg-sky-500 px-6 py-3.5 font-semibold text-white shadow-[0_4px_24px_rgba(14,165,233,0.4)] transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          Enter Portfolio
        </button>

        {/* Quick routes */}
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_ROUTES.map((r) => (
            <button
              key={r.target}
              type="button"
              onClick={() => onSelect(r.target)}
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-zinc-300 transition-colors hover:bg-white/10 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40"
            >
              {r.label}
            </button>
          ))}
        </div>
      </motion.div>

      <button
        type="button"
        onClick={onSkip}
        className="absolute left-4 top-4 rounded-full border border-white/15 bg-zinc-950/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-md transition-colors hover:bg-zinc-950/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
      >
        Skip intro
      </button>
    </div>
  );
}
