# Project: Luma Breathwork Comprehensive SEO & Technical Optimization

## Architecture
- **Framework**: React 19 + TypeScript + Vite 6 + Tailwind CSS 4 + Motion + Lucide Icons.
- **Hosting & Infrastructure**: Vercel (`vercel.json` with clean URLs, immutable asset caching, and security headers).
- **Prerendering / SSG Architecture**: Native React SSR (`react-dom/server` `renderToString`) inside `scripts/prerender.ts` with client-side `hydrateRoot` in `src/main.tsx`. Produces fully hydrated static HTML for all 11 routes in `dist/` during `npm run build`.
- **Search Analytics & Indexing**: Google Search Console integration (`scripts/gsc_query.py`, `scripts/gsc_inspect.py`, `scratch/gsc_report.json`), `public/robots.txt`, `public/sitemap.xml`, and comprehensive report in `docs/seo-gsc-audit-report.md`.
- **Structured Data**: Schema.org JSON-LD `@graph` architecture with `WebSite`, `SoftwareApplication`, `WebApplication`, `HowTo`, `MedicalWebPage`, `ProfilePage`, `Organization`, `BreadcrumbList`, and `FAQPage`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | GSC Audit & Analytics Report | Comprehensive GSC analysis (impressions, CTR, rankings, query clusters, indexation gaps) documented in `docs/seo-gsc-audit-report.md`. | M1 | R1 |
| 2 | Polish & EN Keyword Strategy Matrix | 6-cluster keyword matrix mapping high-intent breathwork terms to landing pages and guides. | M1 | R1, R4 |
| 3 | Technical Metadata Optimization | Explicit `<meta name="robots" content="index, follow" />`, Open Graph image dimensions (`1200x630`, `alt`), canonical URLs, optimized `<title>` and `<meta name="description">` across all 11 routes. | M2 | R2 |
| 4 | Schema.org JSON-LD Graph Unification | Standardize JSON-LD across all 11 routes using `@graph` notation with full validation for SoftwareApplication, HowTo, MedicalWebPage, and expanded FAQPage. | M2 | R2 |
| 5 | Semantic HTML & Accessibility Standards | Proper single H1 per route, clean H2-H3 hierarchy, semantic `<article>` containers for feature cards, image `alt` attributes, and `aria-hidden` decorative tags. | M2, M4 | R2, R4 |
| 6 | Native React SSR Static Site Generation | Implement `react-dom/server` (`renderToString`) in `scripts/prerender.ts`, route prop in `App.tsx`, and `hydrateRoot` in `src/main.tsx` to generate full pre-rendered HTML in `dist/**/index.html` during `npm run build`. | M3 | R3 |
| 7 | High-End Content & Keyword Enhancement | Natural integration of target Polish & English breathwork keywords in `HomePage.tsx`, `FAQPage.tsx`, and guides while preserving Awwwards-tier visual design and luxury dark mode aesthetic. | M4 | R4 |
| 8 | Build, Prerender & E2E Validation | Passing `npm run lint` (`tsc --noEmit`), `npm run build`, full static HTML verification in `dist/`, Schema validation, and adversarial verification. | M5 | Verification |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | GSC Audit & Keyword Report | Generate `docs/seo-gsc-audit-report.md` with full GSC analysis, query matrix, indexation status, and roadmap. | None | DONE |
| M2 | Technical HTML, Meta & Schema.org | Update `index.html`, `scripts/prerender.ts`, and component metadata/schema to standard `@graph` and full SEO tags. | M1 | DONE |
| M3 | React SSR Prerender / SSG Pipeline | Update `scripts/prerender.ts`, `src/App.tsx`, `src/main.tsx`, and `package.json` to generate full static HTML during `npm run build`. | M2 | DONE |
| M4 | Content & Semantic Headings Polish | Enhance `src/pages/HomePage.tsx`, `FAQPage.tsx`, and navigation copy with target keywords, H1-H3 semantics, and `<article>` tags. | M2 | DONE |
| M5 | Final E2E Build, Prerender & Audit Gate | Run full test suite, verify `dist/` static files, pass Reviewer, Challenger, and Forensic Auditor gates. | M1, M2, M3, M4 | DONE |

## Interface Contracts
### Prerendering Contract (`scripts/prerender.ts` ↔ `src/App.tsx`)
- `src/App.tsx` accepts an optional `initialPath?: string` prop.
- When `initialPath` is provided (during SSR execution in `prerender.ts`), `App` initializes with that route.
- `scripts/prerender.ts` imports `React` and `renderToString` from `react-dom/server`, calls `renderToString(React.createElement(App, { initialPath: route }))`, and injects the resulting HTML into `<div id="root">${bodyHtml}</div>`.
- `src/main.tsx` checks `if (rootElement.hasChildNodes()) { hydrateRoot(rootElement, <App />); } else { createRoot(rootElement).render(<App />); }`.

### Schema.org Graph Contract (`index.html` & `scripts/prerender.ts`)
- Every route output in `dist/*/index.html` contains `<script type="application/ld+json">` with `{ "@context": "https://schema.org", "@graph": [ ... ] }`.
- Entities use standard `@id` references (`https://luma-breath.work/#website`, `https://luma-breath.work/#app`, etc.).

## Code Layout
- `src/App.tsx`: Top-level router and application shell (supports SSR `initialPath`).
- `src/main.tsx`: Client hydration / mounting entry point (`hydrateRoot`).
- `src/pages/`: Page components (`HomePage.tsx`, `TimerPage.tsx`, `GuidePage.tsx`, `RetentionTimesPage.tsx`, `ScienceSafetyPage.tsx`, `AppleWatchPage.tsx`, `FAQPage.tsx`, `AboutPage.tsx`, `MedicalDisclaimerPage.tsx`, `PrivacyPage.tsx`, `TermsPage.tsx`).
- `src/components/`: Reusable UI components (`Navbar.tsx`, `Footer.tsx`, `WebBreathingPacer.tsx`, etc.).
- `scripts/prerender.ts`: Static site generator executing SSR render and metadata/schema injection.
- `docs/seo-gsc-audit-report.md`: Authoritative GSC audit and search analytics report.
- `public/`: Static assets (`robots.txt`, `sitemap.xml`, screenshots, icons, audio).
- `dist/`: Static build output with pre-rendered HTML for all 11 routes.
