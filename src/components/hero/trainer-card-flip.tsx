"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { HERO_HEADSHOT } from "@/content/site-images";

const FLIP_MS = 0.62;
const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  "~2h → ~10m incident triage",
  "~95% less data per sync",
  "11M+ submissions processed",
  "9 LLM-agent security findings fixed",
] as const;

const FUN_FACTS = [
  "Lifts consistently - U/L split, currently cutting",
  "Loves music",
  "Builds product-focused systems",
  "Purdue CS",
  "I love Costco",
] as const;

const FRONT_CHIPS = ["Backend", "AI/ML", "Systems", "Product"] as const;

type TrainerCardFlipProps = {
  className?: string;
};

export function TrainerCardFlip({ className = "" }: TrainerCardFlipProps) {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const flipped = finePointer ? hovered || pinned : pinned;

  const togglePinned = useCallback(() => {
    setPinned((p) => !p);
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePinned();
      }
    },
    [togglePinned],
  );

  const ariaLabel = flipped
    ? "Trainer card showing quick stats and facts. Activate to return to profile."
    : "Trainer profile card for Richin Mrudul. Activate, or hover with a mouse, to view quick stats and facts.";

  return (
    <div className={`relative mx-auto w-full max-w-[300px] ${className}`}>
      <div
        className="pointer-events-none absolute -inset-6 rounded-[28px] bg-gradient-to-b from-amber-100/25 via-emerald-100/15 to-transparent blur-2xl"
        aria-hidden
      />

      <div className="[perspective:1240px]">
        <motion.div
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={ariaLabel}
          className="trainer-card-flip-shell group relative w-full cursor-pointer rounded-2xl border border-[#716854]/45 bg-[#dfe3cf]/95 shadow-[0_0_0_1px_rgba(255,255,255,0.55),0_24px_56px_-28px_rgba(39,49,38,0.48),inset_0_1px_0_0_rgba(255,255,255,0.72)] outline-none backdrop-blur-md transition-[transform,box-shadow] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-[#9b313b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6efd9] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(113,104,84,0.2),0_28px_64px_-26px_rgba(39,49,38,0.42)] active:translate-y-0"
          onClick={togglePinned}
          onKeyDown={onKeyDown}
          onMouseEnter={() => finePointer && setHovered(true)}
          onMouseLeave={() => finePointer && setHovered(false)}
        >
          {!reduceMotion ? (
            <motion.div
              className="relative aspect-[3/4] w-full [transform-style:preserve-3d]"
              initial={false}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: FLIP_MS, ease: EASE }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <CardFace side="front" />
              <CardFace side="back" />
            </motion.div>
          ) : (
            <div className="relative aspect-[3/4] w-full">
              <AnimatePresence initial={false} mode="wait">
                {flipped ? (
                  <motion.div
                    key="back"
                    role="presentation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <CardFaceStatic side="back" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="front"
                    role="presentation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <CardFaceStatic side="front" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function CardFace({ side }: { side: "front" | "back" }) {
  const rotateY = side === "front" ? 0 : 180;
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-2xl p-4 sm:p-5 [backface-visibility:hidden]"
      style={{
        transform: `rotateY(${rotateY}deg)`,
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      <CardInner side={side} />
    </div>
  );
}

function CardFaceStatic({ side }: { side: "front" | "back" }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl p-4 sm:p-5">
      <CardInner side={side} />
    </div>
  );
}

function CardInner({ side }: { side: "front" | "back" }) {
  return (
    <>
      <div
        className="trainer-card-sheen-layer pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(255,255,247,0.72) 48%, rgba(151,183,157,0.28) 52%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(73,83,65,0.09) 1px, transparent 1px), linear-gradient(180deg, rgba(73,83,65,0.07) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
        aria-hidden
      />

      <div className="relative flex h-full min-h-0 flex-col">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500/90 shadow-[0_0_6px_rgba(244,63,94,0.45)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500/85 shadow-[0_0_6px_rgba(14,165,233,0.4)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/85 shadow-[0_0_6px_rgba(251,191,36,0.35)]" />
          </span>
          <span className="flex gap-1" aria-hidden>
            <span className="trainer-card-led h-1 w-1 rounded-full bg-emerald-500/80" />
            <span
              className="trainer-card-led h-1 w-1 rounded-full bg-emerald-500/80"
              style={{ animationDelay: "0.4s" }}
            />
          </span>
        </div>

        {side === "front" ? (
          <>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#59634f]">
              Trainer profile
            </p>

            <div className="relative mx-auto mt-3 aspect-square w-[min(100%,200px)] shrink-0 overflow-hidden rounded-xl border-2 border-[#6d725e]/45 bg-[#cbd3b6] shadow-[0_0_0_3px_rgba(255,255,245,0.45),inset_0_0_0_1px_rgba(255,255,255,0.55)]">
              <Image
                src={HERO_HEADSHOT.src}
                alt={HERO_HEADSHOT.alt}
                fill
                sizes="200px"
                className="object-cover object-center"
              />
            </div>

            <h2 className="mt-4 text-center text-xl font-semibold tracking-tight text-[#273229] sm:text-2xl">
              Richin Mrudul
            </h2>
            <p className="mt-1 text-center font-mono text-[11px] leading-snug text-[#4e5b4c]">
              Purdue CS · Machine Intelligence
            </p>

            <ul
              className="mt-4 flex flex-wrap justify-center gap-1.5"
              aria-label="Focus tags"
            >
              {FRONT_CHIPS.map((c) => (
                <li key={c}>
                  <span className="inline-block rounded-md border border-[#65715d]/35 bg-[#f5f1dc]/70 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#465145]">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#59634f]">
              Quick stats
            </p>

            <div className="mt-3 min-h-0 flex-1 space-y-4 overflow-y-auto pr-0.5">
              <div>
                <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#7c493f]">
                  Impact
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm leading-snug text-[#303b32]">
                  {STATS.map((s) => (
                    <li key={s} className="flex gap-2 border-l-2 border-[#7f8b71]/45 pl-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#7c493f]">
                  Fun facts
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-[#4f594d]">
                  {FUN_FACTS.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#8d3d45]/70" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-3 border-t border-[#66705d]/20 pt-3 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-[#69705e]">
              Press or hover to flip back
            </p>
          </>
        )}
      </div>
    </>
  );
}
