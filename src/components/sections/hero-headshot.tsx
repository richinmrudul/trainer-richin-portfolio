"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HERO_HEADSHOT } from "@/content/site-images";
import { useMouseDepth } from "@/hooks/use-mouse-depth";

/** Portrait for the unified trainer profile card (no outer glass card). */
export function TrainerProfilePortrait() {
  const reduceMotion = useReducedMotion();
  const depth = useMouseDepth(6.5);

  return (
    <motion.div
      style={
        reduceMotion || !depth.enabled
          ? undefined
          : { x: depth.x, y: depth.y, willChange: "transform" }
      }
      className="relative shrink-0"
    >
      <figure className="relative mx-auto w-[200px] sm:w-[220px] lg:w-[240px]">
        <div
          className={`relative aspect-square overflow-hidden rounded-full border-2 border-[#c9b896]/35 bg-zinc-900 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(255,250,240,0.08)] ${reduceMotion ? "" : "ring-2 ring-[#2563eb]/15"}`}
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
        <figcaption className="sr-only">{HERO_HEADSHOT.alt}</figcaption>
      </figure>
    </motion.div>
  );
}

/** @deprecated Use TrainerProfilePortrait in the unified hero layout */
export function HeroPortraitCard() {
  return <TrainerProfilePortrait />;
}
