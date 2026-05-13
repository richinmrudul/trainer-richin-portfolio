"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Direction } from "@/components/onboarding/game/use-player-movement";
import type { Rect } from "@/components/onboarding/game/game-config";
import {
  PLAYER_WORLD_H,
  PLAYER_WORLD_W,
  WORLD_HEIGHT,
  WORLD_MOVE_SPEED,
  WORLD_WIDTH,
  isPlayerPlacementValid,
  PLAYER_SPAWN,
} from "./world-config";

export type WorldPlayerState = {
  x: number;
  y: number;
  direction: Direction;
  moving: boolean;
};

const MOVE_CODES = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
]);

type UseWorldMovementOptions = {
  disabled?: boolean;
};

export function useWorldMovement({ disabled = false }: UseWorldMovementOptions = {}) {
  const held = useRef(new Set<string>());
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const posRef = useRef({ x: PLAYER_SPAWN.x, y: PLAYER_SPAWN.y });
  const disabledRef = useRef(disabled);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  const [player, setPlayer] = useState<WorldPlayerState>({
    x: PLAYER_SPAWN.x,
    y: PLAYER_SPAWN.y,
    direction: "down",
    moving: false,
  });

  const tryMove = useCallback((nx: number, ny: number): { x: number; y: number } => {
    const pr: Rect = { x: nx, y: ny, w: PLAYER_WORLD_W, h: PLAYER_WORLD_H };
    if (isPlayerPlacementValid(pr)) return { x: nx, y: ny };

    const slideX: Rect = { x: nx, y: posRef.current.y, w: PLAYER_WORLD_W, h: PLAYER_WORLD_H };
    if (isPlayerPlacementValid(slideX)) return { x: nx, y: posRef.current.y };

    const slideY: Rect = { x: posRef.current.x, y: ny, w: PLAYER_WORLD_W, h: PLAYER_WORLD_H };
    if (isPlayerPlacementValid(slideY)) return { x: posRef.current.x, y: ny };

    return posRef.current;
  }, []);

  const loopRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    loopRef.current = (time: number) => {
      if (disabledRef.current) {
        rafRef.current = null;
        return;
      }

      const dt =
        lastTimeRef.current == null
          ? 0
          : Math.min((time - lastTimeRef.current) / 1000, 0.08);
      lastTimeRef.current = time;

      const keys = held.current;
      const up = keys.has("ArrowUp") || keys.has("KeyW");
      const down = keys.has("ArrowDown") || keys.has("KeyS");
      const left = keys.has("ArrowLeft") || keys.has("KeyA");
      const right = keys.has("ArrowRight") || keys.has("KeyD");

      let dx = (right ? 1 : 0) - (left ? 1 : 0);
      let dy = (down ? 1 : 0) - (up ? 1 : 0);
      const moving = dx !== 0 || dy !== 0;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
      }

      const speed = WORLD_MOVE_SPEED;
      let { x, y } = posRef.current;
      let direction: Direction = "idle";

      if (moving) {
        const clamp = (v: number, lo: number, hi: number) =>
          Math.max(lo, Math.min(hi, v));
        const nx = clamp(
          x + dx * speed * dt,
          0,
          WORLD_WIDTH - PLAYER_WORLD_W,
        );
        const ny = clamp(
          y + dy * speed * dt,
          0,
          WORLD_HEIGHT - PLAYER_WORLD_H,
        );
        const next = tryMove(nx, ny);
        x = next.x;
        y = next.y;
        posRef.current = { x, y };
        direction =
          dy < 0 ? "up" : dy > 0 ? "down" : dx < 0 ? "left" : "right";
      }

      setPlayer((prev) => {
        const samePos =
          Math.abs(prev.x - x) < 0.5 && Math.abs(prev.y - y) < 0.5;
        const sameMove = prev.moving === moving;
        const sameDir =
          prev.direction === (moving ? direction : prev.direction);
        if (samePos && sameMove && sameDir) return prev;
        return {
          x,
          y,
          direction: moving ? direction : prev.direction,
          moving,
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
      held.current.clear();
      return;
    }
    rafRef.current = requestAnimationFrame((t) => loopRef.current?.(t));
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [disabled]);

  useEffect(() => {
    const clearHeld = () => {
      held.current.clear();
    };

    const onDown = (e: KeyboardEvent) => {
      if (disabledRef.current) return;
      if (MOVE_CODES.has(e.code)) {
        e.preventDefault();
        held.current.add(e.code);
      }
    };

    const onUp = (e: KeyboardEvent) => {
      held.current.delete(e.code);
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", clearHeld);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", clearHeld);
    };
  }, []);

  return player;
}
