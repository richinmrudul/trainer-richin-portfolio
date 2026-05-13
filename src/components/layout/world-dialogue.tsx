"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { WorldSectionId } from "@/lib/world-interactions";
import { WORLD_NPC_LINES } from "@/lib/world-interactions";

type DialogPayload = {
  sectionId: WorldSectionId;
} | null;

type WorldDialogContextValue = {
  open: (sectionId: WorldSectionId) => void;
  close: () => void;
};

const WorldDialogContext = createContext<WorldDialogContextValue | null>(null);

export function useWorldDialog() {
  const ctx = useContext(WorldDialogContext);
  if (!ctx) {
    throw new Error("useWorldDialog must be used within WorldDialogProvider");
  }
  return ctx;
}

export function WorldDialogProvider({ children }: { children: React.ReactNode }) {
  const [payload, setPayload] = useState<DialogPayload>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const open = useCallback((sectionId: WorldSectionId) => {
    setPayload({ sectionId });
  }, []);

  const close = useCallback(() => {
    setPayload(null);
  }, []);

  useEffect(() => {
    if (!payload) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [payload, close]);

  useEffect(() => {
    if (!payload) return;
    closeBtnRef.current?.focus();
  }, [payload]);

  const titleId = useId();
  const copy = payload ? WORLD_NPC_LINES[payload.sectionId] : null;

  return (
    <WorldDialogContext.Provider value={{ open, close }}>
      {children}
      {payload && copy ? (
        <div
          className="fixed inset-0 z-[85] flex items-end justify-center p-4 pb-[max(5rem,env(safe-area-inset-bottom))] sm:items-center sm:p-6"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-md rounded-2xl border border-zinc-700/80 bg-zinc-950/95 p-5 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl [image-rendering:auto]"
          >
            <button
              ref={closeBtnRef}
              type="button"
              className="absolute right-3 top-3 rounded-lg px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-zinc-500 outline-none hover:bg-zinc-800/80 hover:text-zinc-200 focus-visible:ring-2 focus-visible:ring-sky-500/50"
              onClick={close}
            >
              Close
            </button>
            <p
              id={titleId}
              className="pr-16 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500"
            >
              {copy.title}
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-200">
              {copy.body}
            </p>
            <button
              type="button"
              className="mt-5 w-full rounded-xl border border-zinc-600/80 bg-zinc-900/80 py-2.5 text-sm font-medium text-zinc-100 outline-none transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-sky-500/50"
              onClick={close}
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
    </WorldDialogContext.Provider>
  );
}
