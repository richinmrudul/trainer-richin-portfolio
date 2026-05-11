"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { ONBOARDING_NURSE_SRC } from "@/lib/onboarding";

type OnboardingStageProps = {
  fgX: MotionValue<number>;
  fgY: MotionValue<number>;
  nurseX: MotionValue<number>;
  nurseY: MotionValue<number>;
  phase: "dialogue" | "menu";
  isExiting: boolean;
  dialogue: ReactNode;
  menu: ReactNode;
};

export function OnboardingStage({
  fgX,
  fgY,
  nurseX,
  nurseY,
  phase,
  isExiting,
  dialogue,
  menu,
}: OnboardingStageProps) {
  const reduced = useReducedMotion();
  const nurseCompact = phase === "menu";

  const nurseHeights = nurseCompact
    ? "h-[100px] max-h-[16vh] sm:h-[120px] sm:max-h-[18vh]"
    : "h-[120px] max-h-[20vh] sm:h-[160px] md:h-[200px] md:max-h-[230px]";

  return (
    <motion.div
      className="relative z-20 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-end px-4 pb-[min(12vh,100px)] pt-6 sm:px-6 md:pb-[min(14vh,120px)] md:pt-10"
      style={reduced ? undefined : { x: fgX, y: fgY }}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      animate={
        isExiting
          ? { opacity: 0, y: 12, filter: reduced ? "none" : "blur(10px)", scale: 0.985 }
          : { opacity: 1, y: 0, filter: "none", scale: 1 }
      }
      transition={{
        duration: isExiting ? 0.65 : 0.55,
        delay: isExiting ? 0 : 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {phase === "dialogue" ? (
        <div className="flex w-full flex-col items-center gap-2 md:flex-row md:items-end md:justify-center md:gap-6 lg:gap-8">
          <motion.div
            className="relative flex shrink-0 flex-col items-center md:-mb-1 md:items-end"
            style={reduced ? undefined : { x: nurseX, y: nurseY }}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="pointer-events-none absolute -bottom-1 left-1/2 h-4 w-[72%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-md"
              aria-hidden
            />
            <motion.div
              animate={reduced ? false : { y: [0, -3, 0] }}
              transition={
                reduced
                  ? undefined
                  : { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative"
            >
              <div
                className="pointer-events-none absolute -inset-1 rounded-2xl opacity-40 blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(248,113,113,0.12))",
                }}
                aria-hidden
              />
              <Image
                src={ONBOARDING_NURSE_SRC}
                alt=""
                width={200}
                height={280}
                priority
                sizes="(max-width: 768px) 34vw, 200px"
                className={`relative z-10 w-auto select-none object-contain object-bottom ${nurseHeights}`}
                style={{
                  filter:
                    "brightness(1.1) saturate(1.08) drop-shadow(0 16px 28px rgba(0,0,0,0.42))",
                }}
                draggable={false}
              />
            </motion.div>
          </motion.div>

          <div className="relative z-10 w-full min-w-0 md:w-[min(100%,760px)] md:flex-1">
            {dialogue}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-8 lg:gap-10">
          <motion.div
            className="relative flex shrink-0 justify-center md:pt-2"
            style={reduced ? undefined : { x: nurseX, y: nurseY }}
            initial={false}
            animate={{ opacity: 1 }}
          >
            <div
              className="pointer-events-none absolute -bottom-1 left-1/2 h-3 w-[60%] -translate-x-1/2 rounded-[100%] bg-black/30 blur-md"
              aria-hidden
            />
            <motion.div
              animate={reduced ? false : { y: [0, -2.5, 0] }}
              transition={
                reduced
                  ? undefined
                  : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Image
                src={ONBOARDING_NURSE_SRC}
                alt=""
                width={200}
                height={280}
                priority
                sizes="(max-width: 768px) 30vw, 180px"
                className={`relative z-10 w-auto object-contain ${nurseHeights}`}
                style={{
                  filter:
                    "brightness(1.08) saturate(1.06) drop-shadow(0 12px 22px rgba(0,0,0,0.4))",
                }}
                draggable={false}
              />
            </motion.div>
          </motion.div>

          <div className="w-full min-w-0 md:max-w-[720px] md:flex-1">{menu}</div>
        </div>
      )}
    </motion.div>
  );
}
