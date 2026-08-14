"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionReveal, ScrollReveal } from "@/components/effects/section-reveal";
import { RouteSignHeader } from "@/components/ui/route-sign-header";
import { PokemonPanel } from "@/components/ui/pokemon-panel";
import { ContributionHeatmap } from "@/components/activity/contribution-heatmap";
import { links } from "@/content/links";
import { site } from "@/content/site";
import {
  buildFallbackContributions,
  type GithubContributionsPayload,
} from "@/lib/github-contributions";

export function ActivitySection({ embedded = false }: { embedded?: boolean }) {
  const [data, setData] = useState<GithubContributionsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/github/contributions", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as GithubContributionsPayload;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) {
          setData(buildFallbackContributions(site.githubUsername));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const payload = data ?? buildFallbackContributions(site.githubUsername);

  return (
    <SectionContainer
      id={embedded ? undefined : "activity"}
      aria-labelledby="activity-heading"
      className={embedded ? "py-8 md:py-10" : ""}
    >
      <SectionReveal>
        <header className="max-w-3xl space-y-5">
          <RouteSignHeader label="Commit camp · Activity log" />
          <div className="space-y-2">
            <h2
              id="activity-heading"
              className="text-2xl font-semibold tracking-tight text-[#faf8f3] md:text-3xl"
            >
              GitHub activity
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-[#d4cdc0]">
              A live look at contribution cadence across the last year.
            </p>
          </div>
        </header>
      </SectionReveal>

      <ScrollReveal className="mt-10" variant="fadeUp">
        <PokemonPanel
          variant="trainer"
          label="Trainer activity dossier"
          className="border-[#c4a574]/22"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#f5f0e6]/[0.08] pb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c9b896]/90">
                GitHub Stats
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-[#f4efe4]">
                {loading
                  ? "Loading…"
                  : `${payload.totalContributions.toLocaleString()} contributions`}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-[#c9b896]/25 bg-black/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[#d4cdc0]">
                {payload.source === "live" ? "Live cache" : "Fallback snapshot"}
              </span>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#c9b896]/25 bg-black/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[#e8e0d4] transition-colors hover:border-[#e8dcc8]/45 hover:bg-[#1a2224]/90"
              >
                @{site.githubUsername}
                <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
              </a>
            </div>
          </div>

          <div className="mt-6">
            <ContributionHeatmap weeks={payload.weeks} />
          </div>
        </PokemonPanel>
      </ScrollReveal>
    </SectionContainer>
  );
}
