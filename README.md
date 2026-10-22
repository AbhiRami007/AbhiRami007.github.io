# Abhirami Pradeep Susi · Portfolio

**Live site: [abhirami007.github.io](https://abhirami007.github.io)**

Personal portfolio of Abhirami Pradeep Susi, a backend software engineer with around 4 years building
Node.js, TypeScript and NestJS APIs, microservices and real-time features for enterprise products,
now extending that work into AI-powered knowledge systems.

[LinkedIn](https://www.linkedin.com/in/abhirami-pradeep-susi/) ·
[GitHub](https://github.com/AbhiRami007) ·
[Resume (PDF)](https://abhirami007.github.io/assets/Abhirami_Pradeep_Susi_Resume.pdf)

## What's inside

- **Case studies** for Free2Move Charge, HiHydra, a Feature Flag Platform, Engig and a recruitment platform,
  each with flow diagrams and a small interactive demo. Confidential work is shown with abstract diagrams.
- **AI Enterprise Knowledge Platform**: an interactive architecture diagram, a UI concept and a roadmap where
  every feature is labelled honestly (planned, in progress, implemented or tested).
- **A lightweight 3D hero scene** drawn on plain canvas, loaded lazily and paused when off screen.
- **Accessible by design**: semantic landmarks, skip link, visible focus states, keyboard-operable tabs,
  accordions and diagram, reduced-motion support and layouts that work down to 320px.

## How it's built

No framework and no runtime dependencies. A small Node build script turns the content in `src/` into real
HTML pages (`/`, `/projects/<slug>/`, `/404.html`), so direct links and refreshes always work and there is
nothing to hydrate. A GitHub Actions workflow builds, checks and deploys the site to GitHub Pages on every
push to `master`.

---

## Developer notes

### Commands (Node 18+)

```bash
npm run build     # generates dist/
npm run check     # verifies internal links, assets and tag balance
npm test          # build + check
npm run preview   # build and serve dist/ locally
```

### Deploying

Push to `master`. The workflow in `.github/workflows/deploy.yml` runs `npm test` and publishes `dist/` to
GitHub Pages. In the repo, **Settings → Pages → Build and deployment → Source** must be set to
**GitHub Actions**.

If the site is ever hosted as a *project* page (for example `username.github.io/portfolio/`), build with
`BASE=/portfolio/ SITE_URL=https://username.github.io npm run build`.

### Editing content

| What | Where |
|---|---|
| Name, links, email, summary, hero text | `src/site.mjs` (`site`, `hero`) |
| Snapshot, skills, timeline | `src/site.mjs` |
| Projects and case studies | `src/projects.mjs` (re-exported from `src/site.mjs`) |
| AI platform status badges and roadmap | `src/site.mjs` (`aiStatus`) |
| AI architecture steps | `src/arch.mjs` |
| Interactive demos for each project | `src/assets/demos.js` |
| 3D stack, flow diagrams, scroll-linked journey | `src/assets/case.js` |
| Global motion (tilt, reveal, parallax) | `src/assets/fx.js` |
| UI concept sample data | `src/assets/concept.js` |
| Colours and type | CSS variables at the top of `src/assets/styles.css` |
| Resume PDF | replace `src/assets/Abhirami_Pradeep_Susi_Resume.pdf` |
| Social preview image | replace `src/assets/og.png` (1200×630) |

### Updating the AI platform honestly

Each feature in `aiStatus.features` has one status: `implemented-tested`, `implemented`, `progress`,
`planned` or `concept`. Change a status only when the code (and tests) exist. Add a repository link and a
real test summary to the case study once you have them.

### Adding a project

Add an object to `projects` in `src/projects.mjs`, add a visual in `scripts/build.mjs` (`visuals`), and
rebuild. Only add projects whose details you can defend in an interview. Use abstract diagrams for
confidential work.

### Privacy

The resume PDF is published with the site and includes the phone number from the resume. To keep it private,
export a version without it and replace the file.
