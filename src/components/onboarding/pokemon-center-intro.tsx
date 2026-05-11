"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { overlayLifecycle } from "@/lib/motion";
import { PokemonCenterGame } from "./game/pokemon-center-game";

export function PokemonCenterIntro() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const scrollTargetRef = useRef<string | null>(null);

  // Lock scroll while intro is mounted
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mounted]);

  // Trigger unmount after exit animation
  useEffect(() => {
    if (!isExiting) return;
    const t = window.setTimeout(
      () => setVisible(false),
      reduced ? 200 : 750,
    );
    return () => window.clearTimeout(t);
  }, [isExiting, reduced]);

  const scrollToHash = useCallback(
    (hash: string) => {
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      });
    },
    [reduced],
  );

  const beginExit = useCallback((hash: string) => {
    scrollTargetRef.current = hash || "#home";
    setIsExiting(true);
  }, []);

  const onExitComplete = useCallback(() => {
    const hash = scrollTargetRef.current;
    scrollTargetRef.current = null;
    setIsExiting(false);
    scrollToHash(hash ?? "#home");
    setMounted(false);
  }, [scrollToHash]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950">
      <AnimatePresence onExitComplete={onExitComplete}>
        {visible ? (
          <motion.div
            key="pokemon-center-intro"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio Center introduction"
            className="absolute inset-0 overflow-hidden"
            variants={overlayLifecycle}
            initial="hidden"
            animate="visible"
            exit="leave"
          >
            {/* Subtle grid background */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 31px,rgba(255,255,255,1) 31px,rgba(255,255,255,1) 32px)," +
                  "repeating-linear-gradient(90deg,transparent,transparent 31px,rgba(255,255,255,1) 31px,rgba(255,255,255,1) 32px)",
              }}
            />

            <PokemonCenterGame onExit={beginExit} onSkip={() => beginExit("#home")} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
