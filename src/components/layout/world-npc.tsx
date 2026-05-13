"use client";

import type { WorldSectionId } from "@/lib/world-interactions";
import { useWorldDialog } from "./world-dialogue";

type WorldNpcProps = {
  sectionId: WorldSectionId;
  /** Visual alignment for checkpoint layout */
  align?: "start" | "end" | "center";
  className?: string;
};

/**
 * Lightweight sign / NPC trigger — opens route dialogue for this section.
 */
export function WorldNpc({ sectionId, align = "start", className = "" }: WorldNpcProps) {
  const { open } = useWorldDialog();
  const justify =
    align === "end"
      ? "justify-end"
      : align === "center"
        ? "justify-center"
        : "justify-start";

  return (
    <div className={`flex ${justify} ${className}`}>
      <button
        type="button"
        onClick={() => open(sectionId)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open(sectionId);
          }
        }}
        className="group relative flex max-w-[min(100%,220px)] flex-col items-center gap-1 rounded-lg border border-zinc-700/70 bg-zinc-950/80 px-3 py-2 text-left shadow-lg outline-none backdrop-blur-md transition-[border-color,transform] hover:border-zinc-500/70 hover:bg-zinc-900/85 focus-visible:ring-2 focus-visible:ring-sky-500/50 active:scale-[0.98] [image-rendering:pixelated]"
      >
        <span className="sr-only">Open tip for this route stop</span>
        {/* Tiny pixel-style figure */}
        <span className="relative block h-7 w-5" aria-hidden>
          <span className="absolute bottom-0 left-1/2 h-2 w-4 -translate-x-1/2 rounded-[2px] bg-[#1d4ed8]" />
          <span className="absolute bottom-2 left-1/2 h-3 w-[14px] -translate-x-1/2 rounded-[2px] bg-[#f8fafc]" />
          <span className="absolute bottom-4 left-1/2 h-2.5 w-3 -translate-x-1/2 rounded-[2px] bg-[#fca5a5]" />
          <span className="absolute bottom-[22px] left-1/2 h-1.5 w-[18px] -translate-x-1/2 rounded-t-sm bg-[#64748b]" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400 group-hover:text-zinc-200">
          Route tip
        </span>
      </button>
    </div>
  );
}
