export const skillCategories = ["languages", "libraries", "tools"] as const;

export type SkillCategory = (typeof skillCategories)[number];

export const skillCategoryLabels: Record<SkillCategory, string> = {
  languages: "Languages",
  libraries: "Libraries / Frameworks",
  tools: "Technologies & Tools",
};

/** UI accent key — maps to Tailwind in components */
export type SkillAccent =
  | "ruby"
  | "sky"
  | "violet"
  | "amber"
  | "emerald"
  | "cyan"
  | "slate"
  | "teal";

export type PokemonSkillType =
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "psychic"
  | "steel"
  | "ground"
  | "flying"
  | "dark"
  | "normal";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  typeLabel: string;
  pokemonType: PokemonSkillType;
  proficiency: 1 | 2 | 3 | 4 | 5;
  description: string;
  usedIn: string[];
  accent: SkillAccent;
  tags: string[];
};

export const skills: Skill[] = [
  // Languages
  {
    id: "c",
    name: "C",
    category: "languages",
    typeLabel: "Systems & memory",
    pokemonType: "steel",
    proficiency: 4,
    description:
      "Used for low-level coursework, data structures, and understanding memory, pointers, and OS-facing code.",
    usedIn: ["Purdue coursework", "Systems foundations"],
    accent: "slate",
    tags: ["systems", "memory", "algorithms"],
  },
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    typeLabel: "Performance-oriented",
    pokemonType: "steel",
    proficiency: 4,
    description:
      "Applied in algorithms-heavy work and performance-sensitive patterns alongside modern STL usage.",
    usedIn: ["Coursework", "DSA"],
    accent: "sky",
    tags: ["algorithms", "STL"],
  },
  {
    id: "csharp",
    name: "C#",
    category: "languages",
    typeLabel: ".NET ecosystem",
    pokemonType: "psychic",
    proficiency: 3,
    description:
      "Object-oriented patterns and tooling familiarity for Windows-leaning stacks when projects demand it.",
    usedIn: ["Academic projects"],
    accent: "violet",
    tags: ["OOP", ".NET"],
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    typeLabel: "JVM / OOP",
    pokemonType: "fire",
    proficiency: 4,
    description:
      "Used for enterprise-style coursework, testing patterns with JUnit, and strongly typed backend-style logic.",
    usedIn: ["Purdue CS curriculum", "JUnit coursework"],
    accent: "amber",
    tags: ["JVM", "OOP", "testing"],
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    typeLabel: "ML & automation",
    pokemonType: "psychic",
    proficiency: 5,
    description:
      "Used for ML pipelines, scraping systems, backend tooling, and data processing.",
    usedIn: ["AgentGuard", "NBA MVP Predictor", "Profitize", "The Data Mine"],
    accent: "emerald",
    tags: ["ML", "pandas", "scraping", "APIs"],
  },
  {
    id: "go",
    name: "Go",
    category: "languages",
    typeLabel: "Concurrent services",
    pokemonType: "water",
    proficiency: 4,
    description:
      "Used for backend API migration and scalable service development at Boilerexams.",
    usedIn: ["Boilerexams", "Pendo.io"],
    accent: "cyan",
    tags: ["backend", "concurrency", "APIs"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    typeLabel: "Typed JavaScript",
    pokemonType: "electric",
    proficiency: 5,
    description:
      "Primary language for production web apps, Next.js surfaces, and typed API layers shared across projects.",
    usedIn: ["Boilerexams", "Cooked", "FitTrack", "CS Club Website"],
    accent: "sky",
    tags: ["frontend", "backend", "Next.js"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    typeLabel: "Runtime & browser",
    pokemonType: "electric",
    proficiency: 5,
    description:
      "Shipped interactive UIs, Node tooling, and runtime integration wherever the stack calls for JS-first APIs.",
    usedIn: ["FitTrack", "Cooked", "CS Club Website"],
    accent: "amber",
    tags: ["ESM", "Node", "browser"],
  },
  {
    id: "sql",
    name: "SQL",
    category: "languages",
    typeLabel: "Relational queries",
    pokemonType: "ground",
    proficiency: 5,
    description:
      "Schema design, joins, aggregations, and performance-minded queries across PostgreSQL and MySQL workloads.",
    usedIn: ["Boilerexams", "Cooked", "The Data Mine"],
    accent: "cyan",
    tags: ["queries", "schema", "optimization"],
  },
  {
    id: "html",
    name: "HTML",
    category: "languages",
    typeLabel: "Markup",
    pokemonType: "normal",
    proficiency: 5,
    description:
      "Semantic structure, accessibility-minded layouts, and component-driven composition in shipped web apps.",
    usedIn: ["FitTrack", "Cooked", "CS Club Website"],
    accent: "ruby",
    tags: ["semantic", "a11y"],
  },
  {
    id: "css",
    name: "CSS",
    category: "languages",
    typeLabel: "Presentation",
    pokemonType: "grass",
    proficiency: 5,
    description:
      "Responsive layouts, design systems, and Tailwind-style utility workflows for polished product UI.",
    usedIn: ["FitTrack", "Cooked", "CS Club Website"],
    accent: "violet",
    tags: ["responsive", "Tailwind"],
  },
  {
    id: "bash",
    name: "Bash",
    category: "languages",
    typeLabel: "Shell automation",
    pokemonType: "dark",
    proficiency: 4,
    description:
      "CI glue scripts, local dev ergonomics, and deployment automation alongside Docker-first workflows.",
    usedIn: ["Boilerexams", "GitHub Actions pipelines"],
    accent: "slate",
    tags: ["scripts", "CI", "devops"],
  },
  // Libraries / Frameworks
  {
    id: "react",
    name: "React",
    category: "libraries",
    typeLabel: "UI library",
    pokemonType: "electric",
    proficiency: 5,
    description:
      "Component architecture, hooks, client state, and integration with auth, APIs, and design systems.",
    usedIn: ["FitTrack", "Cooked", "NBA MVP Predictor UI"],
    accent: "sky",
    tags: ["hooks", "SPA", "components"],
  },
  {
    id: "vue",
    name: "Vue",
    category: "libraries",
    typeLabel: "UI framework",
    pokemonType: "grass",
    proficiency: 3,
    description:
      "Component-driven UIs, reactive state patterns, and frontend product work when the stack favors Vue.",
    usedIn: ["Frontend projects"],
    accent: "emerald",
    tags: ["components", "SPA", "reactive"],
  },
  {
    id: "react-native",
    name: "React Native",
    category: "libraries",
    typeLabel: "Cross-platform mobile",
    pokemonType: "flying",
    proficiency: 3,
    description:
      "Familiar with RN patterns for mobile-first product iteration when the stack targets iOS and Android together.",
    usedIn: ["Exploratory / coursework"],
    accent: "cyan",
    tags: ["mobile", "expo"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "libraries",
    typeLabel: "JS runtime",
    pokemonType: "electric",
    proficiency: 5,
    description:
      "HTTP services, tooling, and backend-for-frontend patterns paired with TypeScript for maintainable APIs.",
    usedIn: ["Cooked", "Boilerexams (historical TS)", "Netlify/Render workers"],
    accent: "emerald",
    tags: ["HTTP", "API", "tooling"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "libraries",
    typeLabel: "React framework",
    pokemonType: "flying",
    proficiency: 5,
    description:
      "App Router patterns, static export, server/client boundaries, and production deploys on modern hosts.",
    usedIn: ["CS Club Website", "Portfolio"],
    accent: "slate",
    tags: ["SSR", "routing", "Vercel"],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "libraries",
    typeLabel: "Python API framework",
    pokemonType: "water",
    proficiency: 4,
    description:
      "Async-capable APIs, validation with Pydantic-style patterns, and quick iteration for ML-backed services.",
    usedIn: ["ML APIs", "Python services"],
    accent: "emerald",
    tags: ["async", "API", "validation"],
  },
  {
    id: "claude-agent-sdk",
    name: "Claude Agent SDK",
    category: "libraries",
    typeLabel: "Agent tooling",
    pokemonType: "psychic",
    proficiency: 4,
    description:
      "Used to build agent workflows that analyze logs, take scoped actions, and integrate LLM reasoning into backend systems.",
    usedIn: ["Pendo.io"],
    accent: "violet",
    tags: ["agents", "LLM", "automation"],
  },
  {
    id: "junit",
    name: "JUnit",
    category: "libraries",
    typeLabel: "Java testing",
    pokemonType: "fire",
    proficiency: 3,
    description:
      "Unit and integration-style tests for Java coursework and correctness-focused assignments.",
    usedIn: ["Purdue CS curriculum"],
    accent: "amber",
    tags: ["testing", "Java"],
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "libraries",
    typeLabel: "Deep learning",
    pokemonType: "psychic",
    proficiency: 3,
    description:
      "Tensors, training loops, and experimentation when models need differentiable pipelines beyond classical ML.",
    usedIn: ["Research-style ML"],
    accent: "violet",
    tags: ["NN", "training"],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "libraries",
    typeLabel: "Deep learning",
    pokemonType: "psychic",
    proficiency: 3,
    description:
      "Graph and Keras-style workflows for coursework and comparative experiments alongside scikit-learn.",
    usedIn: ["Coursework"],
    accent: "amber",
    tags: ["Keras", "graphs"],
  },
  {
    id: "sklearn",
    name: "scikit-learn",
    category: "libraries",
    typeLabel: "Classical ML",
    pokemonType: "psychic",
    proficiency: 5,
    description:
      "Pipelines, preprocessing, model selection, and evaluation for tabular prediction systems in production-style notebooks.",
    usedIn: ["NBA MVP Predictor"],
    accent: "ruby",
    tags: ["classification", "pipelines"],
  },
  // Technologies & Tools
  {
    id: "rest",
    name: "REST API",
    category: "tools",
    typeLabel: "Integration",
    pokemonType: "water",
    proficiency: 5,
    description:
      "Resource modeling, versioning, auth headers, error contracts, and client integration across shipped apps.",
    usedIn: ["Cooked", "FitTrack", "Boilerexams"],
    accent: "sky",
    tags: ["HTTP", "JSON", "auth"],
  },
  {
    id: "git",
    name: "Git",
    category: "tools",
    typeLabel: "Version control",
    pokemonType: "dark",
    proficiency: 5,
    description:
      "Branching strategies, code review hygiene, rebases, and collaborative workflows on GitHub.",
    usedIn: ["All projects"],
    accent: "slate",
    tags: ["GitHub", "PRs"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "tools",
    typeLabel: "Containers",
    pokemonType: "steel",
    proficiency: 4,
    description:
      "Containerized backend services, reproducible dev environments, and deployment parity at Boilerexams.",
    usedIn: ["AgentGuard", "Boilerexams"],
    accent: "cyan",
    tags: ["containers", "deploy"],
  },
  {
    id: "docker-compose",
    name: "Docker Compose",
    category: "tools",
    typeLabel: "Local orchestration",
    pokemonType: "steel",
    proficiency: 4,
    description:
      "Used to run multi-service development stacks with APIs, workers, queues, databases, and object storage together.",
    usedIn: ["Distributed Video Processing Infrastructure"],
    accent: "cyan",
    tags: ["containers", "local dev", "services"],
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "tools",
    typeLabel: "Container orchestration",
    pokemonType: "steel",
    proficiency: 3,
    description:
      "Used for thinking through containerized service deployment, scaling boundaries, health checks, and distributed workload operations.",
    usedIn: ["Distributed Video Processing Infrastructure"],
    accent: "slate",
    tags: ["orchestration", "containers", "infra"],
  },
  {
    id: "azure-aks",
    name: "Azure AKS",
    category: "tools",
    typeLabel: "Managed Kubernetes",
    pokemonType: "flying",
    proficiency: 3,
    description:
      "Managed Kubernetes target for deploying containerized APIs, workers, queues, and supporting infrastructure on Azure.",
    usedIn: ["Distributed Video Processing Infrastructure"],
    accent: "sky",
    tags: ["Azure", "Kubernetes", "cloud"],
  },
  {
    id: "aws",
    name: "AWS",
    category: "tools",
    typeLabel: "Cloud platform",
    pokemonType: "flying",
    proficiency: 3,
    description:
      "Core services familiarity for storage, networking, and managed primitives when stacks land on AWS.",
    usedIn: ["Coursework", "select deployments"],
    accent: "amber",
    tags: ["cloud", "S3"],
  },
  {
    id: "cicd",
    name: "CI/CD",
    category: "tools",
    typeLabel: "Delivery automation",
    pokemonType: "electric",
    proficiency: 5,
    description:
      "GitHub Actions pipelines, automated checks, and repeatable release paths for SaaS and open-source repos.",
    usedIn: ["Profitize", "Boilerexams", "FitTrack"],
    accent: "emerald",
    tags: ["GitHub Actions", "automation"],
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    category: "tools",
    typeLabel: "CI automation",
    pokemonType: "electric",
    proficiency: 5,
    description:
      "Automated checks, builds, and deployment workflows across project repositories and production-style pipelines.",
    usedIn: ["AgentGuard", "Profitize", "Boilerexams", "Distributed Video Processing Infrastructure"],
    accent: "emerald",
    tags: ["CI/CD", "automation", "GitHub"],
  },
  {
    id: "ghcr",
    name: "GHCR",
    category: "tools",
    typeLabel: "Container registry",
    pokemonType: "steel",
    proficiency: 3,
    description:
      "Used as a GitHub-native registry target for publishing and pulling container images in deployment workflows.",
    usedIn: ["Distributed Video Processing Infrastructure"],
    accent: "slate",
    tags: ["containers", "registry", "GitHub"],
  },
  {
    id: "gcp",
    name: "GCP",
    category: "tools",
    typeLabel: "Google Cloud",
    pokemonType: "flying",
    proficiency: 3,
    description:
      "Cloud primitives and managed services exposure for coursework and hybrid cloud experiments.",
    usedIn: ["Coursework", "Pendo.io"],
    accent: "sky",
    tags: ["cloud"],
  },
  {
    id: "redis",
    name: "Redis",
    category: "tools",
    typeLabel: "Queue & cache",
    pokemonType: "electric",
    proficiency: 4,
    description:
      "Used for asynchronous job dispatch and fast coordination between API services and background workers.",
    usedIn: ["Distributed Video Processing Infrastructure"],
    accent: "ruby",
    tags: ["queue", "cache", "workers"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "tools",
    typeLabel: "Relational DB",
    pokemonType: "ground",
    proficiency: 5,
    description:
      "Used for relational schema design, query optimization, and production data systems.",
    usedIn: ["Boilerexams", "Cooked", "The Data Mine"],
    accent: "cyan",
    tags: ["SQL", "indexes", "migrations"],
  },
  {
    id: "snowflake",
    name: "Snowflake",
    category: "tools",
    typeLabel: "Cloud data warehouse",
    pokemonType: "water",
    proficiency: 4,
    description:
      "Used for warehouse destinations and incremental data export pipelines in production integrations work.",
    usedIn: ["Pendo.io"],
    accent: "sky",
    tags: ["warehouse", "exports", "data"],
  },
  {
    id: "databricks",
    name: "Databricks",
    category: "tools",
    typeLabel: "Lakehouse platform",
    pokemonType: "electric",
    proficiency: 4,
    description:
      "Used as an analytics destination for incremental sync pipelines and large-scale data delivery.",
    usedIn: ["Pendo.io"],
    accent: "amber",
    tags: ["lakehouse", "exports", "analytics"],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "tools",
    typeLabel: "Relational DB",
    pokemonType: "ground",
    proficiency: 3,
    description:
      "Secondary relational engine experience for schemas, migrations, and compatibility-minded SQL.",
    usedIn: ["Academic / legacy stacks"],
    accent: "slate",
    tags: ["SQL"],
  },
  {
    id: "minio-s3",
    name: "MinIO/S3",
    category: "tools",
    typeLabel: "Object storage",
    pokemonType: "water",
    proficiency: 4,
    description:
      "Used for S3-compatible storage of raw uploads, processed media, thumbnails, and short-lived presigned asset URLs.",
    usedIn: ["Distributed Video Processing Infrastructure"],
    accent: "teal",
    tags: ["object storage", "S3", "presigned URLs"],
  },
  {
    id: "ffmpeg",
    name: "FFmpeg",
    category: "tools",
    typeLabel: "Media processing",
    pokemonType: "fire",
    proficiency: 4,
    description:
      "Used in worker processes for video transcoding, thumbnail generation, and CPU-bound media-processing tasks.",
    usedIn: ["Distributed Video Processing Infrastructure"],
    accent: "amber",
    tags: ["video", "workers", "processing"],
  },
  {
    id: "prometheus",
    name: "Prometheus",
    category: "tools",
    typeLabel: "Metrics",
    pokemonType: "psychic",
    proficiency: 3,
    description:
      "Metrics and monitoring tool for observing service health, queue pressure, and infrastructure behavior.",
    usedIn: ["Distributed Video Processing Infrastructure"],
    accent: "ruby",
    tags: ["metrics", "monitoring", "observability"],
  },
  {
    id: "grafana",
    name: "Grafana",
    category: "tools",
    typeLabel: "Dashboards",
    pokemonType: "psychic",
    proficiency: 3,
    description:
      "Dashboarding layer for visualizing infrastructure metrics and operational signals from distributed services.",
    usedIn: ["Distributed Video Processing Infrastructure"],
    accent: "amber",
    tags: ["dashboards", "monitoring", "observability"],
  },
  {
    id: "django",
    name: "Django",
    category: "tools",
    typeLabel: "Python web",
    pokemonType: "grass",
    proficiency: 3,
    description:
      "Batteries-included patterns for admin, ORM, and auth when Python-first backends fit the product shape.",
    usedIn: ["Coursework"],
    accent: "emerald",
    tags: ["ORM", "admin"],
  },
  {
    id: "netlify",
    name: "Netlify",
    category: "tools",
    typeLabel: "Edge & static hosting",
    pokemonType: "flying",
    proficiency: 4,
    description:
      "Static and serverless deploys, environment configuration, and fast iteration for frontend-led products.",
    usedIn: ["Profitize", "FitTrack"],
    accent: "teal",
    tags: ["serverless", "deploy"],
  },
  {
    id: "render",
    name: "Render",
    category: "tools",
    typeLabel: "PaaS",
    pokemonType: "steel",
    proficiency: 4,
    description:
      "Managed services and simple production paths for APIs and workers alongside Git-based deploys.",
    usedIn: ["Profitize"],
    accent: "violet",
    tags: ["PaaS", "API hosting"],
  },
];

export const DEFAULT_SKILL_ID = "typescript";

export function skillsInCategory(category: SkillCategory): Skill[] {
  return skills.filter((s) => s.category === category);
}
