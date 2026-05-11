"use client";

import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";

/** Target range before spring (roughly ±7). */
const POINTER_GAIN = 7;

export function useMouseParallax() {
  const reduced = useReducedMotion();
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 88, damping: 32, mass: 0.45 });
  const springY = useSpring(rawY, { stiffness: 88, damping: 32, mass: 0.45 });

  const enabled = !reduced && !coarsePointer;

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(nx * POINTER_GAIN);
      rawY.set(ny * POINTER_GAIN * 0.78);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, rawX, rawY]);

  /** Background layer — max ~12–14px travel */
  const bgX = useTransform(springX, (v) => v * 1.25);
  const bgY = useTransform(springY, (v) => v * 1.2);

  /** Foreground UI cluster */
  const fgX = useTransform(springX, (v) => v * 0.38);
  const fgY = useTransform(springY, (v) => v * 0.34);

  /** Nurse — slightly less than UI */
  const nurseX = useTransform(springX, (v) => v * 0.3);
  const nurseY = useTransform(springY, (v) => v * 0.28);

  return {
    bgX,
    bgY,
    fgX,
    fgY,
    nurseX,
    nurseY,
    enabled,
  };
}
