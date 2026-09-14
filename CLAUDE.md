@AGENTS.md

---

# Poseidon — Project Context for Future Sessions

## What this project is

**Poseidon** (formerly "Anveshan") is an AI-powered marine sonar debris detection platform. It takes a sonar image (PNG/JPEG), sends it to a Python FastAPI backend running a YOLO model, receives detection results, renders bounding boxes on a canvas, plots detections on a Leaflet map, and lets the user export a structured JSON/CSV report.

The product was originally named "Anveshan" (अन्वेषण, meaning "exploration" in Sanskrit). The frontend brand was redesigned to **Poseidon** in commit `3e3341c`.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 16.3.4 (App Router, `app/` directory) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 (PostCSS-native, `@tailwindcss/postcss`) |
| Animation | framer-motion 13 |
| WebGL background | ogl 1.0 (custom GLSL shader in `components/Aurora.tsx`) |
| Map | react-leaflet 5 + leaflet 1.9 |
| Icons | lucide-react 1.44 |
| Theming | next-themes 0.4 (class strategy, `defaultTheme="light"`) |
| Notifications | sonner 2 |
| Backend | Python FastAPI (`api/index.py`) — proxied via Next.js rewrites |
| Deployment | Vercel (Next.js frontend + `@vercel/python` for the API) |

---

## File structure — what matters

```
poseidonAI/
├── app/
│   ├── globals.css          ← Global styles, CSS brand tokens, Tailwind import
│   ├── layout.tsx           ← Root layout: fonts, Aurora colors, body classes, providers
│   ├── page.tsx             ← Landing page (/ route)
│   ├── login/page.tsx       ← Login page (/login route)
│   ├── console/page.tsx     ← Dashboard (/console route)
│   └── not-found.tsx        ← 404 page
├── components/
│   ├── Aurora.tsx           ← WebGL animated gradient background (ogl + GLSL)
│   ├── Navbar.tsx           ← Sticky rounded navbar with brand, nav links, settings dropdown
│   ├── Footer.tsx           ← Copyright + GitHub link
│   ├── AuthProvider.tsx     ← ⚠ BACKEND LOGIC — auth state, session storage, event bus
│   └── ThemeProvider.tsx    ← Thin wrapper around next-themes
├── api/
│   └── index.py             ← ⚠ BACKEND — Python FastAPI, YOLO inference, Roboflow
├── next.config.ts           ← Proxies /api/* → FastAPI on port 8000 in dev
├── vercel.json              ← Vercel build config (Next.js + Python)
└── requirements.txt         ← Python dependencies
```

---

## CRITICAL — Files you must not touch

These contain backend or auth logic. Changing them breaks functionality:

- `components/AuthProvider.tsx` — Auth state via `sessionStorage` and custom event bus. Session keys (`anveshan-authenticated`, `anveshan-username`, `anveshan-auth-change`) and the password (`anveshan2026`) are internal identifiers — **do not rename them even though the brand is now Poseidon**.
- `api/index.py` — Python FastAPI backend with YOLO inference.
- `next.config.ts` — API proxy config. Changing breaks backend connectivity.
- `vercel.json` — Deployment config.
- `requirements.txt` — Python deps.

The demo credentials shown in the login page hint are `admin` / `anveshan2026`. The password string **must stay as-is** in `AuthProvider.tsx` — it is the actual credential checked server-side.

---

## Color system (post-redesign)

The palette moved from **cyan/slate** to **warm amber/stone (sunrise)**. All Tailwind utility classes were updated in-place — there is no separate theme config file.

### Semantic roles

| Role | Light mode | Dark mode |
|---|---|---|
| Primary brand | `amber-500` (#F59E0B) | `amber-400` (#FBBF24) |
| Brand hover | `amber-400` | `amber-300` |
| Brand glow shadow | `shadow-amber-500/25` | `shadow-amber-500/30` |
| Accent | `orange-400–500` | `orange-400` |
| Page background | `stone-50` | `stone-950` |
| Card/surface | `white/60–80` | `stone-900/50` |
| Border | `stone-200` | `stone-800` |
| Text primary | `stone-900` | `stone-50` |
| Text secondary | `stone-600` | `stone-300` |
| Text muted | `stone-500` | `stone-400` |
| Selection | `amber-500/30` | `amber-500/30` |
| Error/danger | `red-*` (unchanged) | `red-*` |
| Success | `emerald-*` (unchanged) | `emerald-*` |
| Review flag | `orange-*` (unchanged) | `orange-*` |

### CSS brand tokens (globals.css)

```css
:root {
  --brand:       #f59e0b;
  --brand-light: #fbbf24;
  --brand-dark:  #d97706;
  --brand-glow:  rgba(245, 158, 11, 0.35);
  --accent:      #f97316;
}
.dark {
  --brand:       #fbbf24;
  --brand-light: #fcd34d;
  --brand-dark:  #f59e0b;
  --brand-glow:  rgba(251, 191, 36, 0.25);
  --accent:      #fb923c;
}
```

These are available as CSS custom properties but components primarily use Tailwind utilities directly.

---

## Aurora WebGL background

`Aurora.tsx` is a WebGL canvas that renders an animated simplex-noise gradient using the `ogl` library and a custom GLSL fragment shader. It takes three props that matter:

```tsx
<Aurora
  colorStops={["#F59E0B", "#F97316", "#D97706"]}  // amber → orange → amber-dark
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>
```

These are set in `app/layout.tsx` — the Aurora component itself was not modified. To change the aurora color, edit the `colorStops` array in `layout.tsx`. The shader handles light/dark mode blending automatically via a `uLightMode` uniform driven by next-themes.

---

## Brand mark

The navbar brand is a custom inline SVG (sunrise-trident) + "POSEIDON" wordmark defined directly in `Navbar.tsx` as the `PoseidonIcon` component:

```tsx
function PoseidonIcon({ className }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" ...>
      {/* Horizon line, rising sun arc, three rays */}
    </svg>
  );
}
```

The icon represents a sunrise arc over a horizon line with three rays — evoking both dawn and Poseidon's trident.

---

## Animation approach

All animation uses **framer-motion** (already a project dependency). The patterns used:

- **Hero entrance:** `initial={{ opacity: 0, y: N }} animate={{ opacity: 1, y: 0 }}` with staggered `delay` values (0.05 → 0.6s)
- **Scroll reveals:** `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true, margin: "-50px" }}`
- **Card stagger:** `custom={i}` index on `motion.div` with `variants.visible` computing `delay: i * 0.1`
- **Hover lifts:** `whileHover={{ y: -6 }}` on feature cards, gated by `useReducedMotion()`
- **Button glows:** CSS `shadow-amber-500/*` on hover via Tailwind (not framer-motion)
- **Theme transitions:** Global `transition-property: background-color, border-color, color` in `globals.css` with carve-out via `.no-theme-transition` class on buttons/CTAs to prevent them fighting framer-motion

Add `.no-theme-transition` to any element where the global 200ms color transition interferes with a framer-motion animation.

---

## Authentication flow

1. `AuthProvider.tsx` wraps the app and exposes `{ authenticated, authReady, login, logout, username }` via context.
2. State is read from `sessionStorage` using `useSyncExternalStore` — survives re-renders but not cross-tab.
3. `login(user, pass)` checks `user === 'admin' && pass === 'anveshan2026'` and sets session storage keys.
4. `logout()` clears session storage and dispatches the event.
5. `/console` redirects to `/login` if not authenticated (checked in `useEffect`).
6. `/login` redirects to `/console` if already authenticated.

---

## API integration

The console page (`app/console/page.tsx`) calls:

```
POST /api/process
Content-Type: multipart/form-data
Body: file=<image>
```

Response JSON shape (relevant fields):
```json
{
  "cleaned_image": "<base64 PNG>",
  "detections": [{ "bbox": [x,y,w,h], "class": "...", "final_confidence": 0.0, "flagged_for_review": false }],
  "report": [{ "detection_id": "...", "image_class": "...", "confidence": 0.0, "latitude": 0.0, "longitude": 0.0, "flagged_for_review": false, "is_real_location": false }],
  "is_real_location": false
}
```

In `next.config.ts`, `/api/*` is proxied to `http://127.0.0.1:8000/api/*` in development and to the Vercel Python function in production.

---

## Environment variables

```
DEMO_MODE=true                              # Enables demo mode in the backend
NEXT_PUBLIC_CARTO_API_KEY=...              # CartoDB tile API key for Leaflet map
ROBOFLOW_API_KEY=...                       # Roboflow model inference key (backend only)
ROBOFLOW_MODEL_ID=dev-manchanda/marine-sonar-debris/1
```

`NEXT_PUBLIC_CARTO_API_KEY` is the only client-side env var. Without it, the map falls back to unauthenticated CartoDB tiles (which may have rate limits).

---

## What was changed in the Poseidon redesign (commit 3e3341c)

| File | What changed |
|---|---|
| `app/globals.css` | Added CSS brand token variables, global 200ms theme transition, `.no-theme-transition` carve-out |
| `app/layout.tsx` | Title → "Poseidon", description updated, Aurora `colorStops` → amber/gold, body classes `slate` → `stone`, selection → amber |
| `app/page.tsx` | Full rewrite: new hero (badge + POSEIDON heading + tagline + copy + CTAs), process strip (4 steps), redesigned feature cards, CTA banner |
| `app/login/page.tsx` | Palette update only (cyan → amber, slate → stone); all auth logic untouched |
| `app/console/page.tsx` | Palette update (cyan → amber, slate → stone); download filenames `anveshan_report.*` → `poseidon_report.*` |
| `app/not-found.tsx` | Palette update (cyan → amber, slate → stone) |
| `components/Navbar.tsx` | Brand replaced: `PoseidonIcon` SVG + "POSEIDON" wordmark; cyan active states → amber; slate → stone throughout |
| `components/Footer.tsx` | Copyright "Anveshan" → "Poseidon"; amber hover on GitHub icon; slate → stone |

**Not changed:** `AuthProvider.tsx`, `Aurora.tsx`, `ThemeProvider.tsx`, `next.config.ts`, `vercel.json`, `api/`, `requirements.txt`, `package.json`

---

## Running locally

```bash
# Install JS dependencies (first time or after pulling)
npm install

# Start Next.js dev server (frontend only)
npm run dev

# To also run the Python backend:
pip install -r requirements.txt
uvicorn api.index:app --reload --port 8000

# Production build check
npm run build
```
