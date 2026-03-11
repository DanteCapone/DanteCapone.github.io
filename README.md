# DanteCapone.github.io

Personal academic website for Dante Capone, Physical Oceanographer.

Live at: **https://DanteCapone.github.io**

---

## Structure

```
.
├── index.html          # Home page
├── about.html          # Bio, education, skills
├── research.html       # Research themes & field work
├── publications.html   # Papers, presentations, in-prep
├── projects.html       # Code projects & datasets
├── cv.html             # Full curriculum vitae
├── contact.html        # Contact info & form
└── assets/
    ├── css/
    │   └── style.css   # Shared stylesheet (single file)
    ├── js/
    │   └── main.js     # Mobile nav + active link + form
    ├── images/         # Profile photo, figures, etc.
    └── files/
        └── Capone_CV.pdf   # ← place your CV PDF here
```

---

## Quickstart

No build step required. Open any `.html` file directly in a browser, or serve locally:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

---

## Customisation Checklist

- [ ] Replace all `[bracketed placeholders]` with real content
- [ ] Add a profile photo to `assets/images/` and update `about.html` / `index.html`
  - Change `<div class="hero-photo-placeholder">DC</div>` to
    `<img src="assets/images/profile.jpg" alt="Dante Capone" class="hero-photo" />`
- [ ] Drop `Capone_CV.pdf` into `assets/files/` (CV download button on `cv.html`)
- [ ] Update footer links: GitHub, Google Scholar, ORCID, email in every page
- [ ] Update `contact.html` form `action` with your [Formspree](https://formspree.io) endpoint
- [ ] Update `<meta name="description">` tags in each page for SEO

---

## GitHub Pages Deployment

1. Push to the `main` (or `master`) branch of `DanteCapone/DanteCapone.github.io`
2. Go to **Settings → Pages → Source** and select `main` / `root`
3. Site will publish at `https://DanteCapone.github.io` within a few minutes

No Jekyll config needed — GitHub Pages serves static HTML directly.

---

## Design Tokens (CSS variables in `style.css`)

| Variable | Default | Purpose |
|---|---|---|
| `--color-accent` | `#1a5276` | Deep ocean blue – nav, headings, borders |
| `--color-accent-lt` | `#d6e8f5` | Light accent for tags, photo border |
| `--color-bg` | `#fafafa` | Page background |
| `--color-surface` | `#ffffff` | Cards, nav, footer |
| `--max-w` | `860px` | Content column width |

Change `--color-accent` to restyle the whole site instantly.

---

## License

Content © Dante Capone. Code structure is public domain – feel free to adapt.
