const menuToggleButton = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector(".main-nav");

if (menuToggleButton && mainMenu) {
    menuToggleButton.addEventListener("click", () => {
        const isExpanded = menuToggleButton.getAttribute("aria-expanded") === "true";
        menuToggleButton.setAttribute("aria-expanded", String(!isExpanded));
        mainMenu.classList.toggle("is-open");
    });

    mainMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 920) {
                mainMenu.classList.remove("is-open");
                menuToggleButton.setAttribute("aria-expanded", "false");
            }
        });
    });
}

const currentYearElement = document.querySelector("#current-year");
if (currentYearElement) {
    currentYearElement.textContent = String(new Date().getFullYear());
}

const dateInput = document.querySelector("#date");
if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
}

const bookingForm = document.querySelector("#booking-form");
const feedbackElement = document.querySelector("#form-feedback");
const countryInput = document.querySelector("#country");
const phoneCodeInput = document.querySelector("#phone-code");
const phoneInput = document.querySelector("#phone");

const countryCodeMap = {
    "المغرب": "+212",
    "maroc": "+212",
    "morocco": "+212",
    "الجزائر": "+213",
    "algeria": "+213",
    "tunisia": "+216",
    "تونس": "+216",
    "france": "+33",
    "فرنسا": "+33",
    "spain": "+34",
    "إسبانيا": "+34",
    "espagne": "+34",
    "belgium": "+32",
    "بلجيكا": "+32",
    "canada": "+1",
    "كندا": "+1"
};

const whatsappDestination = "212661234567";

const normalizeCountry = (value) => value.trim().toLowerCase().replace(/\s+/g, " ");

const updateCountryCode = () => {
    if (!countryInput || !phoneCodeInput) {
        return;
    }

    const normalizedCountry = normalizeCountry(countryInput.value);
    phoneCodeInput.value = countryCodeMap[normalizedCountry] || "+212";
};

if (countryInput && phoneCodeInput) {
    countryInput.addEventListener("input", updateCountryCode);
    countryInput.addEventListener("change", updateCountryCode);
    updateCountryCode();
}

if (phoneInput) {
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    });
}

const formatRequestedDate = (rawDate) => {
    if (!rawDate) {
        return "غير محدد";
    }

    const parsed = new Date(`${rawDate}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
        return rawDate;
    }

    return new Intl.DateTimeFormat("ar-MA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(parsed);
};

const buildFullPhone = (code, localNumber) => {
    const cleanCode = code.replace(/\D/g, "");
    const cleanLocal = localNumber.replace(/\D/g, "").replace(/^0+/, "");
    return `${cleanCode}${cleanLocal}`;
};

if (bookingForm && feedbackElement) {
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        updateCountryCode();

        if (!bookingForm.checkValidity()) {
            feedbackElement.textContent = "يرجى تعبئة الحقول المطلوبة بشكل صحيح قبل الإرسال.";
            feedbackElement.style.color = "#9f2f2f";
            return;
        }

        const formData = new FormData(bookingForm);
        const fullName = String(formData.get("name") || "").trim();
        const country = String(formData.get("country") || "المغرب").trim();
        const service = String(formData.get("service") || "").trim();
        const rawDate = String(formData.get("date") || "").trim();
        const notes = String(formData.get("notes") || "").trim();
        const localPhone = phoneInput ? phoneInput.value : "";
        const countryCode = phoneCodeInput ? phoneCodeInput.value : "+212";
        const internationalPhone = buildFullPhone(countryCode, localPhone);

        const messageLines = [
            "طلب موعد جديد من موقع العيادة",
            `الاسم: ${fullName}`,
            `الدولة: ${country}`,
            `رقم الهاتف: ${countryCode} ${localPhone}`,
            `الرقم الدولي: +${internationalPhone}`,
            `نوع الخدمة: ${service}`,
            `التاريخ المطلوب: ${formatRequestedDate(rawDate)}`,
            `ملاحظات: ${notes || "لا توجد"}`
        ];

        const whatsappMessage = encodeURIComponent(messageLines.join("\n"));
        const whatsappUrl = `https://wa.me/${whatsappDestination}?text=${whatsappMessage}`;

        feedbackElement.textContent = "تم تجهيز طلبك. سيتم تحويلك إلى واتساب لإرسال التفاصيل.";
        feedbackElement.style.color = "#0e4f73";
        window.open(whatsappUrl, "_blank", "noopener");
        bookingForm.reset();

        if (countryInput) {
            countryInput.value = "المغرب";
        }
        updateCountryCode();
    });
}
