// ==========================================================================
// PIXEL ONE VISUALS - MASTER JAVASCRIPT APP FILE
// ==========================================================================

const runtimeSupabaseConfig = window.__PIXELONE_SUPABASE__ || {};
const SUPABASE_URL = runtimeSupabaseConfig.url || 'https://grdjidvagrxavuwykqjf.supabase.co';
const SUPABASE_KEY = runtimeSupabaseConfig.publishableKey || 'sb_publishable_09I_ZPReuprW9qZRqlG0nA_vxCBY6WS';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window._supabase = _supabase;

const I18N_LANGS = ['ar'];
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
        orderWhatsAppNotSet: '❌ رقم التواصل غير مضبوط بعد. حدّث contact.whatsappNumber داخل site-settings.json أولاً.',
        orderSuccessPrefix: '✅ تم تأكيد الطلب بنجاح! سنتواصل معك قريباً.',
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
        quoteReadyTitle: 'عرض السعر جاهز',
        quoteReadyDownload: 'تحميل PDF',
        quoteReadyNotice: 'سنتواصل معك قريباً على واتساب.',
        dashboardNoQuotes: 'لا توجد عروض أسعار حالياً.',
        dashboardNoInvoices: 'لا توجد فواتير حالياً.',
    },
};

const SERVICE_I18N = {};

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

const SERVICE_OG_IMAGE_MAP = {
    'svc-social-media-designs': 'https://www.pixelonevisuals.tech/og/social-media-designs-1200x630.png',
    'svc-logo-design': 'https://www.pixelonevisuals.tech/og/logo-design-1200x630.png',
    'svc-digital-banners': 'https://www.pixelonevisuals.tech/og/digital-banners-1200x630.png',
    'svc-pitch-deck': 'https://www.pixelonevisuals.tech/og/pitch-deck-1200x630.png',
    'svc-short-video': 'https://www.pixelonevisuals.tech/og/short-video-1200x630.png',
    'svc-professional-design': 'https://www.pixelonevisuals.tech/og/professional-design-1200x630.png',
    'svc-short-videos-premium': 'https://www.pixelonevisuals.tech/og/short-videos-premium-1200x630.png',
    'svc-advanced-promo-video': 'https://www.pixelonevisuals.tech/og/advanced-promo-video-1200x630.png',
    'svc-web-landing-page': 'https://www.pixelonevisuals.tech/og/web-landing-page-1200x630.png',
    'svc-brand-identity': 'https://www.pixelonevisuals.tech/og/brand-identity-1200x630.png',
};

const SERVICE_OG_IMAGE_LOCAL_MAP = {
    'svc-social-media-designs': 'og/social-media-designs-1200x630.png',
    'svc-logo-design': 'og/logo-design-1200x630.png',
    'svc-digital-banners': 'og/digital-banners-1200x630.png',
    'svc-pitch-deck': 'og/pitch-deck-1200x630.png',
    'svc-short-video': 'og/short-video-1200x630.png',
    'svc-professional-design': 'og/professional-design-1200x630.png',
    'svc-short-videos-premium': 'og/short-videos-premium-1200x630.png',
    'svc-advanced-promo-video': 'og/advanced-promo-video-1200x630.png',
    'svc-web-landing-page': 'og/web-landing-page-1200x630.png',
    'svc-brand-identity': 'og/brand-identity-1200x630.png',
};

// This object is now obsolete as content is managed in the database.
// const SERVICE_DETAIL_CONTENT = { ... };

const ORDER_STORAGE_FALLBACK_KEY = 'pixelone_orders_v1';
const QUOTES_STORAGE_KEY = 'pixelone_quotes_v1';
const INVOICES_STORAGE_KEY = 'pixelone_invoices_v1';
const OFFERS_STORAGE_KEY = 'pixelone_offers_v1';
const SERVICES_STORAGE_KEY = 'pixelone_services_v2';
const DISPUTES_STORAGE_KEY = 'pixelone_disputes_v1';
const DISCOUNTS_STORAGE_KEY = 'pixelone_discounts_v1';
const AUTOMATION_WEBHOOK_URL = 'https://flow.sokt.io/func/scriekZWLgOh';

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
        whatsappNumber: '212751201626',
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

const QUOTE_STATUS_OPTIONS = ['draft', 'sent', 'accepted', 'rejected', 'expired', 'converted'];
const INVOICE_STATUS_OPTIONS = ['unpaid', 'paid', 'cancelled'];

const TABLES = {
    services: 'pixel_services',
    offers: 'pixel_offers',
    orders: 'pixel_orders',
    quotes: 'pixel_quotes',
    invoices: 'pixel_invoices',
    disputes: 'pixel_disputes',
    discountsGlobal: 'pixel_discounts_global',
    discountsCustomer: 'pixel_discounts_customer',
    adminUsers: 'pixel_admin_users',
    inviteAudit: 'pixel_invite_audit',
    userSignups: 'pixel_user_signups',
    i18nPages: 'pixel_i18n_pages',
};

let siteSettings = { ...DEFAULT_SITE_SETTINGS };
let currentSessionUser = null;
let dataSourceMode = 'fallback';
let pageLoaderController = null;
const POST_AUTH_REDIRECT_KEY = 'pixelone_post_auth_redirect_v1';
const PENDING_ORDER_INTENT_KEY = 'pixelone_pending_order_intent_v1';

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
    quotes: [],
    invoices: [],
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

function safeSessionStorageGet(key) {
    try {
        return sessionStorage.getItem(key);
    } catch {
        return null;
    }
}

function safeSessionStorageSet(key, value) {
    try {
        sessionStorage.setItem(key, value);
    } catch {
        // Ignore storage permission errors.
    }
}

function safeSessionStorageRemove(key) {
    try {
        sessionStorage.removeItem(key);
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

function normalizePostAuthRedirectPath(rawPath) {
    if (!rawPath || typeof rawPath !== 'string') return '';
    const cleaned = rawPath.trim();
    if (!cleaned) return '';
    if (!cleaned.startsWith('/') && !cleaned.startsWith('./') && !cleaned.startsWith('../')) return '';
    try {
        const targetUrl = new URL(cleaned, window.location.origin);
        if (targetUrl.origin !== window.location.origin) return '';
        return `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
    } catch {
        return '';
    }
}

function capturePostAuthRedirectFromCurrentUrl() {
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next') || '';
    const safePath = normalizePostAuthRedirectPath(next);
    if (safePath) {
        safeStorageSet(POST_AUTH_REDIRECT_KEY, safePath);
    }
}

function getStoredPostAuthRedirectPath() {
    return normalizePostAuthRedirectPath(safeStorageGet(POST_AUTH_REDIRECT_KEY) || '');
}

function clearStoredPostAuthRedirectPath() {
    safeStorageRemove(POST_AUTH_REDIRECT_KEY);
}

function getLoginRedirectTargetForCurrentPage() {
    return `${window.location.pathname}${window.location.search}`;
}

function persistPendingOrderIntent(payload) {
    if (!payload || typeof payload !== 'object') return;
    safeStorageSet(PENDING_ORDER_INTENT_KEY, JSON.stringify({
        serviceId: String(payload.serviceId || ''),
        serviceName: String(payload.serviceName || ''),
        finalPrice: String(payload.finalPrice || ''),
        discountCode: String(payload.discountCode || ''),
        lang: String(payload.lang || ''),
        createdAt: new Date().toISOString(),
    }));
}

function readPendingOrderIntent() {
    try {
        const raw = safeStorageGet(PENDING_ORDER_INTENT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;
        return {
            serviceId: String(parsed.serviceId || ''),
            serviceName: String(parsed.serviceName || ''),
            finalPrice: String(parsed.finalPrice || ''),
            discountCode: String(parsed.discountCode || ''),
            lang: String(parsed.lang || ''),
        };
    } catch {
        return null;
    }
}

function clearPendingOrderIntent() {
    safeStorageRemove(PENDING_ORDER_INTENT_KEY);
}

function buildLoginUrlWithReturnPath(returnPath) {
    const safeReturnPath = normalizePostAuthRedirectPath(returnPath);
    if (!safeReturnPath) return 'login.html';
    return `login.html?next=${encodeURIComponent(safeReturnPath)}`;
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
        image_url: service.imageUrl || null,
        image_alt_ar: service.imageAlt || null,
        deliverables_ar: service.deliverables || null,
        requirements_ar: service.requirements || null,
        workflow_ar: service.workflow || null,
        turnaround_ar: service.turnaround || null,
        revisions_ar: service.revisions || null,
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
        imageUrl: row.image_url,
        imageAlt: row.image_alt_ar,
        deliverables: row.deliverables_ar,
        requirements: row.requirements_ar,
        workflow: row.workflow_ar,
        turnaround: row.turnaround_ar,
        revisions: row.revisions_ar,
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
        project_name: order.projectName || '',
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
        projectName: row.project_name || '',
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

function quoteToRow(quote) {
    return {
        id: quote.id,
        order_id: quote.orderId,
        quote_number: quote.quoteNumber,
        status: quote.status || 'draft',
        subtotal: normalizeMoneyValue(quote.subtotal),
        discount_value: normalizeMoneyValue(quote.discountValue),
        total: normalizeMoneyValue(quote.total),
        currency: quote.currency || 'MAD',
        valid_until: quote.validUntil || null,
        notes: quote.notes || '',
        created_at: quote.createdAt || new Date().toISOString(),
    };
}

function quoteFromRow(row) {
    return {
        id: row.id,
        orderId: row.order_id,
        quoteNumber: row.quote_number,
        status: row.status,
        subtotal: normalizeMoneyValue(row.subtotal),
        discountValue: normalizeMoneyValue(row.discount_value),
        total: normalizeMoneyValue(row.total),
        currency: row.currency || 'MAD',
        validUntil: row.valid_until,
        notes: row.notes || '',
        createdAt: row.created_at,
    };
}

function invoiceToRow(invoice) {
    return {
        id: invoice.id,
        order_id: invoice.orderId,
        quote_id: invoice.quoteId,
        invoice_number: invoice.invoiceNumber,
        status: invoice.status || 'unpaid',
        total: normalizeMoneyValue(invoice.total),
        issued_at: invoice.issuedAt || null,
        due_date: invoice.dueDate || null,
        created_at: invoice.createdAt || new Date().toISOString(),
    };
}

function invoiceFromRow(row) {
    return {
        id: row.id,
        orderId: row.order_id,
        quoteId: row.quote_id,
        invoiceNumber: row.invoice_number,
        status: row.status,
        total: normalizeMoneyValue(row.total),
        issuedAt: row.issued_at,
        dueDate: row.due_date,
        createdAt: row.created_at,
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

function normalizeMoneyValue(value) {
    const numeric = Number.parseFloat(String(value ?? '').replace(/[^0-9.\-]/g, ''));
    if (!Number.isFinite(numeric)) return 0;
    return Math.max(0, Number(numeric.toFixed(2)));
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
        return new Date(isoString).toLocaleString('ar-MA', {
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

    const labels = {
        received: 'تم استلام الطلب',
        accepted: 'مقبول',
        needs_changes: 'يحتاج تعديلات',
        in_progress: 'قيد التنفيذ',
        completed: 'مكتمل',
    };

    return labels[key] || labels.received;
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

function generateUuid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID();
    }

    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return template.replace(/[xy]/g, (char) => {
        const random = Math.floor(Math.random() * 16);
        const value = char === 'x' ? random : ((random & 0x3) | 0x8);
        return value.toString(16);
    });
}

async function sendAutomationEvent(eventType, payload) {
    try {
        await fetch(AUTOMATION_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventType,
                ...payload,
            }),
        });
    } catch {
        // Notifications are best-effort and must not block core order flow.
    }
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

function getLocalQuotes() {
    const parsed = readLocalJson(QUOTES_STORAGE_KEY, []);
    return Array.isArray(parsed) ? parsed : [];
}

function getLocalInvoices() {
    const parsed = readLocalJson(INVOICES_STORAGE_KEY, []);
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
    if (runtimeStore.services && runtimeStore.services.length > 0) {
        // If we have services from Supabase, ensure local storage is up to date.
        writeLocalJson(SERVICES_STORAGE_KEY, runtimeStore.services);
        return;
    }
    // If Supabase is empty but local storage has data, use local storage.
    const localServices = getLocalServices();
    if (localServices.length > 0) {
        runtimeStore.services = localServices;
        return;
    }
    // If both are empty, use the hardcoded defaults as a last resort.
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
    const localQuotes = getLocalQuotes();
    const localInvoices = getLocalInvoices();
    runtimeStore.orders = localOrders;
    runtimeStore.quotes = localQuotes;
    runtimeStore.invoices = localInvoices;
    runtimeStore.offers = getLocalOffers();
    runtimeStore.services = getLocalServices();
    runtimeStore.disputes = getLocalDisputes();
    runtimeStore.discounts = getLocalDiscounts();

    const results = await Promise.allSettled([
        fetchAllRows(TABLES.services, 'popularity'),
        fetchAllRows(TABLES.offers, 'updated_at'),
        fetchAllRows(TABLES.orders, 'created_at'),
        fetchAllRows(TABLES.quotes, 'created_at'),
        fetchAllRows(TABLES.invoices, 'created_at'),
        fetchAllRows(TABLES.disputes, 'created_at'),
        fetchAllRows(TABLES.discountsGlobal, 'id'),
        fetchAllRows(TABLES.discountsCustomer, 'created_at'),
    ]);

    const [
        servicesResult,
        offersResult,
        ordersResult,
        quotesResult,
        invoicesResult,
        disputesResult,
        globalResult,
        customerResult,
    ] = results;

    const mergeById = (remoteItems, localItems, keyResolver) => {
        const merged = new Map();

        remoteItems.forEach((item) => {
            const key = keyResolver(item);
            if (!key) return;
            merged.set(key, item);
        });

        localItems.forEach((item) => {
            const key = keyResolver(item);
            if (!key || merged.has(key)) return;
            merged.set(key, item);
        });

        return Array.from(merged.values()).sort((a, b) => {
            const left = new Date(b.createdAt || 0).getTime();
            const right = new Date(a.createdAt || 0).getTime();
            return left - right;
        });
    };

    runtimeStore.services = servicesResult.status === 'fulfilled' && servicesResult.value.length > 0
        ? servicesResult.value.map((row, index) => serviceFromRow(row, index))
        : getLocalServices();

    enforceExclusiveServiceCatalog();

    runtimeStore.offers = offersResult.status === 'fulfilled' && offersResult.value.length > 0
        ? offersResult.value.map(offerFromRow)
        : getLocalOffers();

    if (ordersResult.status === 'fulfilled') {
        const remoteOrders = ordersResult.value.map(orderFromRow);
        const mergedOrders = mergeById(
            remoteOrders,
            localOrders,
            (order) => String(order.id || order.trackingCode || '').trim(),
        );
        runtimeStore.orders = mergedOrders.length > 0 ? mergedOrders : localOrders;
    } else {
        runtimeStore.orders = localOrders;
    }

    if (quotesResult.status === 'fulfilled') {
        const remoteQuotes = quotesResult.value.map(quoteFromRow);
        const mergedQuotes = mergeById(
            remoteQuotes,
            localQuotes,
            (quote) => String(quote.id || '').trim(),
        );
        runtimeStore.quotes = mergedQuotes.length > 0 ? mergedQuotes : localQuotes;
    } else {
        runtimeStore.quotes = localQuotes;
    }

    if (invoicesResult.status === 'fulfilled') {
        const remoteInvoices = invoicesResult.value.map(invoiceFromRow);
        const mergedInvoices = mergeById(
            remoteInvoices,
            localInvoices,
            (invoice) => String(invoice.id || '').trim(),
        );
        runtimeStore.invoices = mergedInvoices.length > 0 ? mergedInvoices : localInvoices;
    } else {
        runtimeStore.invoices = localInvoices;
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

    const hasSupabaseData = [
        servicesResult,
        offersResult,
        ordersResult,
        quotesResult,
        invoicesResult,
        disputesResult,
        globalResult,
        customerResult,
    ]
        .some((result) => result.status === 'fulfilled');

    dataSourceMode = hasSupabaseData ? 'supabase' : 'fallback';

    writeLocalJson(getOrdersStorageKey(), runtimeStore.orders);
    writeLocalJson(QUOTES_STORAGE_KEY, runtimeStore.quotes);
    writeLocalJson(INVOICES_STORAGE_KEY, runtimeStore.invoices);
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

function getStoredQuotes() {
    return cloneData(runtimeStore.quotes);
}

function saveStoredQuotes(quotes) {
    runtimeStore.quotes = Array.isArray(quotes) ? cloneData(quotes) : [];
    writeLocalJson(QUOTES_STORAGE_KEY, runtimeStore.quotes);

    if (dataSourceMode === 'supabase') {
        replaceTableSnapshot(TABLES.quotes, runtimeStore.quotes.map(quoteToRow)).catch(() => {
            dataSourceMode = 'fallback';
        });
    }
}

function addQuoteRecord(quote) {
    const now = quote.createdAt || new Date().toISOString();
    const normalizedQuote = {
        currency: 'MAD',
        status: 'draft',
        ...quote,
        createdAt: now,
    };

    const existing = getStoredQuotes().filter((item) => item.id !== normalizedQuote.id);
    existing.unshift(normalizedQuote);
    saveStoredQuotes(existing);

    if (dataSourceMode === 'supabase') {
        _supabase.from(TABLES.quotes).upsert(quoteToRow(normalizedQuote), { onConflict: 'id' }).then(({ error }) => {
            if (error) dataSourceMode = 'fallback';
        });
    }

    return normalizedQuote;
}

function updateQuoteStatus(quoteId, nextStatus) {
    if (!QUOTE_STATUS_OPTIONS.includes(nextStatus)) return null;

    const quotes = getStoredQuotes();
    let updatedQuote = null;
    const updated = quotes.map((quote) => {
        if (quote.id !== quoteId) return quote;
        updatedQuote = {
            ...quote,
            status: nextStatus,
        };
        return updatedQuote;
    });
    saveStoredQuotes(updated);
    return updatedQuote;
}

function getStoredInvoices() {
    return cloneData(runtimeStore.invoices);
}

function saveStoredInvoices(invoices) {
    runtimeStore.invoices = Array.isArray(invoices) ? cloneData(invoices) : [];
    writeLocalJson(INVOICES_STORAGE_KEY, runtimeStore.invoices);

    if (dataSourceMode === 'supabase') {
        replaceTableSnapshot(TABLES.invoices, runtimeStore.invoices.map(invoiceToRow)).catch(() => {
            dataSourceMode = 'fallback';
        });
    }
}

function addInvoiceRecord(invoice) {
    const now = invoice.createdAt || new Date().toISOString();
    const normalizedInvoice = {
        status: 'unpaid',
        ...invoice,
        createdAt: now,
    };

    const existing = getStoredInvoices().filter((item) => item.id !== normalizedInvoice.id);
    existing.unshift(normalizedInvoice);
    saveStoredInvoices(existing);

    if (dataSourceMode === 'supabase') {
        _supabase.from(TABLES.invoices).upsert(invoiceToRow(normalizedInvoice), { onConflict: 'id' }).then(({ error }) => {
            if (error) dataSourceMode = 'fallback';
        });
    }

    return normalizedInvoice;
}

function updateInvoiceStatus(invoiceId, nextStatus) {
    if (!INVOICE_STATUS_OPTIONS.includes(nextStatus)) return null;

    const invoices = getStoredInvoices();
    let updatedInvoice = null;
    const updated = invoices.map((invoice) => {
        if (invoice.id !== invoiceId) return invoice;
        updatedInvoice = {
            ...invoice,
            status: nextStatus,
        };
        return updatedInvoice;
    });
    saveStoredInvoices(updated);
    return updatedInvoice;
}

function getOrderById(orderId) {
    return getStoredOrders().find((order) => order.id === orderId) || null;
}

function getQuoteById(quoteId) {
    return getStoredQuotes().find((quote) => quote.id === quoteId) || null;
}

function getInvoiceById(invoiceId) {
    return getStoredInvoices().find((invoice) => invoice.id === invoiceId) || null;
}

function getOrderService(order) {
    const services = getStoredServices();
    const serviceId = String(order?.serviceId || '').trim();
    if (serviceId) {
        const byId = services.find((service) => String(service.id || '').trim() === serviceId);
        if (byId) return byId;
    }

    const orderServiceName = String(order?.serviceName || '').trim();
    if (!orderServiceName) return null;

    const normalizedName = orderServiceName.toLowerCase();
    return services.find((service) => {
        const localized = getLocalizedServiceContent(service);
        const candidates = [
            String(service?.titles?.ar || ''),
            String(localized?.title || ''),
            String(service?.title || ''),
        ].map((value) => value.trim().toLowerCase()).filter(Boolean);
        return candidates.includes(normalizedName);
    }) || null;
}

function getNextDocumentNumber(kind, existingNumbers) {
    const safeKind = kind === 'INV' ? 'INV' : 'DEV';
    const year = String(new Date().getFullYear());
    const regex = new RegExp(`^PXO-${safeKind}-${year}-(\\d{4})$`);
    const used = new Set(Array.isArray(existingNumbers) ? existingNumbers.map((value) => String(value || '').trim()) : []);

    let maxForYear = 0;
    used.forEach((value) => {
        const match = value.match(regex);
        if (!match) return;
        const sequence = Number.parseInt(match[1], 10);
        if (Number.isFinite(sequence) && sequence > maxForYear) {
            maxForYear = sequence;
        }
    });

    let candidate = maxForYear + 1;
    while (candidate < 10000) {
        const formatted = `PXO-${safeKind}-${year}-${String(candidate).padStart(4, '0')}`;
        if (!used.has(formatted)) return formatted;
        candidate += 1;
    }

    return `PXO-${safeKind}-${year}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

function resolveOrderFinancials(order, service) {
    let subtotal = parsePrice(service?.price || '') ?? parsePrice(order?.finalPrice || '') ?? 0;
    let total = parsePrice(order?.finalPrice || '');
    let discountValue = 0;

    if (total === null) {
        const discountContext = getDiscountContextForUser(order?.userEmail || order?.email || '');
        const bestRule = getBestDiscountRule(discountContext);
        const applied = applyDiscount(subtotal, bestRule);
        total = normalizeMoneyValue(applied.finalPrice);
        discountValue = normalizeMoneyValue(applied.discountAmount);
    } else {
        total = normalizeMoneyValue(total);
        discountValue = normalizeMoneyValue(Math.max(0, subtotal - total));
    }

    subtotal = normalizeMoneyValue(subtotal);

    return {
        subtotal,
        discountValue,
        total: normalizeMoneyValue(total),
    };
}

async function createQuoteFromOrder(orderId, options = {}) {
    const order = getOrderById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }

    if (dataSourceMode === 'supabase') {
        const { error } = await _supabase.from(TABLES.orders).upsert(orderToRow(order), { onConflict: 'id' });
        if (error) {
            dataSourceMode = 'fallback';
        }
    }

    const existingQuote = getStoredQuotes().find((quote) => quote.orderId === orderId && quote.status !== 'converted');
    if (existingQuote && !options.forceNew) {
        return existingQuote;
    }

    const service = getOrderService(order);
    const financials = resolveOrderFinancials(order, service);
    const now = new Date();
    const validUntil = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const quoteNumber = getNextDocumentNumber(
        'DEV',
        getStoredQuotes().map((quote) => quote.quoteNumber),
    );

    const quote = addQuoteRecord({
        id: generateUuid(),
        orderId,
        quoteNumber,
        status: options.status || 'sent',
        subtotal: financials.subtotal,
        discountValue: financials.discountValue,
        total: financials.total,
        currency: 'MAD',
        validUntil: options.validUntil || validUntil,
        notes: options.notes || '',
        createdAt: now.toISOString(),
    });

    const quoteDocumentLink = buildAppUrl('dashboard.html', {
        docType: 'quote',
        docId: quote.id,
        docToken: issueDocumentToken('quote', quote.id, 12 * 60),
    });

    await sendAutomationEvent('quote_created', {
        quoteNumber: quote.quoteNumber,
        orderId,
        quoteId: quote.id,
        documentLink: quoteDocumentLink,
        customerEmail: order.email || order.userEmail || '',
        customerName: order.name || '',
        total: quote.total,
        currency: quote.currency,
    });

    return quote;
}

async function convertQuoteToInvoice(quoteId, options = {}) {
    const quote = getQuoteById(quoteId);
    if (!quote) {
        throw new Error('Quote not found');
    }

    if (quote.status !== 'accepted') {
        throw new Error('Quote must be accepted before invoice conversion');
    }

    const existingInvoice = getStoredInvoices().find((invoice) => invoice.quoteId === quoteId);
    if (existingInvoice && !options.forceNew) {
        return existingInvoice;
    }

    const order = getOrderById(quote.orderId);

    if (dataSourceMode === 'supabase') {
        if (order) {
            const { error: orderError } = await _supabase.from(TABLES.orders).upsert(orderToRow(order), { onConflict: 'id' });
            if (orderError) dataSourceMode = 'fallback';
        }
        const { error: quoteError } = await _supabase.from(TABLES.quotes).upsert(quoteToRow(quote), { onConflict: 'id' });
        if (quoteError) dataSourceMode = 'fallback';
    }

    const now = new Date();
    const dueDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const invoiceNumber = getNextDocumentNumber(
        'INV',
        getStoredInvoices().map((invoice) => invoice.invoiceNumber),
    );

    const invoice = addInvoiceRecord({
        id: generateUuid(),
        orderId: quote.orderId,
        quoteId,
        invoiceNumber,
        status: options.status || 'unpaid',
        total: normalizeMoneyValue(quote.total),
        issuedAt: options.issuedAt || now.toISOString(),
        dueDate: options.dueDate || dueDate,
        createdAt: now.toISOString(),
    });

    const invoiceDocumentLink = buildAppUrl('dashboard.html', {
        docType: 'invoice',
        docId: invoice.id,
        docToken: issueDocumentToken('invoice', invoice.id, 12 * 60),
    });

    updateQuoteStatus(quoteId, 'converted');

    await sendAutomationEvent('invoice_created', {
        invoiceNumber: invoice.invoiceNumber,
        invoiceId: invoice.id,
        documentLink: invoiceDocumentLink,
        quoteNumber: quote.quoteNumber,
        quoteId,
        orderId: quote.orderId,
        customerEmail: order?.email || order?.userEmail || '',
        customerName: order?.name || '',
        total: invoice.total,
        currency: quote.currency || 'MAD',
    });

    return invoice;
}

function getQuoteStatusLabel(status) {
    const labels = {
        draft: 'مسودة',
        sent: 'مرسل',
        accepted: 'مقبول',
        rejected: 'مرفوض',
        expired: 'منتهي',
        converted: 'محوّل لفاتورة',
    };
    return labels[String(status || '').toLowerCase()] || status || 'draft';
}

function getInvoiceStatusLabel(status) {
    const labels = {
        unpaid: 'غير مدفوع',
        paid: 'مدفوع',
        cancelled: 'ملغى',
    };
    return labels[String(status || '').toLowerCase()] || status || 'unpaid';
}

function getQuoteStatusMeta(status) {
    const key = String(status || '').toLowerCase();
    if (key === 'accepted') return { className: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200' };
    if (key === 'rejected') return { className: 'border-red-400/40 bg-red-500/10 text-red-200' };
    if (key === 'converted') return { className: 'border-blue-400/40 bg-blue-500/10 text-blue-200' };
    if (key === 'expired') return { className: 'border-orange-400/40 bg-orange-500/10 text-orange-200' };
    if (key === 'sent') return { className: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200' };
    return { className: 'border-amber-400/40 bg-amber-500/10 text-amber-200' };
}

function getInvoiceStatusMeta(status) {
    const key = String(status || '').toLowerCase();
    if (key === 'paid') return { className: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200' };
    if (key === 'cancelled') return { className: 'border-red-400/40 bg-red-500/10 text-red-200' };
    return { className: 'border-amber-400/40 bg-amber-500/10 text-amber-200' };
}

function encodeBase64Url(value) {
    const utf8 = unescape(encodeURIComponent(String(value || '')));
    return btoa(utf8).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(value) {
    const safe = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
    const padded = safe + '==='.slice((safe.length + 3) % 4);
    const decoded = atob(padded);
    return decodeURIComponent(escape(decoded));
}

function createSimpleTokenSignature(payload) {
    const source = `${String(payload || '')}|${SUPABASE_URL}|${SUPABASE_KEY.slice(0, 12)}`;
    let hash = 0;
    for (let i = 0; i < source.length; i += 1) {
        hash = ((hash << 5) - hash) + source.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(36);
}

function issueDocumentToken(type, id, ttlMinutes = 12 * 60) {
    const safeType = String(type || '').toLowerCase() === 'invoice' ? 'invoice' : 'quote';
    const safeId = String(id || '').trim();
    const expiresAt = Date.now() + Math.max(15, Number(ttlMinutes) || 60) * 60 * 1000;
    const nonce = Math.random().toString(36).slice(2, 10);
    const payload = `${safeType}|${safeId}|${expiresAt}|${nonce}`;
    const encoded = encodeBase64Url(payload);
    const signature = createSimpleTokenSignature(payload);
    return `${encoded}.${signature}`;
}

function validateDocumentToken(type, id, token) {
    const safeToken = String(token || '').trim();
    if (!safeToken.includes('.')) return false;

    try {
        const [encoded, signature] = safeToken.split('.');
        if (!encoded || !signature) return false;

        const payload = decodeBase64Url(encoded);
        if (createSimpleTokenSignature(payload) !== signature) return false;

        const [tokenType, tokenId, tokenExpiry] = payload.split('|');
        const expectedType = String(type || '').toLowerCase() === 'invoice' ? 'invoice' : 'quote';
        const expectedId = String(id || '').trim();

        return (
            tokenType === expectedType
            && tokenId === expectedId
            && Number(tokenExpiry || 0) > Date.now()
        );
    } catch {
        return false;
    }
}

function getDocumentViewerPathForCurrentUser() {
    return isAdminUser(currentSessionUser) ? 'admin-dashboard.html' : 'dashboard.html';
}

function buildSecureDocumentUrl(type, id) {
    const safeType = String(type || '').toLowerCase() === 'invoice' ? 'invoice' : 'quote';
    const safeId = String(id || '').trim();
    if (!safeId) return '';

    const token = issueDocumentToken(safeType, safeId, 12 * 60);
    return buildAppUrl(getDocumentViewerPathForCurrentUser(), {
        docType: safeType,
        docId: safeId,
        docToken: token,
    });
}

function getDocumentRouteParams() {
    const params = new URL(window.location.href).searchParams;
    return {
        docType: String(params.get('docType') || '').toLowerCase(),
        docId: String(params.get('docId') || ''),
        docToken: String(params.get('docToken') || ''),
    };
}

function clearDocumentRouteParams() {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete('docType');
    nextUrl.searchParams.delete('docId');
    nextUrl.searchParams.delete('docToken');
    history.replaceState({}, '', nextUrl.toString());
}

function canUserAccessOrder(user, order) {
    if (!user || !order) return false;
    if (isAdminUser(user)) return true;

    const userEmail = normalizeEmail(user.email);
    const orderEmail = normalizeEmail(order.userEmail || order.email);
    return Boolean(userEmail && orderEmail && userEmail === orderEmail);
}

function resolveDocumentContext(type, id) {
    const safeType = String(type || '').toLowerCase();
    const safeId = String(id || '').trim();
    if (!safeId) return null;

    if (safeType === 'quote') {
        const quote = getQuoteById(safeId);
        if (!quote) return null;
        const order = getOrderById(quote.orderId);
        if (!order) return null;
        const service = getOrderService(order);
        return { type: 'quote', quote, order, service };
    }

    if (safeType === 'invoice') {
        const invoice = getInvoiceById(safeId);
        if (!invoice) return null;
        const quote = invoice.quoteId ? getQuoteById(invoice.quoteId) : null;
        const order = getOrderById(invoice.orderId);
        if (!order) return null;
        const service = getOrderService(order);
        return { type: 'invoice', invoice, quote, order, service };
    }

    return null;
}

function ensureJsPdfLibrary() {
    if (window.jspdf?.jsPDF) return Promise.resolve(window.jspdf.jsPDF);

    return new Promise((resolve, reject) => {
        const existing = document.querySelector('script[data-role="jspdf-loader"]');
        if (existing) {
            existing.addEventListener('load', () => {
                if (window.jspdf?.jsPDF) resolve(window.jspdf.jsPDF);
                else reject(new Error('jsPDF failed to load'));
            }, { once: true });
            existing.addEventListener('error', () => reject(new Error('jsPDF script error')), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
        script.defer = true;
        script.dataset.role = 'jspdf-loader';
        script.onload = () => {
            if (window.jspdf?.jsPDF) resolve(window.jspdf.jsPDF);
            else reject(new Error('jsPDF failed to load'));
        };
        script.onerror = () => reject(new Error('jsPDF script error'));
        document.head.appendChild(script);
    });
}

function scoreReadableScript(value) {
    const text = String(value || '');
    const arabicCount = (text.match(/[\u0600-\u06FF]/g) || []).length;
    const latinCount = (text.match(/[A-Za-z\u00C0-\u024F]/g) || []).length;
    const mojibakeCount = (text.match(/[ÃØÙÐÑÒÓÔÕÖ×ø]/g) || []).length;
    return (arabicCount + latinCount) - (mojibakeCount * 2);
}

function repairPotentialMojibake(value) {
    const source = String(value || '');
    if (!source) return '';

    try {
        const recovered = decodeURIComponent(escape(source));
        return scoreReadableScript(recovered) > scoreReadableScript(source) ? recovered : source;
    } catch {
        return source;
    }
}

function normalizePdfTextValue(value) {
    const repaired = repairPotentialMojibake(value);
    return String(repaired || '')
        .replace(/\r\n/g, '\n')
        .replace(/\u00a0/g, ' ')
        .replace(/[ \t]+/g, ' ')
        .trim();
}

function detectDocumentLanguageFromContent(parts) {
    const source = parts
        .map((part) => normalizePdfTextValue(part))
        .filter(Boolean)
        .join(' ');

    const currentLang = String(getCurrentLanguage() || 'ar').toLowerCase();
    if (!source) {
        if (['ar', 'en', 'fr'].includes(currentLang)) return currentLang;
        return 'ar';
    }

    const arabicCount = (source.match(/[\u0600-\u06FF]/g) || []).length;
    const latinCount = (source.match(/[A-Za-z\u00C0-\u024F]/g) || []).length;
    const frenchAccent = /[àâçéèêëîïôûùüÿœæ]/i.test(source);
    const frenchWords = /\b(bonjour|facture|devis|client|projet|service|montant|description|coordonnees)\b/i.test(source);

    if (arabicCount >= Math.max(8, latinCount * 0.45)) return 'ar';
    if (frenchAccent || frenchWords) return 'fr';
    return 'en';
}

function getDocumentLocalePack(language, type) {
    const safeType = String(type || '').toLowerCase() === 'invoice' ? 'invoice' : 'quote';

    const packs = {
        ar: {
            dir: 'rtl',
            locale: 'ar-MA',
            quoteTitle: 'عرض سعر',
            invoiceTitle: 'فاتورة',
            clientInfo: 'بيانات العميل',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            phone: 'الهاتف',
            project: 'المشروع',
            serviceSummary: 'ملخص الخدمة',
            service: 'الخدمة',
            description: 'الوصف المختصر',
            financialSummary: 'الملخص المالي',
            subtotal: 'المجموع قبل الخصم',
            discount: 'الخصم',
            total: 'الإجمالي',
            validUntil: 'صالح حتى',
            issuedAt: 'تاريخ الإصدار',
            dueDate: 'تاريخ الاستحقاق',
            status: 'الحالة',
            executionTerms: 'التنفيذ والشروط',
            executionTime: 'مدة التنفيذ',
            revisionPolicy: 'سياسة المراجعات',
            simpleTerms: 'الشروط',
            executionFallback: 'حسب الاتفاق بعد مراجعة الطلب.',
            revisionFallback: 'بحسب الباقة المختارة.',
            termsFallback: 'يبدأ التنفيذ بعد التأكيد واستلام الأصول المطلوبة.',
            contact: 'التواصل',
            whatsapp: 'واتساب',
            notAvailable: 'غير متوفر',
        },
        fr: {
            dir: 'ltr',
            locale: 'fr-FR',
            quoteTitle: 'DEVIS',
            invoiceTitle: 'FACTURE',
            clientInfo: 'Informations client',
            name: 'Nom',
            email: 'Email',
            phone: 'Telephone',
            project: 'Projet',
            serviceSummary: 'Resume du service',
            service: 'Service',
            description: 'Description',
            financialSummary: 'Resume financier',
            subtotal: 'Sous-total',
            discount: 'Remise',
            total: 'Total',
            validUntil: 'Valide jusqu au',
            issuedAt: 'Date emission',
            dueDate: 'Date echeance',
            status: 'Statut',
            executionTerms: 'Execution et conditions',
            executionTime: 'Delai execution',
            revisionPolicy: 'Politique revisions',
            simpleTerms: 'Conditions',
            executionFallback: 'Selon accord apres validation.',
            revisionFallback: 'Selon le package choisi.',
            termsFallback: 'Execution apres confirmation et reception des elements requis.',
            contact: 'Contact',
            whatsapp: 'WhatsApp',
            notAvailable: 'Non disponible',
        },
        en: {
            dir: 'ltr',
            locale: 'en-US',
            quoteTitle: 'QUOTE',
            invoiceTitle: 'INVOICE',
            clientInfo: 'Client Info',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            project: 'Project',
            serviceSummary: 'Service Summary',
            service: 'Service',
            description: 'Description',
            financialSummary: 'Financial Summary',
            subtotal: 'Subtotal',
            discount: 'Discount',
            total: 'Total',
            validUntil: 'Valid Until',
            issuedAt: 'Issued At',
            dueDate: 'Due Date',
            status: 'Status',
            executionTerms: 'Execution and Terms',
            executionTime: 'Execution Time',
            revisionPolicy: 'Revision Policy',
            simpleTerms: 'Terms',
            executionFallback: 'As agreed after validation.',
            revisionFallback: 'Based on selected service package.',
            termsFallback: 'Execution starts after confirmation and required assets delivery.',
            contact: 'Contact',
            whatsapp: 'WhatsApp',
            notAvailable: 'Not available',
        },
    };

    const lang = ['ar', 'en', 'fr'].includes(String(language || '').toLowerCase())
        ? String(language).toLowerCase()
        : 'en';

    const pack = packs[lang] || packs.en;
    return {
        ...pack,
        documentTitle: safeType === 'invoice' ? pack.invoiceTitle : pack.quoteTitle,
        language: lang,
    };
}

function formatMoneyForDocumentLanguage(value, language, currency = 'MAD') {
    const numeric = normalizeMoneyValue(value);
    const localeMap = {
        ar: 'ar-MA',
        fr: 'fr-FR',
        en: 'en-US',
    };
    const locale = localeMap[language] || localeMap.en;

    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
        }).format(numeric);
    } catch {
        return `${numeric} ${currency}`;
    }
}

function formatDateForDocumentLanguage(isoString, language) {
    if (!isoString) return '';

    const localeMap = {
        ar: 'ar-MA',
        fr: 'fr-FR',
        en: 'en-US',
    };
    const locale = localeMap[language] || localeMap.en;

    try {
        return new Date(isoString).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
    } catch {
        return String(isoString);
    }
}

function splitCanvasTextLines(ctx, text, maxWidth) {
    const normalized = String(text || '').replace(/\r/g, '');
    const paragraphs = normalized.split('\n');
    const lines = [];

    const pushWordWrapped = (paragraph) => {
        const words = paragraph.split(/\s+/).filter(Boolean);
        if (words.length === 0) {
            lines.push('');
            return;
        }

        let current = '';
        words.forEach((word) => {
            const probe = current ? `${current} ${word}` : word;
            if (ctx.measureText(probe).width <= maxWidth) {
                current = probe;
                return;
            }

            if (current) {
                lines.push(current);
                current = '';
            }

            if (ctx.measureText(word).width <= maxWidth) {
                current = word;
                return;
            }

            let chunk = '';
            Array.from(word).forEach((char) => {
                const charProbe = `${chunk}${char}`;
                if (ctx.measureText(charProbe).width <= maxWidth) {
                    chunk = charProbe;
                } else {
                    if (chunk) lines.push(chunk);
                    chunk = char;
                }
            });
            current = chunk;
        });

        if (current) lines.push(current);
    };

    paragraphs.forEach((paragraph, index) => {
        pushWordWrapped(paragraph);
        if (index < paragraphs.length - 1) {
            lines.push('');
        }
    });

    return lines;
}

function drawCanvasWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
    const lines = splitCanvasTextLines(ctx, text, maxWidth);
    lines.forEach((line) => {
        ctx.fillText(line || ' ', x, y);
        y += lineHeight;
    });
    return y;
}

function getSafeServiceDescription(service, order, language) {
    const fromService = service?.descriptions?.[language]
        || service?.descriptions?.ar
        || service?.descriptions?.en
        || service?.descriptions?.fr
        || '';
    const fromOrder = order?.specs || order?.serviceName || '';
    return normalizePdfTextValue(fromService || fromOrder);
}

async function generateDocumentPDF(type, id, options = {}) {
    const context = resolveDocumentContext(type, id);
    if (!context) {
        throw new Error('Document not found');
    }

    const user = options.user || (await _supabase.auth.getUser()).data?.user;
    if (!canUserAccessOrder(user, context.order)) {
        throw new Error('Access denied');
    }

    if (options.requireToken && !validateDocumentToken(type, id, options.token || '')) {
        throw new Error('Invalid or expired secure token');
    }

    const order = context.order;
    const quote = context.quote || (context.type === 'invoice' ? getQuoteById(context.invoice.quoteId) : null);
    const invoice = context.invoice || null;
    const service = context.service;

    const explicitLanguage = String(options.language || '').trim().toLowerCase();
    const detectedLanguage = detectDocumentLanguageFromContent([
        order?.name,
        order?.projectName,
        order?.serviceName,
        order?.specs,
        service?.descriptions?.ar,
        quote?.notes,
    ]);
    const pdfLanguage = ['ar', 'en', 'fr'].includes(explicitLanguage) ? explicitLanguage : detectedLanguage;
    const localePack = getDocumentLocalePack(pdfLanguage, context.type);
    const isRTL = localePack.dir === 'rtl';

    const jsPDFCtor = await ensureJsPdfLibrary();
    const doc = new jsPDFCtor({ orientation: 'portrait', unit: 'pt', format: 'a4' });

    const docNumber = context.type === 'invoice' ? (invoice?.invoiceNumber || '-') : (quote?.quoteNumber || '-');
    const subtotal = normalizeMoneyValue(quote?.subtotal || invoice?.total || order?.finalPrice || 0);
    const discountValue = normalizeMoneyValue(quote?.discountValue || Math.max(0, subtotal - normalizeMoneyValue(quote?.total || invoice?.total || subtotal)));
    const total = normalizeMoneyValue(context.type === 'invoice' ? invoice?.total : quote?.total);

    const supportEmail = siteSettings.brand?.supportEmail || DEFAULT_SITE_SETTINGS.brand.supportEmail;
    const supportPhone = siteSettings.contact?.whatsappNumber || DEFAULT_SITE_SETTINGS.contact.whatsappNumber;
    const safeServiceName = normalizePdfTextValue(order?.serviceName || localePack.notAvailable);
    const safeDescription = getSafeServiceDescription(service, order, pdfLanguage) || localePack.notAvailable;
    const safeExecution = normalizePdfTextValue(service?.turnaround || localePack.executionFallback) || localePack.executionFallback;
    const safeRevision = normalizePdfTextValue(service?.revisions || localePack.revisionFallback) || localePack.revisionFallback;
    const safeTerms = normalizePdfTextValue(localePack.termsFallback);

    const canvasWidth = 1240;
    const canvasHeight = 1754;
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Unable to initialize PDF canvas');
    }

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const margin = 84;
    const contentWidth = canvasWidth - (margin * 2);
    const startX = isRTL ? canvasWidth - margin : margin;
    const endX = isRTL ? margin : canvasWidth - margin;
    const baseFontFamily = isRTL
        ? '"Noto Sans Arabic", "Tajawal", "Segoe UI", Arial, sans-serif'
        : '"Segoe UI", "Helvetica Neue", Arial, sans-serif';

    const setStartAlignment = () => {
        ctx.direction = isRTL ? 'rtl' : 'ltr';
        ctx.textAlign = isRTL ? 'right' : 'left';
    };

    const setEndAlignment = () => {
        ctx.direction = isRTL ? 'rtl' : 'ltr';
        ctx.textAlign = isRTL ? 'left' : 'right';
    };

    const applyFont = (weight, size) => {
        ctx.font = `${weight} ${size}px ${baseFontFamily}`;
        ctx.textBaseline = 'top';
    };

    let y = 68;

    const brandAnchor = startX;
    const logoCenterX = isRTL ? brandAnchor - 18 : brandAnchor + 18;
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(logoCenterX, y + 18, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    applyFont('700', 22);
    ctx.textAlign = 'center';
    ctx.direction = 'ltr';
    ctx.fillText('P', logoCenterX, y + 5);

    ctx.fillStyle = '#111827';
    applyFont('700', 44);
    setStartAlignment();
    const brandTextX = isRTL ? brandAnchor - 52 : brandAnchor + 52;
    ctx.fillText('Pixel One Visuals', brandTextX, y);

    applyFont('700', 40);
    setEndAlignment();
    ctx.fillStyle = '#374151';
    ctx.fillText(localePack.documentTitle, endX, y + 2);

    applyFont('500', 32);
    ctx.fillStyle = '#6b7280';
    ctx.fillText(normalizePdfTextValue(docNumber) || '-', endX, y + 52);

    y += 106;
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin, y);
    ctx.lineTo(canvasWidth - margin, y);
    ctx.stroke();

    y += 38;
    applyFont('700', 36);
    setStartAlignment();
    ctx.fillStyle = '#111827';
    ctx.fillText(localePack.clientInfo, startX, y);
    y += 48;

    const infoLabelWidth = 200;
    const infoGap = 24;
    const infoValueWidth = contentWidth - infoLabelWidth - infoGap;
    const labelX = startX;
    const valueX = isRTL
        ? startX - infoLabelWidth - infoGap
        : startX + infoLabelWidth + infoGap;

    const drawInfoRow = (label, rawValue) => {
        const value = normalizePdfTextValue(rawValue) || localePack.notAvailable;
        const rowStartY = y;

        applyFont('700', 30);
        setStartAlignment();
        ctx.fillStyle = '#374151';
        ctx.fillText(`${label}:`, labelX, rowStartY);

        applyFont('500', 30);
        setStartAlignment();
        ctx.fillStyle = '#111827';
        y = drawCanvasWrappedText(ctx, value, valueX, rowStartY, infoValueWidth, 40);
        y = Math.max(y, rowStartY + 40);
        y += 10;
    };

    drawInfoRow(localePack.name, order?.name);
    drawInfoRow(localePack.email, order?.email || order?.userEmail);
    drawInfoRow(localePack.phone, order?.phone);
    drawInfoRow(localePack.project, order?.projectName);

    y += 16;
    applyFont('700', 36);
    setStartAlignment();
    ctx.fillStyle = '#111827';
    ctx.fillText(localePack.serviceSummary, startX, y);
    y += 48;

    applyFont('700', 30);
    setStartAlignment();
    ctx.fillStyle = '#374151';
    ctx.fillText(`${localePack.service}:`, startX, y);
    applyFont('500', 30);
    y = drawCanvasWrappedText(ctx, safeServiceName, valueX, y, infoValueWidth, 40);

    y += 8;
    applyFont('700', 30);
    setStartAlignment();
    ctx.fillStyle = '#374151';
    ctx.fillText(`${localePack.description}:`, startX, y);
    applyFont('500', 28);
    y = drawCanvasWrappedText(ctx, safeDescription, valueX, y, infoValueWidth, 38);

    y += 28;
    const cardX = margin;
    const cardY = y;
    const cardWidth = contentWidth;
    const cardHeight = 176;

    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(cardX, cardY, cardWidth, cardHeight);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(cardX, cardY, cardWidth, cardHeight);

    applyFont('700', 30);
    setStartAlignment();
    ctx.fillStyle = '#111827';
    ctx.fillText(localePack.financialSummary, isRTL ? cardX + cardWidth - 20 : cardX + 20, cardY + 14);

    const moneyRows = [
        [localePack.subtotal, formatMoneyForDocumentLanguage(subtotal, pdfLanguage)],
        [localePack.discount, `- ${formatMoneyForDocumentLanguage(discountValue, pdfLanguage)}`],
        [localePack.total, formatMoneyForDocumentLanguage(total, pdfLanguage)],
    ];

    let moneyY = cardY + 62;
    moneyRows.forEach(([label, value], index) => {
        const isTotalRow = index === moneyRows.length - 1;
        applyFont(isTotalRow ? '700' : '500', isTotalRow ? 34 : 30);

        if (isRTL) {
            ctx.direction = 'rtl';
            ctx.textAlign = 'right';
            ctx.fillStyle = '#374151';
            ctx.fillText(label, cardX + cardWidth - 24, moneyY);
            ctx.direction = 'ltr';
            ctx.textAlign = 'left';
            ctx.fillStyle = '#111827';
            ctx.fillText(value, cardX + 24, moneyY);
        } else {
            ctx.direction = 'ltr';
            ctx.textAlign = 'left';
            ctx.fillStyle = '#374151';
            ctx.fillText(label, cardX + 24, moneyY);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#111827';
            ctx.fillText(value, cardX + cardWidth - 24, moneyY);
        }

        moneyY += 38;
    });

    y = cardY + cardHeight + 24;

    const metadataRows = context.type === 'quote'
        ? [[localePack.validUntil, formatDateForDocumentLanguage(quote?.validUntil, pdfLanguage) || localePack.notAvailable]]
        : [
            [localePack.issuedAt, formatDateForDocumentLanguage(invoice?.issuedAt || invoice?.createdAt, pdfLanguage) || localePack.notAvailable],
            [localePack.dueDate, formatDateForDocumentLanguage(invoice?.dueDate, pdfLanguage) || localePack.notAvailable],
            [localePack.status, context.type === 'invoice' ? getInvoiceStatusLabel(invoice?.status) : getQuoteStatusLabel(quote?.status)],
        ];

    metadataRows.forEach(([label, value]) => {
        applyFont('700', 27);
        setStartAlignment();
        ctx.fillStyle = '#374151';
        ctx.fillText(`${label}:`, startX, y);
        applyFont('500', 27);
        y = drawCanvasWrappedText(ctx, normalizePdfTextValue(value) || localePack.notAvailable, valueX, y, infoValueWidth, 34);
        y += 6;
    });

    y += 14;
    applyFont('700', 34);
    setStartAlignment();
    ctx.fillStyle = '#111827';
    ctx.fillText(localePack.executionTerms, startX, y);
    y += 42;

    const termsRows = [
        [localePack.executionTime, safeExecution],
        [localePack.revisionPolicy, safeRevision],
        [localePack.simpleTerms, safeTerms],
    ];

    termsRows.forEach(([label, value]) => {
        applyFont('700', 27);
        setStartAlignment();
        ctx.fillStyle = '#374151';
        ctx.fillText(`${label}:`, startX, y);
        applyFont('500', 27);
        ctx.fillStyle = '#111827';
        y = drawCanvasWrappedText(ctx, normalizePdfTextValue(value) || localePack.notAvailable, valueX, y, infoValueWidth, 34);
        y += 6;
    });

    y += 12;
    applyFont('700', 34);
    setStartAlignment();
    ctx.fillStyle = '#111827';
    ctx.fillText(localePack.contact, startX, y);
    y += 40;

    applyFont('500', 28);
    setStartAlignment();
    ctx.fillStyle = '#111827';
    y = drawCanvasWrappedText(ctx, `${localePack.email}: ${normalizePdfTextValue(supportEmail) || '-'}`, startX, y, contentWidth, 34);
    y = drawCanvasWrappedText(ctx, `${localePack.whatsapp}: +${normalizePdfTextValue(supportPhone) || '-'}`, startX, y, contentWidth, 34);

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    const fileName = `${docNumber || `${context.type}-${id}`}.pdf`;
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);

    if (options.open === true) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    if (options.download !== false) {
        doc.save(fileName);
    }

    return {
        fileName,
        blob,
        url,
    };
}

async function maybeOpenDocumentFromUrl(user) {
    const route = getDocumentRouteParams();
    if (!route.docType || !route.docId) return;

    try {
        await generateDocumentPDF(route.docType, route.docId, {
            user,
            requireToken: Boolean(route.docToken),
            token: route.docToken,
            open: true,
            download: false,
        });
    } catch (error) {
        showAuthMessage(`❌ ${error?.message || 'تعذر فتح المستند.'}`, 'error');
    } finally {
        clearDocumentRouteParams();
    }
}

window.generateDocumentPDF = generateDocumentPDF;
window.pixelOneQuoteInvoiceApi = {
    createQuoteFromOrder,
    convertQuoteToInvoice,
    generateDocumentPDF,
    buildSecureDocumentUrl,
};

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

function normalizeStringList(value) {
    if (Array.isArray(value)) {
        return value
            .map((item) => String(item || '').trim())
            .filter(Boolean);
    }

    if (typeof value === 'string') {
        return value
            .split(/\r?\n/g)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [];
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
        imageUrl: String(service?.imageUrl || service?.image_url || '').trim(),
        imageAlt: String(service?.imageAlt || service?.image_alt_ar || '').trim(),
        deliverables: normalizeStringList(service?.deliverables ?? service?.deliverables_ar),
        requirements: normalizeStringList(service?.requirements ?? service?.requirements_ar),
        workflow: normalizeStringList(service?.workflow ?? service?.workflow_ar),
        turnaround: String((service?.turnaround ?? service?.turnaround_ar) || '').trim(),
        revisions: String((service?.revisions ?? service?.revisions_ar) || '').trim(),
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

function getServiceOgImage(serviceId) {
    const resolvedId = resolveServiceDetailId(serviceId);
    return SERVICE_OG_IMAGE_MAP[resolvedId] || 'https://www.pixelonevisuals.tech/og/professional-design-1200x630.png';
}

function getServiceOgImageLocal(serviceId) {
    const resolvedId = resolveServiceDetailId(serviceId);
    return SERVICE_OG_IMAGE_LOCAL_MAP[resolvedId] || 'og/professional-design-1200x630.png';
}

function normalizeServiceImageUrl(imageUrl) {
    const raw = String(imageUrl || '').trim();
    if (!raw) return '';

    const lowered = raw.toLowerCase();
    if (['null', 'undefined', 'false', 'nan', 'about:blank', '#'].includes(lowered)) {
        return '';
    }

    const normalized = raw.replace(/\\/g, '/');

    if (/^https?:\/\//i.test(normalized)) return normalized;
    if (/^\/\//.test(normalized)) return `https:${normalized}`;
    if (/^data:image\//i.test(normalized)) return normalized;
    if (/^(\.\/|\.\.\/|\/)/.test(normalized)) return normalized;

    const looksLikeRelativePath = /[\/]/.test(normalized) && /\.[a-z0-9]{2,5}(?:[?#].*)?$/i.test(normalized);
    if (looksLikeRelativePath) return normalized;

    return '';
}

function getDefaultServiceDetailContent(service) {
    const serviceName = String(service?.titles?.ar || service?.title || '').trim();
    const safeName = serviceName || 'الخدمة';

    return {
        image: getServiceOgImageLocal(service?.id),
        imageAlt: `صورة توضيحية لخدمة ${safeName}`,
        deliverables: ['تنفيذ احترافي حسب نطاق الطلب المتفق عليه.', 'تسليم منظم وجاهز للاستخدام.'],
        requirements: ['فكرة المشروع والهدف الأساسي.', 'المحتوى والمواد المتاحة لديك.'],
        workflow: ['فهم الطلب', 'تنفيذ أولي', 'مراجعة', 'تسليم نهائي'],
        turnaround: 'يتم تحديد المدة بعد مراجعة التفاصيل.',
        revisions: 'ضمن النطاق المتفق عليه.',
    };
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
    const ogDescription = `${description} — اطلب الآن واحصل على تنفيذ احترافي من Pixel One Visuals!`;
    const image = getServiceOgImage(resolvedId);
    const imageAlt = details.imageAlt || 'Pixel One Visuals';

    document.title = title;
    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('link[rel="canonical"]', 'href', publicUrl);
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', ogDescription);
    setMetaTag('meta[property="og:url"]', 'content', publicUrl);
    setMetaTag('meta[property="og:image"]', 'content', image);
    setMetaTag('meta[property="og:image:secure_url"]', 'content', image);
    setMetaTag('meta[property="og:image:type"]', 'content', 'image/png');
    setMetaTag('meta[property="og:image:width"]', 'content', '1200');
    setMetaTag('meta[property="og:image:height"]', 'content', '630');
    setMetaTag('meta[property="og:image:alt"]', 'content', imageAlt);
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', ogDescription);
    setMetaTag('meta[name="twitter:image"]', 'content', image);
}

function getServiceDetailContent(service) {
    const defaults = getDefaultServiceDetailContent(service);

    if (!service) {
        return defaults;
    }

    const deliverables = normalizeStringList(service.deliverables);
    const requirements = normalizeStringList(service.requirements);
    const workflow = normalizeStringList(service.workflow);
    const customImage = normalizeServiceImageUrl(service.imageUrl || service.image || service.image_url);
    const customImageAlt = String(service.imageAlt || service.image_alt_ar || '').trim();

    return {
        image: customImage || defaults.image,
        imageAlt: customImageAlt || defaults.imageAlt,
        deliverables: deliverables.length > 0 ? deliverables : defaults.deliverables,
        requirements: requirements.length > 0 ? requirements : defaults.requirements,
        workflow: workflow.length > 0 ? workflow : defaults.workflow,
        turnaround: service.turnaround || defaults.turnaround,
        revisions: service.revisions || defaults.revisions,
    };
}

async function shareServiceLink(payload) {
    const title = String(payload?.title || '').trim();
    const text = String(payload?.text || '').trim();
    const url = String(payload?.url || window.location.href).trim();
    const shareData = { title, text, url };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return;
        } catch {
        }
    }

    const composed = `${title}\n${text}\n${url}`.trim();
    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(composed);
        } catch {
        }
    }

    const waUrl = `https://wa.me/?text=${encodeURIComponent(composed)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
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

function getServiceQuoteFieldConfig(service) {
    const id = String(service?.id || '').toLowerCase();
    const type = String(service?.serviceType || '').toLowerCase();

    if (id.includes('logo')) {
        return {
            type: 'logo',
            fields: [
                { key: 'brand_name', label: 'اسم العلامة التجارية', placeholder: 'مثال: Pixel One', as: 'input' },
                { key: 'industry', label: 'المجال', placeholder: 'مثال: تصميم رقمي', as: 'input' },
                { key: 'colors', label: 'الألوان المفضلة', placeholder: 'مثال: أحمر، أسود، أبيض', as: 'input' },
                { key: 'references', label: 'مراجع أو روابط', placeholder: 'روابط أو ملاحظات مرجعية', as: 'textarea' },
            ],
        };
    }

    if (id.includes('video') || type.includes('فيديو') || type.includes('video')) {
        return {
            type: 'video',
            fields: [
                { key: 'duration', label: 'المدة المطلوبة', placeholder: 'مثال: 30 ثانية', as: 'input' },
                { key: 'platform', label: 'المنصة', placeholder: 'مثال: Instagram Reels', as: 'input' },
                { key: 'assets', label: 'الأصول المتوفرة', placeholder: 'صور، لقطات، نصوص...', as: 'textarea' },
                { key: 'style', label: 'الأسلوب', placeholder: 'مثال: سريع، عصري، شبابي', as: 'input' },
            ],
        };
    }

    if (id.includes('social') || type.includes('سوشيال') || type.includes('social')) {
        return {
            type: 'social',
            fields: [
                { key: 'quantity', label: 'الكمية', placeholder: 'مثال: 10 تصاميم', as: 'input' },
                { key: 'platform', label: 'المنصة', placeholder: 'مثال: Instagram / Facebook', as: 'input' },
                { key: 'objective', label: 'الهدف', placeholder: 'وعي، مبيعات، إطلاق خدمة...', as: 'textarea' },
            ],
        };
    }

    return {
        type: 'default',
        fields: [],
    };
}

function renderDynamicOrderFields(serviceId) {
    const container = document.getElementById('orderDynamicFields');
    if (!container) return;

    const services = getStoredServices();
    const service = services.find((item) => String(item.id || '') === String(serviceId || '')) || null;
    const config = getServiceQuoteFieldConfig(service);

    if (!config.fields.length) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = config.fields.map((field) => {
        const isTextArea = field.as === 'textarea';
        const safeKey = escapeHtml(field.key);
        const safeLabel = escapeHtml(field.label);
        const safePlaceholder = escapeHtml(field.placeholder || '');

        if (isTextArea) {
            return `
                <div>
                    <label for="orderDynamic_${safeKey}" class="form-label">${safeLabel} <span class="text-gray-500 font-normal">(اختياري)</span></label>
                    <textarea id="orderDynamic_${safeKey}" data-dynamic-field="${safeKey}" rows="2" class="input-luxury focus:ring-2 focus:ring-brand-red/50" placeholder="${safePlaceholder}"></textarea>
                </div>
            `;
        }

        return `
            <div>
                <label for="orderDynamic_${safeKey}" class="form-label">${safeLabel} <span class="text-gray-500 font-normal">(اختياري)</span></label>
                <input id="orderDynamic_${safeKey}" data-dynamic-field="${safeKey}" type="text" class="input-luxury focus:ring-2 focus:ring-brand-red/50" placeholder="${safePlaceholder}">
            </div>
        `;
    }).join('');
}

function collectDynamicOrderFields() {
    const nodes = Array.from(document.querySelectorAll('[data-dynamic-field]'));
    return nodes.reduce((acc, node) => {
        const key = String(node.getAttribute('data-dynamic-field') || '').trim();
        if (!key) return acc;
        const value = String(node.value || '').trim();
        if (!value) return acc;
        acc[key] = value;
        return acc;
    }, {});
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

    if (!Array.isArray(services) || services.length === 0) {
        console.warn('RenderServices: Received empty or null services array. Using fallback.');
        services = FALLBACK_SERVICES;
    }

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
                        data-action="open-order-modal"
                        data-service-id="${escapeHtml(String(service.id || ''))}"
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
    const catalog = services.length > 0 ? services : [];
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
    const details = getServiceDetailContent(service);
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
    const resolvedId = resolveServiceDetailId(service.id);
    const detailPath = SERVICE_DETAIL_ROUTES[resolvedId] || `service-detail.html?service=${encodeURIComponent(resolvedId || '')}`;
    const shareUrl = `https://www.pixelonevisuals.tech/${detailPath}`;
    const shareTitle = `${localized.title || 'تفاصيل الخدمة'} | Pixel One Visuals`;
    const shareText = `${localized.description || 'تفاصيل الخدمة والمخرجات والمتطلبات.'} \n🔥 اطلب الآن من Pixel One Visuals واحصل على تنفيذ احترافي!`;
    const fallbackImage = getServiceOgImageLocal(service.id);

    root.innerHTML = `
        <article class="water-card rounded-3xl overflow-hidden">
            <img src="${escapeHtml(details.image)}" alt="${escapeHtml(details.imageAlt)}" class="w-full h-[260px] md:h-[360px] object-cover" loading="eager" referrerpolicy="no-referrer" data-role="service-hero-image" data-fallback-image="${escapeHtml(fallbackImage)}">
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
                    <button id="serviceDetailOrderBtn" type="button" data-action="open-order-modal" data-service-id="${escapeHtml(String(service.id || ''))}" data-service-name="${serviceName}" data-final-price="${servicePrice}" class="btn-filled-red px-8 py-4 rounded-xl font-black ${isSoon ? 'btn-disabled' : ''}" ${isSoon ? 'disabled' : ''}>
                        ${isSoon ? 'قريباً جداً' : 'اطلب الخدمة الآن'}
                    </button>
                    <a href="services.html" class="px-8 py-4 rounded-xl font-black border border-white/20 text-gray-200 hover:bg-white/10 text-center">كل الخدمات</a>
                </div>

                <div class="mt-6 water-card rounded-2xl p-5">
                    <h2 class="text-white font-black mb-4 text-sm">شارك هذه الخدمة</h2>
                    <div class="flex flex-wrap gap-3">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-facebook" aria-label="مشاركة على فيسبوك">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            <span>فيسبوك</span>
                        </a>
                        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle + ' — ' + shareText)}&url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-x" aria-label="مشاركة على X">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            <span>X</span>
                        </a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-linkedin" aria-label="مشاركة على لينكدإن">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            <span>لينكدإن</span>
                        </a>
                        <a href="https://wa.me/?text=${encodeURIComponent(shareTitle + '\n' + shareText + '\n' + shareUrl)}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-whatsapp" aria-label="مشاركة عبر واتساب">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            <span>واتساب</span>
                        </a>
                        <a href="https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle + ' — ' + shareText)}" target="_blank" rel="noopener noreferrer" class="share-btn share-btn-telegram" aria-label="مشاركة عبر تيليجرام">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                            <span>تيليجرام</span>
                        </a>
                        <button type="button" data-action="copy-service-link" data-copy-url="${escapeHtml(shareUrl)}" class="share-btn share-btn-copy" aria-label="نسخ الرابط">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                            <span>نسخ الرابط</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `;

    const heroImage = root.querySelector('[data-role="service-hero-image"]');
    if (heroImage) {
        const fallbackSrc = heroImage.getAttribute('data-fallback-image') || '';
        if (fallbackSrc) {
            heroImage.addEventListener('error', () => {
                if (heroImage.dataset.fallbackApplied === '1') return;
                heroImage.dataset.fallbackApplied = '1';
                heroImage.setAttribute('src', fallbackSrc);
            }, { once: true });
        }
    }
}

async function loadServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    const discountContext = getDiscountContextForUser(currentSessionUser?.email);

    const managedServices = getStoredServices();
    renderServices(grid, managedServices.length > 0 ? managedServices : FALLBACK_SERVICES, discountContext);
}

window.openOrderModal = async function(serviceName, meta = {}) {
    const modal = document.getElementById('orderModal');
    const selectedServiceText = document.getElementById('selectedServiceText');
    const hiddenServiceName = document.getElementById('hiddenServiceName');
    const orderForm = document.getElementById('orderForm');
    const orderMsgBox = document.getElementById('orderMsgBox');
    const firstInput = document.getElementById('orderName');
    const orderPriceTag = document.getElementById('orderPriceTag');

    if (!modal || !selectedServiceText || !hiddenServiceName || !orderForm || !orderMsgBox) return;

    const { data: { user } } = await _supabase.auth.getUser();
    currentSessionUser = user || null;

    orderForm.reset();
    orderMsgBox.classList.remove('active');

    const localizedServiceName = localizeCustomServiceName(serviceName);
    selectedServiceText.textContent = localizedServiceName;
    hiddenServiceName.value = localizedServiceName;

    const hiddenServiceId = document.getElementById('hiddenServiceId');
    if (hiddenServiceId) hiddenServiceId.value = meta.serviceId || '';
    renderDynamicOrderFields(meta.serviceId || '');

    const hiddenPrice = document.getElementById('hiddenFinalPrice');
    const hiddenDiscountCode = document.getElementById('hiddenDiscountCode');
    if (hiddenPrice) hiddenPrice.value = meta.finalPrice || '';
    if (hiddenDiscountCode) hiddenDiscountCode.value = meta.discountCode || '';

    // Show price next to service name
    if (orderPriceTag) {
        orderPriceTag.textContent = meta.finalPrice ? `- ${meta.finalPrice} MAD` : '';
    }

    // Auto-fill email if user session is available
    const emailInput = document.getElementById('orderEmail');
    if (emailInput && currentSessionUser?.email) {
        emailInput.value = currentSessionUser.email;
    }

    // Auto-fill phone from user profile (pixel_user_signups)
    const phoneInput = document.getElementById('orderPhone');
    const phoneHint = document.getElementById('orderPhoneHint');
    if (phoneInput && currentSessionUser?.id) {
        try {
            const { data } = await _supabase
                .from(TABLES.userSignups)
                .select('phone')
                .eq('auth_user_id', currentSessionUser.id)
                .maybeSingle();
            if (data?.phone) {
                phoneInput.value = data.phone;
                if (phoneHint) phoneHint.classList.remove('hidden');
            }
        } catch { /* silently skip auto-fill */ }
    }

    const submitBtn = document.getElementById('btnOrderSubmit');
    if (submitBtn) submitBtn.lastChild.textContent = ' إرسال ومتابعة عبر واتساب';

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
                serviceId: actionEl.dataset.serviceId || '',
                finalPrice: actionEl.dataset.finalPrice || '',
                discountCode: actionEl.dataset.discountCode || '',
                lang: actionEl.dataset.serviceLang || '',
            });
            return;
        }

        if (action === 'open-order-modal') {
            openOrderModal(actionEl.dataset.serviceName || 'طلب خدمة مخصص', {
                serviceId: actionEl.dataset.serviceId || '',
                finalPrice: actionEl.dataset.finalPrice || '',
                discountCode: actionEl.dataset.discountCode || '',
                lang: actionEl.dataset.serviceLang || '',
            });
            return;
        }

        if (action === 'scroll-to') {
            const targetId = actionEl.dataset.targetId || '';
            const section = targetId ? document.getElementById(targetId) : null;
            if (section) section.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        if (action === 'share-service') {
            shareServiceLink({
                title: actionEl.dataset.shareTitle || document.title,
                text: actionEl.dataset.shareText || '',
                url: actionEl.dataset.shareUrl || window.location.href,
            });
            return;
        }

        if (action === 'copy-service-link') {
            const copyUrl = actionEl.dataset.copyUrl || window.location.href;
            if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(copyUrl).then(() => {
                    const span = actionEl.querySelector('span');
                    if (span) { const orig = span.textContent; span.textContent = 'تم النسخ ✓'; setTimeout(() => { span.textContent = orig; }, 2000); }
                }).catch(() => {});
            }
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
    const hiddenServiceId = document.getElementById('hiddenServiceId');
    const hiddenPrice = document.getElementById('hiddenFinalPrice');
    const hiddenDiscountCode = document.getElementById('hiddenDiscountCode');
    const nameInput = document.getElementById('orderName');
    const projectNameInput = document.getElementById('orderProjectName');
    const phoneInput = document.getElementById('orderPhone');
    const emailInput = document.getElementById('orderEmail');
    const specsInput = document.getElementById('orderSpecs');

    if (!btn || !msgBox || !hiddenServiceName || !nameInput || !phoneInput) return;

    // 1. تأمين واجهة المستخدم (CRO & UX)
    btn.disabled = true;
    const btnTextNode = btn.lastChild;
    if (btnTextNode) btnTextNode.textContent = ' جاري الإرسال...';

    const serviceName = hiddenServiceName.value;
    const serviceId = hiddenServiceId?.value || '';
    const finalPrice = hiddenPrice?.value || '';
    const discountCode = hiddenDiscountCode?.value || '';
    const name = nameInput.value;
    const projectName = projectNameInput?.value || '';
    const phone = phoneInput.value;
    const email = emailInput?.value || '';
    const specs = specsInput?.value || '';
    const dynamicFields = collectDynamicOrderFields();
    const dynamicSpecs = Object.entries(dynamicFields)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    const mergedSpecs = [specs.trim(), dynamicSpecs.trim()].filter(Boolean).join('\n\n');

    // Validate phone is not empty
    if (!phone.trim()) {
        msgBox.textContent = '❌ رقم الواتساب مطلوب للتواصل معك.';
        msgBox.className = 'msg-box msg-error active';
        btn.disabled = false;
        if (btnTextNode) btnTextNode.textContent = ' إرسال ومتابعة عبر واتساب';
        phoneInput.focus();
        return;
    }

    const myWhatsappNumber = siteSettings.contact?.whatsappNumber || DEFAULT_SITE_SETTINGS.contact.whatsappNumber;
    const supportEmail = siteSettings.brand?.supportEmail || DEFAULT_SITE_SETTINGS.brand.supportEmail;

    if (myWhatsappNumber === '212600000000') {
        msgBox.textContent = t('orderWhatsAppNotSet');
        msgBox.className = 'msg-box msg-error active';
        btn.disabled = false;
        if (btnTextNode) btnTextNode.textContent = ' إرسال ومتابعة عبر واتساب';
        return;
    }

    const { data: { user } } = await _supabase.auth.getUser();
    currentSessionUser = user || null;
    const effectiveEmail = email || currentSessionUser?.email || '';

    if (!normalizeEmail(effectiveEmail)) {
        msgBox.textContent = t('orderEmailRequired');
        msgBox.className = 'msg-box msg-error active';
        btn.disabled = false;
        if (btnTextNode) btnTextNode.textContent = ' إرسال ومتابعة عبر واتساب';
        return;
    }

    const orderId = generateTrackingCode();
    const orderDateIso = new Date().toISOString();
    const orderStatus = siteSettings.orders?.defaultStatus || DEFAULT_SITE_SETTINGS.orders.defaultStatus;

    // 2. حفظ الطلب في قاعدة البيانات (Supabase)
    addOrderRecord({
        id: orderId,
        trackingCode: orderId,
        serviceId,
        serviceName,
        name,
        projectName,
        phone,
        email: effectiveEmail,
        specs: mergedSpecs,
        status: orderStatus,
        supportEmail,
        createdAt: orderDateIso,
        lastUpdateAt: orderDateIso,
        userId: currentSessionUser?.id || null,
        userEmail: currentSessionUser?.email || effectiveEmail || null,
        finalPrice,
        discountCode,
    });

    let createdQuote = null;
    try {
        createdQuote = await createQuoteFromOrder(orderId);
    } catch {
        createdQuote = null;
    }

    // 3. 🚀 إرسال البيانات إلى نظام الأتمتة (Viasocket) في الخلفية
    try {
        await sendAutomationEvent('order_created', {
            orderId,
            serviceName,
            customerName: name,
            projectName,
            customerPhone: phone,
            customerEmail: effectiveEmail,
            specs: mergedSpecs,
            finalPrice,
            discountCode,
            orderDate: orderDateIso,
            quoteId: createdQuote?.id || null,
            quoteNumber: createdQuote?.quoteNumber || null,
            quoteDocumentLink: createdQuote
                ? buildAppUrl('dashboard.html', {
                    docType: 'quote',
                    docId: createdQuote.id,
                    docToken: issueDocumentToken('quote', createdQuote.id, 12 * 60),
                })
                : null,
        });
    } catch {
        // ملاحظة معمارية: نحن لا نوقف عملية العميل إذا فشل الـ Webhook
    }

    // 4. تجهيز رسالة الواتساب وتوجيه العميل
    const discountLine = discountCode ? `${t('waDiscountCode')} ${discountCode}\n` : '';
    const priceLine = finalPrice ? `${t('waFinalPrice')} ${finalPrice} MAD\n` : '';
    const projectLine = projectName ? `🏢 المشروع/الشركة: ${projectName}\n` : '';
    const specsLine = mergedSpecs.trim() ? `${t('waSpecs')}\n${mergedSpecs}\n\n` : '';

    const message = `${t('waTitle')} 🔴\n\n`
        + `${t('waOrderId')} ${orderId}\n`
        + `${t('waOrderDate')} ${formatLocalizedDateTime(orderDateIso)}\n`
        + `${t('waService')} ${serviceName}\n`
        + `${priceLine}`
        + `${discountLine}`
        + `${t('waCustomerName')} ${name}\n`
        + `${projectLine}`
        + `${t('waPhone')} ${phone}\n`
        + `${t('waEmail')} ${effectiveEmail || '-'}\n\n`
        + `${specsLine}`
        + `--- مرسل من موقع Pixel One ---`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${myWhatsappNumber}?text=${encodedMessage}`;

    // فتح واتساب للعميل
    window.open(whatsappUrl, '_blank');

    // 5. إظهار رسالة النجاح وتفريغ الاستمارة
    if (createdQuote) {
        msgBox.innerHTML = `
            <div class="font-bold mb-2">✅ ${escapeHtml(t('quoteReadyTitle'))}</div>
            <div class="text-sm text-white/90 mb-2">رقم التتبع: <span class="font-en">${escapeHtml(orderId)}</span></div>
            <div class="text-sm text-white/90 mb-3">رقم عرض السعر: <span class="font-en">${escapeHtml(createdQuote.quoteNumber || '-')}</span></div>
            <div class="flex flex-wrap gap-2">
                <button type="button" id="quoteReadyDownloadBtn" class="px-3 py-2 rounded-lg border border-emerald-400/40 text-emerald-200 text-xs font-bold">${escapeHtml(t('quoteReadyDownload'))}</button>
                <span class="text-xs text-gray-200 self-center">${escapeHtml(t('quoteReadyNotice'))}</span>
            </div>
        `;

        const downloadBtn = document.getElementById('quoteReadyDownloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', async () => {
                try {
                    await generateDocumentPDF('quote', createdQuote.id);
                } catch (error) {
                    showInlineMessage(msgBox, `❌ ${error?.message || 'تعذر إنشاء PDF.'}`, 'error');
                }
            }, { once: true });
        }
    } else {
        msgBox.textContent = `✅ تم إرسال طلبك بنجاح! رمز التتبع: ${orderId}.`;
    }

    msgBox.className = 'msg-box msg-success active';
    if (btnTextNode) btnTextNode.textContent = ' تم الإرسال ✓';

    setTimeout(() => {
        closeOrderModal();
        btn.disabled = false;
        if (btnTextNode) btnTextNode.textContent = ' إرسال ومتابعة عبر واتساب';
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
    const policyConsentWrap = document.getElementById('policyConsentWrap');
    const policyCheckboxes = Array.from(document.querySelectorAll('[data-policy-consent="required"]'));
    const policyLinks = Array.from(document.querySelectorAll('[data-policy-link]'));
    capturePostAuthRedirectFromCurrentUrl();

    policyLinks.forEach((linkEl) => {
        if (!linkEl || linkEl.dataset.bound === 'true') return;
        linkEl.dataset.bound = 'true';
        linkEl.addEventListener('click', () => {
            linkEl.closest('label')?.querySelector('input[type="checkbox"]')?.focus();
        });
    });

    function updateSignupButtonState() {
        const btn = document.getElementById('btnSubmit');
        const gBtn = document.getElementById('btnGoogleAuth');
        if (isLogin) return;
        const allChecked = policyCheckboxes.every((cb) => cb.checked);
        if (btn) {
            btn.disabled = !allChecked;
            btn.classList.toggle('btn-disabled', !allChecked);
        }
        if (gBtn) {
            gBtn.disabled = !allChecked;
            gBtn.classList.toggle('opacity-40', !allChecked);
            gBtn.classList.toggle('cursor-not-allowed', !allChecked);
        }
    }

    function setPolicyConsentState(show) {
        const phoneWrap = document.getElementById('phoneFieldWrap');
        if (phoneWrap) phoneWrap.classList.toggle('hidden', !show);

        if (policyConsentWrap) {
            policyConsentWrap.classList.toggle('hidden', !show);
        }

        policyCheckboxes.forEach((checkbox) => {
            checkbox.required = show;
            if (!show) {
                checkbox.checked = false;
            }
        });

        const btn = document.getElementById('btnSubmit');
        const gBtn = document.getElementById('btnGoogleAuth');
        if (btn) {
            if (show) {
                btn.disabled = true;
                btn.classList.add('btn-disabled');
            } else {
                btn.disabled = false;
                btn.classList.remove('btn-disabled');
            }
        }
        if (gBtn) {
            if (show) {
                gBtn.disabled = true;
                gBtn.classList.add('opacity-40', 'cursor-not-allowed');
            } else {
                gBtn.disabled = false;
                gBtn.classList.remove('opacity-40', 'cursor-not-allowed');
            }
        }
    }

    policyCheckboxes.forEach((cb) => {
        cb.addEventListener('change', updateSignupButtonState);
    });

    function getPostAuthDestination(user) {
        if (isAdminUser(user)) return 'admin-dashboard.html';
        const redirectPath = getStoredPostAuthRedirectPath();
        clearStoredPostAuthRedirectPath();
        return redirectPath || 'index.html';
    }

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
        window.location.replace(getPostAuthDestination(user));
        return;
    }

    setPolicyConsentState(false);

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
            setPolicyConsentState(!isLogin);
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
                        window.location.href = getPostAuthDestination(user);
                    }, 1000);
                } else {
                    const hasPolicyConsent = policyCheckboxes.every((checkbox) => checkbox.checked);
                    if (!hasPolicyConsent) {
                        showAuthMessage('❌ يجب الموافقة على سياسة الخصوصية وشروط الاستخدام وسياسة الاسترجاع قبل إنشاء الحساب.', 'error');
                        return;
                    }

                    const signupPhone = (document.getElementById('signupPhone')?.value || '').trim();

                    const { error } = await _supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            emailRedirectTo: getAuthCallbackUrl('signup'),
                            data: {
                                phone: signupPhone,
                            },
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
                btn.textContent = isLogin ? 'دخول المنصة' : 'تسجيل حساب جديد';
                if (isLogin) {
                    btn.disabled = false;
                    btn.classList.remove('btn-disabled');
                } else {
                    updateSignupButtonState();
                }
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

    const googleBtn = document.getElementById('btnGoogleAuth');
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            if (!isLogin) {
                const allChecked = policyCheckboxes.every((cb) => cb.checked);
                if (!allChecked) {
                    showAuthMessage('❌ يجب الموافقة على السياسات أولاً قبل إنشاء حساب عبر Google.', 'error');
                    return;
                }
            }
            googleBtn.disabled = true;
            try {
                const { error } = await _supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: getAuthCallbackUrl('signup'),
                    },
                });
                if (error) throw error;
            } catch (err) {
                showAuthMessage(`❌ ${getFriendlyAuthErrorMessage(err, 'تعذر تسجيل الدخول عبر Google.')}`, 'error');
                googleBtn.disabled = false;
            }
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
        clearTimeout(safetyTimer);
        if (titleEl) titleEl.textContent = title;
        if (textEl) textEl.textContent = text;
        if (detailsEl) detailsEl.textContent = details || '';
        if (actionBtn && action && action.href && action.label) {
            actionBtn.classList.remove('hidden');
            actionBtn.textContent = action.label;
            actionBtn.href = action.href;
        }
    }

    const safetyTimer = setTimeout(() => {
        setState(
            'انتهت مهلة التحقق',
            'تعذر إكمال التحقق في الوقت المحدد. قد تكون هناك مشكلة في الاتصال.',
            'حاول مرة أخرى من صفحة تسجيل الدخول.',
            { href: getLoginPageUrl(), label: 'العودة لتسجيل الدخول' },
        );
    }, 15000);

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
                setState('تم قبول الدعوة', 'تم تفعيل الدعوة بنجاح.', 'سيتم تحويلك الآن...', null);
            } else if (isSignup) {
                setState('تم تأكيد البريد', 'تم تفعيل حسابك بنجاح.', 'سيتم تحويلك الآن...', null);
            } else if (isMagicLink) {
                setState('تم تسجيل الدخول', 'تم التحقق من Magic Link بنجاح.', 'سيتم تحويلك الآن...', null);
            } else if (isReauth) {
                setState('تمت إعادة المصادقة', 'تم التحقق الأمني بنجاح.', 'سيتم تحويلك الآن.', null);
            } else {
                setState('تمت العملية بنجاح', 'تم التحقق من الرابط بنجاح.', 'سيتم تحويلك الآن.', null);
            }

            setTimeout(() => {
                if (isAdminUser(user)) {
                    window.location.replace('admin-dashboard.html');
                } else {
                    const pendingOrder = readPendingOrderIntent();
                    const storedPath = getStoredPostAuthRedirectPath();
                    clearStoredPostAuthRedirectPath();
                    const dest = pendingOrder ? (storedPath || 'index.html') : (storedPath || 'index.html');
                    window.location.replace(dest);
                }
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
        tableBody.innerHTML = `<tr><td colspan="6" class="px-4 py-6 text-center text-gray-500">${escapeHtml(t('dashboardNoOrders'))}</td></tr>`;
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
        const safeSpecs = escapeHtml(order.specs || '-');
        const safeProject = escapeHtml(order.projectName || '-');
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
                <td class="px-4 py-3">${safeProject}</td>
                <td class="px-4 py-3 text-gray-300 number-font">${safeDate}</td>
                <td class="px-4 py-3 text-gray-300 max-w-[200px]"><div class="max-h-14 overflow-y-auto break-words text-xs">${safeSpecs}</div></td>
                <td class="px-4 py-3">
                    <div class="flex flex-col gap-2">
                        <span class="text-xs px-2 py-1 rounded-full border ${statusMeta.className} w-fit">${safeStatus}</span>
                        <span class="text-[11px] text-gray-500">${escapeHtml(t('dashboardLastUpdate'))} ${safeLastUpdate}</span>
                    </div>
                </td>
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
                    ${safeProject !== '-' ? `<p class="text-xs text-gray-400 mb-2">المشروع/الشركة: ${safeProject}</p>` : ''}
                    <p class="text-xs text-gray-400 mb-2">${escapeHtml(t('dashboardOrderDate'))} <span class="font-en">${safeDate}</span></p>
                    ${safeSpecs !== '-' ? `<p class="text-xs text-gray-300 mb-2 max-h-12 overflow-y-auto break-words">التفاصيل: ${safeSpecs}</p>` : ''}
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
    /* ---------- Phone update form ---------- */
    const updatePhoneForm = document.getElementById('updatePhoneForm');
    if (updatePhoneForm && !updatePhoneForm.dataset.bound) {
        updatePhoneForm.dataset.bound = 'true';

        // Load current phone from pixel_user_signups
        (async () => {
            const { data } = await _supabase
                .from(TABLES.userSignups)
                .select('phone')
                .eq('auth_user_id', user.id)
                .maybeSingle();
            const phoneInput = document.getElementById('profilePhone');
            if (phoneInput && data?.phone) phoneInput.value = data.phone;
        })();

        updatePhoneForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const phone = (document.getElementById('profilePhone')?.value || '').trim();
            const msgBox = document.getElementById('profileMsgBox');

            const { error } = await _supabase
                .from(TABLES.userSignups)
                .update({ phone, updated_at: new Date().toISOString() })
                .eq('auth_user_id', user.id);

            if (error) {
                if (msgBox) { msgBox.textContent = '❌ تعذر حفظ رقم الهاتف.'; msgBox.className = 'msg-box active error'; }
                return;
            }
            if (msgBox) { msgBox.textContent = '✅ تم حفظ رقم الهاتف بنجاح.'; msgBox.className = 'msg-box active success'; }
        });
    }

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

async function renderAdminNewUsersSection() {
    const tableBody = document.getElementById('adminNewUsersTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '<tr><td colspan="5" class="px-4 py-5 text-center text-gray-500">جاري تحميل الحسابات الجديدة...</td></tr>';

    const { data, error } = await _supabase
        .from(TABLES.userSignups)
        .select('auth_user_id, full_name, email, phone, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

    if (error) {
        tableBody.innerHTML = '<tr><td colspan="5" class="px-4 py-5 text-center text-red-300">تعذر تحميل الحسابات الجديدة. تأكد من تطبيق تحديثات قاعدة البيانات.</td></tr>';
        return;
    }

    if (!Array.isArray(data) || data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="px-4 py-5 text-center text-gray-500">لا توجد حسابات جديدة حتى الآن.</td></tr>';
        return;
    }

    tableBody.innerHTML = '';
    data.forEach((row, index) => {
        tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="px-4 py-3 font-en text-gray-400">${escapeHtml(String(index + 1))}</td>
                <td class="px-4 py-3 text-white">${escapeHtml(row.full_name || '-')}</td>
                <td class="px-4 py-3 font-en">${escapeHtml(row.email || '-')}</td>
                <td class="px-4 py-3 font-en">${escapeHtml(row.phone || '-')}</td>
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
        body.innerHTML = '<tr><td colspan="9" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات حالياً.</td></tr>';
        completedBody.innerHTML = '<tr><td colspan="8" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات مكتملة حالياً.</td></tr>';
        return;
    }

    body.innerHTML = '';
    if (activeOrders.length === 0) {
        body.innerHTML = '<tr><td colspan="9" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات قيد المتابعة حالياً.</td></tr>';
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
                <td class="px-4 py-3">${escapeHtml(order.projectName || '-')}</td>
                <td class="px-4 py-3 font-en">${escapeHtml(order.phone || '-')}</td>
                <td class="px-4 py-3">${escapeHtml(formatArabicDateTime(order.createdAt || ''))}</td>
                <td class="px-4 py-3 text-gray-300 max-w-[260px]"><div class="max-h-16 overflow-y-auto break-words">${safeSpecs}</div></td>
                <td class="px-4 py-3 font-en">${escapeHtml(order.finalPrice ? order.finalPrice + ' MAD' : '-')}</td>
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
        completedBody.innerHTML = '<tr><td colspan="8" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات مكتملة حالياً.</td></tr>';
    }

    completedOrders.forEach((order) => {
        const safeSpecs = escapeHtml(order.specs || '-');
        completedBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="px-4 py-3 font-en">${escapeHtml(order.id || '-')}</td>
                <td class="px-4 py-3 text-white font-bold">${escapeHtml(order.serviceName || '-')}</td>
                <td class="px-4 py-3 font-en">${escapeHtml(order.userEmail || order.email || '-')}</td>
                <td class="px-4 py-3">${escapeHtml(order.projectName || '-')}</td>
                <td class="px-4 py-3 font-en">${escapeHtml(order.phone || '-')}</td>
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

function ensureAdminQuoteInvoiceSections() {
    const root = document.querySelector('#view-admin-dashboard .dashboard-main .max-w-7xl');
    if (!root) return;

    if (!document.getElementById('adminManualOrderSection')) {
        const section = document.createElement('section');
        section.id = 'adminManualOrderSection';
        section.className = 'bg-[#121212] border border-[#222] rounded-2xl p-6 md:p-8';
        section.innerHTML = `
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                <div>
                    <h2 class="text-2xl font-black text-white">Create Manual Order</h2>
                    <p class="text-sm text-gray-500">إنشاء طلب يدوي ثم توليد عرض السعر تلقائياً.</p>
                </div>
                <button id="adminCreateManualOrderBtn" type="button" class="btn-filled-red px-5 py-3 rounded-lg text-sm font-black">Create Manual Order</button>
            </div>
            <div id="adminManualOrderMsgBox" class="msg-box" aria-live="polite"></div>
            <form id="adminManualOrderForm" class="grid grid-cols-1 md:grid-cols-2 gap-4 hidden mt-4">
                <select id="adminManualOrderService" class="input-luxury" required></select>
                <input id="adminManualOrderName" class="input-luxury" placeholder="اسم العميل" required>
                <input id="adminManualOrderEmail" type="email" class="input-luxury font-en text-left" dir="ltr" placeholder="client@email.com" required>
                <input id="adminManualOrderPhone" class="input-luxury font-en text-left" dir="ltr" placeholder="+212..." required>
                <input id="adminManualOrderProject" class="input-luxury md:col-span-2" placeholder="اسم المشروع (اختياري)">
                <textarea id="adminManualOrderSpecs" class="input-luxury md:col-span-2" placeholder="ملاحظات سريعة (اختياري)"></textarea>
                <button id="adminManualOrderSubmitBtn" type="submit" class="btn-filled-red py-3 rounded-lg font-black md:col-span-2">إنشاء الطلب + عرض السعر</button>
            </form>
        `;

        const ordersSection = document.getElementById('adminOrdersTableBody')?.closest('section');
        if (ordersSection && ordersSection.parentElement === root) {
            root.insertBefore(section, ordersSection.nextSibling);
        } else {
            root.appendChild(section);
        }
    }

    if (!document.getElementById('adminQuotesSection')) {
        const section = document.createElement('section');
        section.id = 'adminQuotesInvoicesSection';
        section.className = 'grid grid-cols-1 xl:grid-cols-2 gap-6';
        section.innerHTML = `
            <article id="adminQuotesSection" class="bg-[#121212] border border-[#222] rounded-2xl p-6 md:p-8">
                <div class="flex items-center justify-between gap-3 mb-5">
                    <div>
                        <h2 class="text-2xl font-black text-white">Quotes</h2>
                        <p class="text-sm text-gray-500">متابعة عروض الأسعار وتحويلها لفواتير.</p>
                    </div>
                    <select id="adminQuotesStatusFilter" class="input-luxury !py-2 !px-3 !text-xs !w-[170px]">
                        <option value="all">كل الحالات</option>
                        <option value="draft">draft</option>
                        <option value="sent">sent</option>
                        <option value="accepted">accepted</option>
                        <option value="rejected">rejected</option>
                        <option value="expired">expired</option>
                        <option value="converted">converted</option>
                    </select>
                </div>
                <div id="adminQuotesMsgBox" class="msg-box" aria-live="polite"></div>
                <div class="overflow-x-auto rounded-xl border border-white/10">
                    <table class="w-full min-w-[980px] text-sm">
                        <thead class="bg-black/50 text-gray-300">
                            <tr>
                                <th class="px-4 py-3 text-right">Quote #</th>
                                <th class="px-4 py-3 text-right">Order #</th>
                                <th class="px-4 py-3 text-right">Client</th>
                                <th class="px-4 py-3 text-right">Total</th>
                                <th class="px-4 py-3 text-right">Valid Until</th>
                                <th class="px-4 py-3 text-right">Status</th>
                                <th class="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="adminQuotesTableBody" class="divide-y divide-white/10 text-gray-200 bg-black/20">
                            <tr><td colspan="7" class="px-4 py-6 text-center text-gray-500">لا توجد عروض أسعار حالياً.</td></tr>
                        </tbody>
                    </table>
                </div>
            </article>

            <article id="adminInvoicesSection" class="bg-[#121212] border border-[#222] rounded-2xl p-6 md:p-8">
                <div class="flex items-center justify-between gap-3 mb-5">
                    <div>
                        <h2 class="text-2xl font-black text-white">Invoices</h2>
                        <p class="text-sm text-gray-500">إدارة الفواتير وحالة الدفع.</p>
                    </div>
                    <select id="adminInvoicesStatusFilter" class="input-luxury !py-2 !px-3 !text-xs !w-[170px]">
                        <option value="all">كل الحالات</option>
                        <option value="unpaid">unpaid</option>
                        <option value="paid">paid</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <div id="adminInvoicesMsgBox" class="msg-box" aria-live="polite"></div>
                <div class="overflow-x-auto rounded-xl border border-white/10">
                    <table class="w-full min-w-[980px] text-sm">
                        <thead class="bg-black/50 text-gray-300">
                            <tr>
                                <th class="px-4 py-3 text-right">Invoice #</th>
                                <th class="px-4 py-3 text-right">Order #</th>
                                <th class="px-4 py-3 text-right">Quote #</th>
                                <th class="px-4 py-3 text-right">Total</th>
                                <th class="px-4 py-3 text-right">Issued</th>
                                <th class="px-4 py-3 text-right">Status</th>
                                <th class="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="adminInvoicesTableBody" class="divide-y divide-white/10 text-gray-200 bg-black/20">
                            <tr><td colspan="7" class="px-4 py-6 text-center text-gray-500">لا توجد فواتير حالياً.</td></tr>
                        </tbody>
                    </table>
                </div>
            </article>
        `;

        const manualSection = document.getElementById('adminManualOrderSection');
        if (manualSection && manualSection.parentElement === root) {
            root.insertBefore(section, manualSection.nextSibling);
        } else {
            root.appendChild(section);
        }
    }
}

function renderAdminManualOrderServices() {
    const select = document.getElementById('adminManualOrderService');
    if (!select) return;

    const services = getStoredServices().filter((service) => service.enabled !== false && !service.is_coming_soon);
    if (services.length === 0) {
        select.innerHTML = '<option value="">لا توجد خدمات متاحة</option>';
        return;
    }

    select.innerHTML = services.map((service) => {
        const title = escapeHtml(service.titles?.ar || service.title || service.id);
        const price = escapeHtml(String(service.price || '0'));
        return `<option value="${escapeHtml(String(service.id || ''))}">${title} (${price} MAD)</option>`;
    }).join('');
}

function bindAdminManualOrderControls() {
    const toggleBtn = document.getElementById('adminCreateManualOrderBtn');
    const form = document.getElementById('adminManualOrderForm');
    const msgBox = document.getElementById('adminManualOrderMsgBox');

    if (toggleBtn && toggleBtn.dataset.bound !== 'true') {
        toggleBtn.dataset.bound = 'true';
        toggleBtn.addEventListener('click', () => {
            if (!form) return;
            form.classList.toggle('hidden');
            renderAdminManualOrderServices();
        });
    }

    if (!form || form.dataset.bound === 'true') return;

    form.dataset.bound = 'true';
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const serviceId = String(document.getElementById('adminManualOrderService')?.value || '').trim();
        const customerName = String(document.getElementById('adminManualOrderName')?.value || '').trim();
        const customerEmail = normalizeEmail(document.getElementById('adminManualOrderEmail')?.value || '');
        const customerPhone = String(document.getElementById('adminManualOrderPhone')?.value || '').trim();
        const projectName = String(document.getElementById('adminManualOrderProject')?.value || '').trim();
        const specs = String(document.getElementById('adminManualOrderSpecs')?.value || '').trim();

        const service = getStoredServices().find((item) => String(item.id || '') === serviceId);
        if (!service || !customerName || !customerEmail || !customerPhone) {
            showInlineMessage(msgBox, '❌ يرجى تعبئة بيانات الطلب اليدوي بشكل صحيح.', 'error');
            return;
        }

        const orderId = generateTrackingCode();
        const nowIso = new Date().toISOString();
        const financials = resolveOrderFinancials({ email: customerEmail, userEmail: customerEmail }, service);

        addOrderRecord({
            id: orderId,
            trackingCode: orderId,
            serviceId,
            serviceName: service.titles?.ar || service.title || service.id,
            name: customerName,
            projectName,
            phone: customerPhone,
            email: customerEmail,
            specs,
            status: siteSettings.orders?.defaultStatus || DEFAULT_SITE_SETTINGS.orders.defaultStatus,
            supportEmail: siteSettings.brand?.supportEmail || DEFAULT_SITE_SETTINGS.brand.supportEmail,
            createdAt: nowIso,
            lastUpdateAt: nowIso,
            userId: null,
            userEmail: customerEmail,
            finalPrice: String(financials.total),
            discountCode: '',
        });

        let quote = null;
        try {
            quote = await createQuoteFromOrder(orderId, { status: 'sent' });
        } catch {
            quote = null;
        }

        showInlineMessage(
            msgBox,
            quote
                ? `✅ تم إنشاء الطلب (${orderId}) وعرض السعر (${quote.quoteNumber}).`
                : `✅ تم إنشاء الطلب (${orderId}) بنجاح.`,
            'success',
        );

        form.reset();
        renderAdminManualOrderServices();
        renderAdminOrdersSection();
        renderAdminQuotesSection();
        renderAdminInvoicesSection();
        renderAdminStats();
    });
}

function renderAdminQuotesSection() {
    ensureAdminQuoteInvoiceSections();

    const body = document.getElementById('adminQuotesTableBody');
    const filterEl = document.getElementById('adminQuotesStatusFilter');
    const msgBox = document.getElementById('adminQuotesMsgBox');
    if (!body) return;

    const filterValue = String(filterEl?.value || 'all').toLowerCase();
    const allQuotes = getStoredQuotes().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const quotes = filterValue === 'all'
        ? allQuotes
        : allQuotes.filter((quote) => String(quote.status || '').toLowerCase() === filterValue);

    if (quotes.length === 0) {
        body.innerHTML = '<tr><td colspan="7" class="px-4 py-6 text-center text-gray-500">لا توجد عروض أسعار حالياً.</td></tr>';
    } else {
        body.innerHTML = '';
        quotes.forEach((quote) => {
            const order = getOrderById(quote.orderId);
            const statusMeta = getQuoteStatusMeta(quote.status);
            const statusOptions = QUOTE_STATUS_OPTIONS.map((status) => {
                const selected = status === quote.status ? 'selected' : '';
                return `<option value="${escapeHtml(status)}" ${selected}>${escapeHtml(status)}</option>`;
            }).join('');

            body.insertAdjacentHTML('beforeend', `
                <tr>
                    <td class="px-4 py-3 font-en">${escapeHtml(quote.quoteNumber || '-')}</td>
                    <td class="px-4 py-3 font-en">${escapeHtml(quote.orderId || '-')}</td>
                    <td class="px-4 py-3 font-en">${escapeHtml(order?.email || order?.userEmail || '-')}</td>
                    <td class="px-4 py-3 font-en">${escapeHtml(`${normalizeMoneyValue(quote.total)} MAD`)}</td>
                    <td class="px-4 py-3 text-gray-300">${escapeHtml(formatArabicDateTime(quote.validUntil || quote.createdAt || ''))}</td>
                    <td class="px-4 py-3">
                        <div class="flex flex-col gap-2">
                            <span class="text-xs px-2 py-1 rounded-full border ${statusMeta.className} w-fit">${escapeHtml(getQuoteStatusLabel(quote.status))}</span>
                            <select class="admin-quote-status input-luxury !py-1 !px-2 !text-xs" data-quote-id="${escapeHtml(quote.id)}">
                                ${statusOptions}
                            </select>
                        </div>
                    </td>
                    <td class="px-4 py-3">
                        <div class="flex flex-wrap gap-2">
                            <button type="button" class="admin-quote-details text-xs px-2 py-1 rounded border border-white/20 text-gray-200" data-quote-id="${escapeHtml(quote.id)}">تفاصيل</button>
                            <button type="button" class="admin-quote-pdf text-xs px-2 py-1 rounded border border-emerald-400/40 text-emerald-200" data-quote-id="${escapeHtml(quote.id)}">PDF</button>
                            <button type="button" class="admin-quote-link text-xs px-2 py-1 rounded border border-blue-400/40 text-blue-200" data-quote-id="${escapeHtml(quote.id)}">رابط</button>
                            <button type="button" class="admin-quote-convert text-xs px-2 py-1 rounded border border-amber-400/40 text-amber-200 ${quote.status === 'accepted' ? '' : 'opacity-50 cursor-not-allowed'}" data-quote-id="${escapeHtml(quote.id)}" ${quote.status === 'accepted' ? '' : 'disabled'}>تحويل</button>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    if (filterEl && filterEl.dataset.bound !== 'true') {
        filterEl.dataset.bound = 'true';
        filterEl.addEventListener('change', () => renderAdminQuotesSection());
    }

    document.querySelectorAll('.admin-quote-status').forEach((control) => {
        if (control.dataset.bound === 'true') return;
        control.dataset.bound = 'true';
        control.addEventListener('change', () => {
            const quoteId = control.getAttribute('data-quote-id') || '';
            updateQuoteStatus(quoteId, control.value);
            renderAdminQuotesSection();
        });
    });

    document.querySelectorAll('.admin-quote-details').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', () => {
            const quote = getQuoteById(btn.getAttribute('data-quote-id') || '');
            const order = quote ? getOrderById(quote.orderId) : null;
            if (!quote) return;
            const details = [
                `Quote: ${quote.quoteNumber}`,
                `Order: ${quote.orderId}`,
                `Client: ${order?.name || '-'} (${order?.email || order?.userEmail || '-'})`,
                `Service: ${order?.serviceName || '-'}`,
                `Subtotal: ${formatMoneyMAD(normalizeMoneyValue(quote.subtotal))}`,
                `Discount: ${formatMoneyMAD(normalizeMoneyValue(quote.discountValue))}`,
                `Total: ${formatMoneyMAD(normalizeMoneyValue(quote.total))}`,
                `Valid until: ${formatArabicDateTime(quote.validUntil || quote.createdAt || '')}`,
            ].join('\n');
            window.alert(details);
        });
    });

    document.querySelectorAll('.admin-quote-pdf').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', async () => {
            try {
                await generateDocumentPDF('quote', btn.getAttribute('data-quote-id') || '');
                showInlineMessage(msgBox, '✅ تم إنشاء PDF بنجاح.', 'success');
            } catch (error) {
                showInlineMessage(msgBox, `❌ ${error?.message || 'تعذر توليد PDF.'}`, 'error');
            }
        });
    });

    document.querySelectorAll('.admin-quote-link').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', async () => {
            const quoteId = btn.getAttribute('data-quote-id') || '';
            const link = buildSecureDocumentUrl('quote', quoteId);
            if (!link) return;
            try {
                await copyText(link);
                showInlineMessage(msgBox, '✅ تم نسخ الرابط الآمن.', 'success');
            } catch {
                showInlineMessage(msgBox, '❌ تعذر نسخ الرابط.', 'error');
            }
        });
    });

    document.querySelectorAll('.admin-quote-convert').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', async () => {
            const quoteId = btn.getAttribute('data-quote-id') || '';
            try {
                await convertQuoteToInvoice(quoteId);
                showInlineMessage(msgBox, '✅ تم تحويل عرض السعر إلى فاتورة.', 'success');
                renderAdminQuotesSection();
                renderAdminInvoicesSection();
            } catch (error) {
                showInlineMessage(msgBox, `❌ ${error?.message || 'تعذر التحويل.'}`, 'error');
            }
        });
    });
}

function renderAdminInvoicesSection() {
    ensureAdminQuoteInvoiceSections();

    const body = document.getElementById('adminInvoicesTableBody');
    const filterEl = document.getElementById('adminInvoicesStatusFilter');
    const msgBox = document.getElementById('adminInvoicesMsgBox');
    if (!body) return;

    const filterValue = String(filterEl?.value || 'all').toLowerCase();
    const allInvoices = getStoredInvoices().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const invoices = filterValue === 'all'
        ? allInvoices
        : allInvoices.filter((invoice) => String(invoice.status || '').toLowerCase() === filterValue);

    if (invoices.length === 0) {
        body.innerHTML = '<tr><td colspan="7" class="px-4 py-6 text-center text-gray-500">لا توجد فواتير حالياً.</td></tr>';
    } else {
        body.innerHTML = '';
        invoices.forEach((invoice) => {
            const quote = invoice.quoteId ? getQuoteById(invoice.quoteId) : null;
            const statusMeta = getInvoiceStatusMeta(invoice.status);
            const statusOptions = INVOICE_STATUS_OPTIONS.map((status) => {
                const selected = status === invoice.status ? 'selected' : '';
                return `<option value="${escapeHtml(status)}" ${selected}>${escapeHtml(status)}</option>`;
            }).join('');

            body.insertAdjacentHTML('beforeend', `
                <tr>
                    <td class="px-4 py-3 font-en">${escapeHtml(invoice.invoiceNumber || '-')}</td>
                    <td class="px-4 py-3 font-en">${escapeHtml(invoice.orderId || '-')}</td>
                    <td class="px-4 py-3 font-en">${escapeHtml(quote?.quoteNumber || '-')}</td>
                    <td class="px-4 py-3 font-en">${escapeHtml(`${normalizeMoneyValue(invoice.total)} MAD`)}</td>
                    <td class="px-4 py-3 text-gray-300">${escapeHtml(formatArabicDateTime(invoice.issuedAt || invoice.createdAt || ''))}</td>
                    <td class="px-4 py-3">
                        <div class="flex flex-col gap-2">
                            <span class="text-xs px-2 py-1 rounded-full border ${statusMeta.className} w-fit">${escapeHtml(getInvoiceStatusLabel(invoice.status))}</span>
                            <select class="admin-invoice-status input-luxury !py-1 !px-2 !text-xs" data-invoice-id="${escapeHtml(invoice.id)}">
                                ${statusOptions}
                            </select>
                        </div>
                    </td>
                    <td class="px-4 py-3">
                        <div class="flex flex-wrap gap-2">
                            <button type="button" class="admin-invoice-pdf text-xs px-2 py-1 rounded border border-emerald-400/40 text-emerald-200" data-invoice-id="${escapeHtml(invoice.id)}">PDF</button>
                            <button type="button" class="admin-invoice-link text-xs px-2 py-1 rounded border border-blue-400/40 text-blue-200" data-invoice-id="${escapeHtml(invoice.id)}">رابط</button>
                            <button type="button" class="admin-invoice-resend text-xs px-2 py-1 rounded border border-white/20 text-gray-200" data-invoice-id="${escapeHtml(invoice.id)}">Resend PDF</button>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    if (filterEl && filterEl.dataset.bound !== 'true') {
        filterEl.dataset.bound = 'true';
        filterEl.addEventListener('change', () => renderAdminInvoicesSection());
    }

    document.querySelectorAll('.admin-invoice-status').forEach((control) => {
        if (control.dataset.bound === 'true') return;
        control.dataset.bound = 'true';
        control.addEventListener('change', () => {
            const invoiceId = control.getAttribute('data-invoice-id') || '';
            updateInvoiceStatus(invoiceId, control.value);
            renderAdminInvoicesSection();
        });
    });

    const bindInvoicePdfAction = (selector) => {
        document.querySelectorAll(selector).forEach((btn) => {
            if (btn.dataset.bound === 'true') return;
            btn.dataset.bound = 'true';
            btn.addEventListener('click', async () => {
                try {
                    await generateDocumentPDF('invoice', btn.getAttribute('data-invoice-id') || '');
                    showInlineMessage(msgBox, '✅ تم إرسال/توليد الفاتورة PDF.', 'success');
                } catch (error) {
                    showInlineMessage(msgBox, `❌ ${error?.message || 'تعذر توليد PDF.'}`, 'error');
                }
            });
        });
    };

    bindInvoicePdfAction('.admin-invoice-pdf');
    bindInvoicePdfAction('.admin-invoice-resend');

    document.querySelectorAll('.admin-invoice-link').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', async () => {
            const invoiceId = btn.getAttribute('data-invoice-id') || '';
            const link = buildSecureDocumentUrl('invoice', invoiceId);
            if (!link) return;
            try {
                await copyText(link);
                showInlineMessage(msgBox, '✅ تم نسخ الرابط الآمن.', 'success');
            } catch {
                showInlineMessage(msgBox, '❌ تعذر نسخ الرابط.', 'error');
            }
        });
    });
}

function ensureDashboardQuoteInvoiceSections() {
    const root = document.querySelector('#view-dashboard .dashboard-main .max-w-6xl');
    if (!root) return;

    if (!document.getElementById('dashboardQuotesSection')) {
        const section = document.createElement('div');
        section.id = 'dashboardQuotesSection';
        section.className = 'mt-12 bg-[#121212] border border-[#222] rounded-2xl p-6 md:p-8 animate-fade-up delay-220';
        section.innerHTML = `
            <div class="mb-6">
                <h3 class="text-2xl font-black text-white">My Quotes</h3>
                <p class="text-sm text-gray-500">عروض الأسعار الخاصة بك مع رابط آمن وPDF.</p>
            </div>
            <div id="dashboardQuotesList" class="space-y-4">
                <article class="border border-white/10 rounded-xl p-4 bg-black/30 text-gray-400 text-sm text-center">${escapeHtml(t('dashboardNoQuotes'))}</article>
            </div>
        `;

        const ordersSection = document.getElementById('dashboardOrdersSection');
        if (ordersSection && ordersSection.parentElement === root) {
            root.insertBefore(section, ordersSection.nextSibling);
        } else {
            root.appendChild(section);
        }
    }

    if (!document.getElementById('dashboardInvoicesSection')) {
        const section = document.createElement('div');
        section.id = 'dashboardInvoicesSection';
        section.className = 'mt-12 bg-[#121212] border border-[#222] rounded-2xl p-6 md:p-8 animate-fade-up delay-240';
        section.innerHTML = `
            <div class="mb-6">
                <h3 class="text-2xl font-black text-white">My Invoices</h3>
                <p class="text-sm text-gray-500">حالة الدفع والفواتير القابلة للتحميل.</p>
            </div>
            <div id="dashboardInvoicesList" class="space-y-4">
                <article class="border border-white/10 rounded-xl p-4 bg-black/30 text-gray-400 text-sm text-center">${escapeHtml(t('dashboardNoInvoices'))}</article>
            </div>
        `;

        const quotesSection = document.getElementById('dashboardQuotesSection');
        if (quotesSection && quotesSection.parentElement === root) {
            root.insertBefore(section, quotesSection.nextSibling);
        } else {
            root.appendChild(section);
        }
    }
}

function renderDashboardQuotes(user) {
    ensureDashboardQuoteInvoiceSections();

    const list = document.getElementById('dashboardQuotesList');
    if (!list) return;

    const userEmail = normalizeEmail(user?.email);
    const quotes = getStoredQuotes()
        .filter((quote) => {
            const order = getOrderById(quote.orderId);
            const linkedEmail = normalizeEmail(order?.userEmail || order?.email);
            return Boolean(linkedEmail && linkedEmail === userEmail);
        })
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    if (quotes.length === 0) {
        list.innerHTML = `<article class="border border-white/10 rounded-xl p-4 bg-black/30 text-gray-400 text-sm text-center">${escapeHtml(t('dashboardNoQuotes'))}</article>`;
        return;
    }

    list.innerHTML = '';
    quotes.forEach((quote) => {
        const order = getOrderById(quote.orderId);
        const statusMeta = getQuoteStatusMeta(quote.status);
        const safeNumber = escapeHtml(quote.quoteNumber || '-');
        const safeService = escapeHtml(order?.serviceName || '-');
        const safeTotal = escapeHtml(formatMoneyMAD(normalizeMoneyValue(quote.total)));
        const safeValidUntil = escapeHtml(formatArabicDateTime(quote.validUntil || quote.createdAt || ''));
        const safeStatus = escapeHtml(getQuoteStatusLabel(quote.status));

        list.insertAdjacentHTML('beforeend', `
            <article class="border border-white/10 rounded-xl p-4 bg-black/30">
                <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                        <h4 class="text-white font-bold text-sm font-en">${safeNumber}</h4>
                        <p class="text-xs text-gray-400 mt-1">${safeService}</p>
                    </div>
                    <span class="text-[11px] px-2 py-1 rounded-full border ${statusMeta.className}">${safeStatus}</span>
                </div>
                <p class="text-xs text-gray-300">الإجمالي: <span class="font-en">${safeTotal}</span></p>
                <p class="text-xs text-gray-500 mt-1">صالح حتى: <span class="font-en">${safeValidUntil}</span></p>
                <div class="mt-3 flex flex-wrap gap-2">
                    <button type="button" class="dashboard-quote-details text-xs px-2 py-1 rounded border border-white/20 text-gray-200" data-quote-id="${escapeHtml(quote.id)}">تفاصيل</button>
                    <button type="button" class="dashboard-quote-pdf text-xs px-2 py-1 rounded border border-emerald-400/40 text-emerald-200" data-quote-id="${escapeHtml(quote.id)}">تحميل PDF</button>
                    <button type="button" class="dashboard-quote-link text-xs px-2 py-1 rounded border border-blue-400/40 text-blue-200" data-quote-id="${escapeHtml(quote.id)}">رابط آمن</button>
                </div>
            </article>
        `);
    });

    document.querySelectorAll('.dashboard-quote-details').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', () => {
            const quote = getQuoteById(btn.getAttribute('data-quote-id') || '');
            const order = quote ? getOrderById(quote.orderId) : null;
            if (!quote) return;
            const details = [
                `Quote: ${quote.quoteNumber}`,
                `Service: ${order?.serviceName || '-'}`,
                `Project: ${order?.projectName || '-'}`,
                `Total: ${formatMoneyMAD(normalizeMoneyValue(quote.total))}`,
                `Status: ${getQuoteStatusLabel(quote.status)}`,
            ].join('\n');
            window.alert(details);
        });
    });

    document.querySelectorAll('.dashboard-quote-pdf').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', async () => {
            try {
                await generateDocumentPDF('quote', btn.getAttribute('data-quote-id') || '');
            } catch (error) {
                showAuthMessage(`❌ ${error?.message || 'تعذر تحميل PDF.'}`, 'error');
            }
        });
    });

    document.querySelectorAll('.dashboard-quote-link').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', async () => {
            const link = buildSecureDocumentUrl('quote', btn.getAttribute('data-quote-id') || '');
            if (!link) return;
            try {
                await copyText(link);
                showAuthMessage('✅ تم نسخ الرابط الآمن.', 'success');
            } catch {
                showAuthMessage('❌ تعذر نسخ الرابط.', 'error');
            }
        });
    });
}

function renderDashboardInvoices(user) {
    ensureDashboardQuoteInvoiceSections();

    const list = document.getElementById('dashboardInvoicesList');
    if (!list) return;

    const userEmail = normalizeEmail(user?.email);
    const invoices = getStoredInvoices()
        .filter((invoice) => {
            const order = getOrderById(invoice.orderId);
            const linkedEmail = normalizeEmail(order?.userEmail || order?.email);
            return Boolean(linkedEmail && linkedEmail === userEmail);
        })
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    if (invoices.length === 0) {
        list.innerHTML = `<article class="border border-white/10 rounded-xl p-4 bg-black/30 text-gray-400 text-sm text-center">${escapeHtml(t('dashboardNoInvoices'))}</article>`;
        return;
    }

    list.innerHTML = '';
    invoices.forEach((invoice) => {
        const quote = invoice.quoteId ? getQuoteById(invoice.quoteId) : null;
        const statusMeta = getInvoiceStatusMeta(invoice.status);
        const safeNumber = escapeHtml(invoice.invoiceNumber || '-');
        const safeQuote = escapeHtml(quote?.quoteNumber || '-');
        const safeTotal = escapeHtml(formatMoneyMAD(normalizeMoneyValue(invoice.total)));
        const safeIssuedAt = escapeHtml(formatArabicDateTime(invoice.issuedAt || invoice.createdAt || ''));
        const safeStatus = escapeHtml(getInvoiceStatusLabel(invoice.status));

        list.insertAdjacentHTML('beforeend', `
            <article class="border border-white/10 rounded-xl p-4 bg-black/30">
                <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                        <h4 class="text-white font-bold text-sm font-en">${safeNumber}</h4>
                        <p class="text-xs text-gray-400 mt-1">Quote: <span class="font-en">${safeQuote}</span></p>
                    </div>
                    <span class="text-[11px] px-2 py-1 rounded-full border ${statusMeta.className}">${safeStatus}</span>
                </div>
                <p class="text-xs text-gray-300">الإجمالي: <span class="font-en">${safeTotal}</span></p>
                <p class="text-xs text-gray-500 mt-1">تاريخ الإصدار: <span class="font-en">${safeIssuedAt}</span></p>
                <div class="mt-3 flex flex-wrap gap-2">
                    <button type="button" class="dashboard-invoice-details text-xs px-2 py-1 rounded border border-white/20 text-gray-200" data-invoice-id="${escapeHtml(invoice.id)}">تفاصيل</button>
                    <button type="button" class="dashboard-invoice-pdf text-xs px-2 py-1 rounded border border-emerald-400/40 text-emerald-200" data-invoice-id="${escapeHtml(invoice.id)}">تحميل PDF</button>
                    <button type="button" class="dashboard-invoice-link text-xs px-2 py-1 rounded border border-blue-400/40 text-blue-200" data-invoice-id="${escapeHtml(invoice.id)}">رابط آمن</button>
                </div>
            </article>
        `);
    });

    document.querySelectorAll('.dashboard-invoice-details').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', () => {
            const invoice = getInvoiceById(btn.getAttribute('data-invoice-id') || '');
            const quote = invoice?.quoteId ? getQuoteById(invoice.quoteId) : null;
            const order = invoice ? getOrderById(invoice.orderId) : null;
            if (!invoice) return;
            const details = [
                `Invoice: ${invoice.invoiceNumber || '-'}`,
                `Quote: ${quote?.quoteNumber || '-'}`,
                `Service: ${order?.serviceName || '-'}`,
                `Project: ${order?.projectName || '-'}`,
                `Total: ${formatMoneyMAD(normalizeMoneyValue(invoice.total))}`,
                `Status: ${getInvoiceStatusLabel(invoice.status)}`,
            ].join('\n');
            window.alert(details);
        });
    });

    document.querySelectorAll('.dashboard-invoice-pdf').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', async () => {
            try {
                await generateDocumentPDF('invoice', btn.getAttribute('data-invoice-id') || '');
            } catch (error) {
                showAuthMessage(`❌ ${error?.message || 'تعذر تحميل PDF.'}`, 'error');
            }
        });
    });

    document.querySelectorAll('.dashboard-invoice-link').forEach((btn) => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', async () => {
            const link = buildSecureDocumentUrl('invoice', btn.getAttribute('data-invoice-id') || '');
            if (!link) return;
            try {
                await copyText(link);
                showAuthMessage('✅ تم نسخ الرابط الآمن.', 'success');
            } catch {
                showAuthMessage('❌ تعذر نسخ الرابط.', 'error');
            }
        });
    });
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
            const details = getServiceDetailContent(service);

            const editIdEl = document.getElementById('serviceEditId');
            const categoryEl = document.getElementById('serviceCategory');
            const titleEl = document.getElementById('serviceTitle');
            const priceEl = document.getElementById('servicePrice');
            const popularityEl = document.getElementById('servicePopularity');
            const descriptionEl = document.getElementById('serviceDescription');
            const imageUrlEl = document.getElementById('serviceImageUrl');
            const imageAltEl = document.getElementById('serviceImageAlt');
            const deliverablesEl = document.getElementById('serviceDeliverables');
            const requirementsEl = document.getElementById('serviceRequirements');
            const workflowEl = document.getElementById('serviceWorkflow');
            const turnaroundEl = document.getElementById('serviceTurnaround');
            const revisionsEl = document.getElementById('serviceRevisions');
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
            if (imageUrlEl) imageUrlEl.value = details.image || '';
            if (imageAltEl) imageAltEl.value = details.imageAlt || '';
            if (deliverablesEl) deliverablesEl.value = Array.isArray(details.deliverables) ? details.deliverables.join('\n') : '';
            if (requirementsEl) requirementsEl.value = Array.isArray(details.requirements) ? details.requirements.join('\n') : '';
            if (workflowEl) workflowEl.value = Array.isArray(details.workflow) ? details.workflow.join('\n') : '';
            if (turnaroundEl) turnaroundEl.value = details.turnaround || '';
            if (revisionsEl) revisionsEl.value = details.revisions || '';
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
                const imageUrl = document.getElementById('serviceImageUrl')?.value.trim() || '';
                const imageAlt = document.getElementById('serviceImageAlt')?.value.trim() || '';
                const deliverables = normalizeStringList(document.getElementById('serviceDeliverables')?.value || '');
                const requirements = normalizeStringList(document.getElementById('serviceRequirements')?.value || '');
                const workflow = normalizeStringList(document.getElementById('serviceWorkflow')?.value || '');
                const turnaround = document.getElementById('serviceTurnaround')?.value.trim() || '';
                const revisions = document.getElementById('serviceRevisions')?.value.trim() || '';
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
                            imageUrl,
                            imageAlt,
                            deliverables,
                            requirements,
                            workflow,
                            turnaround,
                            revisions,
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
                        imageUrl,
                        imageAlt,
                        deliverables,
                        requirements,
                        workflow,
                        turnaround,
                        revisions,
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
    ensureAdminQuoteInvoiceSections();
    renderAdminStats();
    renderAdminOrdersSection();
    renderAdminManualOrderServices();
    renderAdminQuotesSection();
    renderAdminInvoicesSection();
    renderDisputesSection();
    renderOffersAdminSection();
    renderServicesAdminSection();
    renderDiscountsSection();
    await renderInviteAuditLog();
    await renderAdminNewUsersSection();
    resetOfferForm();
    resetServiceForm();
    setupAdminInviteUser();
    bindAdminForms();
    bindAdminManualOrderControls();
    setupAdminI18nManager();
}

async function reopenPendingOrderIntentIfAvailable() {
    const pendingIntent = readPendingOrderIntent();
    if (!pendingIntent) return;

    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return;

    currentSessionUser = user;
    clearPendingOrderIntent();
    await openOrderModal(pendingIntent.serviceName || t('customServiceName'), {
        serviceId: pendingIntent.serviceId || '',
        finalPrice: pendingIntent.finalPrice || '',
        discountCode: pendingIntent.discountCode || '',
        lang: pendingIntent.lang || '',
    });
}

/* ---------------------------------------------------------------------------
   Auto-inject site navbar + mobile menu + back button on pages that lack one
   --------------------------------------------------------------------------- */
function injectSiteNavIfMissing() {
    // Skip dashboard/admin/login/auth-callback layouts — they have their own nav
    const isDashboard = Boolean(document.getElementById('view-dashboard') || document.getElementById('view-admin-dashboard'));
    const isAuthForm = Boolean(document.getElementById('authForm'));
    const isAuthCallback = Boolean(document.getElementById('view-auth-callback'));
    if (isDashboard || isAuthForm || isAuthCallback) return;

    // If nav already exists, just add the back button
    const existingNav = document.querySelector('.site-nav, header nav');
    if (existingNav) {
        injectBackButton(existingNav);
        return;
    }

    // Build the full navbar for pages that have none (e.g. service-*.html)
    const nav = document.createElement('nav');
    nav.className = 'navbar-glass site-nav';
    nav.setAttribute('aria-label', 'التنقل الرئيسي');

    nav.innerHTML = `
        <a href="index.html" class="logo-container">
            <span class="logo-p text-3xl">P</span>
            <span class="text-xl font-black tracking-tighter hidden sm:block uppercase font-en text-white">Pixel One</span>
        </a>
        <div class="site-nav-links hidden md:flex items-center gap-8">
            <a href="about.html" class="text-sm font-bold nav-link">من نحن</a>
            <a href="services.html" class="text-sm font-bold nav-link">خدماتنا</a>
            <a href="how-we-work.html" class="text-sm font-bold nav-link">كيف نعمل</a>
            <a href="privacy-policy.html" class="text-sm font-bold nav-link">الخصوصية</a>
        </div>
        <div class="site-nav-cta hidden md:flex gap-4 items-center">
            <a id="loginNavLink" data-role="client-auth-link" href="client-login.html" class="text-sm font-bold text-gray-300 hover:text-white transition">دخول العملاء</a>
            <button type="button" data-action="open-order-modal" data-service-name="طلب خدمة مخصص" class="btn-filled-red px-6 py-2 rounded-md text-sm font-bold">طلب خدمة</button>
        </div>
        <details class="mobile-nav-menu md:hidden">
            <summary class="mobile-nav-toggle" aria-label="فتح القائمة">
                <span></span><span></span><span></span>
            </summary>
            <div class="mobile-nav-panel">
                <a href="about.html" data-action="close-mobile-menu" class="mobile-nav-link">من نحن</a>
                <a href="services.html" data-action="close-mobile-menu" class="mobile-nav-link">خدماتنا</a>
                <a href="how-we-work.html" data-action="close-mobile-menu" class="mobile-nav-link">كيف نعمل</a>
                <a href="privacy-policy.html" data-action="close-mobile-menu" class="mobile-nav-link">الخصوصية</a>
                <a href="client-login.html" data-action="close-mobile-menu" class="mobile-nav-link mobile-nav-link-accent">دخول العملاء</a>
                <button type="button" data-action="mobile-open-order-modal" data-service-name="طلب خدمة مخصص" class="btn-filled-red mobile-nav-btn">طلب خدمة</button>
            </div>
        </details>
    `;

    document.body.insertBefore(nav, document.body.firstChild);
    injectBackButton(nav);
}

/* Close mobile menu when tapping outside it */
document.addEventListener('click', (e) => {
    const openMenu = document.querySelector('details[open].mobile-nav-menu, details[open].relative');
    if (!openMenu) return;
    if (!openMenu.contains(e.target)) {
        openMenu.removeAttribute('open');
    }
}, true);

function injectBackButton(navElement) {
    // Don't add if already present, or if this is the homepage
    if (navElement.querySelector('.nav-back-btn')) return;
    const path = window.location.pathname.replace(/\\/g, '/');
    const fileName = path.split('/').pop() || '';
    const isHome = !fileName || fileName === 'index.html';
    if (isHome) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-back-btn';
    btn.setAttribute('aria-label', 'رجوع');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
    btn.addEventListener('click', () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    });

    // Insert at the start of the nav, before the logo
    const logo = navElement.querySelector('.logo-container, a[href*="index"]');
    if (logo) {
        logo.parentNode.insertBefore(btn, logo);
    } else {
        navElement.prepend(btn);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    injectSiteNavIfMissing();
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

            await reopenPendingOrderIntentIfAvailable();
        }

        if (hasDashboardView) {
            setPageLoaderStatus('Checking account access and loading orders...');
            const user = await protectDashboardRoute();
            if (user) {
                await hydrateDataStores();
                renderDashboardOrders(user);
                renderDashboardQuotes(user);
                renderDashboardInvoices(user);
                await maybeOpenDocumentFromUrl(user);
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
                await maybeOpenDocumentFromUrl(user);
            }
            setupLogout();
        }
    } finally {
        await finalizePageLoader();
    }
});
