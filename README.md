# jesusarrioja.dev Portfolio

Modern portfolio and CV website built with Astro, React, Convex, and Turborepo.

## Project Structure

```
jesusarrioja.dev/
├── apps/
│   └── web/                 # Astro + React frontend
│       ├── src/
│       │   ├── pages/      # Astro pages (file-based routing)
│       │   ├── components/ # React components
│       │   ├── lib/        # Utilities (Convex client, utils)
│       │   └── styles/     # Global styles (Tailwind + shadcn/ui)
│       └── public/         # Static assets
│
├── packages/
│   ├── convex/             # Convex backend
│   │   ├── schema.ts       # Database schema (10 tables)
│   │   ├── projects.ts     # Project queries
│   │   ├── profile.ts      # Profile/skills queries
│   │   └── cv.ts           # CV data queries
│   │
│   └── ui/                 # Shared UI components (future)
│
├── scripts/
│   └── migrate-data.ts     # Data migration from old HTML
│
└── legacy/                 # Old portfolio files (for reference)
```

## Tech Stack

- **Frontend**: Astro 5 + React 19 + TypeScript
- **UI**: shadcn/ui + Tailwind CSS v4
- **Backend**: Convex (serverless database + functions)
- **Monorepo**: Turborepo + pnpm workspaces
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages (frontend) + Convex Cloud (backend)

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Initialize Convex

```bash
cd packages/convex
pnpm convex dev
```

This will prompt you to login and create a Convex project. It generates:
- `.env.local` with your deployment URL
- `_generated/` TypeScript types

### 3. Run Development Server

```bash
# From root directory
pnpm dev
```

This starts both:
- Astro dev server (port 4321)
- Convex dev server (watching for changes)

## Database Schema

Convex database has 10 tables:

### Portfolio Tables:
- `profile` - Main profile information
- `socialLinks` - Social media links
- `skills` - Technology badges/skills
- `projects` - Portfolio projects (33 items)

### CV Tables:
- `cvProfile` - CV-specific profile
- `experiences` - Work experience (4 positions)
- `cvSkills` - Categorized skills for CV
- `certifications` - Professional certifications (5)
- `education` - Education records
- `languages` - Language proficiencies (2)

## Multi-language Support

All content is stored with both Spanish and English:

```typescript
{
  en: "English text",
  es: "Texto en español"
}
```

Queries accept a `locale` parameter to return localized content.

## Project Roadmap

- [x] Set up Turborepo monorepo
- [x] Create Astro app with React integration
- [x] Configure Convex backend
- [x] Define database schema (10 tables)
- [x] Set up shadcn/ui + Tailwind CSS
- [ ] Create data migration script
- [ ] Migrate content from old HTML files
- [ ] Implement Portfolio page components
- [ ] Implement CV page with print optimization
- [ ] Set up i18n routing
- [ ] Deploy to Cloudflare Pages

## Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean build artifacts

## Development

See individual package READMEs for more details:
- [apps/web](apps/web/README.md) - Astro frontend
- [packages/convex](packages/convex/README.md) - Convex backend

## Legacy Files

The old portfolio files are in `/legacy/` for reference during migration.
