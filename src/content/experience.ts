export type Experience = {
  id: string;
  /** Route-style progression label for the journey narrative. */
  routeMarker: string;
  organization: string;
  role: string;
  location: string;
  dates: string;
  highlights: string[];
  tech: string[];
};

/**
 * Reverse-chronological: current roles first (newest start → ongoing),
 * then completed roles (most recent end first).
 */
export const experiences: Experience[] = [
  {
    id: "pendo",
    routeMarker: "Route 01 - Pendo.io",
    organization: "Pendo.io",
    role: "Software Engineer Intern",
    location: "Raleigh, North Carolina",
    dates: "June 2026 - August 2026",
    highlights: [
      "Built a Go/Claude agent that cut incident triage from ~2h to ~10m by tracing incidents to causal code changes",
      "Cut per-sync data volume ~95% with incremental exports to Snowflake, BigQuery, and Databricks",
      "Prevented credential-less destinations by gating DB commits on successful Secret Manager writes",
      "Remediated 9 LLM-agent security findings with scoped IAM, DLP redaction, and per-service credentials",
    ],
    tech: [
      "Go",
      "Claude",
      "Cloud Run",
      "BigQuery",
      "Snowflake",
      "Databricks",
      "Secret Manager",
      "IAM",
    ],
  },
  {
    id: "boilerexams",
    routeMarker: "Route 02 - Boilerexams",
    organization: "Boilerexams",
    role: "Backend Developer",
    location: "West Lafayette, IN",
    dates: "August 2025 - Present",
    highlights: [
      "Improving backend systems for Boilerexams, serving 30,000+ students and processing 11M+ submissions",
      "Migrating API endpoints from TypeScript/Prisma to Go (Golang) to improve backend scalability and latency",
      "Optimized PostgreSQL queries for 11M+ submissions over 3,000+ questions, reducing query latency 20%",
      "Containerized backend services with Docker and improved reliability via logging and error handling",
    ],
    tech: ["Go", "PostgreSQL", "Docker", "TypeScript", "Prisma"],
  },
  {
    id: "cs-club",
    routeMarker: "Route 03 - CS Club",
    organization: "CS Club",
    role: "Webmaster",
    location: "Purdue University",
    dates: "August 2025 - Present",
    highlights: [
      "Building and maintaining the Computer Science Club website",
      "Managing deployment and frontend architecture",
      "Designing a scalable and maintainable web experience",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "profitize",
    routeMarker: "Route 04 - Profitize",
    organization: "Profitize",
    role: "Software Engineer",
    location: "Remote",
    dates: "July 2025 - Present",
    highlights: [
      "Built a SaaS analytics platform for 500+ Amazon sellers automating profit analysis and product research",
      "Engineered scraping pipeline with Python, Playwright, Selenium, & RapidFuzz, reducing research time 80%",
      "Implemented real-time fuzzy matching across Amazon listings to improve product data accuracy",
      "Deployed infrastructure using Netlify, Render, and GitHub Actions",
    ],
    tech: ["Python", "Selenium", "Playwright", "RapidFuzz", "GitHub Actions"],
  },
  {
    id: "data-mine",
    routeMarker: "Route 05 - The Data Mine",
    organization: "The Data Mine",
    role: "Undergraduate Data Science Researcher",
    location: "West Lafayette, IN",
    dates: "August 2024 - May 2025",
    highlights: [
      "Built an AI-assisted data pipeline for the Indiana Soybean Alliance, cutting collection time 96% (428→14s)",
      "Integrated LLMs like ChatGPT to automate program classification with NLP-driven analysis",
      "Migrated hard-coded datasets to a live PostgreSQL database enabling real-time updates and search",
      "Developed an admin dashboard for publishing and managing program data through a scalable backend",
    ],
    tech: ["Python", "PostgreSQL", "NLP", "LLMs", "Admin Systems"],
  },
];
