"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ResumeCard } from "@/components/ui/resume-card";

export function ResumeSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionContainer
      id="resume"
      aria-labelledby="resume-heading"
      className="py-16 md:py-24"
    >
      <motion.div
        className="mx-auto flex flex-col items-center"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <ResumeCard />
      </motion.div>
    </SectionContainer>
  );
}
