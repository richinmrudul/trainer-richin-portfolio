"use client";

import { Mail, FileText } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionReveal, ScrollReveal } from "@/components/effects/section-reveal";
import { RouteSignHeader } from "@/components/ui/route-sign-header";
import { PokemonPanel } from "@/components/ui/pokemon-panel";
import { links } from "@/content/links";

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const actions = [
  {
    id: "github",
    label: "GitHub",
    description: "Code, projects, and contributions.",
    href: links.github,
    icon: IconGitHub,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Professional background and updates.",
    href: links.linkedIn,
    icon: IconLinkedIn,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    description: `Primary: ${links.emails[0]}`,
    href: `mailto:${links.emails[0]}`,
    icon: Mail,
    external: false,
  },
  {
    id: "resume",
    label: "Resume",
    description: "Open the trainer file PDF.",
    href: links.resumePdf,
    icon: FileText,
    external: true,
  },
] as const;

export function ContactSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <SectionContainer
      id={embedded ? undefined : "contact"}
      aria-labelledby="contact-heading"
      className={embedded ? "py-8 md:py-10" : ""}
    >
      <SectionReveal>
        <header className="max-w-3xl space-y-5">
          <RouteSignHeader label="Save station" />
          <h2
            id="contact-heading"
            className="text-2xl font-semibold tracking-tight text-[#faf8f3] md:text-3xl"
          >
            Save / Connect
          </h2>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-[#d4cdc0]">
            Reach out!
          </p>
        </header>
      </SectionReveal>

      <div className="contact-save-station relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((a, i) => {
          const Icon = a.icon;
          const body = (
            <>
              <span className="flex items-center gap-2 font-medium text-[#f4f1ea]">
                <Icon className="h-4 w-4 shrink-0 text-[#c9b896]" />
                {a.label}
              </span>
              <span className="mt-2 block text-sm leading-snug text-[#9a9285]">
                {a.description}
              </span>
            </>
          );

          const linkClass =
            "flex h-full min-h-[112px] flex-col rounded-xl p-4 transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:bg-[#1a2224]/75 hover:shadow-[inset_0_1px_0_0_rgba(255,250,240,0.05)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9b896]/55 active:translate-y-px";

          const card = (
            <PokemonPanel
              variant="trainer"
              flush
              showGrid={false}
              className="overflow-hidden border-[#c4a574]/22 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.75)] transition-[box-shadow] duration-300 hover:shadow-[0_18px_44px_-26px_rgba(185,28,28,0.12)]"
            >
              {a.external ? (
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {body}
                </a>
              ) : (
                <a href={a.href} className={linkClass}>
                  {body}
                </a>
              )}
            </PokemonPanel>
          );

          return (
            <ScrollReveal key={a.id} variant="fadeUp" delay={i * 0.05}>
              {card}
            </ScrollReveal>
          );
        })}
      </div>

      <ul className="sr-only" aria-label="All email addresses">
        {links.emails.map((email) => (
          <li key={email}>
            <a href={`mailto:${email}`}>{email}</a>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
