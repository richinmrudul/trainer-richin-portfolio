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

function applySpotlightVars() {
  const main = document.getElementById("portfolio-main");
  if (!(main instanceof HTMLElement)) return;
  const x = 50 + smoothNormX.get() * 48;
  const y = 50 + smoothNormY.get() * 46;
  main.style.setProperty(
    "--portfolio-spot-x",
    `${Math.max(6, Math.min(94, x))}%`,
  );
  main.style.setProperty(
    "--portfolio-spot-y",
    `${Math.max(8, Math.min(92, y))}%`,
  );
}

function resetSpotlightVars() {
  const main = document.getElementById("portfolio-main");
  if (!(main instanceof HTMLElement)) return;
  main.style.setProperty("--portfolio-spot-x", "50%");
  main.style.setProperty("--portfolio-spot-y", "44%");
}

function tickSmooth() {
  rafId = null;
  const tx = targetNormX.get();
  const ty = targetNormY.get();
  const sx = smoothNormX.get();
  const sy = smoothNormY.get();
  const lerp = 0.18;
  smoothNormX.set(sx + (tx - sx) * lerp);
  smoothNormY.set(sy + (ty - sy) * lerp);
  applySpotlightVars();
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
 * Also drives `--portfolio-spot-x` / `--portfolio-spot-y` on `#portfolio-main` for the cursor spotlight.
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
      resetSpotlightVars();
      return;
    }

    listenerCount += 1;
    if (listenerCount === 1) {
      detachMouse = attachGlobalMouse();
    }
    applySpotlightVars();

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
        resetSpotlightVars();
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
