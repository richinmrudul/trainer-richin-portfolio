"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import { links } from "@/content/links";

const RESUME_FILENAME = "resume.pdf";

const HIGHLIGHTS = [
  "Backend engineering",
  "AI/ML projects",
  "Systems experience",
  "Production work",
  "Leadership experience",
] as const;

export function ResumeCard({ headingId }: { headingId: string }) {
  const reduceMotion = useReducedMotion();

  const btnMotion = reduceMotion
    ? {}
    : { whileHover: { y: -1 }, whileTap: { scale: 0.995 } };

  return (
    <div className="resume-key-item relative mx-auto w-full max-w-[820px]">
      <div className="resume-key-item__shell relative overflow-hidden">
        <div className="resume-key-item__topbar relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p className="game-label flex min-w-0 items-center gap-2 text-white">
            <span
              className="resume-key-item__pocket-mark shrink-0"
              aria-hidden
            />
            <span className="truncate">Key Items Pocket</span>
          </p>
          <span
            className="game-label shrink-0 rounded-full bg-[#fff8de]/15 px-2.5 py-1 text-[#fff2ba]"
            aria-hidden
          >
            1 / 1
          </span>
        </div>

        <div className="resume-key-item__body relative grid gap-3 p-3 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.45fr)] sm:gap-4 sm:p-5">
          <div className="resume-key-item__inventory" aria-hidden>
            <div className="resume-key-item__inventory-label game-label">
              Important
            </div>
            <div className="resume-key-item__slot resume-key-item__slot--selected">
              <span className="resume-key-item__mini-icon">
                <FileText />
              </span>
              <span>Trainer Résumé</span>
              <ChevronRight />
            </div>
            <div className="resume-key-item__slot resume-key-item__slot--empty" />
            <div className="resume-key-item__slot resume-key-item__slot--empty" />
          </div>

          <div className="resume-key-item__detail">
            <div className="resume-key-item__detail-header">
              <div className="resume-key-item__icon" aria-hidden>
                <FileText />
                <span />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="game-label text-[#8f2630]">Key Item</p>
                <h2
                  id={headingId}
                  className="text-balance text-2xl font-semibold tracking-[-0.02em] text-[#27231d] sm:text-[1.65rem]"
                >
                  Richin Mrudul
                </h2>
                <p className="text-sm text-[#5f574d] sm:text-[15px]">
                  Purdue CS · Software Engineer Intern @ Pendo
                </p>
              </div>
            </div>

            <div className="resume-key-item__description space-y-3">
              <p className="text-sm font-semibold text-[#39332b]">
                Hi Recruiters!
              </p>
              <ul className="grid gap-1.5 text-sm leading-snug text-[#5f574d] sm:grid-cols-2 sm:gap-x-6">
                {HIGHLIGHTS.map((line) => (
                  <li key={line} className="flex gap-2">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#327060]"
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="resume-key-item__actions flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <motion.a
                href={links.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                {...btnMotion}
                transition={{ type: "spring", stiffness: 480, damping: 32 }}
                className="resume-key-item__button resume-key-item__button--view"
              >
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                View Resume
              </motion.a>
              <motion.a
                href={links.resumePdf}
                download={RESUME_FILENAME}
                {...btnMotion}
                transition={{ type: "spring", stiffness: 480, damping: 32 }}
                className="resume-key-item__button resume-key-item__button--download"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Download Resume
              </motion.a>
            </div>
          </div>
        </div>

        <div className="resume-key-item__hint game-label" aria-hidden>
          A: Select
          <span>•</span>
          Essential trainer information
        </div>
      </div>
    </div>
  );
}
