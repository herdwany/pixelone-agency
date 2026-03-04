-- ============================================================
-- Pixel One: تحديث الخدمات إلى العربية الكاملة
-- شغّل هذا الملف في Supabase SQL Editor
-- ============================================================

begin;

-- حذف الخدمات القديمة (اختياري - فقط إذا أردت إعادة تعيين كامل)
-- delete from public.pixel_services;

-- إدراج/تحديث الخدمات التسع بالعربية
insert into public.pixel_services (id, title_ar, description_ar, price, category, is_coming_soon, popularity, enabled)
values
    ('svc-social-media-designs', 'تصاميم سوشيال ميديا ثابتة', 'منشورات إعلانية احترافية جاهزة للنشر على Instagram و Facebook و LinkedIn.', '60', 'سوشيال ميديا', false, 1, true),
    ('svc-logo-design', 'تصميم شعار احترافي', 'شعار واضح وقابل للاستخدام على جميع المنصات مع تصدير بخلفية شفافة.', '150', 'هوية بصرية', false, 2, true),
    ('svc-digital-banners', 'بانرات وإعلانات رقمية', 'بانرات جاهزة للحملات الإعلانية بمقاسات النشر المعتمدة.', '80', 'إعلانات رقمية', false, 3, true),
    ('svc-pitch-deck', 'تصميم عرض تقديمي', 'شرائح احترافية للأعمال والمستثمرين بتسلسل بصري قوي يعكس هوية مشروعك.', '200', 'أعمال تجارية', false, 4, true),
    ('svc-short-video', 'فيديو قصير (Reels/TikTok)', 'مونتاج خفيف وسريع لمحتوى يومي قصير يناسب جميع المنصات.', '120', 'مونتاج فيديو', false, 5, true),
    ('svc-professional-design', 'خدمة تصميم احترافية', 'باقة تصميم متقدمة تشمل الهوية البصرية وصناعة المحتوى المتكامل.', '500', 'تصميم احترافي', false, 6, true),
    ('svc-short-videos-premium', 'فيديوهات قصيرة (أقل من دقيقة)', 'مونتاج فيديو قصير عالي الجودة لمنصات التواصل الاجتماعي.', '300', 'مونتاج فيديو', false, 7, true),
    ('svc-advanced-promo-video', 'فيديو ترويجي متقدم (قريباً)', 'خدمة إنتاج فيديو احترافي بجودة إنتاجية عالية — قادمة قريباً.', 'قريباً', 'فيديو متقدم', true, 8, true),
    ('svc-web-landing-page', 'تصميم مواقع وصفحات هبوط (قريباً)', 'قريباً: تصميم صفحات هبوط ومواقع احترافية عالية التحويل.', '1500', 'تصميم مواقع', true, 9, true)
on conflict (id) do update set
    title_ar = excluded.title_ar,
    description_ar = excluded.description_ar,
    price = excluded.price,
    category = excluded.category,
    is_coming_soon = excluded.is_coming_soon,
    popularity = excluded.popularity,
    enabled = excluded.enabled,
    updated_at = now();

-- تعطيل الخدمات القديمة التي لم تعد مستخدمة
update public.pixel_services
set enabled = false, updated_at = now()
where id in ('svc-banner-design', 'svc-reels-tiktok', 'svc-digital-qr-menu', 'svc-brand-identity-basic', 'svc-social-management')
  and id not in ('svc-social-media-designs', 'svc-logo-design', 'svc-digital-banners', 'svc-pitch-deck', 'svc-short-video', 'svc-professional-design', 'svc-short-videos-premium', 'svc-advanced-promo-video', 'svc-web-landing-page');

commit;
