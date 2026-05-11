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
  tailSide?: DialogueTailSide;
};

const PANEL =
  "relative overflow-visible rounded-[1.35rem] border border-white/25 bg-white/[0.72] shadow-[0_28px_80px_-36px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.55)] backdrop-blur-xl";

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
  const tailFill = "rgba(248, 250, 252, 0.88)";

  return (
    <div className={`relative w-full max-w-3xl md:max-w-[min(100%,760px)] ${className}`}>
      <div
        className="absolute -top-1.5 left-7 right-7 flex h-[5px] overflow-hidden rounded-full sm:left-9 sm:right-9"
        aria-hidden
      >
        <div className="h-full flex-1 bg-red-500/70" />
        <div className="h-full w-6 shrink-0 bg-amber-300/88" />
        <div className="h-full flex-1 bg-sky-500/75" />
      </div>

      <div className={PANEL}>
        {showTail ? (
          <div
            className="pointer-events-none absolute left-0 top-[38%] z-10 -translate-x-full -translate-y-1/2"
            aria-hidden
          >
            <div
              className="h-0 w-0 border-y-[11px] border-r-[13px] border-y-transparent"
              style={{
                borderRightColor: tailFill,
                filter: "drop-shadow(-3px 3px 5px rgba(0,0,0,0.12))",
              }}
            />
          </div>
        ) : null}

        <div className="flex items-center border-b border-zinc-900/10 px-6 py-3.5 sm:px-7">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-600">
            RECEPTION · {stepLabel}
          </span>
        </div>

        <div className="min-h-[7rem] px-6 py-6 sm:min-h-[7.5rem] sm:px-8 sm:py-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={line}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -6 }
              }
              transition={{
                duration: reduceMotion ? 0.12 : duration.fast,
                ease: easeOutExpo,
              }}
              className="text-pretty text-[1.08rem] font-medium leading-[1.65] text-zinc-900 sm:text-lg sm:leading-[1.72]"
            >
              {line}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-end border-t border-zinc-900/10 px-6 py-4 sm:px-8">
          <motion.button
            type="button"
            onClick={onContinue}
            disabled={disabled}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
            transition={{ type: "tween", duration: 0.15 }}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-50 shadow-sm transition-colors hover:bg-zinc-800 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-200"
          >
            {continueLabel}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
