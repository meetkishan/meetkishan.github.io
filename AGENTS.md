# Agent instructions

This repo deploys https://www.kishank.in via GitHub Pages: every push to `main` runs
`.github/workflows/deploy.yml`, which builds `site/` with `nuxt generate` and overlays
the legacy files in `public/` (SEO landing pages, `style.css` they depend on, Google
verification file — do not delete these).

- The Nuxt app lives in `site/`. Content is markdown in `site/content/blog` and
  `site/content/gallery`, with schemas in `site/content.config.ts`.
- Portfolio data (experience, projects, skills) lives in `site/app/data/profile.ts`.
- Theming uses CSS variables in `site/app/assets/css/main.css` (`data-theme` attribute,
  dark is default, persisted in localStorage key `theme`). Use the semantic Tailwind
  colors (`bg-base`, `bg-card`, `text-ink`, `text-muted`, `text-accent`, `border-line`)
  instead of hardcoded colors.
- `/admin` is a browser editor committing via the GitHub Contents API; it must stay
  `noindex` and dependency-light.
- The old GitLab-hosted site's history is preserved on the `backup-old-site` branch
  and on the GitLab remote; don't resurrect old files from it into `main`.
