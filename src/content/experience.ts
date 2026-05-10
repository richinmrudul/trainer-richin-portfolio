export type Experience = {
  id: string;
  organization: string;
  role: string;
  location: string;
  dates: string;
  highlights: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    id: "boilerexams",
    organization: "Boilerexams",
    role: "Backend Developer",
    location: "West Lafayette, IN",
    dates: "August 2025 – Present",
    highlights: [
      "Improving backend systems for Boilerexams, serving 30,000+ students and processing 8.5M+ submissions",
      "Migrating API endpoints from TypeScript/Prisma to Go (Golang) to improve backend scalability and latency",
      "Optimized PostgreSQL queries for 8.5M+ submissions across 3,000+ questions, reducing query latency",
      "Containerized backend services with Docker and improved reliability via logging and error handling",
    ],
    tech: ["Go", "PostgreSQL", "Docker", "TypeScript", "Prisma"],
  },
  {
    id: "profitize",
    organization: "Profitize",
    role: "Software Engineer",
    location: "Remote",
    dates: "July 2025 – Present",
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
    organization: "The Data Mine",
    role: "Undergraduate Data Science Researcher",
    location: "West Lafayette, IN",
    dates: "August 2024 – May 2025",
    highlights: [
      "Built an AI-assisted data pipeline for the Indiana Soybean Alliance, cutting collection time 96% (428→14s)",
      "Integrated LLMs like ChatGPT to automate program classification with NLP-driven analysis",
      "Migrated hard-coded datasets to a live PostgreSQL database enabling real-time updates and search",
      "Developed an admin dashboard for publishing and managing program data through a scalable backend",
    ],
    tech: ["Python", "PostgreSQL", "NLP", "LLMs", "Admin Systems"],
  },
  {
    id: "cs-club",
    organization: "CS Club",
    role: "Webmaster",
    location: "Purdue University",
    dates: "Present",
    highlights: [
      "Building and maintaining the Computer Science Club website",
      "Managing deployment and frontend architecture",
      "Designing a scalable and maintainable web experience",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];
