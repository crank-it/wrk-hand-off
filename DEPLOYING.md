# Deployment Guide (wrk)

## What’s included
- App: Next.js 14 (App Router), Auth.js (NextAuth), Prisma ORM
- DB: Prisma schema for SQLite (dev) and Postgres (prod)
- API: Request → approval → project flow implemented
- Vercel link: `.vercel/project.json` targets project `wrk` (team `outer-edge`)

## Environment variables
Create and set these in Vercel Project Settings → Environment Variables (Production):

- DATABASE_URL: Postgres connection string (e.g., `postgres://user:pass@host/db?sslmode=require`)
- NEXTAUTH_SECRET: strong random string
- NEXTAUTH_URL: `https://wrk.ph` (production)
- Optional: STRIPE_SECRET_KEY, S3_BUCKET
- Optional: PRISMA_SCHEMA: `prisma/schema.postgres.prisma` (see DB section)

Also set the same in “Preview” if you want preview deploys to work.

## Database (dev vs prod)
- Local dev uses SQLite: `prisma/schema.prisma` → `file:./dev.db`
- Production should use Postgres. Two ways:
  1) Easiest: set `PRISMA_SCHEMA=prisma/schema.postgres.prisma` in Vercel env so Prisma uses the Postgres schema at build/runtime
  2) Alternatively, replace the datasource in `prisma/schema.prisma` with `provider = "postgresql"` and commit

Run migrations in production after setting envs:

```
# In Vercel (Build Command or a one-off SSH/CLI run)
npx prisma migrate deploy
```

Optional seed (for demo data):
```
# Only if desired in a staging or dev environment
npm run prisma:seed
```

## Local development
```
npm install
npm run dev
# App on http://localhost:3000 (or 3001/3002 if busy)
```

Use demo credentials from the seed:
- Email: demo@wrk.ph
- Password: demo123

Key pages:
- /dashboard/requests → submit request (uses `serviceId`, `budgetCents`)
- Approve request → creates project with credit balance
- /dashboard/projects → verify project

## Deploy to Vercel
Linked project: `.vercel/project.json` (projectId `prj_hqF...`, orgId team `outer-edge`).

Steps:
1. Set env vars (see above) in Vercel → wrk project (Production)
2. Ensure DATABASE_URL points to Postgres and PRISMA_SCHEMA is set to `prisma/schema.postgres.prisma` (or switch main schema to Postgres)
3. Trigger deploy (Git push to main or `vercel --prod`)
4. Run DB migrations (if not automated): `npx prisma migrate deploy`
5. Verify `https://wrk.ph` loads and `/dashboard/requests` works

## Notes
- Request approval is idempotent and sets `Project.creditBalance` from request budget (cents)
- API endpoints:
  - POST /api/requests (canonical)
  - POST /api/projects (supports `{ fromRequestId }`)
- Dashboard endpoints preserved for UI: `/api/dashboard/service-requests`, `/api/dashboard/projects`

If you prefer a single Prisma schema, switch `prisma/schema.prisma` to Postgres and remove `PRISMA_SCHEMA` usage.
