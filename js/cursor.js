(function() {
  const hearts = [];
  let mouseX = 0, mouseY = 0;

  const style = document.createElement('style');
  style.textContent = `
    .cursor-heart {
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      font-size: 14px;
      color: #c0392b;
      line-height: 1;
      user-select: none;
      transition: none;
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (Math.random() > 0.45) {
      const el = document.createElement('div');
      el.classList.add('cursor-heart');
      el.textContent = '♥';
      el.style.left = (mouseX - 7) + 'px';
      el.style.top  = (mouseY - 7) + 'px';
      document.body.appendChild(el);

      hearts.push({
        el,
        x: mouseX,
        y: mouseY,
        vy: -(Math.random() * 1.8 + 0.8),
        vx: (Math.random() - 0.5) * 1.2,
        opacity: 1,
        scale: Math.random() * 0.6 + 0.7
      });
    }
  });

  function animate() {
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.x += h.vx;
      h.y += h.vy;
      h.opacity -= 0.025;

      if (h.opacity <= 0) {
        h.el.remove();
        hearts.splice(i, 1);
        continue;
      }

      h.el.style.left    = (h.x - 7) + 'px';
      h.el.style.top     = (h.y - 7) + 'px';
      h.el.style.opacity = h.opacity;
      h.el.style.transform = `scale(${h.scale})`;
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
