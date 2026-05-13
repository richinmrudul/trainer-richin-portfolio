"use client";

import { TrainerSprite } from "@/components/onboarding/game/trainer-sprite";
import type { Direction } from "@/components/onboarding/game/use-player-movement";
import {
  PLAYER_WORLD_H,
  PLAYER_WORLD_W,
  SHOW_WORLD_DEBUG,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "./world-config";
import type { WorldPlayerState } from "./use-world-movement";
import { getTrainerScale } from "./world-map";

type WorldPlayerProps = {
  player: WorldPlayerState;
  stageWidth: number;
};

export function WorldPlayer({ player, stageWidth }: WorldPlayerProps) {
  const dir: Direction =
    player.direction === "idle" ? "down" : player.direction;
  const scale = getTrainerScale(stageWidth);

  return (
    <div
      className="absolute z-[5]"
      style={{
        left: `${(player.x / WORLD_WIDTH) * 100}%`,
        top: `${(player.y / WORLD_HEIGHT) * 100}%`,
        width: `${(PLAYER_WORLD_W / WORLD_WIDTH) * 100}%`,
        height: `${(PLAYER_WORLD_H / WORLD_HEIGHT) * 100}%`,
        imageRendering: "pixelated",
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <TrainerSprite
          x={0}
          y={0}
          direction={dir}
          moving={player.moving}
          sprinting={false}
        />
      </div>

      {SHOW_WORLD_DEBUG ? (
        <div
          className="pointer-events-none absolute inset-0 z-[10] border-2 border-amber-400/90 bg-amber-400/10"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
