## 2026-09-01T18:15:32Z

You are the E2E Test Writer for the Luma Breathwork SEO & SSG project.
Your working directory is `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\test_writer_e2e_1`.

MANDATORY: You MUST read `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\ORIGINAL_REQUEST.md` and `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\PROJECT.md` before starting work.

DO NOT CHEAT. All test implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks:
1. Design and write an automated, requirement-driven E2E verification test script at `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\scripts\verify-seo-ssg.ts`.
2. The verification script must test all 4 tiers:
   - Tier 1 (Feature Coverage):
     - GSC Report exists at `docs/seo-gsc-audit-report.md` and has all required sections.
     - All 11 routes (`/`, `/timer`, `/guide/wim-hof-method`, `/retention-times`, `/science-and-safety`, `/apple-watch`, `/faq`, `/about`, `/medical-disclaimer`, `/privacy`, `/terms`) are generated in `dist/`.
     - Each route HTML contains unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta name="robots">`, Open Graph and Twitter Card tags.
   - Tier 2 (Boundary & Corner Cases):
     - Title lengths are within optimal limits (< 65 chars).
     - Meta description lengths are within optimal limits (100–165 chars).
     - Schema.org JSON-LD is valid, non-empty, and contains `@graph` array with appropriate types (`SoftwareApplication`, `HowTo`, `MedicalWebPage`, `FAQPage`, etc.).
     - Static HTML in `<div id="root">` contains actual DOM markup (length > 500 characters, contains section/h1/h2 tags, NOT empty `<div id="root"></div>`).
   - Tier 3 (Cross-Feature & Accessibility):
     - Heading hierarchy (H1 exists and is unique per route, H2-H3 structure present).
     - All `<img>` elements in static HTML have `alt` attributes or `aria-hidden`.
     - Sitemap.xml lists all 11 routes with valid priorities and formatting.
   - Tier 4 (Build & Integration):
     - TypeScript `tsc --noEmit` exits 0.
     - `npm run build` exits 0.
3. Test the script execution and ensure it can be run via `npx tsx scripts/verify-seo-ssg.ts`.
4. Create `TEST_INFRA.md` and `TEST_READY.md` at project root documenting how to run the verification suite and coverage summary.
5. Update `progress.md` frequently.
6. Write your completion report to `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\test_writer_e2e_1\handoff.md`.
7. Use `send_message` to notify the orchestrator when finished.
