"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const COUNT = 18;

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
  top: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
};

export function AmbientParticles() {
  const reduceMotion = useReducedMotion();

  const particles = useMemo(() => {
    const rand = seeded(90210);
    const out: Particle[] = [];
    for (let i = 0; i < COUNT; i++) {
      out.push({
        id: i,
        left: `${8 + rand() * 84}%`,
        top: `${6 + rand() * 88}%`,
        size: 1 + Math.floor(rand() * 2),
        duration: 14 + rand() * 18,
        delay: rand() * 8,
        driftX: -6 + rand() * 12,
        driftY: -10 + rand() * 14,
      });
    }
    return out;
  }, []);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-zinc-300/25 shadow-[0_0_6px_rgba(255,255,255,0.12)]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0.12, x: 0, y: 0 }}
          animate={{
            opacity: [0.12, 0.38, 0.18, 0.28, 0.14],
            x: [0, p.driftX * 0.4, p.driftX * 0.75, p.driftX * 0.5, 0],
            y: [0, p.driftY * 0.35, p.driftY * 0.7, p.driftY * 0.45, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
