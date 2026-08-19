# Changelog — Production Hardening

## 2026-08-19 — `agent/production-hardening-20260819`

### Lead capture and offers

- Made the order email visible and optional on `pixelone/index.html`, `services.html`, and `service-detail.html`.
- Removed the anonymous hidden-email blocker in `pixelone/app.js`.
- Added client-side lead text normalization, length limits, required name/project validation, and bounded dynamic notes.
- Connected the visible `WELCOME10` card to an active matching discount rule; otherwise the card is not shown.

### Trust and Portfolio

- Added `pixelone/demo-disclaimer.css`.
- Added Arabic Demo disclaimers to car, property, medical, barbershop, and food portfolio pages.
- Changed Portfolio default status from `Demo` to `نموذج تجريبي`.
- Added `role="listitem"` to all generated and fallback Portfolio cards.
- Translated visible homepage package labels and selected Portfolio badges to Arabic.

### SEO, performance, and accessibility

- Normalized production URLs from `www.pixelonevisuals.tech` to `pixelonevisuals.tech` in static HTML/JSON/JS/XML content.
- Added a WebP Hero asset and switched the homepage Hero/preload to it; social OG mapping remains PNG.
- Added explicit labels/ARIA names to authentication/admin controls and the medical demo country-code field.

### Safety boundary

- No file under `pixelone/supabase/` was modified.
- No database migration, RLS policy, live form submission, DNS change, production deploy, or secret access was performed.
- Added `AUDIT_AFTER_FIX.md` with test results and remaining risks.
