// ==========================================================================
// PIXEL ONE VISUALS - MASTER JAVASCRIPT APP FILE
// ==========================================================================

const runtimeSupabaseConfig = window.__PIXELONE_SUPABASE__ || {};
const SUPABASE_URL = runtimeSupabaseConfig.url || 'https://grdjidvagrxavuwykqjf.supabase.co';
const SUPABASE_KEY = runtimeSupabaseConfig.publishableKey || 'sb_publishable_09I_ZPReuprW9qZRqlG0nA_vxCBY6WS';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window._supabase = _supabase;

const I18N_LANGS = ['ar', 'en', 'fr'];
const I18N_DEFAULT_LANG = 'ar';
const I18N_STORAGE_KEY = 'pixelone_lang_v1';
const I18N_MANAGED_PAGES = [
    'index',
    'about',
    'services',
    'how-we-work',
    'client-login',
    'login',
    'dashboard',
    'admin-dashboard',
    'auth-callback',
    'privacy-policy',
    'refund-policy',
    'terms-of-service',
];

const UI_TEXT = {
    ar: {
        navDashboard: 'لوحة التحكم',
        navClientLogin: 'دخول العملاء',
        offerEmpty: 'لا توجد عروض نشطة حالياً.',
        offerTitleFallback: 'عرض خاص',
        offerBadgeFallback: 'SPECIAL',
        serviceSoon: 'قريباً',
        serviceAvailable: 'متاح الآن',
        serviceOrderNow: 'اطلب الخدمة الآن',
        serviceComingSoonBtn: 'قريباً جداً',
        customServiceName: 'طلب خدمة مخصص',
        discountLabel: 'خصم',
        orderProcessing: 'جاري الإرسال وتجهيز الطلب...',
        orderSubmitDefault: 'تأكيد وإرسال الطلب الآن',
        orderSubmitDone: 'تم الإرسال',
        orderEmailRequired: '❌ أدخل بريدك الإلكتروني حتى تتمكن من تتبع الطلب لاحقاً.',
        orderWhatsAppNotSet: '❌ رقم الواتساب غير مضبوط بعد. حدّث contact.whatsappNumber داخل site-settings.json أولاً.',
        orderSuccessPrefix: '✅ تم تأكيد الطلب بنجاح! سيتم تحويلك للواتساب.',
        orderTrackingNotice: 'رمز تتبع طلبك:',
        orderAuthNotice: 'للمتابعة التفصيلية، الشكايات، والعروض المخصصة: سجّل الدخول بنفس البريد المستخدم في الطلب.',
        waTitle: '*طلب خدمة جديد - Pixel One*',
        waOrderId: '*رقم الطلب:*',
        waOrderDate: '*تاريخ الطلب:*',
        waService: '*الخدمة المطلوبة:*',
        waFinalPrice: '*السعر بعد الخصم:*',
        waDiscountCode: '*كود الخصم:*',
        waCustomerName: '*اسم العميل:*',
        waPhone: '*رقم الهاتف:*',
        waEmail: '*البريد الإلكتروني:*',
        waSpecs: '*مواصفات وتفاصيل الطلب:*',
        dashboardClientMode: 'وضع العميل: يمكنك متابعة حالة الطلبات الخاصة بك.',
        dashboardNoOrders: 'لا توجد طلبات حالياً.',
        dashboardLastUpdate: 'آخر تحديث:',
        dashboardSupport: 'مراسلة الدعم',
        dashboardOrderDate: 'تاريخ الطلب:',
        trackTitle: 'مركز تتبع الطلب',
        trackHint: 'يمكنك إدخال رمز/رقم الطلب للبحث، أو تركه فارغاً لعرض كل طلباتك.',
        trackInputPlaceholder: 'مثال: PO-8K4M2Q',
        trackButton: 'تتبع',
        trackClear: 'عرض الكل',
    },
    en: {
        navDashboard: 'Dashboard',
        navClientLogin: 'Client Login',
        offerEmpty: 'No active offers right now.',
        offerTitleFallback: 'Special Offer',
        offerBadgeFallback: 'SPECIAL',
        serviceSoon: 'Coming Soon',
        serviceAvailable: 'Available Now',
        serviceOrderNow: 'Order This Service',
        serviceComingSoonBtn: 'Coming Soon',
        customServiceName: 'Custom Service Request',
        discountLabel: 'Discount',
        orderProcessing: 'Submitting your order...',
        orderSubmitDefault: 'Confirm and Submit Order',
        orderSubmitDone: 'Submitted',
        orderEmailRequired: '❌ Please enter your email so you can track this order later.',
        orderWhatsAppNotSet: '❌ WhatsApp number is not configured yet. Update contact.whatsappNumber in site-settings.json first.',
        orderSuccessPrefix: '✅ Your order has been submitted successfully. Redirecting to WhatsApp.',
        orderTrackingNotice: 'Your tracking code:',
        orderAuthNotice: 'To track details, create disputes, and receive personalized offers, sign in with the same email used in this order.',
        waTitle: '*New Service Order - Pixel One*',
        waOrderId: '*Order ID:*',
        waOrderDate: '*Order Date:*',
        waService: '*Requested Service:*',
        waFinalPrice: '*Final Price:*',
        waDiscountCode: '*Discount Code:*',
        waCustomerName: '*Client Name:*',
        waPhone: '*Phone:*',
        waEmail: '*Email:*',
        waSpecs: '*Project Details:*',
        dashboardClientMode: 'Client mode: you can track your own orders.',
        dashboardNoOrders: 'No orders available yet.',
        dashboardLastUpdate: 'Last update:',
        dashboardSupport: 'Contact support',
        dashboardOrderDate: 'Order date:',
        trackTitle: 'Order Tracking Center',
        trackHint: 'Enter your order ID/tracking code, or leave it empty to view all your orders.',
        trackInputPlaceholder: 'Example: PO-8K4M2Q',
        trackButton: 'Track',
        trackClear: 'Show all',
    },
    fr: {
        navDashboard: 'Tableau de bord',
        navClientLogin: 'Espace Client',
        offerEmpty: 'Aucune offre active pour le moment.',
        offerTitleFallback: 'Offre Speciale',
        offerBadgeFallback: 'SPECIAL',
        serviceSoon: 'Bientot',
        serviceAvailable: 'Disponible',
        serviceOrderNow: 'Commander ce service',
        serviceComingSoonBtn: 'Bientot disponible',
        customServiceName: 'Demande de Service Personnalisee',
        discountLabel: 'Remise',
        orderProcessing: 'Envoi de votre demande...',
        orderSubmitDefault: 'Confirmer et envoyer',
        orderSubmitDone: 'Envoye',
        orderEmailRequired: '❌ Veuillez entrer votre e-mail pour pouvoir suivre votre demande plus tard.',
        orderWhatsAppNotSet: '❌ Le numero WhatsApp n\'est pas configure. Mettez a jour contact.whatsappNumber dans site-settings.json.',
        orderSuccessPrefix: '✅ Votre demande a ete envoyee avec succes. Redirection vers WhatsApp.',
        orderTrackingNotice: 'Votre code de suivi :',
        orderAuthNotice: 'Pour suivre les details, ouvrir une reclamation et recevoir des offres personnalisees, connectez-vous avec le meme e-mail que celui de la demande.',
        waTitle: '*Nouvelle Demande de Service - Pixel One*',
        waOrderId: '*ID de demande :*',
        waOrderDate: '*Date :*',
        waService: '*Service demande :*',
        waFinalPrice: '*Prix final :*',
        waDiscountCode: '*Code promo :*',
        waCustomerName: '*Nom du client :*',
        waPhone: '*Telephone :*',
        waEmail: '*E-mail :*',
        waSpecs: '*Details du projet :*',
        dashboardClientMode: 'Mode client : vous pouvez suivre vos propres commandes.',
        dashboardNoOrders: 'Aucune commande pour le moment.',
        dashboardLastUpdate: 'Derniere mise a jour :',
        dashboardSupport: 'Contacter le support',
        dashboardOrderDate: 'Date de commande :',
        trackTitle: 'Centre de suivi des commandes',
        trackHint: 'Entrez votre ID/code de suivi, ou laissez vide pour afficher toutes vos commandes.',
        trackInputPlaceholder: 'Exemple : PO-8K4M2Q',
        trackButton: 'Suivre',
        trackClear: 'Tout afficher',
    },
};

const SERVICE_I18N = {
    'svc-social-media-designs': {
        en: {
            title: 'Social Media Static Designs',
            description: 'Professional ad posts for Instagram/Facebook/LinkedIn.',
            category: 'Social Media',
            serviceType: 'One-Time Service',
        },
        fr: {
            title: 'Designs Réseaux Sociaux',
            description: 'Publications publicitaires professionnelles pour Instagram/Facebook/LinkedIn.',
            category: 'Réseaux Sociaux',
            serviceType: 'Service Ponctuel',
        },
    },
    'svc-logo-design': {
        en: {
            title: 'Professional Logo Design',
            description: 'Clear logo usable across platforms with transparent export.',
            category: 'Branding',
            serviceType: 'One-Time Service',
        },
        fr: {
            title: 'Création de Logo Professionnel',
            description: 'Logo clair utilisable sur toutes les plateformes avec export transparent.',
            category: 'Identité Visuelle',
            serviceType: 'Service Ponctuel',
        },
    },
    'svc-digital-banners': {
        en: {
            title: 'Digital Banners & Ads',
            description: 'Campaign-ready banners in publish-ready sizes.',
            category: 'Digital Ads',
            serviceType: 'One-Time Service',
        },
        fr: {
            title: 'Bannières et Publicités Numériques',
            description: 'Bannières prêtes pour les campagnes aux formats de publication standard.',
            category: 'Publicité Numérique',
            serviceType: 'Service Ponctuel',
        },
    },
    'svc-pitch-deck': {
        en: {
            title: 'Pitch Deck Design',
            description: 'Business/investor slides with strong visual hierarchy.',
            category: 'Business',
            serviceType: 'One-Time Service',
        },
        fr: {
            title: 'Conception Pitch Deck',
            description: 'Diapositives professionnelles avec hiérarchie visuelle forte.',
            category: 'Business',
            serviceType: 'Service Ponctuel',
        },
    },
    'svc-short-video': {
        en: {
            title: 'Short Video (Reels/TikTok)',
            description: 'Fast lightweight edit for short-form daily content.',
            category: 'Video Editing',
            serviceType: 'One-Time Service',
        },
        fr: {
            title: 'Vidéo Courte (Reels/TikTok)',
            description: 'Montage léger et rapide pour contenu quotidien court.',
            category: 'Montage Vidéo',
            serviceType: 'Service Ponctuel',
        },
    },
    'svc-professional-design': {
        en: {
            title: 'Professional Design Service',
            description: 'Advanced design package for identity and content.',
            category: 'Design',
            serviceType: 'One-Time Service',
        },
        fr: {
            title: 'Service de Design Professionnel',
            description: 'Package design avancé pour identité et contenu.',
            category: 'Design',
            serviceType: 'Service Ponctuel',
        },
    },
    'svc-short-videos-premium': {
        en: {
            title: 'Short Videos (< 1 min)',
            description: 'High-quality short video editing for social platforms.',
            category: 'Video Editing',
            serviceType: 'One-Time Service',
        },
        fr: {
            title: 'Vidéos Courtes (< 1 min)',
            description: 'Montage vidéo court haute qualité pour les réseaux sociaux.',
            category: 'Montage Vidéo',
            serviceType: 'Service Ponctuel',
        },
    },
    'svc-advanced-promo-video': {
        en: {
            title: 'Advanced Promo Video (Coming Soon)',
            description: 'Complex production-grade video service coming soon.',
            category: 'Advanced Video',
            serviceType: 'One-Time Service',
        },
        fr: {
            title: 'Vidéo Promo Avancée (Bientôt)',
            description: 'Service vidéo de qualité production — bientôt disponible.',
            category: 'Vidéo Avancée',
            serviceType: 'Service Ponctuel',
        },
    },
    'svc-web-landing-page': {
        en: {
            title: 'Web & Landing Page Design (Coming Soon)',
            description: 'Soon: high-converting landing pages and websites.',
            category: 'Web Design',
            serviceType: 'One-Time Service',
        },
        fr: {
            title: 'Création de Sites et Landing Pages (Bientôt)',
            description: 'Bientôt: pages de destination et sites web à haute conversion.',
            category: 'Design Web',
            serviceType: 'Service Ponctuel',
        },
    },
};

const SERVICE_DETAIL_ALIASES = {
    'svc-social-media-post': 'svc-social-media-designs',
    'svc-logo-design': 'svc-logo-design',
    'svc-digital-banner': 'svc-digital-banners',
    'svc-presentation': 'svc-pitch-deck',
    'svc-short-video': 'svc-short-video',
    'svc-monthly-content': 'svc-professional-design',
    'svc-brand-identity': 'svc-brand-identity',
    'svc-professional-design': 'svc-professional-design',
    'svc-short-videos-premium': 'svc-short-videos-premium',
    'svc-advanced-promo-video': 'svc-advanced-promo-video',
    'svc-web-landing-page': 'svc-web-landing-page',
};

const SERVICE_DETAIL_ROUTES = {
    'svc-social-media-designs': 'service-social-media-designs.html',
    'svc-logo-design': 'service-logo-design.html',
    'svc-digital-banners': 'service-digital-banners.html',
    'svc-pitch-deck': 'service-pitch-deck.html',
    'svc-short-video': 'service-short-video.html',
    'svc-professional-design': 'service-professional-design.html',
    'svc-short-videos-premium': 'service-short-videos-premium.html',
    'svc-advanced-promo-video': 'service-advanced-promo-video.html',
    'svc-web-landing-page': 'service-web-landing-page.html',
    'svc-brand-identity': 'service-brand-identity.html',
};

const SERVICE_DETAIL_CONTENT = {
    'svc-social-media-designs': {
        image: 'https://www.pixelonevisuals.tech/og/social-media-designs-1200x630.svg',
        imageAlt: 'تصاميم سوشيال ميديا احترافية على شاشة حاسوب',
        deliverables: [
            'تصميم منشورات ثابتة متوافقة مع Instagram وFacebook وLinkedIn.',
            'نسختان مقاس لكل منصة حسب نوع النشر (Feed/Story عند الحاجة).',
            'تسليم بصيغ JPG/PNG جاهزة للنشر بجودة عالية.',
            'تنسيق بصري متناسق مع هوية نشاطك وألوانه الرسمية.',
        ],
        requirements: [
            'شعار العلامة التجارية (PNG أو SVG إن توفر).',
            'الألوان والخطوط المعتمدة أو أمثلة مرجعية.',
            'النص المطلوب داخل التصميم وعرض اليوم/المنتج.',
            'المنصة المستهدفة وموعد النشر المتوقع.',
        ],
        workflow: [
            'تحليل الهدف الإعلاني والجمهور المستهدف.',
            'تجهيز مسودة تصميم أولى للمراجعة.',
            'تطبيق التعديلات داخل النطاق المتفق عليه.',
            'التسليم النهائي بصيغ النشر المعتمدة.',
        ],
        turnaround: 'من 24 إلى 72 ساعة حسب حجم الطلب.',
        revisions: 'جولتا تعديل ضمن نفس الفكرة.',
    },
    'svc-logo-design': {
        image: 'https://www.pixelonevisuals.tech/og/logo-design-1200x630.svg',
        imageAlt: 'عملية تصميم شعار احترافي',
        deliverables: [
            'شعار أساسي واضح وقابل للاستخدام في جميع المنصات.',
            'نسخة بخلفية شفافة PNG عالية الجودة.',
            'نسخة متجهة SVG أو PDF للطباعة عند الحاجة.',
            'نسخ لونية رئيسية (ملون، أبيض، أسود).',
        ],
        requirements: [
            'اسم المشروع كما سيظهر داخل الشعار.',
            'مجال النشاط والجمهور المستهدف.',
            'أمثلة شعارات تعجبك وأخرى لا تناسبك.',
            'تفضيلات الألوان أو الاتجاه البصري المطلوب.',
        ],
        workflow: [
            'بحث سريع للمجال وتحديد الاتجاه البصري.',
            'اقتراحات أولية للشعار.',
            'تطوير النسخة المعتمدة بعد المراجعة.',
            'تسليم الملفات النهائية المنظمة.',
        ],
        turnaround: 'من 2 إلى 5 أيام عمل.',
        revisions: 'جولتا تعديل على النسخة المختارة.',
    },
    'svc-digital-banners': {
        image: 'https://www.pixelonevisuals.tech/og/digital-banners-1200x630.svg',
        imageAlt: 'بانرات وإعلانات رقمية لمواقع التواصل',
        deliverables: [
            'بانرات إعلانية بمقاسات معتمدة للمنصات المطلوبة.',
            'نسخ متعددة للحملة عند الحاجة (A/B بسيط).',
            'تنسيق بصري يركز على CTA واضح وقابل للنقر.',
            'تسليم جاهز للنشر بصيغة JPG/PNG.',
        ],
        requirements: [
            'هدف الحملة (مبيعات، رسائل، زيارات، تعريف).',
            'العرض أو النص الإعلاني النهائي.',
            'الصور/المنتج أو الروابط المرجعية.',
            'المنصة والمقاسات المطلوبة.',
        ],
        workflow: [
            'تحويل العرض التجاري إلى رسالة بصرية مباشرة.',
            'تصميم نسخة أولى للحملة.',
            'تحسين التصميم حسب الملاحظات.',
            'تسليم المقاسات النهائية للنشر.',
        ],
        turnaround: 'من 24 إلى 72 ساعة.',
        revisions: 'جولتا تعديل ضمن نفس الحملة.',
    },
    'svc-pitch-deck': {
        image: 'https://www.pixelonevisuals.tech/og/pitch-deck-1200x630.svg',
        imageAlt: 'تصميم عرض تقديمي احترافي للأعمال',
        deliverables: [
            'تصميم عرض تقديمي بهيكل بصري احترافي.',
            'تنسيق الشرائح بعناوين واضحة وتسلسل مقنع.',
            'نسخة PowerPoint أو PDF جاهزة للعرض.',
            'توحيد الألوان والخطوط بما يخدم صورة المشروع.',
        ],
        requirements: [
            'المحتوى النصي الأساسي لكل شريحة.',
            'نوع العرض: مستثمرين، مبيعات، تعريف شركة.',
            'هوية بصرية أو شعار الشركة.',
            'عدد الشرائح المتوقع والموعد النهائي.',
        ],
        workflow: [
            'تنظيم المحتوى في هيكل واضح ومقنع.',
            'تصميم الشرائح بنمط موحد.',
            'مراجعة وتحسين قابلية القراءة والإقناع.',
            'تسليم نسخة العرض النهائية.',
        ],
        turnaround: 'من 2 إلى 6 أيام حسب عدد الشرائح.',
        revisions: 'جولتا تعديل على النسخة الأولية.',
    },
    'svc-short-video': {
        image: 'https://www.pixelonevisuals.tech/og/short-video-1200x630.svg',
        imageAlt: 'مونتاج فيديو قصير لمنصات التواصل',
        deliverables: [
            'مونتاج فيديو قصير مناسب لـ Reels/TikTok/Shorts.',
            'إيقاع سريع مع نصوص وحركات انتقال مناسبة.',
            'تحسين بصري ولوني أساسي مع صوت متوازن.',
            'تسليم MP4 بجودة مناسبة للنشر.',
        ],
        requirements: [
            'مقاطع الفيديو الخام أو رابط تحميل واضح.',
            'الفكرة أو السيناريو المختصر.',
            'النصوص المطلوبة على الشاشة.',
            'المنصة المستهدفة والمدة التقريبية.',
        ],
        workflow: [
            'فرز اللقطات وتحديد التسلسل الأفضل.',
            'مونتاج أولي وإضافة النصوص.',
            'تحسين الإيقاع والمظهر النهائي.',
            'تسليم نسخة جاهزة للنشر.',
        ],
        turnaround: 'من 24 إلى 96 ساعة حسب جودة المواد.',
        revisions: 'جولتا تعديل داخل نفس المدة المتفق عليها.',
    },
    'svc-professional-design': {
        image: 'https://www.pixelonevisuals.tech/og/professional-design-1200x630.svg',
        imageAlt: 'باقة تصميم احترافية متكاملة للعلامة التجارية',
        deliverables: [
            'خطة تصميم متكاملة حسب احتياج المشروع.',
            'حزمة عناصر بصرية للهوية والمحتوى.',
            'قوالب أساسية للاستخدام المتكرر.',
            'تسليم منظم للملفات مع هيكلة واضحة.',
        ],
        requirements: [
            'وصف دقيق للنشاط التجاري وأهداف المرحلة.',
            'الأولوية بين الهوية والمحتوى الإعلاني.',
            'أمثلة مرجعية للاتجاه المرغوب.',
            'نقطة اتصال واحدة لاعتماد المراجعات بسرعة.',
        ],
        workflow: [
            'جلسة فهم النطاق وتحديد الأولويات.',
            'تصميم أولي للمسار البصري.',
            'مراجعات مرحلية مع اعتماد نهائي.',
            'تسليم الحزمة الكاملة بشكل منظم.',
        ],
        turnaround: 'من 5 إلى 12 يوم عمل حسب النطاق.',
        revisions: 'مراجعات مرحلية متفق عليها مسبقاً.',
    },
    'svc-short-videos-premium': {
        image: 'https://www.pixelonevisuals.tech/og/short-videos-premium-1200x630.svg',
        imageAlt: 'فيديوهات قصيرة بجودة أعلى لمنصات التواصل',
        deliverables: [
            'مونتاج فيديو قصير بجودة أعلى من الباقة الأساسية.',
            'تحسين احترافي للألوان والصوت والإيقاع.',
            'نسخة أساسية + نسخة بديلة للـ Hook إذا لزم.',
            'تسليم نهائي مناسب للإعلانات أو النشر العضوي.',
        ],
        requirements: [
            'لقطات واضحة بدقة جيدة.',
            'هدف الفيديو (تعريف، بيع، تفاعل).',
            'النصوص أو العبارات المطلوبة داخل الفيديو.',
            'هوية المشروع أو مرجع بصري للحملة.',
        ],
        workflow: [
            'صياغة خط زمني قصير يركز على النتيجة.',
            'تنفيذ مونتاج احترافي مع تحسينات بصرية.',
            'مراجعة نهائية وضبط النسخة الأخيرة.',
            'تسليم الملف النهائي بجودة عالية.',
        ],
        turnaround: 'من 2 إلى 5 أيام.',
        revisions: 'جولتا تعديل على النسخة الأولية.',
    },
    'svc-advanced-promo-video': {
        image: 'https://www.pixelonevisuals.tech/og/advanced-promo-video-1200x630.svg',
        imageAlt: 'فيديو ترويجي متقدم بجودة إنتاجية عالية',
        deliverables: [
            'خدمة قادمة لإنتاج فيديو ترويجي متقدم.',
            'سيناريو بصري أقوى متعدد اللقطات.',
            'معالجة فنية أعلى للمؤثرات والهوية.',
            'مخرجات مناسبة لحملات احترافية موسعة.',
        ],
        requirements: [
            'ملف تعريفي بالمشروع والهدف من الفيديو.',
            'المواد الخام أو خطة تصوير واضحة.',
            'الميزانية والموعد المطلوب للتسليم.',
            'أمثلة مرجعية لمستوى الإنتاج المطلوب.',
        ],
        workflow: [
            'مرحلة دراسة نطاق الإنتاج.',
            'اقتراح سيناريو وإطار زمني تفصيلي.',
            'تنفيذ ومراجعات على مراحل.',
            'تسليم نسخة نهائية عالية الجودة.',
        ],
        turnaround: 'قريباً — سيتم تحديد المدة حسب نطاق الإنتاج.',
        revisions: 'قريباً — حسب باقة التنفيذ النهائية.',
    },
    'svc-web-landing-page': {
        image: 'https://www.pixelonevisuals.tech/og/web-landing-page-1200x630.svg',
        imageAlt: 'تصميم مواقع وصفحات هبوط احترافية',
        deliverables: [
            'خدمة قادمة لتصميم صفحات هبوط ومواقع تعريفية.',
            'هيكلة صفحة تركّز على التحويل والوضوح.',
            'تصميم متجاوب للهواتف والكمبيوتر.',
            'واجهة حديثة تعكس هوية النشاط التجاري.',
        ],
        requirements: [
            'وصف الخدمة أو المنتج المستهدف.',
            'النصوص الرئيسية وصور الهوية.',
            'الهدف من الصفحة (طلبات، رسائل، مبيعات).',
            'الدومين والاستضافة إذا كانت متوفرة.',
        ],
        workflow: [
            'تخطيط هيكل الصفحة حسب هدف التحويل.',
            'تصميم واجهة أولية للمراجعة.',
            'تحسين المحتوى وتجربة الاستخدام.',
            'تسليم النسخة النهائية الجاهزة للنشر.',
        ],
        turnaround: 'قريباً — سيتم تفعيلها ضمن باقات الويب.',
        revisions: 'قريباً — حسب نوع المشروع.',
    },
    'svc-brand-identity': {
        image: 'https://www.pixelonevisuals.tech/og/brand-identity-1200x630.svg',
        imageAlt: 'بناء هوية بصرية للعلامة التجارية',
        deliverables: [
            'خدمة قادمة لإعداد هوية بصرية أساسية متناسقة.',
            'شعار رئيسي مع لوحة ألوان وخطوط مقترحة.',
            'دليل مبسط لاستخدام الهوية في السوشيال.',
            'نماذج تطبيق أولية على منشورات رقمية.',
        ],
        requirements: [
            'اسم المشروع وطبيعة نشاطه.',
            'القيم أو الشخصية التي تريد إظهارها بصرياً.',
            'أمثلة مرجعية لهويات قريبة من ذوقك.',
            'الجمهور المستهدف داخل السوق المغربي.',
        ],
        workflow: [
            'دراسة هوية النشاط وتحديد الاتجاه البصري.',
            'اقتراح المسار الإبداعي الأولي.',
            'تطوير الهوية بناء على المراجعة.',
            'تسليم الملفات النهائية بشكل منظم.',
        ],
        turnaround: 'قريباً — الخدمة قيد التجهيز.',
        revisions: 'قريباً — حسب الباقة النهائية.',
    },
};

const ORDER_STORAGE_FALLBACK_KEY = 'pixelone_orders_v1';
const OFFERS_STORAGE_KEY = 'pixelone_offers_v1';
const SERVICES_STORAGE_KEY = 'pixelone_services_v2';
const DISPUTES_STORAGE_KEY = 'pixelone_disputes_v1';
const DISCOUNTS_STORAGE_KEY = 'pixelone_discounts_v1';

const DEFAULT_SITE_SETTINGS = {
    brand: {
        name: 'Pixel One Visuals',
        supportEmail: 'support@pixelonevisuals.tech',
    },
    orders: {
        storageKey: ORDER_STORAGE_FALLBACK_KEY,
        defaultStatus: 'تم استلام الطلب',
        showOnlyCurrentUser: true,
        adminEmails: [
            'superadmin@pixelonevisuals.tech',
            'support@pixelonevisuals.tech',
            'contact@pixelonevisuals.tech',
        ],
        adminDomains: [],
    },
    contact: {
        whatsappNumber: '212661234567',
        country: 'MA',
        email: 'contact@pixelonevisuals.tech',
    },
};

const DEFAULT_OFFERS = [];

const DEFAULT_DISCOUNT_SETTINGS = {
    global: {
        enabled: false,
        code: '',
        type: 'percent',
        value: 0,
        endsAt: '',
    },
    customerRules: [],
};

const DEFAULT_MANAGED_SERVICES = [
    {
        id: 'svc-social-media-post',
        titles: { ar: 'تصميم منشور سوشيال ميديا' },
        price: '30',
        descriptions: { ar: 'تصميم منشور واحد جاهز للنشر على Instagram أو Facebook أو LinkedIn بتنسيق احترافي.' },
        category: 'سوشيال ميديا',
        serviceType: 'خدمة لمرة واحدة',
        is_coming_soon: false,
        popularity: 1,
        enabled: true,
    },
    {
        id: 'svc-logo-design',
        titles: { ar: 'تصميم شعار' },
        price: '80',
        descriptions: { ar: 'شعار عصري وواضح مناسب للمشاريع الناشئة والمتاجر الإلكترونية، يُسلّم بخلفية شفافة.' },
        category: 'هوية بصرية',
        serviceType: 'خدمة لمرة واحدة',
        is_coming_soon: false,
        popularity: 2,
        enabled: true,
    },
    {
        id: 'svc-digital-banner',
        titles: { ar: 'بانر إعلاني رقمي' },
        price: '50',
        descriptions: { ar: 'بانر جاهز للحملات الإعلانية على Facebook وInstagram بمقاسات النشر المعتمدة.' },
        category: 'إعلانات رقمية',
        serviceType: 'خدمة لمرة واحدة',
        is_coming_soon: false,
        popularity: 3,
        enabled: true,
    },
    {
        id: 'svc-presentation',
        titles: { ar: 'تصميم عرض تقديمي' },
        price: '150',
        descriptions: { ar: 'عرض تقديمي احترافي حتى 15 شريحة، مناسب للاجتماعات والعروض التجارية.' },
        category: 'أعمال تجارية',
        serviceType: 'خدمة لمرة واحدة',
        is_coming_soon: false,
        popularity: 4,
        enabled: true,
    },
    {
        id: 'svc-short-video',
        titles: { ar: 'مونتاج فيديو قصير (Reels/TikTok)' },
        price: '60',
        descriptions: { ar: 'مونتاج فيديو قصير (حتى 60 ثانية) مع نصوص متحركة وموسيقى مناسبة.' },
        category: 'مونتاج فيديو',
        serviceType: 'خدمة لمرة واحدة',
        is_coming_soon: false,
        popularity: 5,
        enabled: true,
    },
    {
        id: 'svc-monthly-content',
        titles: { ar: 'باقة محتوى شهري' },
        price: '450',
        descriptions: { ar: '15 تصميم سوشيال ميديا + 4 فيديوهات قصيرة شهرياً — مناسبة للمشاريع النشطة.' },
        category: 'باقات شهرية',
        serviceType: 'اشتراك شهري',
        is_coming_soon: false,
        popularity: 6,
        enabled: true,
    },
    {
        id: 'svc-brand-identity',
        titles: { ar: 'هوية بصرية أساسية (قريباً)' },
        price: '300',
        descriptions: { ar: 'شعار + لوحة ألوان + خطوط + 3 نماذج تصميم سوشيال ميديا كتطبيق مبدئي.' },
        category: 'هوية بصرية',
        serviceType: 'خدمة لمرة واحدة',
        is_coming_soon: true,
        popularity: 7,
        enabled: true,
    },
];

const ORDER_STATUS_OPTIONS = [
    'تم استلام الطلب',
    'مقبول',
    'يحتاج تعديلات',
    'قيد التنفيذ',
    'مكتمل',
];

const TABLES = {
    services: 'pixel_services',
    offers: 'pixel_offers',
    orders: 'pixel_orders',
    disputes: 'pixel_disputes',
    discountsGlobal: 'pixel_discounts_global',
    discountsCustomer: 'pixel_discounts_customer',
    adminUsers: 'pixel_admin_users',
    inviteAudit: 'pixel_invite_audit',
    i18nPages: 'pixel_i18n_pages',
};

let siteSettings = { ...DEFAULT_SITE_SETTINGS };
let currentSessionUser = null;
let dataSourceMode = 'fallback';
let pageLoaderController = null;

function getLoaderContext() {
    return null;
}

function createPageLoader(initialStatus) {
    void initialStatus;
    return null;
}

function ensurePageLoader() {
    const context = getLoaderContext();
    if (!context) return null;
    if (pageLoaderController) return pageLoaderController;

    pageLoaderController = createPageLoader(context.status);
    return pageLoaderController;
}

function setPageLoaderStatus(text) {
    if (pageLoaderController && typeof pageLoaderController.setStatus === 'function') {
        pageLoaderController.setStatus(text);
    }
}

async function finalizePageLoader() {
    if (!pageLoaderController) return;
    pageLoaderController = null;
}

const runtimeStore = {
    orders: [],
    offers: [],
    services: [],
    disputes: [],
    discounts: {
        global: { ...DEFAULT_DISCOUNT_SETTINGS.global },
        customerRules: [],
    },
};

function cloneData(value) {
    return JSON.parse(JSON.stringify(value));
}

function safeStorageGet(key) {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function safeStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // If storage is blocked (private mode/policy), keep app functional in memory.
    }
}

function safeStorageRemove(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        // Ignore storage permission errors.
    }
}

function readLocalJson(key, fallbackValue) {
    try {
        const raw = safeStorageGet(key);
        if (!raw) return cloneData(fallbackValue);
        const parsed = JSON.parse(raw);
        return parsed ?? cloneData(fallbackValue);
    } catch {
        return cloneData(fallbackValue);
    }
}

function writeLocalJson(key, value) {
    safeStorageSet(key, JSON.stringify(value));
}

function serviceToRow(service) {
    return {
        id: service.id,
        title_ar: service.titles?.ar || '',
        description_ar: service.descriptions?.ar || '',
        price: String(service.price ?? '0'),
        category: service.category || 'خدمة بصرية',
        is_coming_soon: Boolean(service.is_coming_soon),
        popularity: Number.parseInt(service.popularity, 10) || 999,
        enabled: service.enabled !== false,
        created_at: service.createdAt || new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
}

function serviceFromRow(row, index = 0) {
    return normalizeManagedService({
        id: row.id,
        titles: { ar: row.title_ar },
        descriptions: { ar: row.description_ar },
        category: row.category,
        price: row.price,
        is_coming_soon: row.is_coming_soon,
        popularity: row.popularity,
        enabled: row.enabled,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    }, index);
}

function offerToRow(offer) {
    return {
        id: offer.id,
        title: offer.title || '',
        description: offer.description || '',
        badge: offer.badge || '',
        target: offer.target || 'all',
        target_email: offer.targetEmail || '',
        enabled: Boolean(offer.enabled),
        created_at: offer.createdAt || new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
}

function offerFromRow(row) {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        badge: row.badge,
        target: row.target,
        targetEmail: row.target_email || '',
        enabled: Boolean(row.enabled),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function orderToRow(order) {
    return {
        id: order.id,
        service_name: order.serviceName || '',
        customer_name: order.name || '',
        customer_phone: order.phone || '',
        customer_email: order.email || '',
        specs: order.specs || '',
        status: order.status || DEFAULT_SITE_SETTINGS.orders.defaultStatus,
        support_email: order.supportEmail || '',
        created_at: order.createdAt || new Date().toISOString(),
        last_update_at: order.lastUpdateAt || order.createdAt || new Date().toISOString(),
        user_id: order.userId || null,
        user_email: order.userEmail || '',
        final_price: order.finalPrice || '',
        discount_code: order.discountCode || '',
    };
}

function orderFromRow(row) {
    return {
        id: row.id,
        trackingCode: row.tracking_code || row.id,
        serviceName: row.service_name,
        name: row.customer_name,
        phone: row.customer_phone,
        email: row.customer_email,
        specs: row.specs,
        status: row.status,
        supportEmail: row.support_email,
        createdAt: row.created_at,
        lastUpdateAt: row.last_update_at,
        userId: row.user_id,
        userEmail: row.user_email,
        finalPrice: row.final_price,
        discountCode: row.discount_code,
    };
}

function disputeToRow(dispute) {
    return {
        id: dispute.id,
        order_id: dispute.orderId || '',
        client_email: dispute.clientEmail || '',
        amount: Number.parseFloat(dispute.amount || 0) || 0,
        currency: dispute.currency || 'MAD',
        channel: dispute.channel || 'other',
        status: dispute.status || 'open',
        reason: dispute.reason || '',
        notes: dispute.notes || '',
        created_at: dispute.createdAt || new Date().toISOString(),
        updated_at: dispute.updatedAt || new Date().toISOString(),
    };
}

function disputeFromRow(row) {
    return {
        id: row.id,
        orderId: row.order_id,
        clientEmail: row.client_email,
        amount: row.amount,
        currency: row.currency,
        channel: row.channel,
        status: row.status,
        reason: row.reason,
        notes: row.notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

async function loadSiteSettings() {
    try {
        const res = await fetch('site-settings.json', { cache: 'no-store' });
        if (!res.ok) return;

        const json = await res.json();
        siteSettings = {
            ...DEFAULT_SITE_SETTINGS,
            ...json,
            brand: { ...DEFAULT_SITE_SETTINGS.brand, ...(json.brand || {}) },
            orders: { ...DEFAULT_SITE_SETTINGS.orders, ...(json.orders || {}) },
            contact: { ...DEFAULT_SITE_SETTINGS.contact, ...(json.contact || {}) },
        };
    } catch {
        siteSettings = { ...DEFAULT_SITE_SETTINGS };
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function normalizeLang(lang) {
    const value = String(lang || '').trim().toLowerCase();
    return I18N_LANGS.includes(value) ? value : I18N_DEFAULT_LANG;
}

function getCurrentLanguage() {
    const htmlLang = document?.documentElement?.getAttribute('lang') || '';
    return normalizeLang(safeStorageGet(I18N_STORAGE_KEY) || htmlLang || I18N_DEFAULT_LANG);
}

function t(key) {
    const lang = getCurrentLanguage();
    return UI_TEXT[lang]?.[key] || UI_TEXT.ar?.[key] || key;
}

function normalizePageSlug(slug) {
    return String(slug || '')
        .trim()
        .toLowerCase()
        .replace(/\.html$/i, '')
        .replace(/[^a-z0-9\-]/g, '');
}

function normalizeI18nPayload(payload) {
    return {
        title: String(payload?.title || ''),
        metaDescription: String(payload?.metaDescription || ''),
        texts: Array.isArray(payload?.texts) ? payload.texts.map((line) => String(line || '')) : [],
        attributes: Array.isArray(payload?.attributes) ? payload.attributes : [],
    };
}

function mergeI18nPayload(base, override) {
    const safeBase = normalizeI18nPayload(base);
    const safeOverride = normalizeI18nPayload(override);

    return {
        title: safeOverride.title || safeBase.title,
        metaDescription: safeOverride.metaDescription || safeBase.metaDescription,
        texts: safeOverride.texts.length > 0 ? safeOverride.texts : safeBase.texts,
        attributes: safeOverride.attributes.length > 0 ? safeOverride.attributes : safeBase.attributes,
    };
}

function parsePrice(value) {
    const numeric = Number.parseFloat(String(value || '').replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) ? numeric : null;
}

function formatMoneyMAD(value) {
    try {
        return new Intl.NumberFormat('ar-MA', {
            style: 'currency',
            currency: 'MAD',
            maximumFractionDigits: 2,
        }).format(value);
    } catch {
        return `${value} MAD`;
    }
}

function formatLocalizedDateTime(isoString) {
    try {
        const lang = getCurrentLanguage();
        const locale = lang === 'fr' ? 'fr-FR' : (lang === 'en' ? 'en-US' : 'ar-MA');
        return new Date(isoString).toLocaleString(locale, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return isoString;
    }
}

function formatArabicDateTime(isoString) {
    return formatLocalizedDateTime(isoString);
}

function normalizeStatusKey(status) {
    const value = String(status || '').trim().toLowerCase();
    if (!value) return 'received';

    if (['received', 'تم استلام الطلب'].includes(value)) return 'received';
    if (['accepted', 'مقبول'].includes(value)) return 'accepted';
    if (['needs_changes', 'needs changes', 'يحتاج تعديلات'].includes(value)) return 'needs_changes';
    if (['in_progress', 'in progress', 'قيد التنفيذ'].includes(value)) return 'in_progress';
    if (['completed', 'مكتمل'].includes(value)) return 'completed';

    return 'received';
}

function getLocalizedOrderStatus(status) {
    const key = normalizeStatusKey(status);
    const lang = getCurrentLanguage();

    const labels = {
        ar: {
            received: 'تم استلام الطلب',
            accepted: 'مقبول',
            needs_changes: 'يحتاج تعديلات',
            in_progress: 'قيد التنفيذ',
            completed: 'مكتمل',
        },
        en: {
            received: 'Order Received',
            accepted: 'Accepted',
            needs_changes: 'Needs Changes',
            in_progress: 'In Progress',
            completed: 'Completed',
        },
        fr: {
            received: 'Commande Recue',
            accepted: 'Acceptee',
            needs_changes: 'Modifications Requises',
            in_progress: 'En Cours',
            completed: 'Terminee',
        },
    };

    return labels[lang]?.[key] || labels.ar[key];
}

function formatDateInput(isoString) {
    if (!isoString) return '';
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return '';
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
}

function getStatusMeta(status) {
    const statusKey = normalizeStatusKey(status);
    if (statusKey === 'accepted') return { className: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200' };
    if (statusKey === 'needs_changes') return { className: 'border-orange-400/40 bg-orange-500/10 text-orange-200' };
    if (statusKey === 'in_progress') return { className: 'border-blue-400/40 bg-blue-500/10 text-blue-200' };
    if (statusKey === 'completed') return { className: 'border-violet-400/40 bg-violet-500/10 text-violet-200' };
    return { className: 'border-amber-400/40 bg-amber-500/10 text-amber-200' };
}

function generateTrackingCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let seed = '';
    for (let i = 0; i < 6; i += 1) {
        seed += chars[Math.floor(Math.random() * chars.length)];
    }
    return `PO-${seed}`;
}

function localizeCustomServiceName(rawName) {
    const value = String(rawName || '').trim();
    if (!value) return t('customServiceName');

    const known = ['طلب خدمة مخصص', 'custom service request', 'demande de service personnalisee'];
    if (known.includes(value.toLowerCase())) {
        return t('customServiceName');
    }

    return value;
}

function buildMailtoLink(email, subject) {
    return `mailto:${email}?subject=${encodeURIComponent(subject || '')}`;
}

function buildGmailComposeLink(email, subject) {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject || '')}`;
}

function wireEmailLink(linkEl, email, subject) {
    if (!linkEl || !email) return;

    const mailto = buildMailtoLink(email, subject);
    linkEl.href = mailto;

    linkEl.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = mailto;

        setTimeout(() => {
            if (document.visibilityState === 'visible') {
                window.open(buildGmailComposeLink(email, subject), '_blank', 'noopener');
            }
        }, 700);
    });
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getAuthMsgBox() {
    return document.getElementById('msgBox') || document.getElementById('securityMsgBox');
}

function showAuthMessage(text, type = 'success') {
    const msgBox = getAuthMsgBox();
    if (!msgBox) return;

    msgBox.textContent = text;
    msgBox.className = `msg-box ${type === 'error' ? 'msg-error' : 'msg-success'} active`;
}

function showInlineMessage(msgBox, text, type = 'success') {
    if (!msgBox) return;
    msgBox.textContent = text;
    msgBox.className = `msg-box ${type === 'error' ? 'msg-error' : 'msg-success'} active`;
}

const AUTH_RATE_LIMIT_STORAGE_PREFIX = 'pixelone_auth_cooldown_v1';
const AUTH_RATE_LIMIT_DEFAULT_SECONDS = {
    signup: 60,
    magiclink: 60,
    reset: 60,
    resend: 60,
};

function getAuthCooldownKey(action, email = '') {
    return `${AUTH_RATE_LIMIT_STORAGE_PREFIX}:${action}:${normalizeEmail(email) || 'global'}`;
}

function setAuthCooldown(action, email = '', seconds = 60) {
    const key = getAuthCooldownKey(action, email);
    const until = Date.now() + Math.max(5, Number(seconds) || 60) * 1000;
    safeStorageSet(key, String(until));
}

function getAuthCooldownRemaining(action, email = '') {
    const key = getAuthCooldownKey(action, email);
    const raw = safeStorageGet(key);
    if (!raw) return 0;
    const until = Number.parseInt(raw, 10);
    if (!Number.isFinite(until)) {
        safeStorageRemove(key);
        return 0;
    }
    const remainingMs = until - Date.now();
    if (remainingMs <= 0) {
        safeStorageRemove(key);
        return 0;
    }
    return Math.ceil(remainingMs / 1000);
}

function extractRetryAfterSeconds(error) {
    const raw = String(error?.message || '').toLowerCase();
    const match = raw.match(/(\d+)\s*(second|seconds|sec|s|minute|minutes|min|m)/i);
    if (match) {
        const value = Number.parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        if (Number.isFinite(value) && value > 0) {
            return unit.startsWith('m') ? value * 60 : value;
        }
    }
    return null;
}

function isRateLimitAuthError(error) {
    const message = String(error?.message || '').toLowerCase();
    const status = String(error?.status || '').toLowerCase();
    return (
        message.includes('rate limit')
        || message.includes('too many requests')
        || status === '429'
    );
}

function getFriendlyAuthErrorMessage(error, fallback = 'تعذر إكمال العملية.') {
    const message = String(error?.message || '');
    const normalized = message.toLowerCase();

    if (isRateLimitAuthError(error)) {
        return 'تم تجاوز الحد المسموح مؤقتًا لإرسال الرسائل. انتظر قليلًا ثم أعد المحاولة.';
    }
    if (normalized.includes('error sending confirmation email')) {
        return 'تعذر إرسال رسالة تأكيد البريد من الخادم حالياً. يرجى المحاولة بعد قليل أو التواصل مع الدعم لأن إعدادات البريد تحتاج مراجعة.';
    }
    if (normalized.includes('smtp')) {
        return 'خدمة البريد غير متاحة حالياً (SMTP). حاول لاحقًا أو تواصل مع الدعم التقني.';
    }
    if (message.includes('Invalid login') || message.includes('invalid_credentials')) {
        return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
    }
    if (message.includes('User already registered')) {
        return 'هذا البريد الإلكتروني مسجل مسبقًا.';
    }
    if (message.includes('Email not confirmed')) {
        return 'البريد الإلكتروني غير مؤكد بعد. افحص بريدك أو اضغط إعادة إرسال التأكيد.';
    }
    if (message.includes('Invalid Refresh Token')) {
        return 'انتهت الجلسة السابقة. أعد تسجيل الدخول.';
    }

    return message || fallback;
}

function buildAppUrl(pageName, query = {}) {
    const inPixelonePath = window.location.pathname.includes('/pixelone/');
    const basePath = inPixelonePath ? '/pixelone/' : '/';
    const url = new URL(`${window.location.origin}${basePath}${pageName}`);

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && String(value).length > 0) {
            url.searchParams.set(key, String(value));
        }
    });

    return url.toString();
}

function getLoginPageUrl() {
    return buildAppUrl('client-login.html');
}

function getDashboardUrl() {
    return buildAppUrl('dashboard.html');
}

function getAuthCallbackUrl(action = '') {
    return buildAppUrl('auth-callback.html', { action });
}

function stripSensitiveAuthParamsFromUrl() {
    const url = new URL(window.location.href);
    const sensitiveParams = [
        'code',
        'token_hash',
        'access_token',
        'refresh_token',
        'expires_at',
        'expires_in',
        'provider_token',
        'provider_refresh_token',
    ];

    sensitiveParams.forEach((key) => url.searchParams.delete(key));

    const cleanQuery = url.searchParams.toString();
    const next = `${url.pathname}${cleanQuery ? `?${cleanQuery}` : ''}`;
    window.history.replaceState({}, document.title, next);
}

async function consumeIncomingAuthLink() {
    const url = new URL(window.location.href);
    const search = url.searchParams;
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));

    const authType = hash.get('type') || search.get('type') || search.get('action') || '';
    const authCode = search.get('code');
    const tokenHash = search.get('token_hash') || hash.get('token_hash');
    const accessToken = hash.get('access_token') || search.get('access_token');
    const refreshToken = hash.get('refresh_token') || search.get('refresh_token');

    const hasAuthPayload = Boolean(authCode || tokenHash || (accessToken && refreshToken));
    if (!hasAuthPayload) {
        return { handled: false, authType };
    }

    if (authCode) {
        const { error } = await _supabase.auth.exchangeCodeForSession(authCode);
        if (error) throw error;
        stripSensitiveAuthParamsFromUrl();
        return { handled: true, authType };
    }

    if (tokenHash && authType) {
        const { error } = await _supabase.auth.verifyOtp({
            type: authType,
            token_hash: tokenHash,
        });
        if (error) throw error;
        stripSensitiveAuthParamsFromUrl();
        return { handled: true, authType };
    }

    if (accessToken && refreshToken) {
        const { error } = await _supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
        if (error) throw error;
        stripSensitiveAuthParamsFromUrl();
        return { handled: true, authType };
    }

    return { handled: false, authType };
}

function getOrdersStorageKey() {
    return siteSettings.orders?.storageKey || ORDER_STORAGE_FALLBACK_KEY;
}

function getLocalOrders() {
    const parsed = readLocalJson(getOrdersStorageKey(), []);
    return Array.isArray(parsed) ? parsed : [];
}

function getLocalOffers() {
    const parsed = readLocalJson(OFFERS_STORAGE_KEY, DEFAULT_OFFERS);
    return Array.isArray(parsed) ? parsed : cloneData(DEFAULT_OFFERS);
}

function getLocalServices() {
    const stored = readLocalJson(SERVICES_STORAGE_KEY, []);
    if (Array.isArray(stored) && stored.length > 0) return stored;
    return DEFAULT_MANAGED_SERVICES.map((service, index) => normalizeManagedService(service, index));
}

function enforceExclusiveServiceCatalog() {
    // Only apply defaults when runtimeStore has no services (Supabase returned empty).
    if (runtimeStore.services && runtimeStore.services.length > 0) return;
    runtimeStore.services = DEFAULT_MANAGED_SERVICES.map((service, index) => normalizeManagedService(service, index));
    writeLocalJson(SERVICES_STORAGE_KEY, runtimeStore.services);
}

function getLocalDisputes() {
    const parsed = readLocalJson(DISPUTES_STORAGE_KEY, []);
    return Array.isArray(parsed) ? parsed : [];
}

function getLocalDiscounts() {
    const parsed = readLocalJson(DISCOUNTS_STORAGE_KEY, DEFAULT_DISCOUNT_SETTINGS);
    return {
        global: {
            ...DEFAULT_DISCOUNT_SETTINGS.global,
            ...(parsed.global || {}),
        },
        customerRules: Array.isArray(parsed.customerRules) ? parsed.customerRules : [],
    };
}

async function fetchAllRows(table, orderBy) {
    let query = _supabase.from(table).select('*');
    if (orderBy) {
        query = query.order(orderBy, { ascending: true });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

async function loadAdminEmailsFromDatabase() {
    try {
        const rows = await fetchAllRows(TABLES.adminUsers, 'email');
        const dbEmails = rows.map((row) => normalizeEmail(row.email)).filter(Boolean);
        if (dbEmails.length === 0) return;

        const combined = new Set([
            ...(siteSettings.orders?.adminEmails || []).map(normalizeEmail),
            ...dbEmails,
        ]);

        siteSettings.orders.adminEmails = Array.from(combined);
    } catch {
        // Keep file-based admin settings when table is unavailable.
    }
}

async function hydrateDataStores() {
    const localOrders = getLocalOrders();
    runtimeStore.orders = localOrders;
    runtimeStore.offers = getLocalOffers();
    runtimeStore.services = getLocalServices();
    runtimeStore.disputes = getLocalDisputes();
    runtimeStore.discounts = getLocalDiscounts();

    const results = await Promise.allSettled([
        fetchAllRows(TABLES.services, 'popularity'),
        fetchAllRows(TABLES.offers, 'updated_at'),
        fetchAllRows(TABLES.orders, 'created_at'),
        fetchAllRows(TABLES.disputes, 'created_at'),
        fetchAllRows(TABLES.discountsGlobal, 'id'),
        fetchAllRows(TABLES.discountsCustomer, 'created_at'),
    ]);

    const [servicesResult, offersResult, ordersResult, disputesResult, globalResult, customerResult] = results;

    runtimeStore.services = servicesResult.status === 'fulfilled' && servicesResult.value.length > 0
        ? servicesResult.value.map((row, index) => serviceFromRow(row, index))
        : getLocalServices();

    enforceExclusiveServiceCatalog();

    runtimeStore.offers = offersResult.status === 'fulfilled' && offersResult.value.length > 0
        ? offersResult.value.map(offerFromRow)
        : getLocalOffers();

    if (ordersResult.status === 'fulfilled') {
        const remoteOrders = ordersResult.value.map(orderFromRow);
        const mergedById = new Map();
        remoteOrders.forEach((order) => {
            const key = String(order.id || order.trackingCode || '').trim();
            if (!key) return;
            mergedById.set(key, order);
        });
        localOrders.forEach((order) => {
            const key = String(order.id || order.trackingCode || '').trim();
            if (!key || mergedById.has(key)) return;
            mergedById.set(key, order);
        });
        const mergedOrders = Array.from(mergedById.values()).sort((a, b) => {
            const left = new Date(b.createdAt || 0).getTime();
            const right = new Date(a.createdAt || 0).getTime();
            return left - right;
        });
        runtimeStore.orders = mergedOrders.length > 0 ? mergedOrders : localOrders;
    } else {
        runtimeStore.orders = localOrders;
    }

    runtimeStore.disputes = disputesResult.status === 'fulfilled' && disputesResult.value.length > 0
        ? disputesResult.value.map(disputeFromRow)
        : getLocalDisputes();

    const globalRows = globalResult.status === 'fulfilled' ? globalResult.value : [];
    const customerRows = customerResult.status === 'fulfilled' ? customerResult.value : [];
    runtimeStore.discounts = {
        global: {
            ...DEFAULT_DISCOUNT_SETTINGS.global,
            ...(globalRows[0] ? {
                enabled: Boolean(globalRows[0].enabled),
                code: globalRows[0].code || '',
                type: globalRows[0].discount_type || 'percent',
                value: Number.parseFloat(globalRows[0].discount_value || 0) || 0,
                endsAt: globalRows[0].ends_at || '',
            } : {}),
        },
        customerRules: customerRows.map((row) => ({
            id: row.id,
            email: row.email,
            code: row.code,
            type: row.discount_type,
            value: row.discount_value,
            endsAt: row.ends_at || '',
            enabled: Boolean(row.enabled),
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        })),
    };

    const hasSupabaseData = [servicesResult, offersResult, ordersResult, disputesResult, globalResult, customerResult]
        .some((result) => result.status === 'fulfilled');

    dataSourceMode = hasSupabaseData ? 'supabase' : 'fallback';

    writeLocalJson(getOrdersStorageKey(), runtimeStore.orders);
    writeLocalJson(OFFERS_STORAGE_KEY, runtimeStore.offers);
    writeLocalJson(SERVICES_STORAGE_KEY, runtimeStore.services);
    writeLocalJson(DISPUTES_STORAGE_KEY, runtimeStore.disputes);
    writeLocalJson(DISCOUNTS_STORAGE_KEY, runtimeStore.discounts);
}

async function replaceTableSnapshot(table, rows) {
    if (dataSourceMode !== 'supabase') return;

    const normalizedRows = Array.isArray(rows) ? rows : [];
    const incomingIds = new Set(normalizedRows.map((row) => row.id));

    const { data: existingRows, error: existingError } = await _supabase.from(table).select('id');
    if (existingError) throw existingError;

    const existingIds = (existingRows || []).map((row) => row.id);
    const idsToDelete = existingIds.filter((id) => !incomingIds.has(id));

    if (idsToDelete.length > 0) {
        const { error: deleteError } = await _supabase.from(table).delete().in('id', idsToDelete);
        if (deleteError) throw deleteError;
    }

    if (normalizedRows.length > 0) {
        const { error: upsertError } = await _supabase.from(table).upsert(normalizedRows, { onConflict: 'id' });
        if (upsertError) throw upsertError;
    }
}

function getStoredOrders() {
    return cloneData(runtimeStore.orders);
}

function saveStoredOrders(orders) {
    runtimeStore.orders = Array.isArray(orders) ? cloneData(orders) : [];
    writeLocalJson(getOrdersStorageKey(), runtimeStore.orders);

    if (dataSourceMode === 'supabase') {
        replaceTableSnapshot(TABLES.orders, runtimeStore.orders.map(orderToRow)).catch(() => {
            dataSourceMode = 'fallback';
        });
    }
}

function addOrderRecord(order) {
    const existing = cloneData(runtimeStore.orders);
    existing.unshift(order);
    saveStoredOrders(existing);

    if (dataSourceMode === 'supabase') {
        _supabase.from(TABLES.orders).upsert(orderToRow(order), { onConflict: 'id' }).then(({ error }) => {
            if (error) dataSourceMode = 'fallback';
        });
    }
}

function updateOrderStatus(orderId, newStatus) {
    if (!isAdminUser(currentSessionUser)) return;

    const orders = getStoredOrders();
    const updated = orders.map((order) => {
        if (order.id !== orderId) return order;
        return {
            ...order,
            status: newStatus,
            lastUpdateAt: new Date().toISOString(),
        };
    });
    saveStoredOrders(updated);
}

function getStoredOffers() {
    return cloneData(runtimeStore.offers);
}

function saveStoredOffers(offers) {
    runtimeStore.offers = Array.isArray(offers) ? cloneData(offers) : [];
    writeLocalJson(OFFERS_STORAGE_KEY, runtimeStore.offers);

    if (dataSourceMode === 'supabase') {
        replaceTableSnapshot(TABLES.offers, runtimeStore.offers.map(offerToRow)).catch(() => {
            dataSourceMode = 'fallback';
        });
    }
}

function normalizeManagedService(service, index = 0) {
    const title = String(service?.titles?.ar || service?.title || '').trim() || 'خدمة بدون اسم';
    const description = String(service?.descriptions?.ar || service?.description || '').trim() || 'وصف الخدمة غير متوفر حالياً.';
    const category = String(service?.category || 'خدمة بصرية').trim();
    const rawPopularity = Number.parseInt(service?.popularity, 10);

    return {
        id: String(service?.id || createId('SVC')),
        titles: { ar: title },
        descriptions: { ar: description },
        category,
        serviceType: String(service?.serviceType || 'خدمة لمرة واحدة').trim(),
        price: String(service?.price ?? '0').trim(),
        is_coming_soon: Boolean(service?.is_coming_soon),
        popularity: Number.isFinite(rawPopularity) ? rawPopularity : index + 1,
        enabled: service?.enabled !== false,
        createdAt: service?.createdAt || new Date().toISOString(),
        updatedAt: service?.updatedAt || new Date().toISOString(),
    };
}

function getStoredServices() {
    return cloneData(runtimeStore.services);
}

function saveStoredServices(services) {
    const normalized = Array.isArray(services)
        ? services.map((service, index) => normalizeManagedService(service, index))
        : [];

    runtimeStore.services = normalized;
    writeLocalJson(SERVICES_STORAGE_KEY, runtimeStore.services);

    if (dataSourceMode === 'supabase') {
        replaceTableSnapshot(TABLES.services, runtimeStore.services.map(serviceToRow)).catch(() => {
            dataSourceMode = 'fallback';
        });
    }
}

function getStoredDisputes() {
    return cloneData(runtimeStore.disputes);
}

function saveStoredDisputes(disputes) {
    runtimeStore.disputes = Array.isArray(disputes) ? cloneData(disputes) : [];
    writeLocalJson(DISPUTES_STORAGE_KEY, runtimeStore.disputes);

    if (dataSourceMode === 'supabase') {
        replaceTableSnapshot(TABLES.disputes, runtimeStore.disputes.map(disputeToRow)).catch(() => {
            dataSourceMode = 'fallback';
        });
    }
}

function getStoredDiscounts() {
    return cloneData(runtimeStore.discounts);
}

function saveStoredDiscounts(discounts) {
    runtimeStore.discounts = {
        global: {
            ...DEFAULT_DISCOUNT_SETTINGS.global,
            ...(discounts?.global || {}),
        },
        customerRules: Array.isArray(discounts?.customerRules) ? cloneData(discounts.customerRules) : [],
    };
    writeLocalJson(DISCOUNTS_STORAGE_KEY, runtimeStore.discounts);

    if (dataSourceMode === 'supabase') {
        const globalRow = {
            id: 'global',
            enabled: Boolean(runtimeStore.discounts.global.enabled),
            code: runtimeStore.discounts.global.code || '',
            discount_type: runtimeStore.discounts.global.type || 'percent',
            discount_value: Number.parseFloat(runtimeStore.discounts.global.value || 0) || 0,
            ends_at: runtimeStore.discounts.global.endsAt || null,
            updated_at: new Date().toISOString(),
        };

        _supabase.from(TABLES.discountsGlobal).upsert(globalRow, { onConflict: 'id' }).then(({ error }) => {
            if (error) {
                dataSourceMode = 'fallback';
            }
        });

        const customerRows = runtimeStore.discounts.customerRules.map((rule) => ({
            id: rule.id,
            email: normalizeEmail(rule.email),
            code: rule.code || '',
            discount_type: rule.type || 'percent',
            discount_value: Number.parseFloat(rule.value || 0) || 0,
            ends_at: rule.endsAt || null,
            enabled: Boolean(rule.enabled),
            created_at: rule.createdAt || new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }));

        replaceTableSnapshot(TABLES.discountsCustomer, customerRows).catch(() => {
            dataSourceMode = 'fallback';
        });
    }
}

function isRuleActive(rule) {
    if (!rule || !rule.enabled) return false;
    if (!rule.endsAt) return true;
    return new Date(rule.endsAt).getTime() >= Date.now();
}

function isAdminUser(user) {
    const email = normalizeEmail(user?.email);
    if (!email) return false;

    const adminEmails = Array.isArray(siteSettings.orders?.adminEmails)
        ? siteSettings.orders.adminEmails.map(normalizeEmail)
        : [];

    if (adminEmails.includes(email)) return true;

    return false;
}

function getDiscountContextForUser(userEmail) {
    const discounts = getStoredDiscounts();
    const normalizedEmail = normalizeEmail(userEmail);

    const globalRule = isRuleActive(discounts.global) ? discounts.global : null;

    const customerRule = discounts.customerRules.find((rule) => (
        normalizeEmail(rule.email) === normalizedEmail && isRuleActive(rule)
    )) || null;

    return {
        globalRule,
        customerRule,
    };
}

function getBestDiscountRule(context) {
    if (context.customerRule) return context.customerRule;
    return context.globalRule;
}

function applyDiscount(price, rule) {
    if (!Number.isFinite(price) || !rule) return { finalPrice: price, discountAmount: 0 };

    const rawValue = Number.parseFloat(rule.value || 0);
    const value = Number.isFinite(rawValue) ? rawValue : 0;

    if (value <= 0) return { finalPrice: price, discountAmount: 0 };

    let discountAmount = 0;
    if (rule.type === 'fixed') {
        discountAmount = value;
    } else {
        discountAmount = (price * value) / 100;
    }

    const finalPrice = Math.max(0, price - discountAmount);
    return {
        finalPrice,
        discountAmount,
    };
}

const FALLBACK_SERVICES = DEFAULT_MANAGED_SERVICES.map((service, index) => ({
    id: service.id,
    titles: { ar: service.titles.ar },
    price: service.price,
    descriptions: { ar: service.descriptions.ar },
    category: service.category,
    serviceType: service.serviceType,
    is_coming_soon: service.is_coming_soon,
    popularity: service.popularity || index + 1,
    enabled: service.enabled !== false,
}));

function resolveServiceDetailId(serviceId) {
    const id = String(serviceId || '').trim();
    if (!id) return '';
    if (SERVICE_DETAIL_CONTENT[id]) return id;
    return SERVICE_DETAIL_ALIASES[id] || id;
}

function getServiceDetailUrl(serviceId) {
    const id = resolveServiceDetailId(serviceId) || String(serviceId || '').trim();
    if (!id) return 'services.html';
    return SERVICE_DETAIL_ROUTES[id] || `service-detail.html?service=${encodeURIComponent(id)}`;
}

function getServiceDetailIdFromPath(pathname) {
    const currentFile = String(pathname || '').split('/').pop()?.toLowerCase();
    if (!currentFile) return '';
    const found = Object.entries(SERVICE_DETAIL_ROUTES)
        .find((entry) => String(entry[1] || '').toLowerCase() === currentFile);
    return found ? found[0] : '';
}

function setMetaTag(selector, attr, value) {
    const element = document.querySelector(selector);
    if (!element) return;
    element.setAttribute(attr, value);
}

function updateServiceShareMeta(service, localized, details) {
    const resolvedId = resolveServiceDetailId(service?.id);
    const detailPath = SERVICE_DETAIL_ROUTES[resolvedId] || `service-detail.html?service=${encodeURIComponent(resolvedId || '')}`;
    const publicUrl = `https://www.pixelonevisuals.tech/${detailPath}`;
    const title = `${localized.title || 'تفاصيل الخدمة'} | Pixel One Visuals`;
    const description = localized.description || 'تفاصيل الخدمة، المخرجات، والمتطلبات قبل الطلب.';
    const image = details.image || 'https://www.pixelonevisuals.tech/icone/web-app-manifest-512x512.png';
    const imageAlt = details.imageAlt || 'Pixel One Visuals';

    document.title = title;
    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('link[rel="canonical"]', 'href', publicUrl);
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:url"]', 'content', publicUrl);
    setMetaTag('meta[property="og:image"]', 'content', image);
    setMetaTag('meta[property="og:image:secure_url"]', 'content', image);
    setMetaTag('meta[property="og:image:type"]', 'content', 'image/svg+xml');
    setMetaTag('meta[property="og:image:width"]', 'content', '1200');
    setMetaTag('meta[property="og:image:height"]', 'content', '630');
    setMetaTag('meta[property="og:image:alt"]', 'content', imageAlt);
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', image);
}

function getServiceDetailContent(serviceId) {
    const resolvedId = resolveServiceDetailId(serviceId);
    const content = SERVICE_DETAIL_CONTENT[resolvedId];
    if (content) return content;
    return {
        image: 'https://www.pixelonevisuals.tech/og/professional-design-1200x630.svg',
        imageAlt: 'خدمة تصميم احترافية',
        deliverables: ['تنفيذ احترافي حسب نطاق الطلب المتفق عليه.', 'تسليم منظم وجاهز للاستخدام.'],
        requirements: ['فكرة المشروع والهدف الأساسي.', 'المحتوى والمواد المتاحة لديك.'],
        workflow: ['فهم الطلب', 'تنفيذ أولي', 'مراجعة', 'تسليم نهائي'],
        turnaround: 'يتم تحديد المدة بعد مراجعة التفاصيل.',
        revisions: 'ضمن النطاق المتفق عليه.',
    };
}

async function setupHomeSessionUI() {
    const desktopNavLink = document.getElementById('loginNavLink')
        || document.querySelector('.site-nav-cta a[data-role="client-auth-link"]')
        || document.querySelector('.site-nav-cta a[href="client-login.html"]');

    const mobileNavLink = document.getElementById('loginNavLinkMobile')
        || document.querySelector('.mobile-nav-panel a[data-role="client-auth-link"]')
        || document.querySelector('.mobile-nav-panel a[href="client-login.html"]');

    const navLinks = [desktopNavLink, mobileNavLink].filter(Boolean);
    if (navLinks.length === 0) return;

    const { data: { user } } = await _supabase.auth.getUser();
    currentSessionUser = user || null;

    if (currentSessionUser) {
        navLinks.forEach((navLink) => {
            navLink.textContent = t('navDashboard');
            navLink.href = isAdminUser(currentSessionUser) ? 'admin-dashboard.html' : 'dashboard.html';
            navLink.classList.remove('text-gray-300');
            navLink.classList.remove('text-gray-200');
            navLink.classList.add('text-emerald-300');
        });
    } else {
        navLinks.forEach((navLink) => {
            navLink.textContent = t('navClientLogin');
            navLink.href = 'client-login.html';
            navLink.classList.remove('text-emerald-300');
            navLink.classList.remove('text-gray-200');
            navLink.classList.add('text-gray-300');
        });
    }
}

function resolveLocalizedInlineText(value) {
    if (typeof value !== 'string') return String(value || '');
    const raw = value.trim();
    if (!raw) return '';

    const lang = getCurrentLanguage();

    if (raw.startsWith('{') && raw.endsWith('}')) {
        try {
            const parsed = JSON.parse(raw);
            return String(parsed?.[lang] || parsed?.ar || parsed?.en || parsed?.fr || raw);
        } catch {
            // Fall through to separator parsing.
        }
    }

    if (raw.includes('||')) {
        const parts = raw.split('||').map((part) => part.trim());
        const indexByLang = { ar: 0, en: 1, fr: 2 };
        const idx = indexByLang[lang] ?? 0;
        return parts[idx] || parts[0] || '';
    }

    return raw;
}

function renderOffersForHome() {
    const container = document.getElementById('offersGrid');
    if (!container) return;

    const offers = getStoredOffers();
    const email = normalizeEmail(currentSessionUser?.email);

    const visibleOffers = offers
        .filter((offer) => offer.enabled)
        .filter((offer) => {
            if (offer.target === 'customer') {
                return normalizeEmail(offer.targetEmail) === email;
            }
            return true;
        })
        .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));

    container.innerHTML = '';

    if (visibleOffers.length === 0) {
        container.innerHTML = `<div class="water-card rounded-2xl p-6 text-center text-gray-500">${escapeHtml(t('offerEmpty'))}</div>`;
        return;
    }

    visibleOffers.forEach((offer) => {
        const safeTitle = escapeHtml(resolveLocalizedInlineText(offer.title) || t('offerTitleFallback'));
        const safeDescription = escapeHtml(resolveLocalizedInlineText(offer.description) || '');
        const safeBadge = escapeHtml(resolveLocalizedInlineText(offer.badge) || t('offerBadgeFallback'));
        container.insertAdjacentHTML('beforeend', `
            <article class="water-card rounded-2xl p-6 border border-emerald-500/25 bg-emerald-500/5">
                <div class="flex justify-between items-start gap-3 mb-3">
                    <h4 class="text-white font-black text-lg">${safeTitle}</h4>
                    <span class="text-[10px] font-en px-2 py-1 rounded-full border border-emerald-400/40 text-emerald-300">${safeBadge}</span>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed">${safeDescription}</p>
            </article>
        `);
    });
}

function getLocalizedServiceContent(service) {
    const lang = getCurrentLanguage();
    const mapped = SERVICE_I18N[service.id]?.[lang] || null;

    const localizedTitle = service.titles?.[lang] || mapped?.title || service.titles?.ar || 'Service';
    const localizedDescription = service.descriptions?.[lang] || mapped?.description || service.descriptions?.ar || '';
    const localizedCategory = service.categories?.[lang] || mapped?.category || service.category || '';
    const localizedType = service.serviceTypeByLang?.[lang] || mapped?.serviceType || service.serviceType || '';

    return {
        title: localizedTitle,
        description: localizedDescription,
        category: localizedCategory,
        serviceType: localizedType,
    };
}

function renderServices(grid, services, discountContext) {
    grid.innerHTML = '';

    const activeServices = services.filter((service) => service.enabled !== false);

    const availableServices = activeServices
        .filter((service) => !service.is_coming_soon)
        .sort((a, b) => (a.popularity || 999) - (b.popularity || 999));

    const comingSoonServices = activeServices
        .filter((service) => service.is_coming_soon)
        .sort((a, b) => (a.popularity || 999) - (b.popularity || 999));

    const orderedServices = [...availableServices, ...comingSoonServices];
    const bestRule = getBestDiscountRule(discountContext);
    const currentLang = getCurrentLanguage();

    orderedServices.forEach((service, index) => {
        const isSoon = service.is_coming_soon;
        const delayClass = `delay-${(index % 3 + 1) * 100}`;
        const localized = getLocalizedServiceContent(service);
        const serviceName = localized.title || 'Service';
        const servicePrice = service.price || '0';
        const serviceDesc = localized.description || '';
        const category = localized.category || '';
        const serviceType = localized.serviceType || '';

        const safeCategory = escapeHtml(category);
        const safePrice = escapeHtml(servicePrice);
        const safeName = escapeHtml(serviceName);
        const safeDesc = escapeHtml(serviceDesc);
        const safeType = escapeHtml(serviceType);
        const safeServiceNameAttr = escapeHtml(serviceName);
        const serviceDetailUrl = getServiceDetailUrl(service.id);
        const safeServiceDetailUrl = escapeHtml(serviceDetailUrl);
        const moreLabel = currentLang === 'en' ? 'More' : currentLang === 'fr' ? 'Plus' : 'المزيد';
        const statusLabel = isSoon ? t('serviceSoon') : t('serviceAvailable');
        const statusClass = isSoon
            ? 'bg-white/5 border-white/10 text-gray-400'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';

        const numericPrice = parsePrice(servicePrice);
        const discountResult = (!isSoon && numericPrice !== null && bestRule)
            ? applyDiscount(numericPrice, bestRule)
            : { finalPrice: numericPrice, discountAmount: 0 };

        const hasDiscount = Number.isFinite(numericPrice) && discountResult.discountAmount > 0;

        const priceHtml = hasDiscount
            ? `
                <div class="flex flex-col items-end leading-tight">
                    <span class="text-xs text-gray-500 line-through number-font">${escapeHtml(String(numericPrice))} MAD</span>
                    <span class="text-2xl font-black number-font text-emerald-300">${escapeHtml(String(discountResult.finalPrice.toFixed(2)))} <span class="text-xs font-normal text-gray-500 uppercase font-en">MAD</span></span>
                </div>
              `
            : `<span class="text-2xl font-black number-font">${safePrice} <span class="text-xs font-normal text-gray-500 uppercase font-en">MAD</span></span>`;

        const discountBadgeHtml = hasDiscount
            ? `<span class="text-[10px] px-2 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-200">${escapeHtml(t('discountLabel'))} ${bestRule.type === 'percent' ? `${escapeHtml(String(bestRule.value))}%` : `${escapeHtml(String(bestRule.value))} MAD`}</span>`
            : '';

        const cardHTML = `
            <div class="p-10 flex flex-col justify-between water-card animate-fade-up ${delayClass} ${isSoon ? 'coming-soon-card' : ''}">
                <div>
                    <div class="flex justify-between items-start mb-8 gap-4">
                        <div class="flex flex-col gap-2">
                            <span class="text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase">${safeCategory}</span>
                            <div class="flex gap-2 items-center flex-wrap">
                                <span class="text-[10px] px-2 py-1 rounded-full border w-fit ${statusClass}">${statusLabel}</span>
                                <span class="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">${safeType}</span>
                                ${discountBadgeHtml}
                            </div>
                        </div>
                        ${priceHtml}
                    </div>
                    <h3 class="text-2xl font-black mb-4">${safeName}</h3>
                    <a href="${safeServiceDetailUrl}" class="block text-gray-400 text-sm leading-relaxed mb-4 hover:text-gray-200 transition">${safeDesc}</a>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <a href="${safeServiceDetailUrl}" class="w-full py-4 rounded-lg font-black transition text-sm text-center border border-white/20 text-gray-200 hover:bg-white/10">${escapeHtml(moreLabel)}</a>
                    <button ${isSoon ? 'disabled' : ''}
                        data-service-name="${safeServiceNameAttr}"
                        data-final-price="${hasDiscount ? escapeHtml(String(discountResult.finalPrice.toFixed(2))) : safePrice}"
                        data-discount-code="${hasDiscount ? escapeHtml(bestRule.code || '') : ''}"
                        data-service-lang="${escapeHtml(currentLang)}"
                        class="w-full py-4 rounded-lg font-black transition text-sm ${isSoon ? 'btn-disabled' : 'btn-filled-red'}">
                        ${isSoon ? escapeHtml(t('serviceComingSoonBtn')) : escapeHtml(t('serviceOrderNow'))}
                    </button>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function renderServiceDetailPage() {
    const root = document.getElementById('serviceDetailRoot');
    if (!root) return;

    const params = new URL(window.location.href).searchParams;
    const routeServiceId = getServiceDetailIdFromPath(window.location.pathname);
    const serviceParam = params.get('service') || document.body?.dataset.serviceId || routeServiceId || '';
    const targetId = resolveServiceDetailId(serviceParam);
    const services = getStoredServices();
    const catalog = services.length > 0 ? services : FALLBACK_SERVICES;
    const service = catalog.find((item) => resolveServiceDetailId(item.id) === targetId);

    if (!service) {
        root.innerHTML = `
            <div class="water-card rounded-3xl p-8 text-center">
                <h1 class="text-2xl font-black text-white mb-3">الخدمة غير متاحة حالياً</h1>
                <p class="text-gray-400 mb-6">تعذر العثور على الخدمة المطلوبة. يمكنك الرجوع إلى قائمة الخدمات واختيار خدمة أخرى.</p>
                <a href="services.html" class="btn-filled-red px-8 py-3 rounded-lg font-black inline-block">العودة إلى الخدمات</a>
            </div>
        `;
        return;
    }

    const localized = getLocalizedServiceContent(service);
    const details = getServiceDetailContent(service.id);
    const isSoon = Boolean(service.is_coming_soon);
    const servicePrice = escapeHtml(String(service.price || '0'));
    const serviceType = escapeHtml(localized.serviceType || 'خدمة لمرة واحدة');
    const serviceCategory = escapeHtml(localized.category || 'خدمة رقمية');
    const serviceName = escapeHtml(localized.title || 'خدمة');
    const serviceDesc = escapeHtml(localized.description || '');
    const statusLabel = isSoon ? 'قريباً' : 'متاح الآن';
    const statusClass = isSoon
        ? 'bg-white/5 border-white/10 text-gray-300'
        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';

    updateServiceShareMeta(service, localized, details);

    root.innerHTML = `
        <article class="water-card rounded-3xl overflow-hidden">
            <img src="${escapeHtml(details.image)}" alt="${escapeHtml(details.imageAlt)}" class="w-full h-[260px] md:h-[360px] object-cover" loading="eager" referrerpolicy="no-referrer">
            <div class="p-7 md:p-10">
                <div class="flex flex-wrap items-center gap-2 mb-4">
                    <span class="text-[11px] px-3 py-1 rounded-full border ${statusClass}">${statusLabel}</span>
                    <span class="text-[11px] px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">${serviceType}</span>
                    <span class="text-[11px] px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">${serviceCategory}</span>
                </div>
                <h1 class="text-3xl md:text-4xl font-black text-white mb-3">${serviceName}</h1>
                <p class="text-gray-300 leading-relaxed mb-6">${serviceDesc}</p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div class="water-card rounded-2xl p-4">
                        <p class="text-xs text-gray-500 mb-1">السعر</p>
                        <p class="text-2xl font-black text-white number-font">${servicePrice} <span class="text-xs text-gray-500 font-en">MAD</span></p>
                    </div>
                    <div class="water-card rounded-2xl p-4">
                        <p class="text-xs text-gray-500 mb-1">مدة التنفيذ المتوقعة</p>
                        <p class="text-sm font-bold text-white">${escapeHtml(details.turnaround)}</p>
                    </div>
                    <div class="water-card rounded-2xl p-4">
                        <p class="text-xs text-gray-500 mb-1">سياسة المراجعات</p>
                        <p class="text-sm font-bold text-white">${escapeHtml(details.revisions)}</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    <section class="water-card rounded-2xl p-5">
                        <h2 class="text-white font-black mb-4">ماذا ستحصل عليه</h2>
                        <ul class="space-y-2 text-sm text-gray-300">
                            ${details.deliverables.map((item) => `<li>• ${escapeHtml(item)}</li>`).join('')}
                        </ul>
                    </section>
                    <section class="water-card rounded-2xl p-5">
                        <h2 class="text-white font-black mb-4">ماذا نحتاج منك</h2>
                        <ul class="space-y-2 text-sm text-gray-300">
                            ${details.requirements.map((item) => `<li>• ${escapeHtml(item)}</li>`).join('')}
                        </ul>
                    </section>
                    <section class="water-card rounded-2xl p-5">
                        <h2 class="text-white font-black mb-4">كيف سنشتغل</h2>
                        <ol class="space-y-2 text-sm text-gray-300">
                            ${details.workflow.map((item, index) => `<li>${index + 1}) ${escapeHtml(item)}</li>`).join('')}
                        </ol>
                    </section>
                </div>

                <div class="mt-8 flex flex-col sm:flex-row gap-3">
                    <button id="serviceDetailOrderBtn" type="button" data-action="open-order-modal" data-service-name="${serviceName}" data-final-price="${servicePrice}" class="btn-filled-red px-8 py-4 rounded-xl font-black ${isSoon ? 'btn-disabled' : ''}" ${isSoon ? 'disabled' : ''}>
                        ${isSoon ? 'قريباً جداً' : 'اطلب الخدمة الآن'}
                    </button>
                    <a href="services.html" class="px-8 py-4 rounded-xl font-black border border-white/20 text-gray-200 hover:bg-white/10 text-center">كل الخدمات</a>
                </div>
            </div>
        </article>
    `;
}

async function loadServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    const discountContext = getDiscountContextForUser(currentSessionUser?.email);

    const managedServices = getStoredServices();
    renderServices(grid, managedServices.length > 0 ? managedServices : FALLBACK_SERVICES, discountContext);
}

window.openOrderModal = function(serviceName, meta = {}) {
    const modal = document.getElementById('orderModal');
    const selectedServiceText = document.getElementById('selectedServiceText');
    const hiddenServiceName = document.getElementById('hiddenServiceName');
    const orderForm = document.getElementById('orderForm');
    const orderMsgBox = document.getElementById('orderMsgBox');
    const firstInput = document.getElementById('orderName');

    if (!modal || !selectedServiceText || !hiddenServiceName || !orderForm || !orderMsgBox) return;

    orderForm.reset();
    orderMsgBox.classList.remove('active');

    const localizedServiceName = localizeCustomServiceName(serviceName);
    selectedServiceText.textContent = localizedServiceName;
    hiddenServiceName.value = localizedServiceName;

    const hiddenPrice = document.getElementById('hiddenFinalPrice');
    const hiddenDiscountCode = document.getElementById('hiddenDiscountCode');
    if (hiddenPrice) hiddenPrice.value = meta.finalPrice || '';
    if (hiddenDiscountCode) hiddenDiscountCode.value = meta.discountCode || '';

    const emailInput = document.getElementById('orderEmail');
    if (emailInput && currentSessionUser?.email) {
        emailInput.value = currentSessionUser.email;
    }

    const submitBtn = document.getElementById('btnOrderSubmit');
    if (submitBtn) submitBtn.textContent = t('orderSubmitDefault');

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
};

window.closeOrderModal = function() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

function setupHomeCspSafeBindings() {
    if (document.body?.dataset.cspSafeBindingsReady === 'true') return;
    if (document.body) document.body.dataset.cspSafeBindingsReady = 'true';

    document.addEventListener('click', (e) => {
        const actionEl = e.target.closest('[data-action]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;

        if (action === 'close-mobile-menu') {
            actionEl.closest('details')?.removeAttribute('open');
            return;
        }

        if (action === 'mobile-open-order-modal') {
            actionEl.closest('details')?.removeAttribute('open');
            openOrderModal(actionEl.dataset.serviceName || 'طلب خدمة مخصص', {
                finalPrice: actionEl.dataset.finalPrice || '',
                discountCode: actionEl.dataset.discountCode || '',
            });
            return;
        }

        if (action === 'open-order-modal') {
            openOrderModal(actionEl.dataset.serviceName || 'طلب خدمة مخصص', {
                finalPrice: actionEl.dataset.finalPrice || '',
                discountCode: actionEl.dataset.discountCode || '',
            });
            return;
        }

        if (action === 'scroll-to') {
            const targetId = actionEl.dataset.targetId || '';
            const section = targetId ? document.getElementById(targetId) : null;
            if (section) section.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        if (action === 'close-order-modal') {
            closeOrderModal();
        }
    });
}

async function handleOrderSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('btnOrderSubmit');
    const msgBox = document.getElementById('orderMsgBox');
    const hiddenServiceName = document.getElementById('hiddenServiceName');
    const hiddenPrice = document.getElementById('hiddenFinalPrice');
    const hiddenDiscountCode = document.getElementById('hiddenDiscountCode');
    const nameInput = document.getElementById('orderName');
    const phoneInput = document.getElementById('orderPhone');
    const emailInput = document.getElementById('orderEmail');
    const specsInput = document.getElementById('orderSpecs');

    if (!btn || !msgBox || !hiddenServiceName || !nameInput || !phoneInput || !emailInput || !specsInput) return;

    // 1. تأمين واجهة المستخدم (CRO & UX)
    btn.disabled = true;
    btn.textContent = t('orderProcessing');

    const serviceName = hiddenServiceName.value;
    const finalPrice = hiddenPrice?.value || '';
    const discountCode = hiddenDiscountCode?.value || '';
    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const specs = specsInput.value;

    const myWhatsappNumber = siteSettings.contact?.whatsappNumber || DEFAULT_SITE_SETTINGS.contact.whatsappNumber;
    const supportEmail = siteSettings.brand?.supportEmail || DEFAULT_SITE_SETTINGS.brand.supportEmail;

    if (myWhatsappNumber === '212600000000') {
        msgBox.textContent = t('orderWhatsAppNotSet');
        msgBox.className = 'msg-box msg-error active';
        btn.disabled = false;
        btn.textContent = t('orderSubmitDefault');
        return;
    }

    const { data: { user } } = await _supabase.auth.getUser();
    currentSessionUser = user || currentSessionUser;
    const effectiveEmail = email || currentSessionUser?.email || '';

    if (!normalizeEmail(effectiveEmail)) {
        msgBox.textContent = t('orderEmailRequired');
        msgBox.className = 'msg-box msg-error active';
        btn.disabled = false;
        btn.textContent = t('orderSubmitDefault');
        return;
    }

    const orderId = generateTrackingCode();
    const orderDateIso = new Date().toISOString();
    const orderStatus = siteSettings.orders?.defaultStatus || DEFAULT_SITE_SETTINGS.orders.defaultStatus;

    // 2. حفظ الطلب في قاعدة البيانات (Supabase)
    addOrderRecord({
        id: orderId,
        trackingCode: orderId,
        serviceName,
        name,
        phone,
        email: effectiveEmail,
        specs,
        status: orderStatus,
        supportEmail,
        createdAt: orderDateIso,
        lastUpdateAt: orderDateIso,
        userId: currentSessionUser?.id || null,
        userEmail: currentSessionUser?.email || effectiveEmail || null,
        finalPrice,
        discountCode,
    });

    // 3. 🚀 إرسال البيانات إلى نظام الأتمتة (Viasocket) في الخلفية
    try {
        const webhookUrl = 'https://flow.sokt.io/func/scriekZWLgOh';
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
                serviceName,
                customerName: name,
                customerPhone: phone,
                customerEmail: effectiveEmail,
                specs,
                finalPrice,
                discountCode,
                orderDate: orderDateIso,
            }),
        });
        console.log('✅ تم إرسال البيانات إلى Viasocket بنجاح');
    } catch (error) {
        console.error('❌ خطأ في الاتصال بـ Viasocket:', error);
        // ملاحظة معمارية: نحن لا نوقف عملية العميل إذا فشل الـ Webhook
    }

    // 4. تجهيز رسالة الواتساب وتوجيه العميل
    const discountLine = discountCode ? `${t('waDiscountCode')} ${discountCode}\n` : '';
    const priceLine = finalPrice ? `${t('waFinalPrice')} ${finalPrice} MAD\n` : '';

    const message = `${t('waTitle')} 🔴\n\n`
        + `${t('waOrderId')} ${orderId}\n`
        + `${t('waOrderDate')} ${formatLocalizedDateTime(orderDateIso)}\n`
        + `${t('waService')} ${serviceName}\n`
        + `${priceLine}`
        + `${discountLine}`
        + `${t('waCustomerName')} ${name}\n`
        + `${t('waPhone')} ${phone}\n`
        + `${t('waEmail')} ${effectiveEmail || '-'}\n\n`
        + `${t('waSpecs')}\n${specs}\n\n`
        + `--- مرسل من موقع Pixel One ---`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${myWhatsappNumber}?text=${encodedMessage}`;
    
    // فتح واتساب للعميل
    window.open(whatsappUrl, '_blank');

    // 5. إظهار رسالة النجاح وتفريغ الاستمارة
    msgBox.textContent = `${t('orderSuccessPrefix')} ${t('orderTrackingNotice')} ${orderId}. ${t('orderAuthNotice')}`;
    msgBox.className = 'msg-box msg-success active';
    btn.textContent = t('orderSubmitDone');

    setTimeout(() => {
        closeOrderModal();
        btn.disabled = false;
        btn.textContent = t('orderSubmitDefault');
    }, 3000);
}

async function setupAuthentication() {
    const form = document.getElementById('authForm');
    const toggleBtn = document.getElementById('toggleBtn');
    const magicBtn = document.getElementById('btnMagicLink');
    const forgotBtn = document.getElementById('btnForgotPassword');
    const resendBtn = document.getElementById('btnResendConfirmation');
    const authQuickActions = document.getElementById('authQuickActions');
    const resendWrap = document.getElementById('resendWrap');
    const forgotForm = document.getElementById('forgotPasswordForm');
    const forgotEmailInput = document.getElementById('forgotEmail');
    const forgotCancelBtn = document.getElementById('btnForgotCancel');
    const recoveryForm = document.getElementById('recoveryForm');
    let isLogin = true;

    function openForgotPasswordForm() {
        if (!forgotForm) return;
        const primaryEmail = document.getElementById('email')?.value?.trim();
        if (forgotEmailInput && primaryEmail) {
            forgotEmailInput.value = primaryEmail;
        }
        forgotForm.classList.remove('hidden');
        form?.classList.add('hidden');
        authQuickActions?.classList.add('hidden');
        resendWrap?.classList.add('hidden');
        toggleBtn?.classList.add('hidden');
        document.getElementById('toggleText')?.classList.add('hidden');
        document.getElementById('formTitle').textContent = 'استرجاع كلمة المرور';
        document.getElementById('formSubTitle').textContent = 'سنرسل رابط إعادة التعيين إلى بريدك الإلكتروني.';
    }

    function closeForgotPasswordForm() {
        if (!forgotForm) return;
        forgotForm.classList.add('hidden');
        form?.classList.remove('hidden');
        authQuickActions?.classList.remove('hidden');
        resendWrap?.classList.remove('hidden');
        toggleBtn?.classList.remove('hidden');
        document.getElementById('toggleText')?.classList.remove('hidden');
        document.getElementById('formTitle').textContent = isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد';
        document.getElementById('formSubTitle').textContent = isLogin
            ? 'إدارة مشاريعك وطلباتك بكل سهولة'
            : 'ابدأ رحلتك الإبداعية معنا الآن';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    let authType = hashParams.get('type') || urlParams.get('type');
    const notice = urlParams.get('notice');

    try {
        const consumed = await consumeIncomingAuthLink();
        if (consumed.authType) authType = consumed.authType;
    } catch (err) {
        showAuthMessage(`❌ ${err?.message || 'تعذر التحقق من رابط المصادقة.'}`, 'error');
    }

    if (notice === 'confirmed') {
        showAuthMessage('✅ تم تأكيد البريد الإلكتروني بنجاح. يمكنك تسجيل الدخول الآن.', 'success');
    } else if (notice === 'invite_accepted') {
        showAuthMessage('✅ تم قبول الدعوة بنجاح. أكمل تسجيل الدخول للوصول إلى حسابك.', 'success');
    } else if (notice === 'magic_link_success') {
        showAuthMessage('✅ تم التحقق من الرابط. إذا لم يتم تحويلك تلقائياً قم بتسجيل الدخول.', 'success');
    } else if (notice === 'reauth_success') {
        showAuthMessage('✅ تمت إعادة التحقق بنجاح.', 'success');
    }

    if (authType === 'recovery' && recoveryForm) {
        recoveryForm.classList.remove('hidden');
        form?.classList.add('hidden');
        forgotForm?.classList.add('hidden');
        authQuickActions?.classList.add('hidden');
        resendWrap?.classList.add('hidden');
        toggleBtn?.classList.add('hidden');
        document.getElementById('toggleText')?.classList.add('hidden');
        document.getElementById('formTitle').textContent = 'استعادة الوصول';
        document.getElementById('formSubTitle').textContent = 'قم بتعيين كلمة مرور جديدة لإكمال الاسترجاع';
    }

    const { data: { user } } = await _supabase.auth.getUser();
    if (user && authType !== 'recovery') {
        window.location.replace(isAdminUser(user) ? 'admin-dashboard.html' : 'dashboard.html');
        return;
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isLogin = !isLogin;

            document.getElementById('formTitle').textContent = isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد';
            document.getElementById('formSubTitle').textContent = isLogin ? 'إدارة مشاريعك وطلباتك بكل سهولة' : 'ابدأ رحلتك الإبداعية معنا الآن';
            document.getElementById('btnSubmit').textContent = isLogin ? 'دخول المنصة' : 'تسجيل حساب جديد';
            document.getElementById('toggleText').textContent = isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟';
            toggleBtn.textContent = isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول';

            document.getElementById('msgBox').classList.remove('active');
        });
    }

    if (forgotBtn) {
        forgotBtn.addEventListener('click', () => {
            openForgotPasswordForm();
        });
    }

    if (forgotCancelBtn) {
        forgotCancelBtn.addEventListener('click', () => {
            closeForgotPasswordForm();
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btnSubmit');
            const email = normalizeEmail(document.getElementById('email').value);
            const password = document.getElementById('password').value;

            if (!isLogin) {
                const remaining = getAuthCooldownRemaining('signup', email);
                if (remaining > 0) {
                    showAuthMessage(`❌ يرجى الانتظار ${remaining} ثانية قبل محاولة إنشاء الحساب مرة أخرى.`, 'error');
                    return;
                }
            }

            btn.disabled = true;
            btn.textContent = 'جاري المعالجة...';

            try {
                if (isLogin) {
                    const { error } = await _supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;

                    const { data: { user } } = await _supabase.auth.getUser();

                    showAuthMessage('✅ تم الدخول بنجاح! جاري تحويلك...', 'success');

                    setTimeout(() => {
                        window.location.href = isAdminUser(user)
                            ? 'admin-dashboard.html'
                            : 'dashboard.html';
                    }, 1000);
                } else {
                    const { error } = await _supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            emailRedirectTo: getAuthCallbackUrl('signup'),
                        },
                    });
                    if (error) throw error;

                    setAuthCooldown('signup', email, AUTH_RATE_LIMIT_DEFAULT_SECONDS.signup);

                    showAuthMessage('✅ تم إنشاء الحساب. تحقق من بريدك لتأكيد الحساب ثم سجل الدخول.', 'success');

                    setTimeout(() => {
                        toggleBtn?.click();
                        document.getElementById('password').value = '';
                    }, 2000);
                }
            } catch (err) {
                if (!isLogin && isRateLimitAuthError(err)) {
                    setAuthCooldown('signup', email, extractRetryAfterSeconds(err) || AUTH_RATE_LIMIT_DEFAULT_SECONDS.signup);
                }

                showAuthMessage(`❌ ${getFriendlyAuthErrorMessage(err, 'تعذر إكمال تسجيل الدخول.')}`, 'error');
            } finally {
                btn.disabled = false;
                btn.textContent = isLogin ? 'دخول المنصة' : 'تسجيل حساب جديد';
            }
        });
    }

    if (magicBtn) {
        magicBtn.addEventListener('click', async () => {
            const email = normalizeEmail(document.getElementById('email')?.value?.trim());
            if (!email) {
                showAuthMessage('❌ أدخل البريد الإلكتروني أولاً لإرسال Magic Link.', 'error');
                return;
            }

            const remaining = getAuthCooldownRemaining('magiclink', email);
            if (remaining > 0) {
                showAuthMessage(`❌ يرجى الانتظار ${remaining} ثانية قبل إعادة إرسال Magic Link.`, 'error');
                return;
            }

            const { error } = await _supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: false,
                    emailRedirectTo: getAuthCallbackUrl('magiclink'),
                },
            });

            if (error) {
                if (isRateLimitAuthError(error)) {
                    setAuthCooldown('magiclink', email, extractRetryAfterSeconds(error) || AUTH_RATE_LIMIT_DEFAULT_SECONDS.magiclink);
                }
                showAuthMessage(`❌ ${getFriendlyAuthErrorMessage(error, 'تعذر إرسال Magic Link.')}`, 'error');
                return;
            }

            setAuthCooldown('magiclink', email, AUTH_RATE_LIMIT_DEFAULT_SECONDS.magiclink);
            showAuthMessage('✅ تم إرسال رابط تسجيل الدخول إلى بريدك.', 'success');
        });
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = normalizeEmail(forgotEmailInput?.value?.trim());
            if (!email) {
                showAuthMessage('❌ أدخل البريد الإلكتروني أولاً لاسترجاع كلمة المرور.', 'error');
                return;
            }

            const remaining = getAuthCooldownRemaining('reset', email);
            if (remaining > 0) {
                showAuthMessage(`❌ يرجى الانتظار ${remaining} ثانية قبل إعادة إرسال رابط الاسترجاع.`, 'error');
                return;
            }

            const { error } = await _supabase.auth.resetPasswordForEmail(email, {
                redirectTo: getAuthCallbackUrl('recovery'),
            });

            if (error) {
                if (isRateLimitAuthError(error)) {
                    setAuthCooldown('reset', email, extractRetryAfterSeconds(error) || AUTH_RATE_LIMIT_DEFAULT_SECONDS.reset);
                }
                showAuthMessage(`❌ ${getFriendlyAuthErrorMessage(error, 'تعذر إرسال رابط الاسترجاع.')}`, 'error');
                return;
            }

            setAuthCooldown('reset', email, AUTH_RATE_LIMIT_DEFAULT_SECONDS.reset);
            showAuthMessage('✅ تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك.', 'success');
            closeForgotPasswordForm();
        });
    }

    if (resendBtn) {
        resendBtn.addEventListener('click', async () => {
            const email = normalizeEmail(document.getElementById('email')?.value?.trim());
            if (!email) {
                showAuthMessage('❌ أدخل البريد الإلكتروني أولاً لإعادة إرسال رسالة التأكيد.', 'error');
                return;
            }

            const remaining = getAuthCooldownRemaining('resend', email);
            if (remaining > 0) {
                showAuthMessage(`❌ يرجى الانتظار ${remaining} ثانية قبل إعادة إرسال رسالة التأكيد.`, 'error');
                return;
            }

            const { error } = await _supabase.auth.resend({
                type: 'signup',
                email,
                options: {
                    emailRedirectTo: getAuthCallbackUrl('signup'),
                },
            });

            if (error) {
                if (isRateLimitAuthError(error)) {
                    setAuthCooldown('resend', email, extractRetryAfterSeconds(error) || AUTH_RATE_LIMIT_DEFAULT_SECONDS.resend);
                }
                showAuthMessage(`❌ ${getFriendlyAuthErrorMessage(error, 'تعذر إعادة إرسال رسالة التأكيد.')}`, 'error');
                return;
            }

            setAuthCooldown('resend', email, AUTH_RATE_LIMIT_DEFAULT_SECONDS.resend);
            showAuthMessage('✅ تم إرسال رسالة تأكيد الحساب مرة أخرى.', 'success');
        });
    }

    if (recoveryForm) {
        recoveryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const pass = document.getElementById('recoveryPassword')?.value || '';
            const confirm = document.getElementById('recoveryPasswordConfirm')?.value || '';
            if (pass.length < 8) {
                showAuthMessage('❌ كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل.', 'error');
                return;
            }
            if (pass !== confirm) {
                showAuthMessage('❌ تأكيد كلمة المرور غير مطابق.', 'error');
                return;
            }

            const { error } = await _supabase.auth.updateUser({ password: pass });
            if (error) {
                showAuthMessage(`❌ ${error.message}`, 'error');
                return;
            }

            showAuthMessage('✅ تم تحديث كلمة المرور بنجاح. يمكنك تسجيل الدخول الآن.', 'success');
            setTimeout(() => {
                window.location.replace('client-login.html');
            }, 1200);
        });
    }
}

async function setupAuthCallbackPage() {
    const titleEl = document.getElementById('authCallbackTitle');
    const textEl = document.getElementById('authCallbackText');
    const detailsEl = document.getElementById('authCallbackDetails');
    const actionBtn = document.getElementById('authCallbackActionBtn');

    function setState(title, text, details, action) {
        if (titleEl) titleEl.textContent = title;
        if (textEl) textEl.textContent = text;
        if (detailsEl) detailsEl.textContent = details || '';
        if (actionBtn && action && action.href && action.label) {
            actionBtn.classList.remove('hidden');
            actionBtn.textContent = action.label;
            actionBtn.href = action.href;
        }
    }

    const url = new URL(window.location.href);
    const search = url.searchParams;
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const authType = hash.get('type') || search.get('type') || search.get('action') || '';
    const queryError = search.get('error_description') || search.get('error') || hash.get('error_description') || hash.get('error');

    if (queryError) {
        const humanError = decodeURIComponent(queryError).replace(/\+/g, ' ');
        setState(
            'تعذر إكمال العملية',
            'حدث خطأ أثناء التحقق من الرابط.',
            humanError,
            { href: getLoginPageUrl(), label: 'العودة لتسجيل الدخول' },
        );
        return;
    }

    try {
        const consumed = await consumeIncomingAuthLink();
        const effectiveAuthType = consumed.authType || authType;
        if (!consumed.handled && !effectiveAuthType) {
            setState(
                'رابط غير مكتمل',
                'هذا الرابط لا يحتوي على بيانات مصادقة صالحة.',
                'اطلب رابط جديد من صفحة تسجيل الدخول.',
                { href: getLoginPageUrl(), label: 'العودة لتسجيل الدخول' },
            );
            return;
        }

        const { data: { user } } = await _supabase.auth.getUser();
        const isRecovery = effectiveAuthType === 'recovery';
        const isInvite = effectiveAuthType === 'invite';
        const isSignup = effectiveAuthType === 'signup';
        const isMagicLink = effectiveAuthType === 'magiclink';
        const isReauth = effectiveAuthType === 'reauthentication';

        if (isRecovery) {
            setState(
                'تم التحقق من رابط الاسترجاع',
                'سيتم تحويلك إلى صفحة تعيين كلمة المرور الجديدة.',
                'إذا لم يتم التحويل تلقائياً اضغط الزر أدناه.',
                { href: `${getLoginPageUrl()}?type=recovery`, label: 'تعيين كلمة مرور جديدة' },
            );
            setTimeout(() => window.location.replace(`${getLoginPageUrl()}?type=recovery`), 900);
            return;
        }

        if (user) {
            if (isInvite) {
                setState('تم قبول الدعوة', 'تم تفعيل الدعوة بنجاح.', 'سيتم تحويلك إلى لوحة التحكم.', null);
            } else if (isSignup) {
                setState('تم تأكيد البريد', 'تم تفعيل حسابك بنجاح.', 'سيتم تحويلك إلى لوحة التحكم.', null);
            } else if (isMagicLink) {
                setState('تم تسجيل الدخول', 'تم التحقق من Magic Link بنجاح.', 'سيتم تحويلك إلى لوحة التحكم.', null);
            } else if (isReauth) {
                setState('تمت إعادة المصادقة', 'تم التحقق الأمني بنجاح.', 'سيتم تحويلك الآن.', null);
            } else {
                setState('تمت العملية بنجاح', 'تم التحقق من الرابط بنجاح.', 'سيتم تحويلك الآن.', null);
            }

            setTimeout(() => {
                window.location.replace(isAdminUser(user) ? 'admin-dashboard.html' : 'dashboard.html');
            }, 900);
            return;
        }

        setState(
            'تمت العملية',
            'تمت معالجة الرابط لكن لا توجد جلسة نشطة حالياً.',
            'سجّل الدخول للمتابعة.',
            { href: getLoginPageUrl(), label: 'الذهاب لتسجيل الدخول' },
        );
    } catch (err) {
        setState(
            'الرابط غير صالح أو منتهي',
            'تعذر إكمال عملية التحقق.',
            err?.message || 'يرجى طلب رابط جديد ثم المحاولة مرة أخرى.',
            { href: getLoginPageUrl(), label: 'العودة لتسجيل الدخول' },
        );
    }
}

async function protectDashboardRoute() {
    const { data: { user }, error } = await _supabase.auth.getUser();

    if (error || !user) {
        window.location.replace('client-login.html');
        return null;
    }

    if (isAdminUser(user)) {
        window.location.replace('admin-dashboard.html');
        return null;
    }

    currentSessionUser = user;
    const emailSpan = document.getElementById('userEmail');
    if (emailSpan) {
        const username = typeof user.email === 'string' ? user.email.split('@')[0] : 'user';
        emailSpan.textContent = username;
    }
    document.body.style.display = 'block';
    return user;
}

async function protectAdminDashboardRoute() {
    const { data: { user }, error } = await _supabase.auth.getUser();

    if (error || !user) {
        window.location.replace('client-login.html');
        return null;
    }

    if (!isAdminUser(user)) {
        window.location.replace('dashboard.html');
        return null;
    }

    currentSessionUser = user;
    const emailSpan = document.getElementById('adminEmail');
    if (emailSpan) emailSpan.textContent = user.email || 'admin';
    document.body.style.display = 'block';
    return user;
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            logoutBtn.textContent = 'جاري الخروج...';
            logoutBtn.disabled = true;
            await _supabase.auth.signOut();
            window.location.replace('../index.html');
        });
    }
}

function ensureDashboardTrackingControls(onFilter) {
    const ordersSection = document.getElementById('dashboardOrdersSection') || document.getElementById('ordersTableBody')?.closest('.mt-12');
    if (!ordersSection) return null;

    let box = document.getElementById('dashboardTrackingBox');
    if (!box) {
        box = document.createElement('div');
        box.id = 'dashboardTrackingBox';
        box.className = 'mb-5 rounded-xl border border-white/10 bg-black/25 p-4';
        box.innerHTML = `
            <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h4 id="dashboardTrackingTitle" class="text-sm font-black text-white"></h4>
                    <p id="dashboardTrackingHint" class="text-xs text-gray-500 mt-1"></p>
                </div>
                <div class="flex w-full md:w-auto gap-2">
                    <input id="dashboardOrderTrackInput" type="text" class="input-luxury font-en !py-2 !px-3 text-sm" dir="ltr" />
                    <button id="dashboardOrderTrackBtn" type="button" class="px-4 py-2 rounded-lg border border-brand-red/40 text-brand-red hover:bg-brand-red hover:text-white text-sm font-bold transition"></button>
                    <button id="dashboardOrderTrackClearBtn" type="button" class="px-4 py-2 rounded-lg border border-white/20 text-gray-200 hover:bg-white/10 text-sm font-bold transition"></button>
                </div>
            </div>
        `;

        const sectionHeader = ordersSection.querySelector('.mb-5');
        if (sectionHeader) {
            sectionHeader.insertAdjacentElement('afterend', box);
        } else {
            ordersSection.prepend(box);
        }
    }

    const title = document.getElementById('dashboardTrackingTitle');
    const hint = document.getElementById('dashboardTrackingHint');
    const input = document.getElementById('dashboardOrderTrackInput');
    const trackBtn = document.getElementById('dashboardOrderTrackBtn');
    const clearBtn = document.getElementById('dashboardOrderTrackClearBtn');

    if (title) title.textContent = t('trackTitle');
    if (hint) hint.textContent = t('trackHint');
    if (input) input.placeholder = t('trackInputPlaceholder');
    if (trackBtn) trackBtn.textContent = t('trackButton');
    if (clearBtn) clearBtn.textContent = t('trackClear');

    if (trackBtn && !trackBtn.dataset.bound) {
        trackBtn.dataset.bound = 'true';
        trackBtn.addEventListener('click', () => onFilter((input?.value || '').trim()));
    }

    if (input && !input.dataset.bound) {
        input.dataset.bound = 'true';
        input.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            onFilter((input.value || '').trim());
        });
    }

    if (clearBtn && !clearBtn.dataset.bound) {
        clearBtn.dataset.bound = 'true';
        clearBtn.addEventListener('click', () => {
            if (input) input.value = '';
            onFilter('');
        });
    }

    return input;
}

function copyText(value) {
    const text = String(value || '').trim();
    if (!text) return Promise.reject(new Error('empty'));

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', 'readonly');
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        try {
            const ok = document.execCommand('copy');
            document.body.removeChild(el);
            if (ok) resolve();
            else reject(new Error('copy_failed'));
        } catch (err) {
            document.body.removeChild(el);
            reject(err);
        }
    });
}

function renderDashboardOrders(user) {
    const tableBody = document.getElementById('ordersTableBody');
    const mobileList = document.getElementById('ordersMobileList');
    const statActiveProjects = document.getElementById('statActiveProjects');
    const statPendingOrders = document.getElementById('statPendingOrders');
    const statTotalOrders = document.getElementById('statTotalOrders');
    const statCompletedOrders = document.getElementById('statCompletedOrders');
    const dashboardRoleHint = document.getElementById('dashboardRoleHint');

    if (!tableBody) return;

    const allOrders = getStoredOrders();
    const userEmail = normalizeEmail(user?.email);
    const userOrders = allOrders.filter((order) => {
        const linkedEmail = normalizeEmail(order.userEmail || order.email);
        return linkedEmail && linkedEmail === userEmail;
    });

    const trackingInput = ensureDashboardTrackingControls((term) => {
        const nextUrl = new URL(window.location.href);
        if (term) {
            nextUrl.searchParams.set('track', term);
        } else {
            nextUrl.searchParams.delete('track');
        }
        history.replaceState({}, '', nextUrl.toString());
        renderDashboardOrders(user);
    });

    const trackParam = new URL(window.location.href).searchParams.get('track') || '';
    if (trackingInput) trackingInput.value = trackParam;

    const trackTerm = String(trackParam || '').trim().toLowerCase();
    const filteredOrders = !trackTerm
        ? userOrders
        : userOrders.filter((order) => String(order.id || '').toLowerCase().includes(trackTerm) || String(order.trackingCode || '').toLowerCase().includes(trackTerm));

    if (dashboardRoleHint) {
        dashboardRoleHint.textContent = t('dashboardClientMode');
    }

    const pendingOrders = filteredOrders.filter((order) => (order.status || '').includes('قيد')).length;
    const completedOrders = filteredOrders.filter((order) => {
        const status = String(order.status || '').toLowerCase();
        return status.includes('مكتمل') || status.includes('completed') || status.includes('termine');
    }).length;

    if (statActiveProjects) statActiveProjects.textContent = String(filteredOrders.length);
    if (statPendingOrders) statPendingOrders.textContent = String(pendingOrders);
    if (statTotalOrders) statTotalOrders.textContent = String(filteredOrders.length);
    if (statCompletedOrders) statCompletedOrders.textContent = String(completedOrders);

    if (filteredOrders.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="px-4 py-6 text-center text-gray-500">${escapeHtml(t('dashboardNoOrders'))}</td></tr>`;
        if (mobileList) {
            mobileList.innerHTML = `<article class="border border-white/10 rounded-xl p-4 bg-black/30 text-gray-400 text-sm text-center">${escapeHtml(t('dashboardNoOrders'))}</article>`;
        }
        return;
    }

    tableBody.innerHTML = '';
    if (mobileList) mobileList.innerHTML = '';

    filteredOrders.forEach((order) => {
        const safeService = escapeHtml(order.serviceName || 'طلب غير محدد');
        const safeDate = escapeHtml(formatLocalizedDateTime(order.createdAt || new Date().toISOString()));
        const currentStatus = order.status || DEFAULT_SITE_SETTINGS.orders.defaultStatus;
        const safeStatus = escapeHtml(getLocalizedOrderStatus(currentStatus));
        const safeEmail = escapeHtml(order.email || order.userEmail || '-');
        const safeLastUpdate = escapeHtml(formatLocalizedDateTime(order.lastUpdateAt || order.createdAt || new Date().toISOString()));
        const statusMeta = getStatusMeta(currentStatus);
        const safeTrack = escapeHtml(order.trackingCode || order.id || '-');

        tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                        <span class="text-gray-200 font-en">${safeTrack}</span>
                        <button type="button" class="copy-track-btn text-[11px] px-2 py-1 rounded border border-white/20 text-gray-200 hover:border-brand-red hover:text-white" data-track="${safeTrack}">نسخ</button>
                    </div>
                </td>
                <td class="px-4 py-3 font-bold text-white">
                    <div>${safeService}</div>
                </td>
                <td class="px-4 py-3 text-gray-300 number-font">${safeDate}</td>
                <td class="px-4 py-3">
                    <div class="flex flex-col gap-2">
                        <span class="text-xs px-2 py-1 rounded-full border ${statusMeta.className} w-fit">${safeStatus}</span>
                        <span class="text-[11px] text-gray-500">${escapeHtml(t('dashboardLastUpdate'))} ${safeLastUpdate}</span>
                    </div>
                </td>
                <td class="px-4 py-3 text-xs text-gray-300 font-en">${safeEmail}</td>
            </tr>
        `);

        if (mobileList) {
            mobileList.insertAdjacentHTML('beforeend', `
                <article class="border border-white/10 rounded-xl p-4 bg-black/30">
                    <div class="flex items-start justify-between gap-3 mb-3">
                        <h4 class="text-white font-bold text-sm">${safeService}</h4>
                        <span class="text-[11px] px-2 py-1 rounded-full border ${statusMeta.className}">${safeStatus}</span>
                    </div>
                    <p class="text-xs text-gray-500 mb-2">رقم الطلب: <span class="font-en">${safeTrack}</span></p>
                    <p class="text-xs text-gray-400 mb-2">${escapeHtml(t('dashboardOrderDate'))} <span class="font-en">${safeDate}</span></p>
                    <p class="text-xs text-gray-300 mb-2">البريد: <span class="font-en">${safeEmail}</span></p>
                    <button type="button" class="copy-track-btn mt-1 text-xs px-2 py-1 rounded border border-white/20 text-gray-200 hover:border-brand-red hover:text-white" data-track="${safeTrack}">نسخ رقم الطلب</button>
                    <p class="text-[11px] text-gray-500 mt-2">${escapeHtml(t('dashboardLastUpdate'))} ${safeLastUpdate}</p>
                </article>
            `);
        }
    });

    const copyButtons = document.querySelectorAll('.copy-track-btn');
    copyButtons.forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', async () => {
            const track = btn.getAttribute('data-track') || '';
            try {
                await copyText(track);
                showAuthMessage('✅ تم نسخ رقم الطلب.', 'success');
            } catch {
                showAuthMessage('❌ تعذر نسخ رقم الطلب.', 'error');
            }
        });
    });
}

function setupDashboardSecurity(user) {
    const changeEmailForm = document.getElementById('changeEmailForm');
    const changePasswordForm = document.getElementById('changePasswordForm');

    if (changeEmailForm && !changeEmailForm.dataset.bound) {
        changeEmailForm.dataset.bound = 'true';
        changeEmailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newEmail = document.getElementById('newEmail')?.value?.trim();
            const currentPassword = document.getElementById('reauthPasswordForEmail')?.value || '';

            if (!newEmail || !currentPassword) {
                showAuthMessage('❌ أدخل البريد الجديد وكلمة المرور الحالية.', 'error');
                return;
            }

            const reauth = await _supabase.auth.signInWithPassword({
                email: user.email,
                password: currentPassword,
            });

            if (reauth.error) {
                showAuthMessage('❌ فشل التحقق من الهوية. كلمة المرور الحالية غير صحيحة.', 'error');
                return;
            }

            const { error } = await _supabase.auth.updateUser({ email: newEmail });
            if (error) {
                showAuthMessage(`❌ ${error.message}`, 'error');
                return;
            }

            showAuthMessage('✅ تم طلب تغيير البريد. تحقق من البريد الجديد لإتمام العملية.', 'success');
            changeEmailForm.reset();
        });
    }

    if (changePasswordForm && !changePasswordForm.dataset.bound) {
        changePasswordForm.dataset.bound = 'true';
        changePasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('currentPassword')?.value || '';
            const newPassword = document.getElementById('newPassword')?.value || '';
            const confirmNewPassword = document.getElementById('confirmNewPassword')?.value || '';

            if (newPassword.length < 8) {
                showAuthMessage('❌ كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل.', 'error');
                return;
            }

            if (newPassword !== confirmNewPassword) {
                showAuthMessage('❌ تأكيد كلمة المرور غير مطابق.', 'error');
                return;
            }

            const reauth = await _supabase.auth.signInWithPassword({
                email: user.email,
                password: currentPassword,
            });

            if (reauth.error) {
                showAuthMessage('❌ فشل التحقق من الهوية. كلمة المرور الحالية غير صحيحة.', 'error');
                return;
            }

            const { error } = await _supabase.auth.updateUser({ password: newPassword });
            if (error) {
                showAuthMessage(`❌ ${error.message}`, 'error');
                return;
            }

            showAuthMessage('✅ تم تغيير كلمة المرور بنجاح. ستصلك رسالة أمان على البريد.', 'success');
            changePasswordForm.reset();
        });
    }

}

function setupAdminInviteUser() {
    const form = document.getElementById('inviteUserForm');
    const msgBox = document.getElementById('inviteMsgBox');
    const submitBtn = document.getElementById('inviteSubmitBtn');

    if (!form || form.dataset.bound) return;
    form.dataset.bound = 'true';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('inviteEmail')?.value?.trim();
        const role = document.getElementById('inviteRole')?.value === 'admin' ? 'admin' : 'client';

        if (!email) {
            if (msgBox) {
                msgBox.textContent = '❌ أدخل البريد الإلكتروني أولاً.';
                msgBox.className = 'msg-box msg-error active';
            }
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'جاري إرسال الدعوة...';
        }

        const { data, error } = await _supabase.functions.invoke('invite-user', {
            body: {
                email,
                role,
                redirectTo: getAuthCallbackUrl('invite'),
            },
        });

        if (error) {
            if (msgBox) {
                msgBox.textContent = `❌ ${error.message}`;
                msgBox.className = 'msg-box msg-error active';
            }
        } else if (!data?.success) {
            if (msgBox) {
                msgBox.textContent = `❌ ${data?.error || 'فشل إرسال الدعوة.'}`;
                msgBox.className = 'msg-box msg-error active';
            }
        } else {
            if (msgBox) {
                msgBox.textContent = `✅ تم إرسال الدعوة إلى ${email} (${role}).`;
                msgBox.className = 'msg-box msg-success active';
            }
            form.reset();
            const roleSelect = document.getElementById('inviteRole');
            if (roleSelect) roleSelect.value = 'client';
            renderInviteAuditLog();
        }

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'إرسال دعوة';
        }
    });
}

async function renderInviteAuditLog() {
    const tableBody = document.getElementById('inviteAuditTableBody');
    if (!tableBody) return;

    const { data, error } = await _supabase
        .from(TABLES.inviteAudit)
        .select('id, inviter_email, invited_email, invited_role, created_at')
        .order('created_at', { ascending: false })
        .limit(30);

    if (error) {
        tableBody.innerHTML = '<tr><td colspan="5" class="px-4 py-5 text-center text-red-300">تعذر تحميل سجل الدعوات حالياً.</td></tr>';
        return;
    }

    if (!Array.isArray(data) || data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="px-4 py-5 text-center text-gray-500">لا توجد دعوات مرسلة بعد.</td></tr>';
        return;
    }

    tableBody.innerHTML = '';
    data.forEach((row) => {
        tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="px-4 py-3 font-en text-gray-400">${escapeHtml(String(row.id || '-'))}</td>
                <td class="px-4 py-3 font-en">${escapeHtml(row.inviter_email || '-')}</td>
                <td class="px-4 py-3 font-en">${escapeHtml(row.invited_email || '-')}</td>
                <td class="px-4 py-3">
                    <span class="text-xs px-2 py-1 rounded-full border ${row.invited_role === 'admin' ? 'border-blue-400/40 bg-blue-500/10 text-blue-200' : 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'}">${escapeHtml(row.invited_role || 'client')}</span>
                </td>
                <td class="px-4 py-3 text-gray-300 number-font">${escapeHtml(formatArabicDateTime(row.created_at))}</td>
            </tr>
        `);
    });
}

function getDisputeStatusLabel(status) {
    if (status === 'open') return 'مفتوح';
    if (status === 'in_review') return 'قيد المراجعة';
    if (status === 'resolved') return 'محلول';
    if (status === 'refunded') return 'تم الاسترجاع';
    if (status === 'rejected') return 'مرفوض';
    return status;
}

function renderAdminStats() {
    const orders = getStoredOrders();
    const disputes = getStoredDisputes();
    const offers = getStoredOffers();
    const discounts = getStoredDiscounts();

    const totalOrders = orders.length;
    const openDisputes = disputes.filter((d) => d.status === 'open' || d.status === 'in_review').length;
    const activeOffers = offers.filter((o) => o.enabled).length;
    const customerDiscounts = discounts.customerRules.filter((r) => r.enabled).length;

    const totalOrdersEl = document.getElementById('adminStatTotalOrders');
    const openDisputesEl = document.getElementById('adminStatOpenDisputes');
    const activeOffersEl = document.getElementById('adminStatActiveOffers');
    const customerDiscountsEl = document.getElementById('adminStatCustomerDiscounts');

    if (totalOrdersEl) totalOrdersEl.textContent = String(totalOrders);
    if (openDisputesEl) openDisputesEl.textContent = String(openDisputes);
    if (activeOffersEl) activeOffersEl.textContent = String(activeOffers);
    if (customerDiscountsEl) customerDiscountsEl.textContent = String(customerDiscounts);
}

function renderAdminOrdersSection() {
    const body = document.getElementById('adminOrdersTableBody');
    const completedBody = document.getElementById('adminCompletedOrdersTableBody');
    if (!body || !completedBody) return;

    const searchInput = document.getElementById('adminOrdersSearchInput');
    const searchBtn = document.getElementById('adminOrdersSearchBtn');
    const clearBtn = document.getElementById('adminOrdersSearchClearBtn');

    const allOrders = getStoredOrders();
    const searchTerm = String(searchInput?.value || '').trim().toLowerCase();
    const orders = !searchTerm
        ? allOrders
        : allOrders.filter((order) => String(order.id || order.trackingCode || '').toLowerCase().includes(searchTerm));

    const isCompletedStatus = (status) => {
        const value = String(status || '').toLowerCase();
        return value.includes('مكتمل') || value.includes('completed') || value.includes('termine');
    };

    const activeOrders = orders.filter((order) => !isCompletedStatus(order.status));
    const completedOrders = orders.filter((order) => isCompletedStatus(order.status));

    if (allOrders.length === 0) {
        body.innerHTML = '<tr><td colspan="6" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات حالياً.</td></tr>';
        completedBody.innerHTML = '<tr><td colspan="6" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات مكتملة حالياً.</td></tr>';
        return;
    }

    body.innerHTML = '';
    if (activeOrders.length === 0) {
        body.innerHTML = '<tr><td colspan="6" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات قيد المتابعة حالياً.</td></tr>';
    }

    activeOrders.forEach((order) => {
        const safeSpecs = escapeHtml(order.specs || '-');
        const statusOptions = ORDER_STATUS_OPTIONS.map((status) => {
            const selected = status === order.status ? 'selected' : '';
            return `<option value="${escapeHtml(status)}" ${selected}>${escapeHtml(status)}</option>`;
        }).join('');

        body.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="px-4 py-3 font-en">${escapeHtml(order.id || '-')}</td>
                <td class="px-4 py-3 text-white font-bold">${escapeHtml(order.serviceName || '-')}</td>
                <td class="px-4 py-3 font-en">${escapeHtml(order.userEmail || order.email || '-')}</td>
                <td class="px-4 py-3">${escapeHtml(formatArabicDateTime(order.createdAt || ''))}</td>
                <td class="px-4 py-3 text-gray-300 max-w-[260px]"><div class="max-h-16 overflow-y-auto break-words">${safeSpecs}</div></td>
                <td class="px-4 py-3">
                    <select class="order-status-select input-luxury !py-2 !px-3 !text-xs" data-order-id="${escapeHtml(order.id || '')}">
                        ${statusOptions}
                    </select>
                </td>
            </tr>
        `);
    });

    completedBody.innerHTML = '';
    if (completedOrders.length === 0) {
        completedBody.innerHTML = '<tr><td colspan="6" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات مكتملة حالياً.</td></tr>';
    }

    completedOrders.forEach((order) => {
        const safeSpecs = escapeHtml(order.specs || '-');
        completedBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="px-4 py-3 font-en">${escapeHtml(order.id || '-')}</td>
                <td class="px-4 py-3 text-white font-bold">${escapeHtml(order.serviceName || '-')}</td>
                <td class="px-4 py-3 font-en">${escapeHtml(order.userEmail || order.email || '-')}</td>
                <td class="px-4 py-3">${escapeHtml(formatArabicDateTime(order.createdAt || ''))}</td>
                <td class="px-4 py-3 text-gray-300 max-w-[260px]"><div class="max-h-16 overflow-y-auto break-words">${safeSpecs}</div></td>
                <td class="px-4 py-3">
                    <button class="delete-completed-order px-3 py-2 rounded-lg border border-red-400/40 text-red-300 hover:bg-red-500/20 text-xs font-bold" data-order-id="${escapeHtml(order.id || '')}">حذف</button>
                </td>
            </tr>
        `);
    });

    const controls = document.querySelectorAll('#adminOrdersTableBody .order-status-select');
    controls.forEach((control) => {
        control.addEventListener('change', () => {
            const orderId = control.dataset.orderId;
            const newStatus = control.value;
            if (!orderId || !newStatus) return;

            updateOrderStatus(orderId, newStatus);
            renderAdminOrdersSection();
            renderAdminStats();
        });
    });

    const deleteCompletedButtons = document.querySelectorAll('.delete-completed-order');
    deleteCompletedButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const orderId = btn.dataset.orderId;
            if (!orderId) return;
            const updated = getStoredOrders().filter((order) => order.id !== orderId);
            saveStoredOrders(updated);
            renderAdminOrdersSection();
            renderAdminStats();
        });
    });

    if (searchBtn && searchBtn.dataset.bound !== 'true') {
        searchBtn.dataset.bound = 'true';
        searchBtn.addEventListener('click', () => {
            renderAdminOrdersSection();
        });
    }

    if (clearBtn && clearBtn.dataset.bound !== 'true') {
        clearBtn.dataset.bound = 'true';
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            renderAdminOrdersSection();
        });
    }

    if (searchInput && searchInput.dataset.bound !== 'true') {
        searchInput.dataset.bound = 'true';
        searchInput.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            renderAdminOrdersSection();
        });
    }
}

function renderDisputesSection() {
    const list = document.getElementById('disputesList');
    if (!list) return;

    const disputes = getStoredDisputes().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (disputes.length === 0) {
        list.innerHTML = '<div class="text-gray-500 text-sm">لا توجد نزاعات مالية حالياً.</div>';
        return;
    }

    list.innerHTML = '';
    disputes.forEach((dispute) => {
        list.insertAdjacentHTML('beforeend', `
            <article class="border border-white/10 rounded-xl p-4 bg-black/30">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <p class="text-sm text-white font-bold">طلب: <span class="font-en">${escapeHtml(dispute.orderId)}</span></p>
                    <div class="flex items-center gap-2">
                        <select class="dispute-status input-luxury !py-1 !px-2 !text-xs" data-id="${escapeHtml(dispute.id)}">
                            <option value="open" ${dispute.status === 'open' ? 'selected' : ''}>مفتوح</option>
                            <option value="in_review" ${dispute.status === 'in_review' ? 'selected' : ''}>قيد المراجعة</option>
                            <option value="resolved" ${dispute.status === 'resolved' ? 'selected' : ''}>محلول</option>
                            <option value="refunded" ${dispute.status === 'refunded' ? 'selected' : ''}>تم الاسترجاع</option>
                            <option value="rejected" ${dispute.status === 'rejected' ? 'selected' : ''}>مرفوض</option>
                        </select>
                        <button class="delete-dispute text-xs px-2 py-1 rounded border border-red-400/40 text-red-300" data-id="${escapeHtml(dispute.id)}">حذف</button>
                    </div>
                </div>
                <p class="text-xs text-gray-400 font-en" dir="ltr">${escapeHtml(dispute.clientEmail)} | ${escapeHtml(String(dispute.amount))} ${escapeHtml(dispute.currency)} | ${escapeHtml(dispute.channel)}</p>
                <p class="text-sm text-gray-300 mt-2">${escapeHtml(dispute.reason)}</p>
                <p class="text-xs text-gray-500 mt-2">${escapeHtml(dispute.notes || '')}</p>
                <p class="text-[11px] text-gray-500 mt-2">آخر تحديث: ${escapeHtml(formatArabicDateTime(dispute.updatedAt || dispute.createdAt))}</p>
            </article>
        `);
    });

    const statusControls = document.querySelectorAll('.dispute-status');
    statusControls.forEach((control) => {
        control.addEventListener('change', () => {
            const id = control.dataset.id;
            const disputesNow = getStoredDisputes();
            const updated = disputesNow.map((d) => {
                if (d.id !== id) return d;
                return {
                    ...d,
                    status: control.value,
                    updatedAt: new Date().toISOString(),
                };
            });
            saveStoredDisputes(updated);
            renderDisputesSection();
            renderAdminStats();
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-dispute');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const updated = getStoredDisputes().filter((d) => d.id !== id);
            saveStoredDisputes(updated);
            renderDisputesSection();
            renderAdminStats();
        });
    });
}

function renderOffersAdminSection() {
    const list = document.getElementById('offersList');
    if (!list) return;

    const offers = getStoredOffers().sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));

    if (offers.length === 0) {
        list.innerHTML = '<div class="text-gray-500 text-sm">لا توجد عروض بعد.</div>';
        return;
    }

    list.innerHTML = '';
    offers.forEach((offer) => {
        list.insertAdjacentHTML('beforeend', `
            <article class="border border-white/10 rounded-xl p-4 bg-black/30">
                <div class="flex items-center justify-between gap-3 mb-2">
                    <h4 class="text-white font-bold text-sm">${escapeHtml(offer.title)}</h4>
                    <div class="flex items-center gap-2">
                        <label class="text-xs text-gray-300 flex items-center gap-1">
                            <input type="checkbox" class="toggle-offer" data-id="${escapeHtml(offer.id)}" ${offer.enabled ? 'checked' : ''}>
                            نشط
                        </label>
                        <button class="edit-offer text-xs px-2 py-1 rounded border border-blue-400/40 text-blue-200" data-id="${escapeHtml(offer.id)}">تعديل</button>
                        <button class="delete-offer text-xs px-2 py-1 rounded border border-red-400/40 text-red-300" data-id="${escapeHtml(offer.id)}">حذف</button>
                    </div>
                </div>
                <p class="text-sm text-gray-300">${escapeHtml(offer.description || '')}</p>
                <p class="text-xs text-emerald-300 mt-2">${escapeHtml(offer.badge || '')}</p>
                <p class="text-[11px] text-gray-500 mt-2">الاستهداف: ${offer.target === 'customer' ? `عميل محدد (${escapeHtml(offer.targetEmail || '-')})` : 'كل العملاء'}</p>
            </article>
        `);
    });

    const toggles = document.querySelectorAll('.toggle-offer');
    toggles.forEach((toggle) => {
        toggle.addEventListener('change', () => {
            const id = toggle.dataset.id;
            const updated = getStoredOffers().map((o) => {
                if (o.id !== id) return o;
                return {
                    ...o,
                    enabled: toggle.checked,
                    updatedAt: new Date().toISOString(),
                };
            });
            saveStoredOffers(updated);
            renderOffersAdminSection();
            renderAdminStats();
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-offer');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const updated = getStoredOffers().filter((o) => o.id !== id);
            saveStoredOffers(updated);
            renderOffersAdminSection();
            renderAdminStats();
        });
    });

    const editButtons = document.querySelectorAll('.edit-offer');
    editButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const offer = getStoredOffers().find((item) => item.id === id);
            if (!offer) return;

            const editIdEl = document.getElementById('offerEditId');
            const titleEl = document.getElementById('offerTitle');
            const descriptionEl = document.getElementById('offerDescription');
            const badgeEl = document.getElementById('offerBadge');
            const targetEl = document.getElementById('offerTarget');
            const targetEmailEl = document.getElementById('offerTargetEmail');
            const enabledEl = document.getElementById('offerEnabled');
            const submitBtn = document.getElementById('offerSubmitBtn');
            const cancelBtn = document.getElementById('offerCancelEditBtn');

            if (editIdEl) editIdEl.value = offer.id;
            if (titleEl) titleEl.value = offer.title || '';
            if (descriptionEl) descriptionEl.value = offer.description || '';
            if (badgeEl) badgeEl.value = offer.badge || '';
            if (targetEl) targetEl.value = offer.target || 'all';
            if (targetEmailEl) targetEmailEl.value = offer.targetEmail || '';
            if (enabledEl) enabledEl.checked = Boolean(offer.enabled);
            if (submitBtn) submitBtn.textContent = 'تحديث العرض';
            if (cancelBtn) cancelBtn.classList.remove('hidden');

            document.getElementById('offerForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

function resetOfferForm() {
    const form = document.getElementById('offerForm');
    if (!form) return;

    form.reset();
    const editIdEl = document.getElementById('offerEditId');
    const enabledEl = document.getElementById('offerEnabled');
    const submitBtn = document.getElementById('offerSubmitBtn');
    const cancelBtn = document.getElementById('offerCancelEditBtn');

    if (editIdEl) editIdEl.value = '';
    if (enabledEl) enabledEl.checked = true;
    if (submitBtn) submitBtn.textContent = 'حفظ العرض';
    if (cancelBtn) cancelBtn.classList.add('hidden');
}

function renderServicesAdminSection() {
    const list = document.getElementById('servicesList');
    if (!list) return;

    const services = getStoredServices().sort((a, b) => (a.popularity || 999) - (b.popularity || 999));

    if (services.length === 0) {
        list.innerHTML = '<div class="text-gray-500 text-sm">لا توجد خدمات بعد.</div>';
        return;
    }

    list.innerHTML = '';
    services.forEach((service) => {
        list.insertAdjacentHTML('beforeend', `
            <article class="border border-white/10 rounded-xl p-4 bg-black/30">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                    <div>
                        <h4 class="text-white font-bold text-sm">${escapeHtml(service.titles?.ar || '-')}</h4>
                        <p class="text-[11px] text-gray-500 mt-1">${escapeHtml(service.category || '-')} | الترتيب: ${escapeHtml(String(service.popularity || 0))}</p>
                    </div>
                    <div class="flex items-center gap-2 flex-wrap">
                        <label class="text-xs text-gray-300 flex items-center gap-1">
                            <input type="checkbox" class="toggle-service-enabled" data-id="${escapeHtml(service.id)}" ${service.enabled ? 'checked' : ''}>
                            نشط
                        </label>
                        <label class="text-xs text-gray-300 flex items-center gap-1">
                            <input type="checkbox" class="toggle-service-soon" data-id="${escapeHtml(service.id)}" ${service.is_coming_soon ? 'checked' : ''}>
                            قريباً
                        </label>
                        <button class="edit-service text-xs px-2 py-1 rounded border border-blue-400/40 text-blue-200" data-id="${escapeHtml(service.id)}">تعديل</button>
                        <button class="delete-service text-xs px-2 py-1 rounded border border-red-400/40 text-red-300" data-id="${escapeHtml(service.id)}">حذف</button>
                    </div>
                </div>
                <p class="text-sm text-gray-300 mb-2">${escapeHtml(service.descriptions?.ar || '')}</p>
                <p class="text-xs text-emerald-300">السعر: ${escapeHtml(String(service.price || '0'))} MAD</p>
            </article>
        `);
    });

    const enabledToggles = document.querySelectorAll('.toggle-service-enabled');
    enabledToggles.forEach((toggle) => {
        toggle.addEventListener('change', () => {
            const id = toggle.dataset.id;
            const updated = getStoredServices().map((service) => {
                if (service.id !== id) return service;
                return {
                    ...service,
                    enabled: toggle.checked,
                    updatedAt: new Date().toISOString(),
                };
            });
            saveStoredServices(updated);
            renderServicesAdminSection();
        });
    });

    const soonToggles = document.querySelectorAll('.toggle-service-soon');
    soonToggles.forEach((toggle) => {
        toggle.addEventListener('change', () => {
            const id = toggle.dataset.id;
            const updated = getStoredServices().map((service) => {
                if (service.id !== id) return service;
                return {
                    ...service,
                    is_coming_soon: toggle.checked,
                    updatedAt: new Date().toISOString(),
                };
            });
            saveStoredServices(updated);
            renderServicesAdminSection();
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-service');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const updated = getStoredServices().filter((service) => service.id !== id);
            saveStoredServices(updated);
            renderServicesAdminSection();
        });
    });

    const editButtons = document.querySelectorAll('.edit-service');
    editButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const service = getStoredServices().find((item) => item.id === id);
            if (!service) return;

            const editIdEl = document.getElementById('serviceEditId');
            const categoryEl = document.getElementById('serviceCategory');
            const titleEl = document.getElementById('serviceTitle');
            const priceEl = document.getElementById('servicePrice');
            const popularityEl = document.getElementById('servicePopularity');
            const descriptionEl = document.getElementById('serviceDescription');
            const comingSoonEl = document.getElementById('serviceComingSoon');
            const enabledEl = document.getElementById('serviceEnabled');
            const submitBtn = document.getElementById('serviceSubmitBtn');
            const cancelBtn = document.getElementById('serviceCancelEditBtn');

            if (editIdEl) editIdEl.value = service.id;
            if (categoryEl) categoryEl.value = service.category || '';
            if (titleEl) titleEl.value = service.titles?.ar || '';
            if (priceEl) priceEl.value = service.price || '';
            if (popularityEl) popularityEl.value = String(service.popularity || 1);
            if (descriptionEl) descriptionEl.value = service.descriptions?.ar || '';
            if (comingSoonEl) comingSoonEl.checked = Boolean(service.is_coming_soon);
            if (enabledEl) enabledEl.checked = Boolean(service.enabled);
            if (submitBtn) submitBtn.textContent = 'تحديث الخدمة';
            if (cancelBtn) cancelBtn.classList.remove('hidden');

            document.getElementById('serviceForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

function resetServiceForm() {
    const form = document.getElementById('serviceForm');
    if (!form) return;

    form.reset();
    const editIdEl = document.getElementById('serviceEditId');
    const enabledEl = document.getElementById('serviceEnabled');
    const submitBtn = document.getElementById('serviceSubmitBtn');
    const cancelBtn = document.getElementById('serviceCancelEditBtn');

    if (editIdEl) editIdEl.value = '';
    if (enabledEl) enabledEl.checked = true;
    if (submitBtn) submitBtn.textContent = 'حفظ الخدمة';
    if (cancelBtn) cancelBtn.classList.add('hidden');
}

function renderDiscountsSection() {
    const discounts = getStoredDiscounts();

    const codeEl = document.getElementById('globalDiscountCode');
    const typeEl = document.getElementById('globalDiscountType');
    const valueEl = document.getElementById('globalDiscountValue');
    const endsAtEl = document.getElementById('globalDiscountEndsAt');
    const enabledEl = document.getElementById('globalDiscountEnabled');

    if (codeEl) codeEl.value = discounts.global.code || '';
    if (typeEl) typeEl.value = discounts.global.type || 'percent';
    if (valueEl) valueEl.value = String(discounts.global.value || 0);
    if (endsAtEl) endsAtEl.value = formatDateInput(discounts.global.endsAt || '');
    if (enabledEl) enabledEl.checked = Boolean(discounts.global.enabled);

    const list = document.getElementById('customerDiscountsList');
    if (!list) return;

    if (!Array.isArray(discounts.customerRules) || discounts.customerRules.length === 0) {
        list.innerHTML = '<div class="text-gray-500 text-sm">لا توجد خصومات مخصصة حالياً.</div>';
        return;
    }

    list.innerHTML = '';
    discounts.customerRules.forEach((rule) => {
        const humanValue = rule.type === 'percent' ? `${rule.value}%` : `${rule.value} MAD`;
        list.insertAdjacentHTML('beforeend', `
            <article class="border border-white/10 rounded-xl p-4 bg-black/30">
                <div class="flex items-center justify-between gap-3 mb-2">
                    <p class="text-sm text-white font-en">${escapeHtml(rule.email)}</p>
                    <div class="flex items-center gap-2">
                        <label class="text-xs text-gray-300 flex items-center gap-1">
                            <input type="checkbox" class="toggle-customer-discount" data-id="${escapeHtml(rule.id)}" ${rule.enabled ? 'checked' : ''}>
                            نشط
                        </label>
                        <button class="delete-customer-discount text-xs px-2 py-1 rounded border border-red-400/40 text-red-300" data-id="${escapeHtml(rule.id)}">حذف</button>
                    </div>
                </div>
                <p class="text-xs text-emerald-300">${escapeHtml(rule.code)} - ${escapeHtml(humanValue)}</p>
                <p class="text-[11px] text-gray-500 mt-1">ينتهي: ${escapeHtml(rule.endsAt ? formatArabicDateTime(rule.endsAt) : 'بدون تاريخ انتهاء')}</p>
            </article>
        `);
    });

    const toggles = document.querySelectorAll('.toggle-customer-discount');
    toggles.forEach((toggle) => {
        toggle.addEventListener('change', () => {
            const id = toggle.dataset.id;
            const data = getStoredDiscounts();
            data.customerRules = data.customerRules.map((rule) => {
                if (rule.id !== id) return rule;
                return {
                    ...rule,
                    enabled: toggle.checked,
                    updatedAt: new Date().toISOString(),
                };
            });
            saveStoredDiscounts(data);
            renderDiscountsSection();
            renderAdminStats();
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-customer-discount');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const data = getStoredDiscounts();
            data.customerRules = data.customerRules.filter((rule) => rule.id !== id);
            saveStoredDiscounts(data);
            renderDiscountsSection();
            renderAdminStats();
        });
    });
}

async function loadI18nFilePayload(page, lang) {
    const safePage = normalizePageSlug(page);
    const safeLang = normalizeLang(lang);
    if (!safePage) return null;

    const byLangUrl = `content/${safePage}.${safeLang}.json`;
    try {
        const byLangResponse = await fetch(byLangUrl, { cache: 'no-store' });
        if (byLangResponse.ok) {
            const json = await byLangResponse.json();
            return normalizeI18nPayload(json);
        }
    } catch {
        // Ignore missing static file and continue to fallback.
    }

    const legacyUrl = `content/${safePage}.json`;
    try {
        const legacyResponse = await fetch(legacyUrl, { cache: 'no-store' });
        if (!legacyResponse.ok) return null;
        const json = await legacyResponse.json();
        return normalizeI18nPayload(json);
    } catch {
        return null;
    }
}

async function loadI18nOverridePayload(page, lang) {
    const safePage = normalizePageSlug(page);
    const safeLang = normalizeLang(lang);
    if (!safePage) return null;

    try {
        const { data, error } = await _supabase
            .from(TABLES.i18nPages)
            .select('title,meta_description,texts,attributes')
            .eq('page', safePage)
            .eq('lang', safeLang)
            .maybeSingle();

        if (error || !data) return null;
        return normalizeI18nPayload({
            title: data.title,
            metaDescription: data.meta_description,
            texts: data.texts,
            attributes: data.attributes,
        });
    } catch {
        return null;
    }
}

function buildI18nAdminPayloadFromForm() {
    const title = document.getElementById('i18nTitle')?.value || '';
    const metaDescription = document.getElementById('i18nMetaDescription')?.value || '';
    const textsRaw = document.getElementById('i18nTexts')?.value || '';
    const attributesRaw = document.getElementById('i18nAttributes')?.value || '';

    const texts = textsRaw
        .split(/\r?\n/g)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    let attributes = [];
    if (attributesRaw.trim()) {
        const parsed = JSON.parse(attributesRaw);
        if (Array.isArray(parsed)) {
            attributes = parsed;
        } else {
            throw new Error('Attributes must be a JSON array.');
        }
    }

    return normalizeI18nPayload({ title, metaDescription, texts, attributes });
}

function getI18nAdminTarget() {
    const selectValue = document.getElementById('i18nPageSelect')?.value || '';
    const manualSlug = document.getElementById('i18nPageSlugInput')?.value || '';
    const langValue = document.getElementById('i18nLangSelect')?.value || I18N_DEFAULT_LANG;

    const page = normalizePageSlug(manualSlug || selectValue);
    const lang = normalizeLang(langValue);

    return { page, lang };
}

function renderI18nFormPayload(payload) {
    const safePayload = normalizeI18nPayload(payload);

    const titleEl = document.getElementById('i18nTitle');
    const metaEl = document.getElementById('i18nMetaDescription');
    const textsEl = document.getElementById('i18nTexts');
    const attributesEl = document.getElementById('i18nAttributes');

    if (titleEl) titleEl.value = safePayload.title;
    if (metaEl) metaEl.value = safePayload.metaDescription;
    if (textsEl) textsEl.value = safePayload.texts.join('\n');
    if (attributesEl) {
        attributesEl.value = safePayload.attributes.length > 0
            ? JSON.stringify(safePayload.attributes, null, 2)
            : '';
    }
}

async function loadI18nIntoAdminForm() {
    const msgBox = document.getElementById('i18nMsgBox');
    const { page, lang } = getI18nAdminTarget();
    if (!page) {
        showInlineMessage(msgBox, '❌ اختر الصفحة أو أدخل slug صحيح.', 'error');
        return;
    }

    const [basePayload, overridePayload] = await Promise.all([
        loadI18nFilePayload(page, lang),
        loadI18nOverridePayload(page, lang),
    ]);

    const finalPayload = mergeI18nPayload(basePayload, overridePayload);
    renderI18nFormPayload(finalPayload);

    showInlineMessage(msgBox, `✅ تم تحميل بيانات ${page} (${lang.toUpperCase()}).`, 'success');
}

async function saveI18nFromAdminForm() {
    const msgBox = document.getElementById('i18nMsgBox');
    const saveBtn = document.getElementById('i18nSaveBtn');
    const { page, lang } = getI18nAdminTarget();

    if (!page) {
        showInlineMessage(msgBox, '❌ اختر الصفحة أو أدخل slug صحيح.', 'error');
        return;
    }

    let payload;
    try {
        payload = buildI18nAdminPayloadFromForm();
    } catch (error) {
        showInlineMessage(msgBox, `❌ ${error.message}`, 'error');
        return;
    }

    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';
    }

    try {
        const { error } = await _supabase
            .from(TABLES.i18nPages)
            .upsert({
                page,
                lang,
                title: payload.title,
                meta_description: payload.metaDescription,
                texts: payload.texts,
                attributes: payload.attributes,
                updated_by: currentSessionUser?.email || null,
            }, { onConflict: 'page,lang' });

        if (error) {
            showInlineMessage(msgBox, `❌ ${error.message}`, 'error');
            return;
        }

        showInlineMessage(msgBox, `✅ تم حفظ الترجمة: ${page} (${lang.toUpperCase()}).`, 'success');
    } finally {
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.textContent = 'حفظ الترجمة';
        }
    }
}

function resetI18nAdminForm() {
    renderI18nFormPayload({ title: '', metaDescription: '', texts: [], attributes: [] });
}

function setupAdminI18nManager() {
    const pageSelect = document.getElementById('i18nPageSelect');
    const langSelect = document.getElementById('i18nLangSelect');
    const loadBtn = document.getElementById('i18nLoadBtn');
    const saveBtn = document.getElementById('i18nSaveBtn');
    const resetBtn = document.getElementById('i18nResetBtn');

    if (!pageSelect || !langSelect || !loadBtn || !saveBtn || !resetBtn) return;
    if (pageSelect.dataset.bound) return;
    pageSelect.dataset.bound = 'true';

    pageSelect.innerHTML = I18N_MANAGED_PAGES
        .map((page) => `<option value="${escapeHtml(page)}">${escapeHtml(page)}</option>`)
        .join('');

    const attachReload = (el) => {
        if (!el || el.dataset.i18nBound) return;
        el.dataset.i18nBound = 'true';
        el.addEventListener('change', () => {
            loadI18nIntoAdminForm();
        });
    };

    attachReload(pageSelect);
    attachReload(langSelect);

    loadBtn.addEventListener('click', () => {
        loadI18nIntoAdminForm();
    });

    saveBtn.addEventListener('click', () => {
        saveI18nFromAdminForm();
    });

    resetBtn.addEventListener('click', () => {
        resetI18nAdminForm();
    });

    loadI18nIntoAdminForm();
}

function bindAdminForms() {
    const adminMsgBox = document.getElementById('inviteMsgBox');

    const disputeForm = document.getElementById('disputeForm');
    if (disputeForm && !disputeForm.dataset.bound) {
        disputeForm.dataset.bound = 'true';
        disputeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const orderId = document.getElementById('disputeOrderId').value.trim();
            const clientEmail = normalizeEmail(document.getElementById('disputeClientEmail').value);
            const amount = Number.parseFloat(document.getElementById('disputeAmount').value || '0');
            const currency = document.getElementById('disputeCurrency').value.trim() || 'MAD';
            const channel = document.getElementById('disputeChannel').value;
            const status = document.getElementById('disputeStatus').value;
            const reason = document.getElementById('disputeReason').value.trim();
            const notes = document.getElementById('disputeNotes').value.trim();

            const disputes = getStoredDisputes();
            disputes.unshift({
                id: createId('DSP'),
                orderId,
                clientEmail,
                amount,
                currency,
                channel,
                status,
                reason,
                notes,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            saveStoredDisputes(disputes);
            disputeForm.reset();
            renderDisputesSection();
            renderAdminStats();
        });
    }

    const offerForm = document.getElementById('offerForm');
    if (offerForm && !offerForm.dataset.bound) {
        offerForm.dataset.bound = 'true';
        offerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const editId = document.getElementById('offerEditId').value.trim();
            const title = document.getElementById('offerTitle').value.trim();
            const description = document.getElementById('offerDescription').value.trim();
            const badge = document.getElementById('offerBadge').value.trim();
            const target = document.getElementById('offerTarget').value;
            const targetEmail = normalizeEmail(document.getElementById('offerTargetEmail').value);
            const enabled = document.getElementById('offerEnabled').checked;

            if (target === 'customer' && !targetEmail) {
                showInlineMessage(adminMsgBox, '❌ أدخل البريد الإلكتروني للعميل المستهدف.', 'error');
                return;
            }

            const offers = getStoredOffers();
            const now = new Date().toISOString();

            if (editId) {
                const updatedOffers = offers.map((offer) => {
                    if (offer.id !== editId) return offer;
                    return {
                        ...offer,
                        title,
                        description,
                        badge,
                        target,
                        targetEmail: target === 'customer' ? targetEmail : '',
                        enabled,
                        updatedAt: now,
                    };
                });
                saveStoredOffers(updatedOffers);
            } else {
                offers.unshift({
                    id: createId('OFF'),
                    title,
                    description,
                    badge,
                    target,
                    targetEmail: target === 'customer' ? targetEmail : '',
                    enabled,
                    createdAt: now,
                    updatedAt: now,
                });
                saveStoredOffers(offers);
            }

            resetOfferForm();
            renderOffersAdminSection();
            renderAdminStats();
        });
    }

        const offerCancelEditBtn = document.getElementById('offerCancelEditBtn');
        if (offerCancelEditBtn && !offerCancelEditBtn.dataset.bound) {
            offerCancelEditBtn.dataset.bound = 'true';
            offerCancelEditBtn.addEventListener('click', () => {
                resetOfferForm();
            });
        }

        const serviceForm = document.getElementById('serviceForm');
        if (serviceForm && !serviceForm.dataset.bound) {
            serviceForm.dataset.bound = 'true';
            serviceForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const editId = document.getElementById('serviceEditId').value.trim();
                const category = document.getElementById('serviceCategory').value.trim();
                const title = document.getElementById('serviceTitle').value.trim();
                const price = document.getElementById('servicePrice').value.trim();
                const description = document.getElementById('serviceDescription').value.trim();
                const popularity = Number.parseInt(document.getElementById('servicePopularity').value, 10);
                const isComingSoon = document.getElementById('serviceComingSoon').checked;
                const enabled = document.getElementById('serviceEnabled').checked;

                if (!title || !price || !description || !category || !Number.isFinite(popularity) || popularity <= 0) {
                    showInlineMessage(adminMsgBox, '❌ يرجى تعبئة جميع حقول الخدمة بشكل صحيح.', 'error');
                    return;
                }

                const services = getStoredServices();
                const now = new Date().toISOString();

                if (editId) {
                    const updated = services.map((service) => {
                        if (service.id !== editId) return service;
                        return {
                            ...service,
                            category,
                            titles: { ar: title },
                            price,
                            descriptions: { ar: description },
                            popularity,
                            is_coming_soon: isComingSoon,
                            enabled,
                            updatedAt: now,
                        };
                    });
                    saveStoredServices(updated);
                } else {
                    services.unshift(normalizeManagedService({
                        id: createId('SVC'),
                        category,
                        titles: { ar: title },
                        price,
                        descriptions: { ar: description },
                        popularity,
                        is_coming_soon: isComingSoon,
                        enabled,
                        createdAt: now,
                        updatedAt: now,
                    }));
                    saveStoredServices(services);
                }

                resetServiceForm();
                renderServicesAdminSection();
            });
        }

        const serviceCancelEditBtn = document.getElementById('serviceCancelEditBtn');
        if (serviceCancelEditBtn && !serviceCancelEditBtn.dataset.bound) {
            serviceCancelEditBtn.dataset.bound = 'true';
            serviceCancelEditBtn.addEventListener('click', () => {
                resetServiceForm();
            });
        }

    const globalForm = document.getElementById('globalDiscountForm');
    if (globalForm && !globalForm.dataset.bound) {
        globalForm.dataset.bound = 'true';
        globalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = getStoredDiscounts();
            data.global = {
                enabled: document.getElementById('globalDiscountEnabled').checked,
                code: document.getElementById('globalDiscountCode').value.trim(),
                type: document.getElementById('globalDiscountType').value,
                value: Number.parseFloat(document.getElementById('globalDiscountValue').value || '0'),
                endsAt: document.getElementById('globalDiscountEndsAt').value
                    ? new Date(document.getElementById('globalDiscountEndsAt').value).toISOString()
                    : '',
            };
            saveStoredDiscounts(data);
            renderDiscountsSection();
            renderAdminStats();
        });
    }

    const customerForm = document.getElementById('customerDiscountForm');
    if (customerForm && !customerForm.dataset.bound) {
        customerForm.dataset.bound = 'true';
        customerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = normalizeEmail(document.getElementById('customerDiscountEmail').value);
            const code = document.getElementById('customerDiscountCode').value.trim();
            const type = document.getElementById('customerDiscountType').value;
            const value = Number.parseFloat(document.getElementById('customerDiscountValue').value || '0');
            const endsAtRaw = document.getElementById('customerDiscountEndsAt').value;
            const enabled = document.getElementById('customerDiscountEnabled').checked;

            const data = getStoredDiscounts();
            data.customerRules.unshift({
                id: createId('CDS'),
                email,
                code,
                type,
                value,
                endsAt: endsAtRaw ? new Date(endsAtRaw).toISOString() : '',
                enabled,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            saveStoredDiscounts(data);
            customerForm.reset();
            document.getElementById('customerDiscountEnabled').checked = true;
            renderDiscountsSection();
            renderAdminStats();
        });
    }
}

async function initializeAdminDashboard() {
    renderAdminStats();
    renderAdminOrdersSection();
    renderDisputesSection();
    renderOffersAdminSection();
    renderServicesAdminSection();
    renderDiscountsSection();
    await renderInviteAuditLog();
    resetOfferForm();
    resetServiceForm();
    setupAdminInviteUser();
    bindAdminForms();
    setupAdminI18nManager();
}

document.addEventListener('DOMContentLoaded', async () => {
    ensurePageLoader();

    try {
        setPageLoaderStatus('Loading brand settings...');
        await loadSiteSettings();

        const hasServicesGrid = Boolean(document.getElementById('servicesGrid'));
        const hasSessionNavLinks = Boolean(document.querySelector(
            '.site-nav-cta a[data-role="client-auth-link"], .site-nav-cta a[href="client-login.html"], .mobile-nav-panel a[data-role="client-auth-link"], .mobile-nav-panel a[href="client-login.html"]'
        ));
        const hasAuthForm = Boolean(document.getElementById('authForm'));
        const hasAuthCallbackView = Boolean(document.getElementById('view-auth-callback'));
        const hasDashboardView = Boolean(document.getElementById('view-dashboard'));
        const hasAdminDashboardView = Boolean(document.getElementById('view-admin-dashboard'));
        const hasServiceDetailView = Boolean(document.getElementById('view-service-detail'));
        const hasOrderForm = Boolean(document.getElementById('orderForm'));

        if (hasAuthCallbackView) {
            setPageLoaderStatus('Verifying your secure callback link...');
            await setupAuthCallbackPage();
            return;
        }

        if (hasAuthForm) {
            setPageLoaderStatus('Preparing secure sign-in flow...');
            await setupAuthentication();
            return;
        }

        setPageLoaderStatus('Connecting to data source...');
        await loadAdminEmailsFromDatabase();
        await hydrateDataStores();

        if (hasSessionNavLinks) {
            await setupHomeSessionUI();
        }

        if (hasServicesGrid || hasServiceDetailView) {
            setupHomeCspSafeBindings();
        }

        if (hasServicesGrid) {
            setPageLoaderStatus('Rendering services and dynamic pricing...');
            await hydrateDataStores();
            await loadServices();
            renderOffersForHome();
        }

        if (hasServiceDetailView) {
            setPageLoaderStatus('Preparing service details...');
            await hydrateDataStores();
            renderServiceDetailPage();
        }

        if (hasOrderForm) {
            const orderForm = document.getElementById('orderForm');
            if (orderForm && orderForm.dataset.bound !== 'true') {
                orderForm.dataset.bound = 'true';
                orderForm.addEventListener('submit', handleOrderSubmit);
            }

            const modalOverlay = document.getElementById('orderModal');
            if (modalOverlay && modalOverlay.dataset.bound !== 'true') {
                modalOverlay.dataset.bound = 'true';
                modalOverlay.addEventListener('click', function(e) {
                    if (e.target === this) closeOrderModal();
                });
            }

            if (document.body?.dataset.orderEscBound !== 'true') {
                document.body.dataset.orderEscBound = 'true';
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
                        closeOrderModal();
                    }
                });
            }
        }

        if (hasDashboardView) {
            setPageLoaderStatus('Checking account access and loading orders...');
            const user = await protectDashboardRoute();
            if (user) {
                await hydrateDataStores();
                renderDashboardOrders(user);
                setupDashboardSecurity(user);
            }
            setupLogout();
        }

        if (hasAdminDashboardView) {
            setPageLoaderStatus('Syncing admin workspace and controls...');
            const user = await protectAdminDashboardRoute();
            if (user) {
                await hydrateDataStores();
                await initializeAdminDashboard();
            }
            setupLogout();
        }
    } finally {
        await finalizePageLoader();
    }
});
