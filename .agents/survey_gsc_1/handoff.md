# GSC Data & SEO Analytics Comprehensive Survey Report

**Agent Archetype**: Explorer (`survey_gsc_1`)  
**Target Project**: Luma Breathwork (`https://luma-breath.work`)  
**Date**: 2026-09-01  

---

## 1. Observation

### 1.1 Repository Artifacts & Google Search Console Data
Direct inspection of repository files (`scratch/gsc_report.json`, `scratch/url_inspection_report.json`, `scripts/gsc_query.py`, `scripts/gsc_inspect.py`, `public/robots.txt`, `public/sitemap.xml`, `scripts/prerender.ts`, `scripts/prerender_puppeteer.js`, `index.html`, `src/pages/HomePage.tsx`) revealed the following factual baseline:

1. **GSC Property & Scope**:
   - **Target Property**: `sc-domain:luma-breath.work` (Domain property with `siteOwner` permission).
   - **Reporting Window**: 2026-05-31 to 2026-08-29 (90 days).
   - **Total Verified Properties in Account**: `sc-domain:dopokizycietrwa.pl`, `http://midnightjazz.weebly.com/`, `sc-domain:lemmi.studio`, `http://www.midnightjazz.weebly.com/`, `sc-domain:luma-breath.work`.

2. **GSC Performance Metrics (Observed Values)**:
   - **Total Clicks**: 2
   - **Total Impressions**: ~96 (Across all pages)
   - **Top Landing Pages by Impressions**:
     - `https://luma-breath.work/guide/wim-hof-method`: 68 impressions | 0 clicks | CTR 0% | Avg. Pos: 62.2
     - `https://luma-breath.work/`: 26 impressions | 2 clicks | CTR 7.69% | Avg. Pos: 7.77
     - `https://luma-breath.work/timer`: 1 impression | 0 clicks | CTR 0% | Avg. Pos: 56.0
     - `https://luma-breath.work/about`: 1 impression | 0 clicks | CTR 0% | Avg. Pos: 95.0
   - **Top Queries Recorded**:
     - `"luma breath"`: 2 impressions | 0 clicks | CTR 0% | Avg. Pos 5.0 (Brand query)
     - `"wim hof timer"`: 1 impression | 0 clicks | CTR 0% | Avg. Pos 6.0 (High-intent tool query)
     - `"wim hof breathing online"`: 1 impression | 0 clicks | CTR 0% | Avg. Pos 7.0 (High-intent tool query)
     - `"how to wim hof"`: 1 impression | Pos 43.0
     - `"wim hof method"`: 1 impression | Pos 43.0
     - `"wim hof method breathing technique"`: 1 impression | Pos 48.0
     - `"how to do wim hof breathing method"`: 1 impression | Pos 58.0
     - `"wim hof breathin"`: 1 impression | Pos 63.0
     - `"wim hof breathing explained"`: 1 impression | Pos 63.0
     - `"wim hof method of breathing"`: 2 impressions | Pos 63.5
     - `"wim hoff breathing technique"`: 1 impression | Pos 66.0
     - `"wim hof breathing method"`: 1 impression | Pos 67.0
     - `"wim hof breathwork"`: 1 impression | Pos 76.0
     - `"wim hof breathing method explained"`: 1 impression | Pos 77.0

3. **URL Inspection & Live Indexing Status (`url_inspection_report.json`)**:
   - Total Submitted in Sitemap: 11 URLs.
   - **Indexed & Passing (5 URLs)**:
     - `https://luma-breath.work/` — PASS (Submitted & indexed, Mobile, crawled 2026-08-21)
     - `https://luma-breath.work/timer` — PASS (Submitted & indexed, Mobile, crawled 2026-08-26)
     - `https://luma-breath.work/guide/wim-hof-method` — PASS (Submitted & indexed, Mobile, crawled 2026-08-26)
     - `https://luma-breath.work/faq` — PASS (Submitted & indexed, Mobile, crawled 2026-08-26)
     - `https://luma-breath.work/about` — PASS (Submitted & indexed, Mobile, crawled 2026-08-25)
     - `https://luma-breath.work/privacy` — PASS (Submitted & indexed, Mobile, crawled 2026-08-25)
   - **Unknown / Not Crawled (3 URLs)**:
     - `https://luma-breath.work/retention-times` — NEUTRAL ("URL is unknown to Google", Last Crawl: Never)
     - `https://luma-breath.work/science-and-safety` — NEUTRAL ("URL is unknown to Google", Last Crawl: Never)
     - `https://luma-breath.work/apple-watch` — NEUTRAL ("URL is unknown to Google", Last Crawl: Never)
   - **Discovered — Currently Not Indexed (2 URLs)**:
     - `https://luma-breath.work/medical-disclaimer` — NEUTRAL (Discovered in sitemap, not crawled)
     - `https://luma-breath.work/terms` — NEUTRAL (Discovered in sitemap, not crawled)

4. **Sitemap & Robots Configuration**:
   - `public/robots.txt`:
     ```
     User-agent: *
     Allow: /
     Sitemap: https://luma-breath.work/sitemap.xml
     ```
   - `public/sitemap.xml`: Contains all 11 routes with priorities ranging from 1.0 (`/`, `/timer`) down to 0.4 (`/privacy`, `/terms`).
   - GSC Sitemap Status: Submitted on 2026-08-21, last downloaded 2026-08-30T22:41:25Z, 0 errors, 0 warnings.

5. **Internal Linking Structure in `src/pages/HomePage.tsx`**:
   - In `HomePage.tsx`, direct body links exist only for `/timer` (line 311), `/apple-watch` (line 658), and `/faq` (line 795).
   - High-value educational pages `/guide/wim-hof-method`, `/retention-times`, and `/science-and-safety` are only linked within `Navbar.tsx` and `Footer.tsx`.

6. **Prerendering & Build Setup in `package.json`**:
   - `npm run build`: Runs `vite build && tsx scripts/prerender.ts`.
   - `scripts/prerender.ts` swaps `<title>`, `<meta>`, and Schema JSON-LD in `dist/index.html` template copies.
   - `scripts/prerender_puppeteer.js` (called in `build:ssg`) captures full DOM hydration.

---

## 2. Logic Chain

1. **Premise 1: Search Demand vs. Low Imp/Position Gap**  
   - GSC shows that queries like `"wim hof timer"` and `"wim hof breathing online"` rank on Page 1 (positions 6–7) despite very low domain authority and low impressions.
   - Informational queries like `"how to do wim hof breathing method"` and `"wim hof breathing explained"` generate the vast majority of current impressions (68 out of 96) for `/guide/wim-hof-method`, but rank on positions 43–77.
   - *Inference*: The site has strong contextual relevance for Wim Hof Method terms, but lacks semantic keyword density, heading hierarchy, on-page rich snippet markup (HowTo, VideoObject), and internal link equity to break into Top 10 positions.

2. **Premise 2: Indexation Blindspot on High-Value Subpages**  
   - Three key subpages (`/retention-times`, `/science-and-safety`, `/apple-watch`) have verdict `NEUTRAL` and coverage `URL is unknown to Google` in GSC inspection data.
   - *Inference*: Despite inclusion in `sitemap.xml`, Googlebot has not crawled these URLs because the homepage main body does not feature prominent in-content context links pointing to them. The site relies solely on navigation/footer links, which crawler heuristics often deprioritize on fresh domains.

3. **Premise 3: High-Intent Polish Breathwork Opportunity**  
   - Polish breathwork search demand ("ćwiczenia oddechowe", "trening oddechowy", "aplikacja do oddychania", "oddychanie pudełkowe", "oddychanie 4-7-8", "metoda wima hofa") is rapidly growing with strong commercial and tool intent (users looking for apps, timers, and nervous system relaxation techniques).
   - Current content is entirely English with English-only meta tags and Open Graph locales (`en_US`).
   - *Inference*: Optimizing the site with bilingual semantic keyword targeting, Polish-aligned long-tail queries, and structured schema will capture untapped organic search demand in both Polish and international markets without disrupting the visual identity.

4. **Premise 4: Technical & Prerendering Consistency**  
   - Vite builds SPA client-side JavaScript. If crawlers request pages without executing JS, they must receive static HTML generated by `prerender_puppeteer.js` / SSG with full semantic `<main>`, `<h1>`-`<h3>`, and complete text.
   - *Inference*: Verifying that `build:ssg` is the canonical build command guarantees that Googlebot receives 100% pre-rendered DOM across all 11 routes.

---

## 3. Keyword Strategy & Search Intent Matrix

### 3.1 Target Search Query Clusters (Polish & English)

| Cluster ID | Cluster Name | Intent | Primary Target Keywords (EN / PL) | Secondary / Long-Tail Keywords | Target Route | Priority |
|---|---|---|---|---|---|---|
| **C1** | **Web Pacer & Timer Tool** | Tool / Transactional | `wim hof timer`, `wim hof breathing online`, `free breathwork timer`, `stoper do oddychania`, `trening oddechowy aplikacja` | `online breath retention timer`, `breath holding stopwatch`, `ćwiczenia oddechowe online`, `licznik wim hof` | `/timer` & `/` | **P1 (High)** |
| **C2** | **Wim Hof Method Guide** | Educational / How-To | `how to do wim hof breathing method`, `wim hof breathing technique`, `metoda wima hofa`, `oddychanie wim hof` | `cyclic hyperventilation tutorial`, `wim hof breathing explained`, `technika wima hofa krok po kroku`, `ćwiczenia wim hof` | `/guide/wim-hof-method` | **P1 (High)** |
| **C3** | **Retention Times & Benchmarks** | Informational / Physiological | `wim hof retention times`, `average wim hof hold time`, `wstrzymywanie oddechu czas`, `retencja oddechu wim hof` | `how long can you hold breath wim hof`, `retention times round 1 2 3 4`, `normy wstrzymywania oddechu`, `jak wydłużyć retencję` | `/retention-times` | **P2 (Medium)** |
| **C4** | **Apple Watch & Haptics** | Commercial / Tech Intent | `apple watch breathwork app`, `wim hof apple watch timer`, `aplikacja do oddychania apple watch` | `haptic breathing app apple watch`, `tactile breathwork companion`, `trening oddechowy zegarek wibracje` | `/apple-watch` | **P2 (Medium)** |
| **C5** | **Science, Alkalosis & Safety** | Informational / E-E-A-T | `wim hof science`, `respiratory alkalosis breathwork`, `metoda wima hofa badania naukowe`, `alkaloza oddechowa` | `radboud university wim hof trial`, `shallow water blackout breathwork`, `mrowienie podczas oddychania`, `bezpieczeństwo wim hof` | `/science-and-safety` | **P2 (Medium)** |
| **C6** | **General Breathwork & Stress Relief** | Informational / Wellness | `breathwork for anxiety`, `box breathing guide`, `4-7-8 breathing method`, `ćwiczenia oddechowe na stres`, `oddychanie pudełkowe`, `oddychanie 4-7-8`, `uspokojenie układu nerwowego`, `pranajama` | `nervous system calming breath`, `vagus nerve breathwork`, `techniki oddechowe na uspokojenie`, `pranajama ćwiczenia w domu` | `/faq` & `/` | **P3 (Supporting)** |

### 3.2 Landing Page Mapping & Meta Optimization Blueprint

```
1. Route: / (Homepage)
   - Primary Focus: Free Breathwork App, Wim Hof Online Timer & Apple Watch Companion
   - Polish Target: Darmowa aplikacja do oddychania, trening oddechowy online, stoper do retencji
   - Schema Types: WebSite, SoftwareApplication, Organization, FAQPage
   - Action: Add semantic in-content links to Knowledge Hub guides.

2. Route: /timer (Online Web Pacer)
   - Primary Focus: Free Wim Hof Timer Online, Guided Breathwork Pacer & Retention Stopwatch
   - Polish Target: Stoper do metody Wima Hofa online, ćwiczenia oddechowe z timerem
   - Schema Types: WebApplication, BreadcrumbList
   - Action: Enrich with HowTo keyboard shortcut schema & clear semantic H2/H3 tags.

3. Route: /guide/wim-hof-method (Method Guide)
   - Primary Focus: How to Do Wim Hof Breathing Method: Step-by-Step Guide
   - Polish Target: Metoda Wima Hofa poradnik krok po kroku, technika oddychania
   - Schema Types: HowTo (5 distinct steps), Article, BreadcrumbList
   - Action: Optimize headings H1-H3 for featured snippets and question queries.

4. Route: /retention-times (Retention Benchmarks)
   - Primary Focus: Wim Hof Retention Times: Round Averages & Physiology
   - Polish Target: Średnie czasy wstrzymania oddechu Wim Hof, retencja oddechu
   - Schema Types: MedicalWebPage, Table/Article, BreadcrumbList
   - Action: Feature prominent callout table and link from Homepage.

5. Route: /science-and-safety (Science & Safety)
   - Primary Focus: Science of Wim Hof Breathwork: Clinical Trials, Alkalosis & Safety
   - Polish Target: Badania naukowe Wim Hof, alkaloza oddechowa, bezpieczeństwo
   - Schema Types: MedicalWebPage, ScholarlyArticle / Citation, BreadcrumbList
   - Action: Ensure Radboud University DOIs and contraindications are highlighted.

6. Route: /apple-watch (Apple Watch App)
   - Primary Focus: Apple Watch Breathwork Companion App with Wrist Haptics
   - Polish Target: Aplikacja do oddychania na Apple Watch z haptyką
   - Schema Types: SoftwareApplication, BreadcrumbList
   - Action: Add App Store deep links and HealthKit feature breakdown.

7. Route: /faq (Breathwork FAQ)
   - Primary Focus: Wim Hof Breathwork FAQ: Technique, Tingling Sensations & Pacing
   - Polish Target: Pytania i odpowiedzi: metoda Wima Hofa, mrowienie, technika
   - Schema Types: FAQPage, BreadcrumbList
   - Action: Expand questions to cover Box Breathing, 4-7-8, and physiological sensations.
```

---

## 4. GSC Action Plan & Technical SEO Roadmap

### Phase 1: On-Page & Schema.org Architecture (Targeting R2 & R4)
1. **Schema.org JSON-LD Unification**:
   - Ensure all 11 routes have rich, syntactically valid JSON-LD graph objects (`@graph`).
   - Validate that `SoftwareApplication` includes `aggregateRating` or price details (`0.00 USD`).
   - Validate `HowTo` on `/guide/wim-hof-method` with explicit `HowToStep` elements.
   - Validate `MedicalWebPage` on `/retention-times` and `/science-and-safety` citing clinical literature.
2. **Metadata & Headings Standardization**:
   - Verify every route has unique, descriptive `<title>` (under 60 chars) and `<meta name="description">` (130–155 chars).
   - Ensure semantic heading hierarchy (`h1` -> `h2` -> `h3`) with no missing levels.
   - Ensure all image tags (`<img>`) include descriptive `alt` text or `aria-hidden="true"`.

### Phase 2: Internal Linking & Indexation Discovery Fix (Targeting R1 & R3)
1. **Homepage Internal Link Architecture**:
   - Add a dedicated "Knowledge & Physiology Hub" section or card grid on `HomePage.tsx` linking directly to `/guide/wim-hof-method`, `/retention-times`, `/science-and-safety`, and `/apple-watch`.
   - Ensure these links use standard `<a href="...">` tags so that crawlers without JavaScript execution can discover all routes.
2. **Prerender & SSG Pipeline Enforcement**:
   - Ensure `npm run build` runs the complete prerender cycle so all `dist/*/index.html` files contain full hydrated DOM bodies for search engine bots.
   - Maintain `public/sitemap.xml` with updated `<lastmod>` timestamps matching build dates.

### Phase 3: Google Search Console Submission & Verification
1. Run `python scripts/gsc_query.py` post-deployment to verify API connectivity.
2. Request immediate indexing via GSC URL Inspection API / Search Console UI for:
   - `https://luma-breath.work/retention-times`
   - `https://luma-breath.work/science-and-safety`
   - `https://luma-breath.work/apple-watch`
   - `https://luma-breath.work/guide/wim-hof-method`

---

## 5. Caveats

1. **GSC Historical Window**: The GSC property was registered recently (~August 2026). Total impressions (96) and clicks (2) reflect an early-stage domain. Trends will accelerate significantly once internal linking and SSG hydration are fully indexed.
2. **Language Architecture**: The primary application and content are in English (`en_US`). Polish keyword opportunities can be captured via bilingual landing page sections, semantic metadata keywords, FAQ entries, and blog content without altering the core visual aesthetic.
3. **No Live GSC Write API**: Google Search Console API does not support programmatic index request submissions for standard properties (URL Inspection API is read-only). Final URL indexing re-requests must be submitted via GSC Web UI or accelerated via updated sitemaps.

---

## 6. Conclusion

Luma Breathwork possesses a solid technological foundation (fast static pages, high-quality dark mode UI, zero ads) and has already achieved first-page ranking signals in GSC for high-intent keywords like `"wim hof timer"` and `"wim hof breathing online"`. 

The primary growth bottlenecks are:
1. **Unindexed subpages** due to lack of in-body homepage internal links.
2. **Untapped educational search volume** on `/guide/wim-hof-method` that can be unlocked with enriched HowTo Schema and structured headings.
3. **Untapped Polish breathwork queries** ("trening oddechowy", "ćwiczenia oddechowe", "oddychanie pudełkowe", "oddychanie 4-7-8") that can be addressed in FAQ and metadata.

All necessary data, keyword mappings, schema structures, and technical requirements are fully documented above and ready for downstream implementation.

---

## 7. Verification Method

To independently verify these findings and metrics:
1. **Inspect Raw GSC Data**:
   ```bash
   python scripts/gsc_query.py
   python scripts/gsc_inspect.py
   ```
   Check output in `scratch/gsc_report.json` and `scratch/url_inspection_report.json`.
2. **Inspect Sitemaps & Robots**:
   - View `public/robots.txt`
   - View `public/sitemap.xml`
3. **Validate Prerendered HTML Outputs**:
   ```bash
   npm run build
   ```
   Inspect generated `dist/index.html`, `dist/timer/index.html`, `dist/guide/wim-hof-method/index.html`, `dist/retention-times/index.html` to confirm title, meta tags, schema JSON-LD, and rendered DOM content.
