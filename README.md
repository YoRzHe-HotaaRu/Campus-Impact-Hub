# Campus Impact Hub MY

A bilingual Next.js platform for Malaysian university students to discover scholarships, research roles, volunteering programs, competitions and internships in one place.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4 + shadcn/ui primitives
- `next-intl` locale routing for English and Bahasa Melayu
- Clerk-ready authentication with a local demo-mode fallback
- Neon Postgres + Drizzle schema and migration setup
- Vitest for unit tests and Playwright for end-to-end tests

## Core Routes

- `/en` and `/ms` home pages
- `/[locale]/opportunities`
- `/[locale]/opportunities/[slug]`
- `/[locale]/saved`
- `/[locale]/about`
- `/[locale]/admin/opportunities`
- `/sign-in` and `/sign-up`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template and add keys when available:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

If Clerk or Neon are not configured yet, the app still works in local demo mode through `/sign-in`.

## Database

The Drizzle schema lives in `src/lib/db/schema.ts`.

Generate migrations:

```bash
npm run db:generate
```

Apply migrations after adding a real `DATABASE_URL`:

```bash
npm run db:migrate
```

## Tests

Run unit tests:

```bash
npm test
```

Run coverage:

```bash
npm run test:coverage
```

Run end-to-end tests:

```bash
npm run test:e2e
```

## Notes

- The UI uses `next/font/google` with `Manrope` and `Space Grotesk`.
- Production auth activates automatically when Clerk keys are present.
- Without a database, saved/admin behavior uses a local in-memory demo store for development and testing.
