"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  COLLISIONS,
  getInteractNpcId,
  MOVE_SPEED,
  PLAYER_H,
  PLAYER_W,
  ROOM_H,
  ROOM_W,
  SPAWN_X,
  SPAWN_Y,
  SPRINT_SPEED_MULTIPLIER,
  TILE,
  rectsOverlap,
} from "./game-config";

export type Direction = "up" | "down" | "left" | "right" | "idle";

export type PlayerState = {
  x: number;
  y: number;
  direction: Direction;
  moving: boolean;
  /** True while moving with Shift held (sprint). */
  sprinting: boolean;
  /** NPC id when inside an interaction zone, else null */
  nearNpcId: string | null;
};

type UsePlayerMovementOptions = {
  disabled?: boolean;
  onInteract?: (npcId: string) => void;
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

  useEffect(() => { disabledRef.current = disabled; }, [disabled]);
  useEffect(() => { onInteractRef.current = onInteract; }, [onInteract]);

  const [player, setPlayer] = useState<PlayerState>({
    x: SPAWN_X,
    y: SPAWN_Y,
    direction: "down",
    moving: false,
    sprinting: false,
    nearNpcId: null,
  });

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

      const sprinting =
        moving &&
        (keys.has("Shift") || keys.has("ShiftLeft") || keys.has("ShiftRight"));
      const speed = MOVE_SPEED * (sprinting ? SPRINT_SPEED_MULTIPLIER : 1);

      let { x, y } = posRef.current;
      let direction: Direction = "idle";

      if (moving) {
        const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
        const nx = clamp(x + dx * speed * dt, TILE, ROOM_W - TILE - PLAYER_W);
        const ny = clamp(y + dy * speed * dt, TILE, ROOM_H - TILE - PLAYER_H);
        const next = tryMove(nx, ny);
        x = next.x; y = next.y;
        posRef.current = { x, y };
        direction = dy < 0 ? "up" : dy > 0 ? "down" : dx < 0 ? "left" : "right";
      }

      const nearNpcId = getInteractNpcId(x, y);

      setPlayer((prev) => {
        const samePos   = Math.abs(prev.x - x) < 0.5 && Math.abs(prev.y - y) < 0.5;
        const sameMove  = prev.moving === moving;
        const sameSprint = prev.sprinting === sprinting;
        const sameDir   = prev.direction === (moving ? direction : prev.direction);
        const sameNpc   = prev.nearNpcId === nearNpcId;
        if (samePos && sameMove && sameSprint && sameDir && sameNpc) return prev;
        return {
          x,
          y,
          direction: moving ? direction : prev.direction,
          moving,
          sprinting,
          nearNpcId,
        };
      });

      rafRef.current = requestAnimationFrame((t) => loopRef.current?.(t));
    };
  }, [tryMove]);

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
      if (e.key === "Shift" || e.key === "ShiftLeft" || e.key === "ShiftRight") {
        held.current.add("Shift");
        held.current.add(e.key);
      }
      if (!disabledRef.current && (e.key === "e" || e.key === "E" || e.key === "Enter")) {
        const el = e.target as HTMLElement | null;
        if (
          el?.closest("button") ||
          el?.closest("a") ||
          el?.closest("input") ||
          el?.closest("textarea") ||
          el?.closest("[contenteditable=true]")
        ) {
          return;
        }
        e.preventDefault();
        const npcId = getInteractNpcId(posRef.current.x, posRef.current.y);
        if (npcId) onInteractRef.current?.(npcId);
      }
    };
    const onUp = (e: KeyboardEvent) => {
      held.current.delete(e.key);
      if (e.key === "Shift" || e.key === "ShiftLeft" || e.key === "ShiftRight") {
        held.current.delete("Shift");
        held.current.delete("ShiftLeft");
        held.current.delete("ShiftRight");
      }
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return player;
}
