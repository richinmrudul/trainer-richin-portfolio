"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { getWorldNpcById } from "./world-config";

type WorldDialogueProps = {
  npcId: string | null;
  lineIndex: number;
  onAdvance: () => void;
  onClose: () => void;
  onCompleteOpenModal: () => void;
};

/**
 * Bottom Pokémon-style dialogue — Enter continues, Escape closes without modal.
 */
export function WorldDialogue({
  npcId,
  lineIndex,
  onAdvance,
  onClose,
  onCompleteOpenModal,
}: WorldDialogueProps) {
  const continueRef = useRef<HTMLButtonElement>(null);
  const npc = npcId ? getWorldNpcById(npcId) : undefined;
  const lines = npc?.dialogue ?? [];
  const line = lines[lineIndex] ?? "";
  const isLast = lineIndex >= lines.length - 1;
  const open = Boolean(npcId && lines.length > 0);

  useEffect(() => {
    if (open) continueRef.current?.focus();
  }, [open, lineIndex, npcId]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Enter") {
        const t = e.target as HTMLElement | null;
        if (t?.closest("button") || t?.closest("textarea")) return;
        e.preventDefault();
        if (isLast) onCompleteOpenModal();
        else onAdvance();
      }
    },
    [open, isLast, onAdvance, onClose, onCompleteOpenModal],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="world-dialogue"
          role="dialog"
          aria-modal="true"
          aria-labelledby="world-dialogue-speaker"
          className="pointer-events-auto absolute inset-x-0 bottom-0 z-[40] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:pb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border-[3px] border-[#2f2a2a] bg-[#fff8df] shadow-[0_6px_0_#8a5a44,0_18px_32px_rgba(117,66,40,0.32)]">
            <div className="flex h-[7px] border-b-2 border-[#2f2a2a]">
              <div className="flex-1 bg-[#ef6f65]" />
              <div className="flex-1 bg-[#ffd166]" />
              <div className="flex-1 bg-[#79c7e8]" />
            </div>
            <div className="px-5 py-4 sm:px-6">
              <p
                id="world-dialogue-speaker"
                className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#a64644]"
              >
                {npc?.name ?? "…"}
              </p>
              <p className="mb-4 min-h-[44px] text-pretty text-[17px] font-semibold leading-relaxed text-[#2f2a2a] sm:text-[19px]">
                {line}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] text-[#9a735a]">
                  {String(lineIndex + 1).padStart(2, "0")} /{" "}
                  {String(lines.length).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border-2 border-[#2f2a2a] bg-[#fffdf1] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#2f2a2a] shadow-[0_3px_0_#d8b178] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2a2a] active:translate-y-0 active:shadow-none"
                  >
                    Close
                  </button>
                  <button
                    ref={continueRef}
                    type="button"
                    onClick={() =>
                      isLast ? onCompleteOpenModal() : onAdvance()
                    }
                    className="rounded-md border-2 border-[#2f2a2a] bg-[#ef6f65] px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_3px_0_#9f3b38] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2a2a] active:translate-y-0 active:shadow-none"
                  >
                    {isLast ? "Open" : "Continue"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
