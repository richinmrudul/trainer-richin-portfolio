"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Presentation,
} from "lucide-react";
import { links } from "@/content/links";

type KeyItemId = "resume" | "pendo-presentation";

type KeyItem = {
  id: KeyItemId;
  slotLabel: string;
  title: string;
  subtitle: string;
  blurb: string;
  highlights: readonly string[];
  href: string;
  downloadName: string;
  viewLabel: string;
  downloadLabel: string;
  Icon: typeof FileText;
};

const KEY_ITEMS: readonly KeyItem[] = [
  {
    id: "resume",
    slotLabel: "Trainer Résumé",
    title: "Richin Mrudul",
    subtitle: "Purdue CS · Looking for 2027 SWE Internships!",
    blurb: "Hi Recruiters!",
    highlights: [
      "Backend engineering",
      "AI/ML projects",
      "Systems experience",
      "Production work",
      "Leadership experience",
    ],
    href: links.resumePdf,
    downloadName: "resume.pdf",
    viewLabel: "View Resume",
    downloadLabel: "Download Resume",
    Icon: FileText,
  },
  {
    id: "pendo-presentation",
    slotLabel: "Pendo.io Final Presentation",
    title: "Pendo.io Final Presentation",
    subtitle: "Software Engineer Intern · Summer 2026",
    blurb: "Internship showcase",
    highlights: [
      "Incident triage agent",
      "Incremental data exports",
      "Secret Manager gating",
      "LLM-agent security fixes",
      "Integrations work at Pendo",
    ],
    href: links.pendoPresentationPdf,
    downloadName: "Pendo_Final_Presentation_Richin_Mrudul.pdf",
    viewLabel: "View Presentation",
    downloadLabel: "Download Presentation",
    Icon: Presentation,
  },
] as const;

export function ResumeCard({ headingId }: { headingId: string }) {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<KeyItemId>("resume");
  const selected =
    KEY_ITEMS.find((item) => item.id === selectedId) ?? KEY_ITEMS[0];
  const SelectedIcon = selected.Icon;

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
            {KEY_ITEMS.findIndex((item) => item.id === selectedId) + 1} /{" "}
            {KEY_ITEMS.length}
          </span>
        </div>

        <div className="resume-key-item__body relative grid gap-3 p-3 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.45fr)] sm:gap-4 sm:p-5">
          <div
            className="resume-key-item__inventory"
            role="listbox"
            aria-label="Key items"
            aria-activedescendant={`key-item-${selected.id}`}
          >
            <div className="resume-key-item__inventory-label game-label">
              Important
            </div>
            {KEY_ITEMS.map((item) => {
              const SlotIcon = item.Icon;
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  id={`key-item-${item.id}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(item.id)}
                  className={`resume-key-item__slot ${
                    isSelected ? "resume-key-item__slot--selected" : ""
                  }`}
                >
                  <span className="resume-key-item__mini-icon">
                    <SlotIcon />
                  </span>
                  <span className="text-left leading-snug">{item.slotLabel}</span>
                  {isSelected ? <ChevronRight /> : <span aria-hidden />}
                </button>
              );
            })}
            <div className="resume-key-item__slot resume-key-item__slot--empty" />
          </div>

          <div className="resume-key-item__detail">
            <div className="resume-key-item__detail-header">
              <div className="resume-key-item__icon" aria-hidden>
                <SelectedIcon />
                <span />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="game-label text-[#8f2630]">Key Item</p>
                <h2
                  id={headingId}
                  className="text-balance text-2xl font-semibold tracking-[-0.02em] text-[#27231d] sm:text-[1.65rem]"
                >
                  {selected.title}
                </h2>
                <p className="text-sm text-[#5f574d] sm:text-[15px]">
                  {selected.subtitle}
                </p>
              </div>
            </div>

            <div className="resume-key-item__description space-y-3">
              <p className="text-sm font-semibold text-[#39332b]">
                {selected.blurb}
              </p>
              <ul className="grid gap-1.5 text-sm leading-snug text-[#5f574d] sm:grid-cols-2 sm:gap-x-6">
                {selected.highlights.map((line) => (
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
                href={selected.href}
                target="_blank"
                rel="noopener noreferrer"
                {...btnMotion}
                transition={{ type: "spring", stiffness: 480, damping: 32 }}
                className="resume-key-item__button resume-key-item__button--view"
              >
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                {selected.viewLabel}
              </motion.a>
              <motion.a
                href={selected.href}
                download={selected.downloadName}
                {...btnMotion}
                transition={{ type: "spring", stiffness: 480, damping: 32 }}
                className="resume-key-item__button resume-key-item__button--download"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                {selected.downloadLabel}
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
