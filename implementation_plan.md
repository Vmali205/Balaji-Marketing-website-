# Balaji Marketing Vasai – Multi-Page Cookware Website

A modern, premium multi-page website for a wholesale tri-ply cookware business featuring a dynamic product catalogue, admin panel, and lead generation tools.

---

## Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | **Vite + React 18** | Fast dev server, excellent HMR, tree-shaking, optimal bundle sizes. React for component-based SPA. |
| **Routing** | **React Router v6** | SPA routing with nested routes, route guards for admin. |
| **Styling** | **Vanilla CSS + CSS Modules** | Maximum control, zero framework overhead. CSS custom properties for theming. |
| **Animations** | **Framer Motion** | Production-grade scroll animations, page transitions, layout animations. |
| **Hero Effect** | **CSS + Vanilla Canvas** | Lightweight metallic particle/shimmer effect. No Three.js needed — saves ~200KB, better mobile perf. |
| **Icons** | **Lucide React** | Clean, lightweight, premium icon set. |
| **Data Storage** | **JSON file** | `products.json` on server. Simple, zero-cost, read/write via PHP. |
| **Admin Backend** | **PHP** | Universally supported on Hostinger shared hosting. Lightweight API scripts. |
| **Auth** | **PHP Sessions** | Session-based login with `password_hash()`/`password_verify()`. Single admin user. |
| **Image Upload** | **PHP `move_uploaded_file()`** | Native PHP file upload handling. Images stored in `/uploads/` directory. |
| **Fonts** | **Google Fonts (Inter + Outfit)** | Inter for body, Outfit for headings. Clean modern sans-serif. |
| **Logo** | **Custom SVG** | Created to represent the cookware business — premium, metallic aesthetic. |
| **Hosting** | **Hostinger** | Static React build (`dist/`) + PHP API scripts deployed to `public_html/`. |

> [!IMPORTANT]
> **Hostinger Deployment Architecture:**
> - Vite builds React app → static files in `dist/` folder
> - Upload `dist/` contents to Hostinger's `public_html/`
> - PHP API scripts placed in `public_html/api/`
> - Product data stored in `public_html/api/data/products.json`
> - Uploaded images stored in `public_html/uploads/`
> - `.htaccess` configured for SPA routing (all routes → `index.html`)

---

## Confirmed Details

| Item | Value |
|------|-------|
| **WhatsApp Number** | 8754408847 |
| **Logo** | Custom SVG — metallic/premium cookware aesthetic |
| **Product Images** | User will provide real JPEG/PNG — stored in `/uploads/` on Hostinger |
| **Hero Effect** | CSS + Canvas metallic particle shimmer (lightweight, no Three.js) |
| **Hosting** | Hostinger shared hosting, domain already configured |
| **Admin Credentials** | Set in PHP config file on server (hashed password) |

---

## Design System

### Color Palette — "Forged Steel" Theme

```
Primary:        #1A1A2E (Deep Navy)        — backgrounds, depth
Secondary:      #16213E (Dark Slate)       — cards, sections  
Accent:         #C9A96E (Warm Gold)        — CTAs, highlights, premium feel
Accent Alt:     #E8D5B5 (Soft Champagne)   — subtle highlights
Surface:        #0F0F1A (Near Black)       — page background
Surface Light:  #F5F1EB (Warm Cream)       — light sections for contrast
Text Primary:   #FAFAFA (Off White)        — headings on dark
Text Secondary: #B8B8CC (Muted Lavender)   — body text on dark
Text Dark:      #1A1A2E                    — text on light backgrounds
Success:        #4ADE80                    — form success states
Error:          #F87171                    — form error states
Steel Gradient: linear-gradient(135deg, #2A2A3E, #3A3A5E, #2A2A3E)
Gold Gradient:  linear-gradient(135deg, #C9A96E, #E8D5B5, #C9A96E)
```

### Typography

```css
--font-heading: 'Outfit', sans-serif;      /* 600-700 weight */
--font-body: 'Inter', sans-serif;          /* 300-500 weight */
--font-size-hero: clamp(2.5rem, 5vw, 4.5rem);
--font-size-h1: clamp(2rem, 4vw, 3rem);
--font-size-h2: clamp(1.5rem, 3vw, 2.25rem);
--font-size-h3: clamp(1.25rem, 2.5vw, 1.75rem);
--font-size-body: clamp(0.95rem, 1.5vw, 1.1rem);
--font-size-small: 0.875rem;
```

### Spacing & Effects

```css
--container-max: 1280px;
--section-padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
--card-radius: 16px;
--button-radius: 12px;
--transition-default: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
/* Glassmorphism: backdrop-filter: blur(16px); background: rgba(26,26,46,0.7); */
```

---

## Project Structure

```
e:\Balaji Marketing Vasai Website\
│
├── src/                            # React frontend (Vite)
│   ├── main.jsx                    # Entry point
│   ├── App.jsx                     # Root component + routing
│   ├── index.css                   # Global styles + design tokens
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductCard.module.css
│   │   ├── CategoryFilter/
│   │   │   ├── CategoryFilter.jsx
│   │   │   └── CategoryFilter.module.css
│   │   ├── HeroCanvas/
│   │   │   ├── HeroCanvas.jsx       # Lightweight canvas particle effect
│   │   │   └── HeroCanvas.module.css
│   │   ├── WhatsAppButton/
│   │   │   ├── WhatsAppButton.jsx
│   │   │   └── WhatsAppButton.module.css
│   │   ├── AnimatedSection/
│   │   │   └── AnimatedSection.jsx
│   │   ├── Logo/
│   │   │   └── Logo.jsx             # SVG logo component
│   │   └── ProtectedRoute/
│   │       └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.module.css
│   │   ├── Catalogue/
│   │   │   ├── Catalogue.jsx
│   │   │   └── Catalogue.module.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.module.css
│   │   └── Admin/
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── ProductForm.jsx
│   │       └── Admin.module.css
│   │
│   ├── hooks/
│   │   ├── useProducts.js
│   │   └── useAuth.js
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   └── utils/
│       ├── api.js                  # API helper (fetch wrapper)
│       └── constants.js            # Categories, WhatsApp number, config
│
├── public/
│   ├── favicon.svg
│   └── images/                     # Static hero/about images
│
├── php/                            # PHP backend (deployed to public_html/api/)
│   ├── config.php                  # DB-free config, admin credentials (hashed)
│   ├── auth.php                    # Login/logout/check endpoints
│   ├── products.php                # CRUD endpoints for products
│   ├── upload.php                  # Image upload handler
│   ├── .htaccess                   # API routing + CORS headers
│   └── data/
│       └── products.json           # Product data store
│
├── index.html                      # Vite entry HTML with SEO meta
├── package.json
├── vite.config.js
├── .htaccess                       # SPA routing for Hostinger (root)
└── README.md
```

---

## Proposed Changes

### Phase 1 — Project Scaffolding & Design System

#### [NEW] Project Initialization
- `npx -y create-vite@latest ./` with React template
- Install: `react-router-dom`, `framer-motion`, `lucide-react`
- No Three.js or heavy 3D libraries needed

#### [NEW] [index.css](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/index.css)
- Complete design system via CSS custom properties
- Reset styles, typography scale, responsive utilities
- Animation keyframes: fadeIn, slideUp, shimmer, metallic-sheen, pulse
- Dark theme base with light section variants
- Steel texture patterns using CSS gradients

#### [NEW] [index.html](file:///e:/Balaji%20Marketing%20Vasai%20Website/index.html)
- SEO: `<title>`, `<meta description>`, Open Graph tags
- Google Fonts preconnect + loading (Inter + Outfit)
- Favicon

#### [NEW] [vite.config.js](file:///e:/Balaji%20Marketing%20Vasai%20Website/vite.config.js)
- Proxy `/api` requests to PHP dev server during development
- Build output configuration

#### [NEW] [constants.js](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/utils/constants.js)
- Categories array: Kadai, Fry Pan, Sauce Pan, Cook Pots, Wok, Lids, Mini Series
- WhatsApp number: `8754408847`
- API base URL configuration

---

### Phase 2 — Logo & Core Layout Components

#### [NEW] [Logo.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/components/Logo/Logo.jsx)
- Inline SVG logo — stylized cookware/flame motif with "Balaji Marketing" text
- Gold accent color on dark background
- Scalable, crisp at any size

#### [NEW] [Navbar.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/components/Navbar/Navbar.jsx)
- Sticky header with glassmorphism (backdrop-filter blur)
- SVG Logo + nav links: Home, About, Catalogue, Contact
- Mobile hamburger menu with slide-in overlay
- Active link highlighting via React Router
- Scroll-aware: transparent at top, solid background on scroll

#### [NEW] [Footer.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/components/Footer/Footer.jsx)
- 4-column layout: Brand, Quick Links, Categories, Contact Info
- WhatsApp link with number `8754408847`
- Copyright + subtle steel gradient border-top

#### [NEW] [WhatsAppButton.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/components/WhatsAppButton/WhatsAppButton.jsx)
- Fixed floating button (bottom-right corner)
- Pulse animation, green accent
- Opens `https://wa.me/918754408847` with pre-filled message

#### [NEW] [AnimatedSection.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/components/AnimatedSection/AnimatedSection.jsx)
- Framer Motion wrapper for scroll-triggered entrance animations
- Variants: fadeIn, slideUp, slideLeft, slideRight
- Configurable delay + threshold

---

### Phase 3 — Public Pages

#### [NEW] [Home.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/pages/Home/Home.jsx)

**Hero Section:**
- Full-viewport with deep gradient overlay
- Canvas-based metallic particle/shimmer effect behind text
- Headline: "Premium Tri-Ply Cookware — Crafted for Excellence"
- Two CTAs: "Browse Catalogue" (gold filled) + "Get Quote" (gold outline)

**Featured Categories Section:**
- 7 category cards in responsive grid
- Each: icon + name + hover scale/glow effect
- Clicking navigates to `/catalogue?category=<name>`

**Why Choose Us Section:**
- 4 value proposition cards (Premium Quality, Wholesale Pricing, Pan-India Delivery, Trusted Brand)
- Animated counters
- Steel card backgrounds with gold icon accents

**CTA Banner:**
- Full-width gold gradient
- "Ready to Stock Premium Cookware?" + WhatsApp + Contact buttons

#### [NEW] [HeroCanvas.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/components/HeroCanvas/HeroCanvas.jsx)
- Vanilla `<canvas>` element with floating metallic particles
- Subtle shimmer/sparkle effect — light, premium feel
- Responds to mouse position (parallax-like)
- Auto-pauses when not in viewport
- Reduced particles on mobile for performance

#### [NEW] [About.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/pages/About/About.jsx)
- Company story with elegant typography
- Mission & Vision glassmorphism cards
- "Why Tri-Ply?" section with layered diagram (CSS-illustrated)
- Values/quality commitment section
- Scroll-triggered animations throughout

#### [NEW] [Catalogue.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/pages/Catalogue/Catalogue.jsx)
- Category filter bar (horizontal scrollable pills)
- Responsive product grid (1→2→3→4 columns)
- Framer Motion `AnimatePresence` for smooth filter transitions
- Empty state for categories with no products
- Reads `?category=` from URL query params

#### [NEW] [ProductCard.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/components/ProductCard/ProductCard.jsx)
- Glassmorphism card with subtle metallic border
- Image with hover zoom effect
- Product name + category badge
- Size/variant chips
- **Conditional CTA:**
  - Has Amazon link → gold "View on Amazon" button → opens Amazon
  - No Amazon link → outline "Get Quote" button → WhatsApp message with product name

#### [NEW] [CategoryFilter.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/components/CategoryFilter/CategoryFilter.jsx)
- Horizontal pill buttons: "All" + 7 categories
- Active state: gold background
- Product count badge per category
- Smooth horizontal scroll on mobile

#### [NEW] [Contact.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/pages/Contact/Contact.jsx)
- Split layout: inquiry form + contact info card
- Form fields: Name, Email, Phone, Product Interest (dropdown), Message
- Client-side validation with error states
- Submit sends to WhatsApp or email (configurable)
- Contact info: Address, Phone (`8754408847`), Email, WhatsApp
- Business hours section

---

### Phase 4 — PHP Backend (Admin API)

#### [NEW] [config.php](file:///e:/Balaji%20Marketing%20Vasai%20Website/php/config.php)
- Admin username + hashed password
- CORS headers for development
- Session configuration
- Upload directory path
- `products.json` path

#### [NEW] [auth.php](file:///e:/Balaji%20Marketing%20Vasai%20Website/php/auth.php)
- `POST /api/auth.php?action=login` — validates credentials, starts session
- `POST /api/auth.php?action=logout` — destroys session
- `GET /api/auth.php?action=check` — returns auth status
- Uses `password_verify()` for secure comparison

#### [NEW] [products.php](file:///e:/Balaji%20Marketing%20Vasai%20Website/php/products.php)
- `GET /api/products.php` — returns all products (public, no auth needed)
- `POST /api/products.php` — create product (auth required)
- `PUT /api/products.php?id=xxx` — update product (auth required)
- `DELETE /api/products.php?id=xxx` — delete product + remove image (auth required)
- Reads/writes `data/products.json`

#### [NEW] [upload.php](file:///e:/Balaji%20Marketing%20Vasai%20Website/php/upload.php)
- Handles multipart image upload
- Validates file type (JPEG, PNG, WebP) and size (max 5MB)
- Generates unique filename
- Moves to `/uploads/` directory
- Returns image URL

#### [NEW] [products.json](file:///e:/Balaji%20Marketing%20Vasai%20Website/php/data/products.json)
- Initial empty array `[]`
- Products added via admin panel
- Each product:
```json
{
  "id": "unique-id",
  "name": "Tri-Ply Kadai 24cm",
  "category": "kadai",
  "image": "/uploads/kadai-24cm.jpg",
  "sizes": ["20cm", "22cm", "24cm"],
  "description": "Premium tri-ply stainless steel kadai...",
  "amazonLink": "https://amazon.in/...",
  "createdAt": "2026-04-18T00:00:00Z"
}
```

#### [NEW] [.htaccess (API)](file:///e:/Balaji%20Marketing%20Vasai%20Website/php/.htaccess)
- CORS headers for development
- PHP error handling

---

### Phase 5 — Admin Frontend

#### [NEW] [AuthContext.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/context/AuthContext.jsx)
- React Context providing `login()`, `logout()`, `isAuthenticated`
- Checks auth status on mount via `/api/auth.php?action=check`

#### [NEW] [ProtectedRoute.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/components/ProtectedRoute/ProtectedRoute.jsx)
- Wraps admin routes
- Redirects to `/admin` login if not authenticated
- Loading spinner during auth check

#### [NEW] [Login.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/pages/Admin/Login.jsx)
- Centered dark card with login form
- Username + password fields
- Error display for invalid credentials
- Redirects to `/admin/dashboard` on success
- No link from public navigation — accessed via `/admin` URL only

#### [NEW] [Dashboard.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/pages/Admin/Dashboard.jsx)
- Stats bar: total products, products per category
- Product table/grid with Edit + Delete action buttons
- "Add New Product" button (navigates to form)
- Category filter for quick lookup
- Delete confirmation modal
- Logout button in header

#### [NEW] [ProductForm.jsx](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/pages/Admin/ProductForm.jsx)
- Shared form for Add/Edit product
- Fields: Name, Category (dropdown of 7 categories), Description (textarea), Sizes (comma-separated input), Amazon Link (optional)
- Image upload with drag-and-drop + preview
- Validation: name, category, image required
- Success/error feedback

#### [NEW] [api.js](file:///e:/Balaji%20Marketing%20Vasai%20Website/src/utils/api.js)
- Fetch wrapper with base URL configuration
- Methods: `getProducts()`, `createProduct()`, `updateProduct()`, `deleteProduct()`
- Auth methods: `login()`, `logout()`, `checkAuth()`
- Handles FormData for image uploads

---

### Phase 6 — SEO, Deployment & Polish

#### SEO
- Per-page `<title>` and `<meta description>` via `document.title`
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Single `<h1>` per page, proper heading hierarchy
- Alt text on all images
- JSON-LD structured data for local business

#### Deployment Config
- **[NEW] [.htaccess (root)](file:///e:/Balaji%20Marketing%20Vasai%20Website/.htaccess)**
  - SPA fallback: all non-file routes → `index.html`
  - Cache headers for static assets
  - Gzip compression
  - Security headers

#### Performance
- Image lazy loading (`loading="lazy"`)
- Code splitting: admin pages via `React.lazy()`
- Vite tree-shaking + minification
- CSS Modules eliminate unused styles

#### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation
- Focus indicators
- WCAG AA color contrast

---

## Routing Map

| Path | Page | Access |
|------|------|--------|
| `/` | Home | Public |
| `/about` | About Us | Public |
| `/catalogue` | Catalogue (all products) | Public |
| `/catalogue?category=kadai` | Catalogue (filtered) | Public |
| `/contact` | Contact / Inquiry | Public |
| `/admin` | Admin Login | Public (form only) |
| `/admin/dashboard` | Product Management | 🔒 Protected |
| `/admin/products/new` | Add Product | 🔒 Protected |
| `/admin/products/:id/edit` | Edit Product | 🔒 Protected |

---

## Hostinger Deployment Plan

```
public_html/                        # Hostinger web root
├── index.html                      # React app entry (from dist/)
├── assets/                         # Vite built JS/CSS (from dist/assets/)
├── .htaccess                       # SPA routing + caching + gzip
├── api/                            # PHP backend
│   ├── config.php
│   ├── auth.php
│   ├── products.php
│   ├── upload.php
│   ├── .htaccess
│   └── data/
│       └── products.json
└── uploads/                        # Product images (uploaded via admin)
```

**Deployment Steps:**
1. Run `npm run build` locally → generates `dist/` folder
2. Upload `dist/` contents to `public_html/`
3. Upload `php/` contents to `public_html/api/`
4. Create `public_html/uploads/` directory with write permissions (755)
5. Set admin credentials in `config.php`
6. Upload root `.htaccess` for SPA routing

---

## Verification Plan

### Automated / Dev Testing
1. `npm run build` completes without errors
2. PHP API responds on `/api/products.php`
3. Auth flow: login → session → protected routes → logout
4. CRUD: create product → appears in catalogue → edit → delete

### Browser Testing
1. All 4 public pages render correctly with premium design
2. Responsive: 375px (mobile), 768px (tablet), 1440px (desktop)
3. Category filtering works with URL params and button clicks
4. Product cards show correct CTA (Amazon vs. Get Quote)
5. WhatsApp button opens with correct number `8754408847`
6. Admin: Login → Dashboard → Add/Edit/Delete product → Logout
7. Animations: scroll reveals, hover effects, page transitions
8. Hero canvas effect runs smoothly

### Post-Deploy Verification
- Test on live Hostinger URL
- Verify `.htaccess` SPA routing works (direct URL access to `/catalogue` etc.)
- Verify image uploads work on server
- Mobile device testing

---

## Execution Timeline

| Phase | Description | Est. Files |
|-------|-------------|------------|
| 1 | Project setup, dependencies, design system, config | 5-6 |
| 2 | Logo SVG, Navbar, Footer, WhatsApp button, AnimatedSection | 10-12 |
| 3 | Home, About, Catalogue, Contact + ProductCard, CategoryFilter, HeroCanvas | 16-18 |
| 4 | PHP backend: config, auth, products, upload | 6-7 |
| 5 | Admin frontend: Login, Dashboard, ProductForm, AuthContext, ProtectedRoute | 7-8 |
| 6 | SEO, .htaccess, polish, testing | Updates across files |

**Total: ~45-50 files**

---

## Dependencies (package.json)

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x"
  }
}
```

> [!TIP]
> Only **3 runtime dependencies** beyond React: `react-router-dom`, `framer-motion`, `lucide-react`. Lean bundle, fast loads.
