"use client";

import { useId } from "react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionReveal } from "@/components/effects/section-reveal";
import { RouteSignHeader } from "@/components/ui/route-sign-header";
import { ResumeCard } from "@/components/ui/resume-card";

export function ResumeSection({ embedded = false }: { embedded?: boolean }) {
  const headingId = useId();

  return (
    <SectionContainer
      id={embedded ? undefined : "resume"}
      aria-labelledby={headingId}
      className={embedded ? "py-8 md:py-10" : "py-16 md:py-24"}
    >
      <SectionReveal
        variant="scaleIn"
        className="mx-auto flex max-w-[820px] flex-col items-center gap-8"
      >
        <div className="w-full max-w-3xl space-y-5">
          <RouteSignHeader label="Bag · Key Items" />
          <div className="space-y-2">
            <p className="game-label text-[var(--accent-yellow)]">
              Trainer file
            </p>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)]">
              Open/Download
            </p>
          </div>
        </div>
        <ResumeCard headingId={headingId} />
      </SectionReveal>
    </SectionContainer>
  );
}
