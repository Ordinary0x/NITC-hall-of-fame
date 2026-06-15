# NITC Hall of Fame

A fully static Next.js 14 showcase for student projects from NIT Calicut, written in TypeScript and styled with a dark academic maroon theme. Students submit projects by adding an entry to `projects.json`. A build-time script fetches live GitHub metadata, README content, images, and author details, then bakes everything into a static site that deploys to GitHub Pages.

## What this repo does

- Renders a dark showcase with search, language filter, topic chips, sorting, stats counters, and per-project detail pages with a gallery lightbox and rendered README.
- Stays fully static — the site never calls the GitHub API in the browser.
- Refreshes metadata during build via `scripts/fetch-data.mjs` and on a daily schedule via GitHub Actions.
- Supports multiple authors per project and local asset overrides in `public/projects/<slug>/`.
- Generates placeholder thumbnails when no image is available.
- Custom maroon accent palette with Cormorant Garamond, IBM Plex Sans, and IBM Plex Mono fonts.

## Local development

1. Install dependencies with `npm install`.
2. Optionally set `GITHUB_TOKEN` in your shell to run the data fetcher locally.
3. Run `npm run fetch:data` to refresh `public/data/projects-data.json`.
4. Run `npm run dev` to start the app.

The sample file at `public/data/projects-data.json` is enough for previewing the site without hitting the GitHub API.

## Submission format

Add one entry per project in `projects.json`:

```json
[
  {
    "title": "Project title",
    "project": "https://github.com/your-name/your-repo",
    "authors": ["https://github.com/your-name"],
    "description": "A short description of what the project does.",
    "website": "https://myproject.example.com"
  }
]
```

The build script resolves (in order of precedence):

- **Local assets**: `public/projects/<slug>/readme.md`, `thumbnail.*`, and other images override GitHub-sourced content.
- **GitHub `hof/` directory**: README (`readme.md`), `thumbnail.*`, and other images from the repository's `hof/` folder.
- **Repository root**: README fallback, and legacy `images/` folder.
- **Author metadata**: display name, avatar, bio, and profile URL from the GitHub API.
- **Repository metadata**: stars, forks, language, topics, license, and last update time.

## Project detail page

Each project gets a dedicated page that includes:
- Repository stats (stars, forks, language, license)
- A gallery with lightbox for browsing screenshots
- Full rendered README.md (GitHub Flavored Markdown with syntax highlighting)
- Author cards with bios and GitHub profile links
- Direct links to the repository and optional website

## Repository layout

- `projects.json` — source list maintained by pull request.
- `scripts/fetch-data.mjs` — build-time metadata fetcher.
- `public/data/projects-data.json` — resolved data consumed by the app.
- `public/projects/<slug>/` — optional local assets (readme.md, thumbnail.*, screenshots).
- `app/` — Next.js 14 App Router pages (home, detail, submit guide).
- `components/` — interactive browser, cards, gallery, filter bar, and author UI.
- `lib/` — TypeScript utility types and helpers.
- `.github/workflows/build.yml` — CI that builds the site and deploys to GitHub Pages.

## Notes

- `output: "export"` keeps the site fully static for GitHub Pages or any static host.
- The build gracefully handles missing assets — it falls back to placeholder SVG thumbnails and skips missing READMEs instead of failing.
- A daily cron schedule (`0 2 * * *`) rebuilds the site to keep GitHub metadata fresh.
