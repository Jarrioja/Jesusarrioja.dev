# Convex Backend

This package contains the Convex backend for jesusarrioja.dev.

## Setup

1. Initialize Convex (first time only):
   ```bash
   cd packages/convex
   pnpm convex dev
   ```
   This will prompt you to:
   - Login to Convex
   - Create a new project
   - Generate configuration files

2. The `convex dev` command will:
   - Create a `.env.local` file with your deployment URL
   - Generate TypeScript types in `_generated/`
   - Watch for changes and sync with Convex cloud

## Schema

The schema is defined in `schema.ts` with 10 tables:

### Core Portfolio Tables:
- `profile` - Main profile information
- `socialLinks` - Social media links
- `skills` - Technology skills/badges
- `projects` - Portfolio projects

### CV/Resume Tables:
- `cvProfile` - CV-specific profile
- `experiences` - Work experience
- `cvSkills` - Categorized skills for CV
- `certifications` - Professional certifications
- `education` - Education records
- `languages` - Language proficiencies

## Queries

- `projects.ts` - Portfolio project queries
- `profile.ts` - Profile, skills, and social links queries
- `cv.ts` - CV data queries

## i18n Strategy

All user-facing text is stored as objects with `en` and `es` keys:
```typescript
{
  en: "English text",
  es: "Texto en español"
}
```

Queries accept a `locale` parameter and return localized strings.
