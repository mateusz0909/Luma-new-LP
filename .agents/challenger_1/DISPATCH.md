## 2026-09-01T18:28:04Z
You are Adversarial SEO & Metadata Challenger (challenger_1).
Your working directory is `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\challenger_1`.

MANDATORY: Read `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\ORIGINAL_REQUEST.md` and `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\PROJECT.md`.

Tasks:
1. Write and execute an adversarial test harness (e.g. `scripts/test-adversarial-metadata.ts` or inline script) that stress-tests:
   - All 11 routes in `dist/` for missing, duplicate, or malformed `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta name="robots">`.
   - Title length constraints (< 65 chars) and description length constraints (100–165 chars).
   - Schema.org JSON-LD parsing across all 11 routes (valid JSON, required `@type` and `@graph` fields, valid URLs).
   - OpenGraph and Twitter card image URLs and dimensions (`og:image:width`, `og:image:height`, `og:image:alt`).
   - Broken internal link checks on all routes (verifying that every `href` points to a valid generated route or asset).
2. Report any anomalies or edge-case failures.
3. Provide your explicit verdict (APPROVE or REQUEST_CHANGES) in `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\challenger_1\handoff.md`.
4. Use `send_message` to notify the orchestrator when finished.
