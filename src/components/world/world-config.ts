import type { Rect } from "@/components/onboarding/game/game-config";
import { rectsOverlap } from "@/components/onboarding/game/game-config";

/**
 * Intrinsic logical size of the route map (match art / tune).
 * All positions, walkables, and spawn use this coordinate space.
 */
export const WORLD_WIDTH = 1246;
export const WORLD_HEIGHT = 840;

/** Player hitbox in world coordinates (tune). */
export const PLAYER_WORLD_W = 28;
export const PLAYER_WORLD_H = 34;

/** Temporary: draw walkable rects + hitbox + coords when tuning paths. */
export const SHOW_WORLD_DEBUG = false;

/** Reserved for future NPC wiring (dialogue / modals). */
export type WorldNpcDef = {
  id: string;
  name: string;
  dialogue: string[];
};

export function getWorldNpcById(_id?: string): WorldNpcDef | undefined {
  void _id;
  return undefined;
}

export type WorldModalKind =
  | "about"
  | "projects"
  | "experience"
  | "resume"
  | "contact";

export type WalkableRect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

function toRect(w: WalkableRect): Rect {
  return { x: w.x, y: w.y, w: w.width, h: w.height };
}

/**
 * Walkable route / bridge areas (world px). Keep overlapping so the route feels connected.
 * Tune rects to match `/world/reference.webp`.
 */
export const WALKABLE_RECTS: WalkableRect[] = [
  /* Bottom horizontal — main sandy path along south */
  { id: "path-south", x: 260, y: 688, width: 960, height: 140 },
  /* Right vertical — up from bottom-right */
  { id: "path-east", x: 1020, y: 120, width: 200, height: 620 },
  /* Diagonal-ish link south path → east column */
  { id: "path-se-join", x: 880, y: 600, width: 320, height: 140 },
  /* Mid clearing / bridge band */
  { id: "path-mid", x: 420, y: 400, width: 560, height: 120 },
  /* Upper west approach (optional connector) */
  { id: "path-nw", x: 120, y: 160, width: 360, height: 100 },
];

/**
 * Spawn point: bottom-right route path (tune x/y here).
 * Not on rocks/water/trees — keep inside `path-south` / `path-east` overlap zone.
 */
export const PLAYER_SPAWN = {
  x: 1088,
  y: 718,
};

export const WORLD_MOVE_SPEED = 135;

export function walkableBoxes(): Rect[] {
  return WALKABLE_RECTS.map(toRect);
}

/** Movement allowed iff player AABB intersects at least one walkable rect and stays in map bounds. */
export function isPlayerPlacementValid(playerRect: Rect): boolean {
  if (
    playerRect.x < 0 ||
    playerRect.y < 0 ||
    playerRect.x + playerRect.w > WORLD_WIDTH ||
    playerRect.y + playerRect.h > WORLD_HEIGHT
  ) {
    return false;
  }
  return walkableBoxes().some((w) => rectsOverlap(playerRect, w));
}

export { rectsOverlap };
