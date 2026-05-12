export const projectAccents = ["sky", "amber", "violet", "indigo"] as const;

export type ProjectAccent = (typeof projectAccents)[number];

export type Project = {
  id: string;
  title: string;
  category: string;
  /** Display id for dossier cards (e.g. entry / build reference). */
  buildId: string;
  /** Compact capability labels — rendered as professional type-style badges. */
  typeBadges: readonly string[];
  description: string;
  bullets: string[];
  tech: string[];
  impact: string;
  /** Short system overview for modal dossier. */
  architecture: string;
  /** Quantitative / outcome lines for the dossier header strip. */
  metrics: readonly string[];
  /** Post-ship reflection — recruiter-safe, concrete. */
  lessonsLearned: readonly string[];
  liveUrl: string | null;
  githubUrl: string | null;
  image: string;
  accent: ProjectAccent;
};

export const projects: Project[] = [
  {
    id: "fittrack",
    title: "FitTrack",
    category: "AI Fitness Platform",
    buildId: "ENTRY NO. 001 · BLD-FIT",
    typeBadges: ["AI", "Full-stack", "Firebase"],
    description:
      "Built a full-stack fitness tracker using React and Firebase for workout logging and progress tracking.",
    bullets: [
      "Implemented onboarding with Firebase Auth and Google OAuth to personalize plans from user fitness data",
      "Integrated OpenAI GPT-4 to generate personalized 7-day workout plans, improving completion 45%",
      "Used by 20+ users generating 100+ plans and logging 500+ workouts in the first 3 weeks",
    ],
    tech: [
      "React",
      "Firebase",
      "Google OAuth",
      "OpenAI GPT-4",
      "TypeScript",
      "Vercel",
    ],
    impact: "100+ plans generated",
    architecture:
      "React SPA on Vercel talks to Firebase Auth + Firestore for identity and workout logs; GPT-4 invoked behind guarded server paths for plan generation with structured prompts and user context.",
    metrics: [
      "45% lift in plan completion (early cohort)",
      "100+ generated plans in first weeks",
      "500+ workouts logged in-app",
    ],
    lessonsLearned: [
      "Tightening prompt contracts and validation cut bad generations faster than model swaps alone.",
      "Shipping auth + logging first made later AI features measurable instead of anecdotal.",
    ],
    liveUrl: "https://fit-track-black.vercel.app/",
    githubUrl: "https://github.com/richinmrudul/FitTrack",
    image: "/projects/fittrack.png",
    accent: "sky",
  },
  {
    id: "cooked",
    title: "Cooked",
    category: "Food Ranking Platform",
    buildId: "ENTRY NO. 002 · BLD-CKD",
    typeBadges: ["Full-stack", "PostgreSQL", "Product"],
    description:
      "Built a full-stack meal tracker with React, ranking recipes using an ELO-based comparison system.",
    bullets: [
      "Designed relational PostgreSQL schema linking meals, users, tags, and rankings for fast queries",
      "Implemented auth and profile system with JWT and Cloudinary image uploads",
      "Built search, filters, and CRUD workflows with streak tracking, driving 3+ meals logged/user/week",
    ],
    tech: [
      "React",
      "PostgreSQL",
      "JWT",
      "Cloudinary",
      "TypeScript",
      "REST APIs",
    ],
    impact: "3+ meals logged/user/week",
    architecture:
      "React client against a typed REST API; PostgreSQL as source of truth for meals, ELO ratings, and streak aggregates; JWT sessions and Cloudinary for media.",
    metrics: [
      "3+ meals logged per user per week (sustained)",
      "ELO-driven ranking across tagged recipes",
      "JWT + image pipeline in production",
    ],
    lessonsLearned: [
      "Schema design upfront saved painful refactors when ranking rules evolved.",
      "Habit loops (streaks + fast logging UX) moved engagement more than extra features.",
    ],
    liveUrl: "https://cooked-omega.vercel.app/",
    githubUrl: "https://github.com/richinmrudul/Cooked",
    image: "/projects/cooked.png",
    accent: "amber",
  },
  {
    id: "nba-mvp-predictor",
    title: "NBA MVP Predictor",
    category: "Machine Learning System",
    buildId: "ENTRY NO. 003 · BLD-NBA",
    typeBadges: ["ML", "Python", "Sports Analytics"],
    description:
      "Built an ML MVP prediction model using scikit-learn and pandas on historical NBA player data.",
    bullets: [
      "Preprocessed 5,000+ player records, removing low-activity players and irrelevant features to improve accuracy",
      "Implemented model training, evaluation, and serialization using Python notebooks and standalone scripts",
      "Deployed a Flask API serving real-time MVP predictions through accessible HTTP endpoints",
    ],
    tech: ["Python", "scikit-learn", "pandas", "Flask", "Jupyter", "ML"],
    impact: "5,000+ records processed",
    architecture:
      "Offline notebooks and scripts for feature work and training; serialized estimators loaded by a small Flask service exposing prediction endpoints over HTTP.",
    metrics: [
      "5,000+ cleaned player-season rows",
      "Notebook-to-API path for reproducible runs",
      "Flask API for live inference",
    ],
    lessonsLearned: [
      "Feature hygiene beat marginal model tweaks for stability on sparse player seasons.",
      "Packaging the model for a thin API made evaluation with real callers much easier.",
    ],
    liveUrl: null,
    githubUrl: "https://github.com/richinmrudul/nba-mvp-predictor",
    image: "/projects/nba-mvp.png",
    accent: "violet",
  },
  {
    id: "cs-club-website",
    title: "CS Club Website",
    category: "Organization Website",
    buildId: "ENTRY NO. 004 · BLD-ORG",
    typeBadges: ["Web", "Leadership", "Deployment"],
    description:
      "Built the Purdue Indianapolis Computer Science Club website from scratch as the club webmaster.",
    bullets: [
      "Designed and implemented the public-facing website for the Computer Science Club",
      "Built a clean, responsive interface to communicate club identity, events, and resources",
      "Deployed and maintained the site through Purdue-hosted infrastructure",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Static Export",
      "Purdue Hosting",
    ],
    impact: "Official club website",
    architecture:
      "Next.js static export for fast, cache-friendly pages; componentized content sections and Purdue-managed hosting for long-lived club presence.",
    metrics: [
      "Primary public surface for club programs",
      "Static export for predictable ops",
      "Ongoing webmaster ownership",
    ],
    lessonsLearned: [
      "Clear information hierarchy mattered more than visual novelty for student traffic.",
      "Static export simplified handoff and reduced runtime surprises on university infra.",
    ],
    liveUrl: "https://csclubindy.cs.purdue.edu/",
    githubUrl: null,
    image: "/projects/cs-club.png",
    accent: "indigo",
  },
];
