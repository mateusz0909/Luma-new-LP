# Luma Breathwork — E2E Testing Infrastructure & Verification Architecture

## 1. Overview & Objectives

The Luma Breathwork testing infrastructure provides an automated, requirement-driven, 4-tier verification suite designed to validate full Static Site Generation (SSG), on-page SEO metadata, Schema.org JSON-LD structured data graphs, semantic DOM pre-rendering, image accessibility, and build pipeline integrity across all 11 production routes.

The primary verification engine is located at `scripts/verify-seo-ssg.ts` and can be executed natively in Node.js via `npx tsx scripts/verify-seo-ssg.ts`.

---

## 2. Four-Tier Verification Model

The verification architecture is partitioned into four distinct tiers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        4-TIER VERIFICATION SUITE                       │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 1: Feature Coverage & Core SEO Deliverables                       │
│  - GSC Audit Report (`docs/seo-gsc-audit-report.md`) section checks    │
│  - 11 SSG Route HTML generation in `dist/`                             │
│  - Mandatory metadata tags (<title>, <meta description>, canonical)   │
│  - Open Graph & Twitter Card tags presence                             │
│  - Title, description, and canonical URL uniqueness across all routes  │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 2: Boundary Limits, Schema.org Graph & Static DOM Markup          │
│  - Title SERP length limits (< 65 chars, optimal 15–64 chars)          │
│  - Meta description SERP length limits (100–165 chars)                 │
│  - Schema.org JSON-LD syntax, @graph array, and route type matching    │
│  - BreadcrumbList hierarchical schema validation on subpages           │
│  - Static DOM markup inside `<div id="root">` (> 500 chars, semantic) │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 3: Cross-Feature, Accessibility & Crawlability                    │
│  - Heading hierarchy (exactly 1 H1 per route)                          │
│  - Heading uniqueness (mutually distinct H1 copy across all routes)    │
│  - Image accessibility (all <img> tags have alt or aria-hidden)        │
│  - Sitemap.xml XML validity, 11 route inclusion, priorities & lastmod  │
│  - Robots.txt User-agent, Allow rules & Sitemap reference              │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 4: Build & Integration Pipeline                                   │
│  - TypeScript compilation check (`tsc --noEmit` exits 0)               │
│  - Full production build pipeline (`npm run build` exits 0)            │
│  - Static asset bundle generation in `dist/assets` (CSS & JS bundles)  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Inventory of Tested Routes

The verification suite evaluates all 11 routes defined in `PROJECT.md`:

| Route Path | Build Target | Canonical URL | Schema.org Type Requirements |
|---|---|---|---|
| `/` | `dist/index.html` | `https://luma-breath.work/` | `WebSite`, `SoftwareApplication` (or `WebApplication`) |
| `/timer` | `dist/timer/index.html` | `https://luma-breath.work/timer` | `WebApplication` + `BreadcrumbList` |
| `/guide/wim-hof-method` | `dist/guide/wim-hof-method/index.html` | `https://luma-breath.work/guide/wim-hof-method` | `HowTo` + `BreadcrumbList` |
| `/retention-times` | `dist/retention-times/index.html` | `https://luma-breath.work/retention-times` | `MedicalWebPage` + `BreadcrumbList` |
| `/science-and-safety` | `dist/science-and-safety/index.html` | `https://luma-breath.work/science-and-safety` | `MedicalWebPage` + `BreadcrumbList` |
| `/apple-watch` | `dist/apple-watch/index.html` | `https://luma-breath.work/apple-watch` | `SoftwareApplication` + `BreadcrumbList` |
| `/faq` | `dist/faq/index.html` | `https://luma-breath.work/faq` | `FAQPage` + `BreadcrumbList` |
| `/about` | `dist/about/index.html` | `https://luma-breath.work/about` | `ProfilePage` / `Organization` / `AboutPage` + `BreadcrumbList` |
| `/medical-disclaimer` | `dist/medical-disclaimer/index.html` | `https://luma-breath.work/medical-disclaimer` | `MedicalWebPage` / `WebPage` + `BreadcrumbList` |
| `/privacy` | `dist/privacy/index.html` | `https://luma-breath.work/privacy` | `WebPage` + `BreadcrumbList` |
| `/terms` | `dist/terms/index.html` | `https://luma-breath.work/terms` | `WebPage` + `BreadcrumbList` |

---

## 4. Execution Guide & CLI Options

### Standard Full Test Run
Executes all 4 tiers, including full `tsc --noEmit` and `npm run build`:
```bash
npx tsx scripts/verify-seo-ssg.ts
```

### Fast Mode (Skip Production Rebuild)
Runs all metadata, boundary, accessibility, and TypeScript checks against the currently built `dist/` directory without repeating `npm run build`:
```bash
npx tsx scripts/verify-seo-ssg.ts --skip-build
```

### Targeted Tier Execution
Run only specific tiers (e.g., Tier 1 and Tier 2):
```bash
npx tsx scripts/verify-seo-ssg.ts --tier=1,2
```

### Machine-Readable JSON Export
Generates an audit report JSON file at `scratch/e2e_verification_results.json`:
```bash
npx tsx scripts/verify-seo-ssg.ts --json
```

---

## 5. Exit Code & CI/CD Contract

- **Exit Code `0`**: All executed test checks passed (100% compliance).
- **Exit Code `1`**: One or more assertions failed. Detailed error diagnostic with route path, expected vs actual values, and character counts is printed to stderr/stdout.
