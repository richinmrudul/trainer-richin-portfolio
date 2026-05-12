"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GameRoom } from "./game-room";
import { TrainerSprite } from "./trainer-sprite";
import { InteractionPrompt } from "./interaction-prompt";
import { GameDialogue } from "./game-dialogue";
import { MobileEnterFallback } from "./mobile-enter-fallback";
import { usePlayerMovement } from "./use-player-movement";
import {
  ROOM_H,
  ROOM_W,
  VISITOR_FUN_FACTS,
  VISITOR_HINT_LINE,
} from "./game-config";

const RECEPTION_LINE_COUNT = 4;

type PokemonCenterGameProps = {
  onExit: (target: string) => void;
  onSkip: () => void;
};

/**
 * Phone-style UI only on small viewports with coarse pointer.
 * Touch laptops / tablets in landscape keep the desktop mini-game (WASD + E).
 */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 640px)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const check = () => setMobile(narrow.matches && coarse.matches);
    check();
    narrow.addEventListener("change", check);
    coarse.addEventListener("change", check);
    return () => {
      narrow.removeEventListener("change", check);
      coarse.removeEventListener("change", check);
    };
  }, []);
  return mobile;
}

export function PokemonCenterGame({ onExit, onSkip }: PokemonCenterGameProps) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [dialogueKind, setDialogueKind] = useState<
    "receptionist" | "simple" | "contact"
  >("receptionist");
  const [lineIndex, setLineIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [simpleLine, setSimpleLine] = useState("");

  const closeDialogue = useCallback(() => {
    setDialogueOpen(false);
    setShowChoices(false);
    setLineIndex(0);
    setSimpleLine("");
  }, []);

  const openDialogue = useCallback(
    (npcId: string) => {
      if (dialogueOpen) return;
      if (npcId === "receptionist") {
        setDialogueKind("receptionist");
        setLineIndex(0);
        setShowChoices(false);
      } else if (npcId === "visitor-hint") {
        setDialogueKind("simple");
        setSimpleLine(VISITOR_HINT_LINE);
      } else if (npcId === "visitor-facts") {
        setDialogueKind("simple");
        const ix = Math.floor(Math.random() * VISITOR_FUN_FACTS.length);
        setSimpleLine(VISITOR_FUN_FACTS[ix] ?? "");
      } else if (npcId === "visitor-contact") {
        setDialogueKind("contact");
        setSimpleLine("Want to connect with Trainer Richin?");
      } else {
        return;
      }
      setDialogueOpen(true);
    },
    [dialogueOpen],
  );

  const player = usePlayerMovement({
    disabled: dialogueOpen || isMobile,
    onInteract: openDialogue,
  });

  const advanceLine = useCallback(() => {
    if (dialogueKind === "simple" || dialogueKind === "contact") {
      closeDialogue();
      return;
    }
    if (lineIndex < RECEPTION_LINE_COUNT - 1) {
      setLineIndex((i) => i + 1);
    } else {
      setShowChoices(true);
    }
  }, [dialogueKind, lineIndex, closeDialogue]);

  const handleSelect = useCallback(
    (target: string) => {
      if (!target) {
        closeDialogue();
        return;
      }
      onExit(target);
    },
    [onExit, closeDialogue],
  );

  useEffect(() => {
    if (isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (dialogueOpen) closeDialogue();
        return;
      }
      if (dialogueOpen && showChoices && dialogueKind === "receptionist" && /^[1-5]$/.test(e.key)) {
        e.preventDefault();
        const targets = ["#home", "#projects", "#experience", "#resume", ""];
        const target = targets[Number(e.key) - 1];
        if (target !== undefined) handleSelect(target);
        return;
      }
      if (dialogueOpen && !showChoices && e.key === "Enter") {
        const el = e.target as HTMLElement | null;
        if (el?.closest("button") || el?.closest("a")) return;
        e.preventDefault();
        advanceLine();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile, dialogueOpen, showChoices, dialogueKind, advanceLine, handleSelect, closeDialogue]);

  if (isMobile) {
    return <MobileEnterFallback onSelect={handleSelect} onSkip={onSkip} />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_45%,#fff1bd_0%,#fed7aa_34%,#111827_78%)]">
      {!dialogueOpen ? (
        <p
          className="absolute select-none font-mono text-[10px] uppercase tracking-[0.18em] text-[#2f2a2a]/70 pointer-events-none"
          style={{ top: `calc(50% - ${ROOM_H / 2}px - 34px)` }}
        >
          WASD / arrows to move · Press E to talk
        </p>
      ) : null}

      <div
        className="relative overflow-hidden rounded-[22px] border-[14px] border-black bg-black shadow-[0_28px_80px_-22px_rgba(0,0,0,0.85),inset_0_0_0_2px_rgba(255,255,255,0.12)]"
        style={{ width: ROOM_W + 28, height: ROOM_H + 28 }}
      >
        <div className="overflow-hidden rounded-lg">
          <GameRoom>
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

            <InteractionPrompt
              nearNpcId={player.nearNpcId}
              visible={Boolean(player.nearNpcId) && !dialogueOpen}
            />

            <GameDialogue
              open={dialogueOpen}
              mode={dialogueKind}
              lineIndex={lineIndex}
              showChoices={showChoices}
              speakerLabel={dialogueKind === "contact" ? "Guide" : "Visitor"}
              simpleLine={simpleLine}
              onAdvance={advanceLine}
              onSelect={handleSelect}
            />
          </GameRoom>
        </div>
      </div>

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
