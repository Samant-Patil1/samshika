#!/usr/bin/env python3
"""Inject a GSAP scroll animation script block into designated HTML pages."""
import os, re

pages = {
    'letters.html':   ("  <script src=\"js/cursor.js\"></script>",
        """  <script>
  (function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.page-hero h1', { duration: 1.2, y: 50, opacity: 0, ease: 'power3.out', delay: 0.2 });
    gsap.from('.letter-card', {
      scrollTrigger: { trigger: '.letters-grid, section', start: 'top 80%' },
      y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out'
    });
    document.querySelectorAll('.section-title').forEach(el => {
      gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' });
    });
  })();
  </script>"""),
    'guestbook.html': ("  <script src=\"js/cursor.js\"></script>",
        """  <script>
  (function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.page-hero h1', { duration: 1.2, y: 50, opacity: 0, ease: 'power3.out', delay: 0.2 });
    gsap.from('.guestbook-form, .guestbook-entry', {
      scrollTrigger: { trigger: '.guestbook-section, section', start: 'top 80%' },
      y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out'
    });
    document.querySelectorAll('.section-title').forEach(el => {
      gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' });
    });
  })();
  </script>"""),
    'private.html':   ("  <script src=\"js/cursor.js\"></script>",
        """  <script>
  (function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.lock-gate, .password-form', { duration: 1.2, scale: 0.9, opacity: 0, ease: 'back.out(1.5)', delay: 0.3 });
    gsap.from('.private-card', {
      scrollTrigger: { trigger: '.private-hero', start: 'top 70%' },
      y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out'
    });
    document.querySelectorAll('.section-title').forEach(el => {
      gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' });
    });
  })();
  </script>"""),
}

base = '/Users/yallappah/sam/master_plan'
for filename, (anchor, snippet) in pages.items():
    path = os.path.join(base, filename)
    if not os.path.exists(path):
        print(f"SKIP (not found): {filename}")
        continue
    with open(path) as f:
        content = f.read()
    if snippet.strip()[:30] in content:
        print(f"SKIP (already done): {filename}")
        continue
    if anchor not in content:
        print(f"WARN anchor not found: {filename}")
        continue
    content = content.replace(anchor, anchor + '\n' + snippet, 1)
    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated: {filename}")
