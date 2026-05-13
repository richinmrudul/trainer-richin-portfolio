"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";
import type { RouteCheckpointSide } from "@/lib/route-world-config";
import type { WorldSectionId } from "@/lib/world-interactions";
import { WorldNpc } from "./world-npc";

type RouteCheckpointProps = {
  id: string;
  label: string;
  side: RouteCheckpointSide;
  /** `aria-labelledby` target id (heading inside children). */
  labelledBy: string;
  /** Optional NPC / sign that opens a short route dialogue. */
  npc?: WorldSectionId;
  children: ReactNode;
  className?: string;
};

/**
 * One “stop” on the scroll route — sign + spatial layout (panels flank center path on desktop).
 */
export function RouteCheckpoint({
  id,
  label,
  side,
  labelledBy,
  npc,
  children,
  className = "",
}: RouteCheckpointProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-24 border-b border-zinc-900/50 ${className}`}
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{ duration: 0.45, ease: easeOutExpo }}
    >
      <div className="pointer-events-none flex justify-center px-2 pt-6 md:hidden">
        <div className="route-checkpoint-sign flex flex-col items-center" aria-hidden>
          <div className="flex max-w-[min(92vw,20rem)] items-center justify-center rounded-sm border border-black/35 bg-gradient-to-b from-[#e8d4a8] to-[#c4a574] px-2 py-1">
            <span className="text-center font-mono text-[9px] uppercase tracking-[0.18em] text-[#2a2218]">
              {label}
            </span>
          </div>
          <div className="h-2 w-0.5 bg-[#4a3f35]" />
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-4 z-[1] hidden -translate-x-1/2 md:block lg:top-6">
        <div
          className="route-checkpoint-sign flex flex-col items-center drop-shadow-md"
          aria-hidden
        >
          <div className="flex min-w-[10rem] items-center justify-center rounded-sm border border-black/40 bg-gradient-to-b from-[#e8d4a8] to-[#c4a574] px-2 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
            <span className="max-w-[14rem] text-center font-mono text-[9px] uppercase leading-tight tracking-[0.2em] text-[#2a2218]">
              {label}
            </span>
          </div>
          <div className="h-3 w-1 bg-[#4a3f35]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 md:px-8 md:pb-24 md:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
        {npc && side === "full" ? (
          <div className="mb-8 flex justify-center md:mb-10">
            <WorldNpc sectionId={npc} align="center" />
          </div>
        ) : null}
        {npc && side !== "full" ? (
          <div className="mb-5 flex justify-center lg:hidden">
            <WorldNpc sectionId={npc} align="center" />
          </div>
        ) : null}
        {side === "full" ? (
          <div className="relative w-full">{children}</div>
        ) : (
          <div
            className={`grid w-full items-start gap-y-10 lg:grid-cols-[1fr_minmax(4.5rem,7vw)_1fr] lg:gap-x-6`}
          >
            {side === "left" ? (
              <>
                <div className="min-w-0 lg:max-w-xl lg:justify-self-end xl:max-w-2xl">
                  {children}
                </div>
                <div
                  className="checkpoint-center-gutter hidden min-h-[120px] lg:block"
                  aria-hidden
                />
                <div className="hidden flex-col items-center gap-3 pt-1 lg:flex">
                  {npc ? <WorldNpc sectionId={npc} align="center" /> : null}
                </div>
              </>
            ) : (
              <>
                <div className="hidden flex-col items-center gap-3 pt-1 lg:flex">
                  {npc ? <WorldNpc sectionId={npc} align="center" /> : null}
                </div>
                <div
                  className="checkpoint-center-gutter hidden min-h-[120px] lg:block"
                  aria-hidden
                />
                <div className="min-w-0 lg:max-w-xl lg:justify-self-start xl:max-w-2xl">
                  {children}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
