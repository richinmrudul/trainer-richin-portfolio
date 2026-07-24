"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { overlayLifecycle } from "@/lib/motion";
import { PokemonCenterGame } from "./game/pokemon-center-game";
import { RouteExitTransition } from "./route-exit-transition";

const DESTINATION_LABELS: Record<string, string> = {
  "#home": "ROUTE 01 · TRAINER RICHIN",
  "#projects": "PROJECT PARTY",
  "#experience": "REGION JOURNEY",
  "#pokedex": "TECHNICAL POKÉDEX",
  "#resume": "TRAINER RECORDS",
  "#contact": "LEAGUE GATE",
};

export function PokemonCenterIntro() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [exitTarget, setExitTarget] = useState("#home");
  const scrollTargetRef = useRef<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const routeStageRef = useRef<HTMLDivElement>(null);

  // Treat the intro as a true modal: lock the page and remove its main content
  // from the accessibility tree until every intro exit path has completed.
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    const main = document.getElementById("portfolio-main");
    const mainWasInert = main?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (main) main.inert = true;

    return () => {
      document.body.style.overflow = prev;
      if (main) main.inert = mainWasInert;
    };
  }, [mounted]);

  // Keep keyboard focus inside the intro while it is the active modal.
  useEffect(() => {
    if (!mounted) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const initialFocus = dialog.querySelector<HTMLElement>(focusableSelector);
    (initialFocus ?? dialog).focus({ preventScroll: true });

    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hidden && element.getClientRects().length > 0);

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", containFocus);
    return () => document.removeEventListener("keydown", containFocus);
  }, [mounted]);

  // Show the route reveal briefly, then let AnimatePresence remove the overlay.
  useEffect(() => {
    if (!isExiting) return;
    routeStageRef.current?.focus({ preventScroll: true });
    const t = window.setTimeout(
      () => setVisible(false),
      reduced ? 140 : 650,
    );
    return () => window.clearTimeout(t);
  }, [isExiting, reduced]);

  const scrollToHash = useCallback(
    (hash: string) => {
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() => {
        const section = document.getElementById(id);
        if (!section) return;
        section.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });

        const focusTarget =
          section.querySelector<HTMLElement>("h1, h2, h3") ?? section;
        const previousTabIndex = focusTarget.getAttribute("tabindex");
        focusTarget.setAttribute("tabindex", "-1");
        focusTarget.focus({ preventScroll: true });
        focusTarget.addEventListener(
          "blur",
          () => {
            if (previousTabIndex === null) {
              focusTarget.removeAttribute("tabindex");
            } else {
              focusTarget.setAttribute("tabindex", previousTabIndex);
            }
          },
          { once: true },
        );
      });
    },
    [reduced],
  );

  const beginExit = useCallback((hash: string) => {
    const target = hash || "#home";
    if (scrollTargetRef.current) return;
    scrollTargetRef.current = target;
    setExitTarget(target);
    window.history.replaceState(null, "", target);
    setIsExiting(true);
  }, []);

  const onExitComplete = useCallback(() => {
    const hash = scrollTargetRef.current;
    scrollTargetRef.current = null;
    setMounted(false);
    requestAnimationFrame(() => scrollToHash(hash ?? "#home"));
  }, [scrollToHash]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950">
      <AnimatePresence onExitComplete={onExitComplete}>
        {visible ? (
          <motion.div
            ref={dialogRef}
            key="pokemon-center-intro"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio Center introduction"
            tabIndex={-1}
            className="absolute inset-0 overflow-hidden"
            variants={overlayLifecycle}
            initial={reduced ? false : "hidden"}
            animate={reduced ? undefined : "visible"}
            exit={
              reduced
                ? { opacity: 1, transition: { duration: 0 } }
                : {
                    opacity: 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }
            }
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

            {isExiting ? (
              <RouteExitTransition
                ref={routeStageRef}
                destinationLabel={
                  DESTINATION_LABELS[exitTarget] ??
                  DESTINATION_LABELS["#home"]
                }
              />
            ) : (
              <PokemonCenterGame
                onExit={beginExit}
                onSkip={() => beginExit("#home")}
              />
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
