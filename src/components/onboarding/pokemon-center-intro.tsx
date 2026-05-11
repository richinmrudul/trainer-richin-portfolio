"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { overlayLifecycle, softScale, fadeIn } from "@/lib/motion";
import { DialogueBox } from "./dialogue-box";
import {
  DestinationMenu,
  defaultDestinations,
} from "./destination-menu";
import { SystemStatusPanel } from "./system-status-panel";

const INTRO_KEY = "trainer-richin-intro-completed";

const DIALOGUE_LINES = [
  "Welcome to the Portfolio Center.",
  "Trainer Richin's engineering profile is ready for review.",
  "I can route you through projects, experience, systems, or the full journey.",
  "Where would you like to go?",
] as const;

type GateState = "boot" | "off" | "on";

function BootGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.045]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(212 212 216) 1px, transparent 1px), linear-gradient(to bottom, rgb(212 212 216) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
      aria-hidden
    />
  );
}

function BootShell() {
  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950" aria-hidden>
      <BootGrid />
    </div>
  );
}

export function PokemonCenterIntro() {
  const reduceMotion = useReducedMotion();
  const [gate, setGate] = useState<GateState>("boot");
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"dialogue" | "menu">("dialogue");
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [menuFocusIndex, setMenuFocusIndex] = useState<number | null>(null);
  const scrollTargetRef = useRef<string | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const done = window.localStorage.getItem(INTRO_KEY);
        setGate(done ? "off" : "on");
      } catch {
        setGate("on");
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (gate !== "on" || !visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gate, visible]);

  const scrollToHash = useCallback(
    (hash: string) => {
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    },
    [reduceMotion],
  );

  const beginExit = useCallback((hash: string) => {
    try {
      window.localStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
    scrollTargetRef.current = hash;
    setVisible(false);
  }, []);

  const advanceDialogue = useCallback(() => {
    if (dialogueIndex < DIALOGUE_LINES.length - 1) {
      setDialogueIndex((i) => i + 1);
    } else {
      setPhase("menu");
    }
  }, [dialogueIndex]);

  useEffect(() => {
    if (gate !== "on") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        beginExit("#home");
        return;
      }

      if (phase === "dialogue" && e.key === "Enter") {
        const t = e.target as HTMLElement | null;
        if (t?.closest("button")) return;
        e.preventDefault();
        advanceDialogue();
      }

      if (phase === "menu" && /^[1-4]$/.test(e.key)) {
        e.preventDefault();
        const n = Number(e.key) - 1;
        const dest = defaultDestinations[n];
        if (dest) beginExit(dest.target);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gate, phase, advanceDialogue, beginExit]);

  const onExitComplete = useCallback(() => {
    const hash = scrollTargetRef.current;
    scrollTargetRef.current = null;
    setGate("off");
    if (hash) scrollToHash(hash);
  }, [scrollToHash]);

  if (gate === "off") {
    return null;
  }

  if (gate === "boot") {
    return <BootShell />;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950">
      <AnimatePresence onExitComplete={onExitComplete}>
        {visible && (
          <motion.div
            key="pokemon-center-intro"
            role="dialog"
            aria-modal="true"
            aria-labelledby="intro-dialogue-label"
            className="absolute inset-0 flex flex-col overflow-hidden"
            variants={overlayLifecycle}
            initial="hidden"
            animate="visible"
            exit="leave"
          >
            <BootGrid />

            {/* Overhead light band */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-100/[0.07] to-transparent"
              aria-hidden
            />

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-red-950/25 via-transparent to-sky-950/20"
              aria-hidden
            />

            <div className="pointer-events-none absolute -bottom-[18%] left-1/2 h-[55%] w-[140%] max-w-[1400px] -translate-x-1/2 rounded-[50%] border border-zinc-800/40 bg-zinc-900/25 backdrop-blur-[2px]" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/25 via-transparent to-zinc-950/85" />

            <div className="relative z-10 flex items-start justify-between gap-3 px-4 pt-5 sm:px-8 sm:pt-8">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => beginExit("#home")}
                  className="rounded-lg border border-zinc-700/80 bg-zinc-950/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 backdrop-blur-sm transition-colors hover:border-zinc-600 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                >
                  Skip intro
                </button>
                <button
                  type="button"
                  onClick={() => beginExit("#resume")}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/80 bg-zinc-950/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 backdrop-blur-sm transition-colors hover:border-zinc-600 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  View résumé
                </button>
              </div>
              <div className="hidden max-w-[min(100%,320px)] sm:block">
                <SystemStatusPanel />
              </div>
            </div>

            <div className="relative z-10 mt-4 flex justify-center px-4 sm:hidden">
              <SystemStatusPanel />
            </div>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-end pb-8 pt-10 sm:pb-12 sm:pt-16">
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                variants={softScale}
                className="flex w-full max-w-4xl flex-col items-center gap-10 px-4 sm:gap-12"
              >
                <div className="hidden w-full items-center justify-center sm:flex">
                  <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent" />
                </div>

                <span id="intro-dialogue-label" className="sr-only">
                  Portfolio Center reception dialogue
                </span>

                {phase === "dialogue" ? (
                  <motion.div
                    initial={reduceMotion ? false : "hidden"}
                    animate="visible"
                    variants={fadeIn}
                    className="w-full"
                  >
                    <DialogueBox
                      line={DIALOGUE_LINES[dialogueIndex]}
                      stepLabel={`${String(dialogueIndex + 1).padStart(2, "0")} / ${String(DIALOGUE_LINES.length).padStart(2, "0")}`}
                      continueLabel={
                        dialogueIndex < DIALOGUE_LINES.length - 1
                          ? "Continue"
                          : "Choose destination"
                      }
                      onContinue={advanceDialogue}
                    />
                  </motion.div>
                ) : (
                  <DestinationMenu
                    destinations={defaultDestinations}
                    selectedIndex={menuFocusIndex}
                    onSelect={(target) => beginExit(target)}
                    onHoverIndex={setMenuFocusIndex}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
