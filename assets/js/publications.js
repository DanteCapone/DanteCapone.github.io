/* publications.js
 * Fetches data/publications.json and renders a grouped, year-sorted
 * academic publication list into #pub-list-container.
 *
 * JSON schema per entry:
 *   year    {string}  – e.g. "2025", "2024", "in prep"
 *   authors {string}  – author string; bold "Capone, D." added via CSS
 *   title   {string}
 *   venue   {string}  – journal / conference
 *   status  {string}  – "published" | "in press" | "under review" | "in prep"
 *   doi     {string|null}
 *   pdf     {string|null}
 *   note    {string|null} – optional internal note, not rendered on page
 */

(function () {
  'use strict';

  const container = document.getElementById('pub-list-container');
  if (!container) return;

  /* ---- Helpers ---- */

  /* Sort order: numeric years descending, then in-prep/under review at top */
  function yearSortKey(year) {
    const n = parseInt(year, 10);
    return isNaN(n) ? 9999 : -n; /* in-prep sorts first (highest key) */
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Bold the name "Capone, D." wherever it appears in the author string */
  function formatAuthors(authors) {
    return escapeHtml(authors).replace(
      /Capone,\s*D\./g,
      '<strong>Capone, D.</strong>'
    );
  }

  function statusBadge(status) {
    if (!status || status === 'published') return '';
    const labels = {
      'in press':     'In Press',
      'under review': 'Under Review',
      'in prep':      'In Prep'
    };
    const label = labels[status.toLowerCase()] || escapeHtml(status);
    return `<span class="pub-status">${label}</span>`;
  }

  function renderLinks(entry) {
    const links = [];
    if (entry.doi) {
      links.push(`<a href="${escapeHtml(entry.doi)}" class="btn btn-outline text-sm" target="_blank" rel="noopener">DOI</a>`);
    }
    if (entry.pdf) {
      links.push(`<a href="${escapeHtml(entry.pdf)}" class="btn btn-outline text-sm" target="_blank" rel="noopener">PDF</a>`);
    }
    return links.length ? `<div class="pub-links">${links.join('')}</div>` : '';
  }

  function renderEntry(entry) {
    return `
      <div class="pub-entry${entry.status && entry.status !== 'published' ? ' in-prep' : ''}">
        <p class="pub-authors">${formatAuthors(entry.authors)}</p>
        <p class="pub-title">${escapeHtml(entry.title)}${statusBadge(entry.status)}</p>
        <p class="pub-venue">${escapeHtml(entry.venue)}</p>
        ${renderLinks(entry)}
      </div>`;
  }

  function renderGroup(year, entries) {
    const label = isNaN(parseInt(year, 10)) ? year.charAt(0).toUpperCase() + year.slice(1) : year;
    return `
      <div class="pub-year-group">
        <p class="pub-year-label">${escapeHtml(label)}</p>
        ${entries.map(renderEntry).join('')}
      </div>`;
  }

  /* ---- Fetch and render ---- */
  fetch('data/publications.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Could not load publications.json');
      return res.json();
    })
    .then(function (data) {
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<p class="text-muted text-sm">No publications listed yet.</p>';
        return;
      }

      /* Group by year */
      const groups = {};
      data.forEach(function (entry) {
        const y = entry.year || 'in prep';
        if (!groups[y]) groups[y] = [];
        groups[y].push(entry);
      });

      /* Sort years */
      const sortedYears = Object.keys(groups).sort(function (a, b) {
        return yearSortKey(a) - yearSortKey(b);
      });

      container.innerHTML = sortedYears
        .map(function (y) { return renderGroup(y, groups[y]); })
        .join('');
    })
    .catch(function (err) {
      container.innerHTML =
        '<p class="text-muted text-sm">Publications could not be loaded. ' +
        'Ensure <code>data/publications.json</code> is present and the site is served over HTTP.</p>';
      console.error('publications.js:', err);
    });

})();
