"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { links } from "@/content/links";

const RESUME_FILENAME = "resume.pdf";

const HIGHLIGHTS = [
  "Backend engineering",
  "AI/ML projects",
  "Systems experience",
  "Production work",
  "Leadership experience",
] as const;

export function ResumeCard() {
  const reduceMotion = useReducedMotion();

  const btnMotion = reduceMotion
    ? {}
    : { whileHover: { y: -1 }, whileTap: { scale: 0.995 } };

  return (
    <div className="resume-terminal relative mx-auto w-full max-w-[820px]">
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-rose-500/12 via-transparent to-sky-500/10 opacity-80 blur-sm"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(244,63,94,0.22), transparent 42%, rgba(14,165,233,0.15))",
        }}
        aria-hidden
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-[#c4a574]/22 bg-gradient-to-b from-[#141a1c]/95 to-[#0c1012]/98 shadow-[0_1px_0_0_rgba(255,250,240,0.06)_inset,0_24px_64px_-32px_rgba(0,0,0,0.75)] backdrop-blur-xl"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(228 228 231) 1px, transparent 1px), linear-gradient(to bottom, rgb(228 228 231) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        <div className="relative flex items-start justify-between gap-4 border-b border-[#ede6d8]/10 px-5 py-3.5 sm:px-7 sm:py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#a89f91]">
            PDF manifest
          </p>
          <span className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="relative h-1.5 w-1.5">
              {!reduceMotion ? (
                <span className="resume-status-led absolute inset-0 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.45)]" />
              ) : (
                <span className="absolute inset-0 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.45)]" />
              )}
            </span>
            <span className="relative h-1.5 w-1.5">
              {!reduceMotion ? (
                <span
                  className="resume-status-led absolute inset-0 rounded-full bg-sky-500/90 shadow-[0_0_8px_rgba(14,165,233,0.4)]"
                  style={{ animationDelay: "0.35s" }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full bg-sky-500/90 shadow-[0_0_8px_rgba(14,165,233,0.4)]" />
              )}
            </span>
            <span className="relative h-1.5 w-1.5">
              {!reduceMotion ? (
                <span
                  className="resume-status-led absolute inset-0 rounded-full bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.35)]"
                  style={{ animationDelay: "0.7s" }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.35)]" />
              )}
            </span>
          </span>
        </div>

        <div className="relative space-y-5 px-5 py-6 sm:space-y-6 sm:px-7 sm:py-7">
          <div className="space-y-1.5">
            <h2
              id="resume-heading"
              className="text-balance text-2xl font-semibold tracking-[-0.02em] text-[#faf8f3] sm:text-[1.65rem]"
            >
              Richin Mrudul
            </h2>
            <p className="text-sm text-[#c9c2b6] sm:text-[15px]">
              Purdue CS · Incoming SWE Intern @ Pendo
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="text-sm font-medium text-[#e8e0d4]">
              Hi Recruiters!
            </p>
            <ul className="grid gap-1.5 text-sm leading-snug text-[#a8a095] sm:grid-cols-2 sm:gap-x-8 sm:gap-y-1.5">
              {HIGHLIGHTS.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c9b896]/60" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:items-center sm:gap-3">
            <motion.a
              href={links.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              {...btnMotion}
              transition={{ type: "spring", stiffness: 480, damping: 32 }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#3f3a35]/90 bg-[#1a2224]/90 px-4 py-3 text-sm font-medium text-[#f4f1ea] shadow-[0_4px_0_0_rgba(12,18,20,0.95)] transition-[border-color,box-shadow,background-color] hover:border-[#c9b896]/35 hover:bg-[#1f282b] hover:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.55),0_4px_0_0_rgba(12,18,20,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9b896]/50 active:translate-y-px active:shadow-none sm:flex-initial sm:min-w-[160px]"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
              View Resume
            </motion.a>
            <motion.a
              href={links.resumePdf}
              download={RESUME_FILENAME}
              {...btnMotion}
              transition={{ type: "spring", stiffness: 480, damping: 32 }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#e8dcc8]/25 bg-[#f5f0e6] px-4 py-3 text-sm font-medium text-[#1a1814] shadow-[0_4px_0_0_rgba(180,160,130,0.45)] transition-[transform,box-shadow,background-color] hover:bg-[#fffdf6] hover:shadow-[0_6px_24px_-10px_rgba(245,240,230,0.15),0_4px_0_0_rgba(180,160,130,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9b896]/60 active:translate-y-px active:shadow-none sm:flex-initial sm:min-w-[180px]"
            >
              <Download className="h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
              Download Resume
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
