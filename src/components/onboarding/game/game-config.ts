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

/**
 * Collision rectangles.
 * Player AABB must not overlap any of these.
 */
export const COLLISIONS: Rect[] = [
  // Top wall / back service area
  { x: 0, y: 0, w: ROOM_W, h: TILE },
  // Bottom wall
  { x: 0, y: ROOM_H - TILE, w: ROOM_W, h: TILE },
  // Left wall
  { x: 0, y: 0, w: TILE, h: ROOM_H },
  // Right wall
  { x: ROOM_W - TILE, y: 0, w: TILE, h: ROOM_H },
  // Salmon reception counter across the upper third
  { x: TILE * 3, y: TILE * 3, w: TILE * 16, h: TILE * 2 },
  // Nurse/reception area behind the counter
  { x: TILE * 9, y: TILE * 1.5, w: TILE * 4, h: TILE * 1.5 },
  // Top-left and top-right plant blocks
  { x: TILE, y: TILE * 1.5, w: TILE * 2, h: TILE * 2 },
  { x: ROOM_W - TILE * 3, y: TILE * 1.5, w: TILE * 2, h: TILE * 2 },
  // Side sofa/furniture blocks
  { x: TILE, y: TILE * 7, w: TILE * 2, h: TILE * 2 },
  { x: ROOM_W - TILE * 3, y: TILE * 7, w: TILE * 2, h: TILE * 2 },
  // Small planters near the lower corners
  { x: TILE * 3, y: TILE * 12, w: TILE * 1.5, h: TILE * 1.5 },
  { x: ROOM_W - TILE * 4.5, y: TILE * 12, w: TILE * 1.5, h: TILE * 1.5 },
];

/**
 * Interaction zone — directly in front of the counter.
 * Player must be inside to get the "Press E" prompt and open dialogue.
 */
export const INTERACTION_ZONE: Rect = {
  x: TILE * 6,
  y: TILE * 5,
  w: TILE * 10,
  h: TILE * 2,
};

/** Pixel-perfect AABB overlap check */
export function rectsOverlap(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}
