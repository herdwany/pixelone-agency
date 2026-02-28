// ⚠️ استبدل هذه القيم بمفاتيح مشروعك من Supabase
const SUPABASE_URL = 'https://grdjidvagrxavuwykqjf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_09I_ZPReuprW9qZRqlG0nA_vxCBY6WS';

// تهيئة الاتصال
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// المتغيرات وعناصر الصفحة
const form = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const btnSubmit = document.getElementById('btnSubmit');
const msgBox = document.getElementById('msgBox');
const toggleBtn = document.getElementById('toggleBtn');
const toggleText = document.getElementById('toggleText');

let isLogin = true; // وضع تسجيل الدخول افتراضياً

// دالة التبديل بين الدخول وإنشاء حساب
toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin; // عكس الحالة
    
    if (isLogin) {
        btnSubmit.textContent = "تسجيل الدخول";
        btnSubmit.classList.replace('bg-green-600', 'bg-blue-600');
        btnSubmit.classList.replace('hover:bg-green-700', 'hover:bg-blue-700');
        toggleText.textContent = "ليس لديك حساب؟";
        toggleBtn.textContent = "إنشاء حساب";
    } else {
        btnSubmit.textContent = "إنشاء حساب جديد";
        btnSubmit.classList.replace('bg-blue-600', 'bg-green-600');
        btnSubmit.classList.replace('hover:bg-blue-700', 'hover:bg-green-700');
        toggleText.textContent = "لديك حساب بالفعل؟";
        toggleBtn.textContent = "تسجيل الدخول";
    }
    msgBox.classList.add('hidden'); // إخفاء الرسائل القديمة
});

// دالة عرض الرسائل
function showMsg(text, type) {
    msgBox.textContent = text;
    msgBox.className = `mb-4 p-3 rounded text-sm text-center ${type === 'error' ? 'bg-red-900/50 text-red-200 border border-red-800' : 'bg-green-900/50 text-green-200 border border-green-800'}`;
    msgBox.classList.remove('hidden');
}

// التعامل مع الضغط على الزر
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passInput.value;
    
    btnSubmit.disabled = true;
    btnSubmit.textContent = "جاري المعالجة...";

    try {
        if (isLogin) {
            // كود تسجيل الدخول
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            showMsg("تم الدخول بنجاح! جاري التحويل...", "success");
            // window.location.href = "dashboard.html"; // سنفعل هذا لاحقاً
        } else {
            // كود إنشاء حساب
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            showMsg("تم إنشاء الحساب! تحقق من بريدك الإلكتروني.", "success");
        }
    } catch (err) {
        showMsg(err.message, "error");
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد";
    }
});