"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

const LINES = [
  "Welcome to the Portfolio Center.",
  "Trainer Richin’s engineering profile is ready for review.",
  "I can route you through projects, experience, systems, or the full journey.",
  "Ready to enter the portfolio?",
];

type Destination = {
  label: string;
  sub: string;
  target: string;
  key: string;
};

const DESTINATIONS: Destination[] = [
  { label: "Enter Portfolio", sub: "Full overview",       target: "#home",       key: "1" },
  { label: "Projects",        sub: "Engineering work",    target: "#projects",   key: "2" },
  { label: "Experience",      sub: "Career timeline",     target: "#experience", key: "3" },
  { label: "Resume",          sub: "Download or preview", target: "#resume",     key: "4" },
  { label: "Stay Here",       sub: "Keep exploring",      target: "",            key: "5" },
];

type GameDialogueProps = {
  open: boolean;
  lineIndex: number;
  showChoices: boolean;
  onAdvance: () => void;
  onSelect: (target: string) => void;
};

export function GameDialogue({
  open,
  lineIndex,
  showChoices,
  onAdvance,
  onSelect,
}: GameDialogueProps) {
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && !showChoices) {
      continueRef.current?.focus();
    }
  }, [open, showChoices, lineIndex]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="game-dialogue"
          role="dialog"
          aria-modal="false"
          aria-label="Reception dialogue"
          style={{
            position: "absolute",
            insetInline: 0,
            bottom: 0,
            zIndex: 40,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Classic RPG dialogue panel */}
          <div
            className="mx-4 mb-4 overflow-hidden rounded-xl border-[3px] border-[#2f2a2a] bg-[#fff8df] shadow-[0_6px_0_#8a5a44,0_18px_32px_rgba(117,66,40,0.32)]"
          >
            {/* Accent strip */}
            <div className="flex h-[7px] border-b-2 border-[#2f2a2a]">
              <div className="flex-1 bg-[#ef6f65]" />
              <div className="flex-1 bg-[#ffd166]" />
              <div className="flex-1 bg-[#79c7e8]" />
            </div>

            <div className="px-5 py-4 sm:px-6">
              {!showChoices ? (
                <>
                  {/* Speaker label */}
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#a64644]">
                    Receptionist
                  </p>
                  {/* Line */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={lineIndex}
                      className="mb-4 min-h-[48px] text-[18px] font-semibold leading-relaxed text-[#2f2a2a] sm:text-[20px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {LINES[lineIndex]}
                    </motion.p>
                  </AnimatePresence>
                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#9a735a]">
                      {String(lineIndex + 1).padStart(2, "0")} / {String(LINES.length).padStart(2, "0")}
                    </span>
                    <button
                      ref={continueRef}
                      type="button"
                      onClick={onAdvance}
                      className="rounded-md border-2 border-[#2f2a2a] bg-[#ef6f65] px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_3px_0_#9f3b38] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2a2a] active:translate-y-0 active:shadow-none"
                    >
                      {lineIndex < LINES.length - 1 ? "Continue" : "Choose route"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#a64644]">
                    Where would you like to go?
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {DESTINATIONS.map((d, i) => (
                      <DestButton
                        key={d.target + d.label}
                        dest={d}
                        autoFocus={i === 0}
                        onSelect={onSelect}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DestButton({
  dest,
  autoFocus,
  onSelect,
}: {
  dest: Destination;
  autoFocus: boolean;
  onSelect: (target: string) => void;
}) {
  return (
    <button
      type="button"
      autoFocus={autoFocus}
      onClick={() => onSelect(dest.target)}
      className="group flex flex-col items-start rounded-lg border-2 border-[#2f2a2a] bg-[#fffdf1] p-3 text-left shadow-[0_3px_0_#d8b178] transition-transform hover:-translate-y-0.5 hover:bg-[#fff3c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2a2a] active:translate-y-0 active:shadow-none"
    >
      <span className="mb-0.5 font-mono text-[9px] uppercase tracking-widest text-[#a64644]">
        [{dest.key}]
      </span>
      <span className="text-[13px] font-bold text-[#2f2a2a]">{dest.label}</span>
      <span className="text-[11px] text-[#8a5a44]">{dest.sub}</span>
    </button>
  );
}
