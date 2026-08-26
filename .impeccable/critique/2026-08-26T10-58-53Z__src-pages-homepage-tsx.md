---
target: src/pages/HomePage.tsx
total_score: 35
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-08-26T10-58-53Z
slug: src-pages-homepage-tsx
---
# Design Critique: Luma Landing Page
**Target**: `src/pages/HomePage.tsx`
**Mode**: Persuade / Experience

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 4/4 | Continuous SVG circular arc & phase readouts in live pacer, real-time feedback everywhere |
| 2 | Match System / Real World | 4/4 | Authentic Wim Hof protocol, singing bowl partial frequencies (216/288/432Hz), organic cadence |
| 3 | User Control and Freedom | 3/4 | Start/skip/reset/fullscreen in pacer; video demo lacks progress scrubber |
| 4 | Consistency and Standards | 3/4 | Solid cobalt hover fills on ecosystem grid clash with surrounding subtle dark aesthetic |
| 5 | Error Prevention | 4/4 | Screen Wake Lock API prevents display sleep during breath holds; prominent safety disclaimers |
| 6 | Recognition Rather Than Recall | 3/4 | Onscreen keyboard legend (`Space`, `M`, `R`); desktop sticky showcase lacks numeric step indicator |
| 7 | Flexibility and Efficiency | 4/4 | Full keyboard accelerators, customizable breath counts (20/30/40), skip-to-retention flow |
| 8 | Aesthetic and Minimalist Design | 3/4 | High caliber brutalist-editorial layout, but giant 15vw marquee causes aesthetic whiplash |
| 9 | Error Recovery | 3/4 | Silent AudioContext auto-unlock on interaction; graceful Wake Lock fallback |
| 10 | Help and Documentation | 4/4 | Rich FAQ accordion and deep links to dedicated science, safety, and retention guides |
| **Total** | | **35/40** | **Good / High Craft (87.5%)** |

## Design Specificity Verdict

### LLM Assessment
**Verdict: High Product Specificity (Distinct Brand Identity, Not Generic AI Slop).**
The Luma landing page successfully rejects the pervasive AI UI slop patterns (no purple/cyan gradient blobs, no generic SaaS card grids with rounded Lucide icons, no placeholder mockups, no fake social proof). Instead, it establishes an aggressive, masculine, high-contrast biohacking identity (pitch black `#000000`, electric cobalt `#0012da`, and acid lime `#d8d628`) tailored specifically to the Wim Hof Method and physiological performance. The live in-browser Web Audio Tibetan singing bowl pacer and real Apple Watch/HealthKit architecture ground the interface in genuine product reality.

### Deterministic Scan
- **Findings**: 2 warnings for `overused-font` (`Inter` in `index.html` and `index.css`).
- **Context & Evaluation**: While `Inter` is universally common in generic templates, Luma counterbalances it by pairing it with `Playfair Display` (high-contrast editorial serif) and `JetBrains Mono` (technical telemetry).
- **Technical/DOM Audit**:
  - Color hex values (`#d8d628`, `#0012da`, `#49cfff`) are scattered as arbitrary Tailwind classes rather than centralized in Tailwind v4 `@theme` design tokens.
  - Sub-14px mono captions at `text-white/40` sit at ~4.1:1 contrast (slightly below WCAG AA 4.5:1).
  - Web pacer lacks `aria-live="polite"` for non-visual session phase announcements.
  - Duplicated marquee items lack `aria-hidden="true"`.

## Overall Impression
Luma is an ambitious, high-craft editorial landing page that feels like an athletic biohacking instrument rather than a generic meditation app. Its greatest triumph is replacing static marketing fluff with an interactive, acoustic breathing engine right on the page. The primary flaws stem from minor visual over-stimulation (the giant 15vw acid-yellow footer banner and jarring electric-blue hover flashes).

## What's Working
1. **Interactive In-Browser Pacer**: Synthesizes authentic multi-harmonic Tibetan singing bowls with Web Audio API, locks the screen with Wake Lock API, and provides a full interactive Wim Hof round directly in the browser.
2. **Brutalist-Editorial Typographic Architecture**: Pairing massive headline grotesque typography (`text-[20vw] Breathe.`) with philosophical Playfair italics and JetBrains Mono badges creates a distinct high-end identity.
3. **Radical Transparency & Safety Authority**: Front-and-center medical warning on hyperventilation safety, zero-paywall promise, and indie creator tip jar.

## Priority Issues
- **[P1] Sensory Shock & Contrast Drop on Ecosystem Grid Hover**: Hovering over ecosystem tiles suddenly flashes the background to solid electric blue (`hover:bg-[#0012da]`). *Fix: Replace with an understated border highlight or subtle dark tint (`hover:bg-white/[0.06]`).* (Suggested: `/impeccable quieter`)
- **[P1] Kinetic Fatigue from Giant Acid-Yellow Footer Marquee**: The `text-[15vw]` bright yellow marquee scrolling at high velocity introduces visual noise right before the footer. *Fix: Refine into an understated wireframe banner or elegant editorial typography.* (Suggested: `/impeccable distill`)
- **[P2] Design Token Fragmentation & Sub-AA Caption Contrast**: Arbitrary hex classes throughout JSX and `text-white/40` caption tags. *Fix: Define tokens in `@theme` and elevate caption contrast to `text-white/60`.* (Suggested: `/impeccable typeset` / `/impeccable audit`)
- **[P2] Accessibility Gaps in Dynamic Elements**: Infinite marquees duplicate screen reader announcements; Web Pacer lacks `aria-live` status announcements. *Fix: Add `aria-hidden="true"` to marquee duplicates and an `aria-live="polite"` region in the pacer.* (Suggested: `/impeccable adapt`)

## Persona Red Flags
- **Jordan (First-Timer)**: Encountering "Hold on empty lungs" without a brief explanation of why exhalation breath-holding works may cause hesitation or concern.
- **Casey (Mobile User)**: The mobile drawer highlights "Download for iOS" but omits a fast jump to the Web Timer for quick mobile browser sessions.
- **Riley (Skeptic)**: "100% Free Forever" without ads might trigger suspicion of hidden data collection unless the local-first, zero-telemetry architecture is explicitly highlighted in the hero.
- **Sam (Accessibility-Dependent)**: Screen readers hear duplicated marquee items and miss dynamic pacer phase shifts.

## Minor Observations & Provocative Questions
- Web Audio exponential gain ramps prevent audio popping.
- *Question*: What if ambient background orbs pulsed at 0.1 Hz (the resonance frequency for heart-rate variability)?
- *Question*: What if the pre-footer replaced the billboard marquee with an understated, luxury typographic signature?
