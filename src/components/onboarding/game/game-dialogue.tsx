"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

import { links } from "@/content/links";

const RECEPTION_LINES = [
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

export type GameDialogueMode = "receptionist" | "simple" | "contact";

type GameDialogueProps = {
  open: boolean;
  mode: GameDialogueMode;
  /** Receptionist flow */
  lineIndex: number;
  showChoices: boolean;
  /** Simple NPC one-shot */
  speakerLabel?: string;
  simpleLine?: string;
  onAdvance: () => void;
  onSelect: (target: string) => void;
};

export function GameDialogue({
  open,
  mode,
  lineIndex,
  showChoices,
  speakerLabel = "Visitor",
  simpleLine = "",
  onAdvance,
  onSelect,
}: GameDialogueProps) {
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && !showChoices) {
      continueRef.current?.focus();
    }
  }, [open, showChoices, lineIndex, mode]);

  const isSimple = mode === "simple";
  const isContact = mode === "contact";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key={`game-dialogue-${mode}`}
          role="dialog"
          aria-modal="false"
          aria-label={
            isContact ? "Contact dialogue" : isSimple ? "Visitor dialogue" : "Reception dialogue"
          }
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
          <div
            className="mx-4 mb-4 overflow-hidden rounded-xl border-[3px] border-[#2f2a2a] bg-[#fff8df] shadow-[0_6px_0_#8a5a44,0_18px_32px_rgba(117,66,40,0.32)]"
          >
            <div className="flex h-[7px] border-b-2 border-[#2f2a2a]">
              <div className="flex-1 bg-[#ef6f65]" />
              <div className="flex-1 bg-[#ffd166]" />
              <div className="flex-1 bg-[#79c7e8]" />
            </div>

            <div className="px-5 py-4 sm:px-6">
              {isContact ? (
                <>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
                    {speakerLabel}
                  </p>
                  <motion.p
                    key={simpleLine}
                    className="mb-4 min-h-[40px] text-[18px] font-semibold leading-relaxed text-[#2f2a2a] sm:text-[20px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.18 }}
                  >
                    {simpleLine}
                  </motion.p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <ContactLink
                      href={`mailto:${links.emails[0]}`}
                      label="Email"
                      icon={<IconMail />}
                    />
                    <ContactLink
                      href={links.github}
                      label="GitHub"
                      icon={<IconGitHub />}
                      external
                    />
                    <ContactLink
                      href={links.linkedIn}
                      label="LinkedIn"
                      icon={<IconLinkedIn />}
                      external
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      ref={continueRef}
                      type="button"
                      onClick={onAdvance}
                      className="rounded-md border-2 border-[#2f2a2a] bg-zinc-800 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_3px_0_#171717] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2a2a] active:translate-y-0 active:shadow-none"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : isSimple ? (
                <>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6d28d9]">
                    {speakerLabel}
                  </p>
                  <motion.p
                    key={simpleLine}
                    className="mb-4 min-h-[48px] text-[18px] font-semibold leading-relaxed text-[#2f2a2a] sm:text-[20px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.18 }}
                  >
                    {simpleLine}
                  </motion.p>
                  <div className="flex justify-end">
                    <button
                      ref={continueRef}
                      type="button"
                      onClick={onAdvance}
                      className="rounded-md border-2 border-[#2f2a2a] bg-[#7c3aed] px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_3px_0_#5b21b6] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2a2a] active:translate-y-0 active:shadow-none"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : !showChoices ? (
                <>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#a64644]">
                    Receptionist
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={lineIndex}
                      className="mb-4 min-h-[48px] text-[18px] font-semibold leading-relaxed text-[#2f2a2a] sm:text-[20px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {RECEPTION_LINES[lineIndex]}
                    </motion.p>
                  </AnimatePresence>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#9a735a]">
                      {String(lineIndex + 1).padStart(2, "0")} / {String(RECEPTION_LINES.length).padStart(2, "0")}
                    </span>
                    <button
                      ref={continueRef}
                      type="button"
                      onClick={onAdvance}
                      className="rounded-md border-2 border-[#2f2a2a] bg-[#ef6f65] px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_3px_0_#9f3b38] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2a2a] active:translate-y-0 active:shadow-none"
                    >
                      {lineIndex < RECEPTION_LINES.length - 1 ? "Continue" : "Choose route"}
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

function ContactLink({
  href,
  label,
  icon,
  external,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="inline-flex items-center gap-2 rounded-lg border-2 border-[#2f2a2a] bg-[#fffdf1] px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2f2a2a] shadow-[0_3px_0_#d8b178] transition-transform hover:-translate-y-0.5 hover:bg-[#fff3c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2a2a] active:translate-y-0 active:shadow-none"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#2f2a2a]" aria-hidden>
        {icon}
      </span>
      {label}
    </a>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M4 6h16v12H4V6zm0 0 8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
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
