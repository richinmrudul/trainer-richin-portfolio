"use client";

import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionReveal } from "@/components/layout/section-reveal";
import { ResumeCard } from "@/components/ui/resume-card";

export function ResumeSection() {
  return (
    <SectionContainer
      id="resume"
      aria-labelledby="resume-heading"
      className="py-16 md:py-24"
    >
      <SectionReveal className="mx-auto flex max-w-[820px] flex-col items-center">
        <ResumeCard />
      </SectionReveal>
    </SectionContainer>
  );
}
