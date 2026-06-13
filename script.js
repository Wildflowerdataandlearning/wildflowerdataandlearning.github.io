/* ==========================================================================
   WILDFLOWER DATA AND LEARNING — SCRIPT
   Handles: mobile navigation, sticky-nav active link state, program tabs,
   scroll-reveal animations, and the current year in the footer.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1. MOBILE NAVIGATION TOGGLE
     ------------------------------------------------------------------ */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after a navigation link is selected
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     2. PROGRAM TABS (K-12 Education / Community Science)
     ------------------------------------------------------------------ */
  var tabButtons = document.querySelectorAll('.tabs__btn');
  var tabPanels = document.querySelectorAll('.tabs__panel');

  function activateTab(targetBtn) {
    tabButtons.forEach(function (btn) {
      var isActive = btn === targetBtn;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    tabPanels.forEach(function (panel) {
      var shouldShow = panel.id === targetBtn.getAttribute('aria-controls');
      panel.hidden = !shouldShow;
    });
  }

  tabButtons.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
      activateTab(btn);
    });

    // Keyboard navigation between tabs (arrow keys), per WAI-ARIA tab pattern
    btn.addEventListener('keydown', function (event) {
      var newIndex = null;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        newIndex = (index + 1) % tabButtons.length;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      }

      if (newIndex !== null) {
        event.preventDefault();
        tabButtons[newIndex].focus();
        activateTab(tabButtons[newIndex]);
      }
    });
  });

  /* ------------------------------------------------------------------
     3. SCROLL-REVEAL ANIMATIONS
     ------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll(
    '.card, .theme-card, .product-card, .advisor-card, .process__step, .credibility__item'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately if IntersectionObserver is unavailable
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------
     4. STICKY HEADER SHADOW ON SCROLL
     ------------------------------------------------------------------ */
  var header = document.getElementById('site-header');

  function updateHeaderShadow() {
    if (window.scrollY > 4) {
      header.style.boxShadow = '0 4px 16px rgba(43, 58, 44, 0.18)';
    } else {
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  /* ------------------------------------------------------------------
     5. FOOTER COPYRIGHT YEAR
     ------------------------------------------------------------------ */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
