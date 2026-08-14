import { NextResponse } from "next/server";
import { site } from "@/content/site";
import {
  buildFallbackContributions,
  fetchGithubContributions,
} from "@/lib/github-contributions";

export const runtime = "nodejs";

export async function GET() {
  const username = site.githubUsername;
  const token = process.env.GITHUB_TOKEN?.trim();

  const cacheHeaders = {
    "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
  };

  if (!token) {
    return NextResponse.json(buildFallbackContributions(username), {
      headers: {
        ...cacheHeaders,
        "X-GitHub-Source": "fallback",
      },
    });
  }

  try {
    const payload = await fetchGithubContributions(username, token);
    return NextResponse.json(payload, {
      headers: {
        ...cacheHeaders,
        "X-GitHub-Source": "live",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown GitHub fetch error";
    console.error("[github/contributions]", message);
    return NextResponse.json(buildFallbackContributions(username), {
      status: 200,
      headers: {
        ...cacheHeaders,
        "X-GitHub-Source": "fallback",
        "X-GitHub-Error": message.slice(0, 180),
      },
    });
  }
}
