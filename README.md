# Bharatkumar & Sons Jewellers — Frontend

React 18 + Vite 6 + TypeScript storefront. Gujarati is the default language, with a one-click switch to English.

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Structure

```
src/
  main.tsx              providers: Router → Lang → Rates → Shop → LazyMotion
  App.tsx               routes (Home eager, every other page lazy-loaded)
  i18n/
    strings.ts          ALL UI text, { gu, en } per key
    LangContext.tsx     useLang() → t('key'), tx({gu,en}), lang, setLang
  data/                 ← swap these for API calls when the server exists
    types.ts            Product / Category / Rates / Store contracts
    categories.ts       category → sub-category tree + mega-menu groups
    products.ts         mock catalogue generator + query helpers
    rates.ts            metal rates + price formula (metal + making + stones + 3% GST)
    stores.ts           showroom list (PLACEHOLDER addresses/phones)
    images.ts           every photo ID in one place (Unsplash placeholders)
  store/ShopContext.tsx cart + wishlist (localStorage) and rates provider
  components/           Header (rate bar, mega menu, search, drawer), Footer, ProductCard, ui.tsx
  pages/                Home, Collection, ProductPage, Cart, Checkout, Wishlist, About, Stores, Search
  styles/               design tokens + global styles
```

## Common tasks

- **Add a sub-category:** add it to `children` in `data/categories.ts`, list its slug in a `groups` column, add an image pool in `data/images.ts` and a spec in `data/products.ts`. The mega menu, mobile drawer, filters and routes update automatically.
- **Add UI text:** add a key with `gu` and `en` to `i18n/strings.ts`, then use `t('your.key')`.
- **Use real photos:** replace IDs in `data/images.ts`. Full URLs (e.g. from your server or CDN) work as-is.
- **Connect the backend:** set `VITE_API_URL` in `.env` (see `.env.example`). `fetchRates()` already calls `GET {API}/rates`. Products, orders and newsletter calls are marked `TODO(backend)`.

## Placeholders to replace before launch

- Store addresses, phone numbers and hours: `data/stores.ts`
- Heritage stats (35+ years, 50,000+ families): `pages/Home.tsx` → `Heritage`
- Social links and email: `components/Footer.tsx`
- Metal rates are **mock values** until the API is connected: `data/rates.ts`
- All photos are Unsplash stock images: `data/images.ts`
