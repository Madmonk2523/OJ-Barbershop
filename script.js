/* =====================================================
   OJ'S BARBER SHOP — MAIN JAVASCRIPT
   ===================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------
     NAVBAR: Scroll behaviour
  ----------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* -----------------------------------------------
     MOBILE HAMBURGER MENU
  ----------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  function toggleMenu(open) {
    const isOpen = (open !== undefined) ? open : !hamburger.classList.contains('active');
    hamburger.classList.toggle('active', isOpen);
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', function () {
    toggleMenu();
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(false);
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  /* -----------------------------------------------
     HERO BACKGROUND: subtle zoom-in on load
  ----------------------------------------------- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('load', function () {
      heroBg.classList.add('loaded');
    });
    // Fallback if load already fired
    if (document.readyState === 'complete') {
      heroBg.classList.add('loaded');
    }
  }

  /* -----------------------------------------------
     SCROLL REVEAL ANIMATIONS
  ----------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger cards if they are siblings in the same grid
          const el = entry.target;
          const parent = el.parentElement;
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
            const index = siblings.indexOf(el);
            if (index > 0) {
              el.style.transitionDelay = (index * 80) + 'ms';
            }
          }
          el.classList.add('visible');
          revealObserver.unobserve(el);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* -----------------------------------------------
     HIGHLIGHT TODAY'S HOURS ROW
  ----------------------------------------------- */
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayIndex = new Date().getDay();
  const todayName = dayNames[todayIndex];

  const todayRow = document.querySelector('.hours-row[data-day="' + todayName + '"]');
  if (todayRow) {
    todayRow.classList.add('today');
  }

  /* -----------------------------------------------
     SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
  ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* -----------------------------------------------
     PARALLAX: Subtle hero background scroll
  ----------------------------------------------- */
  const hero = document.querySelector('.hero');
  const heroBgEl = document.querySelector('.hero-bg');

  if (hero && heroBgEl) {
    let ticking = false;

    function updateParallax() {
      const scrolled = window.scrollY;
      const heroHeight = hero.offsetHeight;
      if (scrolled <= heroHeight) {
        const offset = scrolled * 0.35;
        heroBgEl.style.transform = 'scale(1) translateY(' + offset + 'px)';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* -----------------------------------------------
     PRICING ROW: subtle entry animation on focus
  ----------------------------------------------- */
  document.querySelectorAll('.pricing-row').forEach(function(row) {
    row.addEventListener('mouseenter', function() {
      const price = row.querySelector('.pricing-price');
      if (price) {
        price.style.letterSpacing = '0.1em';
      }
    });
    row.addEventListener('mouseleave', function() {
      const price = row.querySelector('.pricing-price');
      if (price) {
        price.style.letterSpacing = '0.06em';
      }
    });
  });

})();
