"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { PokedexSection } from "@/components/sections/pokedex-section";

type WorldPokedexOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function WorldPokedexOverlay({ open, onClose }: WorldPokedexOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onKey]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="pokedex-overlay"
          className="pointer-events-auto fixed inset-0 z-[70] flex flex-col p-3 pb-[max(5rem,env(safe-area-inset-bottom))] pt-14 sm:p-6 sm:pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close Pokédex backdrop"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Technical Pokédex"
            className="relative z-[1] mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-hidden rounded-2xl border-2 border-rose-700/40 bg-zinc-950/95 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-rose-900/30 bg-rose-950/20 px-4 py-2.5 sm:px-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-200/90">
                Technical Pokédex · Q
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-lg border border-zinc-600/80 bg-zinc-900/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-zinc-200 outline-none hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-rose-400/50"
              >
                Close · Esc
              </button>
            </div>
            <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
              <PokedexSection embedded />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
