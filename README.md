# HK Enterprise — Cinematic Industrial Hardware Website

A high-performance, cinematic product showcase and catalog website for **HK Enterprise** (Rajkot, Gujarat) — manufacturers of precision furniture fittings, bed clamps, knock-down sockets, hinges, L-corners, and heavy-duty hardware.

Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **TypeScript**, and **GSAP 3 with ScrollTrigger**.

---

## 🚀 Quick Start for Developers

### Prerequisites
- **Node.js** (v18+ recommended)
- **pnpm** or **npm**

### Development Server
```bash
# 1. Install dependencies
npm install
# or
pnpm install

# 2. Start Vite dev server
npm run dev
# or
pnpm dev
```
The app will run locally at: `http://localhost:8443` (or the port specified in `vite.config.ts`).

### Production Build & Format
```bash
# Type-check and compile optimized production build
npm run build

# Preview production build locally
npm run preview

# Format code using oxfmt
npm run format
```

---

## 🏗️ Architecture & Project Structure

The project is structured logically around modern modular React conventions:

```text
├── index.html                   # HTML entry point (fonts, metadata, root div)
├── vite.config.ts               # Vite configuration with Tailwind CSS v4 & React plugins
├── package.json                 # Dependencies and build scripts
├── public/                      # Static assets & hardware product photography
│   └── products/                # High-res product images organized by series:
│       ├── bed-clamp/           # 7" clamp, 1ll, 2ll, L clamp, 4" clamp, interlocking
│       ├── bed-soket/           # 4", 5", 6", 8" knock-down bed sockets
│       ├── hinges/              # T-hinges, butt hinges, table hinges, stone hinges
│       ├── l-corner/            # 1x1, 1x1ll, 1x2, 1x3, computer table corners
│       ├── bed-fittings/        # Spring jacks, gas lifts, storage fittings
│       └── lockpatti/           # CRC sheet lockpatti, sliding locks
└── src/
    ├── main.tsx                 # React DOM mount point & global styles import
    ├── App.tsx                  # App shell, hash router, global scroll & entrance animations
    ├── index.css                # Tailwind CSS v4 entry point & design system variables
    ├── types.ts                 # Central TypeScript interfaces (ProductItem, Category, Page)
    │
    ├── data/
    │   └── products.ts          # Single source of truth for company info & hardware catalog
    │
    ├── utils/
    │   └── navigation.ts        # Client-side hash navigation & animated smooth scroll-to-top
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx       # Sticky responsive navbar with mobile drawer
    │   │   └── Footer.tsx       # Industrial footer with address, phone & direct WhatsApp
    │   │
    │   ├── ui/
    │   │   ├── Brand.tsx        # HK Enterprise logo brandmark & typography
    │   │   ├── Button.tsx       # Standardized primary/secondary button component
    │   │   ├── Eyebrow.tsx      # Uppercase category / badge micro-header
    │   │   ├── Icon.tsx         # Handcrafted inline SVG icons (phone, mail, arrow, check)
    │   │   ├── LogoIntro.tsx    # Cinematic industrial brand opening animation
    │   │   ├── PageHero.tsx     # Reusable hero banner for internal pages
    │   │   └── ProductVisual.tsx# Product image frame with studio background & badge
    │   │
    │   └── home/
    │       ├── Hero.tsx         # Immersive landing hero with CTA and specs highlight
    │       ├── CinematicSequence.tsx # GSAP pinned scrub animation showing 7" clamp details
    │       └── ScrollCategories.tsx  # Pinned multi-product showcase with smooth selector
    │
    └── pages/
        ├── Home.tsx             # Homepage with Hero, Cinematic Sequence, Standards & Showcase
        ├── Products.tsx         # Filterable catalog grid with category pills & quick inquiry
        ├── ProductDetail.tsx    # Product view with image gallery, specs table & WhatsApp CTA
        ├── About.tsx            # Factory manufacturing capabilities & Rajkot heritage
        ├── Story.tsx            # Engineering philosophy, steel specs & quality testing
        └── Contact.tsx          # Direct inquiry form, factory location & WhatsApp order link
```

---

## 🧭 Client-Side Routing Guide

This application uses a zero-dependency **client-side hash router** (`src/utils/navigation.ts` and `src/App.tsx`).

### How It Works
- Navigating to `#products` loads `src/pages/Products.tsx`
- Navigating to `#about` loads `src/pages/About.tsx`
- Navigating to `#story` loads `src/pages/Story.tsx`
- Navigating to `#contact` loads `src/pages/Contact.tsx`
- Navigating to `#detail/<product-id>` (e.g. `#detail/bc-04`) loads `src/pages/ProductDetail.tsx`

### Programmatic Navigation
Always import the `navigate` function:
```tsx
import { navigate } from "../utils/navigation"

// Navigate to a page
navigate("products")

// Navigate to a product detail page
navigate("detail", "bc-04")
```
This utility automatically scrolls the viewport smoothly to the top and dispatches the hash change.

---

## 📦 How to Add or Modify Products

All product data is centralized in [`src/data/products.ts`](src/data/products.ts).

To add or update a product, simply update the `products` array with a `ProductItem` object:

```ts
{
  id: "bc-11",                     // Unique slug for URLs (e.g. #detail/bc-11)
  code: "HK-BC-111",               // Catalog SKU
  name: "Heavy Duty Bed Clamp",    // English title
  nameGu: "હેવી ડ્યુટી બેડ ક્લેમ્પ",  // Gujarati title (optional)
  category: "Bed Clamp",           // Category (must match types.ts Category)
  categoryName: "Bed Clamp Series",
  note: "Brief 1-line summary for product cards.",
  description: "Detailed description for the product detail page.",
  finish: "White Zinc Plated",     // Surface coating
  boltSize: "5 Aani Bolt",         // Bolt size
  thickness: "Light, Medium, Heavy",
  features: [
    "High-torque 90° corner locking",
    "Dual reinforcement ribs",
    "Zero-squeak anti-vibration joint"
  ],
  image: "/products/bed-clamp/my-clamp.jpg", // Primary image in public folder
  images: [                                 // Gallery images
    "/products/bed-clamp/my-clamp.jpg",
    "/products/bed-clamp/my-clamp-back.jpg"
  ],
  badge: "New Arrival"                      // Card chip
}
```

---

## 🎨 Styling & Design System

- **Tailwind CSS v4** is configured via `@tailwindcss/vite` in `vite.config.ts`.
- Global typography, variables, dark theme backgrounds (`#0a0b0d`), steel borders (`rgba(255,255,255,0.08)`), and industrial copper accents (`#f59e0b` / `#d97706`) are defined in [`src/index.css`](src/index.css).
- Standard spacing, layout classes, and typography are standard Tailwind utility classes.

---

## 🎬 GSAP Animations & Motion Guidelines

Animations are implemented with **GSAP 3** and **ScrollTrigger**:
- Always scope animations using `gsap.context(() => { ... }, containerRef)` to guarantee clean teardown on component unmount.
- Always check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` to respect accessibility settings.
- Pin animations (`CinematicSequence.tsx`, `ScrollCategories.tsx`) use `anticipatePin: 1` and responsive `ScrollTrigger.matchMedia()` conditions.
- On route changes, `ScrollTrigger.refresh()` is called to ensure recalculation of trigger start/end offsets.

---

## 📄 License & Ownership

Developed for **HK Enterprise**, Rajkot, Gujarat, India.
All rights reserved.

