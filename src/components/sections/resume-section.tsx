"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, FileText, Download } from "lucide-react";
import { links } from "@/content/links";
import { SectionContainer } from "@/components/layout/SectionContainer";

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
            Résumé
          </h2>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-zinc-400">
            Formal credentials and role history—same narrative as the site,
            packaged for recruiters and hiring managers.
          </p>
        </header>

        <div className="mt-12 max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/80">
                  <FileText className="h-5 w-5 text-zinc-500" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-zinc-100">
                    {resumeName}
                  </p>
                  <p className="font-mono text-[11px] text-zinc-500">
                    PDF · Software engineering résumé
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[8.5/11] max-h-[340px] bg-zinc-950/80 sm:max-h-[380px]">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
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
                  Use download or open in new tab to view the full résumé. An
                  embedded preview can be added when a hosted PDF is available.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-zinc-800/80 p-5 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-6">
              <a
                href={links.resumePdf}
                download={resumeName}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-600 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download
              </a>
              <a
                href={links.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
