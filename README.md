# ⚡ VoltEdge Electronics — Premium MERN Stack E-Commerce Platform

A production-ready, full-featured electronics shop built with the modern **MERN Stack** (MongoDB, Express/Next.js API Routes, React 19, Node.js) and the **Next.js App Router**, featuring custom glassmorphic styling, rich micro-animations, full shopping cart and checkout flows, and complete database persistence.

![VoltEdge Electronics Platform](https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&q=80)

---

## 🌟 Key Features

- **🎨 Modern Aesthetic**: Dark cyber-glass design system with CSS custom properties, neon accents, gradient borders, and responsive grid layouts.
- **📄 6+ Complete Webpages**:
  1. **Home (`/`)**: Hero banner with live stats, category pills, flash deals with countdown timer, featured product showcase, value props, customer reviews, and newsletter.
  2. **Shop (`/shop`)**: Full catalog with real-time text search, category filters, brand filters, price range slider, sort options, and empty states.
  3. **Product Detail (`/product/[slug]`)**: Dynamic product pages with badges, stock indicators, specs, key features list, quantity selector, add-to-cart feedback, and related items.
  4. **Cart (`/cart`)**: Persistent cart state (stored in `localStorage`), quantity controls, promo codes, shipping/tax calculation, and empty cart prompts.
  5. **Checkout (`/checkout`)**: Multi-step checkout with shipping address inputs, payment methods (Credit Card, UPI, Net Banking, COD), and order confirmation modal.
  6. **About Us (`/about`)**: Company vision, journey timeline, core values, leadership team, and operational statistics.
  7. **Contact (`/contact`)**: Interactive contact form with API submission, live status banners, interactive FAQ accordion, and office location cards.
  8. **Tech Blog (`/blog` & `/blog/[slug]`)**: Industry articles, buying guides, author bios, reading times, and category tags.
  9. **Custom 404 (`not-found.tsx`)**: Themed error page with search suggestions and navigation links.

- **🛒 State Management**: React Context (`CartContext`) with automatic `localStorage` synchronization for seamless cart persistence.
- **🍃 MongoDB & Mongoose Integration**:
  - Connection pooling with caching for serverless environments (`lib/mongodb.ts`)
  - Schemas with indexes and validation for Products, Blog Posts, and Contact inquiries (`models/`)
  - Graceful fallback to rich mock data if MongoDB is not connected, ensuring zero downtime!
- **⚡ Next.js App Router**: Partial Prerendering (PPR), Turbopack compilation, SEO meta tags on every page, and TypeScript strict mode.
- **🚀 Ready to Deploy**: Pre-configured for **Vercel**, **Docker**, **Docker Compose**, **Render**, and **Railway**.

---

## 📁 Project Architecture & File Breakdown

```text
electronics-shop/
├── app/
│   ├── layout.tsx                # Root layout with CartProvider, Navbar & Footer
│   ├── globals.css               # Design system tokens, variables & glassmorphism utilities
│   ├── not-found.tsx             # Custom branded 404 page
│   ├── page.tsx                  # Home page (Hero, Flash Deals, Features, Testimonials)
│   ├── about/
│   │   └── page.tsx              # About Us (Story, Values, Team, Timeline)
│   ├── contact/
│   │   └── page.tsx              # Contact Us (Interactive form, FAQ accordion, Support cards)
│   ├── shop/
│   │   ├── page.tsx              # Shop route with Suspense wrapper
│   │   └── ShopClient.tsx        # Filterable product grid with search & category filters
│   ├── product/
│   │   └── [slug]/
│   │       ├── page.tsx          # Dynamic product detail page
│   │       └── ProductDetailClient.tsx # Interactive quantity and Add-to-Cart controls
│   ├── cart/
│   │   └── page.tsx              # Full Cart view with item management & order summary
│   ├── checkout/
│   │   └── page.tsx              # Checkout flow with shipping form & payment options
│   ├── blog/
│   │   ├── page.tsx              # Tech blog listing with featured hero & category filters
│   │   └── [slug]/
│   │       └── page.tsx          # Blog article reader with related posts
│   └── api/
│       ├── products/
│       │   └── route.ts          # Products API with filtering, sorting, and MongoDB query
│       ├── contact/
│       │   └── route.ts          # Contact messages submission API
│       ├── blog/
│       │   └── route.ts          # Blog articles API
│       └── seed/
│           └── route.ts          # Database seed API for instant sample data loading
├── components/
│   ├── Navbar.tsx                # Sticky navbar with cart badge, search, and mobile navigation
│   ├── Footer.tsx                # Comprehensive footer with links, socials, and newsletter
│   └── ProductCard.tsx           # Product card with hover effects, rating, and quick add-to-cart
├── context/
│   └── CartContext.tsx           # Cart state management (add, remove, update qty, clear, total)
├── data/
│   └── mockData.ts               # Sample products, blog posts, categories, reviews, and stats
├── lib/
│   └── mongodb.ts                # Cached MongoDB connection pool for serverless & local
├── models/
│   ├── Product.ts                # Mongoose product schema with indexes
│   ├── Post.ts                   # Mongoose blog post schema
│   └── Contact.ts                # Mongoose contact message schema
├── types/
│   └── index.ts                  # TypeScript definitions for Products, Cart, Filters, Posts
├── scripts/
│   └── seed.mjs                  # CLI MongoDB seeder script
├── Dockerfile                    # Multi-stage production container build
├── docker-compose.yml            # Docker orchestration for Next.js + MongoDB
├── vercel.json                   # Vercel deployment configuration
├── DEPLOYMENT.md                 # Complete multi-platform deployment instructions
├── .env.example                  # Environment variable template
└── package.json                  # Scripts & dependencies
```

---

## 🛠️ Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
cd electronics-shop
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/voltedge?retryWrites=true&w=majority
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
> **Note:** The app works out of the box even without MongoDB! If no database is connected, it automatically falls back to rich sample data seamlessly.

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🍃 Database Setup & Seeding

### Seeding via Browser (Fastest)
Once the server is running, visit:
```
http://localhost:3000/api/seed
```
This automatically initializes MongoDB with all sample products and blog articles.

### Seeding via Command Line
```bash
npm run seed
```

---

## 🚀 Deployment Options

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for detailed step-by-step guides.

### 1. Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the repo at [vercel.com](https://vercel.com).
3. Set `MONGODB_URI` in Environment Variables.
4. Click **Deploy**.

### 2. Docker & Docker Compose
Run both the app and MongoDB in isolated containers:
```bash
docker compose up -d --build
```
Access the application at `http://localhost:3000`.

---

## 🔌 API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/products` | `GET` | Fetch products with query params: `category`, `brand`, `minPrice`, `maxPrice`, `sort`, `search`, `limit`, `page` |
| `/api/contact` | `POST` | Submit customer support inquiry (saved to MongoDB) |
| `/api/blog` | `GET` | Fetch blog articles or filter by `category` |
| `/api/seed` | `GET` / `POST` | Inspect database status or force re-seed sample products |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
