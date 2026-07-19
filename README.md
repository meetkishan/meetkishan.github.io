# kishank.in — Personal Site

Personal website of [Kishan Kachchhi](https://www.kishank.in) — blog, travel gallery and portfolio. Markdown-powered, fully static, no database.

## Stack

- [Nuxt 4](https://nuxt.com) + [Nuxt Content v3](https://content.nuxt.com) — pages and markdown content collections
- Tailwind CSS v4 — styling, light/dark theme
- GitHub Actions → GitHub Pages — static deploy on every push to `main`
- [Nuxt Studio](https://content.nuxt.com/studio) compatible — edit content in the browser

## Structure

```
site/                  Nuxt app
  content/blog/        Blog posts (one .md per post)
  content/gallery/     Travel albums (one .md per trip, photos in frontmatter)
  app/data/profile.ts  Portfolio data (experience, projects, skills)
  app/pages/admin.vue  Built-in browser editor (GitHub API + PAT)
public/                Legacy SEO landing pages served alongside the app
```

## Writing a post

Add `site/content/blog/YYYY-MM-DD-slug.md`:

```markdown
---
title: "Post title"
description: "One-line summary"
date: "2026-07-20"
tags: ["life"]
draft: false
---

Body in markdown. `::youtube{id="..."}` and `::gallery{:images='[...]'}` work too.
```

Push to `main` — the site rebuilds and deploys automatically.

## Local development

```bash
cd site
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build in site/.output/public
```

Feel free to fork this repo as a starting point for your own markdown blog.
