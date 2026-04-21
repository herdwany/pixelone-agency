const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navBackdrop = document.querySelector(".nav-backdrop");
const navWrap = document.querySelector(".nav-wrap");
const siteHeader = document.querySelector(".site-header");
const floatingCta = document.querySelector(".floating-cta");
const desktopNav = window.matchMedia("(min-width: 930px)");

if (siteHeader) {
  // Add a compact elevated header style after the first scroll segment.
  const toggleHeaderScrolled = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  toggleHeaderScrolled();
  window.addEventListener("scroll", toggleHeaderScrolled, { passive: true });
}

if (floatingCta) {
  // Keep the floating CTA out of the way near the top hero; show it once user scrolls.
  const toggleFloatingCta = () => {
    const shouldShow = !desktopNav.matches && window.scrollY > 360;
    floatingCta.classList.toggle("is-visible", shouldShow);
  };

  toggleFloatingCta();
  window.addEventListener("scroll", toggleFloatingCta, { passive: true });

  if (typeof desktopNav.addEventListener === "function") {
    desktopNav.addEventListener("change", toggleFloatingCta);
  } else {
    desktopNav.addListener(toggleFloatingCta);
  }
}

if (menuToggle && mainNav) {
  const navLinks = mainNav.querySelectorAll("a");

  // Centralized state keeps menu, aria attributes, backdrop, and body lock in sync.
  const setMenuState = (requestedOpen) => {
    const shouldOpen = requestedOpen && !desktopNav.matches;

    mainNav.classList.toggle("is-open", shouldOpen);
    menuToggle.classList.toggle("is-open", shouldOpen);
    menuToggle.setAttribute("aria-expanded", String(shouldOpen));
    menuToggle.setAttribute("aria-label", shouldOpen ? "إغلاق القائمة" : "فتح القائمة");
    document.body.classList.toggle("menu-open", shouldOpen);

    if (navBackdrop) {
      navBackdrop.hidden = !shouldOpen;
      navBackdrop.classList.toggle("is-visible", shouldOpen);
    }
  };

  menuToggle.addEventListener("click", () => {
    const currentlyOpen = mainNav.classList.contains("is-open");
    setMenuState(!currentlyOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  if (navBackdrop) {
    navBackdrop.addEventListener("click", () => setMenuState(false));
  }

  // Outside click close remains as a fallback if backdrop is unavailable.
  document.addEventListener("click", (event) => {
    if (desktopNav.matches || !mainNav.classList.contains("is-open")) {
      return;
    }

    const clickedInsideNav = navWrap && navWrap.contains(event.target);
    if (!clickedInsideNav) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  const handleDesktopChange = () => setMenuState(false);
  if (typeof desktopNav.addEventListener === "function") {
    desktopNav.addEventListener("change", handleDesktopChange);
  } else {
    desktopNav.addListener(handleDesktopChange);
  }
}

const filterButtons = document.querySelectorAll(".filter-btn");
const dishCards = document.querySelectorAll(".dish-card");

filterButtons.forEach((button) => {
  button.setAttribute("aria-selected", button.classList.contains("is-active") ? "true" : "false");

  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");

    const activeFilter = button.dataset.filter;

    dishCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const shouldShow = activeFilter === "all" || categories.includes(activeFilter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const dateInput = document.getElementById("booking-date");

const setMinBookingDate = () => {
  if (!dateInput) {
    return;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${year}-${month}-${day}`;
};

setMinBookingDate();

const bookingForm = document.getElementById("booking-form");
const formFeedback = document.getElementById("form-feedback");

if (bookingForm && formFeedback) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      formFeedback.textContent = "يرجى تعبئة الحقول المطلوبة قبل إرسال الطلب.";
      formFeedback.classList.remove("success");
      formFeedback.classList.add("error");
      bookingForm.reportValidity();
      return;
    }

    const data = new FormData(bookingForm);
    const name = String(data.get("name") || "").trim();
    const people = String(data.get("people") || data.get("guests") || "").trim();
    const time = String(data.get("time") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const date = String(data.get("date") || "").trim();
    const notes = String(data.get("notes") || "").trim();

    // Required WhatsApp payload fields as requested: name, time, and people.
    if (!name || !time || !people) {
      formFeedback.textContent = "يرجى إدخال الاسم، الوقت، وعدد الأشخاص.";
      formFeedback.classList.remove("success");
      formFeedback.classList.add("error");
      bookingForm.reportValidity();
      return;
    }

    const whatsappNumber = bookingForm.dataset.whatsappNumber || "212661223344";

    const messageLines = [
      "مرحباً مطعم سدرة، أود حجز طاولة:",
      `• الاسم: ${name}`,
      `• الوقت: ${time}`,
      `• عدد الأشخاص: ${people}`,
    ];

    if (date) {
      messageLines.push(`• التاريخ: ${date}`);
    }

    if (phone) {
      messageLines.push(`• الهاتف: ${phone}`);
    }

    if (notes) {
      messageLines.push(`• ملاحظات: ${notes}`);
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      messageLines.join("\n")
    )}`;

    // Try opening a new tab first, then fallback to direct navigation on strict mobile browsers.
    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = whatsappUrl;
    }

    formFeedback.textContent = "تم تجهيز رسالة الحجز على واتساب.";
    formFeedback.classList.remove("error");
    formFeedback.classList.add("success");

    bookingForm.reset();
    setMinBookingDate();
  });
}

const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        requestAnimationFrame(() => {
          entry.target.classList.add("show");
        });

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element, index) => {
    const delay = Math.min((index % 6) * 45, 225);
    element.style.setProperty("--reveal-delay", `${delay}ms`);
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}
