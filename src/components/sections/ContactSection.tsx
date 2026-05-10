import { SectionContainer } from "@/components/layout/SectionContainer";

export function ContactSection() {
  return (
    <SectionContainer id="contact" aria-labelledby="contact-heading">
      <header className="max-w-2xl space-y-2">
        <h2
          id="contact-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500"
        >
          Contact
        </h2>
        <p className="text-zinc-400">Reach-out paths will appear here.</p>
      </header>
    </SectionContainer>
  );
}
