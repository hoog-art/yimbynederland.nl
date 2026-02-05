/* ═══════════════════════════════════════════
   YIMBY Nederland — shared.js
   Language toggle + mobile nav
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Language toggle ──────────────────── */
  const savedLang = localStorage.getItem('yimby-lang') || 'nl';
  setLang(savedLang);

  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setLang(btn.dataset.lang);
    });
  });

  function setLang(lang) {
    // Toggle body class
    if (lang === 'nl') {
      document.body.classList.add('nl');
    } else {
      document.body.classList.remove('nl');
    }

    // Update button states
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      if (b.dataset.lang === lang) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Save preference
    localStorage.setItem('yimby-lang', lang);
  }

  /* ── Mobile hamburger ─────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navList   = document.querySelector('.nav-links');
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => navList.classList.toggle('open'));
    navList.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navList.classList.remove('open'))
    );
  }

  /* ── Mark active nav link ─────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
});
