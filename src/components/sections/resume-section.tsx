"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, FileText, Download } from "lucide-react";
import { links } from "@/content/links";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { PokemonPanel } from "@/components/ui/pokemon-panel";

export function ResumeSection() {
  const reduceMotion = useReducedMotion();
  const resumeName = "Richin_Mrudul_Resume.pdf";

  return (
    <SectionContainer id="resume" aria-labelledby="resume-heading">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
            Trainer file
          </p>
          <h2
            id="resume-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl"
          >
            Credentials on file
          </h2>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-zinc-400">
            Formal credentials and role history—same narrative as the site,
            packaged for recruiters and hiring managers.
          </p>
        </header>

        <div className="mt-12 max-w-2xl">
          <PokemonPanel variant="screen" label="Trainer file · PDF" showGrid>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/80">
                  <FileText className="h-5 w-5 text-zinc-500" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-zinc-100">
                    Richin Mrudul
                  </p>
                  <p className="font-mono text-[11px] text-zinc-500">
                    Purdue CS · Incoming SWE Intern @ Pendo
                  </p>
                  <p className="mt-1 truncate font-mono text-[11px] text-zinc-600">
                    {resumeName}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-8 aspect-[8.5/11] max-h-[340px] overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950/80 sm:max-h-[380px]">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(161 161 170) 1px, transparent 1px), linear-gradient(to bottom, rgb(161 161 170) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
                aria-hidden
              />
              <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Preview pending
                </p>
                <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
                  Use View Resume or Download for the full PDF. An embedded
                  preview can be wired when a hosted asset is available.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
              <a
                href={links.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                View Resume
              </a>
              <a
                href={links.resumePdf}
                download={resumeName}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download Resume
              </a>
            </div>
          </PokemonPanel>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
