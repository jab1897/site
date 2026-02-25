# Jorge Borrego Campaign Monorepo

## 1 What you are building in one paragraph
You are building a production-ready bilingual campaign website for Jorge Borrego for Texas House District 118 with a Next.js frontend (Vercel) and a Fastify + Postgres backend/admin (Render), including volunteer lead capture, WinRed click tracking/redirects, issue messaging, endorsements, compliance footer text, and deployment-ready environment configuration.

## 2 What you need before you start
- [ ] **GitHub** account (GitHub = a website to store your code history online).
- [ ] **Vercel** account (Vercel = a hosting platform specialized for Next.js websites).
- [ ] **Render** account (Render = a cloud platform for backend servers and databases).
- [ ] **Resend** account (Resend = an email API service for sending form notifications).
- [ ] **Git** installed (Git = tool to track file changes).
- [ ] **Node.js 20** installed (Node.js = JavaScript runtime to run apps).
- [ ] WinRed destination URL ready.

## 3 Step 1 Create the GitHub repo
- [ ] Click **GitHub → New repository**.
- [ ] Type `jorgefor-texas-site`.
- [ ] Click **Private**.
- [ ] Click **Create repository**.

## 4 Step 2 Open Google Colab
- [ ] Click **Google Colab → New Notebook**.
- [ ] A **code cell** is a box where you paste shell commands.

## 5 Step 3 Copy and paste commands into Colab to clone the repo
```bash
git --version
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
sudo npm i -g pnpm
pnpm -v
cd /content
git clone https://github.com/YOUR_GITHUB_USERNAME/jorgefor-texas-site.git
cd jorgefor-texas-site
```

## 6 Step 4 Generate the project files in the repo folder
- [ ] Run Codex in this folder.
- [ ] Paste the master prompt.
- [ ] Confirm files exist under `apps/frontend`, `apps/backend`, `packages/shared`.

## 7 Step 5 Install dependencies and run locally
```bash
pnpm install
pnpm -C apps/frontend dev
pnpm -C apps/backend dev
```

## 8 Step 6 Commit and push to GitHub
```bash
git add .
git status
git commit -m "Initial campaign site"
git push origin main
```

## 9 Step 7 Deploy frontend to Vercel
- [ ] Click **Vercel → Add New → Project**.
- [ ] Click **Import** on your repo.
- [ ] Set **Root Directory** = `apps/frontend`.
- [ ] Set **Build Command** = `pnpm build`.
- [ ] Keep **Output** = Next.js default.
- [ ] Add env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`.
- [ ] Click **Deploy**.

## 10 Step 8 Deploy backend to Render and create Postgres
- [ ] Click **Render → New → PostgreSQL**.
- [ ] Click **Render → New → Web Service**.
- [ ] Connect repo.
- [ ] Set **Root Directory** = `apps/backend`.
- [ ] Set **Build Command** = `pnpm install && pnpm build`.
- [ ] Set **Start Command** = `pnpm start`.
- [ ] Add env vars from `.env.example`.
- [ ] Deploy.

## 11 Step 9 Add environment variables safely
Never commit secrets. Add values only in Vercel/Render dashboards:
- Frontend: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`
- Backend: `PORT`, `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `LEADS_NOTIFY_EMAIL`, `RESEND_API_KEY`

## 12 Step 10 Turn on email notifications for volunteer signups
- [ ] Click **Resend → API Keys → Create key**.
- [ ] Copy key.
- [ ] Paste into Render env var `RESEND_API_KEY`.
- [ ] Set `LEADS_NOTIFY_EMAIL=info@jorgefortexas.com`.
- [ ] Set `VOLUNTEER_NOTIFY_EMAIL=info@jorgefortexas.com`.
- [ ] Redeploy backend.

## 12.1 Seamless volunteer-interest pipeline (recommended)
Use this checklist to capture, notify, review, and export all volunteer-interest submissions with minimal manual work.

1. **Frontend form wiring (already included in this repo)**
   - Volunteer form posts to `POST /api/public/volunteer`.
   - API base URL is set from `NEXT_PUBLIC_API_URL`.

2. **Backend storage and notifications (already included in this repo)**
   - Backend validates payload and stores rows in `volunteer_signups`.
   - Backend emails your team using Resend when new submissions arrive.

3. **Production environment variables**
   - In **Vercel** (`apps/frontend`):
     - `NEXT_PUBLIC_API_URL=https://YOUR_RENDER_BACKEND_URL`
     - `NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN`
   - In **Render** (`apps/backend`):
     - `DATABASE_URL=...` (already set if Render Postgres is connected)
     - `RESEND_API_KEY=...`
     - `VOLUNTEER_NOTIFY_EMAIL=info@jorgefortexas.com`
     - `LEADS_NOTIFY_EMAIL=info@jorgefortexas.com`

   If your Render API service and Render Postgres are already set up, you only need to add/update `RESEND_API_KEY`, `VOLUNTEER_NOTIFY_EMAIL`, and `LEADS_NOTIFY_EMAIL`, then redeploy.

4. **Verification steps**
   - Submit the volunteer form on your live site.
   - Confirm a new row is created in `volunteer_signups`.
   - Confirm the notification email is received.
   - Confirm no CORS errors appear in browser devtools.

5. **Daily operations**
   - Use admin endpoint(s) to review lead volume and trends.
   - Export and sync contacts into your CRM/email/SMS tool each day.
   - Tag contacts by `interest`, `locale`, and `source_path` for segmentation.

## 12.2 Copy/paste code-search prompt (for Codex/AI code audit)
Use this prompt to quickly audit whether volunteer-interest capture is fully wired and where to fix gaps.

```text
You are auditing a monorepo for volunteer-interest lead capture.

Goal: verify the complete flow from site form submission → backend validation → database insert → email notification → admin reporting.

Search tasks:
1) Find frontend files that submit volunteer forms. Report endpoint URL, HTTP method, payload fields, and env vars used.
2) Find backend route handlers for volunteer/lead submission. Report validation schema, required/optional fields, and response codes.
3) Find database schema/migrations for volunteer tables. Report table names + key columns used for outreach (email, phone, interest, locale, source_path, created_at).
4) Find email notification service usage (Resend or equivalent). Report which env vars are required and fallback behavior when key is missing.
5) Find admin/metrics/export routes that allow campaign staff to retrieve leads.
6) List all env vars needed for local + production setup, grouped by frontend/backend.
7) Identify likely failure points (CORS, missing env vars, wrong API URL, missing table, email provider disabled).
8) Output a “Setup Fix Plan” with exact files to edit and a step-by-step validation checklist.

Return results as:
- Architecture summary
- File-by-file evidence (with paths)
- Missing pieces
- Concrete fix plan
- Final verification commands
```

## 13 Step 11 Verify the WinRed redirect tracking works
- [ ] Open live site.
- [ ] Click a donation amount.
- [ ] Confirm redirect to WinRed URL.
- [ ] Call backend admin metrics endpoint and verify click count increased.

### Render Shell smoke checks (admin analytics)
```bash
# 1) Login and capture token
TOKEN=$(curl -sS -X POST "$BACKEND_URL/api/admin/login" \
  -H 'content-type: application/json' \
  -d '{"email":"'$ADMIN_EMAIL'","passwordHash":"'$ADMIN_PASSWORD_HASH'"}' | jq -r '.token')

# 2) Date-range totals
curl -sS "$BACKEND_URL/api/admin/metrics?from=2026-01-01&to=2026-01-31" \
  -H "Authorization: Bearer $TOKEN"

# 3) Daily time series
curl -sS "$BACKEND_URL/api/admin/timeseries?from=2026-01-01&to=2026-01-31" \
  -H "Authorization: Bearer $TOKEN"

# 4) Attribution summary
curl -sS "$BACKEND_URL/api/admin/attribution?from=2026-01-01&to=2026-01-31" \
  -H "Authorization: Bearer $TOKEN"
```

## 14 Step 12 Set up custom domain
- [ ] Click **Vercel project → Settings → Domains**.
- [ ] Click **Add Domain**.
- [ ] Follow DNS records exactly.

## 15 Troubleshooting with the 12 most common errors and fixes
1. `pnpm: command not found` → install pnpm globally.
2. Node <20 → install Node 20.
3. `DATABASE_URL` missing → add Render Postgres URL.
4. `JWT_SECRET` missing → add strong secret.
5. CORS errors → verify `NEXT_PUBLIC_API_URL` points to backend.
6. Donate not redirecting → test `/api/donate` endpoint directly.
7. No lead emails → verify `RESEND_API_KEY` and sender domain.
8. Build fails on frontend → run `pnpm -C apps/frontend build` locally.
9. Build fails on backend → run `pnpm -C apps/backend build` locally.
10. 401 on admin endpoints → login first and send Bearer token.
11. Spanish route empty → add real copy in `apps/frontend/content/es/*`.
12. Missing images/video → upload files to `apps/frontend/public/*`.

## 60-second quick start (no email or database)
```bash
pnpm install
pnpm -C packages/shared build
NEXT_PUBLIC_API_URL=http://localhost:4000 pnpm -C apps/frontend dev
```
This starts frontend only. Later, enable backend features by setting backend env vars and running Postgres + backend server.

## Google Colab commands (copy/paste ready)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm i -g pnpm
git clone https://github.com/YOUR_GITHUB_USERNAME/jorgefor-texas-site.git
cd jorgefor-texas-site
pnpm install
pnpm -C apps/frontend build
pnpm -C apps/backend build
git add .
git commit -m "Update campaign site"
git push
```
