export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type ActivityTotals = {
  commits: number;
  pullRequests: number;
  issues: number;
  codeReviews: number;
};

export type GithubContributionsPayload = {
  username: string;
  totalContributions: number;
  weeks: ContributionWeek[];
  totals: ActivityTotals;
  percentages: {
    commits: number;
    pullRequests: number;
    issues: number;
    codeReviews: number;
  };
  fetchedAt: string;
  source: "live" | "fallback";
};

function levelFromCount(count: number): ContributionDay["level"] {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function toPercentages(totals: ActivityTotals) {
  const sum =
    totals.commits +
    totals.pullRequests +
    totals.issues +
    totals.codeReviews;
  if (sum <= 0) {
    return { commits: 0, pullRequests: 0, issues: 0, codeReviews: 0 };
  }
  const round = (n: number) => Math.round((n / sum) * 100);
  const commits = round(totals.commits);
  const pullRequests = round(totals.pullRequests);
  const issues = round(totals.issues);
  const codeReviews = Math.max(
    0,
    100 - commits - pullRequests - issues,
  );
  return { commits, pullRequests, issues, codeReviews };
}

type GraphQlCalendarDay = {
  date: string;
  contributionCount: number;
  color?: string;
};

type GraphQlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: GraphQlCalendarDay[];
          }>;
        };
        totalCommitContributions?: number;
        totalIssueContributions?: number;
        totalPullRequestContributions?: number;
        totalPullRequestReviewContributions?: number;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
    }
  }
`;

export async function fetchGithubContributions(
  username: string,
  token: string,
): Promise<GithubContributionsPayload> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "trainer-richin-portfolio",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { login: username },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL HTTP ${res.status}`);
  }

  const json = (await res.json()) as GraphQlResponse;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  const collection = json.data?.user?.contributionsCollection;
  const calendar = collection?.contributionCalendar;
  if (!calendar) {
    throw new Error("Missing contributionsCollection for user");
  }

  const weeks: ContributionWeek[] = calendar.weeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelFromCount(day.contributionCount),
    })),
  }));

  const totals: ActivityTotals = {
    commits: collection?.totalCommitContributions ?? 0,
    pullRequests: collection?.totalPullRequestContributions ?? 0,
    issues: collection?.totalIssueContributions ?? 0,
    codeReviews: collection?.totalPullRequestReviewContributions ?? 0,
  };

  return {
    username,
    totalContributions: calendar.totalContributions,
    weeks,
    totals,
    percentages: toPercentages(totals),
    fetchedAt: new Date().toISOString(),
    source: "live",
  };
}

export function buildFallbackContributions(
  username: string,
): GithubContributionsPayload {
  // Deterministic sparse year so the UI never blanks without a token.
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - 364);
  while (start.getUTCDay() !== 0) {
    start.setUTCDate(start.getUTCDate() - 1);
  }

  const weeks: ContributionWeek[] = [];
  let total = 0;
  const cursor = new Date(start);

  for (let w = 0; w < 53; w += 1) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d += 1) {
      const seed = (w * 7 + d) * 17;
      const count = seed % 11 === 0 ? (seed % 8) + 1 : 0;
      total += count;
      days.push({
        date: cursor.toISOString().slice(0, 10),
        count,
        level: levelFromCount(count),
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push({ days });
  }

  const totals: ActivityTotals = {
    commits: Math.max(1, Math.round(total * 0.62)),
    pullRequests: Math.max(1, Math.round(total * 0.21)),
    issues: Math.max(1, Math.round(total * 0.08)),
    codeReviews: Math.max(1, Math.round(total * 0.09)),
  };

  return {
    username,
    totalContributions: total,
    weeks,
    totals,
    percentages: toPercentages(totals),
    fetchedAt: new Date().toISOString(),
    source: "fallback",
  };
}
