"use client";

import { useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const COUNT = 22;

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

export function AmbientParticles() {
  const reduceMotion = useReducedMotion();

  const particles = useMemo(() => {
    const rand = seeded(44102);
    const out: Particle[] = [];
    for (let i = 0; i < COUNT; i++) {
      out.push({
        id: i,
        left: `${6 + rand() * 88}%`,
        bottom: `${rand() * 38}%`,
        size: 2 + Math.floor(rand() * 2),
        duration: 11 + rand() * 16,
        delay: rand() * 7,
      });
    }
    return out;
  }, []);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-mote particle-float absolute rounded-full bg-teal-200/40 shadow-[0_0_14px_rgba(153,246,228,0.45)]"
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
    </div>
  );
}
