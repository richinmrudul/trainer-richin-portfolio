"use client";

type WorldControlsHudProps = {
  isMobile: boolean;
};

export function WorldControlsHud({ isMobile }: WorldControlsHudProps) {
  if (isMobile) {
    return (
      <div className="pointer-events-auto shrink-0 border-t border-zinc-800/90 bg-zinc-950/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
          Enter portfolio menu · coming next
        </p>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto shrink-0 border-t border-zinc-800/80 bg-zinc-950/90 px-3 py-2 pb-[max(0.35rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:px-5">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
        <span>WASD / Arrows · Move</span>
        <span className="text-zinc-600">NPCs · next</span>
        <span className="text-zinc-600">Esc · when dialogs exist</span>
      </div>
    </div>
  );
}
