// Interactive simulations for the case studies. Local sample data only; nothing leaves the page.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const frame = (el, title, note, inner) => { el.innerHTML = `<div class="demo-head"><span class="pill concept">Interactive simulation</span><strong>${esc(title)}</strong><span class="demo-note">${esc(note)}</span></div><div class="demo">${inner}</div>`; return $('.demo', el); };

/* ═════════════ Free2Move Charge: map, clusters, charging session ═════════════ */
export function f2m(el) {
  const ST = [
    { id: 1, n: 'Riverside Hub', x: 120, y: 90, kw: 22, c: ['Type 2', 'CCS'] }, { id: 2, n: 'Old Town Garage', x: 205, y: 120, kw: 50, c: ['CCS'] },
    { id: 3, n: 'Station Square', x: 70, y: 175, kw: 22, c: ['Type 2'] }, { id: 4, n: 'Harbour Point', x: 420, y: 80, kw: 150, c: ['CCS'] },
    { id: 5, n: 'Market Street', x: 470, y: 120, kw: 22, c: ['Type 2'] }, { id: 6, n: 'Airport Road', x: 640, y: 70, kw: 150, c: ['CCS', 'CHAdeMO'] },
    { id: 7, n: 'Retail Park', x: 240, y: 262, kw: 50, c: ['CCS', 'Type 2'] }, { id: 8, n: 'Campus North', x: 385, y: 335, kw: 22, c: ['Type 2'] },
    { id: 9, n: 'Central Mall', x: 300, y: 345, kw: 22, c: ['Type 2'] }, { id: 10, n: 'Ring Road East', x: 600, y: 300, kw: 50, c: ['CCS'] },
    { id: 11, n: 'Lakeside', x: 650, y: 350, kw: 22, c: ['Type 2'] }, { id: 12, n: 'South Depot', x: 140, y: 360, kw: 150, c: ['CCS', 'CHAdeMO'] },
  ];
  const ME = { x: 310, y: 215 }, RATE = 0.42;
  const S = { zoomed: false, sel: null, charging: null, hist: [], pay: '' };
  const d = frame(el, 'Find a station, charge, pay', 'Sample stations and a sample tariff of 0.42 per kWh. Time runs faster than real life.',
    `<div class="f2m"><div class="map-wrap"><div class="map-bar"><button class="mini-btn" data-a="zoom" aria-pressed="false">Zoom out to clusters</button><span class="map-hint"></span></div><svg class="map" viewBox="0 0 760 420" role="group" aria-label="Map of sample charging stations"></svg></div><aside class="f2m-side" aria-live="polite"></aside></div>`);
  const svg = $('.map', d), side = $('.f2m-side', d), hint = $('.map-hint', d);
  const dist = s => Math.round(Math.hypot(s.x - ME.x, s.y - ME.y) * 6);
  function clusters() {
    const g = {}; ST.forEach(s => { const k = Math.floor(s.x / 230) + ':' + Math.floor(s.y / 190); (g[k] ||= []).push(s); });
    return Object.values(g);
  }
  function map() {
    let o = Array.from({ length: 10 }, (_, i) => `<path d="M0 ${42 * i}H760" class="grid"/><path d="M${76 * i} 0V420" class="grid"/>`).join('') + `<path class="road" d="M0 250 C180 200 260 330 400 210 S650 150 760 90"/><path class="road" d="M200 0 C230 120 300 160 330 420"/>`;
    o += `<circle class="radar" cx="${ME.x}" cy="${ME.y}" r="30"/><circle class="radar r2" cx="${ME.x}" cy="${ME.y}" r="30"/><circle class="me" cx="${ME.x}" cy="${ME.y}" r="8"/><text class="lb" x="${ME.x}" y="${ME.y + 26}" text-anchor="middle">You</text>`;
    if (S.zoomed) clusters().forEach(g => {
      const x = g.reduce((a, s) => a + s.x, 0) / g.length, y = g.reduce((a, s) => a + s.y, 0) / g.length;
      o += g.length > 1 ? `<g class="cl" tabindex="0" role="button" aria-label="Cluster of ${g.length} stations, zoom in" data-x="${x}" data-y="${y}"><circle cx="${x}" cy="${y}" r="${18 + g.length * 4}"/><text x="${x}" y="${y + 6}" text-anchor="middle">${g.length}</text></g>` : stationNode(g[0]);
    }); else ST.forEach(s => o += stationNode(s));
    svg.innerHTML = o;
    hint.textContent = S.zoomed ? 'Nearby stations are grouped into clusters. Select one to zoom in.' : 'Select a station.';
  }
  const stationNode = s => `<g class="st${S.sel === s.id ? ' sel' : ''}${S.charging?.id === s.id ? ' chg' : ''}" tabindex="0" role="button" aria-label="${esc(s.n)}, ${s.kw} kW" data-id="${s.id}"><circle cx="${s.x}" cy="${s.y}" r="15"/><path d="M${s.x + 2} ${s.y - 8} l-6 9 h5 l-2 7 6-9 h-5z"/><text x="${s.x}" y="${s.y + 32}" text-anchor="middle">${esc(s.n)}</text></g>`;
  function panel() {
    const c = S.charging, s = S.sel && ST.find(x => x.id === S.sel);
    let h = '';
    if (c) {
      const st = ST.find(x => x.id === c.id), kwh = c.kwh, cost = kwh * RATE;
      h = `<h4>Charging at ${esc(st.n)}</h4><div class="meter"><div class="ring" style="--p:${Math.min(100, kwh / 40 * 100)}"><b>${kwh.toFixed(1)}</b><span>kWh</span></div><dl><dt>Time</dt><dd>${Math.floor(c.sec / 60)}m ${String(Math.floor(c.sec % 60)).padStart(2, '0')}s</dd><dt>Power</dt><dd>${st.kw} kW</dd><dt>Cost so far</dt><dd>${cost.toFixed(2)}</dd></dl></div><p class="mut">Real-time updates keep this view in sync with the session.</p><button class="btn btn-primary" data-a="stop">Stop charging</button>`;
    } else if (S.pay) h = `<h4>Payment</h4><p class="payst ${S.pay === 'Paid' ? 'ok' : ''}">${S.pay === 'Paid' ? 'Paid' : 'Processing payment'}</p><p class="mut">Cost is calculated from usage, then payment status is updated and the session is stored.</p>`;
    else if (s) h = `<h4>${esc(s.n)}</h4><p class="mut">${dist(s)} m away</p><ul class="tags">${s.c.map(x => `<li>${x}</li>`).join('')}<li>${s.kw} kW</li></ul><button class="btn btn-primary" data-a="start">Start charging</button>`;
    else h = `<h4>Nearby stations</h4><ol class="nearby">${[...ST].sort((a, b) => dist(a) - dist(b)).slice(0, 4).map(x => `<li><button data-id="${x.id}">${esc(x.n)}<span>${dist(x)} m · ${x.kw} kW</span></button></li>`).join('')}</ol>`;
    h += `<h4 class="hh">History</h4>` + (S.hist.length ? `<ul class="hist">${S.hist.map(x => `<li><b>${esc(x.n)}</b><span>${x.kwh.toFixed(1)} kWh · ${x.time} · ${x.cost.toFixed(2)} · ${x.st}</span></li>`).join('')}</ul>` : `<p class="mut">Completed sessions appear here with usage and payment details.</p>`);
    side.innerHTML = h;
  }
  let tick = 0;
  d.addEventListener('click', e => {
    const b = e.target.closest('[data-a],[data-id],.cl'); if (!b) return;
    if (b.dataset.a === 'zoom') { S.zoomed = !S.zoomed; b.setAttribute('aria-pressed', S.zoomed); b.textContent = S.zoomed ? 'Zoom in to stations' : 'Zoom out to clusters'; }
    else if (b.classList.contains('cl')) { S.zoomed = false; $('[data-a="zoom"]', d).textContent = 'Zoom out to clusters'; $('[data-a="zoom"]', d).setAttribute('aria-pressed', 'false'); }
    else if (b.dataset.id && !S.charging) { S.sel = +b.dataset.id; S.pay = ''; }
    else if (b.dataset.a === 'start') { S.pay = ''; S.charging = { id: S.sel, sec: 0, kwh: 0 }; const kw = ST.find(x => x.id === S.sel).kw; tick = setInterval(() => { S.charging.sec += 20; S.charging.kwh += kw / 3600 * 20; panel(); }, 400); }
    else if (b.dataset.a === 'stop') {
      clearInterval(tick); const c = S.charging, st = ST.find(x => x.id === c.id); S.charging = null; S.pay = 'Processing';
      const rec = { n: st.n, kwh: c.kwh, time: `${Math.floor(c.sec / 60)}m`, cost: c.kwh * RATE, st: 'Processing' }; S.hist.unshift(rec);
      setTimeout(() => { S.pay = 'Paid'; rec.st = 'Paid'; map(); panel(); }, 1100);
    }
    map(); panel();
  });
  d.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.st,.cl')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); } });
  map(); panel();
}

/* ═════════════ Feature Flag: rules, SDK evaluation, apps ═════════════ */
export function ff(el) {
  const USERS = Array.from({ length: 30 }, (_, i) => 'user-' + String(i + 1).padStart(2, '0'));
  const hash = s => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100003, 7) % 100;
  const F = {
    'new-checkout': { on: true, mode: 'pct', pct: 40, envs: ['production'], users: ['user-03', 'user-07', 'user-12'] },
    'dark-mode': { on: true, mode: 'env', pct: 100, envs: ['staging'], users: [] },
    'beta-search': { on: false, mode: 'user', pct: 0, envs: ['production'], users: ['user-01', 'user-02'] },
  };
  const APPS = [{ n: 'Web app', env: 'production' }, { n: 'Mobile app', env: 'production' }, { n: 'Staging site', env: 'staging' }];
  const S = { flag: 'new-checkout', user: 'user-07' };
  const evalF = (name, user, env) => { const f = F[name]; if (!f.on) return false; return f.mode === 'user' ? f.users.includes(user) : f.mode === 'env' ? f.envs.includes(env) : hash(user) < f.pct; };
  const d = frame(el, 'Change a rule, watch every app react', 'Sample flags and users. The rollout hash and the code are illustrative.',
    `<div class="ff"><section class="ff-admin" aria-label="Admin dashboard"><h4>Admin dashboard</h4><div class="flags" role="tablist"></div><div class="ff-ctl"></div></section>
    <section class="ff-apps" aria-label="Applications"><h4>Applications using the SDK</h4><div class="apps"></div><div class="users-h"><h4>Production users</h4><span class="mut">Select a user to trace the SDK</span></div><div class="users"></div><pre class="trace" aria-live="polite"></pre></section></div>`);
  const flagsEl = $('.flags', d), ctl = $('.ff-ctl', d), apps = $('.apps', d), usersEl = $('.users', d), trace = $('.trace', d);
  function draw(pulse) {
    const f = F[S.flag];
    flagsEl.innerHTML = Object.keys(F).map(k => `<button role="tab" aria-selected="${k === S.flag}" data-flag="${k}"><span class="dot ${F[k].on ? 'on' : ''}"></span>${k}</button>`).join('');
    ctl.innerHTML = `<label class="sw"><input type="checkbox" data-k="on" ${f.on ? 'checked' : ''}><span>Flag enabled</span></label>
      <fieldset><legend>Condition</legend>${[['user', 'User-based'], ['env', 'Environment-based'], ['pct', 'Percentage rollout']].map(([v, l]) => `<label class="rad"><input type="radio" name="mode" value="${v}" ${f.mode === v ? 'checked' : ''}>${l}</label>`).join('')}</fieldset>
      ${f.mode === 'pct' ? `<label class="rng">Rollout: <b>${f.pct}%</b><input type="range" min="0" max="100" value="${f.pct}" data-k="pct"></label>` : ''}
      ${f.mode === 'env' ? `<div class="envs">${['development', 'staging', 'production'].map(e => `<label class="chk"><input type="checkbox" data-env="${e}" ${f.envs.includes(e) ? 'checked' : ''}>${e}</label>`).join('')}</div>` : ''}
      ${f.mode === 'user' ? `<p class="mut">Click users on the right to allow or block them.</p>` : ''}`;
    apps.innerHTML = APPS.map((a, i) => { const on = evalF(S.flag, S.user, a.env); return `<div class="fapp ${on ? 'on' : 'off'} ${pulse ? 'pulse' : ''}" style="--i:${i}"><header>${a.n}<small>${a.env}</small></header><div class="feat">${on ? S.flag + ' is ON' : 'Feature hidden'}</div></div>`; }).join('');
    usersEl.innerHTML = USERS.map(u => `<button class="u ${evalF(S.flag, u, 'production') ? 'on' : ''} ${u === S.user ? 'sel' : ''}" data-u="${u}" title="${u}" aria-label="${u}, feature ${evalF(S.flag, u, 'production') ? 'on' : 'off'}"></button>`).join('');
    const r = evalF(S.flag, S.user, 'production');
    trace.textContent = `// illustrative SDK usage\nconst show = sdk.isEnabled('${S.flag}', { user: '${S.user}' });\n\n1. read condition name   -> ${S.flag}\n2. fetch rules           -> ${f.on ? f.mode === 'pct' ? 'percentage rollout ' + f.pct + '%' : f.mode === 'env' ? 'environments: ' + (f.envs.join(', ') || 'none') : 'allowed users: ' + (f.users.length || 'none') : 'flag disabled'}\n3. apply logic           -> ${f.mode === 'pct' ? 'bucket ' + hash(S.user) + ' < ' + f.pct + '?' : 'check rule'}\n4. return decision       -> ${r ? 'ON  (show feature)' : 'OFF (hide feature)'}`;
  }
  d.addEventListener('click', e => {
    const t = e.target.closest('[data-flag],[data-u]'); if (!t) return;
    if (t.dataset.flag) S.flag = t.dataset.flag;
    else { S.user = t.dataset.u; const f = F[S.flag]; if (f.mode === 'user') f.users = f.users.includes(S.user) ? f.users.filter(x => x !== S.user) : [...f.users, S.user]; }
    draw(true);
  });
  d.addEventListener('input', e => {
    const t = e.target, f = F[S.flag];
    if (t.dataset.k === 'on') f.on = t.checked; else if (t.dataset.k === 'pct') f.pct = +t.value; else if (t.name === 'mode') f.mode = t.value;
    else if (t.dataset.env) f.envs = t.checked ? [...new Set([...f.envs, t.dataset.env])] : f.envs.filter(x => x !== t.dataset.env);
    draw(true);
    if (t.dataset.k === 'pct') $('input[data-k="pct"]', d)?.focus();
  });
  draw();
}

/* ═════════════ HiHydra: plan, connect apps, permissions ═════════════ */
export function hh(el) {
  const APPS = [{ id: 'cal', n: 'Calendar app' }, { id: 'crm', n: 'CRM app' }, { id: 'sto', n: 'Storage app' }, { id: 'chat', n: 'Chat app' }];
  const PERMS = ['View basic profile', 'Read data', 'Write data'];
  const S = { user: false, days: 7, sub: false, conn: {}, modal: null, pay: false, last: '' };
  const d = frame(el, 'Connect apps from one dashboard', 'Made-up sample apps. No real sign-in or payment happens.', `<div class="hh"></div>`);
  const root = $('.hh', d);
  const access = () => S.sub || S.days > 0;
  function draw() {
    if (!S.user) { root.innerHTML = `<div class="hh-gate"><h4>Welcome to the dashboard</h4><p class="mut">Step 1 of 4. Create an account to start with free days.</p><button class="btn btn-primary" data-a="reg">Register (demo)</button></div>`; return; }
    const cs = Object.keys(S.conn), granted = cs.reduce((a, k) => a + S.conn[k].filter(Boolean).length, 0);
    root.innerHTML = `<div class="hh-stats"><div class="stat"><b>${cs.length}</b><span>Connected apps</span></div><div class="stat"><b>${granted}</b><span>Permissions granted</span></div><div class="stat ${access() ? '' : 'bad'}"><b>${S.sub ? 'Active' : S.days > 0 ? S.days + ' free days' : 'Paused'}</b><span>Access</span></div><div class="stat"><b>${S.last || 'None'}</b><span>Last payment</span></div></div>
    ${!access() ? `<div class="a-card warn" role="alert"><strong>Access paused.</strong> Free days have run out. Subscribe to keep connecting and managing apps.</div>` : ''}
    <div class="hh-cols"><section><h4>Available apps</h4><div class="app-grid">${APPS.map(a => `<div class="appc ${S.conn[a.id] ? 'on' : ''}"><b>${a.n}</b>${S.conn[a.id] ? '<span class="st indexed">Connected</span>' : `<button class="mini-btn" data-a="conn" data-id="${a.id}" ${access() ? '' : 'disabled'}>Connect</button>`}</div>`).join('')}</div></section>
    <section><h4>Manage permissions</h4>${cs.length ? cs.map(k => `<div class="box permbox"><b>${APPS.find(a => a.id === k).n}</b>${PERMS.map((p, i) => `<label class="chk"><input type="checkbox" data-a="perm" data-id="${k}" data-i="${i}" ${S.conn[k][i] ? 'checked' : ''}>${p}</label>`).join('')}<button class="mini-btn" data-a="disc" data-id="${k}">Disconnect</button></div>`).join('') : '<p class="mut">Connected apps and their permissions show up here.</p>'}</section>
    <section><h4>Plan and billing</h4><div class="box"><p>${S.sub ? 'Subscription active.' : `Free days left: <b>${S.days}</b>`}</p>${S.sub ? '<p class="mut">Renew anytime. Payment details are stored.</p>' : `<button class="btn btn-primary" data-a="sub">Subscribe with Stripe (demo)</button> <button class="mini-btn" data-a="day">Simulate a day passing</button>`}</div></section></div>
    ${S.modal ? `<div class="modal" role="dialog" aria-modal="true" aria-label="${S.modal.t}"><div class="box">${S.modal.k === 'conn' ? `<h4>Sign in to ${APPS.find(a => a.id === S.modal.id).n}</h4><p class="mut">You are asked to grant permissions. Untick any you do not want to give.</p>${PERMS.map((p, i) => `<label class="chk"><input type="checkbox" checked data-m="${i}">${p}</label>`).join('')}<div class="btn-row"><button class="btn btn-primary" data-a="allow">Allow and connect</button><button class="mini-btn" data-a="cancel">Cancel</button></div>` : `<h4>Subscribe</h4><p class="mut">Payment is handled through Stripe. This is a demo, no card is used.</p><div class="btn-row"><button class="btn btn-primary" data-a="pay">Pay (demo)</button><button class="mini-btn" data-a="cancel">Cancel</button></div>`}</div></div>` : ''}`;
    $('.modal button', root)?.focus();
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button[data-a]'); if (!b) return; const a = b.dataset.a;
    if (a === 'reg') S.user = true; else if (a === 'conn') S.modal = { k: 'conn', id: b.dataset.id, t: 'Connect app' };
    else if (a === 'allow') S.conn[S.modal.id] = $$('[data-m]', root).map(x => x.checked), S.modal = null;
    else if (a === 'disc') delete S.conn[b.dataset.id]; else if (a === 'sub') S.modal = { k: 'pay', t: 'Subscribe' };
    else if (a === 'pay') { S.sub = true; S.last = 'Just now'; S.modal = null; } else if (a === 'cancel') S.modal = null; else if (a === 'day') S.days = Math.max(0, S.days - 3);
    draw();
  });
  root.addEventListener('change', e => { const t = e.target; if (t.dataset.a === 'perm') { S.conn[t.dataset.id][+t.dataset.i] = t.checked; draw(); } });
  root.addEventListener('keydown', e => { if (e.key === 'Escape' && S.modal) { S.modal = null; draw(); } });
  draw();
}

/* ═════════════ Engig: MVC request tracer and master data ═════════════ */
export function eng(el) {
  const TYPES = ['Pump', 'Valve', 'Sensor', 'Control panel'];
  const R = [{ id: 'C-101', n: 'Feed pump A', t: 'Pump', s: 'In design' }, { id: 'C-102', n: 'Isolation valve', t: 'Valve', s: 'Approved' }, { id: 'C-103', n: 'Pressure sensor', t: 'Sensor', s: 'In design' }];
  let seq = 104, hot = -1, err = -1, msg = '';
  const LAYERS = ['Dashboard', 'Controller', 'Business logic', 'Model', 'Database'];
  const d = frame(el, 'Manage records through the MVC layers', 'Sample engineering components. Every action travels through the layers on the left.',
    `<div class="eng"><ol class="trace-l" aria-label="Request path"></ol><section><form class="eng-form"><label>Component name<input name="n" placeholder="e.g. Cooling pump B" autocomplete="off"></label><label>Master data type<select name="t">${TYPES.map(t => `<option>${t}</option>`).join('')}</select></label><button class="btn btn-primary">Create record</button></form><p class="eng-msg" role="status"></p><div class="tbl-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Status</th><th></th></tr></thead><tbody></tbody></table></div></section><aside class="box"><h4>Master data</h4><p class="mut">Types are defined once and reused, which keeps data consistent.</p><ul class="md"></ul></aside></div>`);
  const tr = $('.trace-l', d), tb = $('tbody', d), md = $('.md', d), mg = $('.eng-msg', d);
  const draw = () => {
    tr.innerHTML = LAYERS.map((l, i) => `<li class="${i === hot ? 'hot' : ''} ${i === err ? 'bad' : ''}">${l}</li>`).join('');
    tb.innerHTML = R.map(r => `<tr><td>${r.id}</td><td>${esc(r.n)}</td><td>${r.t}</td><td><select data-id="${r.id}" aria-label="Status of ${esc(r.n)}">${['In design', 'Approved', 'Installed'].map(s => `<option ${s === r.s ? 'selected' : ''}>${s}</option>`).join('')}</select></td><td><button class="mini-btn" data-del="${r.id}">Delete</button></td></tr>`).join('');
    md.innerHTML = TYPES.map(t => `<li><span>${t}</span><b>${R.filter(r => r.t === t).length}</b></li>`).join('');
    mg.textContent = msg; mg.className = 'eng-msg' + (err >= 0 ? ' bad' : '');
  };
  async function run(op, upto = 4, fail = -1) {
    err = -1;
    for (let i = 0; i <= upto; i++) { hot = i; draw(); await new Promise(r => setTimeout(r, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 170)); if (i === fail) { err = i; hot = -1; draw(); return false; } }
    op(); hot = -1; draw(); return true;
  }
  d.addEventListener('submit', async e => {
    e.preventDefault(); const f = e.target, n = f.n.value.trim();
    if (!n) { msg = 'Business logic rejected the request: a component name is required.'; await run(() => { }, 2, 2); return; }
    if (R.some(r => r.n.toLowerCase() === n.toLowerCase())) { msg = 'Business logic rejected the request: this component already exists.'; await run(() => { }, 2, 2); return; }
    msg = `Saved. ${n} is now in the database.`; await run(() => R.push({ id: 'C-' + seq++, n, t: f.t.value, s: 'In design' })); f.reset();
  });
  d.addEventListener('change', e => { const t = e.target; if (t.dataset.id) { msg = 'Status updated and stored.'; run(() => { R.find(r => r.id === t.dataset.id).s = t.value; }); } });
  d.addEventListener('click', e => { const b = e.target.closest('[data-del]'); if (b) { msg = 'Record deleted.'; run(() => { R.splice(R.findIndex(r => r.id === b.dataset.del), 1); }); } });
  draw();
}
