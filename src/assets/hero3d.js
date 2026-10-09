// Lightweight perspective-projected "system" scene: a computational core with
// orbiting service nodes connected by lines, and small packets travelling along them.
// Plain canvas, no libraries. Loaded lazily by app.js when the hero is visible.
export function startHero(canvas) {
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = matchMedia('(max-width: 720px)').matches;
  const css = getComputedStyle(document.documentElement);
  const C = { cyan: css.getPropertyValue('--cyan').trim() || '#3fd8c8', blue: css.getPropertyValue('--blue').trim() || '#5aa8ff', violet: css.getPropertyValue('--violet').trim() || '#a392ff' };

  const nodesAll = [
    { l: 'API', c: C.cyan, r: 1.9, tilt: .5, ph: 0, sp: .22 },
    { l: 'PostgreSQL', c: C.blue, r: 2.3, tilt: -.35, ph: 1.4, sp: .17 },
    { l: 'Redis', c: C.cyan, r: 1.7, tilt: 1.0, ph: 2.6, sp: .26 },
    { l: 'Queue', c: C.blue, r: 2.5, tilt: .2, ph: 3.8, sp: .14 },
    { l: 'pgvector', c: C.violet, r: 2.1, tilt: -.9, ph: 5.0, sp: .2 },
    { l: 'LLM', c: C.violet, r: 2.7, tilt: .75, ph: 0.7, sp: .12 },
  ];
  const nodes = small ? nodesAll.filter((_, i) => i !== 2 && i !== 3) : nodesAll;

  // Icosahedron wireframe for the core
  const t = (1 + Math.sqrt(5)) / 2;
  const V = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]].map(v => { const n = Math.hypot(...v); return v.map(x => x / n * .9); });
  const E = [];
  for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) {
    const d = Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]);
    if (d < 1.06) E.push([i, j]);
  }

  let w = 0, h = 0, dpr = 1, rotY = 0.6, rotX = -0.25, tY = 0.6, tX = 0, raf = 0, running = false, last = 0;
  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function rot(p, ay, ax) {
    let [x, y, z] = p;
    let c = Math.cos(ay), s = Math.sin(ay); [x, z] = [x * c + z * s, -x * s + z * c];
    c = Math.cos(ax); s = Math.sin(ax); [y, z] = [y * c - z * s, y * s + z * c];
    return [x, y, z];
  }
  function proj(p) {
    const f = 6.2, k = f / (f + p[2] + 3.2);
    const sc = Math.min(w, h) / 4.7;
    return { x: w / 2 + p[0] * sc * k, y: h / 2 + p[1] * sc * k, k };
  }
  function nodePos(n, time) {
    const a = n.ph + time * n.sp;
    let p = [Math.cos(a) * n.r, 0, Math.sin(a) * n.r];
    const c = Math.cos(n.tilt), s = Math.sin(n.tilt);
    p = [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
    return p;
  }

  function frame(now) {
    const time = reduce ? 4 : now / 1000;
    if (!reduce) rotY += (tY - rotY) * 0.04;
    const ay = rotY + (reduce ? 0 : time * 0.12), ax = rotX;
    ctx.clearRect(0, 0, w, h);

    // orbit rings (faint)
    ctx.lineWidth = 1;
    nodes.forEach(n => {
      ctx.strokeStyle = 'rgba(140,170,220,.09)'; ctx.beginPath();
      for (let i = 0; i <= 64; i++) {
        const a = i / 64 * Math.PI * 2;
        let p = [Math.cos(a) * n.r, 0, Math.sin(a) * n.r];
        const c = Math.cos(n.tilt), s = Math.sin(n.tilt); p = [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
        const q = proj(rot(p, ay, ax + tX));
        i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y);
      }
      ctx.stroke();
    });

    // core wireframe + glow
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * .25);
    g.addColorStop(0, 'rgba(90,168,255,.35)'); g.addColorStop(1, 'rgba(90,168,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const cv = V.map(v => proj(rot(v, ay * 1.4, ax + tX)));
    ctx.strokeStyle = 'rgba(127,240,227,.75)'; ctx.lineWidth = 1.2; ctx.beginPath();
    E.forEach(([i, j]) => { ctx.moveTo(cv[i].x, cv[i].y); ctx.lineTo(cv[j].x, cv[j].y); });
    ctx.stroke();
    cv.forEach(p => { ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.arc(p.x, p.y, 2.2 * p.k, 0, 7); ctx.fill(); });

    // nodes sorted back to front
    const items = nodes.map(n => { const p = rot(nodePos(n, time), ay, ax + tX); return { n, p, q: proj(p) }; }).sort((a, b) => b.p[2] - a.p[2]);
    const core = proj([0, 0, 0]);
    items.forEach(({ n, p, q }, idx) => {
      const depth = Math.max(.35, Math.min(1, .7 + -p[2] * .18));
      ctx.globalAlpha = depth * .8;
      ctx.strokeStyle = n.c; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(core.x, core.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      // packet
      const u = ((time * .35 + n.ph) % 1);
      const px = core.x + (q.x - core.x) * u, py = core.y + (q.y - core.y) * u;
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px, py, 2 * q.k, 0, 7); ctx.fill();
      ctx.globalAlpha = depth;
      const rad = (small ? 15 : 19) * q.k;
      ctx.fillStyle = '#0b1424'; ctx.strokeStyle = n.c; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(q.x, q.y, rad, 0, 7); ctx.fill(); ctx.stroke();
      ctx.fillStyle = n.c; ctx.beginPath(); ctx.arc(q.x, q.y, rad * .3, 0, 7); ctx.fill();
      ctx.fillStyle = '#e8eefb'; ctx.font = `600 ${Math.round((small ? 11 : 12.5) * Math.max(.85, q.k))}px "Instrument Sans", system-ui, sans-serif`;
      ctx.textAlign = 'center'; ctx.fillText(n.l, q.x, q.y + rad + 15 * q.k);
    });
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    if (!running) return;
    if (now - last > (small ? 33 : 16)) { frame(now); last = now; }
    raf = requestAnimationFrame(loop);
  }
  function start() { if (reduce || running) return; running = true; raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  resize(); frame(0);
  new ResizeObserver(() => { resize(); frame(performance.now()); }).observe(canvas);
  if (reduce) return;

  const io = new IntersectionObserver(es => es[0].isIntersecting ? start() : stop());
  io.observe(canvas);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : (canvas.isConnected && start()));

  if (!small) {
    const host = canvas.parentElement;
    window.addEventListener('pointermove', e => {
      const r = host.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - .5), ny = ((e.clientY - r.top) / r.height - .5);
      tY = Math.max(-1, Math.min(1, nx)) * .9 + .6; tX = Math.max(-1, Math.min(1, ny)) * .35;
      host.style.setProperty('--mx', nx.toFixed(3)); host.style.setProperty('--my', ny.toFixed(3));
    }, { passive: true });
  }
}
