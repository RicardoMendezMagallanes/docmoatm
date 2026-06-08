/* ============================================================
   DOCMO ATM y Ortodoncia — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- DOM refs ---- */
  const header    = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');

  /* ---- Header scroll ---- */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 70);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
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

  /* Close on outside click */
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ---- Active nav link ---- */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href').split('#')[0];
    link.classList.toggle('active', href === page);
  });

  /* ---- Scroll reveal (IntersectionObserver) ---- */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObs.observe(el);
  });

  /* ---- Counter animation ---- */
  function animateCount(el) {
    var target   = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1800;
    var start    = performance.now();

    function step(now) {
      var t   = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      var val  = Math.floor(ease * target);
      el.textContent = val.toLocaleString('es-AR');
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('es-AR');
    }
    requestAnimationFrame(step);
  }

  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.stat-number[data-count]').forEach(function (el) {
    countObs.observe(el);
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item   = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });

      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Contact form ---- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn       = form.querySelector('.form-submit');
      var original  = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
      btn.style.background    = '#10B981';
      btn.style.borderColor   = '#10B981';
      btn.disabled            = true;

      setTimeout(function () {
        form.reset();
        btn.innerHTML         = original;
        btn.style.background  = '';
        btn.style.borderColor = '';
        btn.disabled          = false;
      }, 3500);
    });
  }

  /* ---- Parallax hero bg (subtle) ---- */
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      heroBg.style.transform = 'scale(1.02) translateY(' + (window.scrollY * 0.25) + 'px)';
    }, { passive: true });
  }

})();
