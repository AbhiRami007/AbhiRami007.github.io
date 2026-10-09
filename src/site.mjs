// ─────────────────────────────────────────────────────────────
// All portfolio content lives here, separate from presentation.
// Every claim below comes from the resume or the AI platform brief.
// Update the `aiStatus` values as you implement and test features.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: "Abhirami Pradeep Susi",
  short: "Abhirami",
  title: "Backend Software Engineer",
  url: "https://abhirami007.github.io",
  email: "abhirami.pradeepsusi07@gmail.com",
  linkedin: "https://www.linkedin.com/in/abhirami-pradeep-susi/",
  github: "https://github.com/AbhiRami007",
  resume: "assets/Abhirami_Pradeep_Susi_Resume.pdf",
  description:
    "Backend software engineer with 4+ years building Node.js, TypeScript and NestJS APIs, microservices and real-time features for enterprise products. Extending that foundation into AI-enabled knowledge systems. Open to relocation.",
  location: "Based in Kerala, India · Open to relocation",
};

export const hero = {
  headline: [
    "Building reliable backend systems.",
    "Exploring intelligent software.",
  ],
  lead: "I'm a backend software engineer experienced in enterprise APIs, microservices, performance optimisation and data-intensive applications, currently extending that foundation into AI-powered knowledge systems.",
};

export const snapshot = [
  {
    title: "4+ years in software engineering",
    text: "Dec 2020 to Mar 2025 across Experion Technologies and a UK recruitment-technology startup.",
  },
  {
    title: "Backend and API development",
    text: "Node.js, TypeScript and NestJS REST APIs and microservices, with PostgreSQL, MongoDB, Redis and OpenSearch.",
  },
  {
    title: "Enterprise product experience",
    text: "Free2Move Charge (Stellantis), Engig (Black & Veatch), HiHydra and a Feature Flag platform, built inside delivery teams at Experion.",
  },
  {
    title: "Performance work",
    text: "Reported 30% API performance improvement through Redis caching, PostgreSQL indexing and API redesign.",
  },
  {
    title: "AI engineering, in progress",
    text: "Building a portfolio knowledge platform with RAG and pgvector. Labelled as in development, not as shipped work.",
  },
];

// status: 'established' = used in paid work, 'learning' = currently learning / project only
export const skills = [
  {
    id: "backend",
    name: "Backend engineering",
    blurb: "The core of my day-to-day work.",
    items: [
      ["Node.js", "established"],
      ["TypeScript", "established"],
      ["NestJS", "established"],
      ["Express.js", "established"],
      ["JavaScript", "established"],
      ["Python", "learning"],
    ],
  },
  {
    id: "api",
    name: "APIs and microservices",
    blurb: "Service design, auth and real-time delivery.",
    items: [
      ["REST APIs", "established"],
      ["Microservices", "established"],
      ["Event-driven architecture", "established"],
      ["WebSockets", "established"],
      ["Socket.IO", "established"],
      ["Firebase (real-time)", "established"],
      ["JWT authentication", "established"],
    ],
  },
  {
    id: "data",
    name: "Databases and search",
    blurb: "Schema design, indexing and query tuning.",
    items: [
      ["PostgreSQL", "established"],
      ["MongoDB", "established"],
      ["Redis", "established"],
      ["OpenSearch", "established"],
      ["Schema design", "established"],
      ["Indexing and query optimisation", "established"],
    ],
  },
  {
    id: "cloud",
    name: "Cloud and delivery",
    blurb: "Monitoring and pipelines, with cloud depth still growing.",
    items: [
      ["AWS CloudWatch", "established"],
      ["Azure DevOps CI/CD", "established"],
      ["Docker", "established"],
      ["Git and GitHub", "established"],
      ["DigitalOcean and Hostinger deploys", "established"],
      ["AWS S3 and SQS", "learning"],
    ],
  },
  {
    id: "quality",
    name: "Testing and reliability",
    blurb: "Tests alongside features.",
    items: [
      ["Jest", "established"],
      ["Postman", "established"],
      ["Unit tests", "established"],
      ["Integration tests", "established"],
      ["Production defect investigation", "established"],
      ["Code review", "established"],
    ],
  },
  {
    id: "ai",
    name: "AI and knowledge retrieval",
    blurb: "Learning in public through the knowledge platform build.",
    items: [
      ["LLM API integration", "learning"],
      ["Prompt engineering", "learning"],
      ["Embeddings", "learning"],
      ["RAG", "learning"],
      ["pgvector", "learning"],
      ["Document ingestion and chunking", "learning"],
    ],
  },
  {
    id: "frontend",
    name: "Frontend and UI",
    blurb: "Supporting experience that lets me ship full-stack modules.",
    items: [
      ["React.js", "established"],
      ["HTML", "established"],
      ["CSS", "established"],
    ],
  },
];

export const timeline = [
  {
    id: "self",
    kind: "Projects",
    when: "Apr 2025 – present",
    role: "Technical projects and upskilling",
    org: "Self-directed, not paid employment",
    points: [
      "Designing the AI Enterprise Knowledge Platform: a multi-tenant, document-grounded question answering system.",
      "Learning LLM API integration, prompt engineering, embeddings and vector retrieval.",
      "Features are listed as complete only once they are implemented and tested.",
    ],
  },
  {
    id: "georgian",
    kind: "Education",
    when: "May 2024 – Dec 2024",
    role: "Postgraduate Diploma, Mobile Application Development",
    org: "Georgian College, Canada",
    points: [],
  },
  {
    id: "trg",
    kind: "Work",
    when: "Feb 2024 – Mar 2025",
    role: "Part-time Technical Lead",
    org: "The Recruits Group · UK recruitment-technology startup · Remote",
    points: [
      "Worked directly with the founder on architecture and delivery of core recruitment-platform capabilities.",
      "Designed and built backend and full-stack modules for job posting, candidate discovery and engagement with Node.js, React, PostgreSQL and MongoDB.",
      "Owned technical decisions and delivery, from requirements analysis and API design to schema design and implementation.",
      "Supported deployments to DigitalOcean and Hostinger.",
    ],
  },
  {
    id: "se",
    kind: "Work",
    when: "Mar 2022 – Apr 2024",
    role: "Software Engineer",
    org: "Experion Technologies",
    points: [
      "Built and maintained Node.js and TypeScript REST APIs and microservices for Free2Move Charge (Stellantis) and Engig (Black & Veatch).",
      "Improved API performance by 30% through Redis caching, PostgreSQL indexing and API redesign.",
      "Optimised PostgreSQL and OpenSearch queries behind location-based EV charging-station discovery.",
      "Implemented real-time, event-driven features with Socket.IO and Firebase.",
      "Contributed to AWS CloudWatch monitoring and Azure DevOps CI/CD pipelines.",
      "Investigated production defects, took part in code reviews and mentored junior developers.",
    ],
  },
  {
    id: "ase",
    kind: "Work",
    when: "Dec 2020 – Mar 2022",
    role: "Associate Software Engineer",
    org: "Experion Technologies",
    points: [
      "Developed Node.js and NestJS backend services and PostgreSQL-backed REST APIs for enterprise integrations, including Master Data Management APIs.",
      "Implemented JWT authentication and authorisation, plus real-time updates through WebSocket and Firebase.",
      "Wrote unit and integration tests with Jest and Postman, reaching 85% test coverage.",
      "Contributed Node.js and React.js features and improved application responsiveness by 20%.",
    ],
  },
  {
    id: "mca",
    kind: "Education",
    when: "May 2018 – May 2020",
    role: "Master of Computer Applications (MCA)",
    org: "College of Engineering, Trivandrum, India",
    points: [],
  },
  {
    id: "bca",
    kind: "Education",
    when: "Jun 2015 – Apr 2018",
    role: "Bachelor's Degree, Computer Applications",
    org: "Don Bosco College of Arts and Science, India",
    points: [],
  },
];

export { projects } from "./projects.mjs";

// Statuses: implemented-tested | implemented | progress | planned | concept
// I had no repository evidence when writing this, so everything past design is labelled honestly.
// Change a value here as work lands; the site updates everywhere.
export const aiStatus = {
  badge: "In development",
  summaryLine:
    "Architecture and product design are in progress. Components below are target architecture until implemented and tested.",
  features: [
    ["Product concept and architecture", "progress"],
    ["Tenant-aware NestJS API", "planned"],
    ["PostgreSQL schema for tenants, documents and status", "planned"],
    ["Upload to object storage (S3) and queue (SQS)", "planned"],
    ["Worker: extract, clean and chunk text", "planned"],
    ["Embeddings and pgvector retrieval", "planned"],
    [
      "Grounded answers with citations and an insufficient-evidence state",
      "planned",
    ],
    ["Automated API and integration tests", "planned"],
    ["Docker, AWS deployment and CloudWatch", "planned"],
    ["Minimal React front end", "planned"],
    ["Interactive UI concept on this site (sample data)", "concept"],
  ],
  roadmap: [
    [
      "Vertical slice",
      "Tenant-aware API, document metadata and upload, status visible end to end.",
    ],
    [
      "Async ingestion",
      "Queue and worker for extraction and chunking, with failed and retry states.",
    ],
    [
      "Retrieval",
      "Embeddings stored with pgvector, tenant-scoped retrieval, one measured quality experiment.",
    ],
    [
      "Grounded answers",
      "Context assembly, citations tied to retrieved chunks, insufficient-evidence handling.",
    ],
    [
      "Reliability",
      "Failure-path tests, Docker, AWS deployment and CloudWatch monitoring.",
    ],
    ["Front end", "Minimal React workspace connected to the real API."],
  ],
  nextMilestone:
    "Complete the first working vertical slice: upload a document, see its processing status, and cover it with API tests.",
};

export const statusLabels = {
  "implemented-tested": "Implemented and tested",
  implemented: "Implemented",
  progress: "In progress",
  planned: "Planned",
  concept: "UI concept",
};
