# BRIEFING — 2026-09-01T18:14:45Z

## Mission
Audit codebase architecture, SSG / prerendering setup, and technical SEO (HTML tags, JSON-LD, meta tags, assets, prerender pipeline) for Luma LP.

## 🔒 My Identity
- Archetype: explorer
- Roles: investigator, technical SEO and SSG specialist
- Working directory: c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\survey_codebase_1
- Original parent: ded17e39-c9f1-45af-9c55-b7728f9d6ded
- Milestone: codebase-survey

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Base findings on verifiable facts, exact file paths, line numbers, and build/execution evidence

## Current Parent
- Conversation ID: ded17e39-c9f1-45af-9c55-b7728f9d6ded
- Updated: not yet

## Investigation State
- **Explored paths**: `package.json`, `index.html`, `vite.config.ts`, `vercel.json`, `scripts/prerender.ts`, `scripts/prerender_puppeteer.js`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/pages/*`, `src/components/*`, `public/*`, `dist/*`, `scratch/*`
- **Key findings**:
  1. Standard build `npm run build` runs `vite build && tsx scripts/prerender.ts` which modifies `<title>`, `<meta>`, and Schema JSON-LD, but leaves `<div id="root"></div>` empty.
  2. `build:ssg` runs Puppeteer which is fragile (times out in headless test) and is not run by default build pipelines (Vercel uses `npm run build`).
  3. React SSR (`react-dom/server`) can be directly integrated into `scripts/prerender.ts` using `renderToString(<App initialPath={route.path} />)` to generate full static HTML in <100ms with zero browser overhead.
  4. Missing meta tags: `<meta name="robots" content="index, follow" />`, Open Graph image dimensions (`og:image:width`, `og:image:height`, `og:image:alt`), route-specific OG images where relevant.
  5. JSON-LD in `scripts/prerender.ts` replaces root schema but outputs an array rather than `@graph` notation in some subpages; FAQ JSON-LD on `/faq` only has 3 items while page has 20 items.
- **Unexplored areas**: None, full codebase inspected.

## Key Decisions Made
- Producing detailed 5-component handoff report with exact observations, logic chains, caveats, conclusions, and verification methods.

## Artifact Index
- handoff.md — Comprehensive technical SEO & SSG investigation report
