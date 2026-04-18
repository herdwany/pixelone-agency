const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const dishCards = document.querySelectorAll(".dish-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");

    const activeFilter = button.dataset.filter;

    dishCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const shouldShow = activeFilter === "all" || categories.includes(activeFilter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const dateInput = document.getElementById("booking-date");
if (dateInput) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${year}-${month}-${day}`;
}

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
    const guestCount = data.get("guests");
    const selectedDate = data.get("date");

    formFeedback.textContent = `تم استلام طلب حجزكم بنجاح لـ ${guestCount} أشخاص بتاريخ ${selectedDate}. سنؤكد التفاصيل خلال دقائق.`;
    formFeedback.classList.remove("error");
    formFeedback.classList.add("success");

    bookingForm.reset();
    if (dateInput) {
      dateInput.min = dateInput.min;
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}
