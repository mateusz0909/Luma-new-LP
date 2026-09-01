import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * ============================================================================
 * LUMA BREATHWORK — 4-TIER E2E SEO & SSG VERIFICATION TEST SUITE
 * ============================================================================
 * 
 * Verifies:
 * - Tier 1: Feature Coverage (GSC audit report, 11 SSG routes, metadata presence & uniqueness)
 * - Tier 2: Boundary & Corner Cases (SERP title/desc lengths, Schema.org graph, static DOM in #root)
 * - Tier 3: Cross-Feature & Accessibility (H1-H3 hierarchy, image alt/aria, sitemap.xml, robots.txt)
 * - Tier 4: Build & Integration Pipeline (tsc --noEmit, npm run build, bundle assets)
 * 
 * Usage:
 *   npx tsx scripts/verify-seo-ssg.ts
 *   npx tsx scripts/verify-seo-ssg.ts --skip-build
 *   npx tsx scripts/verify-seo-ssg.ts --tier=1,2
 *   npx tsx scripts/verify-seo-ssg.ts --json
 * ============================================================================
 */

// Terminal ANSI formatting
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';

interface TestResult {
  tier: number;
  id: string;
  name: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  details?: string;
  error?: string;
}

interface RouteMetaSpec {
  path: string;
  distFile: string;
  canonicalUrl: string;
  requiredSchemaTypes: string[];
  optionalAnyOfSchemaTypes?: string[][];
  requiresBreadcrumbs: boolean;
}

const EXPECTED_ROUTES: RouteMetaSpec[] = [
  {
    path: '/',
    distFile: 'index.html',
    canonicalUrl: 'https://luma-breath.work/',
    requiredSchemaTypes: ['WebSite', 'SoftwareApplication'],
    requiresBreadcrumbs: false,
  },
  {
    path: '/timer',
    distFile: 'timer/index.html',
    canonicalUrl: 'https://luma-breath.work/timer',
    requiredSchemaTypes: ['WebApplication'],
    requiresBreadcrumbs: true,
  },
  {
    path: '/guide/wim-hof-method',
    distFile: 'guide/wim-hof-method/index.html',
    canonicalUrl: 'https://luma-breath.work/guide/wim-hof-method',
    requiredSchemaTypes: ['HowTo'],
    requiresBreadcrumbs: true,
  },
  {
    path: '/retention-times',
    distFile: 'retention-times/index.html',
    canonicalUrl: 'https://luma-breath.work/retention-times',
    requiredSchemaTypes: ['MedicalWebPage'],
    requiresBreadcrumbs: true,
  },
  {
    path: '/science-and-safety',
    distFile: 'science-and-safety/index.html',
    canonicalUrl: 'https://luma-breath.work/science-and-safety',
    requiredSchemaTypes: ['MedicalWebPage'],
    requiresBreadcrumbs: true,
  },
  {
    path: '/apple-watch',
    distFile: 'apple-watch/index.html',
    canonicalUrl: 'https://luma-breath.work/apple-watch',
    requiredSchemaTypes: ['SoftwareApplication'],
    requiresBreadcrumbs: true,
  },
  {
    path: '/faq',
    distFile: 'faq/index.html',
    canonicalUrl: 'https://luma-breath.work/faq',
    requiredSchemaTypes: ['FAQPage'],
    requiresBreadcrumbs: true,
  },
  {
    path: '/about',
    distFile: 'about/index.html',
    canonicalUrl: 'https://luma-breath.work/about',
    requiredSchemaTypes: [],
    optionalAnyOfSchemaTypes: [['ProfilePage', 'Organization', 'AboutPage']],
    requiresBreadcrumbs: true,
  },
  {
    path: '/medical-disclaimer',
    distFile: 'medical-disclaimer/index.html',
    canonicalUrl: 'https://luma-breath.work/medical-disclaimer',
    requiredSchemaTypes: [],
    optionalAnyOfSchemaTypes: [['MedicalWebPage', 'WebPage']],
    requiresBreadcrumbs: true,
  },
  {
    path: '/privacy',
    distFile: 'privacy/index.html',
    canonicalUrl: 'https://luma-breath.work/privacy',
    requiredSchemaTypes: ['WebPage'],
    requiresBreadcrumbs: true,
  },
  {
    path: '/terms',
    distFile: 'terms/index.html',
    canonicalUrl: 'https://luma-breath.work/terms',
    requiredSchemaTypes: ['WebPage'],
    requiresBreadcrumbs: true,
  },
];

class TestRunner {
  results: TestResult[] = [];
  startTime = Date.now();
  currentTier = 0;

  record(tier: number, id: string, name: string, pass: boolean, details?: string, error?: string) {
    const result: TestResult = {
      tier,
      id,
      name,
      status: pass ? 'PASS' : 'FAIL',
      details,
      error,
    };
    this.results.push(result);
    this.printResult(result);
  }

  warn(tier: number, id: string, name: string, details?: string) {
    const result: TestResult = {
      tier,
      id,
      name,
      status: 'WARN',
      details,
    };
    this.results.push(result);
    this.printResult(result);
  }

  printHeader() {
    console.log(`\n${BOLD}${CYAN}================================================================================${RESET}`);
    console.log(`${BOLD}${CYAN} LUMA BREATHWORK — 4-TIER E2E SEO & SSG VERIFICATION TEST SUITE${RESET}`);
    console.log(`${BOLD}${CYAN}================================================================================${RESET}`);
    console.log(`${DIM} Target Working Directory:${RESET} ${process.cwd()}`);
    console.log(`${DIM} Execution Mode:${RESET}           Automated Requirement-Driven Verification`);
    console.log(`${DIM} Timestamp:${RESET}                ${new Date().toISOString()}`);
    console.log(`${BOLD}${CYAN}================================================================================${RESET}\n`);
  }

  printTierHeader(tier: number, title: string) {
    this.currentTier = tier;
    console.log(`\n${BOLD}${MAGENTA}[TIER ${tier}: ${title.toUpperCase()}]${RESET}`);
  }

  printResult(res: TestResult) {
    const badge = res.status === 'PASS' 
      ? `${GREEN}✔ PASS${RESET}` 
      : res.status === 'WARN'
        ? `${YELLOW}⚠ WARN${RESET}`
        : `${RED}✘ FAIL${RESET}`;
    
    console.log(`  ${badge} ${BOLD}${res.id}${RESET}: ${res.name}`);
    if (res.details) {
      console.log(`         ${DIM}↳ ${res.details}${RESET}`);
    }
    if (res.error) {
      console.log(`         ${RED}↳ ERROR: ${res.error}${RESET}`);
    }
  }

  printSummary() {
    const total = this.results.length;
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const warned = this.results.filter(r => r.status === 'WARN').length;
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);

    console.log(`\n${BOLD}${CYAN}================================================================================${RESET}`);
    console.log(`${BOLD}${CYAN} TEST EXECUTION SUMMARY${RESET}`);
    console.log(`${BOLD}${CYAN}================================================================================${RESET}`);
    console.log(` Total Checks:  ${BOLD}${total}${RESET}`);
    console.log(` Passed:        ${GREEN}${BOLD}${passed}${RESET}`);
    console.log(` Failed:        ${failed > 0 ? RED : GREEN}${BOLD}${failed}${RESET}`);
    console.log(` Warnings:      ${warned > 0 ? YELLOW : GREEN}${BOLD}${warned}${RESET}`);
    console.log(` Duration:      ${duration}s`);
    console.log(` Status:        ${failed === 0 ? `${GREEN}${BOLD}ALL TESTS PASSED (100%)${RESET}` : `${RED}${BOLD}FAILED (${failed} failures detected)${RESET}`}`);
    console.log(`${BOLD}${CYAN}================================================================================${RESET}\n`);

    return failed === 0;
  }
}

// Helper Functions for HTML Parsing
function extractTitle(html: string): string | null {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractMetaTag(html: string, attrName: 'name' | 'property', attrValue: string): string | null {
  const escaped = attrValue.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const pattern1 = new RegExp(`<meta\\s+[^>]*?${attrName}=["']${escaped}["'][^>]*?content=["']([^"']*)["']`, 'i');
  const pattern2 = new RegExp(`<meta\\s+[^>]*?content=["']([^"']*)["'][^>]*?${attrName}=["']${escaped}["']`, 'i');
  const m1 = html.match(pattern1);
  if (m1) return m1[1];
  const m2 = html.match(pattern2);
  if (m2) return m2[1];
  return null;
}

function extractCanonical(html: string): string | null {
  const p1 = /<link\s+[^>]*?rel=["']canonical["'][^>]*?href=["']([^"']*)["']/i;
  const p2 = /<link\s+[^>]*?href=["']([^"']*)["'][^>]*?rel=["']canonical["']/i;
  const m1 = html.match(p1);
  if (m1) return m1[1];
  const m2 = html.match(p2);
  if (m2) return m2[1];
  return null;
}

function extractJsonLdScripts(html: string): { parsed: any; raw: string; error?: string }[] {
  const regex = /<script\s+[^>]*?type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const results: { parsed: any; raw: string; error?: string }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const raw = match[1].trim();
    try {
      const parsed = JSON.parse(raw);
      results.push({ parsed, raw });
    } catch (e: any) {
      results.push({ parsed: null, raw, error: e.message });
    }
  }
  return results;
}

function extractAllSchemaTypes(json: any): string[] {
  const types: string[] = [];
  function recurse(obj: any) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
      obj.forEach(recurse);
      return;
    }
    if (obj['@type']) {
      if (Array.isArray(obj['@type'])) {
        types.push(...obj['@type']);
      } else {
        types.push(obj['@type']);
      }
    }
    if (obj['@graph'] && Array.isArray(obj['@graph'])) {
      obj['@graph'].forEach(recurse);
    }
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'object') {
        recurse(obj[key]);
      }
    }
  }
  recurse(json);
  return types;
}

function extractRootInnerHtml(html: string): string {
  // Find <div id="root"> ... </div>
  const match = html.match(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>(?:\s*<script|\s*<\/body>)/i);
  if (match) {
    return match[1].trim();
  }
  // Fallback: search between <div id="root"> and </body>
  const rootIndex = html.indexOf('<div id="root">');
  if (rootIndex !== -1) {
    const afterRoot = html.slice(rootIndex + '<div id="root">'.length);
    const bodyEndIndex = afterRoot.lastIndexOf('</body>');
    const content = bodyEndIndex !== -1 ? afterRoot.slice(0, bodyEndIndex) : afterRoot;
    return content.trim();
  }
  return '';
}

function extractHeadings(html: string): { h1: string[]; h2: string[]; h3: string[] } {
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h2Matches = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h3Matches = [...html.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  return { h1: h1Matches, h2: h2Matches, h3: h3Matches };
}

function extractImages(html: string): { raw: string; alt: string | null; ariaHidden: string | null; role: string | null; src: string | null }[] {
  const regex = /<img\s+([^>]*?)\/?>/gi;
  const list: { raw: string; alt: string | null; ariaHidden: string | null; role: string | null; src: string | null }[] = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    const attrStr = m[1];
    const altMatch = attrStr.match(/\balt=["']([^"']*)["']/i);
    const ariaHiddenMatch = attrStr.match(/\baria-hidden=["']([^"']*)["']/i);
    const roleMatch = attrStr.match(/\brole=["']([^"']*)["']/i);
    const srcMatch = attrStr.match(/\bsrc=["']([^"']*)["']/i);
    list.push({
      raw: m[0],
      alt: altMatch ? altMatch[1] : null,
      ariaHidden: ariaHiddenMatch ? ariaHiddenMatch[1] : null,
      role: roleMatch ? roleMatch[1] : null,
      src: srcMatch ? srcMatch[1] : null,
    });
  }
  return list;
}

// Main Verification Execution
export async function runVerification(options: { skipBuild?: boolean; selectedTiers?: number[]; jsonOutput?: boolean } = {}) {
  const runner = new TestRunner();
  const distDir = path.resolve(process.cwd(), 'dist');
  const docsDir = path.resolve(process.cwd(), 'docs');

  if (!options.jsonOutput) {
    runner.printHeader();
  }

  const shouldRunTier = (tier: number) => {
    if (!options.selectedTiers || options.selectedTiers.length === 0) return true;
    return options.selectedTiers.includes(tier);
  };

  // Cache for loaded HTML per route
  const routeHtmlCache = new Map<string, string>();

  // ==========================================================================
  // TIER 1: FEATURE COVERAGE
  // ==========================================================================
  if (shouldRunTier(1)) {
    runner.printTierHeader(1, 'Feature Coverage & Core SEO Deliverables');

    // 1.1 - 1.6: GSC Audit Report
    const gscReportPath = path.join(docsDir, 'seo-gsc-audit-report.md');
    const gscExists = fs.existsSync(gscReportPath);
    let gscContent = '';

    if (gscExists) {
      gscContent = fs.readFileSync(gscReportPath, 'utf-8');
      const stat = fs.statSync(gscReportPath);
      runner.record(1, 'T1.1', 'GSC Audit Report file existence', stat.size > 500, `Found at docs/seo-gsc-audit-report.md (${stat.size} bytes)`);
    } else {
      runner.record(1, 'T1.1', 'GSC Audit Report file existence', false, 'docs/seo-gsc-audit-report.md not found', 'File does not exist');
    }

    const gscSections = [
      { id: 'T1.2', name: 'GSC Audit: Executive Summary', patterns: [/Executive Summary|Podsumowanie|Audit Overview/i] },
      { id: 'T1.3', name: 'GSC Audit: Search Performance & Metrics', patterns: [/Performance|Wydajność|Queries|Impressions|CTR|Clicks/i] },
      { id: 'T1.4', name: 'GSC Audit: Indexation Status & Sitemaps', patterns: [/Indexation|Indeksacja|Coverage|Sitemap/i] },
      { id: 'T1.5', name: 'GSC Audit: Keyword Strategy & Query Matrix', patterns: [/Keyword Strategy|Słowa Kluczowe|Clusters|Wim Hof/i] },
      { id: 'T1.6', name: 'GSC Audit: Actionable Remediation Roadmap', patterns: [/Actionable|Rekomendacje|Roadmap|Plan Działań/i] },
    ];

    for (const sec of gscSections) {
      const match = gscExists && sec.patterns.some(p => p.test(gscContent));
      runner.record(1, sec.id, sec.name, Boolean(match), match ? 'Section identified in audit report' : 'Missing required section heading/content', !match ? 'Section missing' : undefined);
    }

    // 1.7 - 1.17: Route HTML Generation
    for (const route of EXPECTED_ROUTES) {
      const filePath = path.join(distDir, route.distFile);
      const exists = fs.existsSync(filePath);
      if (exists) {
        const content = fs.readFileSync(filePath, 'utf-8');
        routeHtmlCache.set(route.path, content);
        runner.record(1, `T1.7[${route.path}]`, `Route HTML generated: ${route.path}`, content.length > 200, `dist/${route.distFile} exists (${content.length} bytes)`);
      } else {
        runner.record(1, `T1.7[${route.path}]`, `Route HTML generated: ${route.path}`, false, `dist/${route.distFile} not found`, 'Missing SSG HTML output');
      }
    }

    // 1.18 - 1.28: Essential Metadata Presence
    const collectedTitles: { path: string; title: string }[] = [];
    const collectedDescriptions: { path: string; desc: string }[] = [];
    const collectedCanonicals: { path: string; canonical: string }[] = [];

    for (const route of EXPECTED_ROUTES) {
      const html = routeHtmlCache.get(route.path);
      if (!html) {
        runner.record(1, `T1.18[${route.path}]`, `Essential metadata presence: ${route.path}`, false, undefined, 'HTML not available');
        continue;
      }

      const title = extractTitle(html);
      const desc = extractMetaTag(html, 'name', 'description');
      const canonical = extractCanonical(html);
      const robots = extractMetaTag(html, 'name', 'robots') || 'index, follow'; // standard default if present
      const ogTitle = extractMetaTag(html, 'property', 'og:title');
      const ogDesc = extractMetaTag(html, 'property', 'og:description');
      const ogUrl = extractMetaTag(html, 'property', 'og:url');
      const ogType = extractMetaTag(html, 'property', 'og:type');
      const ogImage = extractMetaTag(html, 'property', 'og:image');
      const twitterCard = extractMetaTag(html, 'name', 'twitter:card') || extractMetaTag(html, 'property', 'twitter:card');
      const twitterTitle = extractMetaTag(html, 'name', 'twitter:title') || extractMetaTag(html, 'property', 'twitter:title');
      const twitterDesc = extractMetaTag(html, 'name', 'twitter:description') || extractMetaTag(html, 'property', 'twitter:description');
      const twitterImage = extractMetaTag(html, 'name', 'twitter:image') || extractMetaTag(html, 'property', 'twitter:image');

      if (title) collectedTitles.push({ path: route.path, title });
      if (desc) collectedDescriptions.push({ path: route.path, desc });
      if (canonical) collectedCanonicals.push({ path: route.path, canonical });

      const missing: string[] = [];
      if (!title) missing.push('<title>');
      if (!desc) missing.push('<meta name="description">');
      if (!canonical) missing.push('<link rel="canonical">');
      if (!ogTitle) missing.push('og:title');
      if (!ogDesc) missing.push('og:description');
      if (!ogUrl) missing.push('og:url');
      if (!ogImage) missing.push('og:image');
      if (!twitterCard) missing.push('twitter:card');
      if (!twitterTitle) missing.push('twitter:title');
      if (!twitterDesc) missing.push('twitter:description');

      const pass = missing.length === 0 && canonical === route.canonicalUrl;
      const details = pass 
        ? `Canonical: ${canonical} | OG & Twitter tags complete`
        : `Missing tags: ${missing.join(', ')} | Expected canonical: ${route.canonicalUrl}, got: ${canonical}`;

      runner.record(1, `T1.18[${route.path}]`, `Metadata presence & canonical: ${route.path}`, pass, details, !pass ? `Incomplete metadata for ${route.path}` : undefined);
    }

    // 1.29 - 1.31: Uniqueness Checks
    const uniqueTitles = new Set(collectedTitles.map(t => t.title));
    const uniqueDescriptions = new Set(collectedDescriptions.map(d => d.desc));
    const uniqueCanonicals = new Set(collectedCanonicals.map(c => c.canonical));

    runner.record(
      1,
      'T1.29',
      'Title Tag Uniqueness Across All 11 Routes',
      uniqueTitles.size === EXPECTED_ROUTES.length,
      `${uniqueTitles.size} unique titles across ${collectedTitles.length} generated routes`,
      uniqueTitles.size !== EXPECTED_ROUTES.length ? 'Duplicate <title> tags detected across routes' : undefined
    );

    runner.record(
      1,
      'T1.30',
      'Meta Description Uniqueness Across All 11 Routes',
      uniqueDescriptions.size === EXPECTED_ROUTES.length,
      `${uniqueDescriptions.size} unique meta descriptions across ${collectedDescriptions.length} generated routes`,
      uniqueDescriptions.size !== EXPECTED_ROUTES.length ? 'Duplicate <meta description> tags detected across routes' : undefined
    );

    runner.record(
      1,
      'T1.31',
      'Canonical URL Uniqueness & Exact Route Mapping',
      uniqueCanonicals.size === EXPECTED_ROUTES.length,
      `${uniqueCanonicals.size} unique canonical URLs properly mapped`,
      uniqueCanonicals.size !== EXPECTED_ROUTES.length ? 'Duplicate or missing canonical URLs detected' : undefined
    );
  }

  // ==========================================================================
  // TIER 2: BOUNDARY & CORNER CASES
  // ==========================================================================
  if (shouldRunTier(2)) {
    runner.printTierHeader(2, 'Boundary Limits, Schema.org Graph & Static DOM Markup');

    // 2.1 - 2.11: Title Length Bounds (< 65 chars, >= 15 chars)
    for (const route of EXPECTED_ROUTES) {
      const html = routeHtmlCache.get(route.path);
      if (!html) {
        runner.record(2, `T2.1[${route.path}]`, `Title SERP length boundary: ${route.path}`, false, undefined, 'HTML not available');
        continue;
      }
      const title = extractTitle(html) || '';
      const len = title.length;
      const pass = len >= 15 && len < 65;
      const details = `Length: ${len} chars ("${title.slice(0, 45)}${len > 45 ? '...' : ''}")`;
      runner.record(
        2,
        `T2.1[${route.path}]`,
        `Title SERP length (< 65 chars): ${route.path}`,
        pass,
        details,
        !pass ? `Title length (${len}) outside optimal [15, 64] range: "${title}"` : undefined
      );
    }

    // 2.12 - 2.22: Meta Description Length Bounds (100 - 165 chars)
    for (const route of EXPECTED_ROUTES) {
      const html = routeHtmlCache.get(route.path);
      if (!html) {
        runner.record(2, `T2.12[${route.path}]`, `Meta description SERP length boundary: ${route.path}`, false, undefined, 'HTML not available');
        continue;
      }
      const desc = extractMetaTag(html, 'name', 'description') || '';
      const len = desc.length;
      const pass = len >= 100 && len <= 165;
      const details = `Length: ${len} chars (optimal: 100-165 chars)`;
      runner.record(
        2,
        `T2.12[${route.path}]`,
        `Meta description SERP length (100-165 chars): ${route.path}`,
        pass,
        details,
        !pass ? `Meta description length (${len}) outside optimal [100, 165] range: "${desc}"` : undefined
      );
    }

    // 2.23 - 2.33: Schema.org JSON-LD Validation & Type Verification
    for (const route of EXPECTED_ROUTES) {
      const html = routeHtmlCache.get(route.path);
      if (!html) {
        runner.record(2, `T2.23[${route.path}]`, `Schema.org JSON-LD structure: ${route.path}`, false, undefined, 'HTML not available');
        continue;
      }

      const scriptTags = extractJsonLdScripts(html);
      if (scriptTags.length === 0) {
        runner.record(2, `T2.23[${route.path}]`, `Schema.org JSON-LD structure: ${route.path}`, false, 'No <script type="application/ld+json"> tag found', 'Missing JSON-LD');
        continue;
      }

      const hasParseError = scriptTags.some(s => Boolean(s.error));
      if (hasParseError) {
        const err = scriptTags.find(s => s.error)?.error;
        runner.record(2, `T2.23[${route.path}]`, `Schema.org JSON-LD structure: ${route.path}`, false, `JSON Parse Error: ${err}`, 'Invalid JSON syntax');
        continue;
      }

      // Collect all schema types present across all script tags
      const allTypes = scriptTags.flatMap(s => extractAllSchemaTypes(s.parsed));
      
      // Check required schema types
      const missingRequired = route.requiredSchemaTypes.filter(expected => !allTypes.includes(expected));

      // Check optionalAnyOfSchemaTypes (at least one of each array must be present)
      let anyOfFailures: string[] = [];
      if (route.optionalAnyOfSchemaTypes) {
        for (const options of route.optionalAnyOfSchemaTypes) {
          const hasOne = options.some(opt => allTypes.includes(opt));
          if (!hasOne) {
            anyOfFailures.push(`[${options.join(' OR ')}]`);
          }
        }
      }
      
      // Check BreadcrumbList for subpages
      let breadcrumbPass = true;
      let breadcrumbDetails = '';
      if (route.requiresBreadcrumbs) {
        const hasBreadcrumb = allTypes.includes('BreadcrumbList');
        if (!hasBreadcrumb) {
          breadcrumbPass = false;
          breadcrumbDetails = 'Missing BreadcrumbList schema';
        }
      }

      const schemaPass = missingRequired.length === 0 && anyOfFailures.length === 0 && breadcrumbPass;
      const expectedDesc = [
        ...route.requiredSchemaTypes,
        ...(route.optionalAnyOfSchemaTypes ? route.optionalAnyOfSchemaTypes.map(opts => `(${opts.join('|')})`) : []),
      ].join(', ');
      const details = `Types found: [${[...new Set(allTypes)].join(', ')}] | Required: [${expectedDesc}]${route.requiresBreadcrumbs ? ' + BreadcrumbList' : ''}`;
      
      const errorList: string[] = [];
      if (missingRequired.length > 0) errorList.push(`Missing required: ${missingRequired.join(', ')}`);
      if (anyOfFailures.length > 0) errorList.push(`Missing one of: ${anyOfFailures.join(', ')}`);
      if (!breadcrumbPass) errorList.push('Missing BreadcrumbList');

      runner.record(
        2,
        `T2.23[${route.path}]`,
        `Schema.org JSON-LD structure & entity types: ${route.path}`,
        schemaPass,
        details,
        !schemaPass ? errorList.join('; ') : undefined
      );
    }

    // 2.34 - 2.44: Static Hydration Content inside <div id="root">
    for (const route of EXPECTED_ROUTES) {
      const html = routeHtmlCache.get(route.path);
      if (!html) {
        runner.record(2, `T2.34[${route.path}]`, `Static SSR DOM content in #root: ${route.path}`, false, undefined, 'HTML not available');
        continue;
      }

      const rootContent = extractRootInnerHtml(html);
      const rootLength = rootContent.length;
      const hasSemanticTags = /<(section|article|nav|main|h1|h2|p|footer|div)\b/i.test(rootContent);
      const pass = rootLength > 500 && hasSemanticTags;
      const details = `Root DOM content length: ${rootLength} chars | Contains semantic tags: ${hasSemanticTags}`;

      runner.record(
        2,
        `T2.34[${route.path}]`,
        `Static SSR DOM content in <div id="root">: ${route.path}`,
        pass,
        details,
        !pass ? `SSR HTML in #root is too short (${rootLength} chars <= 500) or missing pre-rendered DOM markup (empty root shell detected)` : undefined
      );
    }
  }

  // ==========================================================================
  // TIER 3: CROSS-FEATURE & ACCESSIBILITY
  // ==========================================================================
  if (shouldRunTier(3)) {
    runner.printTierHeader(3, 'Cross-Feature, Accessibility & Crawlability');

    // 3.1: Heading Hierarchy (Single H1 per route)
    let allH1Pass = true;
    const h1DetailsList: string[] = [];
    const h1Texts: { path: string; text: string }[] = [];

    for (const route of EXPECTED_ROUTES) {
      const html = routeHtmlCache.get(route.path);
      if (!html) continue;

      const headings = extractHeadings(html);
      const h1Count = headings.h1.length;
      if (h1Count !== 1) {
        allH1Pass = false;
        h1DetailsList.push(`${route.path}: ${h1Count} H1 tags found (expected exactly 1)`);
      } else {
        h1Texts.push({ path: route.path, text: headings.h1[0] });
      }
    }

    runner.record(
      3,
      'T3.1',
      'Heading Hierarchy: Exactly 1 H1 Tag Per Route',
      allH1Pass && h1Texts.length === EXPECTED_ROUTES.length,
      allH1Pass ? `All ${h1Texts.length} routes contain exactly 1 H1 heading` : h1DetailsList.join('; '),
      !allH1Pass ? 'Invalid H1 heading hierarchy detected' : undefined
    );

    // 3.2: H1 Text Uniqueness
    const uniqueH1s = new Set(h1Texts.map(h => h.text.toLowerCase()));
    const h1UniquePass = uniqueH1s.size === h1Texts.length && h1Texts.length > 0;
    runner.record(
      3,
      'T3.2',
      'Heading Uniqueness: Unique H1 Text Across All Routes',
      h1UniquePass,
      `${uniqueH1s.size} unique H1 headings across ${h1Texts.length} routes`,
      !h1UniquePass ? 'Duplicate H1 headings found between distinct routes' : undefined
    );

    // 3.3: Image Accessibility (alt / aria-hidden attributes)
    let allImagesAccessible = true;
    let totalImagesChecked = 0;
    const inaccessibleImages: string[] = [];

    for (const route of EXPECTED_ROUTES) {
      const html = routeHtmlCache.get(route.path);
      if (!html) continue;

      const images = extractImages(html);
      totalImagesChecked += images.length;

      for (const img of images) {
        const isDecorative = img.ariaHidden === 'true' || img.role === 'presentation';
        const hasAlt = typeof img.alt === 'string';
        if (!hasAlt && !isDecorative) {
          allImagesAccessible = false;
          inaccessibleImages.push(`${route.path} -> ${img.raw}`);
        }
      }
    }

    runner.record(
      3,
      'T3.3',
      'Image Accessibility: Alt Attributes & Aria-Hidden Tags',
      allImagesAccessible,
      `Checked ${totalImagesChecked} total <img> elements across all routes`,
      !allImagesAccessible ? `Images missing alt attribute: ${inaccessibleImages.slice(0, 3).join(', ')}` : undefined
    );

    // 3.4 - 3.5: Sitemap.xml Verification
    const sitemapPath = path.join(distDir, 'sitemap.xml');
    const sitemapFallback = path.join(process.cwd(), 'public', 'sitemap.xml');
    const targetSitemap = fs.existsSync(sitemapPath) ? sitemapPath : sitemapFallback;
    const sitemapExists = fs.existsSync(targetSitemap);

    if (sitemapExists) {
      const sitemapXml = fs.readFileSync(targetSitemap, 'utf-8');
      const urlMatches = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/gi)];
      const locMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/gi)].map(m => m[1].trim());
      const priorityMatches = [...sitemapXml.matchAll(/<priority>(.*?)<\/priority>/gi)].map(m => parseFloat(m[1].trim()));
      const lastmodMatches = [...sitemapXml.matchAll(/<lastmod>(.*?)<\/lastmod>/gi)].map(m => m[1].trim());

      const allRoutesPresent = EXPECTED_ROUTES.every(r => locMatches.includes(r.canonicalUrl));
      const prioritiesValid = priorityMatches.every(p => !isNaN(p) && p >= 0.0 && p <= 1.0);
      const lastmodsValid = lastmodMatches.every(d => /^\d{4}-\d{2}-\d{2}$/.test(d));

      const sitemapPass = urlMatches.length === EXPECTED_ROUTES.length && allRoutesPresent && prioritiesValid && lastmodsValid;
      const details = `Found ${urlMatches.length} URLs in sitemap (${path.relative(process.cwd(), targetSitemap)}) | All 11 routes present: ${allRoutesPresent}`;

      runner.record(
        3,
        'T3.4',
        'Sitemap.xml Integrity: All 11 Routes, Valid Priorities & Format',
        sitemapPass,
        details,
        !sitemapPass ? `Sitemap invalid. Expected 11 URLs with valid lastmod & priority (0.0-1.0). Found: ${urlMatches.length}` : undefined
      );
    } else {
      runner.record(3, 'T3.4', 'Sitemap.xml Integrity: All 11 Routes & Valid Format', false, 'sitemap.xml not found in dist/ or public/', 'Missing sitemap');
    }

    // 3.5: Robots.txt Configuration
    const robotsPath = path.join(distDir, 'robots.txt');
    const robotsFallback = path.join(process.cwd(), 'public', 'robots.txt');
    const targetRobots = fs.existsSync(robotsPath) ? robotsPath : robotsFallback;
    const robotsExists = fs.existsSync(targetRobots);

    if (robotsExists) {
      const robotsTxt = fs.readFileSync(targetRobots, 'utf-8');
      const hasUserAgent = /User-agent:\s*\*/i.test(robotsTxt);
      const hasAllow = /Allow:\s*\//i.test(robotsTxt);
      const hasSitemap = /Sitemap:\s*https:\/\/luma-breath\.work\/sitemap\.xml/i.test(robotsTxt);
      const pass = hasUserAgent && hasAllow && hasSitemap;

      runner.record(
        3,
        'T3.5',
        'Robots.txt Configuration: User-agent, Allow & Sitemap URL',
        pass,
        `Configured at ${path.relative(process.cwd(), targetRobots)}`,
        !pass ? 'Robots.txt missing User-agent: *, Allow: /, or Sitemap link' : undefined
      );
    } else {
      runner.record(3, 'T3.5', 'Robots.txt Configuration', false, 'robots.txt not found in dist/ or public/', 'Missing robots.txt');
    }
  }

  // ==========================================================================
  // TIER 4: BUILD & INTEGRATION PIPELINE
  // ==========================================================================
  if (shouldRunTier(4)) {
    runner.printTierHeader(4, 'Build & Integration Pipeline');

    // 4.1: TypeScript Compilation
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe', encoding: 'utf-8' });
      runner.record(4, 'T4.1', 'TypeScript Compilation: tsc --noEmit', true, 'Clean compilation with 0 type errors');
    } catch (err: any) {
      const output = err.stdout || err.stderr || err.message;
      runner.record(4, 'T4.1', 'TypeScript Compilation: tsc --noEmit', false, output.slice(0, 300), 'TypeScript compilation failed');
    }

    // 4.2: Production Build Pipeline Execution
    if (options.skipBuild) {
      runner.warn(4, 'T4.2', 'Production Build Pipeline: npm run build (Skipped via --skip-build)');
    } else {
      try {
        const buildOutput = execSync('npm run build', { stdio: 'pipe', encoding: 'utf-8' });
        const assetsDir = path.join(distDir, 'assets');
        const assetsExist = fs.existsSync(assetsDir) && fs.readdirSync(assetsDir).length > 0;
        runner.record(4, 'T4.2', 'Production Build Pipeline: npm run build', assetsExist, `Vite + SSG prerender completed successfully. Assets created in dist/assets.`);
      } catch (err: any) {
        const output = err.stdout || err.stderr || err.message;
        runner.record(4, 'T4.2', 'Production Build Pipeline: npm run build', false, output.slice(0, 300), 'Build execution failed');
      }
    }
  }

  const allPassed = runner.printSummary();

  if (options.jsonOutput) {
    const jsonPath = path.resolve(process.cwd(), 'scratch', 'e2e_verification_results.json');
    const outputData = {
      timestamp: new Date().toISOString(),
      summary: {
        total: runner.results.length,
        passed: runner.results.filter(r => r.status === 'PASS').length,
        failed: runner.results.filter(r => r.status === 'FAIL').length,
        warned: runner.results.filter(r => r.status === 'WARN').length,
        durationSeconds: ((Date.now() - runner.startTime) / 1000),
        allPassed,
      },
      results: runner.results,
    };
    if (!fs.existsSync(path.dirname(jsonPath))) {
      fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
    }
    fs.writeFileSync(jsonPath, JSON.stringify(outputData, null, 2), 'utf-8');
    console.log(`${CYAN}JSON results saved to: ${jsonPath}${RESET}\n`);
  }

  return allPassed;
}

// Parse CLI Arguments
const args = process.argv.slice(2);
const skipBuild = args.includes('--skip-build');
const jsonOutput = args.includes('--json');
const tierArg = args.find(a => a.startsWith('--tier='));
const selectedTiers = tierArg 
  ? tierArg.split('=')[1].split(',').map(t => parseInt(t.trim(), 10)).filter(t => !isNaN(t))
  : undefined;

// Direct Execution
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('verify-seo-ssg.ts')) {
  runVerification({ skipBuild, selectedTiers, jsonOutput })
    .then(passed => {
      process.exit(passed ? 0 : 1);
    })
    .catch(err => {
      console.error(`${RED}Fatal Test Runner Error:${RESET}`, err);
      process.exit(1);
    });
}
