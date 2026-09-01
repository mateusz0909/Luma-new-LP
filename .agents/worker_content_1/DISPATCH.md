# DISPATCH — Milestone 4: Content, Heading Hierarchy & Polish/English Keyword Optimization

## 2026-09-01T18:23:09Z

You are the Implementation Worker for Milestone 4: Content, Heading Hierarchy & Polish/English Keyword Optimization.
Your working directory is `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\worker_content_1`.

MANDATORY: You MUST read `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\ORIGINAL_REQUEST.md`, `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\PROJECT.md`, `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\survey_content_1\handoff.md`, and `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\docs\seo-gsc-audit-report.md` before starting work.

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Design Rules (Anti-UI-Slop & High-End Aesthetic):
- Maintain the ultra-clean, tranquil, Apple/OLED dark-mode aesthetic (#000 background, #d8d628 and #49cfff accents, crisp typography).
- NEVER introduce generic AI marketing fluff or ugly keyword stuffing.
- Use the exact editorial Before/After proposals from `.agents/survey_content_1/handoff.md § 4.1`.

Tasks:
1. Update `src/pages/HomePage.tsx`:
   - Hero: Keep the huge visual typography "Breathe." and enhance with `<span className="sr-only">Free Wim Hof Breathing Method App &amp; Guided Retention Timer</span>`. Update subtitle to mention Wim Hof Method and online guided pacer.
   - Manifesto: Add eyebrow `<span className="...">OUR PHILOSOPHY</span>` and upgrade somatic copy ("conscious breathwork", "human resilience", "nervous system regulation").
   - Practice Architecture: Use styled eyebrow and semantic H2 headline (`<h2 className="sr-only">Wim Hof Breathwork Protocol: Daily Ritual, Sensory Immersion &amp; Retention Analytics</h2>`). Enhance 3 pillars copy (breath counts, Tibetan singing bowls, wrist haptics, retention metrics).
   - Interactive Web Pacer Section: Update H2 to `"Free Online Wim Hof Breathing Timer & Guided Pacer"` and enhance subtitle.
   - Interface Showcase: Update H2 to `"Pure Focus: The Breathwork & Retention Timer Interface"`.
   - Appearance Themes: Update H2 to `"Customizable OLED Themes: Change the Mood, Keep the Flow"`.
   - Ecosystem & Sensory Integration: Use `<article>` tags for the 4 grid cards (Apple Watch, Widgets & Live Activities, Apple HealthKit, Precision Sensory Haptics) and update copy.
   - Knowledge & Physiology Hub Section: Add a beautifully designed in-body section or card grid linking to `/guide/wim-hof-method` ("Method Guide"), `/retention-times` ("Retention Times"), `/science-and-safety` ("Science & Safety"), and `/apple-watch` ("Apple Watch App"). This solves the crawler discovery issue for subpages identified in GSC audit.
   - FAQ Section: Update H2 to `"Frequently Asked Questions: Wim Hof Breathwork & Luma App"`.
   - Pre-Footer CTA: Update headline and button text.
2. Update `src/pages/FAQPage.tsx` and ensure semantic heading structure and rich copy.
3. Re-build and verify:
   - Run `npm run build`.
   - Run `npx tsx scripts/verify-seo-ssg.ts`.
   - Ensure all 82+ checks pass and `dist/` contains all updated semantic markup and content.
4. Update `progress.md` frequently.
5. Write your completion report to `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\worker_content_1\handoff.md`.
6. Use `send_message` to notify the orchestrator when finished.
