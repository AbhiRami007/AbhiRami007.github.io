// Global visual effects. Everything here is optional polish: the site is fully usable without it.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
root.classList.add('fx');

// Scroll reveal (staggered via --i)
const rev = $$('[data-reveal]');
if (reduce || !('IntersectionObserver' in window)) rev.forEach(e => e.classList.add('in'));
else {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  rev.forEach(e => io.observe(e));
}

if (!reduce) {
  // Scroll progress bar
  const bar = document.querySelector('.progress');
  const onScroll = () => {
    const h = root.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    root.style.setProperty('--sy', scrollY.toFixed(0));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Parallax layers: data-parallax="0.15"
  const par = $$('[data-parallax]');
  if (par.length) {
    let tick = false;
    addEventListener('scroll', () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => { par.forEach(e => { const r = e.getBoundingClientRect(); const c = r.top + r.height / 2 - innerHeight / 2; e.style.transform = `translate3d(0, ${(-c * parseFloat(e.dataset.parallax)).toFixed(1)}px, 0)`; }); tick = false; });
    }, { passive: true });
  }

  if (fine) {
    // Cursor spotlight
    addEventListener('pointermove', e => { root.style.setProperty('--cx', e.clientX + 'px'); root.style.setProperty('--cy', e.clientY + 'px'); }, { passive: true });

    // 3D tilt with glare: data-tilt="8"
    $$('[data-tilt]').forEach(el => {
      const max = parseFloat(el.dataset.tilt) || 8;
      let raf = 0;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(900px) rotateX(${((.5 - y) * max).toFixed(2)}deg) rotateY(${((x - .5) * max).toFixed(2)}deg) translateZ(0)`;
          el.style.setProperty('--gx', (x * 100).toFixed(1) + '%'); el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
        });
      });
      el.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); el.style.transform = ''; });
    });

    // Magnetic buttons
    $$('[data-magnet]').forEach(el => {
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * .18).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * .28).toFixed(1)}px)`; });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  // Timeline line fills as you scroll
  const tl = document.querySelector('.tl');
  if (tl) addEventListener('scroll', () => {
    const r = tl.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
    tl.style.setProperty('--fill', (p * 100).toFixed(1) + '%');
  }, { passive: true });
}
