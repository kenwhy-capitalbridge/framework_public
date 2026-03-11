# Security headers (iframe embedding)

## frame-ancestors (CSP)

The app allows iframe embedding **only** from:

- `https://thecapitalbridge.com`
- `https://*.thecapitalbridge.com` (all subdomains, e.g. www, marketing, etc.)

All other origins are blocked from embedding the app.

**Where it’s set:** `vercel.json` (and `next.config.mjs` for local/server runs). With static export, only Vercel applies the headers from `vercel.json`.

## X-Frame-Options

**Do not** set `X-Frame-Options: DENY` or `X-Frame-Options: SAMEORIGIN` anywhere (Vercel project settings, CDN, or code). Those would block embedding even with `frame-ancestors` allowed. Rely on `frame-ancestors` only.

## Verification

After deploy, check that:

1. `https://framework-public.thecapitalbridge.com` returns header:  
   `Content-Security-Policy: frame-ancestors 'self' https://thecapitalbridge.com https://*.thecapitalbridge.com`
2. The page loads inside an iframe on `https://thecapitalbridge.com` (or any `https://*.thecapitalbridge.com`).
3. Embedding from other domains (e.g. `https://example.com`) is blocked.

## Note on Supabase / cookies

This app is a static landing page with no Supabase or auth. If you add auth later and need cookies inside the iframe, use `SameSite=None; Secure` for those cookies and keep the same `frame-ancestors` policy above.
