"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HERO_HEADSHOT } from "@/content/site-images";
import { useMouseDepth } from "@/hooks/use-mouse-depth";

/**
 * Right column: glass panel with portrait only (`HERO_HEADSHOT.src`).
 * Square source → circular frame with object-cover keeps the face centered.
 */
export function HeroPortraitCard() {
  const reduceMotion = useReducedMotion();
  const depth = useMouseDepth(3.5);

  return (
    <motion.article
      style={
        reduceMotion || !depth.enabled
          ? undefined
          : { x: depth.x, y: depth.y, willChange: "transform" }
      }
      className={`relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] ${reduceMotion ? "" : "transition-shadow duration-300"}`}
      aria-label="Portrait"
    >
      <div
        className={`flex flex-col items-center rounded-2xl border border-zinc-800/90 bg-zinc-950/55 p-8 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:p-10 ${reduceMotion ? "" : "hover:border-zinc-700/90 hover:shadow-[0_28px_90px_-38px_rgba(0,0,0,0.88)]"}`}
      >
        <div
          className={`relative h-[200px] w-[200px] shrink-0 overflow-hidden rounded-full border border-zinc-600/50 bg-zinc-900 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(255,255,255,0.07)] sm:h-[220px] sm:w-[220px] lg:h-[240px] lg:w-[240px] ${reduceMotion ? "" : "ring-1 ring-white/5"}`}
        >
          <Image
            src={HERO_HEADSHOT.src}
            alt={HERO_HEADSHOT.alt}
            fill
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 220px, 240px"
            className="object-cover object-center"
            priority
            quality={92}
            decoding="async"
            unoptimized
          />
        </div>
      </div>
    </motion.article>
  );
}
