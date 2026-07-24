"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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

/** Minimal ambient motes — CSS animation only, no scroll/mouse coupling. */
export function AmbientParticles() {
  const reduceMotion = useReducedMotion();
  const [lite, setLite] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setLite(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const count = lite ? 4 : 6;

  const particles = useMemo(() => {
    const rand = seeded(44102);
    const out: Particle[] = [];
    for (let i = 0; i < count; i++) {
      out.push({
        id: i,
        left: `${6 + rand() * 88}%`,
        bottom: `${rand() * 38}%`,
        size: 2,
        duration: 18 + rand() * 14,
        delay: rand() * 6,
      });
    }
    return out;
  }, [count]);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-mote particle-float absolute rounded-full bg-amber-100/35 shadow-[0_0_8px_rgba(255,224,163,0.32)]"
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
