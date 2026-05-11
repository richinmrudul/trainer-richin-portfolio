"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { ONBOARDING_BG_SRC } from "@/lib/onboarding";

function OnboardingParticles() {
  const reduced = useReducedMotion();
  const count = reduced ? 0 : 18;
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 47 + 13) % 92}%`,
    top: `${(i * 31 + 7) % 88}%`,
    delay: `${(i % 9) * 0.7}s`,
    duration: `${14 + (i % 5) * 2}s`,
  }));

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute h-0.5 w-0.5 rounded-full bg-zinc-100/25"
          style={{
            left: p.left,
            top: p.top,
            animation: `onboarding-drift ${p.duration} ease-in-out ${p.delay} infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes onboarding-drift {
          0% { transform: translate3d(0, 0, 0); opacity: 0.15; }
          100% { transform: translate3d(6px, -10px, 0); opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}

type OnboardingBackgroundProps = {
  bgX: MotionValue<number>;
  bgY: MotionValue<number>;
};

export function OnboardingBackground({ bgX, bgY }: OnboardingBackgroundProps) {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -inset-[5%] will-change-transform"
        style={
          reduced
            ? { scale: 1.06 }
            : { x: bgX, y: bgY, scale: 1.06 }
        }
      >
        <Image
          src={ONBOARDING_BG_SRC}
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Atmospheric depth — not flat black */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/25 to-zinc-950/80" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 72% 68% at 50% 52%, rgba(15,23,42,0.12) 0%, rgba(2,6,23,0.45) 45%, rgba(2,6,23,0.88) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950/85 to-transparent" />

      {/* Environmental cool / warm wash */}
      <div className="absolute -left-[20%] top-[28%] h-[55%] w-[55%] rounded-full bg-sky-500/[0.07] blur-[100px]" />
      <div className="absolute -right-[18%] top-[32%] h-[50%] w-[50%] rounded-full bg-red-500/[0.055] blur-[100px]" />

      <OnboardingParticles />
    </div>
  );
}
