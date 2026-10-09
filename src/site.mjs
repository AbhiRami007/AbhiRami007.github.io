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
    "Backend software engineer with 4+ years building Node.js, TypeScript and NestJS APIs, microservices and real-time features for enterprise products. Extending that foundation into AI-enabled knowledge systems. Open to relocation",
  location: "Kerala, India · open to relocation",
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
    text: "Free2Move Charge for Stellantis and Engig for Black & Veatch, built inside delivery teams at Experion.",
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

export const projects = [
  {
    slug: "free2move-charge",
    visual: "ev",
    featured: true,
    name: "Free2Move Charge",
    client: "Stellantis",
    type: "EV charging platform · enterprise product",
    org: "Experion Technologies",
    role: "Software Engineer, backend",
    status: "Professional work",
    problem:
      "Drivers need to find EV charging stations near them quickly, and the apps they use need to stay in sync as things change.",
    tech: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "OpenSearch",
      "Redis",
      "Socket.IO",
      "Firebase",
      "AWS CloudWatch",
      "Azure DevOps",
    ],
    summary:
      "Backend APIs and microservices for an EV charging product used by a major automotive group, with a focus on location-based station discovery and responsive APIs.",
    did: [
      "Built and maintained Node.js and TypeScript REST APIs and microservices.",
      "Optimised PostgreSQL and OpenSearch queries that support location-based charging-station discovery.",
      "Improved API performance by 30% through Redis caching, PostgreSQL indexing and API redesign (reported across my Experion software-engineer role).",
      "Implemented real-time, event-driven features with Socket.IO and Firebase to keep clients synchronised.",
      "Contributed to AWS CloudWatch monitoring and Azure DevOps CI/CD pipelines.",
      "Investigated production defects, reviewed code and mentored junior developers.",
    ],
    themes: [
      [
        "Location search",
        "Finding stations around a point is a query-shape problem. Indexing and query tuning in PostgreSQL and OpenSearch are where the speed comes from.",
      ],
      [
        "Caching with a reason",
        "Redis helps most where reads repeat. The 30% figure came from combining caching, indexing and an API redesign, not one trick.",
      ],
      [
        "Keeping clients in sync",
        "Event-driven updates over Socket.IO and Firebase mean clients do not have to poll for change.",
      ],
    ],
    diagramNote:
      "Illustrative sketch of the technologies I worked with. It is not the client’s architecture.",
  },
  {
    slug: "engig",
    visual: "eng",
    featured: true,
    name: "Engig",
    client: "Black & Veatch",
    type: "Engineering management platform · enterprise product",
    org: "Experion Technologies",
    role: "Software Engineer, backend",
    status: "Professional work",
    problem:
      "Large engineering organisations need dependable internal software to manage engineering work across teams.",
    tech: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Socket.IO",
      "Firebase",
      "Azure DevOps",
    ],
    summary:
      "Backend services for an engineering-management product built for a global engineering and consulting firm. Details are kept general because this is client work.",
    did: [
      "Built and maintained Node.js and TypeScript REST APIs and microservices.",
      "Shared the performance and real-time work described in my Experion role: Redis caching, PostgreSQL indexing, Socket.IO and Firebase events.",
      "Took part in code reviews and production defect investigation.",
      "Worked with Azure DevOps CI/CD pipelines.",
    ],
    themes: [
      [
        "Enterprise constraints",
        "Enterprise products come with access rules, review gates and delivery pipelines that shape how APIs are designed and released.",
      ],
      [
        "Small services, clear boundaries",
        "Microservices helped teams ship independently, at the cost of more discipline around contracts and monitoring.",
      ],
    ],
    diagramNote:
      "Abstract diagram only. No client screens or internal architecture are shown.",
  },
  {
    slug: "recruits-group-platform",
    visual: "hire",
    featured: true,
    name: "Recruitment platform",
    client: "The Recruits Group",
    type: "Recruitment technology · startup product",
    org: "The Recruits Group (UK), remote",
    role: "Part-time Technical Lead",
    status: "Professional work",
    problem:
      "A recruitment startup needed its core product capabilities designed and delivered with a very small team.",
    tech: [
      "Node.js",
      "React",
      "PostgreSQL",
      "MongoDB",
      "DigitalOcean",
      "Hostinger",
    ],
    summary:
      "Backend and full-stack modules for job posting, candidate discovery and engagement, built in direct collaboration with the founder.",
    did: [
      "Worked directly with the founder on architecture and delivery.",
      "Designed and built backend and full-stack modules for job posting, candidate discovery and engagement.",
      "Took ownership of technical decisions and delivery: requirements analysis, API design, database schema design and implementation.",
      "Supported deployments to DigitalOcean and Hostinger.",
    ],
    themes: [
      [
        "Requirements to schema",
        "In a small team the same person turns a vague need into an API and a data model. Getting the model right early saves rework.",
      ],
      [
        "Two databases, on purpose",
        "PostgreSQL and MongoDB were both part of the stack. Relational data and flexible documents suit different parts of a recruitment product.",
      ],
    ],
    diagramNote:
      "Conceptual workflow of the product areas I worked on. Not a product screenshot.",
  },
  {
    slug: "enterprise-integrations",
    visual: "mdm",
    featured: false,
    name: "Enterprise integrations and Master Data APIs",
    client: "Experion Technologies",
    type: "Backend services · enterprise integrations",
    org: "Experion Technologies",
    role: "Associate Software Engineer",
    status: "Professional work",
    problem:
      "Enterprise systems need consistent, secured access to shared master data.",
    tech: [
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "JWT",
      "WebSocket",
      "Firebase",
      "Jest",
      "Postman",
      "React.js",
    ],
    summary:
      "My first role at Experion: NestJS services and PostgreSQL-backed REST APIs for enterprise integrations, including Master Data Management APIs.",
    did: [
      "Developed Node.js and NestJS backend services and PostgreSQL-backed REST APIs.",
      "Built Master Data Management APIs as part of enterprise integrations.",
      "Implemented JWT authentication and authorisation.",
      "Added real-time updates through WebSocket and Firebase integrations.",
      "Wrote unit and integration tests with Jest and Postman, reaching 85% test coverage.",
      "Contributed Node.js and React.js features and improved application responsiveness by 20%.",
    ],
    themes: [
      [
        "Testing as habit",
        "This is where I built the habit of shipping tests with APIs, covering both unit and integration levels.",
      ],
      [
        "Auth at the edge of the service",
        "JWT authentication and authorisation belong in the API layer where every route can rely on them.",
      ],
    ],
    diagramNote:
      "Abstract hub-and-spoke diagram. Client systems are not named or depicted.",
  },
  {
    slug: "ai-knowledge-platform",
    visual: "ai",
    featured: true,
    building: true,
    name: "AI Enterprise Knowledge Platform",
    client: "Portfolio project",
    type: "Multi-tenant RAG platform · in development",
    org: "Self-directed",
    role: "Designer and developer",
    status: "In development",
    problem:
      "Company knowledge is scattered across documents. Keyword search misses meaning, and a general-purpose LLM can give answers nothing supports.",
    tech: [
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "pgvector",
      "AWS S3 (target)",
      "AWS SQS (target)",
      "Docker (planned)",
      "React (planned)",
    ],
    summary:
      "A multi-tenant platform where an organisation uploads documents, has them processed asynchronously, and asks questions answered from its own sources, with citations.",
    did: [],
    themes: [],
    diagramNote: "",
  },
];

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
