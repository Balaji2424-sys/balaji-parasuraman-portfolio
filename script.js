/* ============================================================
   BALAJI PARASURAMAN — PORTFOLIO  |  script.js
   ============================================================ */

// ── THEME TOGGLE ──────────────────────────────────────────────
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Load saved preference; default dark
const savedTheme = localStorage.getItem('bp-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('bp-theme', next);
});

// ── NAVBAR SCROLL STYLE ───────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

// ── HAMBURGER MENU ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMobile.classList.toggle('open');
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMobile.classList.remove('open');
  });
});

// ── REVEAL ON SCROLL ──────────────────────────────────────────
// rootMargin is intentionally "0px" on all sides so elements
// already in the viewport are immediately marked visible.
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px 0px 0px' }
);

// Stagger cards/skill-groups inside a grid with a short delay
revealEls.forEach((el, idx) => {
  // find sibling .reveal elements in same parent
  const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
  const sibIdx   = siblings.indexOf(el);
  el.style.transitionDelay = (sibIdx * 0.07) + 's';
  revealObserver.observe(el);
});

// ── SKILL BAR ANIMATION ───────────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const pct = el.getAttribute('data-pct');
        setTimeout(() => { el.style.width = pct + '%'; }, 150);
        skillObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.1 }
);

skillFills.forEach(el => skillObserver.observe(el));

// ── ACTIVE NAV LINK ON SCROLL ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => activeObserver.observe(s));
