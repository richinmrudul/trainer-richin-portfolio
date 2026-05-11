export const TILE = 32;

/** Logical room dimensions in tiles */
export const ROOM_COLS = 22;
export const ROOM_ROWS = 16;

export const ROOM_W = ROOM_COLS * TILE; // 704
export const ROOM_H = ROOM_ROWS * TILE; // 512

/** Player dimensions */
export const PLAYER_W = 32;
export const PLAYER_H = 40;

/** Pixels per second */
export const MOVE_SPEED = 132;

/** Spawn point - near the entrance at bottom center */
export const SPAWN_X = ROOM_W / 2 - PLAYER_W / 2;
export const SPAWN_Y = ROOM_H - TILE * 3;

export type Rect = { x: number; y: number; w: number; h: number };

export type GameNpcKind = "receptionist" | "hint" | "facts";

export type GameNpc = {
  id: string;
  x: number;
  y: number;
  kind: GameNpcKind;
  direction?: "up" | "down" | "left" | "right";
  clothing?: "purple" | "red" | "blue";
  interactionZone: Rect;
  /** Solid hitbox; use w/h 0 to skip (none of ours skip) */
  collision: Rect;
};

/**
 * NPCs in draw / interaction priority order (first match wins for E/Enter).
 * Receptionist first so counter zone takes precedence when overlapping.
 */
export const GAME_NPCS: GameNpc[] = [
  {
    id: "receptionist",
    x: ROOM_W / 2 - 18,
    y: TILE * 1.55,
    kind: "receptionist",
    direction: "down",
    clothing: "red",
    interactionZone: {
      x: TILE * 6,
      y: TILE * 5,
      w: TILE * 10,
      h: TILE * 2,
    },
    collision: {
      x: TILE * 9,
      y: TILE * 1.5,
      w: TILE * 4,
      h: TILE * 1.5,
    },
  },
  {
    id: "visitor-hint",
    x: TILE * 3 + 2,
    y: TILE * 5.35,
    kind: "hint",
    direction: "right",
    clothing: "purple",
    interactionZone: {
      x: TILE * 2.5,
      y: TILE * 5.25,
      w: TILE * 2.75,
      h: TILE * 2.25,
    },
    collision: {
      x: TILE * 3 + 2,
      y: TILE * 5.85,
      w: 24,
      h: 18,
    },
  },
  {
    id: "visitor-facts",
    x: ROOM_W - TILE * 4 - 2,
    y: TILE * 5.35,
    kind: "facts",
    direction: "left",
    clothing: "purple",
    interactionZone: {
      x: ROOM_W - TILE * 5.25,
      y: TILE * 5.25,
      w: TILE * 2.75,
      h: TILE * 2.25,
    },
    collision: {
      x: ROOM_W - TILE * 4 - 2,
      y: TILE * 5.85,
      w: 24,
      h: 18,
    },
  },
];

/** Hint NPC line (fixed) */
export const VISITOR_HINT_LINE =
  "Talk to the lady in the back for more information! You might find something you like...";

/** Fun facts for visitor-facts — pick in client event handler only */
export const VISITOR_FUN_FACTS: string[] = [
  "Fun fact: Richin has helped optimize systems handling 8.5M+ submissions.",
  "Fun fact: This portfolio was built like a product, not a template.",
  "Fun fact: The projects here span AI, backend systems, ML, and product engineering.",
  "Fun fact: You can press Escape at any time to skip the intro.",
  "Fun fact: FitTrack generated 100+ workout plans in its first few weeks.",
  "Fun fact: The Data Mine pipeline reduced collection time by 96%.",
];

const STATIC_COLLISIONS: Rect[] = [
  { x: 0, y: 0, w: ROOM_W, h: TILE },
  { x: 0, y: ROOM_H - TILE, w: ROOM_W, h: TILE },
  { x: 0, y: 0, w: TILE, h: ROOM_H },
  { x: ROOM_W - TILE, y: 0, w: TILE, h: ROOM_H },
  { x: TILE * 3, y: TILE * 3, w: TILE * 16, h: TILE * 2 },
  { x: TILE, y: TILE * 1.5, w: TILE * 2, h: TILE * 2 },
  { x: ROOM_W - TILE * 3, y: TILE * 1.5, w: TILE * 2, h: TILE * 2 },
  { x: TILE, y: TILE * 7, w: TILE * 2, h: TILE * 2 },
  { x: ROOM_W - TILE * 3, y: TILE * 7, w: TILE * 2, h: TILE * 2 },
  { x: TILE * 3, y: TILE * 12, w: TILE * 1.5, h: TILE * 1.5 },
  { x: ROOM_W - TILE * 4.5, y: TILE * 12, w: TILE * 1.5, h: TILE * 1.5 },
];

/** All collisions including NPC hitboxes */
export const COLLISIONS: Rect[] = [
  ...STATIC_COLLISIONS,
  ...GAME_NPCS.map((n) => n.collision),
];

/** Pixel-perfect AABB overlap check */
export function rectsOverlap(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

/** Which NPC the player can talk to (priority order in GAME_NPCS) */
export function getInteractNpcId(px: number, py: number): string | null {
  const playerRect = { x: px, y: py, w: PLAYER_W, h: PLAYER_H };
  for (const npc of GAME_NPCS) {
    if (rectsOverlap(playerRect, npc.interactionZone)) return npc.id;
  }
  return null;
}

export function getNpcById(id: string): GameNpc | undefined {
  return GAME_NPCS.find((n) => n.id === id);
}
