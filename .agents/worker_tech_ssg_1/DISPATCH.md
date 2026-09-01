## 2026-09-01T18:19:40Z
You are the Implementation Worker for Milestones 2 & 3: Technical SEO, HTML Metadata, Schema.org JSON-LD Graph, and React SSR SSG Prerender Pipeline.
Your working directory is `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\worker_tech_ssg_1`.

MANDATORY: You MUST read `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\ORIGINAL_REQUEST.md` and `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\PROJECT.md` before starting work.
Also read `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\survey_codebase_1\handoff.md` and `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\TEST_READY.md`.

Tasks:
1. Update `index.html`:
   - Add `<meta name="robots" content="index, follow" />`.
   - Add Open Graph image tags: `og:image:width` (1200), `og:image:height` (630), `og:image:alt` ("Luma Breathwork & Wim Hof Retention Timer App").
   - Ensure the JSON-LD `@graph` contains `WebSite`, `SoftwareApplication`, `Organization`, and `FAQPage`.
2. Update `src/App.tsx`:
   - Add optional `initialPath?: string` prop to `App`.
   - In SSR mode, use `initialPath` so the router renders the exact route component during server rendering.
   - Guard any browser-only APIs (`window`, `AudioContext`, `vibrate`, `localStorage`) to ensure safe SSR execution.
3. Update `src/main.tsx`:
   - Support `hydrateRoot` when `rootElement.hasChildNodes()`, fallback to `createRoot`.
4. Update `src/pages/HomePage.tsx`:
   - Convert dynamic `lazy()` import of `WebBreathingPacer` to direct static import to eliminate chunk splitting warnings and ensure complete SSR prerendering on the homepage.
5. Update `scripts/prerender.ts`:
   - Import `React` and `renderToString` from `react-dom/server`.
   - Import `App` from `../src/App`.
   - Update route definitions:
     - Ensure all titles are strictly under 64 characters to avoid search snippet truncation (e.g. `/timer` title: "Free Wim Hof Breathing Timer & Retention Stopwatch | Luma" [57 chars], `/science-and-safety` title: "Science of Wim Hof Breathwork: Studies & Safety | Luma" [54 chars]).
     - Ensure all descriptions are between 110–160 characters.
     - Standardize all 11 routes to use `{ "@context": "https://schema.org", "@graph": [ ... ] }`.
     - Expand the FAQ schema on `/faq` to cover all primary Q&As.
     - Ensure Open Graph tags include `og:image:width`, `og:image:height`, and `og:image:alt`.
     - In the generation loop, render `const appHtml = renderToString(React.createElement(App, { initialPath: route.path }))` and inject it into `<div id="root">${appHtml}</div>`.
     - Update sitemap.xml `<lastmod>` timestamps to current date.
6. Run build and verification:
   - Run `npm run build` (or `npx tsx scripts/prerender.ts`).
   - Run `npx tsx scripts/verify-seo-ssg.ts`.
   - Confirm TypeScript passes (`tsc --noEmit`), Vite builds cleanly, and all 11 static HTML files in `dist/**/index.html` contain full prerendered DOM in `<div id="root">`.
7. Update `progress.md` frequently.
8. Write your completion report to `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\worker_tech_ssg_1\handoff.md`.
9. Use `send_message` to notify the orchestrator when finished.
