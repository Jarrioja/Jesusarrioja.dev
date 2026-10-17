# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (es/en) portfolio and CV for jesusarrioja.com. A fully static Astro 6 site with React 19 islands and Tailwind CSS v4, in a Turborepo + pnpm monorepo. Deployed to Cloudflare Pages. There is no backend: all content lives in JSON files.

## Commands

From the repo root:
- `pnpm dev` / `pnpm build` / `pnpm lint` / `pnpm format`

From `apps/web/`:
- `pnpm dev` — Astro dev server (port 4321)
- `pnpm build` — static build to `dist/`
- `pnpm preview` — serve the build
- `pnpm exec astro check` — type check
- `GITHUB_TOKEN=... pnpm activity` — refresh the GitHub activity snapshot

## Structure

- `apps/web/src/data/*.json` — all content: `profile`, `skills`, `socialLinks`, `projects`, `cv`, `agentic`, and `activity` (generated)
- `apps/web/src/pages/` — `index.astro` and `cv.astro` (Spanish, default), `en/` (English); `1/` and `2/` are alternative portfolio layouts
- `apps/web/src/components/portfolio/` — main portfolio sections (`Hero`, `AgenticSection`, `FeaturedProjects`, `ProjectWall`, ...)
- `apps/web/src/components/cv/` — CV page, print-optimized
- `apps/web/scripts/fetch-activity.ts` — writes `activity.json` from the GitHub GraphQL API
- `scripts/` and `legacy/` — one-off migration helpers and the old site; do not modify `legacy/`

## Conventions

### Bilingual content

Every user-facing string in the JSON files is `{ "en": "...", "es": "..." }`. Components receive `locale: "en" | "es"` and pick the key. Spanish lives at `/`, English at `/en/`.

### Projects

`projects.json` drives both project sections:
- `isFeatured: true` shows in "Proyectos destacados". Projects that also have a `role` render as large product cards; the rest render as compact site cards.
- Non-featured projects show in the "Otros proyectos" wall, filtered by `type` (`product`, `ecommerce`, `community`, `website`, `infra`), with `stack` tags.
- `agency` is only set for work done through mood • digital agency.
- `stores` (App Store / Google Play) replaces the "Ver sitio" link.

### Styling

Tailwind v4 via `@tailwindcss/vite`. Theme tokens are HSL variables in `src/styles/globals.css`, exposed as utilities (`bg-background`, `text-muted-foreground`, ...) through `@theme inline`. Dark mode follows the `.dark` class set by next-themes.

## Activity snapshot

`.github/workflows/activity.yml` runs daily, regenerates `activity.json` with the `ACTIVITY_TOKEN` secret (a classic token with `repo` and `read:user`, so private contributions and PRs count), and commits to `main`. That commit triggers the Cloudflare Pages deploy.

## Deployment

Cloudflare Pages Git integration: a push to `main` deploys production, other branches get preview URLs. Build command `pnpm install && pnpm build --filter=web`, output `apps/web/dist`. No environment variables are needed.
