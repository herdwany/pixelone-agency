# REBUILD_AUDIT.md

## 1) الحالة الحالية (Current State)
- نوع المشروع: موقع static HTML/CSS/Vanilla JS داخل `/pixelone` مع Supabase backend.
- لا يوجد `package.json` أو toolchain Node محلي للمشروع الأساسي.
- نقطة الدخول:
  - `/index.html` (root) يعيد التوجيه إلى `/pixelone/index.html`
  - الإنتاج يُنشر من مجلد `/pixelone` عبر GitHub Pages workflow (`.github/workflows/deploy.yml`).

## 2) التقنية الفعلية والإصدارات
- Frontend:
  - HTML + CSS + JavaScript (بدون React/Vue/Next).
  - Tailwind prebuilt: `pixelone/tw.min.css` ويظهر داخله `tailwindcss v3.4.19`.
  - Supabase JS من CDN: `@supabase/supabase-js@2` (major pinned only).
  - jsPDF: `jspdf@2.5.1` (تحميل lazy من `app.js`).
  - GSAP: `3.12.5` (تحميل ديناميكي من `visual-system.js`).
- Backend/Data:
  - Supabase PostgreSQL + Auth + RLS (`pixelone/supabase/*.sql`).
  - Edge Function Deno: `pixelone/supabase/functions/invite-user/index.ts`
    - Deno std `0.224.0`
    - `@supabase/supabase-js@2` عبر `esm.sh`.
- Supabase local temp metadata موجودة في `/supabase/.temp` (مرجعية بيئية وليست تشغيل local كامل).

## 3) أوامر install/dev/lint/typecheck/test/build
- لا توجد scripts معرفة داخل المشروع (لا `package.json`).
- نتائج التحقق:
  - `npm run lint` -> فشل `ENOENT` (لا يوجد package.json)
  - `npm run typecheck` -> فشل `ENOENT`
  - `npm test` -> فشل `ENOENT`
  - `npm run build` -> فشل `ENOENT`
- أوامر Supabase المذكورة بالمشروع:
  - `supabase functions deploy invite-user --project-ref YOUR_PROJECT_REF` (موثق فقط، CLI غير مثبت في البيئة الحالية).

## 4) بنية الملفات (مختصر)
- `pixelone/` التطبيق الفعلي (صفحات، CSS/JS، محتوى، SEO، إعدادات).
- `pixelone/content/*.json` نصوص الصفحات العربية وSEO payload.
- `pixelone/supabase/*.sql` schema + RLS + hardening + verify.
- `pixelone/supabase/functions/invite-user/` Edge Function للدعوات.
- `.github/workflows/deploy.yml` نشر إلى GitHub Pages.
- `pixelone/_headers` و`pixelone/_redirects` لإعدادات security/redirects.

## 5) routes الفعلية
Top-level routes داخل `pixelone`:
- `index.html`, `about.html`, `services.html`, `how-we-work.html`
- `service-*.html` (صفحات الخدمات)
- `client-login.html`, `login.html`, `auth-callback.html`
- `dashboard.html`, `admin-dashboard.html`
- `privacy-policy.html`, `refund-policy.html`, `terms-of-service.html`
- plus verification: `google73c643ad179fa5b1.html`

## 6) المكونات والأنظمة الرئيسية
- `app.js`:
  - إدارة الطلبات، المصادقة، dashboards، عروض الأسعار والفواتير، خصومات، منازعات.
  - إنشاء رابط WhatsApp مع رسالة prefilled بعد إرسال الطلب.
  - تكامل webhook إلى `flow.sokt.io`.
  - fallback على `localStorage/sessionStorage` عند الحاجة.
- `page-text-loader.js`:
  - تحميل/حقن محتوى i18n من JSON/DB.
- `portfolio-content-loader.js`:
  - تحميل محتوى portfolio section.
- `visual-system.js`:
  - theme + loader + enhancements.

## 7) مصادر البيانات والتكاملات
- Supabase:
  - Auth (email/password, Google OAuth, magic link, reset flow).
  - جداول مثل: `pixel_orders`, `pixel_quotes`, `pixel_invoices`, `pixel_services`, `pixel_portfolio_items`, `pixel_admin_users`, ...
  - RLS وسياسات كثيرة موجودة في `schema.sql`.
- Edge Function:
  - `invite-user` تستخدم مفاتيح env server-side.
- Webhook:
  - `AUTOMATION_WEBHOOK_URL` إلى `https://flow.sokt.io/func/...`.
- WhatsApp:
  - رقم الإعداد الأساسي في `pixelone/site-settings.json` ويُستخدم لبناء `wa.me` link برسالة مفصلة.
- البريد:
  - mailto links + قوالب Supabase البريدية ضمن `pixelone/supabase/email-templates/`.
- التحليلات:
  - لا يوجد snippet analytics واضح داخل HTML الرئيسي، لكن CSP يسمح Cloudflare Insights.

## 8) المتغيرات البيئية المطلوبة (دون قيم)
- Edge Function `invite-user`:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ALLOWED_ORIGINS` (اختياري مع default)
- Frontend runtime override (اختياري):
  - `window.__PIXELONE_SUPABASE__.url`
  - `window.__PIXELONE_SUPABASE__.publishableKey`

## 9) SEO/Robots/Sitemap/Canonical/OG
- `robots.txt` موجود ويمنع صفحات auth/admin/content/supabase.
- `sitemap.xml` موجود ويغطي الصفحات التسويقية الأساسية.
- Canonical وOG/Twitter موجودة على أغلب الصفحات.
- ملاحظة SEO:
  - sitemap يستخدم `.../index.html` بينما canonical للصفحة الرئيسية هو `/` (احتمال duplicate URL pattern).

## 10) نتائج فحص الروابط والصور
- فحص الروابط المحلية: لا مفقود فعلياً في صفحات الموقع التشغيلية.
- العناصر التي ظهرت كمفقودة تخص placeholders داخل قوالب البريد (`{{ .ConfirmationURL }}`) وهي متوقعة.
- صور كبيرة (>300KB): 10 ملفات OG PNG (بعضها >1MB) وقد تؤثر على الأداء والمشاركة.

## 11) Console/Network/Forms/Responsive/RTL/A11y
- RTL/lang:
  - كل صفحات الموقع الأساسية `lang="ar" dir="rtl"`.
- Accessibility (فحص static سريع):
  - لم تظهر صور بدون `alt` في الصفحات العليا.
  - لم تظهر حقول input بلا تعريف معرّف/label في الفحص السريع.
- Console/Network runtime:
  - تعذر تنفيذ فحص Browser automation داخل البيئة الحالية بسبب عدم توفر مصادقة MCP Playwright.
- النماذج:
  - Order/Login/Dashboard/Admin forms موجودة ومربوطة بـ `app.js`.
  - إرسال الطلب يبني رسالة WhatsApp مفصلة ويحاول فتح `wa.me`.

## 12) مخاطر SEO والأمان (الأولوية)
1. **CSP permissive**: استخدام `unsafe-inline` و`unsafe-eval` في CSP (سطح هجوم أعلى XSS).
2. **Hardcoded endpoints/keys**: وجود publishable key وwebhook URL في frontend (ليس service key لكن يحتاج governance).
3. **تعارض استضافة محتمل**: وجود artifacts Netlify (`_headers`, `_redirects`) مع نشر GitHub Pages الحالي.
4. **أصول OG كبيرة**: أداء/SEO share previews قد تتأثر بسبب الحجم.
5. **اعتمادية CDN عالية**: Supabase/GSAP/jsPDF من CDN بدون lock كامل للإصدارات.
6. **لا pipeline quality checks**: لا lint/typecheck/test/build معرفين للمستودع.

## 13) الملفات المتأثرة (مجالات العمل القادمة)
- Frontend core: `pixelone/app.js`, `pixelone/visual-system.js`, `pixelone/page-text-loader.js`
- صفحات SEO/UI: `pixelone/*.html`
- إعدادات الموقع: `pixelone/site-settings.json`, `pixelone/robots.txt`, `pixelone/sitemap.xml`, `pixelone/_headers`, `pixelone/_redirects`
- Backend schema/security: `pixelone/supabase/schema.sql`, `pixelone/supabase/security-hardening.sql`, `pixelone/supabase/functions/invite-user/*`
- Assets: `pixelone/og/*`, `pixelone/icone/*`
