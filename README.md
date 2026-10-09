# Abhirami Pradeep Susi · Portfolio

A static, dependency-free portfolio: multi-page, accessible, with a lightweight 3D hero scene,
an interactive architecture diagram and an interactive UI concept for the AI Enterprise Knowledge Platform.

## Why no framework

The site is content-driven and deploys to GitHub Pages, so a tiny build script generates real HTML pages
(`/`, `/projects/<slug>/`, `/404.html`). That means direct links and refreshes always work, there is
nothing to hydrate, and there are no dependencies to update. The 3D scene is plain canvas with perspective
projection (no Three.js), loaded lazily and paused when off screen. Add React or Three.js only if a future
feature needs them.

## Commands (Node 18+)

```bash
npm run build     # generates dist/
npm run check     # verifies internal links, assets and tag balance
npm test          # build + check
npm run preview   # build and serve dist/ locally
```

## Deploy to GitHub Pages

This repo is meant to replace the `abhirami007.github.io` repository.

1. Copy this project's files into that repo (replace the old site).
2. Push to `main`.
3. In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/`.

If you ever host it as a *project* page (for example `username.github.io/portfolio/`), build with
`BASE=/portfolio/ SITE_URL=https://username.github.io npm run build`.

No build step? You can also run `npm run build` locally and publish the contents of `dist/` yourself.

## Editing content

| What | Where |
|---|---|
| Name, links, email, summary, hero text | `src/site.mjs` (`site`, `hero`) |
| Snapshot, skills, timeline | `src/site.mjs` |
| Projects and case studies | `src/site.mjs` (`projects`) |
| AI platform status badges and roadmap | `src/site.mjs` (`aiStatus`) |
| AI architecture steps | `src/arch.mjs` |
| UI concept sample data | `src/assets/concept.js` |
| Colours and type | CSS variables at the top of `src/assets/styles.css` |
| Resume PDF | replace `src/assets/Abhirami_Pradeep_Susi_Resume.pdf` |
| Social preview image | replace `src/assets/og.png` (1200×630) |

### Updating the AI platform honestly

Each feature in `aiStatus.features` has one status: `implemented-tested`, `implemented`, `progress`,
`planned` or `concept`. Change a status only when the code (and tests) exist. Add a repository link and a
real test summary to the case study once you have them.

### Adding a project

Add an object to `projects` in `src/site.mjs`, add a visual in `scripts/build.mjs` (`visuals`), and rebuild.
Only add projects whose details you can defend in an interview. Use abstract diagrams for confidential work.

## Accessibility and performance

Semantic landmarks, skip link, visible focus states, keyboard-operable tabs, accordions and diagram,
reduced-motion support (static hero frame, no animation), responsive layouts down to 320px, lazy-loaded hero
scene and case-study scripts, no images other than the social preview, system-font fallbacks for web fonts.

## Privacy

The resume PDF includes the phone number from your resume. If you prefer not to publish it, export a
version without it and replace the file.
