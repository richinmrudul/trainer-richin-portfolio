"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  SHOW_WORLD_DEBUG,
  WALKABLE_RECTS,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  PLAYER_WORLD_H,
  PLAYER_WORLD_W,
} from "./world-config";

type WorldMapProps = {
  stageWidth: number;
  stageHeight: number;
  children: ReactNode;
};

/**
 * Full map visible: stage is letterboxed to fit viewport (contain), no camera pan.
 */
export function WorldMap({ stageWidth, stageHeight, children }: WorldMapProps) {
  const sw = Math.max(1, stageWidth);
  const sh = Math.max(1, stageHeight);

  return (
    <div
      className="relative overflow-hidden rounded-md border border-zinc-800/80 bg-[#2f4530] shadow-inner"
      style={{
        width: sw,
        height: sh,
        imageRendering: "pixelated",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/world/reference.webp"
          alt=""
          width={WORLD_WIDTH}
          height={WORLD_HEIGHT}
          className="h-full w-full max-h-full max-w-full object-contain object-center [image-rendering:pixelated]"
          draggable={false}
          priority
          unoptimized
        />
      </div>

      {SHOW_WORLD_DEBUG
        ? WALKABLE_RECTS.map((w) => (
            <div
              key={w.id}
              className="pointer-events-none absolute z-[2] border-2 border-emerald-400/70 bg-emerald-500/15"
              style={{
                left: `${(w.x / WORLD_WIDTH) * 100}%`,
                top: `${(w.y / WORLD_HEIGHT) * 100}%`,
                width: `${(w.width / WORLD_WIDTH) * 100}%`,
                height: `${(w.height / WORLD_HEIGHT) * 100}%`,
              }}
              title={w.id}
            />
          ))
        : null}

      <div className="absolute inset-0 z-[3]">{children}</div>
    </div>
  );
}

export type { WorldMapProps };

/** Scale onboarding sprite (32×40) to match world hitbox on this stage. */
export function getTrainerScale(stageWidth: number): number {
  return (PLAYER_WORLD_W * stageWidth) / WORLD_WIDTH / 32;
}

export { WORLD_WIDTH, WORLD_HEIGHT, PLAYER_WORLD_W, PLAYER_WORLD_H };
