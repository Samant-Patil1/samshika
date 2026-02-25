'use strict';

// ── Floating hearts background ──
function createFloatingEmbers(containerId, count = 14) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const emojis = ['💕', '❤️', '💗', '💖', '💝', '❤️', '💕', '❤️'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('floating-heart');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `left:${Math.random() * 100}%;font-size:${Math.random() * 1.1 + 0.7}rem;animation-duration:${Math.random() * 12 + 10}s;animation-delay:${Math.random() * 10}s;`;
    container.appendChild(el);
  }
}

// ── Days together ──
function initDaysCounter() {
  document.querySelectorAll('.days-together').forEach(el => {
    const since = new Date(el.dataset.since || '2023-11-21');
    const update = () => { el.textContent = Math.floor((new Date() - since) / 86400000).toLocaleString(); };
    update(); setInterval(update, 60000);
  });
}

// ── Live countdowns ──
function initCountdowns() {
  document.querySelectorAll('.live-countdown').forEach(el => {
    const target = new Date(el.dataset.date);
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) { el.innerHTML = '<span style="color:var(--red-light);font-weight:700;">🎉 Today!</span>'; return; }
      const pad = n => String(Math.floor(n)).padStart(2, '0');
      el.querySelector('.cd-days') && (el.querySelector('.cd-days').textContent = pad(diff / 86400000));
      el.querySelector('.cd-hours') && (el.querySelector('.cd-hours').textContent = pad((diff % 86400000) / 3600000));
      el.querySelector('.cd-mins') && (el.querySelector('.cd-mins').textContent = pad((diff % 3600000) / 60000));
      el.querySelector('.cd-secs') && (el.querySelector('.cd-secs').textContent = pad((diff % 60000) / 1000));
    };
    tick(); setInterval(tick, 1000);
  });
}

// ── Typewriter ──
function typeWriter(el, texts, speed = 75) {
  if (!el || !texts.length) return;
  let ti = 0, ci = 0, del = false;
  const tick = () => {
    const cur = texts[ti];
    if (del) { el.textContent = cur.substring(0, --ci); if (ci < 0) { del = false; ti = (ti + 1) % texts.length; setTimeout(tick, 500); return; } }
    else { el.textContent = cur.substring(0, ++ci); if (ci > cur.length) { del = true; setTimeout(tick, 2200); return; } }
    setTimeout(tick, del ? speed / 2 : speed);
  };
  tick();
}

// ── Nav ──
function initNav() {
  const toggle = document.querySelector('.nav-hamburger');
  const menu = document.querySelector('.nav-mobile');
  const close = document.querySelector('.nav-mobile-close');
  const nav = document.querySelector('.nav');
  toggle?.addEventListener('click', () => { menu?.classList.add('open'); document.body.style.overflow = 'hidden'; });
  close?.addEventListener('click', () => { menu?.classList.remove('open'); document.body.style.overflow = ''; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { menu?.classList.remove('open'); document.body.style.overflow = ''; } });
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
    const p = document.querySelector('.scroll-progress-bar');
    if (p) p.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
  }, { passive: true });
}

// ── Scroll reveal ──
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.12 });
  document.querySelectorAll('.timeline-item, .reveal').forEach(el => obs.observe(el));
  const line = document.querySelector('.timeline-line');
  if (line) new IntersectionObserver(([e]) => { if (e.isIntersecting) line.classList.add('visible'); }, { threshold: 0.05 }).observe(line);
}

// ── Gallery filter ──
function initGalleryFilter() {
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => { item.style.display = (f === 'all' || item.dataset.category === f) ? '' : 'none'; });
    });
  });
}

// ── Lightbox ──
function initLightbox() {
  const lb = document.getElementById('lightbox'); if (!lb) return;
  const cap = lb.querySelector('.lightbox-caption');
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => { if (cap) cap.textContent = el.dataset.caption || ''; lb.classList.add('open'); document.body.style.overflow = 'hidden'; });
  });
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lightbox-close')) { lb.classList.remove('open'); document.body.style.overflow = ''; } });
}

// ── Password protection ──
function initPasswordProtect() {
  const form = document.getElementById('password-form'), content = document.getElementById('protected-content'), gate = document.getElementById('password-gate');
  if (!form) return;
  const PW = 'SI96305';
  if (localStorage.getItem('couple_pass') === PW) { if (gate) gate.style.display = 'none'; if (content) content.style.display = 'block'; }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inp = form.querySelector('input[type="password"]');
    if (inp?.value === PW) { localStorage.setItem('couple_pass', PW); if (gate) gate.style.display = 'none'; if (content) content.style.display = 'block'; }
    else { const err = document.getElementById('password-error'); if (err) { err.style.display = 'block'; setTimeout(() => err.style.display = 'none', 3000); } }
  });
}

// ── Guestbook ──
function initGuestbook() {
  const form = document.getElementById('guestbook-form'); if (!form) return;
  const wall = document.getElementById('wish-wall');
  const msgs = JSON.parse(localStorage.getItem('guestbook_msgs') || '[]');
  const makeCard = m => `<div class="wish-card card"><div class="wish-header"><div class="wish-avatar">${m.name.charAt(0).toUpperCase()}</div><div><div class="wish-name">${m.name}</div><div class="wish-relation">${m.relation} · ${m.date}</div></div></div><p class="wish-message">"${m.message}"</p><div class="wish-footer"><span>${m.occasion}</span></div></div>`;
  if (wall && msgs.length) wall.insertAdjacentHTML('afterbegin', msgs.map(makeCard).join(''));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form), msg = { name: d.get('name') || 'Anonymous', relation: d.get('relation') || 'Friend', message: d.get('message') || '', occasion: d.get('occasion') || '❤️', date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) };
    msgs.unshift(msg); localStorage.setItem('guestbook_msgs', JSON.stringify(msgs));
    wall?.insertAdjacentHTML('afterbegin', makeCard(msg)); form.reset();
    const s = document.getElementById('form-success'); if (s) { s.style.display = 'block'; setTimeout(() => s.style.display = 'none', 3500); }
  });
}

// ── Confetti — all red ──
function launchConfetti() {
  const colors = ['#c0392b', '#e74c3c', '#922b21', '#f2d7d5', '#ffffff'];
  for (let i = 0; i < 90; i++) {
    const p = document.createElement('div'); p.classList.add('confetti-piece');
    p.style.cssText = `left:${Math.random() * 100}vw;width:${Math.random() * 10 + 5}px;height:${Math.random() * 6 + 4}px;background:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${Math.random() * 2 + 2}s;animation-delay:${Math.random() * 1.5}s;`;
    document.body.appendChild(p); setTimeout(() => p.remove(), 5000);
  }
}

function vote(btn, id) { const el = document.getElementById(id); if (!el || btn.disabled) return; el.textContent = (parseInt(el.textContent) + 1) + ' votes'; btn.textContent = '✓ Voted!'; btn.style.background = 'var(--red)'; btn.style.color = 'white'; btn.disabled = true; }
window.vote = vote;

document.addEventListener('DOMContentLoaded', () => {
  initNav(); initScrollReveal(); initLightbox(); initPasswordProtect();
  initGalleryFilter(); initGuestbook(); initDaysCounter(); initCountdowns();
  createFloatingEmbers('hearts-container');
  const tw = document.querySelector('.typewriter-text');
  if (tw) { try { typeWriter(tw, JSON.parse(tw.dataset.texts)); } catch { typeWriter(tw, [tw.textContent]); } }
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-names', { opacity: 0, y: 60, duration: 1.1, ease: 'power3.out' });
    gsap.from('.hero-tagline', { opacity: 0, y: 30, duration: 0.8, delay: 0.25 });
    gsap.from('.hero-counter', { opacity: 0, y: 20, duration: 0.7, delay: 0.4 });
    gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.7, delay: 0.5 });
    gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.6, delay: 0.65 });
    gsap.from('.quick-link-card', { opacity: 0, y: 30, stagger: 0.08, delay: 0.8, duration: 0.6 });
    gsap.utils.toArray('.card').forEach(card => { gsap.from(card, { opacity: 0, y: 40, duration: 0.7, scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' } }); });
  }
  window.launchConfetti = launchConfetti;
});
