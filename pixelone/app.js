// ==========================================================================
// PIXEL ONE VISUALS - MASTER JAVASCRIPT APP FILE
// ==========================================================================

const SUPABASE_URL = 'https://grdjidvagrxavuwykqjf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_09I_ZPReuprW9qZRqlG0nA_vxCBY6WS';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const DEFAULT_SITE_SETTINGS = {
    brand: {
        name: 'Pixel One Visuals',
        supportEmail: 'support@pixelonevisuals.tech',
    },
    orders: {
        storageKey: 'pixelone_orders_v1',
        defaultStatus: 'تم استلام الطلب',
        showOnlyCurrentUser: true,
        adminEmails: [
            'superadmin@pixelonevisuals.tech',
        ],
        adminDomains: [
            'pixelonevisuals.tech',
        ],
    },
    contact: {
        whatsappNumber: '212600000000',
        country: 'MA',
        email: 'contact@pixelonevisuals.tech',
    },
};

const ORDER_STATUS_OPTIONS = [
    'تم استلام الطلب',
    'مقبول',
    'يحتاج تعديلات',
    'قيد التنفيذ',
    'مكتمل',
];

const ORDER_STORAGE_FALLBACK_KEY = 'pixelone_orders_v1';
const OFFERS_STORAGE_KEY = 'pixelone_offers_v1';
const DISPUTES_STORAGE_KEY = 'pixelone_disputes_v1';
const DISCOUNTS_STORAGE_KEY = 'pixelone_discounts_v1';
const SERVICES_STORAGE_KEY = 'pixelone_services_v1';

const TABLES = {
    services: 'pixel_services',
    offers: 'pixel_offers',
    orders: 'pixel_orders',
    disputes: 'pixel_disputes',
    discountsGlobal: 'pixel_discounts_global',
    discountsCustomer: 'pixel_discounts_customer',
    adminUsers: 'pixel_admin_users',
    inviteAudit: 'pixel_invite_audit',
};

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

const DEFAULT_OFFERS = [
    {
        id: 'offer-welcome-10',
        title: 'عرض ترحيبي للعملاء الجدد',
        description: 'خصم خاص على أول طلب تصميم ضمن نطاق الخدمات المتاحة حالياً.',
        badge: 'WELCOME10',
        target: 'all',
        targetEmail: '',
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const DEFAULT_MANAGED_SERVICES = [
    {
        id: 'svc-social-fixed',
        titles: { ar: 'تصاميم سوشيال ميديا ثابتة' },
        price: '60',
        descriptions: { ar: 'بوستات إعلانية واحترافية (Instagram/Facebook/LinkedIn) متوافقة مع الهوية.' },
        category: 'سوشيال ميديا',
        is_coming_soon: false,
        popularity: 1,
        enabled: true,
    },
    {
        id: 'svc-logo',
        titles: { ar: 'تصميم شعار احترافي' },
        price: '150',
        descriptions: { ar: 'شعار واضح وقابل للاستخدام على كل المنصات مع نسخة شفافة وتسليم منظم.' },
        category: 'هوية بصرية',
        is_coming_soon: false,
        popularity: 2,
        enabled: true,
    },
    {
        id: 'svc-banners',
        titles: { ar: 'بنرات وإعلانات رقمية' },
        price: '80',
        descriptions: { ar: 'بنرات للمتاجر والمواقع والحملات الإعلانية بمقاسات جاهزة للنشر.' },
        category: 'إعلانات',
        is_coming_soon: false,
        popularity: 3,
        enabled: true,
    },
    {
        id: 'svc-pitch',
        titles: { ar: 'تصميم عروض تقديمية (Pitch/Deck)' },
        price: '200',
        descriptions: { ar: 'ترتيب المحتوى بصرياً ضمن شرائح قوية ومقنعة للعرض التجاري أو الاستثماري.' },
        category: 'تصميم أعمال',
        is_coming_soon: false,
        popularity: 4,
        enabled: true,
    },
    {
        id: 'svc-reels',
        titles: { ar: 'فيديو قصير بسيط وسريع (Reels/TikTok)' },
        price: '120',
        descriptions: { ar: 'مونتاج خفيف وسريع بانتقالات بسيطة ونصوص واضحة، مناسب للمحتوى اليومي.' },
        category: 'فيديو قصير',
        is_coming_soon: false,
        popularity: 5,
        enabled: true,
    },
    {
        id: 'svc-design-pro',
        titles: { ar: 'خدمات التصميم الاحترافي' },
        price: '500',
        descriptions: { ar: 'تصاميم احترافية تشمل الهوية البصرية، الشعارات، والمنشورات.' },
        category: 'design',
        is_coming_soon: false,
        popularity: 6,
        enabled: true,
    },
    {
        id: 'svc-video-short',
        titles: { ar: 'فيديوهات قصيرة (أقل من دقيقة)' },
        price: '300',
        descriptions: { ar: 'مونتاج احترافي للفيديوهات القصيرة (Reels, TikTok) بجودة عالية.' },
        category: 'video',
        is_coming_soon: false,
        popularity: 7,
        enabled: true,
    },
    {
        id: 'svc-video-advanced',
        titles: { ar: 'فيديو دعائي احترافي متعدد المشاهد' },
        price: 'قريباً',
        descriptions: { ar: 'خدمة متقدمة تحتاج تجهيزات إنتاج أقوى، سيتم توفيرها قريباً بجودة أعلى.' },
        category: 'فيديو متقدم',
        is_coming_soon: true,
        popularity: 8,
        enabled: true,
    },
    {
        id: 'svc-web-landing',
        titles: { ar: 'تصميم المواقع وصفحات الهبوط' },
        price: '1500',
        descriptions: { ar: 'قريباً: تصميم وبرمجة صفحات هبوط احترافية تزيد من مبيعاتك.' },
        category: 'web',
        is_coming_soon: true,
        popularity: 9,
        enabled: true,
    },
];

let siteSettings = { ...DEFAULT_SITE_SETTINGS };
let currentSessionUser = null;
let dataSourceMode = 'fallback';
let pageLoaderController = null;

function getLoaderContext() {
    if (document.getElementById('view-admin-dashboard')) {
        return { key: 'admin-dashboard', status: 'Preparing admin data and access rules...' };
    }
    if (document.getElementById('view-dashboard')) {
        return { key: 'dashboard', status: 'Loading your projects and timeline...' };
    }
    if (document.getElementById('view-auth-callback')) {
        return { key: 'auth-callback', status: 'Validating secure sign-in link...' };
    }
    if (document.getElementById('authForm')) {
        return { key: 'auth', status: 'Connecting to secure authentication service...' };
    }
    if (document.getElementById('servicesGrid')) {
        return { key: 'home', status: 'Building services and personalized offers...' };
    }
    return null;
}

function createPageLoader(initialStatus) {
    if (!document.body || document.getElementById('pixelLoader')) return null;

    const isBodyHidden = window.getComputedStyle(document.body).display === 'none';
    if (isBodyHidden) {
        document.body.dataset.loaderDisplayFix = 'true';
        document.body.style.display = 'block';
    }

    const overlay = document.createElement('div');
    overlay.id = 'pixelLoader';
    overlay.className = 'pixel-loader-overlay';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('aria-label', 'Loading page content');
    overlay.innerHTML = `
        <div class="pixel-loader-stage">
            <div class="pixel-loader-logo-wrap" aria-hidden="true">
                <img class="pixel-loader-logo" src="icone/favicon.svg" alt="Pixel One Logo" width="168" height="168" loading="eager" decoding="async">
                <span class="pixel-loader-shimmer"></span>
            </div>
            <p class="pixel-loader-status" id="pixelLoaderStatus">${escapeHtml(initialStatus || 'Preparing your page...')}</p>
        </div>
    `;

    document.body.classList.add('app-loading-active');
    document.body.appendChild(overlay);

    const startedAt = Date.now();
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const effectiveType = String(connection?.effectiveType || '').toLowerCase();

    // Keep a short minimum to show the brush-writing identity, then exit based on real load time.
    let minDurationMs = 820;
    if (connection?.saveData) {
        minDurationMs = 520;
    } else if (effectiveType.includes('slow-2g') || effectiveType.includes('2g')) {
        minDurationMs = 1250;
    } else if (effectiveType.includes('3g')) {
        minDurationMs = 980;
    } else if (effectiveType.includes('4g')) {
        minDurationMs = 700;
    }

    return {
        setStatus(text) {
            const statusNode = document.getElementById('pixelLoaderStatus');
            if (statusNode && text) {
                statusNode.textContent = text;
            }
        },
        async complete() {
            const waitMs = Math.max(0, minDurationMs - (Date.now() - startedAt));
            if (waitMs > 0) {
                await new Promise((resolve) => setTimeout(resolve, waitMs));
            }

            overlay.classList.add('is-exit');
            await new Promise((resolve) => setTimeout(resolve, 560));

            overlay.remove();
            document.body.classList.remove('app-loading-active');

            if (document.body.dataset.loaderDisplayFix === 'true') {
                delete document.body.dataset.loaderDisplayFix;
            }
        },
    };
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
    await pageLoaderController.complete();
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

function readLocalJson(key, fallbackValue) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return cloneData(fallbackValue);
        const parsed = JSON.parse(raw);
        return parsed ?? cloneData(fallbackValue);
    } catch {
        return cloneData(fallbackValue);
    }
}

function writeLocalJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
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

function formatArabicDateTime(isoString) {
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

function formatDateInput(isoString) {
    if (!isoString) return '';
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return '';
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
}

function getStatusMeta(status) {
    if (status === 'مقبول') return { className: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200' };
    if (status === 'يحتاج تعديلات') return { className: 'border-orange-400/40 bg-orange-500/10 text-orange-200' };
    if (status === 'قيد التنفيذ') return { className: 'border-blue-400/40 bg-blue-500/10 text-blue-200' };
    if (status === 'مكتمل') return { className: 'border-violet-400/40 bg-violet-500/10 text-violet-200' };
    return { className: 'border-amber-400/40 bg-amber-500/10 text-amber-200' };
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
    localStorage.setItem(key, String(until));
}

function getAuthCooldownRemaining(action, email = '') {
    const key = getAuthCooldownKey(action, email);
    const raw = localStorage.getItem(key);
    if (!raw) return 0;
    const until = Number.parseInt(raw, 10);
    if (!Number.isFinite(until)) {
        localStorage.removeItem(key);
        return 0;
    }
    const remainingMs = until - Date.now();
    if (remainingMs <= 0) {
        localStorage.removeItem(key);
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
    return buildAppUrl('login.html');
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
    const parsed = readLocalJson(SERVICES_STORAGE_KEY, DEFAULT_MANAGED_SERVICES);
    const list = Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MANAGED_SERVICES;
    return list.map((service, index) => normalizeManagedService(service, index));
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
    runtimeStore.orders = getLocalOrders();
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

    runtimeStore.offers = offersResult.status === 'fulfilled' && offersResult.value.length > 0
        ? offersResult.value.map(offerFromRow)
        : getLocalOffers();

    runtimeStore.orders = ordersResult.status === 'fulfilled' && ordersResult.value.length > 0
        ? ordersResult.value.map(orderFromRow)
        : getLocalOrders();

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

    const adminDomains = Array.isArray(siteSettings.orders?.adminDomains)
        ? siteSettings.orders.adminDomains.map((d) => String(d || '').trim().toLowerCase())
        : [];

    if (adminEmails.includes(email)) return true;

    const domain = email.split('@')[1] || '';
    if (domain && adminDomains.includes(domain)) return true;

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
    titles: { ar: service.titles.ar },
    price: service.price,
    descriptions: { ar: service.descriptions.ar },
    category: service.category,
    is_coming_soon: service.is_coming_soon,
    popularity: service.popularity || index + 1,
}));

async function setupHomeSessionUI() {
    const navLink = document.getElementById('loginNavLink');
    if (!navLink) return;

    const { data: { user } } = await _supabase.auth.getUser();
    currentSessionUser = user || null;

    if (currentSessionUser) {
        navLink.textContent = 'لوحة التحكم';
        navLink.href = isAdminUser(currentSessionUser) ? 'admin-dashboard.html' : 'dashboard.html';
        navLink.classList.remove('text-gray-300');
        navLink.classList.add('text-emerald-300');
    } else {
        navLink.textContent = 'دخول العملاء';
        navLink.href = 'client-login.html';
        navLink.classList.remove('text-emerald-300');
        navLink.classList.add('text-gray-300');
    }
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
        container.innerHTML = '<div class="water-card rounded-2xl p-6 text-center text-gray-500">لا توجد عروض نشطة حالياً.</div>';
        return;
    }

    visibleOffers.forEach((offer) => {
        const safeTitle = escapeHtml(offer.title || 'عرض خاص');
        const safeDescription = escapeHtml(offer.description || '');
        const safeBadge = escapeHtml(offer.badge || 'SPECIAL');
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

    orderedServices.forEach((service, index) => {
        const isSoon = service.is_coming_soon;
        const delayClass = `delay-${(index % 3 + 1) * 100}`;
        const serviceName = service.titles?.ar || 'خدمة غير مسماة';
        const servicePrice = service.price || '0';
        const serviceDesc = service.descriptions?.ar || 'وصف الخدمة غير متوفر حالياً.';
        const category = service.category || 'خدمة بصرية';

        const safeCategory = escapeHtml(category);
        const safePrice = escapeHtml(servicePrice);
        const safeName = escapeHtml(serviceName);
        const safeDesc = escapeHtml(serviceDesc);
        const safeServiceNameAttr = escapeHtml(serviceName);
        const statusLabel = isSoon ? 'قريباً' : 'متاح الآن';
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
            ? `<span class="text-[10px] px-2 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-200">خصم ${bestRule.type === 'percent' ? `${escapeHtml(String(bestRule.value))}%` : `${escapeHtml(String(bestRule.value))} MAD`}</span>`
            : '';

        const cardHTML = `
            <div class="p-10 flex flex-col justify-between water-card animate-fade-up ${delayClass} ${isSoon ? 'coming-soon-card' : ''}">
                <div>
                    <div class="flex justify-between items-start mb-8 gap-4">
                        <div class="flex flex-col gap-2">
                            <span class="text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase">${safeCategory}</span>
                            <div class="flex gap-2 items-center flex-wrap">
                                <span class="text-[10px] px-2 py-1 rounded-full border w-fit ${statusClass}">${statusLabel}</span>
                                ${discountBadgeHtml}
                            </div>
                        </div>
                        ${priceHtml}
                    </div>
                    <h3 class="text-2xl font-black mb-4">${safeName}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-10">${safeDesc}</p>
                </div>
                <button ${isSoon ? 'disabled' : ''}
                    data-service-name="${safeServiceNameAttr}"
                    data-final-price="${hasDiscount ? escapeHtml(String(discountResult.finalPrice.toFixed(2))) : safePrice}"
                    data-discount-code="${hasDiscount ? escapeHtml(bestRule.code || '') : ''}"
                    class="w-full py-4 rounded-lg font-black transition text-sm ${isSoon ? 'btn-disabled' : 'btn-filled-red'}">
                    ${isSoon ? 'قريباً جداً' : 'اطلب الخدمة الآن'}
                </button>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
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

    selectedServiceText.textContent = serviceName;
    hiddenServiceName.value = serviceName;

    const hiddenPrice = document.getElementById('hiddenFinalPrice');
    const hiddenDiscountCode = document.getElementById('hiddenDiscountCode');
    if (hiddenPrice) hiddenPrice.value = meta.finalPrice || '';
    if (hiddenDiscountCode) hiddenDiscountCode.value = meta.discountCode || '';

    const emailInput = document.getElementById('orderEmail');
    if (emailInput && currentSessionUser?.email) {
        emailInput.value = currentSessionUser.email;
    }

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

    btn.disabled = true;
    btn.textContent = 'جاري الإرسال وتجهيز الطلب...';

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
        msgBox.textContent = '❌ رقم الواتساب غير مضبوط بعد. حدّث contact.whatsappNumber داخل site-settings.json أولاً.';
        msgBox.className = 'msg-box msg-error active';
        btn.disabled = false;
        btn.textContent = 'تأكيد وإرسال الطلب';
        return;
    }

    const { data: { user } } = await _supabase.auth.getUser();
    currentSessionUser = user || currentSessionUser;
    const effectiveEmail = email || currentSessionUser?.email || '';

    const orderId = `PO-${Date.now()}`;
    const orderDateIso = new Date().toISOString();

    addOrderRecord({
        id: orderId,
        serviceName,
        name,
        phone,
        email: effectiveEmail,
        specs,
        status: siteSettings.orders?.defaultStatus || DEFAULT_SITE_SETTINGS.orders.defaultStatus,
        supportEmail,
        createdAt: orderDateIso,
        lastUpdateAt: orderDateIso,
        userId: currentSessionUser?.id || null,
        userEmail: currentSessionUser?.email || effectiveEmail || null,
        finalPrice,
        discountCode,
    });

    const discountLine = discountCode ? `*كود الخصم:* ${discountCode}\n` : '';
    const priceLine = finalPrice ? `*السعر بعد الخصم:* ${finalPrice} MAD\n` : '';

    const message = `*طلب خدمة جديد - Pixel One* 🔴\n\n`
        + `*رقم الطلب:* ${orderId}\n`
        + `*تاريخ الطلب:* ${formatArabicDateTime(orderDateIso)}\n`
        + `*الخدمة المطلوبة:* ${serviceName}\n`
        + `${priceLine}`
        + `${discountLine}`
        + `*اسم العميل:* ${name}\n`
        + `*رقم الهاتف:* ${phone}\n`
        + `*البريد الإلكتروني:* ${effectiveEmail || '-'}\n\n`
        + `*مواصفات وتفاصيل الطلب:*\n${specs}\n\n`
        + `--- مرسل من موقع Pixel One ---`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${myWhatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    msgBox.textContent = '✅ تم تأكيد الطلب بنجاح! سيتم تحويلك للواتساب، وسنتواصل معك قريباً.';
    msgBox.className = 'msg-box msg-success active';
    btn.textContent = 'تم الإرسال';

    setTimeout(() => {
        closeOrderModal();
        btn.disabled = false;
        btn.textContent = 'تأكيد وإرسال الطلب الآن';
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
                window.location.replace('login.html');
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
        window.location.replace('login.html');
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
        window.location.replace('login.html');
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
            window.location.replace('index.html');
        });
    }
}

function renderDashboardOrders(user) {
    const tableBody = document.getElementById('ordersTableBody');
    const mobileList = document.getElementById('ordersMobileList');
    const supportEmailLink = document.getElementById('supportEmailLink');
    const statActiveProjects = document.getElementById('statActiveProjects');
    const statPendingOrders = document.getElementById('statPendingOrders');
    const statTotalOrders = document.getElementById('statTotalOrders');
    const statCustomers = document.getElementById('statCustomers');
    const dashboardRoleHint = document.getElementById('dashboardRoleHint');

    if (!tableBody) return;

    const supportEmail = siteSettings.brand?.supportEmail || DEFAULT_SITE_SETTINGS.brand.supportEmail;
    wireEmailLink(supportEmailLink, supportEmail, 'استفسار عام - خدمة العملاء');

    const allOrders = getStoredOrders();
    const filteredOrders = allOrders.filter((order) => normalizeEmail(order.userEmail) === normalizeEmail(user?.email));

    if (dashboardRoleHint) {
        dashboardRoleHint.textContent = 'وضع العميل: يمكنك متابعة حالة الطلبات الخاصة بك.';
    }

    const pendingOrders = filteredOrders.filter((order) => (order.status || '').includes('قيد')).length;
    const uniqueCustomers = new Set(filteredOrders.map((order) => order.email || order.userEmail).filter(Boolean));

    if (statActiveProjects) statActiveProjects.textContent = String(filteredOrders.length);
    if (statPendingOrders) statPendingOrders.textContent = String(pendingOrders);
    if (statTotalOrders) statTotalOrders.textContent = String(filteredOrders.length);
    if (statCustomers) statCustomers.textContent = String(uniqueCustomers.size || 1);

    if (filteredOrders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات حالياً.</td></tr>';
        if (mobileList) {
            mobileList.innerHTML = '<article class="border border-white/10 rounded-xl p-4 bg-black/30 text-gray-400 text-sm text-center">لا توجد طلبات حالياً.</article>';
        }
        return;
    }

    tableBody.innerHTML = '';
    if (mobileList) mobileList.innerHTML = '';

    filteredOrders.forEach((order) => {
        const supportSubject = `استفسار حول الطلب ${order.id || ''}`;
        const safeService = escapeHtml(order.serviceName || 'طلب غير محدد');
        const safeDate = escapeHtml(formatArabicDateTime(order.createdAt || new Date().toISOString()));
        const safeSpecs = escapeHtml(order.specs || '-');
        const currentStatus = order.status || DEFAULT_SITE_SETTINGS.orders.defaultStatus;
        const safeStatus = escapeHtml(currentStatus);
        const safeEmail = escapeHtml(order.email || order.userEmail || '-');
        const safeLastUpdate = escapeHtml(formatArabicDateTime(order.lastUpdateAt || order.createdAt || new Date().toISOString()));
        const statusMeta = getStatusMeta(currentStatus);

        tableBody.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="px-4 py-3 font-bold text-white">${safeService}</td>
                <td class="px-4 py-3 text-gray-300 number-font">${safeDate}</td>
                <td class="px-4 py-3 text-gray-300 max-w-[360px]"><div class="max-h-16 overflow-y-auto break-words">${safeSpecs}</div></td>
                <td class="px-4 py-3">
                    <div class="flex flex-col gap-2">
                        <span class="text-xs px-2 py-1 rounded-full border ${statusMeta.className} w-fit">${safeStatus}</span>
                        <span class="text-[11px] text-gray-500">آخر تحديث: ${safeLastUpdate}</span>
                    </div>
                </td>
                <td class="px-4 py-3">
                    <div class="flex flex-col gap-1">
                        <span class="text-xs text-gray-400 font-en">${safeEmail}</span>
                        <a href="#" class="order-support-link text-xs text-brand-red hover:text-red-300" data-email="${escapeHtml(supportEmail)}" data-subject="${escapeHtml(supportSubject)}">مراسلة الدعم</a>
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
                    <p class="text-xs text-gray-400 mb-2">تاريخ الطلب: <span class="font-en">${safeDate}</span></p>
                    <p class="text-xs text-gray-300 leading-relaxed mb-3 break-words">${safeSpecs}</p>
                    <a href="#" class="order-support-link text-xs text-brand-red hover:text-red-300" data-email="${escapeHtml(supportEmail)}" data-subject="${escapeHtml(supportSubject)}">مراسلة الدعم (${safeEmail})</a>
                    <p class="text-[11px] text-gray-500 mt-2">آخر تحديث: ${safeLastUpdate}</p>
                </article>
            `);
        }
    });

    const supportLinks = document.querySelectorAll('.order-support-link');
    supportLinks.forEach((link) => {
        const email = link.getAttribute('data-email');
        const subject = link.getAttribute('data-subject') || '';
        wireEmailLink(link, email, subject);
    });
}

function setupDashboardSecurity(user) {
    const changeEmailForm = document.getElementById('changeEmailForm');
    const changePasswordForm = document.getElementById('changePasswordForm');
    const btnSendReauthLink = document.getElementById('btnSendReauthLink');
    const btnSignOutAll = document.getElementById('btnSignOutAll');

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

    if (btnSendReauthLink && !btnSendReauthLink.dataset.bound) {
        btnSendReauthLink.dataset.bound = 'true';
        btnSendReauthLink.addEventListener('click', async () => {
            const { error } = await _supabase.auth.reauthenticate();
            if (error) {
                showAuthMessage(`❌ ${error.message}`, 'error');
                return;
            }
            showAuthMessage('✅ تم إرسال رابط إعادة التحقق إلى بريدك.', 'success');
        });
    }

    if (btnSignOutAll && !btnSignOutAll.dataset.bound) {
        btnSignOutAll.dataset.bound = 'true';
        btnSignOutAll.addEventListener('click', async () => {
            const { error } = await _supabase.auth.signOut({ scope: 'global' });
            if (error) {
                showAuthMessage(`❌ ${error.message}`, 'error');
                return;
            }
            showAuthMessage('✅ تم تسجيل الخروج من كل الأجهزة.', 'success');
            setTimeout(() => window.location.replace('login.html'), 900);
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
    if (!body) return;

    const orders = getStoredOrders();
    if (orders.length === 0) {
        body.innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات حالياً.</td></tr>';
        return;
    }

    body.innerHTML = '';
    orders.forEach((order) => {
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
                <td class="px-4 py-3">
                    <select class="order-status-select input-luxury !py-2 !px-3 !text-xs" data-order-id="${escapeHtml(order.id || '')}">
                        ${statusOptions}
                    </select>
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

function bindAdminForms() {
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
                alert('أدخل البريد الإلكتروني للعميل المستهدف.');
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
                    alert('يرجى تعبئة جميع حقول الخدمة بشكل صحيح.');
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
}

document.addEventListener('DOMContentLoaded', async () => {
    ensurePageLoader();

    try {
        setPageLoaderStatus('Loading brand settings...');
        await loadSiteSettings();

        const hasServicesGrid = Boolean(document.getElementById('servicesGrid'));
        const hasAuthForm = Boolean(document.getElementById('authForm'));
        const hasAuthCallbackView = Boolean(document.getElementById('view-auth-callback'));
        const hasDashboardView = Boolean(document.getElementById('view-dashboard'));
        const hasAdminDashboardView = Boolean(document.getElementById('view-admin-dashboard'));

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

        if (hasServicesGrid) {
            setPageLoaderStatus('Rendering services and dynamic pricing...');
            await setupHomeSessionUI();
            await hydrateDataStores();
            await loadServices();
            renderOffersForHome();

            const servicesGrid = document.getElementById('servicesGrid');
            if (servicesGrid) {
                servicesGrid.addEventListener('click', (e) => {
                    const btn = e.target.closest('button[data-service-name]');
                    if (!btn || btn.disabled) return;

                    openOrderModal(btn.dataset.serviceName || 'خدمة غير مسماة', {
                        finalPrice: btn.dataset.finalPrice || '',
                        discountCode: btn.dataset.discountCode || '',
                    });
                });
            }

            const orderForm = document.getElementById('orderForm');
            if (orderForm) orderForm.addEventListener('submit', handleOrderSubmit);

            const modalOverlay = document.getElementById('orderModal');
            if (modalOverlay) {
                modalOverlay.addEventListener('click', function(e) {
                    if (e.target === this) closeOrderModal();
                });
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
                    closeOrderModal();
                }
            });
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
