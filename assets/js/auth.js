/* auth.js – Client-side access control for protected research pages
 *
 * HOW TO CHANGE YOUR PASSWORD:
 *   1. Open any page on your site in Chrome/Firefox
 *   2. Open the browser console (F12 → Console)
 *   3. Type:  btoa('YourNewPassword')  and press Enter
 *   4. Copy the output string
 *   5. Replace the PASS_B64 value below with the copied string
 *
 * Current default password: Tahoe2026
 */

(function () {
  'use strict';

  var PASS_B64    = 'VGFob2UyMDI2';      /* btoa('Tahoe2026') — change me */
  var SESSION_KEY = 'dc_research_auth';
  var LOGIN_PATH  = '/current-research/login.html';

  /* ---- Core helpers ---- */

  function isAuthenticated() {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  }

  /* ---- Public API ---- */

  /* Call at top of every protected page */
  window.requireAuth = function () {
    if (!isAuthenticated()) {
      var returnTo = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.replace(LOGIN_PATH + '?return=' + returnTo);
    }
  };

  /* Called by the login form submit handler */
  window.attemptLogin = function (password, returnPath) {
    try {
      if (btoa(unescape(encodeURIComponent(password))) === PASS_B64) {
        sessionStorage.setItem(SESSION_KEY, '1');
        window.location.href = decodeURIComponent(returnPath || '/research-plan/');
        return true;
      }
    } catch (e) { /* ignore encoding errors */ }
    return false;
  };

  window.isResearchAuth  = isAuthenticated;

  window.logoutResearch = function () {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = '/';
  };

  /* ---- Intercept protected nav links ---- */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.protected-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (!isAuthenticated()) {
          e.preventDefault();
          var returnTo = encodeURIComponent(link.getAttribute('href') || '/research-plan/');
          window.location.href = LOGIN_PATH + '?return=' + returnTo;
        }
      });
    });

    /* Show auth status badge if logged in */
    var badge = document.getElementById('auth-status');
    if (badge) {
      if (isAuthenticated()) {
        badge.innerHTML = '<span class="auth-badge auth-on">● Signed in</span>';
      } else {
        badge.innerHTML = '<span class="auth-badge auth-off">○ Sign in</span>';
        badge.querySelector('span').addEventListener('click', function () {
          window.location.href = LOGIN_PATH;
        });
      }
    }
  });

})();
