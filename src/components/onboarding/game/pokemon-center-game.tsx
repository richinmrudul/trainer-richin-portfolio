"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GameRoom } from "./game-room";
import { TrainerSprite } from "./trainer-sprite";
import { InteractionPrompt } from "./interaction-prompt";
import { GameDialogue } from "./game-dialogue";
import { MobileEnterFallback } from "./mobile-enter-fallback";
import { usePlayerMovement } from "./use-player-movement";
import { ROOM_H, ROOM_W } from "./game-config";

const TOTAL_LINES = 4;

type PokemonCenterGameProps = {
  onExit: (target: string) => void;
  onSkip: () => void;
};

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", check);
    return () => mq.removeEventListener("change", check);
  }, []);
  return mobile;
}

export function PokemonCenterGame({ onExit, onSkip }: PokemonCenterGameProps) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  const openDialogue = useCallback(() => {
    if (dialogueOpen) return;
    setLineIndex(0);
    setShowChoices(false);
    setDialogueOpen(true);
  }, [dialogueOpen]);

  const player = usePlayerMovement({
    disabled: dialogueOpen || isMobile,
    onInteract: openDialogue,
  });

  const advanceLine = useCallback(() => {
    if (lineIndex < TOTAL_LINES - 1) {
      setLineIndex((i) => i + 1);
    } else {
      setShowChoices(true);
    }
  }, [lineIndex]);

  const handleSelect = useCallback(
    (target: string) => {
      if (!target) {
        setDialogueOpen(false);
        return;
      }
      onExit(target);
    },
    [onExit],
  );

  // Keyboard: Enter advances dialogue, number keys choose routes, Escape skips.
  useEffect(() => {
    if (isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onSkip();
        return;
      }
      if (dialogueOpen && showChoices && /^[1-5]$/.test(e.key)) {
        e.preventDefault();
        const targets = ["#home", "#projects", "#experience", "#resume", ""];
        const target = targets[Number(e.key) - 1];
        if (target !== undefined) handleSelect(target);
        return;
      }
      if (dialogueOpen && !showChoices && e.key === "Enter") {
        const el = e.target as HTMLElement | null;
        if (el?.closest("button")) return;
        e.preventDefault();
        advanceLine();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile, dialogueOpen, showChoices, advanceLine, handleSelect, onSkip]);

  if (isMobile) {
    return <MobileEnterFallback onSelect={handleSelect} onSkip={onSkip} />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_45%,#fff1bd_0%,#fed7aa_34%,#111827_78%)]">
      {/* Keyboard hint */}
      {!dialogueOpen ? (
        <p
          className="absolute select-none font-mono text-[10px] uppercase tracking-[0.18em] text-[#2f2a2a]/70 pointer-events-none"
          style={{ top: `calc(50% - ${ROOM_H / 2}px - 34px)` }}
        >
          WASD / arrows to move · Press E to talk
        </p>
      ) : null}

      {/* Classic black handheld frame */}
      <div
        className="relative overflow-hidden rounded-[22px] border-[14px] border-black bg-black shadow-[0_28px_80px_-22px_rgba(0,0,0,0.85),inset_0_0_0_2px_rgba(255,255,255,0.12)]"
        style={{ width: ROOM_W + 28, height: ROOM_H + 28 }}
      >
        <div className="overflow-hidden rounded-lg">
          <GameRoom>
            {/* Player */}
            <div
              style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}
              aria-hidden
            >
              <TrainerSprite
                x={player.x}
                y={player.y}
                direction={player.direction}
                moving={player.moving}
              />
            </div>

            {/* Interaction prompt */}
            <InteractionPrompt visible={player.inZone && !dialogueOpen} />

            {/* Dialogue */}
            <GameDialogue
              open={dialogueOpen}
              lineIndex={lineIndex}
              showChoices={showChoices}
              onAdvance={advanceLine}
              onSelect={handleSelect}
            />
          </GameRoom>
        </div>
      </div>

      {/* Controls legend below room */}
      {!dialogueOpen ? (
        <div className="mt-3 flex gap-4 select-none pointer-events-none" aria-hidden>
          {(["W","A","S","D"] as const).map((k) => (
            <kbd
              key={k}
              className="rounded border border-[#2f2a2a]/30 bg-[#fff8df] px-2 py-1 font-mono text-[10px] text-[#2f2a2a]"
            >
              {k}
            </kbd>
          ))}
          <span className="font-mono text-[10px] text-[#2f2a2a]/60">·</span>
          <kbd className="rounded border border-[#2f2a2a]/30 bg-[#fff8df] px-2 py-1 font-mono text-[10px] text-[#2f2a2a]">
            E
          </kbd>
        </div>
      ) : null}

      {/* Skip intro */}
      <button
        type="button"
        onClick={onSkip}
        className="absolute left-4 top-4 rounded-full border border-black/20 bg-white/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60"
        aria-label={reduced ? "Skip to portfolio" : "Skip intro"}
      >
        Skip intro
      </button>
    </div>
  );
}
