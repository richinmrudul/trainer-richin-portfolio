"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ResumeSection } from "@/components/sections/resume-section";
import type { WorldModalKind } from "./world-config";

type WorldModalProps = {
  kind: WorldModalKind | null;
  onClose: () => void;
};

const titles: Record<WorldModalKind, string> = {
  about: "Trainer profile",
  projects: "Project team",
  experience: "Experience route",
  resume: "Trainer file",
  contact: "Save station",
};

export function WorldModal({ kind, onClose }: WorldModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!kind) return;
    closeRef.current?.focus();
  }, [kind]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!kind) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [kind, onKey]);

  return (
    <AnimatePresence>
      {kind ? (
        <motion.div
          key={kind}
          className="pointer-events-auto fixed inset-0 z-[60] flex items-end justify-center p-3 pb-[max(5.5rem,env(safe-area-inset-bottom))] sm:items-center sm:p-6 sm:pb-6"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close modal backdrop"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="world-modal-title"
            className="relative z-[1] flex max-h-[min(88vh,860px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-950/92 shadow-[0_28px_100px_-24px_rgba(0,0,0,0.92)] backdrop-blur-xl"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-800/90 px-4 py-3 sm:px-5">
              <h2
                id="world-modal-title"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400"
              >
                {titles[kind]}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-lg border border-zinc-700/80 bg-zinc-900/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-300 outline-none hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-sky-500/50"
              >
                Close · Esc
              </button>
            </div>
            <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5 sm:py-5">
              {kind === "about" ? <HeroSection embedded /> : null}
              {kind === "projects" ? <ProjectsSection embedded /> : null}
              {kind === "experience" ? <ExperienceSection embedded /> : null}
              {kind === "resume" ? <ResumeSection embedded /> : null}
              {kind === "contact" ? <ContactSection embedded /> : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
