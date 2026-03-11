# Vercel deployment (static export)

- **Root page:** `app/page.tsx` (App Router). Build produces `out/index.html` for `/`.
- **Build:** `next build` (output: `out/`). Set in `vercel.json`: `buildCommand`, `framework: "nextjs"`. Do not set `outputDirectory`—Vercel’s Next.js builder handles static export and expects manifests in `.next/`.
- **Vercel project:** Set **Root Directory** to `.` (repo root). Framework: **Next.js**. No overrides needed unless you use a monorepo.

If the root URL returns 404, confirm in Vercel: **Settings → General → Root Directory** is empty or `.`, and the latest deployment used this repo and `main` branch.
