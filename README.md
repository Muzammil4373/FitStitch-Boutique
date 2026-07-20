# FitStitch Boutique — Storefront (Phase 2)

Customer-facing React storefront for The FitStitch Boutique. This is
Phase 2 of the project (Phase 1 = backend API, not yet built). Product
data currently comes from `src/data/products.js` — swap this for real
API calls via `src/utils/api.js` once the backend is live.

## Stack

React 18 · Vite · Tailwind CSS · Framer Motion · Swiper.js · React Router · Axios

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Environment Variables

Copy `.env.example` to `.env` and set your backend URL once Phase 1 is deployed:

```
VITE_API_URL=http://localhost:5000/api
```

Until then, the Contact and Business Partner forms will attempt the API
call, and fall back to a local success state so the flow can still be
demoed end-to-end.

## Project Structure

```
src/
  components/     Navbar, Footer, ProductCard, QuickViewModal, HeroSlider,
                   ReviewCard, StitchDivider (signature motif), FloatingControls,
                   LoadingScreen
  pages/          Home, Shop, ProductDetail, Cart, Wishlist, Contact,
                   BusinessPartner, StaticPage (FAQs/policies)
  context/        CartContext.jsx — cart + wishlist state (localStorage)
  data/           products.js (mock catalog), staticContent.js (policy copy)
  utils/          whatsapp.js (order message builder), api.js (axios client)
```

## Key Features Implemented

- Luxury loading screen + hero slider (Swiper, autoplay + fade)
- Sticky navbar with search, wishlist, cart badge counts, WhatsApp icon
- Homepage: new arrivals, featured/trending collections, shop by category,
  best sellers, customer reviews rail, business partner CTA, embedded
  store map
- Shop page: category filter, search, sort, empty state
- Product detail: gallery with hover-zoom, size/qty selection, related
  products, "Buy via WhatsApp" (opens wa.me with pre-filled order message)
- Cart: quantity controls, remove, subtotal, WhatsApp checkout
- Wishlist (persisted to localStorage)
- Contact + Business Partner forms (ready to wire to backend enquiry routes)
- Signature brand motif: a "running stitch" divider/underline used
  throughout, referencing the FitStitch name
- Reduced-motion support, visible focus states, responsive down to mobile

## WhatsApp Order Flow

`src/utils/whatsapp.js` builds a `wa.me` link with a pre-filled message
in the exact format from the brief:

```
Hello FitStitch,

I would like to order:

Product Name: ...
Color: ...
Size: ...
Quantity: ...

Please confirm availability.
```

This is used by both the product detail "Buy via WhatsApp" button and
the cart checkout button (which lists every cart item).

## Not Yet Built (next phases)

- Backend REST API + MongoDB models (Products, Orders, Reviews, etc.)
- Admin dashboard (product/order/enquiry/banner/review management)
- Operator dashboard (restricted product/stock management)
- Real product images via Cloudinary (currently placeholder images)
- Newsletter subscription, Instagram gallery, dark/light mode toggle

## Build

```bash
npm run build
```

Outputs a production build to `dist/`, ready to deploy to Vercel or similar.
# FitStitch-Boutique
