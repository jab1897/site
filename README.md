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
- [ ] Redeploy backend.

## 13 Step 11 Verify the WinRed redirect tracking works
- [ ] Open live site.
- [ ] Click a donation amount.
- [ ] Confirm redirect to WinRed URL.
- [ ] Call backend admin metrics endpoint and verify click count increased.

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
