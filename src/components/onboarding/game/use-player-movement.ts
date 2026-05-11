"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  COLLISIONS,
  INTERACTION_ZONE,
  MOVE_SPEED,
  PLAYER_H,
  PLAYER_W,
  ROOM_H,
  ROOM_W,
  SPAWN_X,
  SPAWN_Y,
  TILE,
  rectsOverlap,
} from "./game-config";

export type Direction = "up" | "down" | "left" | "right" | "idle";

export type PlayerState = {
  x: number;
  y: number;
  direction: Direction;
  moving: boolean;
  inZone: boolean;
};

type UsePlayerMovementOptions = {
  disabled?: boolean;
  onInteract?: () => void;
};

const MOVE_KEYS = new Set([
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
  "w", "a", "s", "d",
  "W", "A", "S", "D",
]);

export function usePlayerMovement({
  disabled = false,
  onInteract,
}: UsePlayerMovementOptions = {}) {
  const held = useRef(new Set<string>());
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const posRef = useRef({ x: SPAWN_X, y: SPAWN_Y });
  const disabledRef = useRef(disabled);
  const onInteractRef = useRef(onInteract);

  // Keep refs up to date without causing effect re-runs
  useEffect(() => { disabledRef.current = disabled; }, [disabled]);
  useEffect(() => { onInteractRef.current = onInteract; }, [onInteract]);

  const [player, setPlayer] = useState<PlayerState>({
    x: SPAWN_X,
    y: SPAWN_Y,
    direction: "down",
    moving: false,
    inZone: false,
  });

  const isInZone = useCallback((x: number, y: number) => {
    return rectsOverlap({ x, y, w: PLAYER_W, h: PLAYER_H }, INTERACTION_ZONE);
  }, []);

  const tryMove = useCallback((nx: number, ny: number): { x: number; y: number } => {
    const playerRect = { x: nx, y: ny, w: PLAYER_W, h: PLAYER_H };
    for (const rect of COLLISIONS) {
      if (rectsOverlap(playerRect, rect)) {
        const slideX = { x: nx, y: posRef.current.y, w: PLAYER_W, h: PLAYER_H };
        if (!COLLISIONS.some((r) => rectsOverlap(slideX, r))) {
          return { x: nx, y: posRef.current.y };
        }
        const slideY = { x: posRef.current.x, y: ny, w: PLAYER_W, h: PLAYER_H };
        if (!COLLISIONS.some((r) => rectsOverlap(slideY, r))) {
          return { x: posRef.current.x, y: ny };
        }
        return posRef.current;
      }
    }
    return { x: nx, y: ny };
  }, []);

  // The game loop — stored in a ref so it can self-schedule without useCallback dependency issues
  const loopRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    loopRef.current = (time: number) => {
      if (disabledRef.current) { rafRef.current = null; return; }

      const dt = lastTimeRef.current == null
        ? 0
        : Math.min((time - lastTimeRef.current) / 1000, 0.08);
      lastTimeRef.current = time;

      const keys = held.current;
      const up    = keys.has("ArrowUp")    || keys.has("w") || keys.has("W");
      const down  = keys.has("ArrowDown")  || keys.has("s") || keys.has("S");
      const left  = keys.has("ArrowLeft")  || keys.has("a") || keys.has("A");
      const right = keys.has("ArrowRight") || keys.has("d") || keys.has("D");

      let dx = (right ? 1 : 0) - (left ? 1 : 0);
      let dy = (down  ? 1 : 0) - (up   ? 1 : 0);
      const moving = dx !== 0 || dy !== 0;

      if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

      let { x, y } = posRef.current;
      let direction: Direction = "idle";

      if (moving) {
        const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
        const nx = clamp(x + dx * MOVE_SPEED * dt, TILE, ROOM_W - TILE - PLAYER_W);
        const ny = clamp(y + dy * MOVE_SPEED * dt, TILE, ROOM_H - TILE - PLAYER_H);
        const next = tryMove(nx, ny);
        x = next.x; y = next.y;
        posRef.current = { x, y };
        direction = dy < 0 ? "up" : dy > 0 ? "down" : dx < 0 ? "left" : "right";
      }

      const inZone = isInZone(x, y);

      setPlayer((prev) => {
        const samePos   = Math.abs(prev.x - x) < 0.5 && Math.abs(prev.y - y) < 0.5;
        const sameMove  = prev.moving === moving;
        const sameDir   = prev.direction === (moving ? direction : prev.direction);
        const sameZone  = prev.inZone === inZone;
        if (samePos && sameMove && sameDir && sameZone) return prev;
        return { x, y, direction: moving ? direction : prev.direction, moving, inZone };
      });

      rafRef.current = requestAnimationFrame((t) => loopRef.current?.(t));
    };
  }, [isInZone, tryMove]);

  useEffect(() => {
    if (disabled) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
      return;
    }
    rafRef.current = requestAnimationFrame((t) => loopRef.current?.(t));
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [disabled]);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (MOVE_KEYS.has(e.key)) {
        e.preventDefault();
        held.current.add(e.key);
      }
      if (!disabledRef.current && (e.key === "e" || e.key === "E" || e.key === "Enter")) {
        const el = e.target as HTMLElement | null;
        if (el?.closest("button")) return;
        e.preventDefault();
        if (isInZone(posRef.current.x, posRef.current.y)) {
          onInteractRef.current?.();
        }
      }
    };
    const onUp = (e: KeyboardEvent) => { held.current.delete(e.key); };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [isInZone]);

  return player;
}
