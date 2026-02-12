# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual portfolio and CV website built as a Turborepo monorepo. The frontend is built with Astro 5 + React 19, styled with shadcn/ui + Tailwind CSS v4, and uses Convex as a serverless backend. The site is deployed to Cloudflare Pages with Convex Cloud handling the backend.

## Development Commands

### Root-level Commands (run from project root)
- `pnpm dev` - Start both Astro dev server (port 4321) and Convex backend
- `pnpm build` - Build all packages in the monorepo
- `pnpm lint` - Run linting across all packages
- `pnpm format` - Format code with Prettier
- `pnpm clean` - Clean build artifacts and node_modules

### Data Management Scripts
- `pnpm migrate` - Run data migration from legacy HTML files (scripts/migrate-data.ts)
- `pnpm clear-db` - Clear all data from Convex database (scripts/clear-database.ts)

### App-specific Commands
```bash
# From apps/web/
pnpm dev      # Start Astro dev server only
pnpm build    # Build static site
pnpm preview  # Preview production build

# From packages/convex/
pnpm dev      # Start Convex dev server (watches for changes, generates types)
pnpm deploy   # Deploy to Convex production
pnpm codegen  # Generate TypeScript types without starting dev server
```

## Monorepo Structure

This is a Turborepo + pnpm workspaces monorepo:
- **apps/web/** - Astro + React frontend application
- **packages/convex/** - Convex backend (actual Convex functions in packages/convex/convex/)
- **scripts/** - Data migration and database management utilities
- **legacy/** - Reference files from old portfolio (do not modify)

### Key Configuration Files
- `pnpm-workspace.yaml` - Workspace configuration (apps/*, packages/*)
- `turbo.json` - Turborepo pipeline configuration
- `apps/web/astro.config.mjs` - Astro configuration (static output, React integration)
- `apps/web/wrangler.toml` - Cloudflare Pages deployment config
- `packages/convex/convex/schema.ts` - Database schema (10 tables)

## Architecture Patterns

### Internationalization (i18n)

All user-facing text is stored as bilingual objects in the database:
```typescript
{
  en: "English text",
  es: "Texto en español"
}
```

**Pattern for Convex queries:**
- All queries accept a `locale` parameter (string: "en" or "es")
- Queries return localized content by selecting the appropriate language key
- Example: `profile.title[args.locale as "en" | "es"]`

**Frontend routing:**
- Spanish (default): `/` and root pages (e.g., `/cv.astro`)
- English: `/en/` subdirectory (e.g., `/en/cv.astro`)

### Convex Backend Architecture

The backend lives in `packages/convex/convex/` (note the nested directory structure):

**Database tables (10 total):**

Portfolio tables (4):
- `profile` - Hero section profile data (single document)
- `socialLinks` - Social media links with icons (4 documents)
- `skills` - Technology badges with categories (16 documents)
- `projects` - Portfolio items with gradients and features (33 documents)

CV tables (6):
- `cvProfile` - CV-specific profile data (single document)
- `experiences` - Work history with nested projects (4 positions)
- `cvSkills` - Categorized skill lists for CV (6 categories)
- `certifications` - Professional certifications (5 documents)
- `education` - Education records (1 document)
- `languages` - Language proficiency (2 documents)

**Query files:**
- `profile.ts` - Profile, skills, and social links queries
- `projects.ts` - Portfolio projects queries
- `cv.ts` - CV-specific queries (experience, education, certifications, etc.)
- `mutations.ts` - Database mutations (create, update, delete operations)

### Frontend Architecture

**Astro integration:**
- Static site generation (`output: 'static'`)
- React integration for interactive components
- File-based routing in `src/pages/`
- ConvexProvider wraps all React components to enable Convex hooks

**Key components structure:**
- `components/shared/` - Reusable components (ThemeProvider, ConvexProvider, LanguageSwitcher)
- `components/portfolio/` - Portfolio-specific components (Hero, Projects, etc.)
- `components/cv/` - CV-specific components (CVExperience, etc.)
- `components/ui/` - shadcn/ui components

**Convex client setup:**
- Client initialized in `src/lib/convex.ts`
- Requires `PUBLIC_CONVEX_URL` environment variable (must be prefixed with PUBLIC_ for Astro)
- ConvexProvider in `components/shared/ConvexProvider.tsx` wraps app with ConvexReactClient and ThemeProvider

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **shadcn/ui** component library
- **Framer Motion** for animations
- **next-themes** for dark mode support
- Utility function `cn()` in `src/lib/utils.ts` combines clsx + tailwind-merge

## Environment Setup

**First-time setup:**
1. Install dependencies: `pnpm install`
2. Initialize Convex:
   ```bash
   cd packages/convex
   pnpm convex dev
   ```
   This creates `.env.local` with your Convex deployment URL and generates TypeScript types in `_generated/`

3. Copy Convex URL to web app:
   ```bash
   cd apps/web
   cp .env.example .env
   # Edit .env and set PUBLIC_CONVEX_URL from packages/convex/.env.local
   ```

4. Start dev servers: `pnpm dev` (from root)

**Important:** The Convex URL must be prefixed with `PUBLIC_` in the web app's `.env` file to be accessible in the browser.

## Data Migration

The project includes scripts to migrate data from legacy HTML files:
- `scripts/extract-cv-data.ts` - Extracts CV data from old HTML
- `scripts/extract-projects.ts` - Extracts project data
- `scripts/migrate-data.ts` - Main migration script that populates Convex database

Run migrations with: `pnpm migrate`

## Deployment

**Frontend (Cloudflare Pages):**
- Configuration in `apps/web/wrangler.toml`
- Build command: `pnpm build`
- Output directory: `apps/web/dist`

**Backend (Convex):**
- Deploy from `packages/convex/`: `pnpm deploy`
- Convex handles environments automatically (dev vs production deployments)
