"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { easeOutExpo, duration } from "@/lib/motion";

export type DialogueTailSide = "left" | "none";

type DialogueBoxProps = {
  line: string;
  stepLabel: string;
  continueLabel?: string;
  onContinue: () => void;
  disabled?: boolean;
  className?: string;
  /** Speech pointer toward the nurse (left of the box on screen) */
  tailSide?: DialogueTailSide;
};

export function DialogueBox({
  line,
  stepLabel,
  continueLabel = "Continue",
  onContinue,
  disabled = false,
  className = "",
  tailSide = "none",
}: DialogueBoxProps) {
  const reduceMotion = useReducedMotion();

  const showTail = tailSide === "left";

  return (
    <div className={`relative w-full max-w-3xl ${className}`}>
      {/* Red / yellow / blue accent strip */}
      <div
        className="absolute -top-1 left-6 right-6 flex h-1 overflow-hidden rounded-full sm:left-8 sm:right-8"
        aria-hidden
      >
        <div className="h-full flex-1 bg-red-500/75" />
        <div className="h-full w-5 shrink-0 bg-amber-300/90" />
        <div className="h-full flex-1 bg-sky-500/80" />
      </div>

      <div className="relative overflow-visible rounded-2xl border border-zinc-300/60 bg-[#f4f4f1] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset]">
        {showTail ? (
          <div
            className="pointer-events-none absolute left-0 top-[40%] z-10 -translate-x-full -translate-y-1/2"
            aria-hidden
          >
            <div
              className="h-0 w-0 border-y-[10px] border-r-[12px] border-y-transparent border-r-[#f4f4f1]"
              style={{
                filter: "drop-shadow(-3px 3px 4px rgba(0,0,0,0.14))",
              }}
            />
          </div>
        ) : null}

        <div className="flex items-center justify-between border-b border-zinc-300/70 px-5 py-3 sm:px-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            Reception · {stepLabel}
          </span>
        </div>

        <div className="min-h-[6.5rem] px-5 py-5 sm:min-h-[7rem] sm:px-7 sm:py-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={line}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -4 }
              }
              transition={{
                duration: reduceMotion ? 0.15 : duration.fast,
                ease: easeOutExpo,
              }}
              className="text-pretty text-[1.05rem] font-medium leading-relaxed text-zinc-900 sm:text-lg sm:leading-[1.65]"
            >
              {line}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-end border-t border-zinc-300/70 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onContinue}
            disabled={disabled}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-400/80 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-50 shadow-sm transition-colors hover:bg-zinc-800 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            {continueLabel}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
