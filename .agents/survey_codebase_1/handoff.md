# Technical HTML & SSG Architecture Survey Report

## Executive Summary
This report provides a comprehensive, evidence-based audit of the **Luma Breathwork** codebase (`c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP`), evaluating technical SEO, HTML semantics, Schema.org JSON-LD structured data, metadata, asset optimization, and the prerender/SSG build pipeline to satisfy requirements **R2** and **R3**.

---

## 1. Observation

### 1.1 Codebase Architecture & Build Pipeline
- **Core Stack**:
  - `package.json` (lines 14–33): React 19 (`react` `^19.0.0`, `react-dom` `^19.0.0`), Vite 6 (`vite` `^6.2.0`, `@vitejs/plugin-react` `^5.0.4`), Tailwind CSS 4 (`@tailwindcss/vite` `^4.1.14`, `tailwindcss` `^4.1.14`), `motion` (`^12.23.24`), `lucide-react` (`^0.546.0`), `@vercel/analytics` (`^2.0.1`), `tsx` (`^4.21.0`), TypeScript (`~5.8.2`), `puppeteer` (`^25.9.0`), `serve-handler` (`^6.1.7`).
- **Build Scripts** in `package.json` (lines 6–13):
  ```json
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build && tsx scripts/prerender.ts",
    "build:ssg": "vite build && tsx scripts/prerender.ts && node scripts/prerender_puppeteer.js",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "lint": "tsc --noEmit"
  }
  ```
- **Vite Configuration** (`vite.config.ts`, lines 13–38):
  - Target `es2020`, `cssMinify: true`, `minify: 'esbuild'`.
  - Rollup manual chunking splitting: `vendor-react`, `vendor-motion`, `vendor-icons`, `vendor-analytics`, `vendor`.
  - Single warning observed during build: `WebBreathingPacer.tsx` is dynamically imported by `HomePage.tsx` via `lazy()` but statically imported by `TimerPage.tsx`.
- **Vercel Routing & Caching** (`vercel.json`, lines 1–51):
  - `cleanUrls: true`, `trailingSlash: false`.
  - Redirects: `/guide` -> `/guide/wim-hof-method` (permanent: true), `/science` -> `/science-and-safety` (permanent: true).
  - SPA Rewrites: `/((?!assets/|screenshots/|video/|.*\\..*).*)` -> `/index.html`.
  - Headers: Long-term caching (`max-age=31536000, immutable`) for `/assets/`, 24h stale-while-revalidate for screenshots/video, `X-Content-Type-Options: nosniff`.

### 1.2 Static Site Generation (SSG) & Prerender Investigation
- **Execution of `npm run build`**:
  - `npm run build` completes with exit code 0 (`tsc --noEmit` and `vite build` pass).
  - `scripts/prerender.ts` executes and outputs:
    - `dist/index.html` (7.87 kB)
    - `dist/timer/index.html`
    - `dist/guide/wim-hof-method/index.html`
    - `dist/retention-times/index.html`
    - `dist/science-and-safety/index.html`
    - `dist/apple-watch/index.html`
    - `dist/faq/index.html`
    - `dist/medical-disclaimer/index.html`
    - `dist/about/index.html`
    - `dist/privacy/index.html`
    - `dist/terms/index.html`
    - `dist/sitemap.xml`
  - **CRITICAL FINDING**: In all generated `dist/**/index.html` files from `npm run build`, `<div id="root"></div>` is **completely empty** (e.g. `dist/index.html` line 149 is `<div id="root"></div>`). The script `scripts/prerender.ts` only substitutes the `<title>`, `<meta>`, `<link rel="canonical">`, and `<script type="application/ld+json">` tags in the HTML `<head>`, but **does not prerender the React component DOM**.
- **Execution of `npm run build:ssg`**:
  - `scripts/prerender_puppeteer.js` spins up a local HTTP server and runs headless Puppeteer to load `http://localhost:<port>/<route>`.
  - When executed, Puppeteer threw a `TimeoutError: Navigation timeout of 30000 ms exceeded` on `page.goto(url, { waitUntil: 'domcontentloaded' })`.
  - Furthermore, Puppeteer is heavyweight, fragile in headless CI environments, and is bypassed completely by standard Vercel deployments (which invoke `npm run build`).

### 1.3 Technical SEO Audit: Meta Tags, Canonical, Open Graph, Twitter Cards
- **`index.html` (lines 1–51)**:
  - `<html lang="en">` (Present)
  - `<meta charset="UTF-8" />` (Present)
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` (Present)
  - `<meta name="google-site-verification" content="3Lp8xmpJBirPctDUZjUNoI6taGCiLxPM9t3WafXwtN8" />` (Present)
  - **Missing**: `<meta name="robots" content="index, follow" />` (Explicit robots directive).
  - `<link rel="canonical" href="https://luma-breath.work/" />` (Present and dynamically updated per route in `prerender.ts`).
  - Open Graph tags present: `og:type` ("website"), `og:site_name` ("Luma Breathwork"), `og:url`, `og:title`, `og:description`, `og:image` (`https://luma-breath.work/screenshots/1.webp`), `og:locale` (`en_US`).
  - **Missing OG Image dimensions**: `og:image:width` (1200), `og:image:height` (630), `og:image:alt`.
  - Twitter tags present: `twitter:card` ("summary_large_image"), `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`.
  - Font loading: High performance non-render-blocking `<link rel="preload" as="style" ...>` with `media="print" onload="this.media='all'"` and preconnects to `fonts.googleapis.com` and `fonts.gstatic.com`.
  - Critical inline CSS: `body { background-color: #000; color: #fff; margin: 0; padding: 0; }` prevents flash of unstyled/white content.

### 1.4 Schema.org JSON-LD Structured Data Audit
- **Homepage (`/`) in `index.html` & `prerender.ts`**:
  - Includes `@graph` with:
    1. `WebSite`: `@id: https://luma-breath.work/#website`, `name: Luma Breathwork`, `url: https://luma-breath.work/`, `publisher: Organization`.
    2. `SoftwareApplication`: `@id: https://luma-breath.work/#app`, `name: Luma — Breathwork & Retention Timer`, `operatingSystem: iOS, watchOS`, `applicationCategory: HealthApplication`, `offers: { price: "0.00", priceCurrency: "USD" }`, App Store URL, screenshots, logo.
    3. `FAQPage`: `@id: https://luma-breath.work/#faq` with 5 questions and answers.
- **Subpages in `scripts/prerender.ts`**:
  - `/timer`: `WebApplication` + `BreadcrumbList`.
  - `/guide/wim-hof-method`: `HowTo` with 5 `HowToStep` entities + `BreadcrumbList`.
  - `/retention-times`: `MedicalWebPage` + `BreadcrumbList`.
  - `/science-and-safety`: `MedicalWebPage` + `BreadcrumbList`.
  - `/apple-watch`: `SoftwareApplication` + `BreadcrumbList`.
  - `/faq`: `FAQPage` (contains only 3 Q&As in `prerender.ts` whereas `FAQPage.tsx` contains 20+ Q&As) + `BreadcrumbList`.
  - `/about`: `ProfilePage` + `Organization` + `BreadcrumbList`.
  - `/medical-disclaimer`: `MedicalWebPage` + `BreadcrumbList`.
  - Subpage JSON format: `prerender.ts` outputs raw array `[ {...}, {...} ]` instead of the more robust `@graph: [...]` wrapper.

### 1.5 Semantic HTML Hierarchy & Image Accessibility
- **Heading structure across pages**:
  - `HomePage.tsx`: H1 ("Breathe.") -> H2 ("PRACTICE ARCHITECTURE", "Try the Guided Pacer now.", "The Interface...", "NEW / APPEARANCE", "ECOSYSTEM...", "FAQ / KNOWLEDGE", "Start your breath practice.") -> H3 ("Your daily practice.", "Deep focus.", "Track everything.", theme names, feature names).
  - `TimerPage.tsx`: H1 ("Free Wim Hof Breathing Timer Online") -> H2 ("How to Use...", "30 Deep Power Breaths", "Retention Hold...", "15s Recovery Inhale", "Embed this...", "Want to master...") -> H3 ("Customizing...").
  - `GuidePage.tsx`: H1 ("How to Do Wim Hof Breathing Method: Step-by-Step Guide") -> H2 (numbered sections 1 to 7) -> H3 (step breakdowns).
  - `RetentionTimesPage.tsx`: H1 ("Wim Hof Retention Times: Averages, Benchmarks & Physiology Explained") -> H2 (numbered sections 1 to 5).
  - `ScienceSafetyPage.tsx`: H1 ("The Science & Safety of Wim Hof Breathwork...") -> H2 (landmark studies, autonomic, alkalosis, contraindications).
  - `AppleWatchPage.tsx`, `FAQPage.tsx`, `AboutPage.tsx`, `MedicalDisclaimerPage.tsx`, `PrivacyPage.tsx`, `TermsPage.tsx`: All maintain compliant H1 -> H2 -> H3 nesting.
- **Image & SVG Accessibility**:
  - Primary images have explicit `alt` attributes, `width`/`height` attributes where appropriate (e.g. logo: `width="40" height="40"`, icons: `width="48" height="48"`), and `loading="lazy"` / `decoding="async"`.
  - Logo on top navbar has `fetchpriority="high"`.
  - Purely decorative elements (such as duplicate marquee tracks) have `aria-hidden="true"` and `alt=""`.
  - Interactive icons have corresponding `aria-label` tags on buttons/links (e.g., `aria-label="Download Luma app from Apple App Store"`).

---

## 2. Logic Chain

1. **Prerender Gap**:
   - Observation 1.2 shows that `npm run build` produces static HTML files where `<div id="root"></div>` contains no markup.
   - Observation 1.2 shows that `build:ssg` (Puppeteer) is fragile, prone to 30s timeouts, and not invoked by default deployment commands (`npm run build`).
   - Therefore, search engine crawlers (Googlebot, Bingbot, social scrapers) that do not execute JavaScript immediately will receive an empty shell without any H1–H3 headings or body copy.
2. **React SSR Feasibility**:
   - Investigation of `src/App.tsx`, `src/pages/*`, and `src/components/*` shows that all components are written with standard React 19 TSX.
   - All browser-only APIs (`window`, `navigator.vibrate`, `AudioContext`, `wakeLock`) are safely guarded inside `useEffect` or user event handlers.
   - Therefore, `react-dom/server`'s `renderToString` can be invoked directly inside `scripts/prerender.ts` during `npm run build` to inject the rendered HTML into `<div id="root">...</div>` for all 11 routes in < 100ms with zero browser overhead and 100% determinism.
3. **Metadata & Open Graph Enhancements**:
   - Observation 1.3 shows missing `<meta name="robots" content="index, follow" />` and missing Open Graph image dimension tags (`og:image:width`, `og:image:height`).
   - Adding these to `index.html` and `scripts/prerender.ts` ensures maximum indexing compliance and instant social card preview rendering.
4. **Schema.org Rich Results Optimization**:
   - Observation 1.4 shows that subpages with multiple schemas use a JSON array rather than `@graph: [...]`, and the `/faq` route schema has only 3 questions instead of the full set.
   - Harmonizing schemas to use `@graph` and expanding the FAQ schema ensures Google Rich Snippets can parse all entities cleanly.

---

## 3. Caveats
- **Client Hydration with React 19**: When static HTML is prerendered with `renderToString`, `main.tsx` currently calls `createRoot(document.getElementById('root')!).render(...)`. For optimal SSR hydration without DOM replacement flicker, `hydrateRoot(document.getElementById('root')!, ...)` should be used when `root.hasChildNodes()` is true, falling back to `createRoot` otherwise.
- **Dynamic Import Warning**: In `HomePage.tsx`, `const WebBreathingPacer = lazy(() => import('../components/WebBreathingPacer'));` causes a Vite build chunk warning because `TimerPage.tsx` imports it statically. Converting `HomePage.tsx` to a direct static import eliminates the warning and allows the pacer to be fully rendered in SSG for the homepage.
- **External Network in SSG**: Node execution of `prerender.ts` does not make external HTTP requests, ensuring complete build independence from network conditions.

---

## 4. Conclusion

### Target Technical Inventory for Requirements R2 & R3:

| Requirement | Scope | Exact Files to Modify | Action Required |
|---|---|---|---|
| **R3 (SSG Prerender)** | Static HTML Generation | `scripts/prerender.ts`, `package.json`, `src/App.tsx`, `src/main.tsx`, `src/pages/HomePage.tsx` | 1. Integrate `react-dom/server` (`renderToString`) directly into `scripts/prerender.ts`.<br>2. Support `initialPath` prop in `src/App.tsx`.<br>3. Prerender full HTML into `<div id="root">${html}</div>` for all 11 routes during `npm run build`.<br>4. Update `src/main.tsx` to support `hydrateRoot`.<br>5. Remove fragile Puppeteer dependency from standard build. |
| **R2 (Technical SEO)** | Meta Tags & Head Markup | `index.html`, `scripts/prerender.ts` | 1. Add `<meta name="robots" content="index, follow" />`.<br>2. Add `og:image:width` ("1200"), `og:image:height` ("630"), `og:image:alt`.<br>3. Ensure route-specific meta descriptions and titles match target search queries. |
| **R2 (Schema.org)** | JSON-LD Structured Data | `index.html`, `scripts/prerender.ts` | 1. Standardize all JSON-LD blocks across all 11 routes using `@context` and `@graph: [...]`.<br>2. Expand FAQ schema on `/faq` to include all primary questions.<br>3. Ensure valid `SoftwareApplication`, `WebApplication`, `HowTo`, `MedicalWebPage`, `ProfilePage`, `Organization`, and `BreadcrumbList` schemas. |
| **R2 (HTML Semantics & Assets)** | Accessibility & Performance | `src/pages/HomePage.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx` | 1. Replace `lazy()` import with static import of `WebBreathingPacer` in `HomePage.tsx`.<br>2. Verify all image `alt` and SVG accessibility labels. |

---

## 5. Verification Method

To independently verify the implementation:

1. **Lint Check**:
   ```bash
   npm run lint
   ```
   *Expected: Clean exit code 0 without any TypeScript errors (`tsc --noEmit`).*

2. **Build & Prerender Check**:
   ```bash
   npm run build
   ```
   *Expected: Vite builds successfully without warnings, followed by `prerender.ts` generating all 11 routes in `dist/`.*

3. **Static HTML Inspection**:
   Inspect `dist/index.html`, `dist/timer/index.html`, `dist/guide/wim-hof-method/index.html`, etc.
   ```powershell
   Get-Content dist/index.html | Select-String -Pattern '<div id="root">'
   ```
   *Expected: `<div id="root">` contains full, pre-rendered semantic HTML with `<nav>`, `<h1`, `<h2`, `<main>`, `<section>`, and `<footer>` (NOT an empty `<div id="root"></div>`).*

4. **Schema.org Validation**:
   Validate JSON-LD syntax in `dist/index.html` and subpages against Schema.org specification (e.g., using Google Rich Results Test or standard JSON schema parsers).
