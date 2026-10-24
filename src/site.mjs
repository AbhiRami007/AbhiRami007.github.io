// ─────────────────────────────────────────────────────────────
// All portfolio content lives here, separate from presentation.
// Every claim below matches the resume. Update `aiStatus` as features land.
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
    "Backend software engineer with 3+ years building Node.js, TypeScript and NestJS APIs, microservices and real-time features for enterprise products. Now building a RAG knowledge platform on NestJS and pgvector. Open to relocation.",
  location: "Based in Kerala, India · Open to relocation",
};

export const hero = {
  headline: ["Reliable APIs for real products.", "Now building with RAG."],
  lead: "I'm a backend engineer with 3+ years of Node.js, TypeScript and NestJS on enterprise products for Stellantis and Black & Veatch: REST APIs, microservices, real-time features and query performance. I'm now building a multi-tenant knowledge platform with RAG and pgvector.",
};

export const snapshot = [
  {
    title: "3+ years of backend engineering",
    text: "Associate to Software Engineer at Experion Technologies (Dec 2020 – Mar 2022), then promoted to Software Engineer (Mar 2022 to Apr 2024).",
  },
  {
    title: "APIs and microservices",
    text: "REST APIs and microservices in Node.js, TypeScript and NestJS, backed by PostgreSQL, MongoDB, Redis and OpenSearch.",
  },
  {
    title: "Enterprise products",
    text: "Free2Move Charge (Stellantis), Engig (Black & Veatch), HiHydra and a feature flag platform, delivered in Experion product teams.",
  },
  {
    title: "30% faster APIs",
    text: "Improved API performance by 30% with Redis caching, PostgreSQL indexing and API redesign.",
  },
  {
    title: "AI platform in progress",
    text: "A multi-tenant RAG platform on NestJS and pgvector. Architecture done; API and schema underway.",
  },
];

// status: 'established' = used in paid work, 'learning' = currently learning / project only
export const skills = [
  {
    id: "backend",
    name: "Backend engineering",
    blurb: "What I use day to day.",
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
    blurb: "Service design, auth and real-time features.",
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
      ["MySQL", "established"],
      ["Redis", "established"],
      ["OpenSearch", "established"],
      ["Schema design", "established"],
      ["Indexing and query optimisation", "established"],
    ],
  },
  {
    id: "cloud",
    name: "Cloud and delivery",
    blurb: "Monitoring, pipelines and deployments.",
    items: [
      ["AWS CloudWatch", "established"],
      ["AWS S3", "established"],
      ["AWS SQS", "established"],
      ["Azure DevOps CI/CD", "established"],
      ["Docker", "established"],
      ["Git and GitHub", "established"],
      ["DigitalOcean and Hostinger deploys", "established"],
    ],
  },
  {
    id: "quality",
    name: "Testing and reliability",
    blurb: "Testing, debugging and code review.",
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
    blurb: "Learning by building the knowledge platform.",
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
    blurb: "Enough React to ship full-stack features.",
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
    when: "Jan 2025 – present",
    role: "Career break & upskilling",
    org: "Self-directed, not paid employment",
    points: [
      "Maternity break in 2025, followed by a structured return to engineering through certification, AI upskilling and hands-on projects",
      "Earned the Project Management Professional (PMP)® certification, adding formal grounding in delivery planning, risk management and stakeholder communication to technical-lead experience",
      "Completed Academy Accreditations in Generative AI Fundamentals and AI Agent Fundamentals, building a foundation for LLM-enabled backend systems",
      "AI Enterprise Knowledge Platform (portfolio project, in development): designing a multi-tenant, document-grounded Q&A platform with NestJS, PostgreSQL/pgvector and RAG with source citations, using AWS S3 and SQS for asynchronous document ingestion and embedding. Architecture is done; the NestJS API and PostgreSQL schema are in progress",
      "Client demo website (KHALIFA perfumes): built a React + NestJS monorepo as a client demonstration project",
      "Refreshing core JavaScript/TypeScript and backend fundamentals through structured interview preparation",
    ],
  },
  {
    id: "georgian",
    kind: "Education",
    when: "May 2024 – Dec 2024",
    role: "Postgraduate Diploma, Mobile Application Development",
    org: "Georgian College, Canada",
    points: [
      "Completed with a grade of 8.9/10.",
      'Built "Drive Me", a cross-platform (Android and iOS) mobile app in React Native that lets users book a vetted driver to drive their own car during unplanned situations, such as travelling to a hospital when unwell. Drivers must meet a qualification criteria before they can accept bookings.',
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
    points: [
      "Secured 4th rank in the Kerala MCA lateral entrance examination, earning admission to College of Engineering Trivandrum.",
      "Graduated with a CGPA of 8.7/10.",
      "Core coursework: data structures and algorithms, database management systems, operating systems, computer networks and software engineering.",
      "Final-year project: built an IoT-based vehicle headlight automation system that detects an oncoming vehicle's high beam and automatically dims the headlight, and switches headlights on in foggy conditions to reduce accident risk.",
    ],
  },
  {
    id: "bca",
    kind: "Education",
    when: "Jun 2015 – Apr 2018",
    role: "Bachelor's Degree, Computer Applications",
    org: "Don Bosco College of Arts and Science, India",
    points: ["Graduated with a CGPA of 7.9/10."],
  },
];

export { projects } from "./projects.mjs";

// Statuses: done | implemented-tested | implemented | progress | planned | concept
// Change a value here as work lands; the site updates everywhere.
export const aiStatus = {
  badge: "In development",
  summaryLine:
    "Architecture and the UI concept are done. The NestJS API and PostgreSQL schema are in progress; everything after that is planned.",
  features: [
    ["Product concept and architecture", "done"],
    ["Interactive UI concept on this site (sample data)", "concept"],
    ["NestJS API project in TypeScript", "progress"],
    ["Tenant-aware API endpoints", "progress"],
    ["PostgreSQL schema for tenants, documents and status", "progress"],
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
  ],
  done: [
    [
      "Product and architecture design",
      "Ingestion and question-answering paths mapped end to end, with the main trade-offs decided up front.",
    ],
    [
      "Interactive UI concept",
      "Document library, processing states and cited answers, built on this page with sample data.",
    ],
  ],
  inProgress: [
    [
      "NestJS API",
      "TypeScript NestJS project set up; tenant-aware endpoints for documents being built.",
    ],
    [
      "PostgreSQL schema",
      "Tables for tenants, documents and processing status.",
    ],
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
  done: "Done",
  "implemented-tested": "Implemented and tested",
  implemented: "Implemented",
  progress: "In progress",
  planned: "Planned",
  concept: "UI concept",
};
