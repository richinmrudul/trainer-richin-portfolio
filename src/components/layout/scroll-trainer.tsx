"use client";

import { useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { TrainerSprite } from "@/components/onboarding/game/trainer-sprite";
import {
  PLAYER_H,
  PLAYER_W,
} from "@/components/onboarding/game/game-config";
import type { Direction } from "@/components/onboarding/game/use-player-movement";
import { sampleTrainerPath } from "@/lib/world-interactions";
import { useRouteScroll } from "./scroll-route-context";

/**
 * Scroll-linked trainer — reuses onboarding `TrainerSprite` for consistent look.
 */
export function ScrollTrainer() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress, scrollY } = useRouteScroll();
  const [dims, setDims] = useState({ w: 1200, h: 800 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [moving, setMoving] = useState(false);
  const [direction, setDirection] = useState<Direction>("down");
  const prevScroll = useRef(0);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bumpIdle = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => setMoving(false), 150);
  }, []);

  useEffect(() => {
    const measure = () =>
      setDims({
        w: typeof window !== "undefined" ? window.innerWidth : 1200,
        h: typeof window !== "undefined" ? window.innerHeight : 800,
      });
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  const applyProgress = useCallback(
    (p: number) => {
      const { xPct, yPct } = sampleTrainerPath(p);
      setPos({
        x: (xPct / 100) * dims.w - PLAYER_W / 2,
        y: (yPct / 100) * dims.h - PLAYER_H * 0.92,
      });
    },
    [dims.w, dims.h],
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      applyProgress(scrollYProgress.get());
    });
    return () => cancelAnimationFrame(id);
  }, [applyProgress, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    applyProgress(p);
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (reduceMotion) return;
    const prev = prevScroll.current;
    prevScroll.current = latest;
    const dy = latest - prev;
    if (Math.abs(dy) < 0.4) return;
    setDirection(dy < 0 ? "up" : "down");
    setMoving(true);
    bumpIdle();
  });

  useEffect(
    () => () => {
      if (idleRef.current) clearTimeout(idleRef.current);
    },
    [],
  );

  if (reduceMotion) {
    const { xPct, yPct } = sampleTrainerPath(0.42);
    const x = (xPct / 100) * dims.w - PLAYER_W / 2;
    const y = (yPct / 100) * dims.h - PLAYER_H * 0.92;
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[14] hidden sm:block"
      >
        <div className="relative h-full w-full">
          <TrainerSprite
            x={x}
            y={y}
            direction="down"
            moving={false}
            sprinting={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[14] hidden sm:block"
    >
      <div className="relative h-full w-full">
        <TrainerSprite
          x={pos.x}
          y={pos.y}
          direction={direction === "up" ? "up" : "down"}
          moving={moving}
          sprinting={false}
        />
      </div>
    </div>
  );
}
