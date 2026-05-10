export const projectAccents = ["sky", "amber", "violet", "indigo"] as const;

export type ProjectAccent = (typeof projectAccents)[number];

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  bullets: string[];
  tech: string[];
  impact: string;
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
    liveUrl: "https://fit-track-black.vercel.app/",
    githubUrl: "https://github.com/richinmrudul/FitTrack",
    image: "/projects/fittrack.png",
    accent: "sky",
  },
  {
    id: "cooked",
    title: "Cooked",
    category: "Food Ranking Platform",
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
    liveUrl: "https://cooked-omega.vercel.app/",
    githubUrl: "https://github.com/richinmrudul/Cooked",
    image: "/projects/cooked.png",
    accent: "amber",
  },
  {
    id: "nba-mvp-predictor",
    title: "NBA MVP Predictor",
    category: "Machine Learning System",
    description:
      "Built an ML MVP prediction model using scikit-learn and pandas on historical NBA player data.",
    bullets: [
      "Preprocessed 5,000+ player records, removing low-activity players and irrelevant features to improve accuracy",
      "Implemented model training, evaluation, and serialization using Python notebooks and standalone scripts",
      "Deployed a Flask API serving real-time MVP predictions through accessible HTTP endpoints",
    ],
    tech: ["Python", "scikit-learn", "pandas", "Flask", "Jupyter", "ML"],
    impact: "5,000+ records processed",
    liveUrl: null,
    githubUrl: "https://github.com/richinmrudul/nba-mvp-predictor",
    image: "/projects/nba-mvp.png",
    accent: "violet",
  },
  {
    id: "cs-club-website",
    title: "CS Club Website",
    category: "Organization Website",
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
    liveUrl: "https://csclubindy.cs.purdue.edu/",
    githubUrl: null,
    image: "/projects/cs-club.png",
    accent: "indigo",
  },
];
