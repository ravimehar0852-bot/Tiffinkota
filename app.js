/* ===========================
   TIFFINKOTA — app.js
=========================== */

/* ──────────────────────────
   DATA
────────────────────────── */
const providers = [
  {
    id: 1,
    name: "Sharma Ji Ki Rasoi",
    emoji: "🍛",
    bg: "linear-gradient(135deg,#FFF3E8,#FFE0C0)",
    rating: 4.9,
    reviews: 312,
    deliveryTime: "30 min",
    price: 1199,
    area: "Talwandi",
    tag: "veg",
    category: "veg",
    menu: ["Dal Baati", "Sabzi", "Roti", "Rice", "Pickle"],
    badge: "Veg",
    badgeType: "veg",
    featured: true,
  },
  {
    id: 2,
    name: "Gupta Tiffin Center",
    emoji: "🥘",
    bg: "linear-gradient(135deg,#E8F5E9,#C8E6C9)",
    rating: 4.7,
    reviews: 198,
    deliveryTime: "25 min",
    price: 999,
    area: "Vigyan Nagar",
    tag: "budget",
    category: "veg",
    menu: ["Paneer Sabzi", "Dal", "Roti", "Salad"],
    badge: "Veg",
    badgeType: "veg",
    featured: false,
  },
  {
    id: 3,
    name: "Rajasthani Zaika",
    emoji: "🍱",
    bg: "linear-gradient(135deg,#FFF8E1,#FFE082)",
    rating: 4.8,
    reviews: 421,
    deliveryTime: "35 min",
    price: 1499,
    area: "Mahaveer Nagar",
    tag: "premium",
    category: "veg",
    menu: ["Dal Bati Churma", "Gatte Sabzi", "Baati", "Lassi"],
    badge: "Veg",
    badgeType: "veg",
    featured: true,
  },
  {
    id: 4,
    name: "Khan's Kitchen",
    emoji: "🍗",
    bg: "linear-gradient(135deg,#FCE4EC,#F8BBD9)",
    rating: 4.6,
    reviews: 267,
    deliveryTime: "40 min",
    price: 1599,
    area: "Dadabari",
    tag: "nonveg",
    category: "nonveg",
    menu: ["Chicken Curry", "Mutton Rogan", "Roti", "Raita"],
    badge: "Non-Veg",
    badgeType: "nonveg",
    featured: false,
  },
  {
    id: 5,
    name: "Amma's Home Kitchen",
    emoji: "🥗",
    bg: "linear-gradient(135deg,#E3F2FD,#BBDEFB)",
    rating: 4.9,
    reviews: 548,
    deliveryTime: "20 min",
    price: 849,
    area: "Rangbari",
    tag: "budget",
    category: "veg",
    menu: ["Mix Veg", "Dal Tadka", "Phulka", "Khichdi"],
    badge: "Veg",
    badgeType: "veg",
    featured: true,
  },
  {
    id: 6,
    name: "Shri Krishna Bhojanala",
    emoji: "🫕",
    bg: "linear-gradient(135deg,#F3E5F5,#E1BEE7)",
    rating: 4.5,
    reviews: 183,
    deliveryTime: "30 min",
    price: 1099,
    area: "Kota City",
    tag: "veg",
    category: "veg",
    menu: ["Thali Meal", "Kadhi", "Rice", "Roti", "Sweet"],
    badge: "Veg",
    badgeType: "veg",
    featured: false,
  },
];

const testimonials = [
  {
    stars: 5,
    text: "TiffinKota has been a lifesaver! Being a JEE aspirant far from home, getting hot ghar ka khana every day is a blessing. Sharma Ji's tiffin is absolutely fantastic!",
    name: "Arjun Meena",
    role: "JEE Aspirant, Talwandi",
    initial: "A",
  },
  {
    stars: 5,
    text: "As a working woman, I don't have time to cook. TiffinKota delivers fresh, hygienic food daily. The full-day plan is incredible value. Highly recommend!",
    name: "Priya Sharma",
    role: "Bank Employee, Vigyan Nagar",
    initial: "P",
  },
  {
    stars: 5,
    text: "I registered my kitchen on TiffinKota last month and already have 47 subscribers! The platform is so easy to use and the support team is wonderful.",
    name: "Sunita Devi",
    role: "Tiffin Provider, Mahaveer Nagar",
    initial: "S",
  },
  {
    stars: 4,
    text: "Good quality food, decent prices. The live tracking feature is brilliant – I always know exactly when my tiffin will arrive. Payment via UPI is seamless.",
    name: "Rohit Verma",
    role: "Medical Student, Rangbari",
    initial: "R",
  },
  {
    stars: 5,
    text: "My son moved to Kota for coaching and I was so worried about his meals. TiffinKota has given me peace of mind. Fresh food, regular delivery – perfect!",
    name: "Kavita Singh",
    role: "Parent from Jaipur",
    initial: "K",
  },
  {
    stars: 5,
    text: "The Rajasthani Zaika tiffin is just like home food! Dal Bati Churma every Sunday is the highlight of my week. Amazing platform, amazing food.",
    name: "Deepak Gupta",
    role: "NEET Student, Dadabari",
    initial: "D",
  },
];

const faqs = [
  {
    q: "How does TiffinKota work?",
    a: "Browse verified tiffin providers near you in Kota, choose a plan (breakfast, lunch, dinner or all-day), pay securely, and receive fresh homemade meals daily at your doorstep. It's that simple!",
  },
  {
    q: "Can I pause or cancel my subscription?",
    a: "Yes! You can pause deliveries for vacation days or cancel your subscription anytime with a 3-day notice. No lock-in contracts, no hidden fees.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major payment methods including UPI (PhonePe, GPay, Paytm), debit/credit cards via Razorpay, and Cash on Delivery for eligible areas in Kota.",
  },
  {
    q: "How do I track my tiffin delivery?",
    a: "Once your tiffin is dispatched, you'll receive a real-time tracking link via SMS and app notification. You can watch the delivery live on the map.",
  },
  {
    q: "Are the tiffin providers verified?",
    a: "Absolutely! Every kitchen listed on TiffinKota goes through a strict verification process including FSSAI license check, hygiene inspection, and quality testing before they can list on our platform.",
  },
  {
    q: "What if I'm not happy with my tiffin?",
    a: "Your satisfaction is our priority. You can rate your meal, chat directly with the provider, or raise a complaint with our support team. We offer refunds or replacements for genuine quality issues.",
  },
];

/* ──────────────────────────
   NAV — Scroll Effect
────────────────────────── */
const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

/* ──────────────────────────
   NAV — Mobile Burger
────────────────────────── */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ──────────────────────────
   RENDER PROVIDERS
────────────────────────── */
let activeFilter = "all";
let favorites = new Set();

function renderProviders(data) {
  const grid = document.getElementById("providersGrid");
  grid.innerHTML = data.map(p => `
    <div class="provider-card reveal" data-id="${p.id}" onclick="openProviderDetail(${p.id})">
      <div class="card__img-bg" style="background:${p.bg}">
        <span>${p.emoji}</span>
        <div class="card__img-overlay">
          <span class="card__badge card__badge--${p.badgeType}">${p.badge}</span>
          ${p.featured ? '<span class="card__badge" style="color:#FF6B2C">⭐ Featured</span>' : ''}
        </div>
        <button class="card__fav ${favorites.has(p.id) ? 'active' : ''}"
          onclick="toggleFav(event,${p.id})">
          ${favorites.has(p.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card__body">
        <div class="card__header">
          <div class="card__name">${p.name}</div>
          <div class="card__rating">⭐ ${p.rating} <span style="color:#9C8070;font-weight:400">(${p.reviews})</span></div>
        </div>
        <div class="card__meta">
          <div class="card__meta-item">📍 ${p.area}</div>
          <div class="card__meta-item">🚴 ${p.deliveryTime}</div>
        </div>
        <div class="card__menu">
          <div class="card__menu-label">Today's Menu</div>
          <div class="card__menu-items">
            ${p.menu.slice(0, 4).map(m => `<span class="menu-tag">${m}</span>`).join("")}
          </div>
        </div>
        <div class="card__footer">
          <div class="card__price">₹${p.price.toLocaleString()}<span>/month</span></div>
          <button class="btn btn--primary" style="padding:9px 18px;font-size:.83rem"
            onclick="bookNow(event,${p.id})">Book Now</button>
        </div>
      </div>
    </div>
  `).join("");
  initReveal();
}

function filterProviders(filter) {
  activeFilter = filter;
  if (filter === "all") return renderProviders(providers);
  if (filter === "veg") return renderProviders(providers.filter(p => p.category === "veg"));
  if (filter === "nonveg") return renderProviders(providers.filter(p => p.category === "nonveg"));
  if (filter === "budget") return renderProviders(providers.filter(p => p.price <= 1099));
  if (filter === "premium") return renderProviders(providers.filter(p => p.price >= 1400));
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    this.classList.add("active");
    filterProviders(this.dataset.filter);
  });
});

function toggleFav(e, id) {
  e.stopPropagation();
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast("Removed from favourites");
  } else {
    favorites.add(id);
    showToast("❤️ Added to favourites!");
  }
  filterProviders(activeFilter);
}

function bookNow(e, id) {
  e.stopPropagation();
  const p = providers.find(x => x.id === id);
  showToast(`🎉 Booking ${p.name}...`);
  setTimeout(() => openModal("signupModal"), 800);
}

function openProviderDetail(id) {
  const p = providers.find(x => x.id === id);
  showToast(`Viewing ${p.name} — ₹${p.price}/mo`);
}

function loadMore() {
  showToast("All providers are shown – more coming soon!");
}

/* ──────────────────────────
   RENDER TESTIMONIALS
────────────────────────── */
function renderTestimonials() {
  document.getElementById("testimonialsGrid").innerHTML = testimonials.map(t => `
    <div class="testimonial-card reveal">
      <div class="t-stars">${"★".repeat(t.stars)}${"☆".repeat(5 - t.stars)}</div>
      <p class="t-text">"${t.text}"</p>
      <div class="t-author">
        <div class="t-avatar">${t.initial}</div>
        <div>
          <div class="t-name">${t.name}</div>
          <div class="t-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join("");
  initReveal();
}

/* ──────────────────────────
   RENDER FAQ
────────────────────────── */
function renderFAQ() {
  document.getElementById("faqList").innerHTML = faqs.map((f, i) => `
    <div class="faq-item reveal">
      <button class="faq-question" onclick="toggleFAQ(${i})">
        <span>${f.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">${f.a}</div>
    </div>
  `).join("");
  initReveal();
}

function toggleFAQ(index) {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item, i) => {
    if (i === index) {
      item.classList.toggle("open");
    } else {
      item.classList.remove("open");
    }
  });
}

/* ──────────────────────────
   MODALS
────────────────────────── */
function openModal(id) {
  document.getElementById(id).classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  document.getElementById(id).classList.remove("active");
  document.body.style.overflow = "";
}
function switchModal(closeId, openId) {
  closeModal(closeId);
  setTimeout(() => openModal(openId), 200);
}

// Close on overlay click
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.active").forEach(m => {
      m.classList.remove("active");
    });
    document.body.style.overflow = "";
  }
});

/* ──────────────────────────
   MODAL TABS (Login type)
────────────────────────── */
function switchLoginType(type, btn) {
  document.querySelectorAll(".modal-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  showToast(type === "customer" ? "Customer login selected" : "Owner login selected");
}

/* ──────────────────────────
   FORM HANDLERS
────────────────────────── */
function handleLogin(e) {
  e.preventDefault();
  closeModal("loginModal");
  showToast("✅ Login successful! Welcome back.");
}

function handleSignup(e) {
  e.preventDefault();
  closeModal("signupModal");
  showToast("🎉 Account created! Welcome to TiffinKota.");
}

function handleOwnerSignup(e) {
  e.preventDefault();
  closeModal("ownerModal");
  showToast("🍱 Kitchen registered! Our team will verify within 24hrs.");
}

/* ──────────────────────────
   SEARCH
────────────────────────── */
function triggerSearch() {
  const loc = document.getElementById("locationInput").value.trim();
  const meal = document.getElementById("mealType").value;
  const veg = document.getElementById("vegFilter").value;
  if (!loc) {
    showToast("⚠️ Please enter your area in Kota");
    document.getElementById("locationInput").focus();
    return;
  }
  showToast(`🔍 Searching tiffins near "${loc}"...`);
  setTimeout(() => {
    document.getElementById("providers").scrollIntoView({ behavior: "smooth" });
  }, 600);
}

/* ──────────────────────────
   TOAST
────────────────────────── */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* ──────────────────────────
   SCROLL REVEAL
────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ──────────────────────────
   SMOOTH ACTIVE NAV LINK
────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav__link");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.classList.toggle(
            "active-link",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => navObserver.observe(s));

/* ──────────────────────────
   INIT
────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderProviders(providers);
  renderTestimonials();
  renderFAQ();
  initReveal();

  // Stagger card animations
  setTimeout(() => {
    document.querySelectorAll(".provider-card, .testimonial-card").forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.07}s`;
    });
  }, 100);
});

/* ──────────────────────────
   EASTER EGG 🎉
────────────────────────── */
let konamiBuffer = [];
const konamiCode = [38,38,40,40,37,39,37,39,66,65];
document.addEventListener("keydown", e => {
  konamiBuffer.push(e.keyCode);
  if (konamiBuffer.length > konamiCode.length) konamiBuffer.shift();
  if (JSON.stringify(konamiBuffer) === JSON.stringify(konamiCode)) {
    showToast("🍱 Congratulations! You unlocked a free tiffin! (Just kidding 😄)");
  }
});
