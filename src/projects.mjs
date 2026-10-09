// Project content. Case-study text comes from the author's own Notion write-ups.
// Diagrams are redrawn from those step-by-step flows. Interactive demos are simulations.
// `layer` on a journey step is the index of the layer it touches in `layers`.

export const projects = [
  /* ───────────────────────── Free2Move Charge ───────────────────────── */
  {
    slug: 'free2move-charge', visual: 'ev', featured: true, demo: 'f2m',
    name: 'Free2Move Charge', client: 'Stellantis', type: 'EV charging platform · enterprise product',
    org: 'Experion Technologies', role: 'Software Engineer, backend', status: 'Professional work',
    problem: 'Drivers need to find a nearby charging station, charge, pay and see their history without friction.',
    summary: 'An EV charging platform where users find nearby stations, start and stop charging, pay for it, and review their charging history.',
    tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'OpenSearch', 'Redis', 'Socket.IO', 'Firebase'],
    case: {
      overview: ['Free2Move Charge is an EV charging platform. Users find nearby charging stations, start and stop charging, pay for what they use, and view their charging history and payments.'],
      does: [['Finding stations', 'Nearby stations, or clusters of stations where many sit close together, based on the user’s location.'], ['Managing sessions', 'Start, track and stop charging sessions, with time and energy usage monitored live.'], ['Payments and history', 'Cost is calculated from usage, payment is processed, and every session is stored for history.']],
      layers: [
        { n: 'App', d: 'What the driver sees: station map, charging controls and history.', nodes: ['Station map', 'Start / stop charging', 'Live session', 'History'] },
        { n: 'Backend APIs', d: 'Node.js and TypeScript APIs I worked on: station search, session handling, and payment and usage data.', nodes: ['Station search', 'Sessions', 'Payments', 'Usage'] },
        { n: 'Speed and real time', d: 'Caching and OpenSearch for fast station discovery, plus real-time updates for live sessions.', nodes: ['Redis cache', 'OpenSearch', 'Real-time updates'] },
        { n: 'Data', d: 'Session, payment and usage records stored for history and billing.', nodes: ['Sessions', 'Payments', 'Usage records'] },
      ],
      sequences: [
        { id: 'search', title: 'Finding a station', actors: ['Driver', 'App', 'Backend API', 'Cache + OpenSearch'],
          msgs: [['Driver', 'App', 'Opens the app'], ['App', 'Backend API', 'Sends the user’s location'], ['Backend API', 'Cache + OpenSearch', 'Looks up nearby stations'], ['Cache + OpenSearch', 'Backend API', 'Returns matching stations'], ['Backend API', 'App', 'Stations, or clusters when many are close'], ['Driver', 'App', 'Picks a station and views details']] },
        { id: 'charge', title: 'Charging and payment', actors: ['Driver', 'App', 'Backend API', 'Session', 'Payment', 'Database'],
          msgs: [['Driver', 'App', 'Taps Start Charging'], ['App', 'Backend API', 'Start request'], ['Backend API', 'Session', 'Creates the charging session'], ['Session', 'Session', 'Tracks time and energy usage'], ['Session', 'App', 'Live progress via real-time updates'], ['Driver', 'App', 'Stops charging (or it ends automatically)'], ['Backend API', 'Session', 'Closes session, totals usage'], ['Backend API', 'Payment', 'Cost from usage, processes payment'], ['Payment', 'Backend API', 'Payment status'], ['Backend API', 'Database', 'Stores session, payment and usage'], ['Backend API', 'App', 'History and payment details']] },
      ],
      journey: [
        { t: 'Register or log in', pts: ['The user creates an account or logs in.', 'Profile and basic details are saved.', 'They land on the app dashboard.'], layer: 0 },
        { t: 'Find charging stations', pts: ['The app shows nearby stations, or station clusters when many are close, based on location.', 'The user views station details and selects a station.'], layer: 2 },
        { t: 'Start charging', pts: ['The user taps Start Charging.', 'The system creates a charging session and charging begins.'], layer: 1 },
        { t: 'Charging in progress', pts: ['The system tracks charging time and energy usage.', 'The user watches session progress in the app.'], layer: 2 },
        { t: 'Stop charging', pts: ['The user stops, or the session ends automatically.', 'The system closes the session and calculates total usage.'], layer: 1 },
        { t: 'Payment', pts: ['Cost is calculated from usage.', 'Payment is processed and its status updated.'], layer: 1 },
        { t: 'Save the record', pts: ['Session, payment, usage and billing details are stored for history.'], layer: 3 },
        { t: 'Dashboard and history', pts: ['The user can view charging history, payment details, usage and session details.'], layer: 0 },
      ],
      contrib: ['Worked on backend APIs.', 'Implemented station search logic.', 'Improved performance using caching and OpenSearch.', 'Enabled real-time updates.', 'Supported session and payment data flow.'],
      outcome: ['Faster station discovery.', 'A smooth charging experience.', 'Clear payment and history tracking.'],
      note: 'The map and charging session in the demo are a simulation with sample stations and a sample tariff. They are not Free2Move data or screens.',
    },
    themes: [],
  },

  /* ───────────────────────── HiHydra ───────────────────────── */
  {
    slug: 'hihydra', visual: 'hh', featured: true, demo: 'hh',
    name: 'HiHydra', client: 'Experion project', type: 'SaaS platform · third-party app management',
    org: 'Experion Technologies', role: 'Software Engineer, backend', status: 'Professional work',
    problem: 'People use many third-party apps and have no single place to connect them, control their permissions and manage a subscription.',
    summary: 'A subscription SaaS platform where users connect and manage third-party apps from one dashboard, with permissions and Stripe-based billing.',
    tech: ['Node.js', 'TypeScript', 'Stripe', 'Third-party integrations', 'Backend APIs'],
    case: {
      overview: ['HiHydra is a SaaS platform where users connect and manage third-party apps from a single dashboard. Users register, browse the supported apps, connect them and grant permissions, then manage everything from one place.', 'Access is subscription-based and uses Stripe for payments. Some days may be offered as free access.'],
      does: [['Accounts', 'User registration, login and profile.'], ['App connections', 'Connect third-party apps and manage the permissions granted to them.'], ['Subscription and billing', 'Free days, paid access, Stripe payments and a view of plan and payment details.']],
      layers: [
        { n: 'Dashboard', d: 'One view of connected apps, permission status, plan and payments.', nodes: ['Connected apps', 'Permissions', 'Plan and billing'] },
        { n: 'Backend APIs', d: 'The APIs I worked on: user and app-connection flows, permissions and subscription data.', nodes: ['Users', 'App connections', 'Permissions', 'Subscriptions'] },
        { n: 'Integrations', d: 'Third-party apps the user connects, and Stripe for subscription payments.', nodes: ['Third-party apps', 'Stripe'] },
        { n: 'Data', d: 'Profiles, connections, permission status, subscription and payment details.', nodes: ['Profiles', 'Connections', 'Subscription and payments'] },
      ],
      sequences: [
        { id: 'connect', title: 'Connecting an app', actors: ['User', 'Dashboard', 'Backend API', 'Third-party app', 'Database'],
          msgs: [['User', 'Dashboard', 'Chooses an app to connect'], ['Dashboard', 'Backend API', 'Connection request'], ['Backend API', 'Third-party app', 'Sends the user to sign in'], ['User', 'Third-party app', 'Signs in and grants permissions'], ['Third-party app', 'Backend API', 'Permissions granted'], ['Backend API', 'Database', 'Saves the connection'], ['Backend API', 'Dashboard', 'App shows as connected']] },
        { id: 'pay', title: 'Subscription and payment', actors: ['User', 'Dashboard', 'Backend API', 'Stripe', 'Database'],
          msgs: [['User', 'Dashboard', 'Opens the platform'], ['Dashboard', 'Backend API', 'Checks subscription status'], ['Backend API', 'Dashboard', 'Free days left, or payment needed'], ['User', 'Stripe', 'Pays for access when needed'], ['Stripe', 'Backend API', 'Payment result'], ['Backend API', 'Database', 'Stores subscription and payment details'], ['Backend API', 'Dashboard', 'Plan and access status updated']] },
      ],
      journey: [
        { t: 'Register or log in', pts: ['The user creates an account or logs in.', 'Profile details are saved.', 'They enter the dashboard.'], layer: 0 },
        { t: 'Access plan', pts: ['The user starts with free days or paid access.', 'Subscription status is checked.', 'If needed, payment is handled through Stripe.'], layer: 2 },
        { t: 'View available apps', pts: ['The user sees the list of supported third-party apps.', 'They choose which app to connect.'], layer: 0 },
        { t: 'Connect a third-party app', pts: ['The user signs in to the external platform.', 'They grant the required permissions.', 'The connection is saved in the system.'], layer: 2 },
        { t: 'Manage connected apps', pts: ['View connected apps.', 'Manage permissions.', 'Use app-related features from HiHydra.'], layer: 1 },
        { t: 'Subscription and billing', pts: ['View the current plan or access status.', 'Continue or renew paid access.', 'Payment and subscription details are stored.'], layer: 3 },
        { t: 'Dashboard', pts: ['One view of connected apps, permission status, subscription and payment details, and platform access status.'], layer: 0 },
      ],
      contrib: ['Worked on backend APIs.', 'Implemented user and app connection flows.', 'Handled third-party app integrations.', 'Supported permission management.', 'Worked on the subscription and payment flow using Stripe.', 'Helped manage the data shown in the dashboard.'],
      outcome: ['Users manage multiple apps in one place.', 'Permissions are easier to control.', 'Subscription and billing are handled smoothly.', 'The dashboard gives one clear view of apps and payments.'],
      note: 'The demo is a simulation with made-up sample apps. No real sign-in or payment happens, and it does not show HiHydra screens.',
    },
    themes: [],
  },

  /* ───────────────────────── Feature Flag ───────────────────────── */
  {
    slug: 'feature-flag-platform', visual: 'ff', featured: true, demo: 'ff',
    name: 'Feature Flag Platform', client: 'Experion project', type: 'Full-stack system with an SDK',
    org: 'Experion Technologies', role: 'Full-stack: dashboard, APIs and SDK', status: 'Professional work',
    problem: 'Turning a feature on or off, or rolling it out gradually, normally means changing code and redeploying every application that uses it.',
    summary: 'A full-stack feature flag system with an admin dashboard and an SDK, so applications can switch features on and off without redeploying code.',
    tech: ['Full-stack dashboard', 'REST APIs', 'SDK', 'Rule evaluation'],
    case: {
      overview: ['The Feature Flag Platform is a full-stack system with an SDK. Different applications can dynamically enable or disable features without redeploying code.', 'The system separates a control layer (the admin dashboard) from an execution layer (the SDK used by applications).'],
      does: [['Control', 'Admins create flags and configure conditions and rules in the dashboard.'], ['Execute', 'Applications hold no flag logic. They call the SDK with a condition id or name.'], ['Decide', 'The SDK reads the rules, applies the logic and returns ON (show) or OFF (hide).']],
      layers: [
        { n: 'Admin dashboard', d: 'The control layer: login, create flags, configure conditions and rules.', nodes: ['Login', 'Flags', 'Conditions', 'Rules'] },
        { n: 'Backend APIs', d: 'CRUD APIs for flags and conditions.', nodes: ['Flag CRUD', 'Condition CRUD'] },
        { n: 'Store', d: 'Flag id, flag name, conditions and rules.', nodes: ['Flag id + name', 'Conditions', 'Rules'] },
        { n: 'SDK', d: 'The execution layer: reads the condition name, fetches rules, applies logic, returns ON or OFF.', nodes: ['Fetch rules', 'Apply logic', 'ON / OFF'] },
        { n: 'Applications', d: 'Any project that installs the SDK. They only ask: should this feature be enabled?', nodes: ['App 1', 'App 2', 'App 3'] },
      ],
      sequences: [
        { id: 'config', title: 'Admin configures a flag', actors: ['Admin', 'Dashboard', 'Backend API', 'Store'],
          msgs: [['Admin', 'Dashboard', 'Logs in'], ['Admin', 'Dashboard', 'Creates a feature flag'], ['Admin', 'Dashboard', 'Sets user, environment or percentage rules'], ['Dashboard', 'Backend API', 'Save request'], ['Backend API', 'Store', 'Stores flag id, name, conditions and rules'], ['Backend API', 'Dashboard', 'Saved']] },
        { id: 'eval', title: 'An app asks the SDK', actors: ['Application', 'SDK', 'Backend API', 'Store'],
          msgs: [['Application', 'SDK', 'Checks a condition by id or name'], ['SDK', 'Backend API', 'Fetches the rules'], ['Backend API', 'Store', 'Reads the flag configuration'], ['Store', 'SDK', 'Rules returned'], ['SDK', 'SDK', 'Applies the logic'], ['SDK', 'Application', 'ON: show feature, or OFF: hide it']] },
      ],
      journey: [
        { t: 'Admin login', pts: ['The admin logs into the dashboard.', 'They get access to feature controls.'], layer: 0 },
        { t: 'Create a feature flag', pts: ['The admin creates a feature.'], layer: 0 },
        { t: 'Configure conditions and rules', pts: ['User-based conditions.', 'Environment-based conditions.', 'Percentage rollout.'], layer: 0 },
        { t: 'Save the configuration', pts: ['The backend stores the flag id, flag name, conditions and rules.'], layer: 2 },
        { t: 'The application uses the SDK', pts: ['The project installs the SDK.', 'The developer asks one question: should this feature be enabled?'], layer: 4 },
        { t: 'The SDK evaluates', pts: ['It reads the condition name.', 'It fetches the rules.', 'It applies the logic.'], layer: 3 },
        { t: 'Return the decision', pts: ['ON: the feature is enabled.', 'OFF: the feature is hidden.'], layer: 3 },
        { t: 'Real-time control', pts: ['The admin updates rules in the dashboard.', 'Changes reflect across all apps.'], layer: 1 },
      ],
      contrib: ['Built the full-stack dashboard, frontend and backend.', 'Designed the feature flag system architecture.', 'Developed CRUD APIs for flags and conditions.', 'Built the SDK for external applications.', 'Implemented the rule evaluation logic inside the SDK.', 'Enabled real-time feature toggling across apps.'],
      outcome: ['Features can be controlled without deployment.', 'Multiple apps can reuse the same system.', 'Faster experimentation and rollout.', 'Reduced production risk.'],
      note: 'The demo is a simulation. The percentage rollout uses a simple sample hash and the code shown is illustrative, not the SDK’s real API.',
    },
    themes: [],
  },

  /* ───────────────────────── Engig ───────────────────────── */
  {
    slug: 'engig', visual: 'eng', featured: true, demo: 'eng',
    name: 'Engig', client: 'Black & Veatch', type: 'Engineering project management · internal platform',
    org: 'Experion Technologies', role: 'Software Engineer, backend', status: 'Professional work',
    problem: 'Large engineering programmes need structured, consistent project and master data, and a backend that stays fast and maintainable as it grows.',
    summary: 'An internal engineering project management platform for managing large-scale engineering workflows, where my work focused on backend APIs, master data, TypeScript migration and technical debt.',
    tech: ['Node.js', 'TypeScript', 'MVC architecture', 'REST APIs', 'Master data'],
    case: {
      overview: ['Engig is an internal engineering project management platform used to manage large-scale engineering workflows. It helps teams manage project data and records, track engineering components and workflows, maintain structured master data, and improve system performance by resolving technical debt.'],
      does: [['Project data', 'Managing engineering project data and records.'], ['Master data', 'Structured core business data such as components and configurations, kept consistent across the system.'], ['APIs and dashboard', 'APIs for the frontend and other systems, and a dashboard for internal users.']],
      layers: [
        { n: 'Dashboard', d: 'Internal users log in, browse project data and move between modules.', nodes: ['Login', 'Projects', 'Modules'] },
        { n: 'API layer', d: 'Node.js and TypeScript, structured with MVC: routes and controllers receive requests and return updated data.', nodes: ['Controllers', 'Business logic', 'Models'] },
        { n: 'Master data', d: 'Core data such as components and configurations, managed once and reused everywhere.', nodes: ['Components', 'Configurations'] },
        { n: 'Database', d: 'All changes are stored with data integrity.', nodes: ['Records', 'Data models'] },
      ],
      sequences: [
        { id: 'record', title: 'Managing a record', actors: ['User', 'Dashboard', 'Controller', 'Business logic', 'Model', 'Database'],
          msgs: [['User', 'Dashboard', 'Creates or updates a record'], ['Dashboard', 'Controller', 'API request'], ['Controller', 'Business logic', 'Validates and applies business rules'], ['Business logic', 'Model', 'Uses the data model'], ['Model', 'Database', 'Saves the change'], ['Database', 'Controller', 'Updated record'], ['Controller', 'Dashboard', 'Response'], ['Dashboard', 'User', 'Sees the update straight away']] },
      ],
      journey: [
        { t: 'User login', pts: ['The user logs in.', 'Access is validated.', 'They enter the dashboard.'], layer: 0 },
        { t: 'Dashboard access', pts: ['The user sees project-related data.', 'They navigate between modules.'], layer: 0 },
        { t: 'Manage engineering data', pts: ['The user creates and updates records.', 'Data is stored in a structured format.', 'APIs handle the data operations.'], layer: 1 },
        { t: 'Master data management', pts: ['Core data such as components and configurations is managed.', 'This keeps the system consistent.'], layer: 2 },
        { t: 'Data processing', pts: ['The system processes the request.', 'It applies business logic.', 'It returns updated data.'], layer: 1 },
        { t: 'Save and update records', pts: ['All changes are stored in the database.', 'Data integrity is preserved.'], layer: 3 },
        { t: 'View updates', pts: ['The user sees updated data in the dashboard and carries on managing workflows.'], layer: 0 },
      ],
      contrib: ['Worked on backend APIs using Node.js and TypeScript.', 'Migrated legacy JavaScript code to TypeScript.', 'Followed MVC architecture for a better structure.', 'Resolved technical debt issues.', 'Improved API performance and maintainability.', 'Worked with the database and data models.'],
      outcome: ['Improved system performance.', 'A cleaner, more scalable backend architecture.', 'Better data consistency.', 'Reduced technical debt.'],
      note: 'The demo is a simulation with sample records. Client data, screens and internal architecture are not shown.',
    },
    themes: [],
  },

  /* ───────────────────────── Recruits Group ───────────────────────── */
  {
    slug: 'recruits-group-platform', visual: 'hire', featured: false,
    name: 'Recruitment platform', client: 'The Recruits Group', type: 'Recruitment technology · startup product',
    org: 'The Recruits Group (UK), remote', role: 'Part-time Technical Lead', status: 'Professional work',
    problem: 'A recruitment startup needed its core product capabilities designed and delivered with a very small team.',
    tech: ['Node.js', 'React', 'PostgreSQL', 'MongoDB', 'DigitalOcean', 'Hostinger'],
    summary: 'Backend and full-stack modules for job posting, candidate discovery and engagement, built in direct collaboration with the founder.',
    did: ['Worked directly with the founder on architecture and delivery.', 'Designed and built backend and full-stack modules for job posting, candidate discovery and engagement.', 'Took ownership of technical decisions and delivery: requirements analysis, API design, database schema design and implementation.', 'Supported deployments to DigitalOcean and Hostinger.'],
    themes: [['Requirements to schema', 'In a small team the same person turns a vague need into an API and a data model. Getting the model right early saves rework.'], ['Two databases, on purpose', 'PostgreSQL and MongoDB were both part of the stack. Relational data and flexible documents suit different parts of a recruitment product.']],
    diagramNote: 'Conceptual workflow of the product areas I worked on. Not a product screenshot.',
  },

  /* ───────────────────────── AI Knowledge Platform ───────────────────────── */
  {
    slug: 'ai-knowledge-platform', visual: 'ai', featured: true, building: true,
    name: 'AI Enterprise Knowledge Platform', client: 'Portfolio project', type: 'Multi-tenant RAG platform · in development',
    org: 'Self-directed', role: 'Designer and developer', status: 'In development',
    problem: 'Company knowledge is scattered across documents. Keyword search misses meaning, and a general-purpose LLM can give answers nothing supports.',
    tech: ['TypeScript', 'NestJS', 'PostgreSQL', 'pgvector', 'AWS S3 (target)', 'AWS SQS (target)', 'Docker (planned)', 'React (planned)'],
    summary: 'A multi-tenant platform where an organisation uploads documents, has them processed asynchronously, and asks questions answered from its own sources, with citations.',
    did: [], themes: [], diagramNote: '',
  },
];
