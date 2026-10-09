// Case-study interactions. Reads JSON from #case-data. Server-rendered HTML is the fallback.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const data = JSON.parse($('#case-data').textContent);
const NS = 'http://www.w3.org/2000/svg';

/* ───────────── 3D layer stack ───────────── */
function stack3d(mount, layers, { compact = false, legend = true } = {}) {
  const n = layers.length;
  mount.innerHTML = `<div class="stack3d${compact ? ' compact' : ''}"><div class="stack-scene" style="--n:${n}">${layers.map((l, i) =>
    `<div class="slab" data-i="${i}" style="--i:${i};--z:${(n - 1 - i)}"><h4>${esc(l.n)}</h4><div class="chips">${l.nodes.map(x => `<span>${esc(x)}</span>`).join('')}</div></div>`).join('')}</div></div>` +
    (legend ? `<ol class="layer-legend">${layers.map((l, i) => `<li><button type="button" data-i="${i}"><b>${esc(l.n)}</b><span>${esc(l.d)}</span></button></li>`).join('')}</ol>` : '');
  const scene = $('.stack-scene', mount), wrap = $('.stack3d', mount);
  let cur = -1;
  const set = i => {
    cur = i;
    $$('.slab', mount).forEach(s => s.classList.toggle('on', +s.dataset.i === i));
    $$('.layer-legend button', mount).forEach(b => b.classList.toggle('on', +b.dataset.i === i));
  };
  mount.addEventListener('mouseover', e => { const t = e.target.closest('[data-i]'); if (t && !compact) set(+t.dataset.i); });
  mount.addEventListener('focusin', e => { const t = e.target.closest('[data-i]'); if (t && !compact) set(+t.dataset.i); });
  mount.addEventListener('click', e => { const t = e.target.closest('[data-i]'); if (t) set(+t.dataset.i); });
  if (fine && !reduce) {
    wrap.addEventListener('pointermove', e => {
      const r = wrap.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      scene.style.setProperty('--rz', (-26 + x * 22).toFixed(1) + 'deg'); scene.style.setProperty('--rx', (52 - y * 12).toFixed(1) + 'deg');
    });
    wrap.addEventListener('pointerleave', () => { scene.style.removeProperty('--rz'); scene.style.removeProperty('--rx'); });
  }
  return { set };
}

/* ───────────── Sequence diagram ───────────── */
function sequence(mount, seqs) {
  mount.innerHTML = `<div class="seq-tabs" role="tablist" aria-label="Flow diagrams">${seqs.map((s, i) => `<button role="tab" type="button" aria-selected="${i === 0}" data-i="${i}">${esc(s.title)}</button>`).join('')}</div>
  <div class="seq-box"><div class="seq-scroll"><svg class="seq" role="img" aria-label="Sequence diagram"></svg></div>
  <div class="seq-ctl"><button class="mini-btn" data-a="prev" type="button">Back</button><button class="mini-btn on" data-a="play" type="button" aria-pressed="false">Play</button><button class="mini-btn" data-a="next" type="button">Next</button><button class="mini-btn" data-a="reset" type="button">Reset</button></div>
  <p class="seq-cap" aria-live="polite"></p></div>`;
  const svg = $('svg', mount), cap = $('.seq-cap', mount), playBtn = $('[data-a="play"]', mount);
  let s = seqs[0], step = 0, timer = 0;
  const W = 900, top = 78, gap = 46;
  function draw() {
    const n = s.actors.length, colW = (W - 160) / (n - 1 || 1), X = a => 80 + s.actors.indexOf(a) * colW, H = top + s.msgs.length * gap + 30;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.style.minWidth = Math.max(680, n * 150) + 'px';
    let o = `<defs><marker id="sa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>`;
    s.actors.forEach((a, i) => { const x = X(a); o += `<line class="life" x1="${x}" y1="${top - 14}" x2="${x}" y2="${H - 14}"/><g class="actor"><rect x="${x - 72}" y="12" width="144" height="38" rx="10"/><text x="${x}" y="36" text-anchor="middle">${esc(a)}</text></g>`; });
    s.msgs.forEach(([f, t, txt], i) => {
      const y = top + i * gap + 20, x1 = X(f), x2 = X(t), self = f === t;
      const lx = self ? x1 + 52 : (x1 + x2) / 2, anchor = self ? 'start' : 'middle', ly = self ? y + 4 : y - 8;
      o += `<g class="msg" data-i="${i}">${self
        ? `<path class="ln" d="M${x1} ${y - 8} h40 v20 h-40" marker-end="url(#sa)"/>`
        : `<path class="ln" d="M${x1} ${y} H${x2 + (x2 > x1 ? -4 : 4)}" marker-end="url(#sa)"/><circle class="pk" r="5" cx="${x1}" cy="${y}" style="--dx:${x2 - x1}px"/>`}
        <text class="lb" x="${lx}" y="${ly}" text-anchor="${anchor}">${esc(txt)}</text></g>`;
    });
    svg.innerHTML = o; paint();
  }
  function paint() {
    $$('.msg', svg).forEach((g, i) => { g.classList.toggle('past', i < step); g.classList.toggle('now', i === step); g.classList.toggle('future', i > step); });
    const m = s.msgs[Math.min(step, s.msgs.length - 1)];
    cap.innerHTML = `<b>Step ${Math.min(step, s.msgs.length - 1) + 1} of ${s.msgs.length}.</b> ${esc(m[0])} ${m[0] === m[1] ? '' : '→ ' + esc(m[1]) + ' '}: ${esc(m[2])}`;
  }
  const go = i => { step = Math.max(0, Math.min(s.msgs.length - 1, i)); paint(); };
  const stop = () => { clearInterval(timer); timer = 0; playBtn.textContent = 'Play'; playBtn.setAttribute('aria-pressed', 'false'); };
  const play = () => { if (timer) return stop(); if (step >= s.msgs.length - 1) step = -1; playBtn.textContent = 'Pause'; playBtn.setAttribute('aria-pressed', 'true'); timer = setInterval(() => { if (step >= s.msgs.length - 1) return stop(); go(step + 1); }, 1300); go(step + 1); };
  mount.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.a === 'play') play(); else if (b.dataset.a === 'next') { stop(); go(step + 1); } else if (b.dataset.a === 'prev') { stop(); go(step - 1); } else if (b.dataset.a === 'reset') { stop(); go(0); }
    else if (b.role === 'tab') { stop(); s = seqs[+b.dataset.i]; step = 0; $$('.seq-tabs button', mount).forEach(x => x.setAttribute('aria-selected', String(x === b))); draw(); }
  });
  draw();
  if (!reduce) { const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); setTimeout(play, 500); } }, { threshold: .5 }); io.observe(mount); }
}

/* ───────────── Mount everything ───────────── */
const c = data.case;
let mini = null;
const sm = $('#stack'); if (sm) stack3d(sm, c.layers);
const mm = $('#stack-mini'); if (mm) mini = stack3d(mm, c.layers, { compact: true, legend: false });
const sq = $('#seq'); if (sq) sequence(sq, c.sequences);

// Journey: highlights the step in view and lights the matching layer
const steps = $$('.journey > li');
if (steps.length) {
  const act = li => { steps.forEach(x => x.classList.toggle('on', x === li)); mini?.set(+li.dataset.layer); };
  act(steps[0]);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) act(e.target); }), { rootMargin: '-42% 0px -48% 0px' });
  steps.forEach(li => { io.observe(li); li.addEventListener('click', () => act(li)); });
}

// Chapter navigation with scroll-spy
const links = $$('.chapters a');
if (links.length) {
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { links.forEach(a => a.removeAttribute('aria-current')); const a = map.get(e.target.id); a?.setAttribute('aria-current', 'true'); a?.scrollIntoView({ block: 'nearest', inline: 'center' }); } }), { rootMargin: '-35% 0px -60% 0px' });
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

// Interactive demo (loaded on demand)
const dm = $('#demo');
if (dm) {
  const load = () => import('./demos.js').then(m => m[dm.dataset.demo]?.(dm)).catch(() => { dm.innerHTML = '<p class="note">The interactive demo could not load.</p>'; });
  const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: '300px' }); io.observe(dm);
}
