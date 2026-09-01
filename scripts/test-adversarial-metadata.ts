import fs from 'fs';
import path from 'path';

/**
 * ============================================================================
 * LUMA BREATHWORK — ADVERSARIAL SEO, METADATA & SCHEMA.ORG CHALLENGER SUITE
 * ============================================================================
 * 
 * Adversarial stress-testing of all 11 static routes generated in dist/:
 * 1. Metadata Presence, Multiplicity & Formatting (Title, Description, Canonical, Robots)
 * 2. SERP Bounds Stress-Testing (Title < 65 chars, Description 100-165 chars)
 * 3. Deep Schema.org JSON-LD Graph Parsing, Type Conformance & Entity URL Resolution
 * 4. OpenGraph & Twitter Card Images, Dimensions (1200x630) & Alt Tags
 * 5. Comprehensive Internal Link & Asset Existence Crawl (href, src, anchor hashes)
 * 6. SSR DOM Markup Integrity in #root
 * ============================================================================
 */

interface RouteConfig {
  path: string;
  distFile: string;
  canonicalUrl: string;
  expectedRequiredSchemaTypes: string[];
  expectedOptionalSchemaTypes?: string[][];
  requiresBreadcrumb: boolean;
}

const ROUTES: RouteConfig[] = [
  {
    path: '/',
    distFile: 'index.html',
    canonicalUrl: 'https://luma-breath.work/',
    expectedRequiredSchemaTypes: ['WebSite', 'SoftwareApplication', 'Organization', 'FAQPage'],
    requiresBreadcrumb: false,
  },
  {
    path: '/timer',
    distFile: 'timer/index.html',
    canonicalUrl: 'https://luma-breath.work/timer',
    expectedRequiredSchemaTypes: ['WebApplication'],
    requiresBreadcrumb: true,
  },
  {
    path: '/guide/wim-hof-method',
    distFile: 'guide/wim-hof-method/index.html',
    canonicalUrl: 'https://luma-breath.work/guide/wim-hof-method',
    expectedRequiredSchemaTypes: ['HowTo'],
    requiresBreadcrumb: true,
  },
  {
    path: '/retention-times',
    distFile: 'retention-times/index.html',
    canonicalUrl: 'https://luma-breath.work/retention-times',
    expectedRequiredSchemaTypes: ['MedicalWebPage'],
    requiresBreadcrumb: true,
  },
  {
    path: '/science-and-safety',
    distFile: 'science-and-safety/index.html',
    canonicalUrl: 'https://luma-breath.work/science-and-safety',
    expectedRequiredSchemaTypes: ['MedicalWebPage'],
    requiresBreadcrumb: true,
  },
  {
    path: '/apple-watch',
    distFile: 'apple-watch/index.html',
    canonicalUrl: 'https://luma-breath.work/apple-watch',
    expectedRequiredSchemaTypes: ['SoftwareApplication'],
    requiresBreadcrumb: true,
  },
  {
    path: '/faq',
    distFile: 'faq/index.html',
    canonicalUrl: 'https://luma-breath.work/faq',
    expectedRequiredSchemaTypes: ['FAQPage'],
    requiresBreadcrumb: true,
  },
  {
    path: '/about',
    distFile: 'about/index.html',
    canonicalUrl: 'https://luma-breath.work/about',
    expectedRequiredSchemaTypes: [],
    expectedOptionalSchemaTypes: [['ProfilePage', 'Organization', 'AboutPage']],
    requiresBreadcrumb: true,
  },
  {
    path: '/medical-disclaimer',
    distFile: 'medical-disclaimer/index.html',
    canonicalUrl: 'https://luma-breath.work/medical-disclaimer',
    expectedRequiredSchemaTypes: ['MedicalWebPage'],
    requiresBreadcrumb: true,
  },
  {
    path: '/privacy',
    distFile: 'privacy/index.html',
    canonicalUrl: 'https://luma-breath.work/privacy',
    expectedRequiredSchemaTypes: ['WebPage'],
    requiresBreadcrumb: true,
  },
  {
    path: '/terms',
    distFile: 'terms/index.html',
    canonicalUrl: 'https://luma-breath.work/terms',
    expectedRequiredSchemaTypes: ['WebPage'],
    requiresBreadcrumb: true,
  },
];

interface TestCheckResult {
  suite: string;
  testId: string;
  name: string;
  pass: boolean;
  details: string;
  error?: string;
}

const results: TestCheckResult[] = [];

function record(suite: string, testId: string, name: string, pass: boolean, details: string, error?: string) {
  results.push({ suite, testId, name, pass, details, error });
  const icon = pass ? '✔ PASS' : '✘ FAIL';
  console.log(`[${suite}] ${icon} ${testId}: ${name}`);
  console.log(`       Details: ${details}`);
  if (error) {
    console.error(`       ERROR:   ${error}`);
  }
}

// Helpers
const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

function fileExistsInDistOrPublic(relUrlPath: string): boolean {
  // Clean URL query or hash
  const cleanPath = relUrlPath.split('?')[0].split('#')[0];
  if (!cleanPath || cleanPath === '/') {
    return fs.existsSync(path.join(distDir, 'index.html'));
  }
  const stripped = cleanPath.replace(/^\//, '');
  
  // Try direct file in dist
  const distDirect = path.join(distDir, stripped);
  if (fs.existsSync(distDirect) && fs.statSync(distDirect).isFile()) return true;

  // Try directory index.html in dist
  const distIndex = path.join(distDir, stripped, 'index.html');
  if (fs.existsSync(distIndex) && fs.statSync(distIndex).isFile()) return true;

  // Try direct file in public
  const publicDirect = path.join(publicDir, stripped);
  if (fs.existsSync(publicDirect) && fs.statSync(publicDirect).isFile()) return true;

  return false;
}

function resolveAssetOrUrl(urlStr: string): { isLocal: boolean; exists: boolean; localPath?: string; hash?: string } {
  if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
    if (urlStr.startsWith('https://luma-breath.work') || urlStr.startsWith('http://luma-breath.work')) {
      const u = new URL(urlStr);
      const exists = fileExistsInDistOrPublic(u.pathname);
      return { isLocal: true, exists, localPath: u.pathname, hash: u.hash };
    }
    return { isLocal: false, exists: true }; // external URL
  }
  if (urlStr.startsWith('/') || urlStr.startsWith('./') || urlStr.startsWith('../') || !urlStr.includes(':')) {
    const hash = urlStr.includes('#') ? urlStr.slice(urlStr.indexOf('#')) : undefined;
    const exists = fileExistsInDistOrPublic(urlStr);
    return { isLocal: true, exists, localPath: urlStr, hash };
  }
  return { isLocal: false, exists: true };
}

async function runAdversarialTest() {
  console.log('\n================================================================================');
  console.log('⚡ ADVERSARIAL SEO, METADATA & SCHEMA.ORG CHALLENGER HARNESS ⚡');
  console.log(`Working Directory: ${rootDir}`);
  console.log(`Dist Directory:    ${distDir}`);
  console.log(`Timestamp:         ${new Date().toISOString()}`);
  console.log('================================================================================\n');

  if (!fs.existsSync(distDir)) {
    console.error('FATAL: dist/ directory does not exist! Run build first.');
    process.exit(1);
  }

  const loadedHtmls = new Map<string, string>();

  // --------------------------------------------------------------------------
  // SUITE 1: Route HTML Existence & Static File Integrity
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 1: SSG Route HTML Output & Non-Empty Check] ---');
  for (const r of ROUTES) {
    const fullPath = path.join(distDir, r.distFile);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
      record('SUITE 1', `R-EXIST-${r.path}`, `Route static file exists: ${r.path}`, false, `File missing at dist/${r.distFile}`, 'File not found');
      continue;
    }
    const stat = fs.statSync(fullPath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    loadedHtmls.set(r.path, content);

    const isNonTrivial = stat.size > 1000;
    record('SUITE 1', `R-EXIST-${r.path}`, `Route static file exists: ${r.path}`, isNonTrivial, `dist/${r.distFile} size: ${stat.size} bytes`, isNonTrivial ? undefined : 'File too small');
  }

  // --------------------------------------------------------------------------
  // SUITE 2: Meta Tags Multiplicity, Uniqueness & Format Stress-Testing
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 2: Meta Tags Multiplicity, Exact Matching & Format] ---');

  const titlesCollected: { path: string; title: string; length: number }[] = [];
  const descriptionsCollected: { path: string; desc: string; length: number }[] = [];
  const canonicalsCollected: { path: string; canonical: string }[] = [];

  for (const r of ROUTES) {
    const html = loadedHtmls.get(r.path);
    if (!html) continue;

    // 1. Title tags multiplicity (<title> must occur exactly once)
    const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
    const titleCount = titleMatches.length;
    const titleText = titleMatches[0] ? titleMatches[0][1].trim() : '';

    record(
      'SUITE 2',
      `TITLE-MULT-${r.path}`,
      `Single <title> tag on ${r.path}`,
      titleCount === 1,
      `Found ${titleCount} <title> tag(s). Title text: "${titleText}"`,
      titleCount !== 1 ? `Expected exactly 1 <title>, found ${titleCount}` : undefined
    );

    titlesCollected.push({ path: r.path, title: titleText, length: titleText.length });

    // 2. Meta description multiplicity
    const metaDescMatches = [...html.matchAll(/<meta\s+[^>]*?name=["']description["'][^>]*?content=["']([^"']*)["']/gi)];
    const metaDescRevMatches = [...html.matchAll(/<meta\s+[^>]*?content=["']([^"']*)["'][^>]*?name=["']description["']/gi)];
    const totalDescMatches = [...metaDescMatches, ...metaDescRevMatches];
    const descCount = totalDescMatches.length;
    const descText = totalDescMatches[0] ? totalDescMatches[0][1].trim() : '';

    record(
      'SUITE 2',
      `DESC-MULT-${r.path}`,
      `Single <meta name="description"> tag on ${r.path}`,
      descCount === 1,
      `Found ${descCount} description tag(s). Length: ${descText.length}`,
      descCount !== 1 ? `Expected exactly 1 meta description, found ${descCount}` : undefined
    );

    descriptionsCollected.push({ path: r.path, desc: descText, length: descText.length });

    // 3. Canonical multiplicity & exact URL match
    const canonicalMatches = [...html.matchAll(/<link\s+[^>]*?rel=["']canonical["'][^>]*?href=["']([^"']*)["']/gi)];
    const canonicalRevMatches = [...html.matchAll(/<link\s+[^>]*?href=["']([^"']*)["'][^>]*?rel=["']canonical["']/gi)];
    const totalCanonicalMatches = [...canonicalMatches, ...canonicalRevMatches];
    const canonicalCount = totalCanonicalMatches.length;
    const canonicalHref = totalCanonicalMatches[0] ? totalCanonicalMatches[0][1].trim() : '';

    const canonicalMatchesExpected = canonicalHref === r.canonicalUrl;
    record(
      'SUITE 2',
      `CANONICAL-${r.path}`,
      `Single exact <link rel="canonical"> on ${r.path}`,
      canonicalCount === 1 && canonicalMatchesExpected,
      `Canonical: "${canonicalHref}" (Expected: "${r.canonicalUrl}", Count: ${canonicalCount})`,
      (canonicalCount !== 1 || !canonicalMatchesExpected) ? `Canonical tag invalid or mismatched` : undefined
    );

    canonicalsCollected.push({ path: r.path, canonical: canonicalHref });

    // 4. Meta robots tag
    const robotsMatch = html.match(/<meta\s+[^>]*?name=["']robots["'][^>]*?content=["']([^"']*)["']/i);
    const robotsContent = robotsMatch ? robotsMatch[1] : '';
    const hasIndexFollow = robotsContent.includes('index') && robotsContent.includes('follow');
    record(
      'SUITE 2',
      `ROBOTS-${r.path}`,
      `Robots meta tag specifies index, follow on ${r.path}`,
      Boolean(robotsMatch) && hasIndexFollow,
      `Robots content: "${robotsContent}"`,
      !hasIndexFollow ? 'Missing or improper robots directive' : undefined
    );

    // 5. OpenGraph & Twitter consistency
    const ogTitleMatch = html.match(/<meta\s+[^>]*?property=["']og:title["'][^>]*?content=["']([^"']*)["']/i);
    const twTitleMatch = html.match(/<meta\s+[^>]*?name=["']twitter:title["'][^>]*?content=["']([^"']*)["']/i);
    const ogDescMatch = html.match(/<meta\s+[^>]*?property=["']og:description["'][^>]*?content=["']([^"']*)["']/i);
    const twDescMatch = html.match(/<meta\s+[^>]*?name=["']twitter:description["'][^>]*?content=["']([^"']*)["']/i);
    const ogUrlMatch = html.match(/<meta\s+[^>]*?property=["']og:url["'][^>]*?content=["']([^"']*)["']/i);

    const ogMatchesCanonical = ogUrlMatch ? ogUrlMatch[1] === r.canonicalUrl : false;
    record(
      'SUITE 2',
      `OG-TW-SYNC-${r.path}`,
      `OG/Twitter Title, Desc & URL sync on ${r.path}`,
      Boolean(ogTitleMatch && twTitleMatch && ogDescMatch && twDescMatch && ogMatchesCanonical),
      `OG URL: "${ogUrlMatch ? ogUrlMatch[1] : 'none'}" | Canonical: "${r.canonicalUrl}"`,
      !ogMatchesCanonical ? 'OG URL does not match Canonical URL' : undefined
    );
  }

  // 6. Uniqueness across all routes
  console.log('\n--- [SUITE 2b: Cross-Route Uniqueness Stress-Tests] ---');
  const uniqueTitles = new Set(titlesCollected.map(t => t.title));
  record(
    'SUITE 2',
    'UNIQUE-TITLES',
    'All 11 routes have globally unique <title> tags',
    uniqueTitles.size === ROUTES.length,
    `${uniqueTitles.size} unique titles out of ${titlesCollected.length} routes`,
    uniqueTitles.size !== ROUTES.length ? 'Detected duplicate title across routes' : undefined
  );

  const uniqueDescriptions = new Set(descriptionsCollected.map(d => d.desc));
  record(
    'SUITE 2',
    'UNIQUE-DESCRIPTIONS',
    'All 11 routes have globally unique <meta name="description"> tags',
    uniqueDescriptions.size === ROUTES.length,
    `${uniqueDescriptions.size} unique descriptions out of ${descriptionsCollected.length} routes`,
    uniqueDescriptions.size !== ROUTES.length ? 'Detected duplicate meta description across routes' : undefined
  );

  const uniqueCanonicals = new Set(canonicalsCollected.map(c => c.canonical));
  record(
    'SUITE 2',
    'UNIQUE-CANONICALS',
    'All 11 routes have globally unique canonical URLs',
    uniqueCanonicals.size === ROUTES.length,
    `${uniqueCanonicals.size} unique canonical URLs out of ${canonicalsCollected.length} routes`,
    uniqueCanonicals.size !== ROUTES.length ? 'Detected duplicate canonical URLs across routes' : undefined
  );

  // --------------------------------------------------------------------------
  // SUITE 3: SERP Length Boundary Conditions (< 65 chars title, 100-165 chars desc)
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 3: SERP Length Constraints (<65 Title, 100-165 Desc)] ---');
  for (const t of titlesCollected) {
    const pass = t.length >= 15 && t.length < 65;
    record(
      'SUITE 3',
      `LEN-TITLE-${t.path}`,
      `Title length for ${t.path} (< 65 chars, >= 15)`,
      pass,
      `Length: ${t.length} chars | "${t.title}"`,
      !pass ? `Title length ${t.length} violates constraint [15, 64]` : undefined
    );
  }

  for (const d of descriptionsCollected) {
    const pass = d.length >= 100 && d.length <= 165;
    record(
      'SUITE 3',
      `LEN-DESC-${d.path}`,
      `Description length for ${d.path} (100–165 chars)`,
      pass,
      `Length: ${d.length} chars | "${d.desc.slice(0, 70)}..."`,
      !pass ? `Description length ${d.length} outside optimal bounds [100, 165]` : undefined
    );
  }

  // --------------------------------------------------------------------------
  // SUITE 4: Schema.org JSON-LD Graph Deep Validation & URL Verification
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 4: Schema.org JSON-LD Graph, Required Types & Entity Links] ---');

  for (const r of ROUTES) {
    const html = loadedHtmls.get(r.path);
    if (!html) continue;

    const ldMatches = [...html.matchAll(/<script\s+[^>]*?type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    if (ldMatches.length === 0) {
      record('SUITE 4', `SCHEMA-TAG-${r.path}`, `Schema.org script tag exists on ${r.path}`, false, 'No ld+json script found', 'Missing structured data');
      continue;
    }

    let parsedGraph: any = null;
    let jsonValid = true;
    let parseError = '';

    try {
      const rawJson = ldMatches[0][1].trim();
      parsedGraph = JSON.parse(rawJson);
    } catch (e: any) {
      jsonValid = false;
      parseError = e.message;
    }

    record(
      'SUITE 4',
      `SCHEMA-JSON-${r.path}`,
      `Valid JSON syntax in Schema.org ld+json on ${r.path}`,
      jsonValid,
      jsonValid ? 'JSON parsed cleanly' : `JSON syntax error: ${parseError}`,
      !jsonValid ? parseError : undefined
    );

    if (!jsonValid || !parsedGraph) continue;

    // Check @context and @graph
    const hasContext = parsedGraph['@context'] === 'https://schema.org';
    const hasGraphArray = Array.isArray(parsedGraph['@graph']) && parsedGraph['@graph'].length > 0;

    record(
      'SUITE 4',
      `SCHEMA-GRAPH-${r.path}`,
      `@graph array with @context "https://schema.org" on ${r.path}`,
      hasContext && hasGraphArray,
      `@context: "${parsedGraph['@context']}", Entities count: ${parsedGraph['@graph']?.length || 0}`,
      (!hasContext || !hasGraphArray) ? 'Invalid @context or missing @graph array' : undefined
    );

    if (!hasGraphArray) continue;

    // Collect all @type in graph
    const foundTypes: string[] = [];
    const entityUrlsToCheck: string[] = [];

    function inspectEntity(entity: any) {
      if (!entity || typeof entity !== 'object') return;
      if (Array.isArray(entity)) {
        entity.forEach(inspectEntity);
        return;
      }
      if (entity['@type']) {
        if (Array.isArray(entity['@type'])) {
          foundTypes.push(...entity['@type']);
        } else {
          foundTypes.push(entity['@type']);
        }
      }
      // Collect URLs
      ['url', 'logo', 'image', 'screenshot', 'item', 'sameAs'].forEach(field => {
        if (entity[field]) {
          if (typeof entity[field] === 'string') {
            entityUrlsToCheck.push(entity[field]);
          } else if (Array.isArray(entity[field])) {
            entity[field].forEach((u: any) => typeof u === 'string' && entityUrlsToCheck.push(u));
          } else if (typeof entity[field] === 'object' && entity[field]['@id']) {
            entityUrlsToCheck.push(entity[field]['@id']);
          }
        }
      });
      // Recurse into object properties
      for (const k of Object.keys(entity)) {
        if (typeof entity[k] === 'object') {
          inspectEntity(entity[k]);
        }
      }
    }

    parsedGraph['@graph'].forEach(inspectEntity);

    // Required types check
    const missingRequired = r.expectedRequiredSchemaTypes.filter(t => !foundTypes.includes(t));
    let optionalPass = true;
    if (r.expectedOptionalSchemaTypes) {
      for (const group of r.expectedOptionalSchemaTypes) {
        if (!group.some(t => foundTypes.includes(t))) {
          optionalPass = false;
        }
      }
    }

    let breadcrumbPass = true;
    if (r.requiresBreadcrumb) {
      breadcrumbPass = foundTypes.includes('BreadcrumbList');
    }

    const typePass = missingRequired.length === 0 && optionalPass && breadcrumbPass;
    record(
      'SUITE 4',
      `SCHEMA-TYPES-${r.path}`,
      `Required schema types present for ${r.path}`,
      typePass,
      `Found: [${[...new Set(foundTypes)].join(', ')}] | Required: [${r.expectedRequiredSchemaTypes.join(', ')}]${r.requiresBreadcrumb ? ' + BreadcrumbList' : ''}`,
      !typePass ? `Missing types: ${missingRequired.join(', ')} (Breadcrumb: ${breadcrumbPass})` : undefined
    );

    // Validate local URLs referenced in Schema.org
    let brokenSchemaUrls: string[] = [];
    for (const urlStr of entityUrlsToCheck) {
      const res = resolveAssetOrUrl(urlStr);
      if (res.isLocal && !res.exists) {
        brokenSchemaUrls.push(urlStr);
      }
    }

    record(
      'SUITE 4',
      `SCHEMA-URLS-${r.path}`,
      `All entity URLs referenced in schema resolve on ${r.path}`,
      brokenSchemaUrls.length === 0,
      `Checked ${entityUrlsToCheck.length} schema URLs. Broken: ${brokenSchemaUrls.length}`,
      brokenSchemaUrls.length > 0 ? `Broken URLs in schema: ${brokenSchemaUrls.join(', ')}` : undefined
    );
  }

  // --------------------------------------------------------------------------
  // SUITE 5: OpenGraph & Twitter Card Image Dimensions & Alt Tags
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 5: OpenGraph & Twitter Card Images (1200x630) & Alt Tags] ---');

  for (const r of ROUTES) {
    const html = loadedHtmls.get(r.path);
    if (!html) continue;

    const ogImageMatch = html.match(/<meta\s+[^>]*?property=["']og:image["'][^>]*?content=["']([^"']*)["']/i);
    const ogWidthMatch = html.match(/<meta\s+[^>]*?property=["']og:image:width["'][^>]*?content=["']([^"']*)["']/i);
    const ogHeightMatch = html.match(/<meta\s+[^>]*?property=["']og:image:height["'][^>]*?content=["']([^"']*)["']/i);
    const ogAltMatch = html.match(/<meta\s+[^>]*?property=["']og:image:alt["'][^>]*?content=["']([^"']*)["']/i);
    const twCardMatch = html.match(/<meta\s+[^>]*?name=["']twitter:card["'][^>]*?content=["']([^"']*)["']/i);
    const twImageMatch = html.match(/<meta\s+[^>]*?name=["']twitter:image["'][^>]*?content=["']([^"']*)["']/i);

    const ogImage = ogImageMatch ? ogImageMatch[1] : '';
    const ogWidth = ogWidthMatch ? ogWidthMatch[1] : '';
    const ogHeight = ogHeightMatch ? ogHeightMatch[1] : '';
    const ogAlt = ogAltMatch ? ogAltMatch[1] : '';
    const twCard = twCardMatch ? twCardMatch[1] : '';
    const twImage = twImageMatch ? twImageMatch[1] : '';

    const imageRes = ogImage ? resolveAssetOrUrl(ogImage) : { isLocal: true, exists: false };
    const imageExists = imageRes.exists;

    const dimensionsValid = ogWidth === '1200' && ogHeight === '630';
    const altValid = ogAlt.length > 5;
    const cardValid = twCard === 'summary_large_image';
    const twImageValid = twImage === ogImage;

    const ogPass = Boolean(ogImage) && imageExists && dimensionsValid && altValid && cardValid && twImageValid;

    record(
      'SUITE 5',
      `OG-IMAGE-${r.path}`,
      `OG/Twitter image, 1200x630 dimensions & alt tag on ${r.path}`,
      ogPass,
      `Image: "${ogImage}" (${ogWidth}x${ogHeight}), Alt: "${ogAlt}", Card: "${twCard}", Exists: ${imageExists}`,
      !ogPass ? `OG Image configuration invalid on ${r.path} (ImageExists: ${imageExists}, Dimensions: ${dimensionsValid}, Alt: ${altValid}, Card: ${cardValid})` : undefined
    );
  }

  // --------------------------------------------------------------------------
  // SUITE 6: Broken Internal Link & Asset Existence Crawl
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 6: Internal Link & Asset Exhaustive Crawler] ---');

  let totalLinksChecked = 0;
  let totalImagesChecked = 0;
  const brokenLinks: { route: string; target: string; reason: string }[] = [];
  const brokenMedia: { route: string; target: string; reason: string }[] = [];

  for (const r of ROUTES) {
    const html = loadedHtmls.get(r.path);
    if (!html) continue;

    // Extract all <a href="...">
    const aMatches = [...html.matchAll(/<a\b[^>]*?href=["']([^"']*)["']/gi)];
    for (const m of aMatches) {
      const href = m[1].trim();
      totalLinksChecked++;

      if (!href || href === '#' || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        continue;
      }

      // Check for malformed variable interpolations
      if (href.includes('undefined') || href.includes('null') || href.includes('[object Object]')) {
        brokenLinks.push({ route: r.path, target: href, reason: 'Malformed JS interpolation in href' });
        continue;
      }

      const res = resolveAssetOrUrl(href);
      if (res.isLocal) {
        if (!res.exists) {
          brokenLinks.push({ route: r.path, target: href, reason: 'Target route or file does not exist on disk' });
        } else if (res.hash && !res.localPath) {
          // Same page hash anchor check (e.g. #faq, #features)
          const targetId = res.hash.replace(/^#/, '');
          const hasId = html.includes(`id="${targetId}"`) || html.includes(`id='${targetId}'`);
          if (!hasId) {
            brokenLinks.push({ route: r.path, target: href, reason: `Anchor ID #${targetId} not found in page HTML` });
          }
        }
      }
    }

    // Extract all <img src="...">, <source src="...">, <video src="...">, <video poster="...">
    const mediaMatches = [
      ...[...html.matchAll(/<img\b[^>]*?src=["']([^"']*)["']/gi)].map(m => ({ tag: 'img', src: m[1] })),
      ...[...html.matchAll(/<video\b[^>]*?src=["']([^"']*)["']/gi)].map(m => ({ tag: 'video', src: m[1] })),
      ...[...html.matchAll(/<video\b[^>]*?poster=["']([^"']*)["']/gi)].map(m => ({ tag: 'video-poster', src: m[1] })),
      ...[...html.matchAll(/<source\b[^>]*?src=["']([^"']*)["']/gi)].map(m => ({ tag: 'source', src: m[1] })),
    ];

    for (const item of mediaMatches) {
      const src = item.src.trim();
      totalImagesChecked++;

      if (!src || src.startsWith('data:')) continue;

      if (src.includes('undefined') || src.includes('null') || src.includes('[object Object]')) {
        brokenMedia.push({ route: r.path, target: src, reason: 'Malformed JS interpolation in src' });
        continue;
      }

      const res = resolveAssetOrUrl(src);
      if (res.isLocal && !res.exists) {
        brokenMedia.push({ route: r.path, target: src, reason: `Asset not found in dist or public (${item.tag})` });
      }
    }
  }

  record(
    'SUITE 6',
    'INTERNAL-LINKS-CRAWL',
    'All internal <a> href links point to existing routes / valid anchors',
    brokenLinks.length === 0,
    `Checked ${totalLinksChecked} internal <a> links across all routes. Broken: ${brokenLinks.length}`,
    brokenLinks.length > 0 ? brokenLinks.map(b => `${b.route} -> "${b.target}" (${b.reason})`).slice(0, 5).join('; ') : undefined
  );

  record(
    'SUITE 6',
    'MEDIA-ASSETS-CRAWL',
    'All <img>, <video>, <source>, poster assets exist on disk',
    brokenMedia.length === 0,
    `Checked ${totalImagesChecked} media/asset references across all routes. Broken: ${brokenMedia.length}`,
    brokenMedia.length > 0 ? brokenMedia.map(b => `${b.route} -> "${b.target}" (${b.reason})`).slice(0, 5).join('; ') : undefined
  );

  // --------------------------------------------------------------------------
  // SUITE 7: SSR Static Markup Integrity in #root
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 7: SSR DOM Content in <div id="root">] ---');

  for (const r of ROUTES) {
    const html = loadedHtmls.get(r.path);
    if (!html) continue;

    const rootMatch = html.match(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>(?:\s*<script|\s*<\/body>)/i);
    const rootContent = rootMatch ? rootMatch[1].trim() : '';
    const rootLen = rootContent.length;

    // Check for essential rendered content
    const hasNav = /<nav\b/i.test(rootContent);
    const hasFooter = /<footer\b/i.test(rootContent);
    const hasH1 = /<h1\b/i.test(rootContent);
    const pass = rootLen > 500 && hasNav && hasFooter && hasH1;

    record(
      'SUITE 7',
      `SSR-ROOT-${r.path}`,
      `Substantial pre-rendered SSR DOM markup in #root for ${r.path}`,
      pass,
      `Root HTML length: ${rootLen} chars (Nav: ${hasNav}, Footer: ${hasFooter}, H1: ${hasH1})`,
      !pass ? `Incomplete SSR DOM in #root for ${r.path} (Length: ${rootLen}, Nav: ${hasNav}, Footer: ${hasFooter}, H1: ${hasH1})` : undefined
    );
  }

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n================================================================================');
  console.log('⚡ ADVERSARIAL CHALLENGER VERIFICATION SUMMARY ⚡');
  console.log('================================================================================');
  const total = results.length;
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  console.log(`Total Checks Executed:  ${total}`);
  console.log(`Passed:                 ${passed}`);
  console.log(`Failed:                 ${failed}`);
  console.log(`Verdict:                ${failed === 0 ? 'ALL ADVERSARIAL TESTS PASSED (100%)' : 'FAILURES DETECTED'}`);
  console.log('================================================================================\n');

  // Write JSON report to scratch
  const scratchDir = path.resolve(rootDir, 'scratch');
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }
  const reportPath = path.join(scratchDir, 'adversarial_metadata_results.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    total,
    passed,
    failed,
    verdict: failed === 0 ? 'APPROVE' : 'REQUEST_CHANGES',
    results,
  }, null, 2), 'utf-8');
  console.log(`Report written to: ${reportPath}`);

  return failed === 0;
}

runAdversarialTest().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Fatal error running adversarial tests:', err);
  process.exit(1);
});
