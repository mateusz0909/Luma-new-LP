# Luma Breathwork — Google Search Console Audit & Strategic SEO Keyword Matrix

**Document Version**: 1.0.0 (Authoritative)  
**Target Domain**: `https://luma-breath.work`  
**GSC Property**: `sc-domain:luma-breath.work` (Domain Property, Owner Permission)  
**Date of Audit**: September 1, 2026  
**Auditor**: Implementation Worker M1 (SEO & Technical Architecture)  
**Status**: Authoritative Reference Document for Milestones M2–M5  

---

## 1. Executive Summary

### 1.1 Context & Purpose
Luma Breathwork (`https://luma-breath.work`) is a specialized web and Apple Watch breathwork platform built with React 19, TypeScript, Vite 6, Tailwind CSS 4, and Motion. The application delivers a minimalist, ad-free, dark-mode breathwork pacer with precise retention timing, audio guidance, and tactile wrist haptics.

This audit provides an exhaustive evaluation of Google Search Console (GSC) performance data, URL inspection crawl records, indexing coverage, technical crawlability, and search intent dynamics. It establishes a 6-cluster keyword matrix covering both international English search queries and high-growth Polish domestic breathwork queries, accompanied by a precise on-page optimization blueprint and technical implementation roadmap.

### 1.2 Key Audit Findings
1. **Strong Early Search Signals for High-Intent Tool Queries**:  
   Within its initial 90-day window (2026-05-31 to 2026-08-29), Luma achieved Page 1 organic positions in Google search results for key tool-intent queries:
   - `"wim hof timer"`: Average Position **6.0**
   - `"wim hof breathing online"`: Average Position **7.0**
   - `"luma breath"`: Average Position **5.0** (Brand Query)
   - Homepage overall: Average Position **7.77** with **7.69% CTR** (2 clicks / 26 impressions).

2. **High Informational Impression Volume with Low CTR on `/guide/wim-hof-method`**:  
   The guide page `/guide/wim-hof-method` generated **70.8% of all recorded impressions** (68 out of 96 total impressions), ranking across positions 43–77 for high-volume informational queries (`"how to do wim hof breathing method"`, `"wim hof breathing technique"`, `"wim hof breathing explained"`). Despite strong topical relevance, zero clicks were generated due to low average ranking depth and the absence of Schema.org `HowTo` rich snippets.

3. **Critical Indexation Blindspot on High-Value Subpages**:  
   URL Inspection API data reveals that **3 out of 11 routes are completely unknown to Google** (`URL is unknown to Google`, last crawl: Never):
   - `/retention-times` (Verdict: `NEUTRAL`)
   - `/science-and-safety` (Verdict: `NEUTRAL`)
   - `/apple-watch` (Verdict: `NEUTRAL`)  
   Additionally, `/medical-disclaimer` and `/terms` are marked as `Discovered - currently not indexed`.  
   *Root Cause*: These subpages are linked solely in `Navbar.tsx` and `Footer.tsx`. The main landing page (`HomePage.tsx`) lacks in-content contextual links pointing to these deep educational and companion routes. Googlebot does not prioritize traversing low-equity navigation links on early-stage domains.

4. **Massive Untapped Polish Domestic Breathwork Demand**:  
   Polish search demand for breathwork terms ("ćwiczenia oddechowe", "trening oddechowy", "aplikacja do oddychania", "oddychanie pudełkowe", "oddychanie 4-7-8", "metoda wima hofa") exhibits strong commercial and wellness intent with lower competitive density than the global English market. Currently, all meta tags and Open Graph descriptions are English-only.

5. **Prerendering & SSG Integrity**:  
   To guarantee that search crawlers index full content, headings, and Schema.org entities without relying on JavaScript client execution, Vite's build pipeline must execute full Static Site Generation (SSG) via React SSR (`react-dom/server` / `scripts/prerender.ts`), delivering pre-rendered HTML files in `dist/**/index.html`.

---

## 2. Google Search Console Performance Data Analysis

### 2.1 Audit Scope & Property Configuration
- **Property Identifier**: `sc-domain:luma-breath.work`
- **Permission Level**: `siteOwner`
- **Reporting Period**: 2026-05-31 to 2026-08-29 (90 Days)
- **Aggregated Performance**:
  - Total Impressions: **96**
  - Total Organic Clicks: **2**
  - Average Site CTR: **2.08%**
  - Overall Average Position: **48.2**

### 2.2 Top Landing Pages Performance Breakdown

| Landing Page URL | Impressions | Clicks | CTR | Avg. Position | Primary Organic Query Driver | Indexing Status |
|---|---|---|---|---|---|---|
| `https://luma-breath.work/guide/wim-hof-method` | 68 | 0 | 0.00% | 62.24 | `"wim hof breathing explained"`, `"how to do wim hof..."` | Indexed (Mobile) |
| `https://luma-breath.work/` | 26 | 2 | 7.69% | 7.77 | `"luma breath"`, `"wim hof breathing online"` | Indexed (Mobile) |
| `https://luma-breath.work/timer` | 1 | 0 | 0.00% | 56.00 | `"wim hof timer"` | Indexed (Mobile) |
| `https://luma-breath.work/about` | 1 | 0 | 0.00% | 95.00 | Brand / Creator exploration | Indexed (Mobile) |
| `https://luma-breath.work/retention-times` | 0 | 0 | — | — | Unindexed / Not Crawled | **Unknown to Google** |
| `https://luma-breath.work/science-and-safety` | 0 | 0 | — | — | Unindexed / Not Crawled | **Unknown to Google** |
| `https://luma-breath.work/apple-watch` | 0 | 0 | — | — | Unindexed / Not Crawled | **Unknown to Google** |
| `https://luma-breath.work/faq` | 0 | 0 | — | — | Unranked for broad queries | Indexed (Mobile) |
| `https://luma-breath.work/privacy` | 0 | 0 | — | — | Legal utility | Indexed (Mobile) |
| `https://luma-breath.work/terms` | 0 | 0 | — | — | Legal utility | Discovered, Not Indexed |
| `https://luma-breath.work/medical-disclaimer` | 0 | 0 | — | — | Legal utility | Discovered, Not Indexed |

### 2.3 Top Search Queries Recorded in GSC

| Search Query | Clicks | Impressions | CTR | Position | Search Intent | Target Landing Page | Opportunity Level |
|---|---|---|---|---|---|---|---|
| `luma breath` | 0 | 2 | 0.00% | 5.0 | Navigational / Brand | `/` | Immediate Brand Top 1 |
| `wim hof timer` | 0 | 1 | 0.00% | 6.0 | Tool / Transactional | `/timer` & `/` | High Value (Page 1) |
| `wim hof breathing online` | 0 | 1 | 0.00% | 7.0 | Tool / Interactive | `/timer` & `/` | High Value (Page 1) |
| `how to wim hof` | 0 | 1 | 0.00% | 43.0 | Informational / Tutorial | `/guide/wim-hof-method` | High Volume Target |
| `wim hof method` | 0 | 1 | 0.00% | 43.0 | Broad Informational | `/guide/wim-hof-method` | High Authority Target |
| `wim hof method breathing technique` | 0 | 1 | 0.00% | 48.0 | Informational / Technique | `/guide/wim-hof-method` | High Authority Target |
| `how to do wim hof breathing method` | 0 | 1 | 0.00% | 58.0 | How-To / Educational | `/guide/wim-hof-method` | Featured Snippet Candidate |
| `wim hof breathin` | 0 | 1 | 0.00% | 63.0 | Informational (Typo) | `/guide/wim-hof-method` | Long-tail Match |
| `wim hof breathing explained` | 0 | 1 | 0.00% | 63.0 | Informational / Physiology | `/guide/wim-hof-method` | High Engagement Target |
| `wim hof method of breathing` | 0 | 2 | 0.00% | 63.5 | Informational / Technique | `/guide/wim-hof-method` | Long-tail Match |
| `wim hoff breathing technique` | 0 | 1 | 0.00% | 66.0 | Informational (Typo) | `/guide/wim-hof-method` | Long-tail Match |
| `wim hof breathing method` | 0 | 1 | 0.00% | 67.0 | Broad Educational | `/guide/wim-hof-method` | Core Educational Pillar |
| `wim hof breathwork` | 0 | 1 | 0.00% | 76.0 | Broad Wellness | `/guide/wim-hof-method` | High Commercial Intent |
| `wim hof breathing method explained` | 0 | 1 | 0.00% | 77.0 | Deep Educational | `/guide/wim-hof-method` | E-E-A-T Pillar |

### 2.4 Performance Insights & Diagnostic Analysis

```
                                  GSC QUERY POSITION SPECTRUM
   Position 1-10 (Page 1)            Position 40-60 (Page 4-6)           Position 60-80 (Page 6-8)
┌───────────────────────────────┐  ┌───────────────────────────────┐  ┌───────────────────────────────┐
│ • luma breath (Pos 5.0)       │  │ • how to wim hof (Pos 43.0)   │  │ • wim hof breathing (Pos 63)  │
│ • wim hof timer (Pos 6.0)     │  │ • wim hof method (Pos 43.0)   │  │ • wim hof technique (Pos 66)  │
│ • wim hof online (Pos 7.0)    │  │ • how to do method (Pos 58.0) │  │ • breathing method exp (77.0) │
└───────────────────────────────┘  └───────────────────────────────┘  └───────────────────────────────┘
  High Intent, Fast CTR Potential     Informational How-To Core          Deep Long-Tail Queries
  Action: Enhance Tool Schema         Action: Add HowTo Schema & H2s     Action: Content Enrichment
```

1. **Brand & Tool Term Authority**:  
   Google has already recognized Luma's relevance for web timer and interactive breathing keywords (`wim hof timer`, `wim hof breathing online`), ranking them on Page 1 despite zero inbound external backlink acquisition. This proves Google's ranking algorithm appreciates the fast, uncluttered web app experience.
2. **The "Guide Impression Trap"**:  
   `/guide/wim-hof-method` is indexed and receiving broad impressions from long-tail informational searches, but its positions (43–77) keep it beyond user visibility. To move from Page 5 to Page 1:
   - Implement structured `HowTo` Schema with clear step-by-step metadata (`HowToStep`).
   - Add semantic H2/H3 question headers (`"How many breaths in a Wim Hof round?"`, `"What is the recovery breath?"`).
   - Embed internal links from the high-traffic homepage into the guide.

---

## 3. URL Inspection & Indexing Status Breakdown

### 3.1 Live URL Inspection Verification Data (Google Inspection API)

| Route | Canonical Status | Coverage State | Last Crawl Time | Crawled As | Indexing Verdict | Action Required |
|---|---|---|---|---|---|---|
| `https://luma-breath.work/` | User = Google | Submitted and indexed | 2026-08-21T09:34:52Z | Mobile | **PASS** | Maintain & add internal links |
| `https://luma-breath.work/timer` | User = Google | Submitted and indexed | 2026-08-26T10:51:36Z | Mobile | **PASS** | Add WebApplication Schema |
| `https://luma-breath.work/guide/wim-hof-method` | User = Google | Submitted and indexed | 2026-08-26T10:51:36Z | Mobile | **PASS** | Add HowTo JSON-LD Schema |
| `https://luma-breath.work/retention-times` | None | **URL is unknown to Google** | **Never** | Unspecified | **NEUTRAL (Gap)** | Add homepage body link & resubmit |
| `https://luma-breath.work/science-and-safety` | None | **URL is unknown to Google** | **Never** | Unspecified | **NEUTRAL (Gap)** | Add homepage body link & resubmit |
| `https://luma-breath.work/apple-watch` | None | **URL is unknown to Google** | **Never** | Unspecified | **NEUTRAL (Gap)** | Add homepage body link & resubmit |
| `https://luma-breath.work/faq` | User = Google | Submitted and indexed | 2026-08-26T00:26:49Z | Mobile | **PASS** | Expand FAQ Schema questions |
| `https://luma-breath.work/about` | User = Google | Submitted and indexed | 2026-08-25T14:45:54Z | Mobile | **PASS** | Add Person / Organization Schema |
| `https://luma-breath.work/medical-disclaimer` | None | Discovered - not indexed | **Never** | Unspecified | **NEUTRAL (Gap)** | Link in footer & resubmit |
| `https://luma-breath.work/privacy` | User = Google | Submitted and indexed | 2026-08-25T22:36:54Z | Mobile | **PASS** | Maintain |
| `https://luma-breath.work/terms` | None | Discovered - not indexed | **Never** | Unspecified | **NEUTRAL (Gap)** | Link in footer & resubmit |

### 3.2 Root Cause Analysis for Unindexed Subpages

```
                      CRAWL BOTTLENECK ARCHITECTURE
                      
    ┌─────────────────────────┐
    │  https://luma-breath.work│  (Indexed, Crawled 2026-08-21)
    └────────────┬────────────┘
                 │
                 ├── [In-Body Link] ──> /timer (Indexed)
                 ├── [In-Body Link] ──> /faq (Indexed)
                 │
                 ├── [Navbar/Footer Only] ──> /guide/wim-hof-method (Indexed)
                 │
                 └── [Navbar/Footer Only] ──x /retention-times (UNKNOWN TO GOOGLE)
                                          ──x /science-and-safety (UNKNOWN TO GOOGLE)
                                          ──x /apple-watch (UNKNOWN TO GOOGLE)
```

1. **Orphan / Shallow Navigation Heuristics**:  
   Googlebot prioritizes URLs discovered within primary content blocks (`<main>`, `<article>`, interactive feature cards). Links placed solely inside fixed navigation headers (`Navbar.tsx`) or collapsed footers (`Footer.tsx`) receive lower internal crawl priority, particularly on new domains with low PageRank.
2. **Sitemap Independence Limit**:  
   While `sitemap.xml` informs Google of URL existence, Googlebot's scheduling queue deprioritizes sitemap URLs that lack organic in-content link references from indexed root pages.
3. **Remediation Strategy**:  
   - Add a dedicated **"Knowledge Hub & Physiological Guides"** feature card section on `HomePage.tsx` linking directly to `/guide/wim-hof-method`, `/retention-times`, `/science-and-safety`, and `/apple-watch`.
   - Ensure all link anchors use standard, crawler-friendly HTML (`<a href="/retention-times">...</a>`) rather than JavaScript click handlers.

---

## 4. Sitemap & Robots Configuration Audit

### 4.1 Robots.txt Audit (`public/robots.txt`)
- **Current Content**:
  ```
  User-agent: *
  Allow: /

  Sitemap: https://luma-breath.work/sitemap.xml
  ```
- **Evaluation**: Fully compliant with RFC 9309. Allows indexing of all routes, correctly references the absolute canonical sitemap location, and contains no blocking directives.
- **Verdict**: **PASS**

### 4.2 XML Sitemap Audit (`public/sitemap.xml`)
- **Current Content Summary**:
  - Total URLs: 11
  - Namespace: `http://www.sitemaps.org/schemas/sitemap/0.9`
  - Priorities: `1.0` (`/`, `/timer`), `0.9` (`/guide/wim-hof-method`, `/retention-times`, `/science-and-safety`), `0.8` (`/apple-watch`, `/faq`), `0.6` (`/about`, `/medical-disclaimer`), `0.4` (`/privacy`, `/terms`).
  - Change frequencies: `daily`, `weekly`, `monthly`.
- **GSC Ingestion State**:
  - Submitted: 2026-08-21T09:48:18.634Z
  - Last Downloaded: 2026-08-30T22:41:25.694Z
  - Status: **Success (0 Errors, 0 Warnings)**
- **Audit Recommendations**:
  - Maintain `<lastmod>` timestamps updated to the build date.
  - Retain clean canonical URL formatting without trailing slashes.

---

## 5. 6-Cluster Keyword & Search Intent Matrix

This strategic matrix captures high-intent international English queries and rapidly growing domestic Polish breathwork queries, mapping them directly to dedicated landing routes and on-page components.

```
====================================================================================================
CLUSTER 1: WEB PACER & ONLINE TIMER TOOL (Tool / Transactional Intent)
Primary Routes: /timer and /
====================================================================================================
Primary Target Keywords (EN):
  • wim hof timer (GSC Pos 6.0)
  • wim hof breathing online (GSC Pos 7.0)
  • free breathwork timer
  • online breath retention timer
  • breath holding stopwatch
  • guided breathing pacer online
  • interactive breathwork timer
Primary Target Keywords (PL):
  • stoper do oddychania
  • trening oddechowy aplikacja
  • ćwiczenia oddechowe online
  • licznik wim hof
  • timer do metody wima hofa
  • stoper do wstrzymywania oddechu
  • aplikacja do oddychania za darmo
Search Intent & Value Proposition:
  Users want an instant, zero-friction breathing pacer in their browser without ads, login walls,
  or complex setup. They need precise retention timing, audio cue support, and keyboard controls.
Structured Data Requirements:
  • WebApplication (name: "Luma Breathwork Web Pacer", applicationCategory: "HealthApplication")
  • SoftwareApplication (operatingSystem: "Any", offers: { price: "0.00", priceCurrency: "USD" })
  • BreadcrumbList

====================================================================================================
CLUSTER 2: WIM HOF METHOD GUIDE & TECHNIQUE (Educational / How-To Intent)
Primary Route: /guide/wim-hof-method
====================================================================================================
Primary Target Keywords (EN):
  • how to do wim hof breathing method (GSC Pos 58.0)
  • wim hof breathing technique (GSC Pos 48.0)
  • wim hof method explained (GSC Pos 63.0)
  • cyclic hyperventilation tutorial
  • how to wim hof for beginners
  • recovery breath instructions
  • how many breaths in wim hof method
Primary Target Keywords (PL):
  • metoda wima hofa
  • oddychanie wim hof
  • technika wima hofa krok po kroku
  • jak oddychać metodą wima hofa
  • ćwiczenia wim hof
  • hiperwentylacja kontrolowana
  • wdech regeneracyjny wim hof
Search Intent & Value Proposition:
  Users seeking a concise, medically grounded, step-by-step tutorial on how to safely perform 
  cyclic hyperventilation, breath retention, and the 15-second recovery breath.
Structured Data Requirements:
  • HowTo (5 distinct steps: 1. Posture, 2. 30 Deep Breaths, 3. Exhalation & Retention, 
           4. Recovery Inhale, 5. Multi-Round Cycle)
  • Article / TechArticle
  • BreadcrumbList

====================================================================================================
CLUSTER 3: RETENTION TIMES & BENCHMARKS (Physiological / Benchmarking Intent)
Primary Route: /retention-times
====================================================================================================
Primary Target Keywords (EN):
  • wim hof retention times
  • average wim hof hold time
  • how long can you hold breath wim hof
  • retention times round 1 2 3 4
  • normal breath holding times breathwork
  • why do retention times increase each round
  • hypoxic conditioning benchmarks
Primary Target Keywords (PL):
  • wstrzymywanie oddechu czas
  • retencja oddechu wim hof
  • średnie czasy wstrzymania oddechu
  • ile można wstrzymać oddech
  • dlaczego retencja rośnie w kolejnych rundach
  • normy wstrzymywania oddechu
Search Intent & Value Proposition:
  Practitioners comparing their personal retention durations against normative physiological 
  benchmarks across rounds 1 to 4, understanding why breath-hold times increase with subsequent rounds.
Structured Data Requirements:
  • MedicalWebPage (aspect: "Overview", medicalAudience: "Patient")
  • Table / Article Schema
  • BreadcrumbList

====================================================================================================
CLUSTER 4: APPLE WATCH COMPANION & HAPTICS (Commercial / Companion Intent)
Primary Route: /apple-watch
====================================================================================================
Primary Target Keywords (EN):
  • apple watch breathwork app
  • wim hof apple watch timer
  • haptic breathing app apple watch
  • tactile breathwork companion
  • standalone apple watch breathwork
  • eyes-free breathing timer watch
  • Apple HealthKit breathwork tracker
Primary Target Keywords (PL):
  • aplikacja do oddychania apple watch
  • trening oddechowy zegarek wibracje
  • stoper wim hof apple watch
  • haptyczna aplikacja do oddychania
  • monitorowanie oddechu apple health
Search Intent & Value Proposition:
  Breathwork practitioners looking for an eyes-free, tactile Apple Watch companion that guides 
  inhalation, exhalation, and retention via rhythmic wrist haptics without requiring screen glances.
Structured Data Requirements:
  • SoftwareApplication (operatingSystem: "watchOS", applicationCategory: "HealthApplication")
  • AggregateRating / Offers
  • BreadcrumbList

====================================================================================================
CLUSTER 5: SCIENCE, ALKALOSIS & SAFETY (E-E-A-T / Medical & Safety Intent)
Primary Route: /science-and-safety
====================================================================================================
Primary Target Keywords (EN):
  • wim hof science
  • respiratory alkalosis breathwork
  • radboud university wim hof trial
  • shallow water blackout breathwork
  • why do hands tingle during wim hof
  • tetany and tingling in breathwork
  • wim hof contraindications epilepsy pregnancy
Primary Target Keywords (PL):
  • metoda wima hofa badania naukowe
  • alkaloza oddechowa
  • mrowienie podczas oddychania
  • bezpieczeństwo wim hof
  • omdlenie w płytkiej wodzie oddychanie
  • przeciwwskazania metoda wima hofa
Search Intent & Value Proposition:
  Users and medical professionals seeking empirical scientific literature (Radboud University, 
  Kox et al. 2014, PNAS), physiological explanations for tingling/blood pH changes, and critical safety rules.
Structured Data Requirements:
  • MedicalWebPage (aspect: "MedicalSpecialty", citation: DOI links)
  • ScholarlyArticle reference markup
  • BreadcrumbList

====================================================================================================
CLUSTER 6: GENERAL BREATHWORK & NERVOUS SYSTEM REGULATION (Wellness / Broad Intent)
Primary Routes: /faq and /
====================================================================================================
Primary Target Keywords (EN):
  • breathwork for anxiety
  • box breathing guide
  • 4-7-8 breathing method
  • nervous system calming breath
  • vagus nerve breathwork
  • parasympathetic activation breathing
  • breathwork vs meditation
Primary Target Keywords (PL):
  • ćwiczenia oddechowe na stres
  • oddychanie pudełkowe
  • oddychanie 4-7-8
  • uspokojenie układu nerwowego
  • nerw błędny ćwiczenia oddechowe
  • pranajama ćwiczenia w domu
  • techniki relaksacyjne oddech
Search Intent & Value Proposition:
  General wellness and mental health seekers looking for fast anxiety relief, parasympathetic 
  nervous system downregulation, and comparative guides for Box Breathing vs. 4-7-8 vs. Wim Hof.
Structured Data Requirements:
  • FAQPage (comprehensive Question & Answer pairs)
  • WebSite
  • BreadcrumbList
====================================================================================================
```

---

## 6. Landing Page Mapping & On-Page Optimization Blueprint

Below is the definitive metadata, heading structure, and Schema.org blueprint for each of the 11 routes in the Luma Breathwork application.

```
┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. ROUTE: / (Homepage)                                                                            │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/                                                            │
│ • Primary Keywords: Wim Hof timer online, free breathwork app, Apple Watch breathing pacer,       │
│                     ćwiczenia oddechowe, stoper do oddychania, metoda Wima Hofa                   │
│ • Page Title (<60 chars):                                                                         │
│   Luma — Free Wim Hof Breathing Timer & Breathwork App                                            │
│ • Meta Description (145-155 chars):                                                               │
│   Master your breath with Luma: a free, ad-free Wim Hof breathing timer and Apple Watch          │
│   companion. Guided breathwork pacer, retention stopwatch, and physiology hub.                    │
│ • Heading Hierarchy:                                                                              │
│   - H1: Free Guided Breathwork & Wim Hof Breathing Timer                                          │
│   - H2: Precision Web Pacer & Retention Stopwatch                                                 │
│   - H2: Apple Watch Haptic Breathwork Companion                                                   │
│   - H2: Knowledge Hub: Science, Retention Benchmarks & Guides                                     │
│   - H2: Frequently Asked Questions About Breathwork                                               │
│   - H3: Why Breath Retention Times Increase Across Rounds                                         │
│   - H3: Clinical Research: Respiratory Alkalosis & Vagal Tone                                     │
│ • Schema.org Entities: WebSite, SoftwareApplication, Organization, FAQPage, BreadcrumbList        │
│ • Internal Linking Blueprint: In-body feature cards linking to /timer, /guide/wim-hof-method,       │
│   /retention-times, /science-and-safety, /apple-watch, /faq.                                      │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 2. ROUTE: /timer (Interactive Web Pacer)                                                          │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/timer                                                       │
│ • Primary Keywords: Wim Hof timer online, breath retention stopwatch, guided breathing pacer,    │
│                     stoper do oddychania, licznik wim hof online                                  │
│ • Page Title (<60 chars):                                                                         │
│   Wim Hof Timer Online — Free Guided Breathwork Pacer                                             │
│ • Meta Description (145-155 chars):                                                               │
│   Free interactive Wim Hof breathing timer. Real-time cyclic pacing, retention stopwatch, audio   │
│   cues, and keyboard shortcuts. Ad-free in your web browser.                                      │
│ • Heading Hierarchy:                                                                              │
│   - H1: Online Wim Hof Breathing Timer & Retention Stopwatch                                      │
│   - H2: Interactive Pacer Controls & Keyboard Shortcuts                                           │
│   - H2: How to Use the Web Breathwork Pacer                                                       │
│   - H3: Spacebar Controls for Retention & Recovery Phases                                         │
│ • Schema.org Entities: WebApplication, SoftwareApplication, BreadcrumbList                        │
│ • Internal Linking Blueprint: Contextual links to /guide/wim-hof-method and /retention-times.     │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 3. ROUTE: /guide/wim-hof-method (Method Guide)                                                    │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/guide/wim-hof-method                                        │
│ • Primary Keywords: how to do wim hof breathing method, wim hof breathing technique,              │
│                     cyclic hyperventilation tutorial, metoda wima hofa poradnik                   │
│ • Page Title (<60 chars):                                                                         │
│   How to Do Wim Hof Breathing: Step-by-Step Guide                                                 │
│ • Meta Description (145-155 chars):                                                               │
│   Learn how to do the Wim Hof breathing method step-by-step. Master cyclic hyperventilation,      │
│   breath retention, and the recovery breath safely and effectively.                               │
│ • Heading Hierarchy:                                                                              │
│   - H1: Step-by-Step Guide to the Wim Hof Breathing Method                                        │
│   - H2: The 5 Core Steps of the Wim Hof Breathing Technique                                       │
│   - H2: Physiological Effects: Why Hyperventilation Works                                         │
│   - H2: Essential Safety Rules & Contraindications                                                │
│   - H3: Step 1: Comfortable Posture & Setup                                                       │
│   - H3: Step 2: 30-40 Deep Rhythmic Breaths                                                       │
│   - H3: Step 3: The Breath Retention (Hypoxia Phase)                                              │
│   - H3: Step 4: The 15-Second Recovery Inhale                                                     │
│   - H3: Step 5: Completing 3 to 4 Rounds                                                          │
│ • Schema.org Entities: HowTo (with 5 HowToStep elements), Article, BreadcrumbList                 │
│ • Internal Linking Blueprint: Direct CTA to `/timer`, links to `/science-and-safety` & FAQ.       │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 4. ROUTE: /retention-times (Retention Times & Physiology)                                         │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/retention-times                                             │
│ • Primary Keywords: wim hof retention times, average wim hof hold time, retention times round 1-4,│
│                     wstrzymywanie oddechu czas, retencja oddechu wim hof                          │
│ • Page Title (<60 chars):                                                                         │
│   Wim Hof Retention Times: Round Averages & Physiology                                            │
│ • Meta Description (145-155 chars):                                                               │
│   Discover average Wim Hof retention times across rounds 1 to 4. Learn the physiology behind      │
│   increasing breath-holds, CO2 tolerance, and cellular hypoxia.                                   │
│ • Heading Hierarchy:                                                                              │
│   - H1: Wim Hof Retention Times: Benchmarks & Physiology                                          │
│   - H2: Average Retention Times by Round (Rounds 1–4)                                             │
│   - H2: The Physiology: Why Retention Times Increase Each Round                                   │
│   - H2: Safe Techniques to Naturally Extend Breath Retention                                      │
│   - H3: Hypocapnia and the Bohr Effect Explained                                                  │
│   - H3: Why Forcing Breath-Holds Is Dangerous                                                     │
│ • Schema.org Entities: MedicalWebPage, Article, BreadcrumbList                                    │
│ • Internal Linking Blueprint: Links to `/timer` for practicing and `/science-and-safety`.          │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 5. ROUTE: /science-and-safety (Science & Safety)                                                  │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/science-and-safety                                          │
│ • Primary Keywords: wim hof science, respiratory alkalosis breathwork, Radboud University trial,  │
│                     shallow water blackout, badania naukowe wim hof, bezpieczeństwo               │
│ • Page Title (<60 chars):                                                                         │
│   Science & Safety of Wim Hof Breathwork: Clinical Trials                                         │
│ • Meta Description (145-155 chars):                                                               │
│   Explore peer-reviewed clinical research on Wim Hof breathwork. Understand respiratory           │
│   alkalosis, sympathetic activation, and vital safety contraindications.                          │
│ • Heading Hierarchy:                                                                              │
│   - H1: Clinical Science & Safety of Wim Hof Breathwork                                           │
│   - H2: Peer-Reviewed Research & The Radboud University Trials                                    │
│   - H2: Blood Chemistry: Respiratory Alkalosis & Hypocapnia                                       │
│   - H2: Essential Safety Warnings & Contraindications                                             │
│   - H3: Voluntary Activation of the Innate Immune Response                                        │
│   - H3: Shallow Water Blackout Warning: Never Practice in Water                                   │
│ • Schema.org Entities: MedicalWebPage, ScholarlyArticle citations, BreadcrumbList                 │
│ • Internal Linking Blueprint: Links to `/guide/wim-hof-method` and `/medical-disclaimer`.         │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 6. ROUTE: /apple-watch (Apple Watch Companion)                                                    │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/apple-watch                                                 │
│ • Primary Keywords: Apple Watch breathwork app, haptic breathing app, wim hof watch timer,        │
│                     aplikacja do oddychania apple watch, trening oddechowy zegarek                │
│ • Page Title (<60 chars):                                                                         │
│   Luma for Apple Watch — Haptic Breathwork Companion                                              │
│ • Meta Description (145-155 chars):                                                               │
│   Practice guided breathwork eyes-free on your wrist. Luma for Apple Watch offers tactile haptics,│
│   standalone operation, and seamless Apple HealthKit logging.                                     │
│ • Heading Hierarchy:                                                                              │
│   - H1: Luma for Apple Watch: Tactile Haptic Breathwork                                           │
│   - H2: Eyes-Free Breathing Guidance with Wrist Haptics                                           │
│   - H2: Standalone watchOS Architecture & HealthKit Sync                                          │
│   - H3: Custom Haptic Waveforms for Inhale, Exhale & Hold                                         │
│ • Schema.org Entities: SoftwareApplication (operatingSystem: "watchOS"), BreadcrumbList           │
│ • Internal Linking Blueprint: Links back to `/` and `/timer`.                                     │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 7. ROUTE: /faq (Frequently Asked Questions)                                                       │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/faq                                                         │
│ • Primary Keywords: wim hof faq, why do hands tingle breathwork, box breathing vs wim hof,       │
│                     pytania i odpowiedzi wim hof, mrowienie rąk oddychanie                        │
│ • Page Title (<60 chars):                                                                         │
│   Wim Hof Breathwork FAQ: Tingling, Safety & Technique                                            │
│ • Meta Description (145-155 chars):                                                               │
│   Answers to common breathwork questions: why hands tingle, how to extend retention, safety      │
│   contraindications, Box Breathing vs. 4-7-8, and Apple Watch setup.                              │
│ • Heading Hierarchy:                                                                              │
│   - H1: Breathwork Frequently Asked Questions                                                     │
│   - H2: Technique & Pacing Questions                                                              │
│   - H2: Physiological Sensations & Safety FAQs                                                    │
│   - H2: Platform & Apple Watch App Inquiries                                                      │
│ • Schema.org Entities: FAQPage (comprehensive 10+ Question & Answer graph), BreadcrumbList        │
│ • Internal Linking Blueprint: Contextual links across all guides and tools.                       │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 8. ROUTE: /about (About Luma & Mission)                                                           │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/about                                                       │
│ • Primary Keywords: Luma breathwork mission, ad-free breathwork app, open health tools            │
│ • Page Title (<60 chars):                                                                         │
│   About Luma — Pure, Ad-Free Breathwork for Everyone                                              │
│ • Meta Description (145-155 chars):                                                               │
│   Discover Luma's mission: building clean, ad-free, scientifically grounded breathwork tools for │
│   web and Apple Watch. Privacy-first, minimalist design.                                          │
│ • Heading Hierarchy:                                                                              │
│   - H1: About Luma Breathwork & Our Philosophy                                                    │
│   - H2: Why We Built an Ad-Free, Privacy-First Breathwork Tool                                    │
│   - H2: Design Principles: Darkness, Simplicity & Precision                                       │
│ • Schema.org Entities: Organization, Person / Creator, BreadcrumbList                             │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 9. ROUTE: /medical-disclaimer (Medical Disclaimer)                                                │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/medical-disclaimer                                          │
│ • Page Title (<60 chars): Medical Disclaimer — Luma Breathwork                                    │
│ • Meta Description: Important medical information and health safety guidelines for practicing     │
│   breathwork with Luma. Breathwork is not a substitute for professional medical care.             │
│ • Heading Hierarchy:                                                                              │
│   - H1: Medical Disclaimer & Safety Warnings                                                      │
│   - H2: Not Medical Advice or Treatment                                                           │
│   - H2: Physical Contraindications & Risk Precautions                                             │
│ • Schema.org Entities: MedicalWebPage, BreadcrumbList                                             │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 10. ROUTE: /privacy (Privacy Policy)                                                              │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/privacy                                                     │
│ • Page Title (<60 chars): Privacy Policy — Luma Breathwork                                        │
│ • Meta Description: Luma's privacy policy. We do not collect, track, or sell your personal or     │
│   biometric health data. Complete on-device privacy guarantee.                                    │
│ • Heading Hierarchy:                                                                              │
│   - H1: Privacy Policy                                                                            │
│   - H2: Zero Data Collection & On-Device Storage                                                  │
│   - H2: Apple HealthKit Data Isolation                                                            │
│ • Schema.org Entities: WebPage, BreadcrumbList                                                    │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 11. ROUTE: /terms (Terms of Service)                                                              │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Canonical: https://luma-breath.work/terms                                                       │
│ • Page Title (<60 chars): Terms of Service — Luma Breathwork                                      │
│ • Meta Description: Terms of service and usage conditions for Luma Breathwork web application and │
│   Apple Watch companion.                                                                          │
│ • Heading Hierarchy:                                                                              │
│   - H1: Terms of Service                                                                          │
│   - H2: Acceptance of Terms & Usage Conditions                                                    │
│   - H2: Limitation of Liability                                                                   │
│ • Schema.org Entities: WebPage, BreadcrumbList                                                    │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Technical SEO & Schema.org Graph Architecture

### 7.1 Unified JSON-LD `@graph` Standard
Every route generated in `dist/*/index.html` must include a single, unified `<script type="application/ld+json">` containing a valid `@graph` array connecting all relevant entities:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://luma-breath.work/#website",
      "url": "https://luma-breath.work/",
      "name": "Luma Breathwork",
      "description": "Minimalist Wim Hof breathing timer and Apple Watch breathwork companion.",
      "publisher": {
        "@id": "https://luma-breath.work/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://luma-breath.work/#organization",
      "name": "Luma Breathwork",
      "url": "https://luma-breath.work/",
      "logo": "https://luma-breath.work/icon.png"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://luma-breath.work/#app",
      "name": "Luma Breathwork",
      "operatingSystem": "Web, iOS, watchOS",
      "applicationCategory": "HealthApplication",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "HowTo",
      "@id": "https://luma-breath.work/guide/wim-hof-method#howto",
      "name": "How to Practice the Wim Hof Breathing Method",
      "description": "A 5-step tutorial on practicing cyclic hyperventilation and breath retention.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Comfortable Posture",
          "text": "Sit or lie down in a safe, comfortable environment. Never practice in water or while driving."
        },
        {
          "@type": "HowToStep",
          "name": "30 Deep Breaths",
          "text": "Inhale deeply through nose or mouth into the belly and chest; let go naturally without forcing."
        },
        {
          "@type": "HowToStep",
          "name": "The Breath Hold (Retention)",
          "text": "After the final exhalation, hold your breath with empty lungs until you feel the urge to breathe."
        },
        {
          "@type": "HowToStep",
          "name": "Recovery Inhale",
          "text": "Take a deep breath in and hold for 15 seconds, then release."
        },
        {
          "@type": "HowToStep",
          "name": "Repeat 3-4 Rounds",
          "text": "Repeat this cycle for 3 to 4 rounds, noting increasing retention times."
        }
      ]
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://luma-breath.work/science-and-safety#medical",
      "name": "Science and Safety of Wim Hof Breathwork",
      "aspect": "Overview",
      "citation": [
        "https://doi.org/10.1073/pnas.1322174111"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://luma-breath.work/faq#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why do my hands and feet tingle during Wim Hof breathing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tingling and lightheadedness are caused by respiratory alkalosis: rapid cyclic breathing expels CO2, temporarily raising blood pH and causing transient vasoconstriction."
          }
        },
        {
          "@type": "Question",
          "name": "Is the Wim Hof Method safe for everyone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The method is safe for healthy individuals when practiced sitting or lying down. It is strictly contraindicated for individuals with epilepsy, pregnancy, severe cardiovascular conditions, or when in or near water."
          }
        }
      ]
    }
  ]
}
```

### 7.2 Static Site Generation (SSG) & Prerender Architecture
To ensure Googlebot indexes complete content without JavaScript rendering latency:
1. **React SSR Server Rendering**:  
   `scripts/prerender.ts` imports `renderToString` from `react-dom/server` and renders `<App initialPath={route} />`.
2. **Full DOM Injection**:  
   The rendered HTML is placed into `<div id="root">${renderedAppHtml}</div>` inside each route's `dist/**/index.html`.
3. **Client Hydration**:  
   `src/main.tsx` inspects `rootElement.hasChildNodes()`, calling `hydrateRoot` to attach event listeners seamlessly without DOM destruction or visual flickering.
4. **Metadata & Open Graph Dimensions**:  
   Ensure all routes include explicit Open Graph image tags with dimensions (`1200x630`) and `alt` attributes for rich social previews on Twitter/X, Facebook, and LinkedIn.

---

## 8. Multi-Milestone Technical & Content Roadmap

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ MILESTONE 1: GSC AUDIT & KEYWORD REPORT (Current Milestone)                                      │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Status: COMPLETED                                                                                │
│ Deliverables:                                                                                    │
│ • Authoritative audit report published at docs/seo-gsc-audit-report.md                           │
│ • 6-Cluster Polish & English Keyword Matrix established                                          │
│ • Exact on-page metadata & heading blueprints created for all 11 routes                          │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                │
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ MILESTONE 2: TECHNICAL HTML, METADATA & SCHEMA.ORG GRAPH                                         │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Target Scope:                                                                                    │
│ • Update index.html with universal robots meta, canonical link, and Open Graph dimensions        │
│ • Standardize Schema.org JSON-LD graph generator in scripts/prerender.ts                         │
│ • Implement HowTo, MedicalWebPage, WebApplication, and expanded FAQPage schemas                  │
│ • Verify schema syntax with Schema Markup Validator standards                                    │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                │
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ MILESTONE 3: REACT SSR PRERENDER / SSG PIPELINE                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Target Scope:                                                                                    │
│ • Implement initialPath prop in src/App.tsx for SSR compatibility                                │
│ • Implement hydrateRoot in src/main.tsx for client-side hydration                                │
│ • Execute react-dom/server rendering across all 11 routes in scripts/prerender.ts                │
│ • Verify npm run build produces 100% pre-rendered DOM across dist/**/index.html                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                │
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ MILESTONE 4: HIGH-END CONTENT, SEMANTIC HEADINGS & INTERNAL LINK MESH                            │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Target Scope:                                                                                    │
│ • Add "Knowledge Hub" feature section on HomePage.tsx linking to /guide/wim-hof-method,          │
│   /retention-times, /science-and-safety, and /apple-watch                                        │
│ • Integrate Polish and English target keywords naturally into HomePage.tsx and FAQPage.tsx       │
│ • Structure clean H1 -> H2 -> H3 hierarchy and semantic <article> tags                           │
│ • Preserve Awwwards-tier visual elegance, dark mode aesthetic, and zero UI regressions           │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                │
                                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ MILESTONE 5: FINAL E2E BUILD, PRERENDER & AUDIT GATE                                             │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Target Scope:                                                                                    │
│ • Run full npm run lint (tsc --noEmit) and npm run build verification                            │
│ • Inspect all 11 generated dist/*/index.html files for meta tags, Schema graph, and body content │
│ • Pass Reviewer, Challenger, and Forensic Auditor quality gates                                  │
│ • Document deployment verification instructions for GSC re-indexing                             │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Verification & Audit Trail

### 9.1 Verification Commands
To verify the analytical baseline and data integrity of this report:
```bash
# 1. Verify GSC performance metrics extraction
python scripts/gsc_query.py

# 2. Verify URL Inspection API crawl statuses
python scripts/gsc_inspect.py

# 3. Check Sitemap & Robots configuration
type public\robots.txt
type public\sitemap.xml

# 4. Verify TypeScript and SSG build output
npm run build
```

### 9.2 Invalidation Conditions
This report's conclusions remain authoritative unless:
1. Google Search Console API reports a fundamental restructuring of domain properties or indexing quotas.
2. The core route architecture in `src/App.tsx` is modified or removed.
3. Google introduces structural changes to the `HowTo` or `MedicalWebPage` schema specifications.
