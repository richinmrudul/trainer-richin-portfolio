"use client";

type WorldInteractionPromptProps = {
  /** Map-space anchor (usually player top-center) */
  anchorX: number;
  anchorY: number;
  visible: boolean;
};

/**
 * Floating “E / Enter · Talk” near the player when an NPC zone is active.
 */
export function WorldInteractionPrompt({
  anchorX,
  anchorY,
  visible,
}: WorldInteractionPromptProps) {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute z-[8] -translate-x-1/2"
      style={{ left: anchorX, top: anchorY - 46 }}
      aria-hidden
    >
      <div className="flex items-center gap-1.5 rounded-lg border border-zinc-500/70 bg-zinc-950/92 px-2.5 py-1.5 shadow-lg backdrop-blur-sm">
        <span className="rounded border border-zinc-600 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-200">
          E
        </span>
        <span className="text-zinc-500">/</span>
        <span className="rounded border border-zinc-600 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-200">
          Enter
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-300">
          · Talk
        </span>
      </div>
    </div>
  );
}
