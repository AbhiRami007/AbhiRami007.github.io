// Zero-dependency static site generator.
//   node scripts/build.mjs            -> dist/ (served from "/")
//   BASE=/my-repo/ node scripts/build.mjs   -> for a GitHub *project* page
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, hero, snapshot, skills, timeline, projects, aiStatus, statusLabels } from '../src/site.mjs';
import { arch } from '../src/arch.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const BASE = (process.env.BASE || '/').replace(/\/?$/, '/');
const SITE_URL = (process.env.SITE_URL || site.url).replace(/\/$/, '');
const u = p => BASE + p;
const abs = p => SITE_URL + u(p);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ver = Date.now().toString(36);

/* ───────────── Project illustrations (abstract, inline SVG) ───────────── */
const defs = `<defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#3fd8c8"/><stop offset="1" stop-color="#5aa8ff"/></linearGradient></defs>`;
const lab = (x, y, t, c = '#98a6c0', a = 'middle') => `<text x="${x}" y="${y}" fill="${c}" font-size="13" font-family="Instrument Sans,system-ui,sans-serif" text-anchor="${a}">${esc(t)}</text>`;
const visuals = {
  ev: () => {
    const pts = [[120, 110], [210, 250], [330, 90], [450, 230], [520, 120], [300, 290]];
    return `<svg viewBox="0 0 640 360" role="img" aria-label="Abstract map with connected charging points">${defs}
    ${Array.from({ length: 9 }, (_, i) => `<path d="M0 ${40 * i + 20}H640" stroke="#16233a"/><path d="M${72 * i} 0V360" stroke="#16233a"/>`).join('')}
    <path d="M0 300 C140 240 200 330 320 190 S520 150 640 60" stroke="#243553" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="320" cy="180" r="120" fill="rgba(90,168,255,.06)" stroke="#5aa8ff" stroke-dasharray="4 6"/>
    ${pts.map(p => `<path class="flow" d="M320 180L${p[0]} ${p[1]}" stroke="#3fd8c8" stroke-opacity=".6"/>`).join('')}
    ${pts.map(p => `<g><circle class="pulse" cx="${p[0]}" cy="${p[1]}" r="13" fill="#0b1424" stroke="#3fd8c8" stroke-width="2"/><path d="M${p[0] + 2} ${p[1] - 7} l-6 8 h5 l-2 6 6 -8 h-5z" fill="#3fd8c8"/></g>`).join('')}
    <circle cx="320" cy="180" r="9" fill="url(#g1)"/>${lab(320, 214, 'search point')}${lab(24, 340, 'Location query: PostgreSQL + OpenSearch', '#7f8da8', 'start')}</svg>`;
  },

  ff: () => `<svg viewBox="0 0 640 360" role="img" aria-label="Abstract dashboard switches feeding an SDK that returns ON or OFF to apps">${defs}
    <rect x="30" y="50" width="190" height="250" rx="16" fill="#0f1a2d" stroke="#33466b"/>${lab(125, 80, 'Dashboard', '#e8eefb')}
    ${[0, 1, 2].map(i => `<rect x="50" y="${105 + i * 62}" width="150" height="46" rx="10" fill="#0b1424" stroke="#243553"/><rect x="62" y="${116 + i * 62}" width="56" height="8" rx="4" fill="#33466b"/><rect x="62" y="${130 + i * 62}" width="36" height="6" rx="3" fill="#243553"/><rect x="152" y="${117 + i * 62}" width="36" height="20" rx="10" fill="${i === 1 ? '#243553' : '#1d6f68'}"/><circle class="${i === 0 ? 'tog-knob' : ''}" cx="${i === 1 ? 162 : 178}" cy="${127 + i * 62}" r="7" fill="${i === 1 ? '#7f8da8' : '#3fd8c8'}"/>`).join('')}
    <path class="flow" d="M220 175H270" stroke="#3fd8c8" stroke-width="2"/>
    <polygon points="320,125 365,150 365,200 320,225 275,200 275,150" fill="#0f1a2d" stroke="url(#g1)" stroke-width="2.5"/>${lab(320, 182, 'SDK', '#e8eefb')}
    ${[['App 1', 'ON'], ['App 2', 'OFF'], ['App 3', 'ON']].map(([t, v], i) => `<path class="flow" d="M365 175 C410 175 410 ${88 + i * 92} 440 ${88 + i * 92}" stroke="${v === 'ON' ? '#3fd8c8' : '#556583'}" fill="none" stroke-width="2"/><rect x="440" y="${64 + i * 92}" width="160" height="48" rx="12" fill="#0b1424" stroke="${v === 'ON' ? '#3fd8c8' : '#33466b'}"/>${lab(480, 94 + i * 92, t, '#e8eefb')}<rect class="${v === 'ON' ? 'pulse' : ''}" x="530" y="${78 + i * 92}" width="56" height="20" rx="10" fill="${v === 'ON' ? 'rgba(63,216,200,.25)' : '#17233b'}"/>${lab(558, 92 + i * 92, v, v === 'ON' ? '#7ff0e3' : '#7f8da8')}`).join('')}
    ${lab(24, 340, 'Control layer to execution layer', '#7f8da8', 'start')}</svg>`,
  hh: () => `<svg viewBox="0 0 640 360" role="img" aria-label="Abstract hub connecting third-party app tiles with a billing card">${defs}
    ${[0, 1, 2, 3, 4].map(i => { const a = i / 5 * Math.PI * 2 - Math.PI / 2, x = 320 + Math.cos(a) * 150, y = 170 + Math.sin(a) * 105; return `<path class="flow" d="M320 170L${x} ${y}" stroke="#5aa8ff" stroke-opacity=".7"/><rect class="${i % 2 ? 'pulse' : ''}" x="${x - 30}" y="${y - 26}" width="60" height="52" rx="14" fill="#0b1424" stroke="#5aa8ff"/><rect x="${x - 14}" y="${y - 12}" width="28" height="12" rx="4" fill="#243553"/><circle cx="${x}" cy="${y + 12}" r="4" fill="#3fd8c8"/>`; }).join('')}
    <circle cx="320" cy="170" r="48" fill="#0f1a2d" stroke="url(#g1)" stroke-width="2.5"/><circle cx="320" cy="170" r="62" fill="none" stroke="#5aa8ff" stroke-opacity=".3" stroke-dasharray="3 6"/>${lab(320, 175, 'One dashboard', '#e8eefb')}
    <g class="floaty"><rect x="470" y="276" width="130" height="62" rx="12" fill="#14233b" stroke="#a392ff"/><rect x="470" y="292" width="130" height="12" fill="#a392ff" opacity=".5"/><rect x="484" y="316" width="46" height="8" rx="4" fill="#6f65b8"/>${lab(535, 266, 'Subscription', '#a392ff')}</g>
    ${lab(24, 340, 'Apps, permissions and billing in one place', '#7f8da8', 'start')}</svg>`,
  eng: () => `<svg viewBox="0 0 640 360" role="img" aria-label="Abstract work breakdown and synchronised clients">${defs}
    <rect x="250" y="30" width="140" height="40" rx="10" fill="#0f1a2d" stroke="#5aa8ff"/>${lab(320, 55, 'Programme')}
    ${[100, 320, 540].map(x => `<path d="M320 70V100H${x}V130" stroke="#33466b" fill="none"/><rect x="${x - 70}" y="130" width="140" height="38" rx="9" fill="#0f1a2d" stroke="#33466b"/>${lab(x, 154, 'Workstream')}`).join('')}
    ${[60, 140, 280, 360, 500, 580].map(x => `<path d="M${x < 200 ? 100 : x < 440 ? 320 : 540} 168V200H${x}V220" stroke="#243553" fill="none"/><rect x="${x - 34}" y="220" width="68" height="26" rx="7" fill="#0b1424" stroke="#243553"/>`).join('')}
    <rect x="90" y="292" width="140" height="44" rx="10" fill="#0b1424" stroke="#3fd8c8"/>${lab(160, 319, 'Client A')}
    <rect x="410" y="292" width="140" height="44" rx="10" fill="#0b1424" stroke="#3fd8c8"/>${lab(480, 319, 'Client B')}
    <path class="flow" d="M230 314H410" stroke="url(#g1)" stroke-width="2"/>${lab(320, 306, 'real-time events', '#3fd8c8')}</svg>`,
  hire: () => `<svg viewBox="0 0 640 360" role="img" aria-label="Abstract recruitment workflow and data relationships">${defs}
    ${['Job posted', 'Candidates found', 'Engagement'].map((t, i) => `<rect x="${30 + i * 205}" y="40" width="170" height="52" rx="26" fill="#0f1a2d" stroke="${i === 1 ? '#3fd8c8' : '#33466b'}"/>${lab(115 + i * 205, 72, t, '#e8eefb')}${i < 2 ? `<path d="M${200 + i * 205} 66H${235 + i * 205}" stroke="#3fd8c8" marker-end=""/><path d="M${228 + i * 205} 61l7 5-7 5" stroke="#3fd8c8" fill="none"/>` : ''}`).join('')}
    ${[['jobs', 60, 150], ['candidates', 250, 150], ['messages', 440, 150]].map(([t, x, y]) => `<rect x="${x}" y="${y}" width="140" height="150" rx="10" fill="#0b1424" stroke="#243553"/><rect x="${x}" y="${y}" width="140" height="30" rx="10" fill="#14233b"/>${lab(x + 70, y + 20, t, '#e8eefb')}${[0, 1, 2].map(r => `<rect x="${x + 14}" y="${y + 48 + r * 30}" width="${60 + r * 14}" height="8" rx="4" fill="#243553"/>`).join('')}`).join('')}
    <path class="flow" d="M200 200H250M390 200H440" stroke="#5aa8ff"/>${lab(320, 336, 'Relational data and flexible documents', '#7f8da8')}</svg>`,
  mdm: () => `<svg viewBox="0 0 640 360" role="img" aria-label="Abstract hub-and-spoke master data diagram">${defs}
    ${[0, 1, 2, 3, 4, 5].map(i => { const a = i / 6 * Math.PI * 2 - Math.PI / 2, x = 320 + Math.cos(a) * 140, y = 180 + Math.sin(a) * 120; return `<path d="M320 180L${x} ${y}" stroke="#33466b"/><rect x="${x - 38}" y="${y - 16}" width="76" height="32" rx="8" fill="#0b1424" stroke="#5aa8ff" stroke-opacity=".7"/>${lab(x, y + 4, 'System ' + 'ABCDEF'[i], '#98a6c0')}<circle cx="${(320 + x) / 2}" cy="${(180 + y) / 2}" r="4" fill="#3fd8c8"/>`; }).join('')}
    <polygon points="320,140 355,160 355,200 320,220 285,200 285,160" fill="#0f1a2d" stroke="url(#g1)" stroke-width="2"/>${lab(320, 176, 'Master', '#e8eefb')}${lab(320, 194, 'data API')}
    ${lab(24, 340, 'JWT-protected access', '#7f8da8', 'start')}</svg>`,
  ai: () => `<svg viewBox="0 0 640 360" role="img" aria-label="Abstract pipeline from documents to chunks to vectors to a cited answer">${defs}
    ${[0, 1, 2].map(i => `<rect x="${34 + i * 10}" y="${90 + i * 10}" width="90" height="120" rx="8" fill="#0f1a2d" stroke="#33466b"/>`).join('')}
    ${[0, 1, 2, 3].map(r => `<rect x="${64}" y="${120 + r * 20}" width="${50 - r * 6}" height="6" rx="3" fill="#243553"/>`).join('')}${lab(80, 240, 'Documents')}
    ${[0, 1, 2, 3].map(i => `<rect x="190" y="${96 + i * 34}" width="86" height="24" rx="6" fill="#14233b" stroke="#5aa8ff" stroke-opacity=".6"/>`).join('')}${lab(233, 250, 'Chunks')}
    <path class="flow" d="M128 150H186M280 150H330M280 190H330" stroke="#8caadc"/>
    ${[[360, 120], [385, 150], [372, 180], [410, 130], [420, 190], [395, 215]].map(p => `<circle class="pulse" cx="${p[0]}" cy="${p[1]}" r="6" fill="#a392ff" fill-opacity=".85"/>`).join('')}<circle cx="400" cy="160" r="46" fill="none" stroke="#a392ff" stroke-dasharray="3 5"/>${lab(395, 250, 'Vectors')}
    <path d="M450 160H488" stroke="#8caadc"/><rect x="490" y="96" width="120" height="124" rx="10" fill="#1b1740" stroke="#a392ff"/>${[0, 1, 2].map(r => `<rect x="504" y="${114 + r * 18}" width="${92 - r * 14}" height="7" rx="3" fill="#6f65b8"/>`).join('')}
    <rect x="504" y="178" width="26" height="18" rx="5" fill="rgba(163,146,255,.25)" stroke="#a392ff"/><rect x="536" y="178" width="26" height="18" rx="5" fill="rgba(163,146,255,.25)" stroke="#a392ff"/>${lab(550, 250, 'Answer + citations')}
    ${lab(24, 340, 'Target architecture · illustrative', '#7f8da8', 'start')}</svg>`,
};

/* ───────────── Layout ───────────── */
const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400&display=swap">`;
const nav = [['Work', '#work'], ['Building', '#building'], ['Skills', '#skills'], ['Experience', '#experience'], ['Contact', '#contact']];

function page({ title, desc, path, body, scripts = '', ld = '', noindex = false, ogType = 'website' }) {
  const t = esc(title);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${t}</title><meta name="description" content="${esc(desc)}"><meta name="theme-color" content="#06080e">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${abs(path)}">`}
<meta property="og:type" content="${ogType}"><meta property="og:site_name" content="${esc(site.name)}"><meta property="og:title" content="${t}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${abs(path)}"><meta property="og:image" content="${abs('assets/og.png')}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(site.name)}, ${esc(site.title)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${t}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${abs('assets/og.png')}">
<link rel="icon" href="${u('favicon.svg')}" type="image/svg+xml">${fonts}
<link rel="stylesheet" href="${u('assets/styles.css')}?v=${ver}">${ld}</head>
<body><div class="progress" aria-hidden="true"></div><div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div><div class="spot" aria-hidden="true"></div><a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap nav"><a class="brand" href="${u('')}" aria-label="${esc(site.name)}, home"><span class="brand-mark" aria-hidden="true">AP</span><span>${esc(site.short)}</span></a>
<button class="menu-btn" aria-expanded="false" aria-controls="nav-list">Menu</button>
<ul id="nav-list">${nav.map(([l, h]) => `<li><a href="${u('') + h}">${l}</a></li>`).join('')}<li><a href="${u(site.resume)}">Resume</a></li></ul></div></header>
<main id="main">${body}</main>
<footer><div class="wrap"><span>© ${new Date().getFullYear()} ${esc(site.name)}</span><span>${esc(site.location)}</span></div></footer>
<script type="module" src="${u('assets/fx.js')}?v=${ver}"></script><script type="module" src="${u('assets/app.js')}?v=${ver}"></script>${scripts}</body></html>`;
}

const pill = (s, text) => `<span class="pill ${s}">${esc(text || statusLabels[s])}</span>`;
const tags = a => `<ul class="tags" aria-label="Technologies">${a.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

/* ───────────── Home ───────────── */
const demoLabel = { f2m: 'Interactive demo', ff: 'Interactive demo', hh: 'Interactive demo', eng: 'Interactive demo' };
function card(p, wide, i) {
  return `<article class="card${wide ? ' wide' : ''}" data-tilt="6" data-reveal style="--i:${i % 3}">${p.demo ? `<span class="badge-live">${demoLabel[p.demo]}</span>` : ''}<div class="art" aria-hidden="true">${visuals[p.visual]()}</div><div class="body">
  <p class="kind">${esc(p.type)}</p><h3><a href="${u(`projects/${p.slug}/`)}">${esc(p.name)}</a></h3>
  <p class="prob">${esc(p.problem)}</p><p class="role"><strong>${esc(p.role)}</strong> at ${esc(p.org)}</p>${tags(p.tech.slice(0, 6))}
  <span class="more">Read the case study</span></div></article>`;
}
const gallery = projects.filter(p => !p.building);
const ai = projects.find(p => p.building);
const marq = ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'MongoDB', 'Redis', 'OpenSearch', 'Microservices', 'REST APIs', 'Socket.IO', 'Stripe', 'AWS CloudWatch', 'Azure DevOps', 'Docker', 'RAG', 'pgvector'];
const icons = ['4+', 'API', 'EN', '30%', 'AI'];

function home() {
  const body = `
<section class="hero" style="border-top:0"><div class="wrap hero-grid"><div>
  <p class="hero-meta">${esc(site.title)} · ${esc(site.location)}</p>
  <h1><span><em>${esc(hero.headline[0])}</em></span><span><em>${esc(hero.headline[1])}</em></span></h1>
  <p class="lead">${esc(hero.lead)}</p>
  <div class="btn-row"><a class="btn btn-primary" data-magnet href="#work">Explore my work</a><a class="btn btn-ghost" data-magnet href="${u(site.resume)}">View resume</a><a class="btn btn-ghost" data-magnet href="#contact">Contact me</a></div>
  <div class="link-row"><a href="${site.linkedin}" rel="me noopener">LinkedIn</a><a href="${site.github}" rel="me noopener">GitHub</a></div></div>
  <div class="scene" id="scene"><canvas id="hero-canvas" aria-hidden="true"></canvas>
    <p class="sr-only">Decorative animation: a central core connected to service nodes labelled API, PostgreSQL, Redis, Queue, pgvector and LLM.</p>
    <div class="chip3d" style="left:0;top:4%;--d:-18px"><b>NestJS · TypeScript</b>APIs and microservices</div>
    <div class="chip3d" style="right:0;top:84%;--d:22px"><b>PostgreSQL · Redis · OpenSearch</b>Data and search</div>
    <div class="chip3d ai" style="left:2%;bottom:2%;--d:-26px"><b>RAG · pgvector</b>Learning, in development</div></div></div></section>
<div class="marquee" aria-hidden="true"><div class="track">${[...marq, ...marq].map(t => `<span>${t}</span>`).join('')}</div></div>

<section id="snapshot" aria-labelledby="snap-h"><div class="wrap"><div class="sec-head" data-reveal><h2 id="snap-h">Professional snapshot</h2><p>What my resume supports, stated plainly.</p></div>
  <div class="bento">${snapshot.map((s, i) => `<div data-tilt="7" data-reveal style="--i:${i}"><div class="ic" aria-hidden="true">${icons[i]}</div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join('')}</div></div></section>

<section id="work" aria-labelledby="work-h"><div class="wrap"><div class="sec-head" data-reveal><h2 id="work-h">Selected work</h2><p>Four enterprise projects from Experion Technologies, each with a full case study: how the system works end to end, flow diagrams, and an interactive simulation you can play with. Client work is shown as abstract diagrams, never as screenshots.</p></div>
  <div class="proj-grid">${gallery.map((p, i) => card(p, i === 0 || i === gallery.length - 1, i)).join('')}</div></div></section>

<section id="building" class="building" aria-labelledby="build-h"><div class="wrap"><div class="build-card" data-tilt="3" data-reveal>
  <div>${pill('dev', 'In development')}<h2 id="build-h">${esc(ai.name)}</h2>
  <p class="lead">${esc(ai.summary)}</p>
  <ul class="facts"><li><strong>Problem</strong> ${esc(ai.problem)}</li><li><strong>Users</strong> An employee who needs trustworthy answers from company documents without opening and searching many files.</li><li><strong>Next</strong> ${esc(aiStatus.nextMilestone)}</li></ul>
  <a class="btn btn-primary" data-magnet href="${u(`projects/${ai.slug}/`)}">Explore the build</a></div>
  <div><div class="art" aria-hidden="true" style="border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#08101d;margin-bottom:16px">${visuals.ai()}</div>
  <ul class="feat-list" aria-label="Implementation status">${aiStatus.features.slice(0, 6).map(([t, s]) => `<li><span>${esc(t)}</span>${pill(s)}</li>`).join('')}</ul>
  <p class="honesty">This is a portfolio project, not a launched product. Features are marked complete only once implemented and tested.</p></div></div></div></section>

<section id="skills" aria-labelledby="skills-h"><div class="wrap split"><header data-reveal><h2 id="skills-h">Technical capabilities</h2><p>Grouped by what they are used for. Solid tiles are technologies I have used in professional work. Dashed tiles are ones I am currently learning.</p></header>
  <div data-reveal><div class="skill-tabs" role="tablist" aria-label="Skill categories">${skills.map(s => `<button role="tab" id="tab-${s.id}" aria-controls="panel-${s.id}" aria-selected="false">${esc(s.name)}</button>`).join('')}</div>
  ${skills.map(s => `<div class="skill-panel" id="panel-${s.id}" role="tabpanel" aria-labelledby="tab-${s.id}" style="margin-bottom:14px"><h3>${esc(s.name)}</h3><p>${esc(s.blurb)}</p><ul class="skill-grid">${s.items.map(([n, st]) => `<li data-s="${st}">${esc(n)}<small>${st === 'established' ? 'Used professionally' : 'Learning'}</small></li>`).join('')}</ul></div>`).join('')}</div></div></section>

<section id="experience" aria-labelledby="exp-h"><div class="wrap split"><header data-reveal><h2 id="exp-h">Experience and education</h2><p>Select an entry to see responsibilities. Dates are as listed on my resume.</p></header>
  <ol class="tl">${timeline.map(t => `<li data-kind="${t.kind}" data-reveal><${t.points.length ? `button type="button" aria-expanded="false" aria-controls="tl-${t.id}"` : 'div class="static" style="background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px 20px"'}><span class="when">${esc(t.when)}</span><span class="role">${esc(t.role)}</span><span class="org">${esc(t.org)}</span></${t.points.length ? 'button' : 'div'}>${t.points.length ? `<div class="detail" id="tl-${t.id}" hidden><ul>${t.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}</li>`).join('')}</ol></div></section>

<section id="contact" class="contact" aria-labelledby="contact-h"><div class="wrap"><h2 id="contact-h" data-reveal>Let’s talk about backend engineering roles.</h2>
  <p class="lead" data-reveal>I am looking for Software Engineering/ Platform Engineering roles and I am open to relocating. Email is the quickest way to reach me.</p>
  <div class="btn-row" data-reveal><a class="btn btn-primary" data-magnet href="mailto:${site.email}">${esc(site.email)}</a><a class="btn btn-ghost" data-magnet href="${site.linkedin}" rel="noopener">LinkedIn</a><a class="btn btn-ghost" data-magnet href="${site.github}" rel="noopener">GitHub</a><a class="btn btn-ghost" data-magnet href="${u(site.resume)}">Download resume</a></div></div></section>`;
  const ld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: site.title, url: SITE_URL, sameAs: [site.linkedin, site.github] })}</script>`;
  return page({ title: `${site.name} · ${site.title}`, desc: site.description, path: '', body, ld });
}

/* ───────────── Rich case studies (Experion projects) ───────────── */
const chapters = [['overview', 'Overview'], ['system', 'The system'], ['architecture', 'Architecture'], ['flows', 'Flow diagrams'], ['journey', 'End to end'], ['try', 'Try it'], ['work', 'My work'], ['outcome', 'Outcome']];
function caseRich(p, i) {
  const c = p.case, prev = gallery[(i - 1 + gallery.length) % gallery.length], next = gallery[(i + 1) % gallery.length];
  const json = JSON.stringify({ case: { layers: c.layers, sequences: c.sequences } }).replace(/</g, '\\u003c');
  const body = `<div class="wrap case-hero"><p class="crumb"><a href="${u('#work')}">Selected work</a> / ${esc(p.name)}</p>${pill('pro', p.status)}<h1>${esc(p.name)}</h1><p class="lead">${esc(p.summary)}</p>
  <dl class="meta"><div><dt>Client or context</dt><dd>${esc(p.client)}</dd></div><div><dt>My role</dt><dd>${esc(p.role)}</dd></div><div><dt>Organisation</dt><dd>${esc(p.org)}</dd></div><div><dt>Type</dt><dd>${esc(p.type)}</dd></div></dl>
  <div class="case-art" data-tilt="4">${visuals[p.visual]()}</div><p class="fig">Abstract illustration. Not a product screenshot.</p></div>
<nav class="chapters" aria-label="Case study chapters"><ul>${chapters.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join('')}</ul></nav>

<section class="chap" id="overview"><div class="wrap prose" data-reveal><h2>Overview</h2>${c.overview.map(t => `<p>${esc(t)}</p>`).join('')}<div class="callout"><b>The problem it addresses</b>${esc(p.problem)}</div></div></section>

<section class="chap" id="system"><div class="wrap"><h2 data-reveal>What the system does</h2><p class="sub" data-reveal>The core responsibilities, at a glance.</p><div class="grid3">${c.does.map(([h, t], k) => `<div class="pcard" data-tilt="8" data-reveal style="--i:${k}"><div class="k"></div><h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join('')}</div></div></section>

<section class="chap" id="architecture"><div class="wrap"><h2 data-reveal>Architecture in layers</h2><p class="sub" data-reveal>An exploded view of how the pieces stack up. Move your pointer to tilt it, and hover or select a layer to see what it does.</p>
  <div id="stack" class="stack-wrap" data-reveal><ol class="layer-fallback">${c.layers.map(l => `<li><strong>${esc(l.n)}.</strong> ${esc(l.d)}</li>`).join('')}</ol></div></div></section>

<section class="chap" id="flows"><div class="wrap"><h2 data-reveal>Flow diagrams</h2><p class="sub" data-reveal>Who talks to whom, step by step. Press Play or step through manually. These are drawn from the project’s step-by-step flow and simplified for clarity.</p>
  <div id="seq" data-reveal><ol>${c.sequences.map(s => `<li><strong>${esc(s.title)}</strong><ol>${s.msgs.map(m => `<li>${esc(m[0])}${m[0] === m[1] ? '' : ' to ' + esc(m[1])}: ${esc(m[2])}</li>`).join('')}</ol></li>`).join('')}</ol></div></div></section>

<section class="chap" id="journey"><div class="wrap"><h2 data-reveal>The complete flow, end to end</h2><p class="sub" data-reveal>Scroll through the journey. The layer each step touches lights up in the stack.</p>
  <div class="journey-grid"><ol class="journey">${c.journey.map(s => `<li data-layer="${s.layer}" data-reveal><h3>${esc(s.t)}</h3><ul>${s.pts.map(x => `<li>${esc(x)}</li>`).join('')}</ul></li>`).join('')}</ol>
  <aside class="sticky-stack" aria-label="Layer highlighted by the current step"><p>Layer touched by this step</p><div id="stack-mini"></div></aside></div></div></section>

<section class="chap" id="try"><div class="wrap"><h2 data-reveal>Try it</h2><p class="sub" data-reveal>A hands-on simulation of the flows above.</p>
  <div id="demo" data-demo="${p.demo}"><noscript><p class="note">The interactive demo needs JavaScript.</p></noscript></div><p class="note" style="margin-top:18px">${esc(c.note)}</p></div></section>

<section class="chap" id="work"><div class="wrap"><h2 data-reveal>My contribution</h2><p class="sub" data-reveal>${esc(p.role)} at ${esc(p.org)}.</p><div class="grid3">${c.contrib.map((t, k) => `<div class="pcard" data-tilt="8" data-reveal style="--i:${k % 3}"><div class="k"></div><p style="color:var(--text)">${esc(t)}</p></div>`).join('')}</div>
  <h3 style="margin:36px 0 12px" data-reveal>Technologies</h3>${tags(p.tech)}${p.slug === 'free2move-charge' ? '<p class="honesty">Across my Experion software-engineer role I reported a 30% API performance improvement from Redis caching, PostgreSQL indexing and API redesign.</p>' : ''}</div></section>

<section class="chap" id="outcome"><div class="wrap"><h2 style="margin-bottom:24px" data-reveal>Outcome</h2><div class="outcome">${c.outcome.map((t, k) => `<div data-tilt="8" data-reveal style="--i:${k}">${esc(t)}</div>`).join('')}</div>
  <p class="note" style="margin-top:28px">Described at a general level. No confidential architecture, client data or screens are shown.</p></div></section>
<section><div class="wrap pager"><a class="btn btn-ghost" href="${u(`projects/${prev.slug}/`)}">Previous: ${esc(prev.name)}</a><a class="btn btn-ghost" href="${u(`projects/${next.slug}/`)}">Next: ${esc(next.name)}</a></div></section>
<script type="application/json" id="case-data">${json}</script>`;
  return page({ title: `${p.name} case study · ${site.name}`, desc: p.summary, path: `projects/${p.slug}/`, body, ogType: 'article', scripts: `<script type="module" src="${u('assets/case.js')}?v=${ver}"></script>` });
}

/* ───────────── Case studies ───────────── */
function caseGeneric(p, i) {
  const prev = gallery[(i - 1 + gallery.length) % gallery.length], next = gallery[(i + 1) % gallery.length];
  const body = `<div class="wrap case-hero"><p class="crumb"><a href="${u('#work')}">Selected work</a> / ${esc(p.name)}</p>${pill('pro', p.status)}<h1>${esc(p.name)}</h1><p class="lead">${esc(p.summary)}</p>
  <dl class="meta"><div><dt>Client or context</dt><dd>${esc(p.client)}</dd></div><div><dt>My role</dt><dd>${esc(p.role)}</dd></div><div><dt>Organisation</dt><dd>${esc(p.org)}</dd></div><div><dt>Type</dt><dd>${esc(p.type)}</dd></div></dl>
  <div class="case-art">${visuals[p.visual]()}</div><p class="fig">${esc(p.diagramNote)}</p></div>
<section><div class="wrap prose"><h2>The problem</h2><p>${esc(p.problem)}</p><h2 style="margin-top:36px">What I worked on</h2><ul>${p.did.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
  <h2 style="margin-top:36px">Technologies</h2>${tags(p.tech)}</div></section>
<section><div class="wrap"><h2 style="margin-bottom:24px">Engineering notes</h2><div class="themes">${p.themes.map(([h, t]) => `<div class="theme"><h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join('')}</div>
  <p class="note" style="margin-top:28px">${p.client === 'Experion Technologies' ? 'This work was done inside a delivery team.' : 'This work was done inside a client delivery team.'} It is described at a general level, and no confidential architecture, screens or metrics beyond those on my resume are shown.</p></div></section>
<section><div class="wrap pager"><a class="btn btn-ghost" href="${u(`projects/${prev.slug}/`)}">Previous: ${esc(prev.name)}</a><a class="btn btn-ghost" href="${u(`projects/${next.slug}/`)}">Next: ${esc(next.name)}</a></div></section>`;
  return page({ title: `${p.name} case study · ${site.name}`, desc: `${p.summary}`, path: `projects/${p.slug}/`, body, ogType: 'article' });
}

const tradeoffs = [
  ['Async ingestion', 'Keeps upload requests short while extraction and embedding run elsewhere. It adds queue visibility, retries, idempotency and eventual consistency to design for.'],
  ['PostgreSQL with pgvector', 'A pragmatic first stack: relational metadata and vectors stay close together. Retrieval quality and scale get evaluated before a separate vector database is considered.'],
  ['Chunk size and overlap', 'These shape retrieval precision, context size and cost. The plan is to choose them from experiments, not arbitrary claims.'],
  ['Hybrid retrieval', 'Combining lexical and semantic search may help with exact identifiers and natural-language questions. It is an experiment, not a completed feature.'],
  ['Citation design', 'Citations must map to real retrieved chunks and source locations. Decorative citations that nothing backs are out.'],
  ['Tenant boundaries', 'Server-side filters and authorisation on every relevant read path. Interface filters are not security, and no security guarantee is claimed until it is built and tested.'],
  ['Redis, only if justified', 'Added only for a defined caching or coordination need that can be invalidated or expired safely.'],
  ['Failure as a first-class state', 'Failed extraction or embedding must be visible, with a retry path, instead of silently missing documents.'],
];
function caseAI() {
  const p = ai;
  const static_ = k => `<ol class="arch-steps" style="padding-left:0">${arch[k].steps.map(s => `<li><div class="more-detail" style="padding-left:18px;padding-top:12px"><p><strong>${esc(s.t)}</strong> <span style="color:var(--dim)">${esc(s.s)}</span></p><p>${esc(s.d)}</p></div></li>`).join('')}</ol>`;
  const body = `<div class="wrap case-hero"><p class="crumb"><a href="${u('#building')}">Currently building</a> / ${esc(p.name)}</p>${pill('dev', aiStatus.badge)}<h1>${esc(p.name)}</h1>
  <p class="lead">A multi-tenant knowledge platform where an organisation uploads internal documents, has them processed asynchronously, and asks questions answered from its own sources, with citations.</p>
  <dl class="meta"><div><dt>Status</dt><dd>${esc(aiStatus.badge)}</dd></div><div><dt>My role</dt><dd>${esc(p.role)}</dd></div><div><dt>Type</dt><dd>Portfolio project, not a launched product</dd></div><div><dt>Primary user</dt><dd>An employee seeking trustworthy answers from company documents</dd></div></dl>
  <div class="case-art">${visuals.ai()}</div><p class="fig">Target architecture, illustrative.</p></div>

<section><div class="wrap prose"><h2>Why this problem matters</h2><p>Enterprise information is scattered across documents. Keyword search can miss meaning, and a general-purpose LLM can produce answers nothing supports. This project explores a workflow that retrieves relevant internal context first and uses it to ground each response, so the user can inspect the evidence.</p>
  <p>This is a design exploration, not a customer-research claim: there are no users, benchmarks or production deployments behind it yet.</p>
  <h2 style="margin-top:36px">Principles</h2><ul><li><strong>Grounded answers.</strong> Show citations and make supporting passages easy to inspect.</li><li><strong>Visible processing state.</strong> Upload, queued, processing, indexed and failed are different states, not instant magic.</li><li><strong>Tenant boundaries.</strong> Organisation-level separation is part of the design from the start.</li><li><strong>Operational clarity.</strong> Failures, retries and limits are understandable.</li><li><strong>Progress honesty.</strong> Every feature carries a status label.</li></ul></div></section>

<section><div class="wrap"><div class="sec-head"><h2>Product walkthrough</h2><p>An interactive UI concept: a document library, ingestion status and source-cited Q&amp;A. Try asking about remote work, expenses or a lost laptop, then ask something else to see the insufficient-evidence state.</p></div>
  <div id="concept"><noscript><p class="note">The interactive concept needs JavaScript. It shows a sample workspace with a document library, a document detail view and an Ask Knowledge screen.</p></noscript></div></div></section>

<section id="arch"><div class="wrap"><div class="sec-head"><h2>System architecture</h2><p>The two main paths through the system. This is the target architecture. Select a step for its detail and trade-off.</p></div>
  <script type="application/json" id="arch-data">${JSON.stringify(arch)}</script>
  <div class="arch-tabs" role="tablist" aria-label="Architecture path"></div>
  <svg class="arch-svg" viewBox="0 0 900 290" role="group" aria-label="Architecture diagram"></svg>
  <div class="arch-static">${static_('ingestion')}<h3 style="margin:24px 0 8px">${esc(arch.qa.label)}</h3>${static_('qa')}</div></div></section>

<section><div class="wrap"><div class="sec-head"><h2>Engineering decisions</h2><p>Trade-offs I want to be able to defend, written before the code so the experiments can test them.</p></div>
  <div class="tradeoffs">${tradeoffs.map(([h, t]) => `<div class="theme"><h3>${esc(h)}</h3><p>${esc(t)}</p></div>`).join('')}</div></div></section>

<section><div class="wrap prose"><h2>Reliability and testing</h2><p>There are no test results to show yet, and none are claimed. Evidence will be added here only when it exists.</p>
  <p><strong>Planned:</strong></p><ul><li>API and integration tests for ingestion, retrieval, access boundaries and error handling.</li><li>Failure-path tests for extraction and embedding errors.</li><li>One measured retrieval-quality experiment and one latency measurement, published only once actually run.</li></ul></div></section>

<section><div class="wrap split"><header><h2>Status and roadmap</h2><p>${esc(aiStatus.summaryLine)}</p></header><div>
  <ul class="feat-list">${aiStatus.features.map(([t, s]) => `<li><span>${esc(t)}</span>${pill(s)}</li>`).join('')}</ul>
  <h3 style="margin:32px 0 16px">Roadmap</h3><ol class="roadmap">${aiStatus.roadmap.map(([h, t]) => `<li><b>${esc(h)}</b><p>${esc(t)}</p></li>`).join('')}</ol>
  <p class="note"><strong>Next milestone.</strong> ${esc(aiStatus.nextMilestone)}</p></div></div></section>

<section><div class="wrap prose"><h2>What I am learning</h2><p>I am learning LLM API integration, prompt engineering, embeddings and vector retrieval by building this. Open questions include chunking strategy, whether hybrid retrieval beats vector search alone on this kind of content, and how best to evaluate citation quality. I will write up results as they are measured.</p>
  <p><a class="btn btn-ghost" href="${site.github}" rel="noopener">See my GitHub</a></p></div></section>`;
  return page({ title: `${p.name}, in development · ${site.name}`, desc: 'An in-development portfolio project: a multi-tenant, document-grounded question answering platform with citations. Architecture, trade-offs, honest status and an interactive UI concept.', path: `projects/${p.slug}/`, body, ogType: 'article' });
}

/* ───────────── 404, sitemap, assets ───────────── */
const notFound = page({ title: 'Page not found · ' + site.name, desc: 'This page does not exist.', path: '404.html', noindex: true, body: `<div class="wrap" style="padding:96px 0;min-height:60vh"><p class="hero-meta">Error 404</p><h1 style="font-size:clamp(2.4rem,6vw,4.5rem)">That route is not in the system.</h1><p class="lead" style="margin:20px 0 28px">The page may have moved. These links are known good.</p><div class="btn-row"><a class="btn btn-primary" href="${u('')}">Back home</a><a class="btn btn-ghost" href="${u('#work')}">Selected work</a><a class="btn btn-ghost" href="${u('projects/ai-knowledge-platform/')}">What I am building</a></div></div>` });

rmSync(dist, { recursive: true, force: true });
const write = (p, c) => { const f = join(dist, p); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, c); };
write('index.html', home());
gallery.forEach((p, i) => write(`projects/${p.slug}/index.html`, p.case ? caseRich(p, i) : caseGeneric(p, i)));
write(`projects/${ai.slug}/index.html`, caseAI());
write('404.html', notFound);
const urls = ['', ...projects.map(p => `projects/${p.slug}/`)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(p => `  <url><loc>${abs(p)}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${abs('sitemap.xml')}\n`);
write('.nojekyll', '');
write('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#3fd8c8"/><stop offset="1" stop-color="#5aa8ff"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="#06080e"/><path d="M32 10 52 22v20L32 54 12 42V22z" fill="none" stroke="url(#g)" stroke-width="4"/><circle cx="32" cy="32" r="6" fill="url(#g)"/></svg>`);
cpSync(join(root, 'src/assets'), join(dist, 'assets'), { recursive: true });
if (existsSync(join(root, 'public'))) cpSync(join(root, 'public'), dist, { recursive: true });
console.log(`Built ${urls.length + 1} pages to dist/ (BASE=${BASE})`);
