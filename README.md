# NITC Hall of Fame

A static Next.js 14 showcase for student projects from NIT Calicut. Students submit projects by adding a GitHub repository URL, author profile URL, and a short description to `projects.json`. A build-time script fetches live GitHub metadata, `hof/readme.md`, `hof/thumbnail.*`, other `hof/` images, and profile details, then bakes everything into a fully static site.

## What this repo does

- Renders a dark, academic showcase with search, filters, sorting, and project detail pages.
- Keeps all runtime behavior static. The site never calls the GitHub API in the browser.
- Refreshes metadata during the build using `scripts/fetch-data.mjs`.
- Deploys to GitHub Pages through `.github/workflows/build.yml`.

## Local development

1. Install dependencies with `npm install`.
2. Optionally set `GITHUB_TOKEN` in your shell if you want to run the data fetcher locally.
3. Run `npm run fetch:data` to refresh `public/data/projects-data.json`.
4. Run `npm run dev` to start the app.

If you only want to preview the site without hitting GitHub, the sample file at `public/data/projects-data.json` is enough for development.

## Submission format

Add one entry per project in `projects.json`:

```json
[
  {
    "project": "https://github.com/your-name/your-repo",
    "author": "https://github.com/your-name",
    "description": "A short description of the project."
  }
]
```

The build script resolves:

- Repository metadata: stars, forks, language, topics, license, and update time.
- README metadata: title, description, and the full Markdown body from `hof/readme.md` for the detail page.
- Submission metadata: the short description from `projects.json` is used as the project summary.
- Images: `thumbnail.*` plus other image files from the `hof/` folder.
- Author metadata: display name, avatar, bio, and profile URL.

## Repository layout

- `projects.json` - source list maintained by pull request.
- `scripts/fetch-data.mjs` - build-time metadata fetcher.
- `public/data/projects-data.json` - resolved data used by the app.
- `app/` - pages for the home view, detail view, and submission guide.
- `components/` - interactive browser, cards, gallery, and author UI.

## Notes

- `output: 'export'` keeps the site fully static for GitHub Pages or any static host.
- The build is designed to keep going if a repo is missing `hof/` assets or legacy root-level images. It falls back to safe placeholders instead of failing.
