import { SectionContainer } from "@/components/layout/SectionContainer";
import { links } from "@/content/links";

export function ContactSection() {
  return (
    <SectionContainer id="contact" aria-labelledby="contact-heading">
      <header className="max-w-3xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          Contact
        </p>
        <h2
          id="contact-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl"
        >
          Let&apos;s connect
        </h2>
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-zinc-400">
          Open to thoughtful conversations on backend systems, AI tooling, and
          product engineering roles.
        </p>
      </header>

      <ul className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <li>
          <a
            href={links.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg border border-zinc-800/90 bg-zinc-900/35 px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg border border-zinc-800/90 bg-zinc-900/35 px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
          >
            GitHub
          </a>
        </li>
        {links.emails.map((email) => (
          <li key={email}>
            <a
              href={`mailto:${email}`}
              className="inline-flex rounded-lg border border-zinc-800/90 bg-zinc-900/35 px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
            >
              {email}
            </a>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
