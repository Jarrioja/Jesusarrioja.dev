# jesusarrioja.com

Bilingual portfolio and CV of Jesús Arrioja, built with Astro, React and Tailwind CSS. Fully static, deployed to Cloudflare Pages.

## Stack

- **Site**: Astro 6 + React 19 islands + TypeScript
- **UI**: Tailwind CSS v4, Lucide and Simple Icons
- **Content**: JSON files in `apps/web/src/data/`
- **Monorepo**: Turborepo + pnpm workspaces
- **Deploy**: Cloudflare Pages (push to `main` deploys)

## Development

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # static build in apps/web/dist
```

## Content

Every text field is bilingual:

```json
{ "en": "English text", "es": "Texto en español" }
```

Spanish is served at `/` and English at `/en/`. The CV lives at `/cv` and `/en/cv` and is optimized for printing to PDF.

## GitHub activity

The "Agentic engineering" section renders `apps/web/src/data/activity.json`: the contribution calendar plus merged PRs over the last year. A daily GitHub Action (`.github/workflows/activity.yml`) refreshes it with the `ACTIVITY_TOKEN` secret and commits the result, which redeploys the site.

To refresh it locally:

```bash
cd apps/web
GITHUB_TOKEN=$(gh auth token) pnpm activity
```

## Legacy files

The previous portfolio is kept in `legacy/` for reference.
