import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN TOKENS & GLOBAL STYLES
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --orange: #FF5C00;
      --orange-light: #FF7A2E;
      --orange-glow: rgba(255,92,0,0.18);
      --black: #0D0D0D;
      --dark: #1A1208;
      --cream: #FFF8F0;
      --cream2: #FFF3E6;
      --white: #FFFFFF;
      --text: #1A1208;
      --muted: #8A7060;
      --border: rgba(255,92,0,0.15);
      --card-bg: rgba(255,255,255,0.85);
      --shadow: 0 8px 40px rgba(255,92,0,0.10);
      --shadow-lg: 0 20px 60px rgba(255,92,0,0.18);
      --radius: 18px;
      --radius-sm: 10px;
      --font-head: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --nav-h: 70px;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-body);
      background: var(--cream);
      color: var(--text);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5 { font-family: var(--font-head); font-weight: 700; line-height: 1.15; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 10px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-14px) rotate(3deg); }
    }
    @keyframes pulse-ring {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); } to { transform: rotate(360deg); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes bounceDot {
      0%, 80%, 100% { transform: scale(0.6); }
      40% { transform: scale(1); }
    }

    .fade-up { animation: fadeUp 0.6s ease both; }
    .fade-in { animation: fadeIn 0.4s ease both; }

    /* Buttons */
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 26px; border-radius: 50px;
      font-family: var(--font-head); font-size: 0.92rem; font-weight: 600;
      cursor: pointer; border: none; text-decoration: none;
      transition: all 0.25s cubic-bezier(.4,0,.2,1);
      white-space: nowrap; letter-spacing: 0.02em;
    }
    .btn-primary {
      background: var(--orange); color: #fff;
      box-shadow: 0 4px 20px rgba(255,92,0,0.35);
    }
    .btn-primary:hover {
      background: var(--orange-light); transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(255,92,0,0.45);
    }
    .btn-outline {
      background: transparent; color: var(--orange);
      border: 2px solid var(--orange);
    }
    .btn-outline:hover {
      background: var(--orange); color: #fff;
      transform: translateY(-2px);
    }
    .btn-ghost {
      background: rgba(255,92,0,0.08); color: var(--orange);
    }
    .btn-ghost:hover { background: rgba(255,92,0,0.15); }
    .btn-dark {
      background: var(--dark); color: #fff;
    }
    .btn-dark:hover { background: #2a1f10; transform: translateY(-2px); }
    .btn-sm { padding: 8px 18px; font-size: 0.82rem; }
    .btn-lg { padding: 16px 36px; font-size: 1.05rem; }

    /* Cards */
    .card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: rgba(255,92,0,0.3);
    }

    /* Glass effect */
    .glass {
      background: rgba(255,255,255,0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.5);
    }

    /* Input */
    .input {
      width: 100%; padding: 12px 16px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      font-family: var(--font-body); font-size: 0.95rem;
      background: #fff; color: var(--text);
      transition: all 0.2s ease; outline: none;
    }
    .input:focus {
      border-color: var(--orange);
      box-shadow: 0 0 0 3px var(--orange-glow);
    }
    .input::placeholder { color: var(--muted); }

    /* Tag */
    .tag {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 12px; border-radius: 50px;
      font-size: 0.78rem; font-weight: 600; letter-spacing: 0.03em;
    }
    .tag-orange { background: var(--orange-glow); color: var(--orange); }
    .tag-green { background: rgba(34,197,94,0.12); color: #16a34a; }
    .tag-red { background: rgba(239,68,68,0.12); color: #dc2626; }
    .tag-blue { background: rgba(59,130,246,0.12); color: #2563eb; }

    /* Rating stars */
    .stars { color: #f59e0b; letter-spacing: 1px; }

    /* Overlay */
    .overlay {
      position: fixed; inset: 0;
      background: rgba(13,13,13,0.55);
      backdrop-filter: blur(4px);
      z-index: 900;
      animation: fadeIn 0.2s ease;
    }

    /* Modal */
    .modal {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      width: min(480px, 94vw);
      animation: fadeUp 0.3s ease;
    }

    /* Skeleton */
    .skeleton {
      background: linear-gradient(90deg, #f0e6d9 25%, #ffe8d0 50%, #f0e6d9 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 8px;
    }

    /* Scrollable area */
    .scroll-area { overflow-y: auto; }
    .scroll-area::-webkit-scrollbar { width: 4px; }

    /* Notification dot */
    .notif-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--orange);
      position: absolute; top: 0; right: 0;
    }

    /* Bottom nav */
    .bottom-nav {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(20px);
      border-top: 1px solid var(--border);
      display: flex; z-index: 200;
      box-shadow: 0 -4px 30px rgba(255,92,0,0.08);
    }

    /* Section */
    .section { padding: 80px 0; }
    .section-sm { padding: 48px 0; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

    /* Badge */
    .badge {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 20px; height: 20px; padding: 0 6px;
      border-radius: 50px; font-size: 0.72rem; font-weight: 700;
      background: var(--orange); color: #fff;
    }

    /* Divider */
    .divider { height: 1px; background: var(--border); margin: 24px 0; }

    /* Status */
    .status-dot {
      width: 9px; height: 9px; border-radius: 50%; display: inline-block;
    }
    .status-active { background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
    .status-pending { background: #f59e0b; box-shadow: 0 0 0 3px rgba(245,158,11,0.2); }
    .status-inactive { background: #94a3b8; }

    /* Grid helpers */
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

    @media (max-width: 900px) {
      .grid-4 { grid-template-columns: repeat(2, 1fr); }
      .grid-3 { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
      .section { padding: 56px 0; }
      h1 { font-size: clamp(2rem, 8vw, 3.5rem); }
    }

    /* Loading spinner */
    .spinner {
      width: 36px; height: 36px; border-radius: 50%;
      border: 3px solid var(--border);
      border-top-color: var(--orange);
      animation: spin 0.7s linear infinite;
    }

    /* Floating button */
    .fab {
      position: fixed; bottom: 90px; right: 24px;
      width: 54px; height: 54px; border-radius: 50%;
      background: var(--orange);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; cursor: pointer; z-index: 300;
      box-shadow: 0 4px 20px rgba(255,92,0,0.45);
      border: none; color: white;
      animation: float 3s ease-in-out infinite;
      transition: transform 0.2s ease;
    }
    .fab:hover { transform: scale(1.1) !important; animation: none; }

    /* Toast */
    .toast {
      position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%);
      background: var(--dark); color: white;
      padding: 12px 24px; border-radius: 50px;
      font-size: 0.88rem; font-weight: 500;
      z-index: 2000; box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      animation: fadeUp 0.3s ease;
    }

    /* Hero blob */
    .blob {
      position: absolute; border-radius: 50%;
      filter: blur(60px); pointer-events: none; z-index: 0;
    }

    /* Ticker / marquee */
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .marquee-track {
      display: flex; animation: marquee 22s linear infinite;
      width: max-content;
    }
    .marquee-wrap { overflow: hidden; }

    /* Switch */
    .switch {
      position: relative; display: inline-block; width: 46px; height: 24px;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .switch-slider {
      position: absolute; inset: 0; cursor: pointer;
      background: #e2d5c8; border-radius: 24px;
      transition: 0.3s;
    }
    .switch-slider:before {
      content: ''; position: absolute;
      height: 18px; width: 18px; left: 3px; bottom: 3px;
      background: white; border-radius: 50%;
      transition: 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    input:checked + .switch-slider { background: var(--orange); }
    input:checked + .switch-slider:before { transform: translateX(22px); }

    /* Order status steps */
    .step-line {
      flex: 1; height: 3px; border-radius: 2px;
      background: var(--border);
      transition: background 0.4s ease;
    }
    .step-line.done { background: var(--orange); }
  `}</style>
);

// ============================================================
// MOCK DATA
// ============================================================
const TIFFIN_PROVIDERS = [
  {
    id: 1, name: "Maa Ki Rasoi", owner: "Sunita Sharma", rating: 4.8, reviews: 312,
    image: "🍛", cover: "#FF8C42",
    tags: ["Veg", "Home Style"], location: "Talwandi, Kota",
    price: 1299, meals: ["Lunch", "Dinner"], delivery: "11:30 AM - 1:00 PM",
    menu: ["Dal Fry", "Sabzi", "Roti", "Rice", "Salad", "Pickle"],
    description: "Authentic home-cooked Rajasthani meals made with love and pure desi ghee.",
    active: true, orders: 1240, joinedDays: 180,
  },
  {
    id: 2, name: "Punjab da Dhaba", owner: "Gurpreet Singh", rating: 4.6, reviews: 198,
    image: "🫕", cover: "#E05A2B",
    tags: ["Non-Veg", "Punjabi"], location: "Vigyan Nagar, Kota",
    price: 1599, meals: ["Breakfast", "Lunch", "Dinner"], delivery: "8:00 AM - 9:30 PM",
    menu: ["Butter Chicken", "Naan", "Dal Makhni", "Raita", "Rice", "Salad"],
    description: "Rich Punjabi flavors with generous portions, perfect for hardworking students.",
    active: true, orders: 867, joinedDays: 95,
  },
  {
    id: 3, name: "Rajdhani Bhojanshala", owner: "Ramesh Gupta", rating: 4.9, reviews: 544,
    image: "🥘", cover: "#C2410C",
    tags: ["Veg", "Rajasthani"], location: "DC Nagar, Kota",
    price: 999, meals: ["Lunch", "Dinner"], delivery: "12:00 PM - 2:00 PM",
    menu: ["Dal Baati Churma", "Gatte ki Sabzi", "Roti", "Rice", "Lassi", "Mithai"],
    description: "Traditional Rajasthani thali experience at budget-friendly student pricing.",
    active: true, orders: 2310, joinedDays: 365,
  },
  {
    id: 4, name: "Green Bowl Kitchen", owner: "Priya Mehta", rating: 4.7, reviews: 221,
    image: "🥗", cover: "#65a30d",
    tags: ["Veg", "Healthy", "Jain"], location: "Jawahar Nagar, Kota",
    price: 1149, meals: ["Breakfast", "Lunch"], delivery: "8:00 AM - 2:00 PM",
    menu: ["Upma", "Poha", "Dal", "Roti", "Salad", "Fruit"],
    description: "Nutritious, oil-free meals curated for health-conscious students and professionals.",
    active: false, orders: 654, joinedDays: 60,
  },
  {
    id: 5, name: "Spice Route", owner: "Anand Verma", rating: 4.5, reviews: 134,
    image: "🍲", cover: "#7c3aed",
    tags: ["Non-Veg", "South Indian"], location: "Kunhari, Kota",
    price: 1399, meals: ["Breakfast", "Lunch", "Dinner"], delivery: "7:30 AM - 9:00 PM",
    menu: ["Idli", "Sambar", "Rice", "Fish Curry", "Rasam", "Curd"],
    description: "South Indian coastal cuisine — fresh, tangy, and aromatic.",
    active: true, orders: 421, joinedDays: 45,
  },
  {
    id: 6, name: "Shri Ram Tiffin", owner: "Sita Devi", rating: 4.4, reviews: 89,
    image: "🫓", cover: "#0891b2",
    tags: ["Veg", "North Indian"], location: "Nayapura, Kota",
    price: 849, meals: ["Lunch"], delivery: "12:30 PM - 2:30 PM",
    menu: ["Roti", "Dal", "Sabzi", "Rice", "Papad", "Aachar"],
    description: "Simple, wholesome tiffin for students on a tight budget.",
    active: true, orders: 320, joinedDays: 30,
  },
];

const ORDERS = [
  { id: "TK2001", provider: "Maa Ki Rasoi", plan: "Monthly Lunch", status: "Active", amount: 1299, date: "May 1, 2026", meals: "Lunch", endDate: "May 31, 2026" },
  { id: "TK1988", provider: "Rajdhani Bhojanshala", plan: "Monthly Dinner", status: "Completed", amount: 999, date: "Apr 1, 2026", meals: "Dinner", endDate: "Apr 30, 2026" },
  { id: "TK1843", provider: "Punjab da Dhaba", plan: "Monthly All Meals", status: "Completed", amount: 1599, date: "Mar 1, 2026", meals: "All", endDate: "Mar 31, 2026" },
];

const TESTIMONIALS = [
  { name: "Arjun Sharma", role: "JEE Aspirant", text: "TiffinKota saved me from hostel mess food. Maa Ki Rasoi feels just like home!", avatar: "👨‍🎓", rating: 5 },
  { name: "Sneha Patel", role: "NEET Student", text: "The subscription system is seamless. I get healthy food every day without any hassle.", avatar: "👩‍🎓", rating: 5 },
  { name: "Rahul Gupta", role: "IIT Aspirant", text: "Best investment for a student in Kota. Rajdhani Bhojanshala is absolutely value for money!", avatar: "👨‍💻", rating: 4 },
  { name: "Priya Verma", role: "Medical Student", text: "Green Bowl Kitchen's healthy meals keep me energized through long study sessions.", avatar: "👩‍⚕️", rating: 5 },
];

const ADMIN_STATS = {
  totalUsers: 8420, totalOwners: 156, activeOrders: 1243, revenue: 1580000,
  pendingApprovals: 12, reportedListings: 3, monthlyGrowth: 34,
};

// ============================================================
// ICONS (inline SVG as strings rendered via dangerouslySetInnerHTML)
// ============================================================
const Icon = ({ name, size = 18, color = "currentColor", style = {} }) => {
  const icons = {
    home: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    search: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    star: `<svg width="${size}" height="${size}" fill="${color}" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    clock: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    map: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    user: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    heart: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    bell: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    menu: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    x: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    check: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
    plus: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    edit: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    trash: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
    arrow: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    chat: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    wallet: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 11h2a2 2 0 0 1 0 4h-2"/><path d="M16 3l-4 4-4-4"/></svg>`,
    orders: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/></svg>`,
    chart: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
    store: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/><path d="M2 9h20"/></svg>`,
    settings: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    logout: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    food: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    shield: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    filter: `<svg width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
    whatsapp: `<svg width="${size}" height="${size}" fill="${color}" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
  };
  return <span dangerouslySetInnerHTML={{ __html: icons[name] || "" }} style={{ display: "inline-flex", alignItems: "center", ...style }} />;
};

// ============================================================
// TOAST COMPONENT
// ============================================================
const Toast = ({ msg, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, []);
  return <div className="toast">{msg}</div>;
};

// ============================================================
// NAVBAR
// ============================================================
const Navbar = ({ user, onLogin, onLogout, onNav, currentPage }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      height: "var(--nav-h)",
      background: scrolled ? "rgba(255,248,240,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        {/* Logo */}
        <div onClick={() => onNav("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.3rem", boxShadow: "0 4px 14px rgba(255,92,0,0.4)"
          }}>🍱</div>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)" }}>
            Tiffin<span style={{ color: "var(--orange)" }}>Kota</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="desktop-nav">
          {["home", "browse", "about"].map(p => (
            <button key={p} onClick={() => onNav(p)} className="btn btn-ghost btn-sm" style={{
              background: currentPage === p ? "var(--orange-glow)" : "transparent",
              color: currentPage === p ? "var(--orange)" : "var(--muted)",
              textTransform: "capitalize",
            }}>{p}</button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user ? (
            <>
              <button className="btn btn-ghost btn-sm" style={{ position: "relative" }}>
                <Icon name="bell" size={16} />
                <span className="notif-dot" />
              </button>
              <div onClick={() => onNav(user.role === "owner" ? "owner-dash" : user.role === "admin" ? "admin" : "customer-dash")}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: "1.1rem",
                  boxShadow: "0 2px 10px rgba(255,92,0,0.3)"
                }}>
                {user.avatar}
              </div>
              <button className="btn btn-outline btn-sm" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => onLogin("customer")}>Login</button>
              <button className="btn btn-primary btn-sm" onClick={() => onNav("register-owner")}>List Tiffin</button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

// ============================================================
// HOME PAGE
// ============================================================
const HomePage = ({ onNav, user }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const marqueeItems = ["🍛 Dal Tadka", "🫕 Butter Chicken", "🥘 Rajasthani Thali", "🍲 Sambar Rice", "🫓 Parathas", "🥗 Healthy Bowl", "🍜 Khichdi", "🧆 Chole Bhature"];

  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      {/* HERO */}
      <section style={{
        minHeight: "92vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #fff8f0 0%, #fff3e0 50%, #ffe8d0 100%)",
      }}>
        {/* Blobs */}
        <div className="blob" style={{ width: 500, height: 500, background: "rgba(255,92,0,0.08)", top: -100, right: -100 }} />
        <div className="blob" style={{ width: 300, height: 300, background: "rgba(255,92,0,0.05)", bottom: 50, left: -80 }} />

        <div className="container" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ animation: "fadeUp 0.7s ease both" }}>
            <div className="tag tag-orange" style={{ marginBottom: 20 }}>
              🏠 Kota's #1 Tiffin Platform
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: 20, color: "var(--text)" }}>
              Home-Cooked<br />
              <span style={{ color: "var(--orange)", display: "block" }}>Tiffin Delivered</span>
              to Your Door
            </h1>
            <p style={{ fontSize: "1.05rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
              Subscribe to monthly tiffin plans from verified home cooks near you. Nutritious, affordable, and tastes just like maa ka khaana.
            </p>

            {/* Search bar */}
            <div style={{
              display: "flex", alignItems: "center",
              background: "white", borderRadius: 50, padding: "6px 6px 6px 20px",
              boxShadow: "0 8px 40px rgba(255,92,0,0.15)",
              border: "1.5px solid var(--border)",
              marginBottom: 28, maxWidth: 460,
            }}>
              <Icon name="search" size={18} color="var(--muted)" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search tiffin in Kota..."
                style={{
                  flex: 1, border: "none", outline: "none",
                  background: "transparent", padding: "8px 12px",
                  fontSize: "0.95rem", fontFamily: "var(--font-body)", color: "var(--text)",
                }}
              />
              <button className="btn btn-primary btn-sm" onClick={() => onNav("browse")} style={{ borderRadius: 50 }}>
                Search
              </button>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-primary btn-lg" onClick={() => onNav("browse")}>
                <Icon name="food" size={18} /> Order Tiffin
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => onNav("register-owner")}>
                <Icon name="store" size={18} /> List Your Tiffin
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 32, marginTop: 36 }}>
              {[["8,400+", "Happy Customers"], ["156", "Tiffin Services"], ["1.2L+", "Meals Served"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.4rem", color: "var(--orange)" }}>{n}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero illustration */}
          <div style={{ display: "flex", justifyContent: "center", animation: "float 4s ease-in-out infinite" }}>
            <div style={{
              width: "min(420px, 100%)", height: 420,
              background: "white", borderRadius: 32,
              boxShadow: "0 30px 80px rgba(255,92,0,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 12, padding: 24,
              border: "1px solid var(--border)",
            }}>
              <div style={{ fontSize: "6rem" }}>🍱</div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.3rem", textAlign: "center" }}>
                Today's Special Thali
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {["Dal", "Sabzi", "Roti", "Rice", "Salad", "Sweet"].map(item => (
                  <span key={item} className="tag tag-orange">{item}</span>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--border)", width: "100%", paddingTop: 16, textAlign: "center" }}>
                <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Starting from</div>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.8rem", color: "var(--orange)" }}>₹849/month</div>
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => onNav("browse")}>
                Book Now <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: "linear-gradient(transparent, var(--cream))",
        }} />
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap" style={{ background: "var(--orange)", padding: "14px 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{
              color: "white", fontFamily: "var(--font-head)", fontWeight: 600,
              fontSize: "0.9rem", padding: "0 28px", whiteSpace: "nowrap",
              opacity: 0.95,
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* POPULAR PROVIDERS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tag tag-orange" style={{ marginBottom: 12 }}>⭐ Top Rated</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Popular Tiffin Services</h2>
            <p style={{ color: "var(--muted)", marginTop: 10, maxWidth: 480, margin: "10px auto 0" }}>
              Verified, loved, and delivering smiles every day across Kota.
            </p>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {["All", "Veg", "Non-Veg", "Budget", "Healthy"].map(f => (
              <button key={f} onClick={() => setFilter(f)} className="btn btn-sm"
                style={{
                  background: filter === f ? "var(--orange)" : "white",
                  color: filter === f ? "white" : "var(--muted)",
                  border: filter === f ? "none" : "1.5px solid var(--border)",
                  boxShadow: filter === f ? "0 4px 14px rgba(255,92,0,0.3)" : "none",
                }}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {TIFFIN_PROVIDERS.slice(0, 6).map((p, i) => (
              <TiffinCard key={p.id} provider={p} delay={i * 80} onNav={onNav} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn btn-outline btn-lg" onClick={() => onNav("browse")}>
              View All Tiffin Services <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: "var(--dark)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="tag" style={{ background: "rgba(255,92,0,0.2)", color: "var(--orange)", marginBottom: 12 }}>Simple Process</div>
            <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>How TiffinKota Works</h2>
          </div>
          <div className="grid-4">
            {[
              { icon: "🔍", step: "01", title: "Browse", desc: "Find verified tiffin services near you in Kota" },
              { icon: "📋", step: "02", title: "Choose Plan", desc: "Select meals — Breakfast, Lunch, Dinner or all three" },
              { icon: "💳", step: "03", title: "Pay Online", desc: "Secure payment via UPI, Card, or Cash on Delivery" },
              { icon: "🚚", step: "04", title: "Get Delivered", desc: "Fresh, hot tiffin delivered to your doorstep daily" },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} style={{
                textAlign: "center", padding: "32px 24px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "var(--radius)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,92,0,0.1)"; e.currentTarget.style.borderColor = "rgba(255,92,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>{icon}</div>
                <div style={{ color: "var(--orange)", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.85rem", marginBottom: 8 }}>STEP {step}</div>
                <h3 style={{ color: "white", marginBottom: 10, fontSize: "1.2rem" }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tag tag-orange" style={{ marginBottom: 12 }}>💬 Reviews</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>What Students Say</h2>
          </div>
          <div className="grid-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card" style={{ padding: "28px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ fontSize: "2rem" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem" }}>{t.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.78rem" }}>{t.role}</div>
                  </div>
                </div>
                <div className="stars" style={{ marginBottom: 10, fontSize: "0.9rem" }}>
                  {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.65, fontStyle: "italic" }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: "linear-gradient(135deg, var(--orange), #ff8c3a)",
        padding: "80px 0",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div className="blob" style={{ width: 400, height: 400, background: "rgba(255,255,255,0.07)", top: -100, left: -100, borderRadius: "50%" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 3rem)", marginBottom: 16 }}>
            Register Your Tiffin Service
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            Reach thousands of students and professionals in Kota. Grow your tiffin business with TiffinKota.
          </p>
          <button className="btn btn-dark btn-lg" onClick={() => onNav("register-owner")}>
            Get Started Free <Icon name="arrow" size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--dark)", color: "rgba(255,255,255,0.6)", padding: "48px 0 24px" }}>
        <div className="container">
          <div className="grid-4" style={{ marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: "1.5rem" }}>🍱</span>
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.1rem", color: "white" }}>
                  Tiffin<span style={{ color: "var(--orange)" }}>Kota</span>
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>Connecting Kota's students with home-cooked meals since 2024.</p>
            </div>
            {[
              { title: "Platform", links: ["Browse Services", "List Tiffin", "Pricing", "How it Works"] },
              { title: "Support", links: ["Help Center", "Contact Us", "WhatsApp", "Track Order"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Refund Policy"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ color: "white", fontFamily: "var(--font-head)", fontWeight: 600, marginBottom: 16, fontSize: "0.9rem" }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: "0.85rem", marginBottom: 8, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                  >{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, textAlign: "center", fontSize: "0.82rem" }}>
            © 2026 TiffinKota · Made with ❤️ in Kota, Rajasthan
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================================
// TIFFIN CARD
// ============================================================
const TiffinCard = ({ provider: p, delay = 0, onNav, onBook }) => {
  const [fav, setFav] = useState(false);
  return (
    <div className="card" style={{
      overflow: "hidden", cursor: "pointer",
      animation: `fadeUp 0.5s ${delay}ms ease both`,
    }} onClick={() => onNav && onNav("detail", p)}>
      {/* Cover */}
      <div style={{
        height: 140, background: `linear-gradient(135deg, ${p.cover}, ${p.cover}99)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "4rem", position: "relative",
      }}>
        {p.image}
        <button onClick={e => { e.stopPropagation(); setFav(!fav); }} style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%",
          width: 34, height: 34, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s ease",
        }}>
          <span style={{ color: fav ? "#ef4444" : "#ccc", fontSize: "1.1rem" }}>
            {fav ? "❤️" : "🤍"}
          </span>
        </button>
        {!p.active && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "white", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem" }}>Currently Closed</span>
          </div>
        )}
      </div>

      <div style={{ padding: "18px 18px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 style={{ fontSize: "1.05rem", lineHeight: 1.2 }}>{p.name}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#fef9c3", padding: "3px 8px", borderRadius: 50 }}>
            <span style={{ color: "#f59e0b", fontSize: "0.8rem" }}>★</span>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.82rem", color: "#92400e" }}>{p.rating}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--muted)", fontSize: "0.8rem", marginBottom: 10 }}>
          <Icon name="map" size={13} color="var(--muted)" />{p.location}
          <span style={{ margin: "0 4px" }}>·</span>
          <span style={{ color: "#64748b" }}>{p.reviews} reviews</span>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {p.tags.map(t => (
            <span key={t} className="tag" style={{
              background: t === "Veg" ? "rgba(34,197,94,0.1)" : t === "Non-Veg" ? "rgba(239,68,68,0.1)" : "var(--orange-glow)",
              color: t === "Veg" ? "#16a34a" : t === "Non-Veg" ? "#dc2626" : "var(--orange)",
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ color: "var(--muted)", fontSize: "0.78rem" }}>From </span>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.2rem", color: "var(--orange)" }}>₹{p.price}</span>
            <span style={{ color: "var(--muted)", fontSize: "0.75rem" }}>/month</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); onBook && onBook(p); onNav && onNav("detail", p); }}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// BROWSE PAGE
// ============================================================
const BrowsePage = ({ onNav, onBook }) => {
  const [search, setSearch] = useState("");
  const [vegFilter, setVegFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [priceRange, setPriceRange] = useState(2000);

  const filtered = TIFFIN_PROVIDERS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchVeg = vegFilter === "All" || p.tags.includes(vegFilter);
    const matchPrice = p.price <= priceRange;
    return matchSearch && matchVeg && matchPrice;
  }).sort((a, b) => sortBy === "rating" ? b.rating - a.rating : a.price - b.price);

  return (
    <div style={{ paddingTop: "calc(var(--nav-h) + 24px)", minHeight: "100vh" }}>
      <div className="container">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>Browse Tiffin Services</h1>
          <p style={{ color: "var(--muted)" }}>Find the perfect home-cooked meal subscription in Kota</p>
        </div>

        {/* Search & Filters */}
        <div style={{
          background: "white", borderRadius: "var(--radius)",
          padding: "20px 24px", marginBottom: 32,
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
          display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end",
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>SEARCH</label>
            <div style={{ position: "relative" }}>
              <Icon name="search" size={16} color="var(--muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input className="input" placeholder="Search by name or area..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 36 }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>TYPE</label>
            <div style={{ display: "flex", gap: 6 }}>
              {["All", "Veg", "Non-Veg"].map(v => (
                <button key={v} onClick={() => setVegFilter(v)} className="btn btn-sm"
                  style={{ background: vegFilter === v ? "var(--orange)" : "var(--cream2)", color: vegFilter === v ? "white" : "var(--text)" }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>SORT BY</label>
            <select className="input" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: "auto" }}>
              <option value="rating">Top Rated</option>
              <option value="price">Price: Low to High</option>
            </select>
          </div>

          <div style={{ minWidth: 160 }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>
              MAX PRICE: ₹{priceRange}/mo
            </label>
            <input type="range" min={800} max={2000} step={50} value={priceRange} onChange={e => setPriceRange(+e.target.value)}
              style={{ width: "100%", accentColor: "var(--orange)" }} />
          </div>
        </div>

        {/* Results count */}
        <div style={{ marginBottom: 20, color: "var(--muted)", fontSize: "0.9rem" }}>
          Showing <strong style={{ color: "var(--text)" }}>{filtered.length}</strong> tiffin services
        </div>

        {filtered.length > 0 ? (
          <div className="grid-3">
            {filtered.map((p, i) => <TiffinCard key={p.id} provider={p} delay={i * 60} onNav={onNav} onBook={onBook} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "4rem", marginBottom: 16 }}>🔍</div>
            <h3 style={{ marginBottom: 8 }}>No tiffin services found</h3>
            <p style={{ color: "var(--muted)" }}>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// DETAIL PAGE
// ============================================================
const DetailPage = ({ provider: p, onBook, onBack }) => {
  const [selectedMeals, setSelectedMeals] = useState(["Lunch"]);
  const toggleMeal = m => setSelectedMeals(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

  if (!p) return null;
  return (
    <div style={{ paddingTop: "var(--nav-h)", minHeight: "100vh" }}>
      {/* Hero cover */}
      <div style={{
        height: 280, background: `linear-gradient(135deg, ${p.cover}, ${p.cover}99)`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7rem",
        position: "relative",
      }}>
        {p.image}
        <button onClick={onBack} className="btn btn-sm" style={{
          position: "absolute", top: 20, left: 24,
          background: "rgba(255,255,255,0.9)", color: "var(--text)",
        }}>← Back</button>
      </div>

      <div className="container" style={{ marginTop: -60, position: "relative", zIndex: 1, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
          {/* Left */}
          <div>
            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div>
                  <h1 style={{ fontSize: "1.8rem", marginBottom: 4 }}>{p.name}</h1>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: "0.88rem" }}>
                    <Icon name="map" size={14} color="var(--muted)" />{p.location}
                    <span>· by {p.owner}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fef9c3", padding: "8px 14px", borderRadius: 50 }}>
                  <span style={{ color: "#f59e0b" }}>★</span>
                  <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.1rem", color: "#92400e" }}>{p.rating}</span>
                  <span style={{ color: "#a16207", fontSize: "0.8rem" }}>({p.reviews})</span>
                </div>
              </div>
              <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>{p.description}</p>
              <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                {p.tags.map(t => <span key={t} className="tag tag-orange">{t}</span>)}
              </div>
            </div>

            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
              <h3 style={{ marginBottom: 16 }}>Today's Menu</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {p.menu.map(item => (
                  <div key={item} style={{
                    background: "var(--cream2)", borderRadius: "var(--radius-sm)",
                    padding: "10px 14px", fontSize: "0.88rem", fontWeight: 500,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ color: "var(--orange)" }}>✦</span> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <h3 style={{ marginBottom: 16 }}>Delivery Info</h3>
              <div style={{ display: "flex", gap: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: "0.9rem" }}>
                  <Icon name="clock" size={16} color="var(--orange)" />
                  <span>{p.delivery}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: "0.9rem" }}>
                  <Icon name="map" size={16} color="var(--orange)" />
                  <span>Covers: {p.location} + 3km radius</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="card" style={{ padding: 28, position: "sticky", top: "calc(var(--nav-h) + 20px)" }}>
            <h3 style={{ marginBottom: 20 }}>Book Monthly Plan</h3>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 10 }}>SELECT MEALS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Breakfast", "Lunch", "Dinner"].map(m => {
                  const avail = p.meals.includes(m);
                  const sel = selectedMeals.includes(m);
                  return (
                    <div key={m} onClick={() => avail && toggleMeal(m)} style={{
                      padding: "12px 16px", borderRadius: "var(--radius-sm)",
                      border: `1.5px solid ${sel ? "var(--orange)" : "var(--border)"}`,
                      background: sel ? "var(--orange-glow)" : avail ? "white" : "var(--cream2)",
                      cursor: avail ? "pointer" : "not-allowed", opacity: avail ? 1 : 0.4,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      transition: "all 0.2s ease",
                    }}>
                      <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>{m}</span>
                      {sel && <Icon name="check" size={16} color="var(--orange)" />}
                      {!avail && <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Not available</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="divider" />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.9rem" }}>
              <span style={{ color: "var(--muted)" }}>Base price</span>
              <span>₹{p.price}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.2rem" }}>
              <span>Total / month</span>
              <span style={{ color: "var(--orange)" }}>₹{p.price + (selectedMeals.length - 1) * 200}</span>
            </div>

            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: 12 }}
              onClick={() => onBook(p, selectedMeals)}>
              Book Now — ₹{p.price + (selectedMeals.length - 1) * 200}/mo
            </button>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
              <Icon name="whatsapp" size={16} color="#25D366" /> Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// AUTH PAGE
// ============================================================
const AuthPage = ({ mode = "customer", onSuccess, onSwitch }) => {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: mode });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // for OTP flow
  const [otp, setOtp] = useState("");

  const isOwner = mode === "owner";

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        name: form.name || (isOwner ? "Sunita Sharma" : "Arjun Kumar"),
        email: form.email || "user@tiffinkota.in",
        role: mode,
        avatar: isOwner ? "👩‍🍳" : "👨‍🎓",
        wallet: 1250,
      });
    }, 1400);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, var(--cream) 0%, var(--cream2) 100%)",
      padding: "20px",
    }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: "3rem", marginBottom: 8 }}>🍱</div>
          <h2 style={{ fontSize: "1.8rem" }}>
            Tiffin<span style={{ color: "var(--orange)" }}>Kota</span>
          </h2>
          <p style={{ color: "var(--muted)", marginTop: 6, fontSize: "0.9rem" }}>
            {isOwner ? "Manage your tiffin business" : "Your daily tiffin, simplified"}
          </p>
        </div>

        <div className="card" style={{ padding: 32 }}>
          {/* Role tabs */}
          <div style={{ display: "flex", background: "var(--cream2)", borderRadius: 10, padding: 4, marginBottom: 24 }}>
            {["customer", "owner"].map(r => (
              <button key={r} onClick={() => onSwitch(r)} className="btn btn-sm" style={{
                flex: 1, justifyContent: "center",
                background: mode === r ? "white" : "transparent",
                color: mode === r ? "var(--orange)" : "var(--muted)",
                boxShadow: mode === r ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                textTransform: "capitalize",
              }}>
                {r === "customer" ? "👨‍🎓 Customer" : "👩‍🍳 Owner"}
              </button>
            ))}
          </div>

          {/* Login/Register tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid var(--border)" }}>
            {["login", "register"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "10px", border: "none", background: "transparent",
                fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.9rem",
                cursor: "pointer", textTransform: "capitalize",
                color: tab === t ? "var(--orange)" : "var(--muted)",
                borderBottom: tab === t ? "2px solid var(--orange)" : "2px solid transparent",
                transition: "all 0.2s ease",
              }}>{t}</button>
            ))}
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {tab === "register" && (
              <input className="input" placeholder={isOwner ? "Shop Owner Name" : "Full Name"}
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            )}
            <input className="input" placeholder="Email address"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            {isOwner && tab === "register" && (
              <input className="input" placeholder="Shop Name" />
            )}
            <input className="input" type="password" placeholder="Password"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />

            <button className="btn btn-primary" style={{ justifyContent: "center", width: "100%", padding: "14px" }}
              onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                  {tab === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : (tab === "login" ? `Sign In as ${isOwner ? "Owner" : "Customer"}` : "Create Account")}
            </button>

            <div style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.82rem" }}>OR</div>

            <button className="btn btn-outline" style={{ justifyContent: "center" }}>
              <span>🇬</span> Continue with Google
            </button>
          </div>

          {!isOwner && (
            <div style={{ marginTop: 20, padding: "16px", background: "var(--orange-glow)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem", color: "var(--muted)", textAlign: "center" }}>
              Demo: Click "Sign In" to enter as a customer
            </div>
          )}
        </div>

        {/* Admin link */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span style={{ fontSize: "0.82rem", color: "var(--muted)", cursor: "pointer" }}
            onClick={() => onSuccess({ name: "Admin", email: "admin@tiffinkota.in", role: "admin", avatar: "🛡️", wallet: 0 })}>
            Admin Login →
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// CUSTOMER DASHBOARD
// ============================================================
const CustomerDashboard = ({ user, onNav, onLogout }) => {
  const [tab, setTab] = useState("home");
  const [address, setAddress] = useState("Vikas Nagar, Kota, Rajasthan 324005");

  const navItems = [
    { id: "home", icon: "home", label: "Home" },
    { id: "browse", icon: "search", label: "Browse" },
    { id: "orders", icon: "orders", label: "Orders" },
    { id: "profile", icon: "user", label: "Profile" },
  ];

  const activeOrder = ORDERS[0];

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", paddingBottom: 80 }}>
      {/* Top Bar */}
      <div style={{
        background: "white", padding: "16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>Good morning 👋</div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "1.1rem" }}>{user.name}</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ background: "var(--orange-glow)", borderRadius: 50, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="wallet" size={14} color="var(--orange)" />
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.9rem", color: "var(--orange)" }}>₹{user.wallet}</span>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem",
          }}>{user.avatar}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        {tab === "home" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {/* Active subscription */}
            {activeOrder && (
              <div style={{
                background: "linear-gradient(135deg, var(--orange), #ff8c3a)",
                borderRadius: "var(--radius)", padding: "20px 22px", marginBottom: 20, color: "white",
              }}>
                <div style={{ fontSize: "0.78rem", opacity: 0.85, marginBottom: 6 }}>ACTIVE SUBSCRIPTION</div>
                <h3 style={{ color: "white", marginBottom: 4 }}>{activeOrder.provider}</h3>
                <div style={{ fontSize: "0.85rem", opacity: 0.9, marginBottom: 14 }}>
                  {activeOrder.plan} · Valid till {activeOrder.endDate}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 16 }}>
                    {["Placed", "Prepared", "Out", "Delivered"].map((s, i) => (
                      <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: "50%",
                          background: i <= 2 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.7rem",
                        }}>
                          {i <= 2 ? <Icon name="check" size={12} color="var(--orange)" /> : ""}
                        </div>
                        {i < 3 && <div style={{ width: 20, height: 2, background: i < 2 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)", borderRadius: 2 }} />}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 50 }}>
                    Out for Delivery
                  </span>
                </div>
              </div>
            )}

            {/* Quick stats */}
            <div className="grid-2" style={{ marginBottom: 20 }}>
              {[
                { label: "Total Orders", val: ORDERS.length, icon: "📦", color: "#7c3aed" },
                { label: "This Month", val: "₹1,299", icon: "💳", color: "var(--orange)" },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>{s.icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.3rem" }}>{s.val}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nearby tiffins */}
            <h3 style={{ marginBottom: 16, fontSize: "1.1rem" }}>Nearby Tiffin Services</h3>
            {TIFFIN_PROVIDERS.slice(0, 3).map(p => (
              <div key={p.id} className="card" style={{ padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
                onClick={() => { onNav("detail", p); }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 12,
                  background: `linear-gradient(135deg, ${p.cover}, ${p.cover}99)`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0,
                }}>{p.image}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{p.location}</div>
                  <div style={{ fontSize: "0.78rem", marginTop: 2 }}>
                    <span style={{ color: "var(--orange)", fontWeight: 700 }}>★{p.rating}</span>
                    <span style={{ color: "var(--muted)" }}> · ₹{p.price}/mo</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm">Book</button>
              </div>
            ))}
          </div>
        )}

        {tab === "orders" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h2 style={{ marginBottom: 20 }}>My Orders</h2>
            {ORDERS.map(order => (
              <div key={order.id} className="card" style={{ padding: "18px 20px", marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 700 }}>{order.provider}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{order.plan} · {order.date}</div>
                  </div>
                  <span className={`tag ${order.status === "Active" ? "tag-green" : "tag-orange"}`}>{order.status}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--muted)" }}>#{order.id}</span>
                  <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, color: "var(--orange)" }}>₹{order.amount}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "profile" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div className="card" style={{ padding: "24px", marginBottom: 20, textAlign: "center" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "var(--orange)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 12px",
              }}>{user.avatar}</div>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 4 }}>{user.name}</h2>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>{user.email}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16 }}>
                {[["3", "Orders"], ["₹1.2k", "Spent"], ["4.8", "Rating"]].map(([v, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.2rem", color: "var(--orange)" }}>{v}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {[
              { icon: "map", label: "Saved Addresses", detail: address },
              { icon: "wallet", label: "Wallet Balance", detail: `₹${user.wallet}` },
              { icon: "bell", label: "Notifications", detail: "Enabled" },
              { icon: "settings", label: "Settings", detail: "" },
            ].map(item => (
              <div key={item.label} className="card" style={{ padding: "14px 18px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--orange-glow)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={item.icon} size={16} color="var(--orange)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{item.label}</div>
                  {item.detail && <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{item.detail}</div>}
                </div>
                <Icon name="arrow" size={14} color="var(--muted)" />
              </div>
            ))}

            <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={onLogout}>
              <Icon name="logout" size={16} /> Sign Out
            </button>
          </div>
        )}

        {tab === "browse" && <BrowsePage onNav={onNav} />}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)} style={{
            flex: 1, padding: "10px 0", border: "none", background: "transparent",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: tab === item.id ? "var(--orange)" : "var(--muted)",
            transition: "color 0.2s ease",
          }}>
            <Icon name={item.icon} size={20} color={tab === item.id ? "var(--orange)" : "var(--muted)"} />
            <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-head)", fontWeight: tab === item.id ? 700 : 500 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// OWNER DASHBOARD
// ============================================================
const OwnerDashboard = ({ user, onLogout }) => {
  const [tab, setTab] = useState("dashboard");
  const [orders, setOrders] = useState([
    { id: "TK2010", customer: "Arjun Sharma", meal: "Lunch", address: "Room 204, PG Vikas Nagar", status: "Pending", amount: 1299 },
    { id: "TK2011", customer: "Priya Patel", meal: "Dinner", address: "Hostel C, DC Nagar", status: "Accepted", amount: 999 },
    { id: "TK2012", customer: "Rahul Verma", meal: "All Meals", address: "Flat 12B, Talwandi", status: "Delivered", amount: 1599 },
  ]);

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const stats = [
    { label: "Active Orders", val: orders.filter(o => o.status !== "Delivered").length, icon: "📦", color: "var(--orange)" },
    { label: "Today's Earnings", val: "₹3,897", icon: "💰", color: "#22c55e" },
    { label: "Total Customers", val: 48, icon: "👥", color: "#7c3aed" },
    { label: "Rating", val: "4.8 ★", icon: "⭐", color: "#f59e0b" },
  ];

  const navItems = [
    { id: "dashboard", icon: "chart", label: "Dashboard" },
    { id: "orders", icon: "orders", label: "Orders" },
    { id: "menu", icon: "food", label: "Menu" },
    { id: "profile", icon: "store", label: "Shop" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, var(--dark), #2a1f10)",
        padding: "20px 20px 32px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: "1.5rem" }}>🍱</div>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, color: "white", fontSize: "1.1rem" }}>
              Tiffin<span style={{ color: "var(--orange)" }}>Kota</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon name="bell" size={16} color="white" />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
              {user.avatar}
            </div>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>Owner Dashboard</div>
        <h2 style={{ color: "white", marginBottom: 4 }}>{user.name}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="status-dot status-active" />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>Shop is Open</span>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {tab === "dashboard" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {stats.map(s => (
                <div key={s.label} className="card" style={{ padding: "16px 18px" }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.3rem", color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent orders preview */}
            <h3 style={{ marginBottom: 14, fontSize: "1.05rem" }}>Recent Orders</h3>
            {orders.slice(0, 3).map(order => (
              <div key={order.id} className="card" style={{ padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--orange-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>🍱</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{order.customer}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{order.meal}</div>
                </div>
                <span className={`tag ${order.status === "Delivered" ? "tag-green" : order.status === "Accepted" ? "tag-blue" : "tag-orange"}`} style={{ fontSize: "0.7rem" }}>
                  {order.status}
                </span>
              </div>
            ))}

            {/* Earnings chart (simple bars) */}
            <div className="card" style={{ padding: 20, marginTop: 20 }}>
              <h3 style={{ marginBottom: 16, fontSize: "1rem" }}>Weekly Earnings</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
                {[45, 62, 38, 75, 55, 89, 72].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      height: `${h}%`, background: i === 5 ? "var(--orange)" : "var(--orange-glow)",
                      borderRadius: "4px 4px 0 0", width: "100%",
                      transition: "height 0.5s ease",
                    }} />
                    <span style={{ fontSize: "0.6rem", color: "var(--muted)" }}>
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h2 style={{ marginBottom: 20 }}>Manage Orders</h2>
            {orders.map(order => (
              <div key={order.id} className="card" style={{ padding: 20, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 700 }}>{order.customer}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{order.meal} · #{order.id}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 2 }}>📍 {order.address}</div>
                  </div>
                  <span className={`tag ${order.status === "Delivered" ? "tag-green" : order.status === "Accepted" ? "tag-blue" : "tag-orange"}`}>
                    {order.status}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {order.status === "Pending" && (
                    <>
                      <button className="btn btn-primary btn-sm" onClick={() => updateStatus(order.id, "Accepted")}>
                        <Icon name="check" size={14} /> Accept
                      </button>
                      <button className="btn btn-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#dc2626" }} onClick={() => updateStatus(order.id, "Rejected")}>
                        <Icon name="x" size={14} /> Reject
                      </button>
                    </>
                  )}
                  {order.status === "Accepted" && (
                    <button className="btn btn-primary btn-sm" onClick={() => updateStatus(order.id, "Delivered")}>
                      Mark Delivered
                    </button>
                  )}
                  <button className="btn btn-ghost btn-sm">
                    <Icon name="whatsapp" size={14} color="#25D366" /> Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "menu" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2>Menu Management</h2>
              <button className="btn btn-primary btn-sm"><Icon name="plus" size={14} /> Add Item</button>
            </div>
            {["Breakfast", "Lunch", "Dinner"].map(meal => (
              <div key={meal} className="card" style={{ padding: 20, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 style={{ fontSize: "1rem" }}>{meal}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label className="switch">
                      <input type="checkbox" defaultChecked={meal !== "Breakfast"} />
                      <span className="switch-slider" />
                    </label>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(meal === "Breakfast" ? ["Poha", "Upma", "Tea"] : meal === "Lunch" ? ["Dal", "Sabzi", "Roti", "Rice", "Salad"] : ["Dal Makhni", "Roti", "Rice", "Raita"]).map(item => (
                    <div key={item} style={{
                      background: "var(--cream2)", borderRadius: 50,
                      padding: "5px 12px", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6,
                    }}>
                      {item}
                      <Icon name="x" size={12} color="var(--muted)" style={{ cursor: "pointer" }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "profile" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h2 style={{ marginBottom: 20 }}>Shop Profile</h2>
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16, background: "var(--orange)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem",
                }}>🍱</div>
                <div>
                  <h3>Maa Ki Rasoi</h3>
                  <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Talwandi, Kota</div>
                  <span className="tag tag-green">Verified ✓</span>
                </div>
              </div>
              {[["Shop Name", "Maa Ki Rasoi"], ["Owner", user.name], ["Phone", "+91 98765 43210"], ["Address", "Near Talwandi Chouraha, Kota"]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: "0.88rem" }}>
                  <span style={{ color: "var(--muted)" }}>{label}</span>
                  <span style={{ fontWeight: 500 }}>{val}</span>
                </div>
              ))}
              <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
                <Icon name="edit" size={14} /> Edit Shop Details
              </button>
            </div>
            <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center", color: "#dc2626", borderColor: "#dc2626" }} onClick={onLogout}>
              <Icon name="logout" size={14} /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)} style={{
            flex: 1, padding: "10px 0", border: "none", background: "transparent",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: tab === item.id ? "var(--orange)" : "var(--muted)",
          }}>
            <Icon name={item.icon} size={20} color={tab === item.id ? "var(--orange)" : "var(--muted)"} />
            <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-head)", fontWeight: tab === item.id ? 700 : 500 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// ADMIN PANEL
// ============================================================
const AdminPanel = ({ user, onLogout }) => {
  const [tab, setTab] = useState("overview");
  const [owners, setOwners] = useState([
    { id: 1, name: "Sunita Sharma", shop: "Maa Ki Rasoi", status: "Approved", orders: 1240, joined: "Jan 2025" },
    { id: 2, name: "Gurpreet Singh", shop: "Punjab da Dhaba", status: "Approved", orders: 867, joined: "Feb 2025" },
    { id: 3, name: "New Owner A", shop: "New Tiffin Co", status: "Pending", orders: 0, joined: "May 2026" },
    { id: 4, name: "New Owner B", shop: "Fresh Bites", status: "Pending", orders: 0, joined: "May 2026" },
  ]);

  const approveOwner = (id) => setOwners(prev => prev.map(o => o.id === id ? { ...o, status: "Approved" } : o));
  const rejectOwner = (id) => setOwners(prev => prev.filter(o => o.id !== id));

  const tabs = ["overview", "owners", "users", "payments"];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{
        width: 220, background: "var(--dark)", padding: "24px 0",
        display: "flex", flexDirection: "column", flexShrink: 0,
        position: "sticky", top: 0, height: "100vh",
      }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: "1.3rem", marginBottom: 4 }}>🛡️</div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, color: "white" }}>Admin Panel</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>TiffinKota</div>
        </div>
        <div style={{ flex: 1, padding: "16px 12px" }}>
          {[
            { id: "overview", icon: "chart", label: "Overview" },
            { id: "owners", icon: "store", label: "Owners" },
            { id: "users", icon: "user", label: "Users" },
            { id: "payments", icon: "wallet", label: "Payments" },
          ].map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 14px", border: "none", borderRadius: 10, cursor: "pointer",
              background: tab === item.id ? "rgba(255,92,0,0.2)" : "transparent",
              color: tab === item.id ? "var(--orange)" : "rgba(255,255,255,0.55)",
              marginBottom: 4, transition: "all 0.2s ease",
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.88rem",
              textAlign: "left",
            }}>
              <Icon name={item.icon} size={16} color={tab === item.id ? "var(--orange)" : "rgba(255,255,255,0.55)"} />
              {item.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={onLogout} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", border: "none", borderRadius: 10, cursor: "pointer",
            background: "transparent", color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-head)", fontWeight: 600, fontSize: "0.88rem", textAlign: "left",
          }}>
            <Icon name="logout" size={16} color="rgba(255,255,255,0.4)" /> Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 32, overflow: "auto", background: "#f5f0e8" }}>
        {tab === "overview" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h1 style={{ marginBottom: 6, fontSize: "1.8rem" }}>Platform Overview</h1>
            <p style={{ color: "var(--muted)", marginBottom: 32 }}>TiffinKota · Admin Dashboard</p>

            <div className="grid-4" style={{ marginBottom: 32 }}>
              {[
                { label: "Total Users", val: ADMIN_STATS.totalUsers.toLocaleString(), icon: "👥", color: "#7c3aed", trend: "+12%" },
                { label: "Tiffin Services", val: ADMIN_STATS.totalOwners, icon: "🏪", color: "var(--orange)", trend: "+8%" },
                { label: "Active Orders", val: ADMIN_STATS.activeOrders.toLocaleString(), icon: "📦", color: "#22c55e", trend: "+24%" },
                { label: "Revenue (MoM)", val: "₹15.8L", icon: "💰", color: "#f59e0b", trend: `+${ADMIN_STATS.monthlyGrowth}%` },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: "22px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ fontSize: "2rem" }}>{s.icon}</div>
                    <span className="tag tag-green" style={{ fontSize: "0.72rem" }}>{s.trend}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.6rem", color: s.color, marginTop: 10 }}>{s.val}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Pending approvals */}
            {owners.filter(o => o.status === "Pending").length > 0 && (
              <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3>Pending Approvals</h3>
                  <span className="badge">{owners.filter(o => o.status === "Pending").length}</span>
                </div>
                {owners.filter(o => o.status === "Pending").map(owner => (
                  <div key={owner.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--orange-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🏪</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{owner.shop}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>by {owner.name} · {owner.joined}</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => approveOwner(owner.id)}>Approve</button>
                    <button className="btn btn-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#dc2626" }} onClick={() => rejectOwner(owner.id)}>Reject</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "owners" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2>Tiffin Service Owners</h2>
              <span className="badge" style={{ fontSize: "0.8rem", padding: "4px 12px" }}>{owners.length} total</span>
            </div>
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ background: "var(--cream2)" }}>
                      {["Shop", "Owner", "Status", "Orders", "Joined", "Actions"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.78rem", color: "var(--muted)", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {owners.map(owner => (
                      <tr key={owner.id} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 600 }}>{owner.shop}</td>
                        <td style={{ padding: "14px 16px", color: "var(--muted)" }}>{owner.name}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span className={`tag ${owner.status === "Approved" ? "tag-green" : "tag-orange"}`} style={{ fontSize: "0.72rem" }}>
                            {owner.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", fontFamily: "var(--font-head)", fontWeight: 700 }}>{owner.orders}</td>
                        <td style={{ padding: "14px 16px", color: "var(--muted)", fontSize: "0.82rem" }}>{owner.joined}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            {owner.status === "Pending" && (
                              <button className="btn btn-primary btn-sm" onClick={() => approveOwner(owner.id)}>Approve</button>
                            )}
                            <button className="btn btn-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#dc2626" }} onClick={() => rejectOwner(owner.id)}>
                              <Icon name="trash" size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h2 style={{ marginBottom: 24 }}>Registered Users</h2>
            <div className="grid-3" style={{ marginBottom: 24 }}>
              {[["8,420", "Total Users", "👥"], ["6,210", "Active", "✅"], ["2,210", "Inactive", "😴"]].map(([v, l, icon]) => (
                <div key={l} className="card" style={{ padding: "20px", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.5rem", color: "var(--orange)" }}>{v}</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.82rem" }}>{l}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <p style={{ color: "var(--muted)", textAlign: "center", padding: 40 }}>
                Full user management table would appear here with search, filter, and bulk actions.
              </p>
            </div>
          </div>
        )}

        {tab === "payments" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h2 style={{ marginBottom: 24 }}>Payment Analytics</h2>
            <div className="grid-2" style={{ marginBottom: 24 }}>
              {[
                { label: "This Month Revenue", val: "₹15,80,000", icon: "💳", change: "+34%" },
                { label: "Platform Commission", val: "₹1,58,000", icon: "🏦", change: "+34%" },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: 24 }}>
                  <div style={{ fontSize: "2rem", marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.8rem", color: "var(--orange)" }}>{s.val}</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: 4 }}>{s.label}</div>
                  <span className="tag tag-green" style={{ marginTop: 8 }}>{s.change} MoM</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 16 }}>Monthly Revenue Trend</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
                {[30, 48, 42, 65, 58, 78, 72, 85, 90, 76, 92, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      height: `${h}%`, background: i === 11 ? "var(--orange)" : `rgba(255,92,0,${0.2 + h / 200})`,
                      borderRadius: "4px 4px 0 0", width: "100%",
                    }} />
                    <span style={{ fontSize: "0.55rem", color: "var(--muted)" }}>
                      {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// BOOKING MODAL
// ============================================================
const BookingModal = ({ provider, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("upi");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1800);
  };

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal">
        <div className="card" style={{ padding: 28, background: "white" }}>
          {step === 1 && (
            <div style={{ animation: "fadeUp 0.3s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3>Confirm Booking</h3>
                <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer" }}>
                  <Icon name="x" size={20} color="var(--muted)" />
                </button>
              </div>
              <div style={{ background: "var(--cream2)", borderRadius: "var(--radius-sm)", padding: "14px 16px", marginBottom: 20 }}>
                <div style={{ fontWeight: 700 }}>{provider?.name}</div>
                <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Monthly Lunch Plan</div>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.4rem", color: "var(--orange)", marginTop: 4 }}>₹{provider?.price}/month</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 8, display: "block" }}>DELIVERY ADDRESS</label>
                <textarea className="input" placeholder="Enter your complete delivery address..."
                  rows={3} value={address} onChange={e => setAddress(e.target.value)}
                  style={{ resize: "none" }} />
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setStep(2)} disabled={!address.trim()}>
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: "fadeUp 0.3s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <button onClick={() => setStep(1)} style={{ border: "none", background: "none", cursor: "pointer" }}>←</button>
                <h3>Payment</h3>
              </div>
              <div style={{ marginBottom: 20 }}>
                {[
                  { id: "upi", label: "UPI Payment", icon: "📱", desc: "Google Pay, PhonePe, Paytm" },
                  { id: "card", label: "Debit/Credit Card", icon: "💳", desc: "Visa, Mastercard, RuPay" },
                  { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when tiffin arrives" },
                ].map(p => (
                  <div key={p.id} onClick={() => setPayment(p.id)} style={{
                    padding: "14px 16px", borderRadius: "var(--radius-sm)",
                    border: `1.5px solid ${payment === p.id ? "var(--orange)" : "var(--border)"}`,
                    background: payment === p.id ? "var(--orange-glow)" : "white",
                    cursor: "pointer", marginBottom: 8,
                    display: "flex", alignItems: "center", gap: 12,
                    transition: "all 0.2s ease",
                  }}>
                    <span style={{ fontSize: "1.5rem" }}>{p.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{p.label}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{p.desc}</div>
                    </div>
                    {payment === p.id && <Icon name="check" size={16} color="var(--orange)" style={{ marginLeft: "auto" }} />}
                  </div>
                ))}
              </div>
              <div className="divider" />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ color: "var(--muted)" }}>Total</span>
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1.2rem", color: "var(--orange)" }}>₹{provider?.price}</span>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
                onClick={handlePay} disabled={loading}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                    Processing...
                  </span>
                ) : `Pay ₹${provider?.price}`}
              </button>
            </div>
          )}

          {step === 3 && (
            <div style={{ animation: "fadeUp 0.3s ease", textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "4rem", marginBottom: 16 }}>✅</div>
              <h2 style={{ marginBottom: 8 }}>Booking Confirmed!</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 24 }}>
                Your tiffin subscription with <strong>{provider?.name}</strong> is now active.<br />
                First delivery starts tomorrow!
              </p>
              <div style={{ background: "var(--cream2)", borderRadius: "var(--radius-sm)", padding: 16, marginBottom: 20, textAlign: "left" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 4 }}>ORDER ID</div>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 700 }}>TK{Math.floor(2000 + Math.random() * 1000)}</div>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => { onClose(); onConfirm && onConfirm(); }}>
                View My Orders
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ============================================================
// REGISTER OWNER PAGE
// ============================================================
const RegisterOwnerPage = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ shopName: "", ownerName: "", phone: "", address: "", area: "", veg: "veg", price: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1600);
  };

  return (
    <div style={{ paddingTop: "calc(var(--nav-h) + 40px)", minHeight: "100vh", paddingBottom: 60 }}>
      <div className="container" style={{ maxWidth: 560 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>🏪</div>
          <h1 style={{ fontSize: "2rem", marginBottom: 8 }}>List Your Tiffin Service</h1>
          <p style={{ color: "var(--muted)" }}>Join 156+ tiffin providers already on TiffinKota</p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: step >= s ? "var(--orange)" : "var(--cream2)",
                border: `2px solid ${step >= s ? "var(--orange)" : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.9rem",
                color: step >= s ? "white" : "var(--muted)",
                transition: "all 0.3s ease",
                flexShrink: 0,
              }}>
                {step > s ? <Icon name="check" size={16} color="white" /> : s}
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: step > s ? "var(--orange)" : "var(--border)", margin: "0 8px", transition: "background 0.3s ease" }} />}
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 32 }}>
          {step === 1 && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <h3 style={{ marginBottom: 24 }}>Basic Information</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>SHOP NAME *</label>
                  <input className="input" placeholder="e.g., Maa Ki Rasoi" value={form.shopName} onChange={e => setForm({ ...form, shopName: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>OWNER NAME *</label>
                  <input className="input" placeholder="Your full name" value={form.ownerName} onChange={e => setForm({ ...form, ownerName: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>PHONE NUMBER *</label>
                  <input className="input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <button className="btn btn-primary" style={{ justifyContent: "center", marginTop: 8 }} onClick={() => setStep(2)}>
                  Continue <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <h3 style={{ marginBottom: 24 }}>Shop Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>COMPLETE ADDRESS *</label>
                  <textarea className="input" placeholder="Shop address in Kota" rows={2} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} style={{ resize: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>DELIVERY AREA</label>
                  <input className="input" placeholder="e.g., Talwandi, Vigyan Nagar" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 8, display: "block" }}>FOOD TYPE</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["veg", "non-veg", "both"].map(v => (
                      <button key={v} onClick={() => setForm({ ...form, veg: v })} className="btn btn-sm" style={{
                        background: form.veg === v ? "var(--orange)" : "var(--cream2)",
                        color: form.veg === v ? "white" : "var(--muted)",
                        textTransform: "capitalize",
                      }}>{v}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--muted)", marginBottom: 6, display: "block" }}>MONTHLY PRICE (₹)</label>
                  <input className="input" type="number" placeholder="e.g., 1299" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-outline" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: "center" }}>← Back</button>
                  <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex: 2, justifyContent: "center" }}>
                    {loading ? <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />Submitting...</span> : "Submit for Review"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ animation: "fadeUp 0.4s ease", textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "4rem", marginBottom: 16 }}>🎉</div>
              <h2 style={{ marginBottom: 12 }}>Registration Submitted!</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 28 }}>
                Your tiffin service registration is under review. Our team will verify and approve within 24 hours.
              </p>
              <div style={{ background: "var(--orange-glow)", borderRadius: "var(--radius-sm)", padding: "14px 16px", marginBottom: 24, fontSize: "0.88rem" }}>
                📱 You'll receive an SMS on your registered number once approved.
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
                onClick={() => onSuccess({ name: form.ownerName || "New Owner", email: "owner@tiffinkota.in", role: "owner", avatar: "👩‍🍳", wallet: 0 })}>
                Go to Owner Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function TiffinKota() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("customer");
  const [showAuth, setShowAuth] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingProvider, setBookingProvider] = useState(null);
  const [toast, setToast] = useState(null);
  const [showFab, setShowFab] = useState(true);

  const showToast = (msg) => { setToast(msg); };

  const handleNav = (p, data) => {
    if (p === "detail" && data) {
      setSelectedProvider(data);
      setPage("detail");
    } else if (p === "register-owner") {
      setPage("register-owner");
    } else if (p === "customer-dash") {
      if (!user) { setAuthMode("customer"); setShowAuth(true); }
      else setPage("customer-dash");
    } else if (p === "owner-dash") {
      if (!user) { setAuthMode("owner"); setShowAuth(true); }
      else setPage("owner-dash");
    } else if (p === "admin") {
      setPage("admin");
    } else {
      setPage(p);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = (role = "customer") => {
    setAuthMode(role);
    setShowAuth(true);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuth(false);
    if (userData.role === "owner") setPage("owner-dash");
    else if (userData.role === "admin") setPage("admin");
    else setPage("customer-dash");
    showToast(`Welcome back, ${userData.name}! 👋`);
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
    showToast("You've been logged out.");
  };

  const handleBook = (provider, meals) => {
    if (!user) {
      setAuthMode("customer");
      setShowAuth(true);
      return;
    }
    setBookingProvider(provider);
  };

  // Route
  const renderPage = () => {
    if (showAuth) {
      return (
        <AuthPage
          mode={authMode}
          onSuccess={handleAuthSuccess}
          onSwitch={(mode) => setAuthMode(mode)}
        />
      );
    }

    if (page === "admin" && user?.role === "admin") {
      return <AdminPanel user={user} onLogout={handleLogout} />;
    }

    if (page === "owner-dash" && user?.role === "owner") {
      return <OwnerDashboard user={user} onLogout={handleLogout} />;
    }

    if (page === "customer-dash" && user?.role === "customer") {
      return <CustomerDashboard user={user} onNav={handleNav} onLogout={handleLogout} />;
    }

    if (page === "register-owner") {
      return (
        <>
          <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} onNav={handleNav} currentPage={page} />
          <RegisterOwnerPage onSuccess={handleAuthSuccess} />
        </>
      );
    }

    if (page === "detail" && selectedProvider) {
      return (
        <>
          <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} onNav={handleNav} currentPage={page} />
          <DetailPage provider={selectedProvider} onBook={handleBook} onBack={() => setPage("browse")} />
        </>
      );
    }

    return (
      <>
        <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} onNav={handleNav} currentPage={page} />
        {page === "browse" ? (
          <BrowsePage onNav={handleNav} onBook={handleBook} />
        ) : (
          <HomePage onNav={handleNav} user={user} />
        )}
      </>
    );
  };

  const showNavbar = !["customer-dash", "owner-dash", "admin"].includes(page) && !showAuth;

  return (
    <>
      <GlobalStyles />
      {renderPage()}

      {/* Booking Modal */}
      {bookingProvider && (
        <BookingModal
          provider={bookingProvider}
          onClose={() => setBookingProvider(null)}
          onConfirm={() => { setBookingProvider(null); showToast("🎉 Tiffin booked successfully!"); }}
        />
      )}

      {/* FAB - WhatsApp */}
      {showNavbar && (
        <button className="fab" title="Chat on WhatsApp" onClick={() => showToast("Opening WhatsApp support...")}>
          <Icon name="whatsapp" size={24} color="white" />
        </button>
      )}

      {/* Toast */}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
