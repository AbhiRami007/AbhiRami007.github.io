// Loaded only on the AI Knowledge Platform case-study page.
// Everything here is local demo data. Nothing is sent anywhere.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────────── Architecture diagram ───────────── */
const archRoot = $('#arch');
if (archRoot) {
  const data = JSON.parse($('#arch-data').textContent);
  const keys = Object.keys(data);
  let cur = keys[0], sel = 0;
  const tabs = $('.arch-tabs', archRoot), svg = $('.arch-svg', archRoot), steps = $('.arch-static', archRoot);

  function layout(n) {
    const W = 900, colW = 270, rowH = 130, pad = 40, nodeW = 210, nodeH = 66;
    return Array.from({ length: n }, (_, i) => {
      const c = i % 3, r = Math.floor(i / 3);
      return { x: pad + c * ((W - 2 * pad - nodeW) / 2), y: 30 + r * rowH, w: nodeW, h: nodeH };
    });
  }
  function draw() {
    const st = data[cur].steps, pos = layout(st.length), rows = Math.ceil(st.length / 3);
    svg.setAttribute('viewBox', `0 0 900 ${40 + rows * 130 - 30}`);
    let out = '<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#8caadc"/></marker></defs>';
    pos.forEach((p, i) => {
      if (i === 0) return;
      const a = pos[i - 1];
      const d = a.y === p.y ? `M${a.x + a.w} ${a.y + a.h / 2} H${p.x - 2}` : `M${a.x + a.w / 2} ${a.y + a.h} V${a.y + a.h + 24} H${p.x + p.w / 2} V${p.y - 2}`;
      out += `<path class="edge" d="${d}" marker-end="url(#ah)"/>`;
      if (!reduce && i === sel + 1) out += `<circle r="4" fill="#a392ff"><animateMotion dur="1.6s" repeatCount="indefinite" path="${d}"/></circle>`;
    });
    st.forEach((s, i) => {
      const p = pos[i];
      out += `<g class="node${i === sel ? ' on' : ''}" tabindex="0" role="button" aria-label="Step ${i + 1}: ${esc(s.t)} ${esc(s.s)}" data-i="${i}"><rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="12"/><text x="${p.x + 16}" y="${p.y + 28}">${i + 1}. ${esc(s.t)}</text><text class="sub" x="${p.x + 16}" y="${p.y + 48}">${esc(s.s)}</text></g>`;
    });
    svg.innerHTML = out;
    steps.innerHTML = '<ol class="arch-steps">' + st.map((s, i) => `<li class="${i === sel ? 'on' : ''}"><button type="button" aria-expanded="${i === sel}" aria-controls="as-${i}" data-i="${i}">${esc(s.t)} <small style="color:var(--dim)">${esc(s.s)}</small></button><div class="more-detail" id="as-${i}" ${i === sel ? '' : 'hidden'}><p>${esc(s.d)}</p><p><strong>Trade-off:</strong> ${esc(s.x)}</p></div></li>`).join('') + '</ol>';
  }
  tabs.innerHTML = keys.map(k => `<button type="button" role="tab" aria-selected="${k === cur}" data-k="${k}">${esc(data[k].label)}</button>`).join('');
  tabs.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; cur = b.dataset.k; sel = 0; $$('button', tabs).forEach(x => x.setAttribute('aria-selected', String(x === b))); draw(); });
  const pick = e => { const t = e.target.closest('[data-i]'); if (!t) return; sel = +t.dataset.i; draw(); };
  svg.addEventListener('click', pick);
  svg.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(e); $(`.node[data-i="${sel}"]`, svg)?.focus(); } });
  steps.addEventListener('click', e => { pick(e); $(`.arch-steps button[data-i="${sel}"]`, archRoot)?.focus(); });
  draw();
}

/* ───────────── Interactive UI concept ───────────── */
const root = $('#concept');
if (root) {
  const DOCS = [
    { id: 1, name: 'Remote-Work-Policy.pdf', type: 'PDF', owner: 'A. Rao', up: '12 Sep', st: 'indexed', chunks: 18, upd: '12 Sep', pages: 6, snip: 'Employees may work remotely up to three days per week. Exceptions require written manager approval.' },
    { id: 2, name: 'Expense-Guidelines.docx', type: 'DOCX', owner: 'M. Chen', up: '10 Sep', st: 'indexed', chunks: 24, upd: '10 Sep', pages: 9, snip: 'Receipts are required for any expense above 25 units. Claims must be submitted within 30 days.' },
    { id: 3, name: 'Security-Handbook.pdf', type: 'PDF', owner: 'S. Okafor', up: '09 Sep', st: 'indexed', chunks: 61, upd: '09 Sep', pages: 28, snip: 'Multi-factor authentication is required on all company accounts. Lost devices must be reported immediately.' },
    { id: 4, name: 'Leave-Policy.pdf', type: 'PDF', owner: 'A. Rao', up: '08 Sep', st: 'indexed', chunks: 12, upd: '08 Sep', pages: 5, snip: 'Annual leave requests are submitted through the people portal and approved by the line manager.' },
    { id: 5, name: 'Onboarding-Checklist.md', type: 'MD', owner: 'A. Rao', up: '08 Sep', st: 'processing', chunks: 0, upd: 'Just now', pages: 3, snip: 'Extraction complete. Chunking in progress.' },
    { id: 6, name: 'Incident-Runbook.docx', type: 'DOCX', owner: 'S. Okafor', up: '07 Sep', st: 'queued', chunks: 0, upd: '07 Sep', pages: 14, snip: 'Waiting for a worker to pick up this job.' },
    { id: 7, name: 'Vendor-Contract-Scan.pdf', type: 'PDF', owner: 'L. Novak', up: '07 Sep', st: 'failed', chunks: 0, upd: '07 Sep', pages: 11, snip: '', err: 'Extraction failed: no text layer found. The file looks like a scanned image.' },
  ];
  const events = d => d.st === 'failed'
    ? ['Uploaded and validated', 'Stored original file', 'Queued for ingestion', 'Extraction failed: no text layer found', 'Retry available (1 of 3)']
    : d.st === 'queued' ? ['Uploaded and validated', 'Stored original file', 'Queued for ingestion']
    : d.st === 'processing' ? ['Uploaded and validated', 'Stored original file', 'Queued for ingestion', 'Text extracted', 'Chunking in progress']
    : ['Uploaded and validated', 'Stored original file', 'Queued for ingestion', 'Text extracted and chunked', `${d.chunks} chunks embedded`, 'Marked searchable'];
  const QA = [
    { k: ['remote', 'home', 'wfh'], q: 'How many days can I work remotely?', a: 'Employees may work remotely up to three days a week, and exceptions need written manager approval [1]. Core hours of 10:00 to 15:00 local time still apply [2].', src: [[1, 'p. 2', 'Employees may work remotely up to three days per week. Exceptions require written manager approval.'], [1, 'p. 3', 'Remote staff are expected to be available during core hours, 10:00 to 15:00 local time.']] },
    { k: ['expense', 'receipt', 'reimburs', 'claim'], q: 'When do I need a receipt for an expense?', a: 'A receipt is required for any expense above 25 units [1], and claims must be submitted within 30 days [2].', src: [[2, 'p. 4', 'Receipts are required for any expense above 25 units.'], [2, 'p. 5', 'Claims must be submitted within 30 days of the expense date.']] },
    { k: ['password', 'security', 'mfa', 'laptop', 'device', 'lost'], q: 'What should I do if I lose my laptop?', a: 'Report it to the security team immediately [1]. Multi-factor authentication is required on all company accounts, which limits exposure [2].', src: [[3, 'p. 12', 'Lost or stolen devices must be reported to the security team immediately.'], [3, 'p. 7', 'Multi-factor authentication is required on all company accounts.']] },
  ];
  const state = { view: 'overview', doc: null, msgs: [], busy: false, cites: null, err: false, retried: new Set() };
  const docById = id => DOCS.find(d => d.id === id);
  const status = d => state.retried.has(d.id) ? 'queued' : d.st;
  const pill = s => `<span class="st ${s}">${s[0].toUpperCase() + s.slice(1)}</span>`;
  let lastTrigger = null;

  root.innerHTML = `
    <div class="concept-label"><span class="pill concept">UI concept</span><span>Sample data. Not connected to a backend. Nothing you type or click here is stored.</span></div>
    <div class="app">
      <nav class="app-nav" aria-label="Workspace (demo)"><div class="ws">Northwind Labs<small>Sample workspace</small></div>
        ${[['overview', 'Overview'], ['documents', 'Documents'], ['ask', 'Ask Knowledge']].map(([k, l]) => `<button type="button" data-v="${k}">${l}</button>`).join('')}
        ${['Collections', 'Activity', 'Settings'].map(l => `<button type="button" class="stub" disabled title="Not part of this concept">${l}</button>`).join('')}
      </nav>
      <div class="app-main"><div class="app-top"><label class="sr-only" for="demo-search">Search documents</label><input id="demo-search" placeholder="Search documents (demo)" autocomplete="off"><span aria-hidden="true">Demo user</span></div>
        <div class="app-body" id="app-body" tabindex="-1"></div></div>
    </div>`;
  const body = $('#app-body', root);
  const navBtns = $$('.app-nav button[data-v]', root);

  function drawer() {
    if (!state.cites) return '';
    const hl = state.cites.hl;
    return `<aside class="drawer" role="dialog" aria-label="Sources"><button class="mini-btn" data-act="closeSrc" style="float:right">Close</button><h4>Sources</h4><p style="color:var(--dim);font-size:.85rem;margin:0">Each citation maps to a retrieved chunk.</p>${state.cites.src.map((s, i) => `<div class="src ${hl === i + 1 ? 'hl' : ''}" id="src-${i + 1}"><b>[${i + 1}] ${esc(docById(s[0]).name)}</b><span style="color:var(--dim)">${esc(s[1])}</span><p style="margin:6px 0 0">${esc(s[2])}</p></div>`).join('')}</aside>`;
  }
  function render() {
    navBtns.forEach(b => b.toggleAttribute('aria-current', b.dataset.v === state.view || (b.dataset.v === 'documents' && state.doc && state.view === 'doc')) );
    navBtns.forEach(b => { if (b.hasAttribute('aria-current')) b.setAttribute('aria-current', 'page'); });
    let h = '';
    if (state.view === 'overview') {
      const n = s => DOCS.filter(d => status(d) === s).length;
      h = `<h3 style="margin-bottom:14px">Overview</h3><div class="stat-row"><div class="stat"><b>${DOCS.length}</b><span>Total documents</span></div><div class="stat"><b>${n('indexed')}</b><span>Indexed</span></div><div class="stat"><b>${n('processing') + n('queued')}</b><span>Processing</span></div><div class="stat"><b>${n('failed')}</b><span>Needs attention</span></div></div>${table()}<div class="dz">Drag and drop documents here. Upload is visual only in this concept.</div>`;
    } else if (state.view === 'documents') {
      h = `<h3 style="margin-bottom:14px">Documents</h3>${table()}`;
    } else if (state.view === 'doc') {
      const d = state.doc, s = status(d), ev = events({ ...d, st: s === 'queued' && d.st === 'failed' ? 'queued' : d.st });
      if (state.retried.has(d.id)) ev.push('Retry queued (demo)');
      h = `<button class="back" data-act="back">&larr; Back to documents</button><h3>${esc(d.name)}</h3><p style="margin:6px 0 16px">${pill(s)}</p>
      <div class="detail-grid"><div class="box"><h4>Processing events</h4><ul class="events">${ev.map((e, i) => `<li class="${d.st === 'failed' && /failed/.test(e) && !state.retried.has(d.id) ? 'bad' : ''}">${esc(e)}</li>`).join('')}</ul></div>
      <div class="box"><h4>Indexing details</h4><p style="margin:0 0 4px">Pages: ${d.pages}</p><p style="margin:0 0 4px">Chunks created: ${d.chunks}</p><p style="margin:0">Embedding status: ${s === 'indexed' ? 'Complete' : s === 'failed' ? 'Not started' : 'Pending'}</p></div></div>
      <div class="box" style="margin-top:16px"><h4>${s === 'failed' ? 'Error' : 'Preview'}</h4>${d.st === 'failed' && !state.retried.has(d.id) ? `<div class="a-card err" role="alert">${esc(d.err)}<div class="a-actions"><button class="mini-btn" data-act="retry">Retry (demo)</button></div></div>` : `<p class="snippet">${esc(d.snip || 'Preview becomes available after extraction.')}</p>`}</div>`;
    } else {
      const sug = QA.map(x => `<button class="mini-btn" data-q="${esc(x.q)}">${esc(x.q)}</button>`).join('');
      h = `<h3 style="margin-bottom:14px">Ask Knowledge</h3><div class="chat">
        ${state.msgs.length ? '' : `<div class="a-card" style="text-align:center"><p style="margin:0 0 10px"><strong>Ask about your indexed documents.</strong><br><span style="color:var(--dim)">Answers cite their sources. If the evidence is weak, you will be told.</span></p><div class="suggest" style="justify-content:center">${sug}</div></div>`}
        ${state.msgs.map(m => m.role === 'u' ? `<div class="q-bubble">${esc(m.t)}</div>` : m.kind === 'ok' ? `<div class="a-card">${esc(m.t).replace(/\[(\d)\]/g, '<button class="cite" data-cite="$1" data-m="' + m.id + '" aria-label="Open source $1">$1</button>')}<div class="a-actions"><button class="mini-btn" data-act="allsrc" data-m="${m.id}">View sources</button><button class="mini-btn" data-act="fb">Helpful</button><button class="mini-btn" data-act="fb">Not helpful</button><span aria-live="polite" class="fbmsg"></span></div></div>` : `<div class="a-card ${m.kind === 'err' ? 'err' : 'warn'}" ${m.kind === 'err' ? 'role="alert"' : ''}><strong>${m.kind === 'err' ? 'Something went wrong' : 'Insufficient evidence'}</strong><p style="margin:6px 0 0">${esc(m.t)}</p></div>`).join('')}
        ${state.busy ? '<div class="a-card" role="status" aria-live="polite"><span class="dots" aria-hidden="true"><span></span><span></span><span></span></span> Searching your indexed documents</div>' : ''}
        <form class="ask-form" data-form><label class="sr-only" for="q">Your question</label><input id="q" placeholder="Ask a question about your documents" autocomplete="off" required><button class="btn btn-primary" style="padding:10px 18px" ${state.busy ? 'disabled' : ''}>Ask</button></form>
        <div><button class="mini-btn" data-act="simerr">Simulate an error state</button></div></div>`;
    }
    body.innerHTML = h + drawer();
  }
  function table() {
    return `<div class="tbl-wrap"><table><caption class="sr-only">Documents (sample data)</caption><thead><tr><th>Filename</th><th>Type</th><th>Owner</th><th>Uploaded</th><th>Status</th><th>Chunks</th><th>Updated</th></tr></thead><tbody>${DOCS.map(d => `<tr><td><button data-doc="${d.id}">${esc(d.name)}</button></td><td>${d.type}</td><td>${esc(d.owner)}</td><td>${d.up}</td><td>${pill(status(d))}</td><td>${d.chunks}</td><td>${d.upd}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function ask(q) {
    if (state.busy || !q.trim()) return;
    state.msgs.push({ role: 'u', t: q }); state.busy = true; state.cites = null; render();
    setTimeout(() => {
      const low = q.toLowerCase(), hit = QA.find(x => x.k.some(k => low.includes(k)));
      const id = state.msgs.length;
      if (state.err) { state.err = false; state.msgs.push({ role: 'a', kind: 'err', t: 'The answer service did not respond. Nothing was lost. Try asking again.' }); }
      else if (hit) state.msgs.push({ role: 'a', kind: 'ok', id, t: hit.a, src: hit.src });
      else state.msgs.push({ role: 'a', kind: 'none', t: 'The indexed documents do not contain enough evidence to answer this question. Try rephrasing it, or upload the document that covers it.' });
      state.busy = false; render(); $('#q', root)?.focus();
    }, reduce ? 0 : 900);
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.v) { state.view = t.dataset.v; state.cites = null; render(); return; }
    if (t.dataset.doc) { state.doc = docById(+t.dataset.doc); state.view = 'doc'; render(); $('h3', body)?.setAttribute('tabindex', '-1'); $('h3', body)?.focus(); return; }
    if (t.dataset.q) { ask(t.dataset.q); return; }
    if (t.dataset.cite || t.dataset.act === 'allsrc') {
      const m = state.msgs.find(x => x.id === +t.dataset.m); lastTrigger = t;
      state.cites = { src: m.src, hl: +t.dataset.cite || 0 }; render(); $('.drawer .mini-btn', root)?.focus(); return;
    }
    switch (t.dataset.act) {
      case 'back': state.view = 'documents'; render(); break;
      case 'retry': state.retried.add(state.doc.id); render(); break;
      case 'closeSrc': state.cites = null; render(); break;
      case 'simerr': state.err = true; t.textContent = 'Next question will fail (demo)'; t.disabled = true; break;
      case 'fb': t.closest('.a-actions').querySelector('.fbmsg').textContent = 'Thanks. Demo only, nothing is stored.'; break;
    }
  });
  root.addEventListener('submit', e => { e.preventDefault(); const i = $('#q', root); const v = i.value; i.value = ''; ask(v); });
  root.addEventListener('keydown', e => { if (e.key === 'Escape' && state.cites) { state.cites = null; render(); lastTrigger?.isConnected && lastTrigger.focus(); } });
  render();
}
