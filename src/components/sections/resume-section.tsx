"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionReveal } from "@/components/effects/section-reveal";
import { RouteSignHeader } from "@/components/ui/route-sign-header";
import { ResumeCard } from "@/components/ui/resume-card";

export function ResumeSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <SectionContainer
      id={embedded ? undefined : "resume"}
      aria-labelledby="resume-heading"
      className={embedded ? "py-8 md:py-10" : "py-16 md:py-24"}
    >
      <SectionReveal
        variant="scaleIn"
        className="mx-auto flex max-w-[820px] flex-col items-center gap-8"
      >
        <div className="w-full max-w-3xl space-y-5">
          <RouteSignHeader label="Trainer file" />
          <p className="text-pretty text-base leading-relaxed text-[#d4cdc0]">
            Official trainer record — download or open the PDF for recruiters.
          </p>
        </div>
        <ResumeCard />
      </SectionReveal>
    </SectionContainer>
  );
}
