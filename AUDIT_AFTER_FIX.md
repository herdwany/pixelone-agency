# Pixel One — Audit After Fix

**Branch:** `agent/production-hardening-20260819`  
**Scope:** static frontend, lead form UX, offer display, Portfolio trust, accessibility, canonical URLs, and Hero performance.

## Applied safely

The public order forms now accept anonymous visitors without requiring a hidden email. Name, project, WhatsApp, optional email, dynamic fields, and notes are normalized and length-limited in the browser. The existing Supabase schema and all files under `pixelone/supabase/` were intentionally left unchanged. This is a client-side hardening layer; a future Edge Function should still provide server-side validation and rate limiting.

The `Welcome Offer/WELCOME10` card is now shown only when an active matching discount rule exists. The visible copy no longer promises automatic application for unverified offers. Portfolio demonstration pages now show a persistent Arabic disclaimer, and the public Portfolio status defaults to `نموذج تجريبي` rather than `Demo`.

The project now uses Arabic labels for the visible homepage packages, adds `role=listitem` to generated Portfolio cards, adds accessible names to authentication and admin controls, and uses a WebP Hero image while preserving PNG social previews. Canonical, Open Graph, sitemap, and content URLs were normalized to the production non-www host.

## Verification performed

| Check | Result |
|---|---|
| `node --check` for all JavaScript | Passed |
| JSON parsing for all JSON files | Passed |
| `git diff --check` | Passed after whitespace cleanup |
| Local HTTP smoke test for homepage, services, service detail, and five demo pages | Passed with HTTP 200 |
| WebP and shared disclaimer asset smoke test | Passed |
| Static HTML acceptance scan | Passed for IDs, labels, list roles, demo labels, and canonical host; six Supabase email-template placeholders are expected and not broken local links |
| Database/schema files changed | No — `pixelone/supabase/` diff count is 0 |

## Remaining risks and follow-up

GitHub Pages does not interpret the repository `_headers` and `_redirects` files as response configuration. Production security headers therefore require the actual edge/hosting provider to implement them. The public anonymous insert policy remains in the existing database design; do not loosen it further. Before scaling traffic, add a dedicated `create-lead` Edge Function with server-side validation, rate limiting, abuse protection, and a separate Leads table. No live form submission, Supabase mutation, DNS change, or production deployment was performed by this branch.
