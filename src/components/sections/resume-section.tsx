"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { ResumeCard } from "@/components/ui/resume-card";

export function ResumeSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <SectionContainer
      id={embedded ? undefined : "resume"}
      aria-labelledby="resume-heading"
      className={embedded ? "py-8 md:py-10" : "py-16 md:py-24"}
    >
      <ScrollReveal
        variant="scaleIn"
        className="mx-auto flex max-w-[820px] flex-col items-center"
      >
        <ResumeCard />
      </ScrollReveal>
    </SectionContainer>
  );
}
