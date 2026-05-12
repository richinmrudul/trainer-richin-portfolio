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

export type GameNpcKind = "receptionist" | "hint" | "facts" | "contact";

export type GameNpc = {
  id: string;
  x: number;
  y: number;
  kind: GameNpcKind;
  direction?: "up" | "down" | "left" | "right";
  clothing?: "purple" | "red" | "blue" | "black";
  interactionZone: Rect;
  /** Solid hitbox; use w/h 0 to skip (none of ours skip) */
  collision: Rect;
};

/**
 * NPCs in draw / interaction priority order (first match wins for E/Enter).
 * Receptionist first so counter zone takes precedence when overlapping.
 * Contact before side visitors: hint/facts zones overlap the contact strip in Y;
 * contact wins when standing by the bottom-left guide so E opens links, not trivia.
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
    id: "visitor-contact",
    /** Slightly above & left of bottom-left floor plant (PlantBlock TILE*3, TILE*12) */
    x: TILE * 2 + 8,
    y: TILE * 9 + 8,
    kind: "contact",
    direction: "right",
    clothing: "black",
    interactionZone: {
      x: TILE,
      y: TILE * 9,
      w: TILE * 4,
      h: TILE * 3,
    },
    collision: {
      x: TILE * 2 + 6,
      y: TILE * 10 + 4,
      w: 22,
      h: 16,
    },
  },
  {
    id: "visitor-hint",
    /** To the right of the left bench (bench ends at x = TILE + TILE * 2) */
    x: TILE * 3 + 6,
    y: TILE * 6 + 14,
    kind: "hint",
    direction: "left",
    clothing: "purple",
    interactionZone: {
      x: TILE * 2.25,
      y: TILE * 6.5,
      w: TILE * 2.75,
      h: TILE * 2.25,
    },
    collision: {
      x: TILE * 3 + 4,
      y: TILE * 6 + 22,
      w: 22,
      h: 16,
    },
  },
  {
    id: "visitor-facts",
    /** To the left of the right bench (bench starts at x = ROOM_W - TILE * 3) */
    x: ROOM_W - TILE * 3 - 36,
    y: TILE * 6 + 14,
    kind: "facts",
    direction: "right",
    clothing: "purple",
    interactionZone: {
      x: ROOM_W - TILE * 5.25,
      y: TILE * 6.5,
      w: TILE * 2.75,
      h: TILE * 2.25,
    },
    collision: {
      x: ROOM_W - TILE * 3 - 34,
      y: TILE * 6 + 22,
      w: 22,
      h: 16,
    },
  },
];

/** Hint NPC line (fixed) */
export const VISITOR_HINT_LINE =
  "Talk to the lady in the back for more information! You might find something you like...";

/**
 * Random trivia for visitor-facts — plain sentences, no label prefix.
 * Picked only in a client event handler (not during SSR render).
 */
export const VISITOR_FUN_FACTS: string[] = [
  "Most people cannot lick their own elbow without cheating.",
  "Honey never spoils—archaeologists have eaten 3,000-year-old honey from tombs.",
  "A group of flamingos is called a flamboyance.",
  "Octopuses have three hearts and blue blood.",
  "Bananas are berries, but strawberries are not.",
  "Wombat poop is cube-shaped.",
  "Sharks have been around longer than trees.",
  "Hot water freezes faster than cold water under the right conditions—it's called the Mpemba effect.",
  "A day on Venus is longer than a year on Venus.",
  "Humans share a surprising amount of DNA with bananas—roughly 60%.",
  "There are more ways to shuffle a deck of cards than atoms on Earth.",
  "Cows have best friends and can get stressed when separated from them.",
  "The shortest recorded war lasted about 38 minutes between Britain and Zanzibar in 1896.",
  "Scotland's national animal is the unicorn.",
  "A jiffy is an actual unit of time: about 1/100th of a second in computing.",
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

/**
 * When multiple zones overlap the player box, pick one explicitly so the contact
 * guide wins over side visitors without relying on GAME_NPCS array order alone.
 */
const INTERACT_PRIORITY: readonly string[] = [
  "receptionist",
  "visitor-contact",
  "visitor-hint",
  "visitor-facts",
];

/** Which NPC the player can talk to (overlap + priority) */
export function getInteractNpcId(px: number, py: number): string | null {
  const playerRect = { x: px, y: py, w: PLAYER_W, h: PLAYER_H };
  const hits: string[] = [];
  for (const npc of GAME_NPCS) {
    if (rectsOverlap(playerRect, npc.interactionZone)) hits.push(npc.id);
  }
  if (hits.length === 0) return null;
  for (const id of INTERACT_PRIORITY) {
    if (hits.includes(id)) return id;
  }
  return hits[0] ?? null;
}

export function getNpcById(id: string): GameNpc | undefined {
  return GAME_NPCS.find((n) => n.id === id);
}
