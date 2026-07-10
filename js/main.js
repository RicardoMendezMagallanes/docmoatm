/* ============================================================
   Clínica Dental — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Scroll progress bar ---- */
  var progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!progressBar) return;
    var scrollTop  = window.scrollY || document.documentElement.scrollTop;
    var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ---- Header scroll ---- */
  var header    = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');
  var nav       = document.getElementById('nav');

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 60);
    updateProgress();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.nav-link, .nav-wa').forEach(function (el) {
      el.addEventListener('click', function () {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Active nav link ---- */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href').split('#')[0];
    link.classList.toggle('active', href === page);
  });

  /* ---- Scroll reveal ---- */
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObs.observe(el);
    });

    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('in');
        }
      });
    }, 5000);
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Counter animation ---- */
  function animateCount(el) {
    var target   = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1800;
    var start    = performance.now();
    function step(now) {
      var t    = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(ease * target).toLocaleString('es-AR');
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('es-AR');
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number[data-count]').forEach(function (el) {
      countObs.observe(el);
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item   = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Smooth scroll anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
      }
    });
  });

  /* ---- Contact form (generic demo) ---- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn      = form.querySelector('.form-submit');
      var original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
      btn.disabled  = true;
      setTimeout(function () {
        form.reset();
        btn.innerHTML = original;
        btn.disabled  = false;
      }, 3500);
    });
  }

  /* ---- Hero parallax (bg only) ---- */
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = 'scale(1.02) translateY(' + (window.scrollY * 0.15) + 'px)';
      }
    }, { passive: true });
  }

})();
