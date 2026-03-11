/* main.js – Minimal site JS */

(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    /* Close menu when a link is clicked */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Mark active nav link based on current page ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Contact form – simple client-side validation placeholder ---- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name  = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const msg   = form.querySelector('#message').value.trim();

      if (!name || !email || !msg) {
        alert('Please fill in all fields.');
        return;
      }

      /* Replace this block with a real form backend (e.g. Formspree) */
      const notice = document.querySelector('.form-notice');
      if (notice) {
        notice.textContent = 'Thanks for your message! I\'ll be in touch soon.';
        notice.style.display = 'block';
      }
      form.reset();
    });
  }

})();
