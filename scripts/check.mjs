// Verifies internal links/assets resolve and tags balance. Run after build: node scripts/check.mjs
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const BASE = (process.env.BASE || '/');
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
let bad = 0;
const void_ = new Set(['meta','link','br','img','input','path','circle','rect','polygon','stop','animateMotion','marker','use']);
for (const f of walk(dist).filter(f => f.endsWith('.html'))) {
  const h = readFileSync(f, 'utf8');
  for (const m of h.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    const u = m[1]; if (/^(https?:|mailto:)/.test(u)) continue;
    let p = u.startsWith(BASE) ? u.slice(BASE.length) : u; const t = join(dist, p);
    if (!(existsSync(t) && (statSync(t).isFile() || existsSync(join(t, 'index.html'))))) { console.log('BROKEN', f.replace(dist, ''), u); bad++; }
  }
  const stack = [];
  const body = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  for (const m of body.matchAll(/<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g)) {
    const [, close, name, , self] = m; if (self || void_.has(name)) continue;
    if (!close) stack.push(name); else { const top = stack.pop(); if (top !== name) { console.log('TAG MISMATCH', f.replace(dist, ''), 'expected', top, 'got', name); bad++; break; } }
  }
  if (!h.includes('<h1')) { console.log('NO H1', f); bad++; }
}
console.log(bad ? `${bad} problem(s)` : 'All links resolve and tags balance.');
process.exit(bad ? 1 : 0);
