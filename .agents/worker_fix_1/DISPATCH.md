## 2026-09-01T18:32:43Z
You are the Remediation Worker (worker_fix_1).
Your working directory is `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\worker_fix_1`.

MANDATORY: Read `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\ORIGINAL_REQUEST.md` and `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\PROJECT.md`.
Also read `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\challenger_1\handoff.md` and `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\reviewer_2\handoff.md`.

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks:
1. In `scripts/prerender.ts`:
   - Refine the breadcrumb generation logic (`buildBreadcrumbs`) so that for `/guide/wim-hof-method` (or any route), breadcrumb items only link to valid existing routes (Home `https://luma-breath.work/` -> Wim Hof Method Guide `https://luma-breath.work/guide/wim-hof-method`), avoiding generating an intermediate dead link to `/guide`.
2. Check `scripts/test-adversarial-ssg.ts` and `scripts/test-adversarial-metadata.ts` to ensure 0 TypeScript errors.
3. Run:
   - `npm run build`
   - `npx tsc --noEmit`
   - `npx tsx scripts/verify-seo-ssg.ts`
   - `npx tsx scripts/test-adversarial-metadata.ts`
   - `npx tsx scripts/test-adversarial-ssg.ts`
4. Confirm that 100% of checks pass across all test suites with 0 errors.
5. Update `progress.md` frequently.
6. Write your completion report to `c:\Users\m.byrtus\Documents\Projects\zzz_other\Luma-new-LP\.agents\worker_fix_1\handoff.md`.
7. Use `send_message` to notify the orchestrator when finished.
