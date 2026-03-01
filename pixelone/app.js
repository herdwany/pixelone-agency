// ==========================================================================
// PIXEL ONE VISUALS - MASTER JAVASCRIPT APP FILE
// يتضمن: تهيئة قاعدة البيانات، نظام التوجيه، تسجيل الدخول، ومعالجة الطلبات
// ==========================================================================

// 1. تهيئة قاعدة بيانات Supabase (لا تقم بتغيير هذه المفاتيح)
const SUPABASE_URL = 'https://grdjidvagrxavuwykqjf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_09I_ZPReuprW9qZRqlG0nA_vxCBY6WS';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const DEFAULT_SITE_SETTINGS = {
    brand: {
        name: 'Pixel One Visuals',
        supportEmail: 'support@pixelone.com',
    },
    orders: {
        storageKey: 'pixelone_orders_v1',
        defaultStatus: 'قيد المراجعة',
        showOnlyCurrentUser: true,
    },
    contact: {
        whatsappNumber: '212600000000',
        country: 'MA',
    },
};

let siteSettings = { ...DEFAULT_SITE_SETTINGS };
let currentSessionUser = null;

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

function getOrdersStorageKey() {
    return siteSettings.orders?.storageKey || DEFAULT_SITE_SETTINGS.orders.storageKey;
}

function getStoredOrders() {
    try {
        const raw = localStorage.getItem(getOrdersStorageKey());
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveStoredOrders(orders) {
    localStorage.setItem(getOrdersStorageKey(), JSON.stringify(orders));
}

function addOrderRecord(order) {
    const existing = getStoredOrders();
    existing.unshift(order);
    saveStoredOrders(existing);
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

const FALLBACK_SERVICES = [
    {
        titles: { ar: 'تصاميم سوشيال ميديا ثابتة' },
        price: '60',
        descriptions: { ar: 'بوستات إعلانية واحترافية (Instagram/Facebook/LinkedIn) متوافقة مع الهوية.' },
        category: 'سوشيال ميديا',
        is_coming_soon: false,
        popularity: 1,
    },
    {
        titles: { ar: 'تصاميم Story وCover' },
        price: '70',
        descriptions: { ar: 'تصميم ستوري وأغلفة احترافية للحملات والهوية على مختلف المنصات.' },
        category: 'سوشيال ميديا',
        is_coming_soon: false,
        popularity: 2,
    },
    {
        titles: { ar: 'تصميم شعار احترافي' },
        price: '150',
        descriptions: { ar: 'شعار واضح وقابل للاستخدام على كل المنصات مع نسخة شفافة وتسليم منظم.' },
        category: 'هوية بصرية',
        is_coming_soon: false,
        popularity: 3,
    },
    {
        titles: { ar: 'بنرات وإعلانات رقمية' },
        price: '80',
        descriptions: { ar: 'بنرات للمتاجر والمواقع والحملات الإعلانية بمقاسات جاهزة للنشر.' },
        category: 'إعلانات',
        is_coming_soon: false,
        popularity: 4,
    },
    {
        titles: { ar: 'فلاير / بروشور إعلاني' },
        price: '90',
        descriptions: { ar: 'تصميم مواد دعائية للطباعة أو النشر الرقمي بأسلوب تسويقي واضح.' },
        category: 'إعلانات',
        is_coming_soon: false,
        popularity: 5,
    },
    {
        titles: { ar: 'بطاقة أعمال احترافية' },
        price: '55',
        descriptions: { ar: 'بطاقة أعمال أنيقة ومتناسقة مع الهوية مع ملف جاهز للطباعة.' },
        category: 'هوية بصرية',
        is_coming_soon: false,
        popularity: 6,
    },
    {
        titles: { ar: 'هوية بصرية أساسية (Brand Kit)' },
        price: '350',
        descriptions: { ar: 'ألوان، خطوط، قوالب أساسية ودليل استخدام سريع لبناء حضور متناسق.' },
        category: 'هوية بصرية',
        is_coming_soon: false,
        popularity: 7,
    },
    {
        titles: { ar: 'تصاميم Carousel متعددة الشرائح' },
        price: '120',
        descriptions: { ar: 'تصميم سلسلة شرائح مترابطة لزيادة التفاعل وتوضيح الرسالة بشكل بصري.' },
        category: 'سوشيال ميديا',
        is_coming_soon: false,
        popularity: 8,
    },
    {
        titles: { ar: 'تصميم Thumbnail احترافي' },
        price: '50',
        descriptions: { ar: 'تصميم صور مصغرة لليوتيوب أو الحملات بمظهر جذاب يرفع معدل النقر.' },
        category: 'محتوى رقمي',
        is_coming_soon: false,
        popularity: 9,
    },
    {
        titles: { ar: 'تصميم عروض تقديمية (Pitch/Deck)' },
        price: '200',
        descriptions: { ar: 'ترتيب المحتوى بصرياً ضمن شرائح قوية ومقنعة للعرض التجاري أو الاستثماري.' },
        category: 'تصميم أعمال',
        is_coming_soon: false,
        popularity: 10,
    },
    {
        titles: { ar: 'تصميم قائمة مطعم / كافيه' },
        price: '110',
        descriptions: { ar: 'تصميم Menu واضح واحترافي للطباعة أو العرض الرقمي مع ترتيب بصري مريح.' },
        category: 'تصميم أعمال',
        is_coming_soon: false,
        popularity: 11,
    },
    {
        titles: { ar: 'تصميم تغليف/ليبل منتجات' },
        price: '180',
        descriptions: { ar: 'تصميم ليبل أو تغليف وفق أسس بصرية وتسويقية مع ملفات قابلة للطباعة.' },
        category: 'تغليف',
        is_coming_soon: false,
        popularity: 12,
    },
    {
        titles: { ar: 'فيديو قصير بسيط وسريع (Reels/TikTok)' },
        price: '120',
        descriptions: { ar: 'مونتاج خفيف وسريع بانتقالات بسيطة ونصوص واضحة، مناسب للمحتوى اليومي.' },
        category: 'فيديو قصير',
        is_coming_soon: false,
        popularity: 13,
    },
    {
        titles: { ar: 'فيديو دعائي احترافي متعدد المشاهد' },
        price: 'قريباً',
        descriptions: { ar: 'خدمة متقدمة تحتاج تجهيزات إنتاج أقوى، سيتم توفيرها قريباً بجودة أعلى.' },
        category: 'فيديو متقدم',
        is_coming_soon: true,
        popularity: 99,
    },
    {
        titles: { ar: 'موشن جرافيك مخصص مع مؤثرات معقدة' },
        price: 'قريباً',
        descriptions: { ar: 'هذا النوع من الفيديوهات قيد التحضير حالياً وسيُطلق عند توفر بيئة إنتاج كاملة.' },
        category: 'فيديو متقدم',
        is_coming_soon: true,
        popularity: 100,
    },
];

// Simple escaping to prevent rendering untrusted DB values as executable HTML.
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function setupHomeSessionUI() {
    const navLink = document.getElementById('loginNavLink');
    if (!navLink) return;

    const { data: { user } } = await _supabase.auth.getUser();
    currentSessionUser = user || null;

    if (currentSessionUser) {
        navLink.textContent = 'لوحة التحكم';
        navLink.href = 'dashboard.html';
        navLink.classList.remove('text-gray-300');
        navLink.classList.add('text-emerald-300');
    } else {
        navLink.textContent = 'دخول العملاء';
        navLink.href = 'login.html';
        navLink.classList.remove('text-emerald-300');
        navLink.classList.add('text-gray-300');
    }
}

// ==========================================================================
// وظائف الصفحة الرئيسية (index.html)
// ==========================================================================

function renderServices(grid, services) {
    grid.innerHTML = '';

    const availableServices = services
        .filter((service) => !service.is_coming_soon)
        .sort((a, b) => (a.popularity || 999) - (b.popularity || 999));

    const comingSoonServices = services
        .filter((service) => service.is_coming_soon)
        .sort((a, b) => (a.popularity || 999) - (b.popularity || 999));

    const orderedServices = [...availableServices, ...comingSoonServices];

    if (comingSoonServices.length > 0 && availableServices.length > 0) {
        grid.insertAdjacentHTML(
            'beforeend',
            `
            <div class="md:col-span-2 lg:col-span-3 py-3">
                <div class="flex items-center justify-between gap-4 border border-white/10 bg-black/40 rounded-xl px-4 py-3">
                    <span class="text-xs uppercase tracking-[0.15em] text-gray-300 font-bold">الخدمات الشائعة والمتاحة الآن</span>
                    <span class="text-xs text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded-full">جاهزة للطلب</span>
                </div>
            </div>
            `
        );
    }

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
        const isTopDemand = !isSoon && (service.popularity || 999) <= 5;
        const topDemandBadge = isTopDemand
            ? '<span class="text-[10px] px-2 py-1 rounded-full border border-red-500/40 bg-red-500/10 text-red-300">الاكثر طلبا</span>'
            : '';

        const cardHTML = `
            <div class="p-10 flex flex-col justify-between water-card animate-fade-up ${delayClass} ${isSoon ? 'coming-soon-card' : ''}">
                <div>
                    <div class="flex justify-between items-start mb-8 gap-4">
                        <div class="flex flex-col gap-2">
                            <span class="text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase">${safeCategory}</span>
                            <div class="flex gap-2 items-center flex-wrap">
                                <span class="text-[10px] px-2 py-1 rounded-full border w-fit ${statusClass}">${statusLabel}</span>
                                ${topDemandBadge}
                            </div>
                        </div>
                        <span class="text-2xl font-black number-font">${safePrice} <span class="text-xs font-normal text-gray-500 uppercase font-en">MAD</span></span>
                    </div>
                    <h3 class="text-2xl font-black mb-4">${safeName}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-10">${safeDesc}</p>
                </div>
                <button ${isSoon ? 'disabled' : ''} 
                    data-service-name="${safeServiceNameAttr}"
                    class="w-full py-4 rounded-lg font-black transition text-sm ${isSoon ? 'btn-disabled' : 'btn-filled-red'}">
                    ${isSoon ? 'قريباً جداً' : 'اطلب الخدمة الآن'}
                </button>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });

    if (comingSoonServices.length > 0 && availableServices.length > 0) {
        const marker = document.createElement('div');
        marker.className = 'md:col-span-2 lg:col-span-3 py-3';
        marker.innerHTML = `
            <div class="flex items-center justify-between gap-4 border border-amber-500/25 bg-amber-500/5 rounded-xl px-4 py-3">
                <span class="text-xs uppercase tracking-[0.15em] text-amber-200 font-bold">خدمات قيد التطوير - قريباً</span>
                <span class="text-xs text-amber-200 border border-amber-400/40 bg-amber-500/10 px-2 py-1 rounded-full">Soon</span>
            </div>
        `;

        const serviceCards = Array.from(grid.children);
        const firstComingSoonIndex = serviceCards.findIndex((el) => el.classList.contains('coming-soon-card'));

        if (firstComingSoonIndex > -1) {
            grid.insertBefore(marker, serviceCards[firstComingSoonIndex]);
        }
    }
}

// جلب الخدمات من قاعدة البيانات وعرضها في الشبكة
async function loadServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return; // الخروج إذا لم تكن في الصفحة الرئيسية

    try {
        // استدعاء البيانات مرتبة حسب المعرف
        const { data: services, error } = await _supabase
            .from('services')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;

        grid.innerHTML = ''; // تفريغ شبكة التحميل الوهمية

        const dbServices = Array.isArray(services) ? services : [];
        const mergedServices = [
            ...dbServices,
            ...FALLBACK_SERVICES.filter((fallbackItem) => {
                const fallbackName = fallbackItem.titles?.ar?.trim();
                if (!fallbackName) return false;

                return !dbServices.some((dbItem) => dbItem.titles?.ar?.trim() === fallbackName);
            }),
        ];

        renderServices(grid, mergedServices.length > 0 ? mergedServices : FALLBACK_SERVICES);
    } catch(e) {
        console.error("خطأ في جلب الخدمات من Supabase:", e);
        renderServices(grid, FALLBACK_SERVICES);
    }
}

// دالة فتح النافذة المنبثقة للطلب (الموجودة في الرئيسية)
window.openOrderModal = function(serviceName) {
    const modal = document.getElementById('orderModal');
    const selectedServiceText = document.getElementById('selectedServiceText');
    const hiddenServiceName = document.getElementById('hiddenServiceName');
    const orderForm = document.getElementById('orderForm');
    const orderMsgBox = document.getElementById('orderMsgBox');
    const firstInput = document.getElementById('orderName');

    if (!modal) return;
    if (!selectedServiceText || !hiddenServiceName || !orderForm || !orderMsgBox) return;
    
    // تعيين اسم الخدمة
    selectedServiceText.textContent = serviceName;
    hiddenServiceName.value = serviceName;
    
    // إعادة تعيين النموذج والرسائل
    orderForm.reset();
    orderMsgBox.classList.remove('active');

    const emailInput = document.getElementById('orderEmail');
    if (emailInput && currentSessionUser?.email) {
        emailInput.value = currentSessionUser.email;
    }
    
    // إظهار النافذة المنبثقة
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
};

// دالة إغلاق النافذة المنبثقة للطلب
window.closeOrderModal = function() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
};

// معالجة إرسال نموذج الطلب إلى الواتساب
async function handleOrderSubmit(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btnOrderSubmit');
    const msgBox = document.getElementById('orderMsgBox');
    const hiddenServiceName = document.getElementById('hiddenServiceName');
    const nameInput = document.getElementById('orderName');
    const phoneInput = document.getElementById('orderPhone');
    const emailInput = document.getElementById('orderEmail');
    const specsInput = document.getElementById('orderSpecs');

    if (!btn || !msgBox || !hiddenServiceName || !nameInput || !phoneInput || !emailInput || !specsInput) return;
    
    btn.disabled = true;
    btn.textContent = "جاري الإرسال وتجهيز الطلب...";

    // جمع بيانات النموذج
    const serviceName = hiddenServiceName.value;
    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const specs = specsInput.value;

    const myWhatsappNumber = siteSettings.contact?.whatsappNumber || DEFAULT_SITE_SETTINGS.contact.whatsappNumber;
    const supportEmail = siteSettings.brand?.supportEmail || DEFAULT_SITE_SETTINGS.brand.supportEmail;

    if (myWhatsappNumber === "212600000000") {
        msgBox.textContent = "❌ رقم الواتساب غير مضبوط بعد. حدّث contact.whatsappNumber داخل site-settings.json أولاً.";
        msgBox.className = "msg-box msg-error active";
        btn.disabled = false;
        btn.textContent = "تأكيد وإرسال الطلب";
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
        userId: currentSessionUser?.id || null,
        userEmail: currentSessionUser?.email || effectiveEmail || null,
    });

    // صياغة الرسالة لتكون منسقة في الواتساب
    const message = `*طلب خدمة جديد - Pixel One* 🔴\n\n` +
                    `*رقم الطلب:* ${orderId}\n` +
                    `*تاريخ الطلب:* ${formatArabicDateTime(orderDateIso)}\n` +
                    `*الخدمة المطلوبة:* ${serviceName}\n` +
                    `*اسم العميل:* ${name}\n` +
                    `*رقم الهاتف:* ${phone}\n` +
                    `*البريد الإلكتروني:* ${effectiveEmail || '-'}\n\n` +
                    `*مواصفات وتفاصيل الطلب:*\n${specs}\n\n` +
                    `--- مرسل من موقع Pixel One ---`;

    // تشفير الرسالة لتحويلها إلى رابط صالح
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${myWhatsappNumber}?text=${encodedMessage}`;

    // فتح تطبيق الواتساب في نافذة جديدة
    window.open(whatsappUrl, '_blank');

    // إظهار رسالة التأكيد للمستخدم
    msgBox.textContent = "✅ تم تأكيد الطلب بنجاح! سيتم تحويلك للواتساب، وسنتواصل معك قريباً.";
    msgBox.className = "msg-box msg-success active";
    
    // إعادة الزر لحالته الطبيعية
    btn.textContent = "تم الإرسال";
    
    // إغلاق النافذة تلقائياً بعد ثوانٍ قليلة
    setTimeout(() => {
        closeOrderModal();
        btn.disabled = false;
        btn.textContent = "تأكيد وإرسال الطلب";
    }, 4000);
}

// ==========================================================================
// وظائف صفحة المصادقة (login.html)
// ==========================================================================
async function setupAuthentication() {
    const form = document.getElementById('authForm');
    const toggleBtn = document.getElementById('toggleBtn');
    let isLogin = true;

    const { data: { user } } = await _supabase.auth.getUser();
    if (user) {
        window.location.replace('dashboard.html');
        return;
    }

    // تبديل الواجهة بين تسجيل الدخول وإنشاء حساب
    if(toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isLogin = !isLogin;
            
            // تغيير النصوص بناءً على الحالة
            document.getElementById('formTitle').textContent = isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد";
            document.getElementById('formSubTitle').textContent = isLogin ? "إدارة مشاريعك وطلباتك بكل سهولة" : "ابدأ رحلتك الإبداعية معنا الآن";
            document.getElementById('btnSubmit').textContent = isLogin ? "دخول المنصة" : "تسجيل حساب جديد";
            document.getElementById('toggleText').textContent = isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟";
            toggleBtn.textContent = isLogin ? "إنشاء حساب جديد" : "تسجيل الدخول";
            
            // إخفاء رسائل الخطأ السابقة
            document.getElementById('msgBox').classList.remove('active');
        });
    }

    // معالجة إرسال نموذج المصادقة
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btnSubmit');
            const msgBox = document.getElementById('msgBox');
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            btn.disabled = true; 
            btn.textContent = "جاري المعالجة...";

            try {
                if (isLogin) {
                    // عملية تسجيل الدخول
                    const { error } = await _supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    
                    msgBox.textContent = "✅ تم الدخول بنجاح! جاري تحويلك للوحة التحكم...";
                    msgBox.className = "msg-box msg-success active";
                    
                    // التحويل لصفحة لوحة التحكم
                    setTimeout(() => window.location.href = "dashboard.html", 1500);
                } else {
                    // عملية التسجيل
                    const { error } = await _supabase.auth.signUp({ email, password });
                    if (error) throw error;
                    
                    msgBox.textContent = "✅ تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.";
                    msgBox.className = "msg-box msg-success active";
                    
                    // تحويل المستخدم لشاشة تسجيل الدخول بعد التسجيل
                    setTimeout(() => {
                        toggleBtn.click();
                        document.getElementById('password').value = '';
                    }, 2500);
                }
            } catch (err) {
                // معالجة الأخطاء (مثل كلمة مرور خاطئة أو بريد موجود)
                let errorMsg = err.message;
                if(err.message.includes('Invalid login')) errorMsg = "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
                if(err.message.includes('User already registered')) errorMsg = "هذا البريد الإلكتروني مسجل مسبقاً.";
                
                msgBox.textContent = "❌ " + errorMsg;
                msgBox.className = "msg-box msg-error active";
            } finally {
                btn.disabled = false;
                btn.textContent = isLogin ? "دخول المنصة" : "تسجيل حساب جديد";
            }
        });
    }
}

// ==========================================================================
// وظائف لوحة التحكم (dashboard.html)
// ==========================================================================
async function protectDashboardRoute() {
    // التحقق من وجود مستخدم مسجل الدخول
    const { data: { user }, error } = await _supabase.auth.getUser();
    
    if (error || !user) {
        // المستخدم غير مصرح له، تحويل لصفحة الدخول
        console.warn("غير مصرح بالدخول، جاري التحويل...");
        window.location.replace("login.html");
        return null;
    } else {
        // المستخدم مصرح له، عرض بياناته
        const emailSpan = document.getElementById('userEmail');
        if(emailSpan) {
            const username = typeof user.email === 'string' ? user.email.split('@')[0] : 'user';
            emailSpan.textContent = username; // عرض الاسم قبل علامة @
        }
        
        // إظهار محتوى الصفحة (كانت مخفية بـ CSS للحماية)
        document.body.style.display = "block";
        return user;
    }
}

// معالجة تسجيل الخروج
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const btn = logoutBtn;
            btn.textContent = "جاري الخروج...";
            btn.disabled = true;
            
            await _supabase.auth.signOut();
            window.location.replace("index.html");
        });
    }
}

function renderDashboardOrders(user) {
    const tableBody = document.getElementById('ordersTableBody');
    const supportEmailLink = document.getElementById('supportEmailLink');
    const statActiveProjects = document.getElementById('statActiveProjects');
    const statPendingOrders = document.getElementById('statPendingOrders');
    const statTotalOrders = document.getElementById('statTotalOrders');
    const statCustomers = document.getElementById('statCustomers');

    if (!tableBody) return;

    const supportEmail = siteSettings.brand?.supportEmail || DEFAULT_SITE_SETTINGS.brand.supportEmail;
    if (supportEmailLink) {
        supportEmailLink.href = `mailto:${supportEmail}`;
    }

    const allOrders = getStoredOrders();
    const showOnlyCurrentUser = Boolean(siteSettings.orders?.showOnlyCurrentUser);
    const filteredOrders = showOnlyCurrentUser
        ? allOrders.filter((order) => order.userEmail === user?.email)
        : allOrders;

    const pendingOrders = filteredOrders.filter((order) => (order.status || '').includes('قيد')).length;
    const uniqueCustomers = new Set(filteredOrders.map((order) => order.email || order.userEmail).filter(Boolean));

    if (statActiveProjects) statActiveProjects.textContent = String(filteredOrders.length);
    if (statPendingOrders) statPendingOrders.textContent = String(pendingOrders);
    if (statTotalOrders) statTotalOrders.textContent = String(filteredOrders.length);
    if (statCustomers) statCustomers.textContent = String(uniqueCustomers.size || 1);

    if (filteredOrders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center text-gray-500">لا توجد طلبات حالياً.</td></tr>';
        return;
    }

    tableBody.innerHTML = '';

    filteredOrders.forEach((order) => {
        const supportMailto = `mailto:${supportEmail}?subject=${encodeURIComponent(`استفسار حول الطلب ${order.id || ''}`)}`;
        const safeService = escapeHtml(order.serviceName || 'طلب غير محدد');
        const safeDate = escapeHtml(formatArabicDateTime(order.createdAt || new Date().toISOString()));
        const safeSpecs = escapeHtml(order.specs || '-');
        const safeStatus = escapeHtml(order.status || 'قيد المراجعة');
        const safeEmail = escapeHtml(order.email || order.userEmail || '-');

        tableBody.insertAdjacentHTML(
            'beforeend',
            `
            <tr>
                <td class="px-4 py-3 font-bold text-white">${safeService}</td>
                <td class="px-4 py-3 text-gray-300 number-font">${safeDate}</td>
                <td class="px-4 py-3 text-gray-300 max-w-[360px]">
                    <div class="max-h-16 overflow-y-auto break-words">${safeSpecs}</div>
                </td>
                <td class="px-4 py-3">
                    <span class="text-xs px-2 py-1 rounded-full border border-amber-400/40 bg-amber-500/10 text-amber-200">${safeStatus}</span>
                </td>
                <td class="px-4 py-3">
                    <div class="flex flex-col gap-1">
                        <span class="text-xs text-gray-400 font-en">${safeEmail}</span>
                        <a href="${supportMailto}" class="text-xs text-brand-red hover:text-red-300">مراسلة الدعم</a>
                    </div>
                </td>
            </tr>
            `
        );
    });
}

// ==========================================================================
// مشغل النظام الذكي (Router)
// يقوم بتشغيل الأكواد بناءً على عناصر الصفحة المتوفرة
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadSiteSettings();
    
    // 1. نحن في الصفحة الرئيسية (يوجد servicesGrid)
    if (document.getElementById('servicesGrid')) {
        await setupHomeSessionUI();
        loadServices();

        const servicesGrid = document.getElementById('servicesGrid');
        if (servicesGrid) {
            servicesGrid.addEventListener('click', (e) => {
                const btn = e.target.closest('button[data-service-name]');
                if (!btn || btn.disabled) return;
                openOrderModal(btn.dataset.serviceName || 'خدمة غير مسماة');
            });
        }
        
        // ربط نموذج الطلب
        const orderForm = document.getElementById('orderForm');
        if(orderForm) orderForm.addEventListener('submit', handleOrderSubmit);
        
        // إغلاق المودال عند النقر في الخلفية
        const modalOverlay = document.getElementById('orderModal');
        if(modalOverlay) {
            modalOverlay.addEventListener('click', function(e) {
                if(e.target === this) closeOrderModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
                closeOrderModal();
            }
        });
    }
    
    // 2. نحن في صفحة الدخول (يوجد authForm)
    if (document.getElementById('authForm')) {
        await setupAuthentication();
    }

    // 3. نحن في لوحة التحكم (الصفحة تحتوي على id="view-dashboard")
    if (document.getElementById('view-dashboard')) {
        const user = await protectDashboardRoute();
        if (user) {
            renderDashboardOrders(user);
        }
        setupLogout();
    }
});