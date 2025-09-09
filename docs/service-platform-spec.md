
# Service Platform — Product Requirements & Technical Specification (Next.js)

**Owner:** Ben Carter  
**Working Title:** Client Service & Brand Hub  
**Purpose:** Build a multi‑tenant, role‑based client portal to sell and deliver services (websites, office apps, SEO, design/video, social, EDM, content, funnels, website updates). Supports per‑project quotes, per‑minute billing, and monthly retainers; includes brand‑kit management and automated brand‑asset generation.

---

## 1) Goals & Non‑Goals

**Goals**
- Single portal where Clients request services, track progress, message staff, and pay.
- Managers orchestrate work, staff execute via templated workflows, time tracking, and file exchange.
- Flexible billing: **fixed project**, **per‑minute**, and **monthly retainer**.
- Built‑in **Brand Kit** (logos, colors, fonts, guidelines) + **auto‑generated assets** library (upsell).
- Secure, auditable, multi‑tenant foundation ready for scale.

**Non‑Goals (MVP)**
- No complex visual editor like full Canva (we implement brand kit + templated generation only).
- No custom AI model training; use deterministic templates and optional external image APIs if needed.
- No on‑prem deployments; target cloud (Vercel) with managed DB/storage.

---

## 2) User Roles & Permissions (RBAC)

- **Manager (Admin)**
  - Manage tenants, users, pricing, services, workflow templates.
  - Approve/decline service requests, create quotes, assign staff, override billing.
  - View all projects, invoices, payments, reports, audit logs.

- **Staff (Worker)**
  - View/accept assigned tasks; run workflow steps; track time (per‑minute).
  - Upload deliverables; message clients; request clarifications.
  - See only their assigned projects; no pricing overrides.

- **Client**
  - Create service requests; build quotes for fixed projects (guided form).
  - View project status, deliverables, messages, invoices; pay online.
  - Manage Brand Kit; preview/unlock auto‑generated assets.

> **Multi‑tenancy:** All data scoped by `tenantId`. Users may belong to one or more tenants with a role per tenant.

---

## 3) Core Feature Map (User Stories + Acceptance)

### 3.1 Authentication & Tenancy
- As a user, I can sign in with email/password + magic link; managers can invite staff/clients.
- As a user, I can switch between tenants if I belong to multiple.
- **Done when:** NextAuth (or Clerk) configured; role claims enforced server‑side; all queries filtered by `tenantId`.

### 3.2 Service Request → Review → Project
- Client submits a request: selects service or “custom”, answers scoped intake form.
- Manager reviews; accept → project created; decline → client notified with reason.
- **Done when:** Request has statuses (`submitted|needs_info|accepted|declined`) and transitions create a `Project` with default workflow & team assignment.

### 3.3 Workflow Templates & Tasking
- Manager defines **WorkflowTemplate** per service (e.g., SEO, EDM) with ordered **Steps**.
- Project instantiation creates **Tasks** from template; staff update status + notes + attachments.
- **Done when:** Template JSON → project tasks correctly; UI shows step progress; audit log records changes.

### 3.4 Quotes (Fixed Project)
- Client can **build a quote** via guided inputs; manager can edit/approve/send.
- Client approves/declines; approved quote converts to active project scope & invoice draft.
- **Done when:** Quote lifecycle (`draft|sent|accepted|declined|expired`) with PDF and line items; Stripe Payment Link if required.

### 3.5 Time Tracking (Per‑Minute)
- Staff start/stop timers on tasks or log manual time; system bills **to the minute**.
- Managers set per‑service or per‑client rates; invoices generate from approved time entries.
- **Done when:** Accurate timers (foreground or via server timestamps); rounding to 1‑minute granularity; invoice lines from `TimeEntry` with audit trail.

### 3.6 Retainers / Subscriptions (Monthly)
- Manager creates plans (scope, price, renew cadence); client subscribes.
- System issues recurring invoices; shows monthly report of work performed.
- **Done when:** Stripe Subscriptions + webhook handling; current period usage visible to client; dunning emails for failed payment.

### 3.7 Messaging & Notifications
- Project‑scoped threads; @mentions; file attachments; read receipts.
- Notifications: in‑app + email for assignments, approvals, new messages, invoices.
- **Done when:** Real‑time updates (Pusher/Supabase Realtime) and granular notification preferences.

### 3.8 Files & Deliverables
- Secure upload to S3‑compatible storage; virus scan (optional); versioning.
- Clients download deliverables; staff see revision history.
- **Done when:** Signed URLs; object metadata tied to project/task; access enforced by role.

### 3.9 Brand Kit
- Client uploads logos; defines colors (HEX), fonts, voice/guidelines (rich text), do’s/don’ts.
- Staff can reference brand kit inside any project.
- **Done when:** BrandKit entity is complete; quick “Copy color / font tokens” UX; preview of brand sheet (PDF export).

### 3.10 Auto‑Generated Brand Assets (Upsell)
- On brand kit creation/update, background worker produces: social profile, banners, EDM header, IG post/story, letterhead, etc., based on deterministic templates.
- Client can preview watermarked thumbnails; **Unlock** to pay and download high‑res.
- **Done when:** Template engine produces assets per brand tokens; Stripe one‑off purchase unlocks download entitlements; downloads logged.

### 3.11 Reporting
- Manager: revenue by model, utilization, on‑time delivery, top clients/services.
- Client: monthly activity summary; retainer usage; SEO/Social report uploads.
- **Done when:** Basic KPI dashboards with export (CSV).

---

## 4) Tech Stack & Architecture

- **Frontend:** Next.js 14 (App Router, RSC) + TypeScript + Tailwind + shadcn/ui.
- **Auth:** NextAuth.js (Email/Password + Magic Link) or Clerk. JWT with role/tenant claims.
- **API:** Next.js Route Handlers (`app/api/**`) exposing REST; server actions for safe mutations.
- **DB:** PostgreSQL via Prisma ORM (PlanetScale alternative okay). 
- **Storage:** AWS S3 (or R2/Backblaze) via signed URLs; UploadThing or direct multipart.
- **Payments:** Stripe (Invoices, Checkout, Subscriptions, Webhooks).
- **Real‑time:** Pusher or Supabase Realtime.
- **Jobs/Cron:** Vercel Cron + Upstash/QStash or Neon/PG cron for scheduled tasks (billing runs, asset generation).
- **Email:** Resend or Postmark for transactional templates.
- **Telemetry:** Sentry + simple audit logs table.
- **Infra:** Deploy on Vercel. Environment secrets via Vercel env. 

**High‑Level Diagram**  
Web (Next.js RSC) ↔ API Routes ↔ Prisma ↔ Postgres  
                              ↘ Stripe / Email / Pusher / S3  
                              ↘ Job Queue (Upstash/QStash) for background asset generation

---

## 5) Data Model (Prisma outline)

```prisma
model Tenant {
  id           String  @id @default(cuid())
  name         String
  createdAt    DateTime @default(now())
  users        UserTenant[]
  clients      Client[]
  services     Service[]
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?  // if using credentials
  createdAt DateTime @default(now())
  tenants   UserTenant[]
  messages  Message[]
  timeEntries TimeEntry[]
  auditLogs AuditLog[]
}

model UserTenant {
  id        String  @id @default(cuid())
  userId    String
  tenantId  String
  role      Role    // MANAGER | STAFF | CLIENT
  @@unique([userId, tenantId])
  user      User    @relation(fields: [userId], references: [id])
  tenant    Tenant  @relation(fields: [tenantId], references: [id])
}

enum Role { MANAGER STAFF CLIENT }

model Client {
  id        String   @id @default(cuid())
  tenantId  String
  name      String
  primaryContactEmail String
  brandKit  BrandKit?
  projects  Project[]
  quotes    Quote[]
  invoices  Invoice[]
  subscriptions Subscription[]
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
}

model Service {
  id        String   @id @default(cuid())
  tenantId  String
  name      String
  pricingModel PricingModel // PROJECT | PER_MINUTE | RETAINER
  defaultRateCents Int?
  workflowTemplateId String?
  workflowTemplate  WorkflowTemplate? @relation(fields:[workflowTemplateId], references:[id])
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
}

enum PricingModel { PROJECT PER_MINUTE RETAINER }

model ServiceRequest {
  id        String   @id @default(cuid())
  tenantId  String
  clientId  String
  serviceId String?
  title     String
  intake    Json
  status    RequestStatus // SUBMITTED | NEEDS_INFO | ACCEPTED | DECLINED
  createdAt DateTime @default(now())
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  client    Client   @relation(fields: [clientId], references: [id])
  service   Service? @relation(fields: [serviceId], references: [id])
}

enum RequestStatus { SUBMITTED NEEDS_INFO ACCEPTED DECLINED }

model Project {
  id        String   @id @default(cuid())
  tenantId  String
  clientId  String
  serviceId String?
  name      String
  status    ProjectStatus // ACTIVE | ON_HOLD | COMPLETE | CANCELLED
  createdAt DateTime @default(now())
  tasks     Task[]
  timeEntries TimeEntry[]
  deliverables FileObject[]
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  client    Client   @relation(fields: [clientId], references: [id])
  service   Service? @relation(fields: [serviceId], references: [id])
}

enum ProjectStatus { ACTIVE ON_HOLD COMPLETE CANCELLED }

model Task {
  id        String   @id @default(cuid())
  projectId String
  title     String
  description String?
  order     Int
  status    TaskStatus // TODO | IN_PROGRESS | REVIEW | DONE
  assigneeId String?
  dueAt     DateTime?
  project   Project  @relation(fields: [projectId], references: [id])
  assignee  User?    @relation(fields: [assigneeId], references: [id])
}

enum TaskStatus { TODO IN_PROGRESS REVIEW DONE }

model TimeEntry {
  id        String   @id @default(cuid())
  projectId String
  userId    String
  startedAt DateTime
  endedAt   DateTime
  minutes   Int      // derived; 1-min granularity
  rateCents Int
  approved  Boolean  @default(true)
  project   Project  @relation(fields: [projectId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
}

model Quote {
  id        String   @id @default(cuid())
  tenantId  String
  clientId  String
  projectId String?
  status    QuoteStatus // DRAFT | SENT | ACCEPTED | DECLINED | EXPIRED
  currency  String
  totalCents Int
  lines     QuoteLine[]
  tenant    Tenant @relation(fields: [tenantId], references: [id])
  client    Client @relation(fields: [clientId], references: [id])
  project   Project? @relation(fields: [projectId], references: [id])
}

model QuoteLine {
  id        String   @id @default(cuid())
  quoteId   String
  label     String
  qty       Float
  unitCents Int
  quote     Quote    @relation(fields: [quoteId], references: [id])
}

enum QuoteStatus { DRAFT SENT ACCEPTED DECLINED EXPIRED }

model Invoice {
  id        String   @id @default(cuid())
  tenantId  String
  clientId  String
  projectId String?
  stripeInvoiceId String?
  currency  String
  totalCents Int
  status    InvoiceStatus // DRAFT | OPEN | PAID | VOID | UNCOLLECTIBLE
  issuedAt  DateTime?
  dueAt     DateTime?
  lines     InvoiceLine[]
  tenant    Tenant @relation(fields: [tenantId], references: [id])
  client    Client @relation(fields: [clientId], references: [id])
  project   Project? @relation(fields: [projectId], references: [id])
}

model InvoiceLine {
  id        String   @id @default(cuid())
  invoiceId String
  label     String
  qty       Float
  unitCents Int
  invoice   Invoice @relation(fields: [invoiceId], references: [id])
}

enum InvoiceStatus { DRAFT OPEN PAID VOID UNCOLLECTIBLE }

model Subscription {
  id            String   @id @default(cuid())
  tenantId      String
  clientId      String
  serviceId     String
  stripeSubId   String?
  priceCents    Int
  period        String // MONTHLY
  status        String // ACTIVE | CANCELED | PAST_DUE
  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  tenant        Tenant  @relation(fields: [tenantId], references: [id])
  client        Client  @relation(fields: [clientId], references: [id])
  service       Service @relation(fields: [serviceId], references: [id])
}

model BrandKit {
  id        String   @id @default(cuid())
  clientId  String   @unique
  primaryColor String?
  secondaryColor String?
  fonts     Json?    // { heading: "...", body: "..." }
  guidelines Markdown?
  logos     FileObject[]
  assets    GeneratedAsset[]
  client    Client   @relation(fields: [clientId], references: [id])
}

model GeneratedAsset {
  id        String   @id @default(cuid())
  brandKitId String
  type      String   // "facebook_cover", "ig_post", etc.
  status    String   // "preview_ready" | "unlocked"
  previewFileId String?
  hiResFileId String?
  priceCents Int
  brandKit  BrandKit @relation(fields:[brandKitId], references:[id])
}

model FileObject {
  id        String   @id @default(cuid())
  tenantId  String
  url       String   // S3 key or URL
  filename  String
  mimeType  String
  size      Int
  createdBy String?
  createdAt DateTime @default(now())
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
}

model Message {
  id        String   @id @default(cuid())
  tenantId  String
  projectId String
  authorId  String
  content   String
  createdAt DateTime @default(now())
  project   Project  @relation(fields: [projectId], references: [id])
  author    User     @relation(fields: [authorId], references: [id])
}

model Notification {
  id        String   @id @default(cuid())
  tenantId  String
  userId    String
  type      String
  payload   Json
  readAt    DateTime?
  user      User @relation(fields:[userId], references:[id])
  tenant    Tenant @relation(fields:[tenantId], references:[id])
}

model AuditLog {
  id        String   @id @default(cuid())
  tenantId  String
  actorId   String?
  action    String
  entity    String
  entityId  String?
  meta      Json
  createdAt DateTime @default(now())
  tenant    Tenant @relation(fields: [tenantId], references: [id])
  actor     User?   @relation(fields: [actorId], references: [id])
}
```

---

## 6) Workflow Template JSON (example)

```json
{
  "version": 1,
  "name": "SEO - Starter",
  "steps": [
    { "key": "intake", "label": "Client Intake & Goals", "requiresAssignee": true },
    { "key": "audit", "label": "Technical Audit", "requiresAssignee": true },
    { "key": "keywords", "label": "Keyword Research" },
    { "key": "onpage", "label": "On‑Page Updates" },
    { "key": "report", "label": "Report & Review", "approval": "client" }
  ]
}
```

- When a project is created with this template, `Task` rows are created in the specified order.
- Steps may specify `approval: "client"` to trigger a client approval checkpoint.
- Templates are versioned; projects store the applied version for historical accuracy.

---

## 7) API Surface (REST, App Router)

**Auth**
- `POST /api/auth/register` (manager), `POST /api/auth/invite`, `POST /api/auth/callback` (NextAuth)
- `GET /api/me` returns user + tenant memberships

**Tenancy & Users**
- `GET/POST /api/tenants`
- `GET/POST /api/tenants/:id/users` (invite, role change)

**Services & Templates**
- `GET/POST /api/services`
- `GET/POST /api/workflow-templates`

**Requests & Projects**
- `POST /api/requests` (client)
- `PATCH /api/requests/:id` (manager review)
- `POST /api/projects` (from accepted request or direct)
- `GET /api/projects/:id` (with tasks, messages, files)
- `PATCH /api/tasks/:id` (status, assignee, notes)

**Quotes & Invoices**
- `POST /api/quotes` (from guided form)
- `POST /api/quotes/:id/send`, `POST /api/quotes/:id/accept`
- `POST /api/invoices` (from time entries or quote)
- `GET /api/invoices/:id/pay` → Stripe Checkout session

**Time Tracking**
- `POST /api/time/start`, `POST /api/time/stop`, `POST /api/time` (manual)
- Manager approval endpoint for entries

**Retainers**
- `POST /api/subscriptions` (create Stripe checkout)
- Stripe webhook `/api/stripe/webhook` (invoice paid/failed, sub status)

**Messaging & Files**
- `POST /api/projects/:id/messages`
- `POST /api/upload` → signed URL
- `GET /api/files/:id` → signed download

**Brand Kit & Assets**
- `POST /api/brandkit` (create/update)
- Background job: `POST /api/jobs/generate-brand-assets` (internal, queue consumer)
- `POST /api/assets/:id/unlock` → Stripe payment → mark unlocked

**Notifications**
- `GET /api/notifications` ; `POST /api/notifications/read`

> All endpoints enforce tenant scoping and role permissions. Prefer server actions for mutations invoked from RSC components.

---

## 8) Next.js App Structure

```
/app
  /(auth)/sign-in, sign-up
  /(dashboard)/
    /[tenantId]/
      page.tsx (tenant switch)
      /clients, /projects, /requests, /quotes, /billing, /reports
      /brand
      /settings (users, services, templates, rates)
  /api/** (route handlers)
/components (UI primitives, forms, tables)
/lib (auth, prisma, stripe, s3, pusher clients, rbac helpers)
/jobs (queue producer/consumer, asset gen)
/styles, /utils
/prisma/schema.prisma
```

**UI Screens (MVP)**
1. Client Dashboard: “Create Request”, active projects, invoices, brand kit, notifications.
2. Manager Dashboard: pipeline (requests→projects), team workload, revenue snapshot.
3. Project View: tasks (kanban), messages, files, timers, approvals panel.
4. Quote Builder (client + manager editor) → preview PDF → send/accept.
5. Time Tracking Widget (start/stop, task picker) + approvals list.
6. Subscriptions: plan catalog, subscribe, status.
7. Brand Kit: logos upload, colors, fonts, guidelines; brand sheet preview/export.
8. Asset Library: previews, unlock/pay, download history.
9. Settings: services/pricing, workflow templates, users/roles, notification prefs.

---

## 9) Billing Logic Details

- **Per‑Minute:** `minutes = ceil((endedAt - startedAt)/60s)` (no 15‑min rounding). Rate resolution in cents; currency on tenant.
- **Invoice Generation:** For a period or project, sum approved entries → one invoice with line items per task or day.
- **Fixed Project:** Quote acceptance creates invoice draft (deposit optional). Completion can trigger balance invoice.
- **Retainers:** Stripe subscription (monthly). Webhook updates local status. Usage report emailed monthly.
- **Taxes:** Per‑tenant tax rate fields (simple MVP).

---

## 10) Brand Asset Generation

- **Templates:** Store SVG/Canvas JSON templates per asset type with placeholders:
  - `{logo}`, `{primaryColor}`, `{secondaryColor}`, `{fontHeading}`, `{fontBody}`, `{brandName}`.
- **Engine:** Node‑canvas or Sharp to compose raster assets; for SVG → render to PNG at required sizes.
- **Outputs (MVP):** 
  - Social profile (1024x1024), FB cover (820x312), LinkedIn banner (1584x396),
  - IG post (1080x1080), IG story (1080x1920), EDM header (1200x400), Letterhead (A4 PDF).
- **Watermarking:** Overlay subtle grid/logo for previews; store preview + hi‑res variants.
- **Entitlements:** On purchase, mark `GeneratedAsset.status = "unlocked"` and link hi‑res file.
- **Extensibility:** Add seasonal/industry packs; A/B test pack pricing.

---

## 11) Notifications (Event Catalog)

- `REQUEST_SUBMITTED`, `REQUEST_ACCEPTED/DECLINED`
- `QUOTE_SENT`, `QUOTE_ACCEPTED/DECLINED`
- `TASK_ASSIGNED`, `TASK_STATUS_CHANGED`, `CLIENT_APPROVAL_REQUIRED`
- `MESSAGE_NEW`
- `INVOICE_ISSUED`, `PAYMENT_SUCCEEDED/FAILED`
- `SUBSCRIPTION_RENEWED/FAILED`
- `ASSET_PREVIEW_READY`, `ASSET_UNLOCKED`

Each event → in‑app & email (template per event). User preferences control delivery.

---

## 12) Security & Compliance

- All queries filtered by tenant; object‑level checks (project.clientId etc.).
- Signed URL access for files; expiring downloads.
- Audit every state transition (who/when/what).
- Rate limit auth and message/file endpoints.
- PII minimization; encrypt secrets at rest; HTTPS enforced.

---

## 13) Developer Onboarding (MVP Setup)

1. `pnpm create next-app@latest` → TypeScript, App Router, Tailwind.
2. Install: `pnpm add prisma @prisma/client next-auth bcrypt zod stripe @uploadthing/react @uploadthing/server @aws-sdk/client-s3 @upstash/qstash @upstash/redis pusher @pusher/pusher`
3. `npx prisma init` → add schema from section 5; `npx prisma migrate dev`.
4. Configure NextAuth (email, credentials provider) + session JWT with `tenantId` & `role` claims.
5. Stripe keys + webhook route `/api/stripe/webhook`; test with CLI.
6. S3 bucket + CORS; implement signed upload & download routes.
7. Seed scripts: create demo tenant, services, workflow templates.
8. Protect routes with middleware; RBAC helper `can(action, entity)`.
9. Add Pusher for real‑time message + notification channels.
10. Add Vercel Cron for monthly retainer reports & asset generation retries.

**ENV (sample)**
```
DATABASE_URL=postgres://...
NEXTAUTH_SECRET=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
S3_BUCKET=...
S3_REGION=...
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
PUSHER_KEY=...
RESEND_API_KEY=...
```

---

## 14) QA & Definition of Done

- Unit tests for RBAC guards, calculators (minutes rounding), quote totals, webhooks.
- E2E happy paths:
  - Client creates request → Manager accepts → Tasks generated.
  - Client builds & accepts quote → Stripe checkout success → Project active.
  - Staff timer → Invoice generated → Client pays.
  - Brand kit saved → Asset previews generated → Unlock & download.
- Accessibility check (ARIA roles, keyboard nav).
- Performance budgets: TTFB < 200ms (cached), LCP < 2.5s on dashboard.
- Error observability: Sentry traces on all API routes.

---

## 15) Phase Plan

**Phase A — Foundations**
- Auth & tenancy, RBAC, services, requests→projects, workflow templates, basic messaging, file uploads.

**Phase B — Billing**
- Quotes, invoices, per‑minute timers, Stripe Checkout + Subscriptions, notifications.

**Phase C — Brand**
- Brand kit UI, asset generation jobs, previews + unlock flow, brand sheet export.

**Phase D — Reports & Polish**
- KPI dashboards, monthly summaries, performance + accessibility hardening.

---

## 16) Success Metrics (examples)
- Quote acceptance rate; time‑to‑first‑response on requests.
- % invoices paid within 7 days; retainer churn rate.
- Asset unlock conversion rate; NPS from client dashboard survey.

---

## 17) Open Questions (to capture during build)
- Do we need SSO for enterprise clients?
- Tax handling per locale (GST/VAT) and invoicing numbering rules?
- Granular staff permissions beyond role (e.g., can view rates)?
- Storage region constraints or data residency?
- Custom domains per tenant (white‑label portal)?
