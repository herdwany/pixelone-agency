const cars = [
  {
    id: 1,
    name: "Dacia Sandero Stepway",
    brand: "Dacia",
    category: "اقتصادية",
    year: 2022,
    km: 46000,
    fuel: "بنزين",
    gearbox: "يدوي",
    price: 129000,
    monthly: 1790,
    warranty: "12 شهر",
    status: "جاهزة للتسليم",
    badge: "الأكثر طلبًا",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    name: "Renault Clio",
    brand: "Renault",
    category: "اقتصادية",
    year: 2021,
    km: 52000,
    fuel: "ديزل",
    gearbox: "أوتوماتيك",
    price: 154000,
    monthly: 2140,
    warranty: "9 أشهر",
    status: "متوفرة في المعرض",
    badge: "عائلية عملية",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    name: "Citroen C3",
    brand: "Citroen",
    category: "اقتصادية",
    year: 2021,
    km: 47000,
    fuel: "ديزل",
    gearbox: "يدوي",
    price: 149000,
    monthly: 2060,
    warranty: "6 أشهر",
    status: "معروضة الآن",
    badge: "استهلاك منخفض",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    name: "Suzuki Swift",
    brand: "Suzuki",
    category: "اقتصادية",
    year: 2021,
    km: 55000,
    fuel: "بنزين",
    gearbox: "يدوي",
    price: 141000,
    monthly: 1960,
    warranty: "6 أشهر",
    status: "عدد محدود",
    badge: "مناسبة للمدينة",
    image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    name: "Peugeot 208",
    brand: "Peugeot",
    category: "متوسطة",
    year: 2022,
    km: 38000,
    fuel: "بنزين",
    gearbox: "أوتوماتيك",
    price: 178000,
    monthly: 2480,
    warranty: "12 شهر",
    status: "متوفرة في الدار البيضاء",
    badge: "تجهيز جيد",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    name: "Kia Rio",
    brand: "Kia",
    category: "متوسطة",
    year: 2023,
    km: 29000,
    fuel: "بنزين",
    gearbox: "أوتوماتيك",
    price: 169000,
    monthly: 2340,
    warranty: "15 شهر",
    status: "جاهزة للتجربة",
    badge: "تجهيز أعلى",
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 7,
    name: "Hyundai i20",
    brand: "Hyundai",
    category: "متوسطة",
    year: 2022,
    km: 34000,
    fuel: "بنزين",
    gearbox: "يدوي",
    price: 162000,
    monthly: 2240,
    warranty: "12 شهر",
    status: "متوفرة",
    badge: "مصاريف معقولة",
    image: "https://images.unsplash.com/photo-1549925862-990f9f8c7c0f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 8,
    name: "Fiat Tipo",
    brand: "Fiat",
    category: "متوسطة",
    year: 2022,
    km: 36000,
    fuel: "ديزل",
    gearbox: "يدوي",
    price: 176000,
    monthly: 2450,
    warranty: "9 أشهر",
    status: "طلب مرتفع",
    badge: "واسعة للعائلة",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 9,
    name: "Toyota Yaris Hybrid",
    brand: "Toyota",
    category: "متوسطة",
    year: 2023,
    km: 22000,
    fuel: "هجين",
    gearbox: "أوتوماتيك",
    price: 198000,
    monthly: 2760,
    warranty: "18 شهر",
    status: "عرض جديد",
    badge: "هجين اقتصادي",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 10,
    name: "Skoda Octavia",
    brand: "Skoda",
    category: "أعلى",
    year: 2022,
    km: 31000,
    fuel: "ديزل",
    gearbox: "أوتوماتيك",
    price: 247000,
    monthly: 3440,
    warranty: "12 شهر",
    status: "عدد محدود",
    badge: "مريحة في السفر",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 11,
    name: "Volkswagen Golf 8",
    brand: "Volkswagen",
    category: "أعلى",
    year: 2021,
    km: 43000,
    fuel: "ديزل",
    gearbox: "أوتوماتيك",
    price: 255000,
    monthly: 3550,
    warranty: "12 شهر",
    status: "معاينة بالحجز",
    badge: "قيمة إعادة بيع قوية",
    image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 12,
    name: "Toyota Corolla",
    brand: "Toyota",
    category: "أعلى",
    year: 2022,
    km: 30000,
    fuel: "هجين",
    gearbox: "أوتوماتيك",
    price: 279000,
    monthly: 3880,
    warranty: "18 شهر",
    status: "طلب خاص",
    badge: "اعتمادية طويلة المدى",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 13,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    category: "أعلى",
    year: 2022,
    km: 26000,
    fuel: "ديزل",
    gearbox: "أوتوماتيك",
    price: 329000,
    monthly: 4560,
    warranty: "15 شهر",
    status: "نسخة كاملة",
    badge: "SUV عائلية",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 14,
    name: "Dacia Duster",
    brand: "Dacia",
    category: "متوسطة",
    year: 2021,
    km: 48000,
    fuel: "ديزل",
    gearbox: "يدوي",
    price: 188000,
    monthly: 2620,
    warranty: "9 أشهر",
    status: "متوفرة فورًا",
    badge: "SUV عملية",
    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=80"
  }
];

const elements = {
  results: document.getElementById("carResults"),
  resultsCount: document.getElementById("resultsCount"),
  search: document.getElementById("searchModel"),
  category: document.getElementById("filterCategory"),
  brand: document.getElementById("filterBrand"),
  fuel: document.getElementById("filterFuel"),
  maxPrice: document.getElementById("filterMaxPrice"),
  maxPriceValue: document.getElementById("maxPriceValue"),
  reset: document.getElementById("resetFilters"),
  menuToggle: document.getElementById("menuToggle"),
  mainNav: document.getElementById("mainNav")
};

const formatPrice = (value) => `${new Intl.NumberFormat("ar-MA").format(value)} د.م`;

function populateBrands() {
  const brands = [...new Set(cars.map((car) => car.brand))].sort((a, b) => a.localeCompare(b));
  const fragment = document.createDocumentFragment();

  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    fragment.appendChild(option);
  });

  elements.brand.appendChild(fragment);
}

function createCarCard(car, index) {
  const toneClass =
    car.category === "اقتصادية" ? "tone-economy" : car.category === "متوسطة" ? "tone-mid" : "tone-higher";

  const wideClass = index % 5 === 0 ? "is-wide" : "";

  return `
    <article class="car-card ${toneClass} ${wideClass}">
      <div class="car-photo-wrap">
        <img src="${car.image}" alt="${car.name}" loading="lazy">
        <span class="car-badge">${car.badge}</span>
      </div>
      <div class="car-body">
        <header class="car-title">
          <h3>${car.name}</h3>
          <strong class="car-price">${formatPrice(car.price)}</strong>
        </header>
        <div class="car-meta">
          <span>${car.year}</span>
          <span>${new Intl.NumberFormat("ar-MA").format(car.km)} كم</span>
          <span>${car.fuel}</span>
          <span>${car.gearbox}</span>
          <span>قسط: ${formatPrice(car.monthly)}</span>
          <span>ضمان: ${car.warranty}</span>
        </div>
        <p class="micro">${car.status}</p>
        <div class="car-actions">
          <a class="btn btn-primary" href="https://wa.me/212660224455?text=${encodeURIComponent(`السلام عليكم، مهتم بسيارة ${car.name} بسعر ${formatPrice(car.price)}`)}" target="_blank" rel="noopener">واتساب</a>
          <a class="btn btn-outline" href="#contact">احجز معاينة</a>
        </div>
      </div>
    </article>
  `;
}

function renderCars(list) {
  if (!list.length) {
    elements.results.innerHTML = `
      <div class="empty-state">
        <h3>ما لقيناش نتيجة مطابقة للفلاتر الحالية</h3>
        <p class="micro">بدّل الفئة أو ارفع الحد الأقصى للسعر، أو تواصل معنا مباشرة لنقترح عليك بدائل قريبة.</p>
        <a class="btn btn-primary" href="https://wa.me/212660224455" target="_blank" rel="noopener">تواصل مع مستشار عبر واتساب</a>
      </div>
    `;
    elements.resultsCount.textContent = "0 سيارة مطابقة";
    return;
  }

  elements.results.innerHTML = list.map((car, index) => createCarCard(car, index)).join("");
  elements.resultsCount.textContent = `${list.length} سيارة مطابقة متوفرة الآن`;
}

function applyFilters() {
  const query = elements.search.value.trim().toLowerCase();
  const selectedCategory = elements.category.value;
  const selectedBrand = elements.brand.value;
  const selectedFuel = elements.fuel.value;
  const maxPrice = Number(elements.maxPrice.value);

  const filtered = cars.filter((car) => {
    const matchesQuery = !query || `${car.name} ${car.brand}`.toLowerCase().includes(query);
    const matchesCategory = !selectedCategory || car.category === selectedCategory;
    const matchesBrand = !selectedBrand || car.brand === selectedBrand;
    const matchesFuel = !selectedFuel || car.fuel === selectedFuel;
    const matchesPrice = car.price <= maxPrice;

    return matchesQuery && matchesCategory && matchesBrand && matchesFuel && matchesPrice;
  });

  renderCars(filtered);
}

function resetFilters() {
  elements.search.value = "";
  elements.category.value = "";
  elements.brand.value = "";
  elements.fuel.value = "";
  elements.maxPrice.value = "330000";
  elements.maxPriceValue.textContent = formatPrice(330000);
  renderCars(cars);
}

function handlePriceInput() {
  elements.maxPriceValue.textContent = formatPrice(Number(elements.maxPrice.value));
  applyFilters();
}

function setupMenu() {
  if (!elements.menuToggle || !elements.mainNav) {
    return;
  }

  elements.menuToggle.addEventListener("click", () => {
    const isOpen = elements.mainNav.classList.toggle("open");
    elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  elements.mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      elements.mainNav.classList.remove("open");
      elements.menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function init() {
  populateBrands();
  renderCars(cars);
  elements.maxPriceValue.textContent = formatPrice(Number(elements.maxPrice.value));

  [elements.search, elements.category, elements.brand, elements.fuel].forEach((input) => {
    input.addEventListener("input", applyFilters);
    input.addEventListener("change", applyFilters);
  });

  elements.maxPrice.addEventListener("input", handlePriceInput);
  elements.reset.addEventListener("click", resetFilters);

  setupMenu();
  setupRevealAnimation();
}

init();
