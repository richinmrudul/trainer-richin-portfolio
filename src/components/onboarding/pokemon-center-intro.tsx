"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { overlayLifecycle, fadeIn } from "@/lib/motion";
import { DialogueBox } from "./dialogue-box";
import {
  DestinationMenu,
  defaultDestinations,
} from "./destination-menu";
import { SystemStatusPanel } from "./system-status-panel";

const INTRO_KEY = "trainer-richin-intro-completed";
const NURSE_SRC = "/characters/nursej.png";

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
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(212 212 216) 1px, transparent 1px), linear-gradient(to bottom, rgb(212 212 216) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
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

function NursePortrait({ compact }: { compact?: boolean }) {
  const h = compact
    ? "h-[100px] max-h-[18vh] sm:h-[120px]"
    : "h-[140px] max-h-[22vh] sm:h-[180px] md:h-[200px]";

  return (
    <div className="flex shrink-0 flex-col items-center justify-end pb-0.5 md:justify-end">
      <span className="sr-only">Receptionist presenting dialogue</span>
      <Image
        src={NURSE_SRC}
        alt=""
        width={200}
        height={280}
        priority
        sizes="(max-width: 768px) 38vw, 200px"
        className={`w-auto select-none object-contain object-bottom ${h}`}
        style={{
          filter:
            "brightness(1.12) saturate(1.08) drop-shadow(0 14px 22px rgba(0,0,0,0.32))",
        }}
        draggable={false}
      />
    </div>
  );
}

export function PokemonCenterIntro() {
  const reduceMotion = useReducedMotion();
  const [gate, setGate] = useState<GateState>("boot");
  const [replayAvailable, setReplayAvailable] = useState(false);
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
        setReplayAvailable(Boolean(done));
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

  const openIntro = useCallback(() => {
    setPhase("dialogue");
    setDialogueIndex(0);
    setMenuFocusIndex(null);
    setVisible(true);
    setGate("on");
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
    setReplayAvailable(true);
    setGate("off");
    if (hash) scrollToHash(hash);
  }, [scrollToHash]);

  return (
    <>
      {gate === "boot" ? <BootShell /> : null}

      {gate === "on" ? (
        <div className="fixed inset-0 z-[100] flex h-[100dvh] flex-col bg-zinc-950">
          <AnimatePresence onExitComplete={onExitComplete}>
            {visible ? (
              <motion.div
                key="pokemon-center-intro"
                role="dialog"
                aria-modal="true"
                aria-labelledby="intro-dialogue-label"
                className="flex h-full min-h-0 flex-1 flex-col overflow-hidden"
                variants={overlayLifecycle}
                initial="hidden"
                animate="visible"
                exit="leave"
              >
                <BootGrid />

                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-red-950/12 via-transparent to-sky-950/10"
                  aria-hidden
                />

                <div className="relative z-20 flex shrink-0 items-center justify-between gap-2 border-b border-zinc-800/40 bg-zinc-950/60 px-3 py-2 backdrop-blur-md sm:px-5 sm:py-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => beginExit("#home")}
                      className="rounded-lg border border-zinc-700/80 bg-zinc-950/70 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:px-3 sm:text-[10px]"
                    >
                      Skip intro
                    </button>
                    <button
                      type="button"
                      onClick={() => beginExit("#resume")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-950/70 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:gap-2 sm:px-3 sm:text-[10px]"
                    >
                      <FileText className="h-3 w-3 shrink-0" aria-hidden />
                      <span className="hidden sm:inline">View résumé</span>
                      <span className="sm:hidden">Résumé</span>
                    </button>
                  </div>
                  <SystemStatusPanel
                    compact
                    className="hidden max-w-[min(100%,280px)] sm:block"
                  />
                </div>

                <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-5 sm:px-6 sm:py-8">
                  <span id="intro-dialogue-label" className="sr-only">
                    Portfolio Center reception dialogue
                  </span>

                  {phase === "dialogue" ? (
                    <motion.div
                      initial={reduceMotion ? false : "hidden"}
                      animate="visible"
                      variants={fadeIn}
                      className="flex w-full max-w-4xl flex-col items-center justify-center gap-1 md:flex-row md:items-end md:justify-center md:gap-1 md:pl-2"
                    >
                      <div className="flex shrink-0 justify-center md:-mb-1 md:mr-1 md:justify-end">
                        <NursePortrait />
                      </div>
                      <div className="w-full min-w-0 md:max-w-2xl md:flex-1 lg:max-w-2xl">
                        <DialogueBox
                          line={DIALOGUE_LINES[dialogueIndex]}
                          stepLabel={`${String(dialogueIndex + 1).padStart(2, "0")} / ${String(DIALOGUE_LINES.length).padStart(2, "0")}`}
                          continueLabel={
                            dialogueIndex < DIALOGUE_LINES.length - 1
                              ? "Continue"
                              : "Choose destination"
                          }
                          onContinue={advanceDialogue}
                          tailSide="left"
                          className="max-w-none"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={reduceMotion ? false : "hidden"}
                      animate="visible"
                      variants={fadeIn}
                      className="flex w-full max-w-4xl flex-col items-center justify-center gap-5 md:flex-row md:items-start md:gap-6"
                    >
                      <div className="flex shrink-0 justify-center md:pt-1">
                        <NursePortrait compact />
                      </div>
                      <div className="w-full min-w-0 md:flex-1">
                        <DestinationMenu
                          destinations={defaultDestinations}
                          selectedIndex={menuFocusIndex}
                          onSelect={(target) => beginExit(target)}
                          onHoverIndex={setMenuFocusIndex}
                          className="max-w-full md:max-w-2xl"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ) : null}

      {replayAvailable && gate !== "on" ? (
        <motion.button
          type="button"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
          }
          onClick={openIntro}
          className="fixed bottom-4 left-4 z-[90] rounded-full border border-zinc-700/80 bg-zinc-950/85 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:border-zinc-500 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
          aria-label="Open reception onboarding"
        >
          Reception
        </motion.button>
      ) : null}
    </>
  );
}
