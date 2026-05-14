"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";

function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Particle = {
  id: number;
  left: string;
  bottom: string;
  size: number;
  duration: number;
  delay: number;
};

/**
 * Sparse firefly layer — slow drift, soft glow, whole field nudges with pointer.
 */
export function AmbientParticles() {
  const reduceMotion = useReducedMotion();
  const [lite, setLite] = useState(true);
  const { x: mx, y: my } = useMousePosition(5);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setLite(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const count = lite ? 9 : 14;

  const particles = useMemo(() => {
    const rand = seeded(44102);
    const out: Particle[] = [];
    for (let i = 0; i < count; i++) {
      out.push({
        id: i,
        left: `${6 + rand() * 88}%`,
        bottom: `${rand() * 38}%`,
        size: 2 + Math.floor(rand() * 2),
        duration: 14 + rand() * 18,
        delay: rand() * 8,
      });
    }
    return out;
  }, [count]);

  const driftX = useTransform(mx, (v) => v * 0.55);
  const driftY = useTransform(my, (v) => v * 0.5);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden
      style={{ x: driftX, y: driftY, willChange: "transform" }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-mote particle-float absolute rounded-full bg-teal-200/[0.32] shadow-[0_0_12px_rgba(153,246,228,0.35)] blur-[0.35px]"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </motion.div>
  );
}
