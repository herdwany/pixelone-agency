# IMPLEMENTATION_PLAN.md

## PR-1: Baseline Tooling & Quality Gate (Non-invasive)
- الهدف: إنشاء baseline واضح للفحص بدون تغيير سلوك المنتج.
- الملفات:
  - `README.md`
  - `RELEASE_VISUAL_CHECKLIST.md`
  - (عند الحاجة) scripts docs فقط بدون إدخال framework جديد.
- الاختبارات/التحقق:
  - توثيق أوامر الفحص المتاحة فعلياً وحالة كل أمر.
  - فحص روابط وصور static report.
- معيار القبول:
  - وجود تعليمات تشغيل وفحص دقيقة يمكن لأي مطور اتباعها بدون تخمين.

## PR-2: Security Header Hardening (Safe CSP tightening)
- الهدف: تخفيف مخاطر CSP تدريجياً مع الحفاظ على عمل الموقع.
- الملفات:
  - `pixelone/_headers`
  - `pixelone/index.html` (إن لزم ضبط inline policies)
- الاختبارات/التحقق:
  - التأكد من استمرار تحميل Supabase/GSAP/jsPDF.
  - فحص عدم كسر النماذج والمصادقة.
- معيار القبول:
  - تقليل الاعتماد على `unsafe-eval`/`unsafe-inline` قدر الإمكان بدون regression وظيفي.

## PR-3: SEO Consistency & Crawl Hygiene
- الهدف: توحيد canonical/sitemap/home URL ومنع تضارب الأرشفة.
- الملفات:
  - `pixelone/sitemap.xml`
  - `pixelone/*.html` (عند الحاجة لضبط canonical)
  - `pixelone/robots.txt` (فقط إذا لزم)
- الاختبارات/التحقق:
  - فحص توافق sitemap مع canonical فعلي.
  - فحص أن صفحات auth/admin ما زالت noindex/disallow.
- معيار القبول:
  - عدم وجود تضارب URLs الرئيسية وتحسن نظافة الفهرسة.

## PR-4: Performance Pass for OG/Static Assets
- الهدف: خفض أحجام صور OG الكبيرة دون فقدان الجودة المناسبة للمشاركة.
- الملفات:
  - `pixelone/og/*.png`
  - (اختياري) تحديث مراجع metadata عند تغيير الاسم/الامتداد.
- الاختبارات/التحقق:
  - التأكد من بقاء جميع روابط OG صالحة.
  - مقارنة أحجام قبل/بعد.
- معيار القبول:
  - خفض واضح للأحجام مع استمرار عرض OG previews بشكل سليم.

## PR-5: Content Truth & Demo Label Compliance
- الهدف: فرض فصل واضح بين المحتوى الحقيقي وDemo بما يتوافق مع سياسات المشروع.
- الملفات:
  - صفحات demo داخل `pixelone/{Medical,Property,car,food,barbershop}/`
  - `pixelone/content/*.json` (إن احتاجت نصوص إيضاحية)
- الاختبارات/التحقق:
  - تحقق بصري من ظهور تحذير demo الإلزامي على كل نموذج غير حقيقي.
- معيار القبول:
  - كل نموذج غير حقيقي يحتوي العبارة المطلوبة حرفياً.

## PR-6: Supabase Auth/Invite Reliability Review
- الهدف: تقوية مصداقية flows (invite/auth callback/reset) وتوثيق dependencies.
- الملفات:
  - `pixelone/app.js`
  - `pixelone/auth-callback.html`
  - `pixelone/supabase/functions/invite-user/*`
- الاختبارات/التحقق:
  - اختبار سيناريوهات auth الأساسية + invite path.
  - التأكد من عدم تسرب أسرار أو مفاتيح حساسة.
- معيار القبول:
  - نجاح التدفقات الأساسية مع رسائل خطأ واضحة وسلوك fallback آمن.
