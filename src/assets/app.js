// Site-wide behaviour: mobile menu, skills tabs, timeline, hero scene (lazy).
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Mobile menu
const btn = $('.menu-btn'), list = $('#nav-list');
if (btn && list) {
  btn.addEventListener('click', () => { const o = list.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); });
  list.addEventListener('click', e => { if (e.target.closest('a')) { list.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && list.classList.contains('open')) { list.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
}

// Skills tabs (progressive enhancement: all panels visible without JS)
const tabs = $$('.skill-tabs [role="tab"]');
if (tabs.length) {
  const show = t => {
    tabs.forEach(x => x.setAttribute('aria-selected', String(x === t)));
    $$('.skill-panel').forEach(p => p.hidden = p.id !== t.getAttribute('aria-controls'));
  };
  document.documentElement.classList.add('js');
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t));
    t.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!k) return; e.preventDefault();
      const n = tabs[(i + k + tabs.length) % tabs.length]; n.focus(); show(n);
    });
  });
  show(tabs[0]);
}

// Timeline expanders
$$('.tl button[aria-controls]').forEach(b => {
  const d = document.getElementById(b.getAttribute('aria-controls'));
  b.addEventListener('click', () => { const o = b.getAttribute('aria-expanded') === 'true'; b.setAttribute('aria-expanded', String(!o)); d.hidden = o; });
});

// Hero scene: lazy-load the module only when the canvas is near the viewport
const canvas = $('#hero-canvas');
if (canvas) {
  const load = () => import('./hero3d.js').then(m => m.startHero(canvas)).catch(() => {});
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: '200px' });
    io.observe(canvas);
  } else load();
}

// AI case-study modules, loaded only on that page
if ($('#arch') || $('#concept')) import('./concept.js').catch(() => {});
