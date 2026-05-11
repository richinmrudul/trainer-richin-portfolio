"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { easeOutExpo, duration } from "@/lib/motion";

type DialogueBoxProps = {
  line: string;
  stepLabel: string;
  continueLabel?: string;
  onContinue: () => void;
  disabled?: boolean;
};

export function DialogueBox({
  line,
  stepLabel,
  continueLabel = "Continue",
  onContinue,
  disabled = false,
}: DialogueBoxProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-2xl">
      {/* Yellow / blue accent strip */}
      <div
        className="absolute -top-1 left-8 right-8 h-1 overflow-hidden rounded-full sm:left-10 sm:right-10"
        aria-hidden
      >
        <div className="flex h-full w-full">
          <div className="h-full w-1/2 bg-amber-300/90" />
          <div className="h-full w-1/2 bg-sky-500/85" />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-300/25 bg-zinc-50 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.65)]">
        <div className="flex items-center justify-between border-b border-zinc-200/80 px-4 py-2.5 sm:px-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Reception · {stepLabel}
          </span>
        </div>

        <div className="min-h-[5.5rem] px-4 py-4 sm:min-h-[6rem] sm:px-6 sm:py-5">
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
              className="text-pretty text-base leading-relaxed text-zinc-900 sm:text-[17px] sm:leading-[1.6]"
            >
              {line}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-end border-t border-zinc-200/80 px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={onContinue}
            disabled={disabled}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            {continueLabel}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
