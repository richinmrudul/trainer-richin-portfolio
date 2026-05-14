"use client";

import { useMouseDepth } from "./use-mouse-depth";

/**
 * Normalized pointer parallax (shared global listener via `useMouseDepth`).
 * Movement is clamped to `maxParallaxPx` per axis — keep small (4–10px) for UI polish.
 */
export function useMousePosition(maxParallaxPx = 8) {
  return useMouseDepth(maxParallaxPx);
}
