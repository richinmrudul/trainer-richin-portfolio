"use client";

import { motionValue, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const targetNormX = motionValue(0);
const targetNormY = motionValue(0);
const smoothNormX = motionValue(0);
const smoothNormY = motionValue(0);

let rafId: number | null = null;
let listenerCount = 0;
let detachMouse: (() => void) | null = null;

function tickSmooth() {
  rafId = null;
  const tx = targetNormX.get();
  const ty = targetNormY.get();
  const sx = smoothNormX.get();
  const sy = smoothNormY.get();
  const lerp = 0.14;
  smoothNormX.set(sx + (tx - sx) * lerp);
  smoothNormY.set(sy + (ty - sy) * lerp);
  const nx = smoothNormX.get();
  const ny = smoothNormY.get();
  if (Math.abs(tx - nx) > 0.001 || Math.abs(ty - ny) > 0.001) {
    rafId = requestAnimationFrame(tickSmooth);
  }
}

function scheduleTick() {
  if (rafId != null) return;
  rafId = requestAnimationFrame(tickSmooth);
}

function attachGlobalMouse() {
  const onMove = (e: MouseEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const cx = w * 0.5;
    const cy = h * 0.5;
    targetNormX.set((e.clientX - cx) / Math.max(cx, 1));
    targetNormY.set((e.clientY - cy) / Math.max(cy, 1));
    scheduleTick();
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  return () => window.removeEventListener("mousemove", onMove);
}

export type MouseDepthResult = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  normX: MotionValue<number>;
  normY: MotionValue<number>;
  enabled: boolean;
};

/**
 * Shared pointer depth: one global listener, motion values only (no per-move setState).
 * Disabled for reduced motion and coarse pointer (e.g. touch).
 */
export function useMouseDepth(maxPx: number): MouseDepthResult {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setFinePointer(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const enabled = !reduceMotion && finePointer;

  useEffect(() => {
    if (!enabled) {
      targetNormX.set(0);
      targetNormY.set(0);
      smoothNormX.set(0);
      smoothNormY.set(0);
      return;
    }

    listenerCount += 1;
    if (listenerCount === 1) {
      detachMouse = attachGlobalMouse();
    }

    return () => {
      listenerCount -= 1;
      if (listenerCount <= 0) {
        listenerCount = 0;
        detachMouse?.();
        detachMouse = null;
        if (rafId != null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        targetNormX.set(0);
        targetNormY.set(0);
        smoothNormX.set(0);
        smoothNormY.set(0);
      }
    };
  }, [enabled]);

  const x = useTransform(smoothNormX, [-1, 1], [-maxPx, maxPx]);
  const y = useTransform(smoothNormY, [-1, 1], [-maxPx, maxPx]);

  return useMemo(
    () => ({
      x,
      y,
      normX: smoothNormX,
      normY: smoothNormY,
      enabled,
    }),
    [enabled, x, y],
  );
}
