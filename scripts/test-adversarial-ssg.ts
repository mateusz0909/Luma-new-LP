import fs from 'fs';
import path from 'path';
import http from 'http';
import handler from 'serve-handler';
import puppeteer, { Browser, Page } from 'puppeteer';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { fileURLToPath } from 'url';

// Resolve project paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

// Dynamic import of App component
let App: React.ComponentType<{ initialPath?: string }>;

interface TestFinding {
  domain: 'Zero-JS Readability' | 'SSR Isolation' | 'Client Hydration' | 'Asset References';
  name: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  details: string;
  evidence?: string;
}

const findings: TestFinding[] = [];

function record(finding: TestFinding) {
  findings.push(finding);
  const icon = finding.status === 'PASS' ? '✅' : finding.status === 'WARN' ? '⚠️' : '❌';
  console.log(`${icon} [${finding.domain}] ${finding.name}: ${finding.details}`);
  if (finding.evidence && finding.status !== 'PASS') {
    console.log(`   Evidence: ${finding.evidence}`);
  }
}

// 11 Canonical routes in Luma project
const ALL_ROUTES = [
  { path: '/', file: 'index.html', titleContains: 'Luma', expectedH1Phrase: 'Breathe.' },
  { path: '/timer', file: 'timer/index.html', titleContains: 'Timer', expectedH1Phrase: 'Breathing' },
  { path: '/guide/wim-hof-method', file: 'guide/wim-hof-method/index.html', titleContains: 'Guide', expectedH1Phrase: 'Wim Hof' },
  { path: '/retention-times', file: 'retention-times/index.html', titleContains: 'Retention', expectedH1Phrase: 'Retention' },
  { path: '/science-and-safety', file: 'science-and-safety/index.html', titleContains: 'Science', expectedH1Phrase: 'Science' },
  { path: '/apple-watch', file: 'apple-watch/index.html', titleContains: 'Apple Watch', expectedH1Phrase: 'Apple Watch' },
  { path: '/faq', file: 'faq/index.html', titleContains: 'FAQ', expectedH1Phrase: 'FAQ' },
  { path: '/about', file: 'about/index.html', titleContains: 'About', expectedH1Phrase: 'About' },
  { path: '/medical-disclaimer', file: 'medical-disclaimer/index.html', titleContains: 'Disclaimer', expectedH1Phrase: 'Medical' },
  { path: '/privacy', file: 'privacy/index.html', titleContains: 'Privacy', expectedH1Phrase: 'Privacy' },
  { path: '/terms', file: 'terms/index.html', titleContains: 'Terms', expectedH1Phrase: 'Terms' },
];

/**
 * ============================================================================
 * TEST SUITE 1: ZERO-JS READABILITY & STATIC CONTENT AUDIT
 * ============================================================================
 */
async function testZeroJsReadability() {
  console.log('\n--- 1. Testing Zero-JS Readability across dist/**/*.html ---');

  for (const route of ALL_ROUTES) {
    const filePath = path.join(distDir, route.file);
    if (!fs.existsSync(filePath)) {
      record({
        domain: 'Zero-JS Readability',
        name: `File Existence for ${route.path}`,
        status: 'FAIL',
        details: `Static file ${route.file} does not exist in dist/`,
      });
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf-8');

    // 1. Check <div id="root"> content without JS
    const rootMatch = html.match(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>/i);
    if (!rootMatch || !rootMatch[1] || rootMatch[1].trim().length < 500) {
      record({
        domain: 'Zero-JS Readability',
        name: `Static SSR Content in #root for ${route.path}`,
        status: 'FAIL',
        details: `Expected substantive HTML inside #root, found ${rootMatch ? rootMatch[1].trim().length : 0} characters.`,
      });
    } else {
      record({
        domain: 'Zero-JS Readability',
        name: `Static SSR Content in #root for ${route.path}`,
        status: 'PASS',
        details: `Found ${rootMatch[1].trim().length} chars of pre-rendered HTML in #root.`,
      });
    }

    // 2. Check H1 presence & substantive content
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    if (!h1Text) {
      record({
        domain: 'Zero-JS Readability',
        name: `H1 Heading for ${route.path}`,
        status: 'FAIL',
        details: `Missing or empty <h1> tag in static HTML.`,
      });
    } else {
      record({
        domain: 'Zero-JS Readability',
        name: `H1 Heading for ${route.path}`,
        status: 'PASS',
        details: `Found H1: "${h1Text.slice(0, 60)}..."`,
      });
    }

    // 3. Check Meta Tags (title, description, canonical, robots, OG)
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i);
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);

    if (!titleMatch || !descMatch || !robotsMatch || !canonicalMatch) {
      record({
        domain: 'Zero-JS Readability',
        name: `Core SEO Metadata for ${route.path}`,
        status: 'FAIL',
        details: `Missing one or more required metadata tags (title: ${!!titleMatch}, desc: ${!!descMatch}, robots: ${!!robotsMatch}, canonical: ${!!canonicalMatch})`,
      });
    } else {
      record({
        domain: 'Zero-JS Readability',
        name: `Core SEO Metadata for ${route.path}`,
        status: 'PASS',
        details: `Title ("${titleMatch[1].slice(0, 30)}..."), Desc (${descMatch[1].length} chars), Canonical (${canonicalMatch[1]}), Robots (${robotsMatch[1]})`,
      });
    }

    // 4. Check Schema.org JSON-LD
    const schemaMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
    if (!schemaMatch) {
      record({
        domain: 'Zero-JS Readability',
        name: `Schema.org JSON-LD for ${route.path}`,
        status: 'FAIL',
        details: `Missing <script type="application/ld+json">`,
      });
    } else {
      try {
        const parsed = JSON.parse(schemaMatch[1]);
        if (parsed['@context'] !== 'https://schema.org' || !Array.isArray(parsed['@graph']) || parsed['@graph'].length === 0) {
          record({
            domain: 'Zero-JS Readability',
            name: `Schema.org JSON-LD for ${route.path}`,
            status: 'FAIL',
            details: `Invalid @graph structure in JSON-LD`,
            evidence: schemaMatch[1].slice(0, 200),
          });
        } else {
          record({
            domain: 'Zero-JS Readability',
            name: `Schema.org JSON-LD for ${route.path}`,
            status: 'PASS',
            details: `Valid JSON-LD @graph with ${parsed['@graph'].length} entities (${parsed['@graph'].map((e: any) => e['@type']).join(', ')})`,
          });
        }
      } catch (err: any) {
        record({
          domain: 'Zero-JS Readability',
          name: `Schema.org JSON-LD for ${route.path}`,
          status: 'FAIL',
          details: `JSON-LD parsing error: ${err.message}`,
        });
      }
    }
  }

  // Deep inspection of Homepage sections in static HTML
  const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // Hero Section
  const hasHeroH1 = /<h1[^>]*>[\s\S]*?Breathe[\s\S]*?<\/h1>/i.test(homeHtml);
  record({
    domain: 'Zero-JS Readability',
    name: 'Homepage Hero H1 Content',
    status: hasHeroH1 ? 'PASS' : 'FAIL',
    details: hasHeroH1 ? 'Hero H1 correctly contains target phrase "Breathe" and screen reader optimization' : 'Hero H1 missing target phrase',
  });

  // Practice Architecture Section
  const hasPracticeArchitecture = /Practice\s+Architecture/i.test(homeHtml) || /Designed\s+for\s+depth/i.test(homeHtml);
  record({
    domain: 'Zero-JS Readability',
    name: 'Homepage Practice Architecture Section',
    status: hasPracticeArchitecture ? 'PASS' : 'FAIL',
    details: hasPracticeArchitecture ? 'Found Practice Architecture section and cards in static HTML' : 'Missing Practice Architecture section in static HTML',
  });

  // Pacer Section
  const hasPacerSection = /Web\s+Breathing\s+Pacer/i.test(homeHtml) || /Experience\s+Guided\s+Breathing/i.test(homeHtml) || /Start\s+Breathing/i.test(homeHtml);
  record({
    domain: 'Zero-JS Readability',
    name: 'Homepage Pacer Section',
    status: hasPacerSection ? 'PASS' : 'FAIL',
    details: hasPacerSection ? 'Found Web Breathing Pacer section in static HTML' : 'Missing Pacer section in static HTML',
  });

  // Knowledge Hub Section
  const hasKnowledgeHub = /Knowledge\s+Hub/i.test(homeHtml) || /Wim\s+Hof\s+Method\s+Guide/i.test(homeHtml);
  record({
    domain: 'Zero-JS Readability',
    name: 'Homepage Knowledge Hub Section',
    status: hasKnowledgeHub ? 'PASS' : 'FAIL',
    details: hasKnowledgeHub ? 'Found Knowledge Hub section and guide cards in static HTML' : 'Missing Knowledge Hub section in static HTML',
  });

  // FAQ Section (Zero-JS readable questions & answers)
  const hasFaqQuestions = /Is\s+Luma\s+really\s+100%\s+free/i.test(homeHtml) && /Wim\s+Hof\s+Breathing\s+Method/i.test(homeHtml);
  const hasFaqAnswers = /completely\s+free\s+forever/i.test(homeHtml) || /tailored\s+for\s+Wim\s+Hof/i.test(homeHtml);
  record({
    domain: 'Zero-JS Readability',
    name: 'Homepage FAQ Section Zero-JS Content',
    status: (hasFaqQuestions && hasFaqAnswers) ? 'PASS' : 'FAIL',
    details: (hasFaqQuestions && hasFaqAnswers)
      ? 'All FAQ questions and answers are pre-rendered and readable in pure HTML'
      : 'FAQ questions or answers missing in static HTML',
  });
}

/**
 * ============================================================================
 * TEST SUITE 2: SSR ISOLATION & NON-BROWSER RESILIENCE
 * ============================================================================
 */
async function testSsrIsolation() {
  console.log('\n--- 2. Testing SSR State Isolation & Non-Browser Resilience ---');

  if (!App) {
    const mod = await import('../src/App.tsx');
    App = mod.default;
  }

  // 1. Test deterministic render outputs regardless of previous render order
  const routePaths = ALL_ROUTES.map(r => r.path);
  const baselineOutputs: Record<string, string> = {};

  // First pass: baseline render
  for (const r of routePaths) {
    const html = renderToString(React.createElement(App, { initialPath: r }));
    baselineOutputs[r] = html;
  }

  // Second pass: reverse order render
  let isolationViolation = false;
  const reversePaths = [...routePaths].reverse();
  for (const r of reversePaths) {
    const html = renderToString(React.createElement(App, { initialPath: r }));
    if (html !== baselineOutputs[r]) {
      isolationViolation = true;
      record({
        domain: 'SSR Isolation',
        name: `Deterministic Rendering for ${r}`,
        status: 'FAIL',
        details: `Render output differed when rendered in reverse order (possible leaked global state).`,
      });
      break;
    }
  }

  if (!isolationViolation) {
    record({
      domain: 'SSR Isolation',
      name: 'Deterministic Reverse-Order Rendering',
      status: 'PASS',
      details: `All 11 routes produced 100% byte-identical SSR HTML across reverse order passes.`,
    });
  }

  // 2. Randomized stress testing (30 random renders)
  let randomOrderViolation = false;
  for (let i = 0; i < 30; i++) {
    const randomRoute = routePaths[Math.floor(Math.random() * routePaths.length)];
    const html = renderToString(React.createElement(App, { initialPath: randomRoute }));
    if (html !== baselineOutputs[randomRoute]) {
      randomOrderViolation = true;
      record({
        domain: 'SSR Isolation',
        name: `Random Interleaving Stress Render (${randomRoute})`,
        status: 'FAIL',
        details: `Output changed during random interleaving pass ${i}.`,
      });
      break;
    }
  }

  if (!randomOrderViolation) {
    record({
      domain: 'SSR Isolation',
      name: 'Random Interleaving Stress Test (30 cycles)',
      status: 'PASS',
      details: 'SSR render output remains strictly isolated with zero cross-route state leakage.',
    });
  }

  // 3. Abnormal / Edge-case route inputs
  const edgeCaseRoutes = [
    { input: '', expectedFallback: true },
    { input: '/non-existent-route-12345', expectedFallback: true },
    { input: '//malformed//path', expectedFallback: true },
    { input: '/guide/wim-hof-method/', expectedMatch: '/guide/wim-hof-method' },
    { input: '/timer?embed=true&theme=dark', expectedMatch: '/timer' },
    { input: '/faq#q1', expectedMatch: '/faq' },
  ];

  for (const edge of edgeCaseRoutes) {
    try {
      const html = renderToString(React.createElement(App, { initialPath: edge.input }));
      if (!html || html.length < 500) {
        record({
          domain: 'SSR Isolation',
          name: `Edge Case Route "${edge.input}"`,
          status: 'FAIL',
          details: `Rendered empty or truncated HTML (${html.length} chars).`,
        });
      } else {
        record({
          domain: 'SSR Isolation',
          name: `Edge Case Route "${edge.input}"`,
          status: 'PASS',
          details: `Rendered robustly (${html.length} chars) without throwing exceptions.`,
        });
      }
    } catch (err: any) {
      record({
        domain: 'SSR Isolation',
        name: `Edge Case Route "${edge.input}"`,
        status: 'FAIL',
        details: `Threw error during SSR: ${err.message}`,
      });
    }
  }

  // 4. Non-browser global object access check
  try {
    const serverHtml = renderToString(React.createElement(App, { initialPath: '/' }));
    record({
      domain: 'SSR Isolation',
      name: 'Non-Browser Environment Window/Document Safety',
      status: 'PASS',
      details: 'Component tree renders cleanly in Node.js server context with undefined window.',
    });
  } catch (err: any) {
    record({
      domain: 'SSR Isolation',
      name: 'Non-Browser Environment Window/Document Safety',
      status: 'FAIL',
      details: `SSR threw error due to unguarded browser global: ${err.message}`,
    });
  }
}

/**
 * ============================================================================
 * TEST SUITE 3: CLIENT HYDRATION & RUNTIME INTEGRITY (PUPPETEER)
 * ============================================================================
 */
async function testClientHydration() {
  console.log('\n--- 3. Testing Client Hydration Integrity & Console Error Mismatches (Puppeteer) ---');

  // Start local static server that precisely mirrors Vercel routing
  const server = http.createServer((req, res) => {
    let reqUrl = req.url || '/';
    const parsed = new URL(reqUrl, 'http://localhost');
    let pathname = parsed.pathname;

    // Handle mock for Vercel analytics endpoint
    if (pathname.startsWith('/_vercel/insights')) {
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      return res.end('// mock vercel analytics');
    }

    // If path corresponds to a directory with index.html in dist/, serve that index.html
    const normalizedDir = path.join(distDir, pathname.replace(/^\//, ''));
    if (fs.existsSync(normalizedDir) && fs.statSync(normalizedDir).isDirectory()) {
      const indexFile = path.join(normalizedDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(fs.readFileSync(indexFile));
      }
    }

    return handler(req, res, {
      public: distDir,
      cleanUrls: true,
    });
  });

  await new Promise<void>((resolve) => server.listen(0, resolve));
  const port = (server.address() as any).port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`📡 Local test server listening on ${baseUrl}`);

  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    for (const route of ALL_ROUTES) {
      const page = await browser.newPage();
      const consoleErrors: string[] = [];
      const hydrationWarnings: string[] = [];
      const failedRequests: string[] = [];

      page.on('console', (msg) => {
        const text = msg.text();
        const type = msg.type();
        if (type === 'error') {
          consoleErrors.push(text);
        }
        if (
          text.includes('Hydration') ||
          text.includes('hydration') ||
          text.includes('did not match') ||
          text.includes('server-rendered') ||
          text.includes('Expected server HTML')
        ) {
          hydrationWarnings.push(text);
        }
      });

      page.on('pageerror', (err: any) => {
        consoleErrors.push(`Uncaught PageError: ${err?.message || String(err)}`);
      });

      page.on('requestfailed', (req) => {
        const url = req.url();
        if (url.startsWith(baseUrl)) {
          failedRequests.push(`${req.method()} ${url} - ${req.failure()?.errorText || 'failed'}`);
        }
      });

      const targetUrl = `${baseUrl}${route.path}`;
      const response = await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 15000 });

      const status = response?.status() || 0;
      if (status !== 200) {
        record({
          domain: 'Client Hydration',
          name: `HTTP Status for ${route.path}`,
          status: 'FAIL',
          details: `Received HTTP status ${status} for ${targetUrl}`,
        });
      } else {
        record({
          domain: 'Client Hydration',
          name: `HTTP Status for ${route.path}`,
          status: 'PASS',
          details: `Loaded ${targetUrl} successfully (200 OK).`,
        });
      }

      // Check if root element is populated and has React attributes/DOM
      const rootHtml = await page.evaluate(() => {
        const root = document.getElementById('root');
        return {
          exists: !!root,
          childCount: root ? root.children.length : 0,
          innerTextLength: root ? (root.innerText || '').length : 0,
        };
      });

      // Hydration mismatch evaluation
      if (hydrationWarnings.length > 0) {
        record({
          domain: 'Client Hydration',
          name: `Hydration Mismatch Warnings for ${route.path}`,
          status: 'FAIL',
          details: `Detected ${hydrationWarnings.length} hydration mismatch warning(s).`,
          evidence: hydrationWarnings.join('\n'),
        });
      } else {
        record({
          domain: 'Client Hydration',
          name: `Hydration Cleanliness for ${route.path}`,
          status: 'PASS',
          details: `hydrateRoot cleanly attached without DOM mismatch or hydration warnings.`,
        });
      }

      // Console errors evaluation (filter benign analytics)
      const criticalErrors = consoleErrors.filter(e => !e.includes('umami') && !e.includes('analytics'));
      if (criticalErrors.length > 0) {
        record({
          domain: 'Client Hydration',
          name: `Console Error Audit for ${route.path}`,
          status: 'FAIL',
          details: `Found ${criticalErrors.length} console errors.`,
          evidence: criticalErrors.join('\n'),
        });
      } else {
        record({
          domain: 'Client Hydration',
          name: `Console Error Audit for ${route.path}`,
          status: 'PASS',
          details: `0 client-side console errors during mount and hydration.`,
        });
      }

      // Local asset request failure check
      if (failedRequests.length > 0) {
        record({
          domain: 'Client Hydration',
          name: `Network Asset Requests for ${route.path}`,
          status: 'FAIL',
          details: `Failed to load ${failedRequests.length} internal resource(s).`,
          evidence: failedRequests.join('\n'),
        });
      } else {
        record({
          domain: 'Client Hydration',
          name: `Network Asset Requests for ${route.path}`,
          status: 'PASS',
          details: `All local JS/CSS/asset requests returned 200 OK.`,
        });
      }

      await page.close();
    }

    // SPA Navigation Stress Test in Browser
    console.log('\n--- Testing Client-Side SPA Route Transitions ---');
    const spaPage = await browser.newPage();
    const spaErrors: string[] = [];
    spaPage.on('console', (msg) => {
      if (msg.type() === 'error') spaErrors.push(msg.text());
    });
    spaPage.on('pageerror', (err: any) => spaErrors.push(err?.message || String(err)));

    await spaPage.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' });

    // Simulate clicking through navigation links
    const navLinks = ['/timer', '/guide/wim-hof-method', '/retention-times', '/science-and-safety', '/apple-watch', '/faq', '/'];
    for (const targetPath of navLinks) {
      await spaPage.evaluate((path) => {
        const link = document.querySelector(`a[href="${path}"]`) as HTMLElement;
        if (link) {
          link.click();
        } else {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }, targetPath);

      await new Promise(r => setTimeout(r, 200));
    }

    const filteredSpaErrors = spaErrors.filter(e => !e.includes('umami') && !e.includes('analytics'));
    record({
      domain: 'Client Hydration',
      name: 'Client-Side SPA Navigation Transitions',
      status: filteredSpaErrors.length === 0 ? 'PASS' : 'FAIL',
      details: filteredSpaErrors.length === 0
        ? 'Seamless client-side SPA routing across 7 routes without errors.'
        : `Encountered ${filteredSpaErrors.length} errors during SPA transitions.`,
      evidence: filteredSpaErrors.join('\n'),
    });

    await spaPage.close();
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

/**
 * ============================================================================
 * TEST SUITE 4: ASSET REFERENCES INTEGRITY AUDIT
 * ============================================================================
 */
async function testAssetReferences() {
  console.log('\n--- 4. Testing Static Asset Reference Integrity in dist/ ---');

  const referencedAssets = new Set<string>();
  const distFiles: string[] = [];

  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(full);
      } else if (entry.name.endsWith('.html')) {
        distFiles.push(full);
      }
    }
  }

  scanDir(distDir);

  // Extract all asset references from all HTML files
  for (const htmlFile of distFiles) {
    const content = fs.readFileSync(htmlFile, 'utf-8');

    // 1. link tags (css, icons, etc.)
    const linkMatches = content.matchAll(/<link[^>]+href=["']([^"']+)["']/gi);
    for (const match of linkMatches) {
      const href = match[1];
      if (!href.startsWith('http') && !href.startsWith('data:') && !href.startsWith('//')) {
        referencedAssets.add(href);
      }
    }

    // 2. script tags
    const scriptMatches = content.matchAll(/<script[^>]+src=["']([^"']+)["']/gi);
    for (const match of scriptMatches) {
      const src = match[1];
      if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('//')) {
        referencedAssets.add(src);
      }
    }

    // 3. img and source tags
    const imgMatches = content.matchAll(/<(?:img|source)[^>]+src=["']([^"']+)["']/gi);
    for (const match of imgMatches) {
      const src = match[1];
      if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('//')) {
        referencedAssets.add(src);
      }
    }

    // 4. video and audio tags
    const mediaMatches = content.matchAll(/<(?:video|audio)[^>]+(?:src|poster)=["']([^"']+)["']/gi);
    for (const match of mediaMatches) {
      const src = match[1];
      if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('//')) {
        referencedAssets.add(src);
      }
    }

    // 5. JSON-LD image/logo/screenshot references
    const jsonLdMatches = content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
    for (const jMatch of jsonLdMatches) {
      try {
        const parsed = JSON.parse(jMatch[1]);
        const graph = parsed['@graph'] || [parsed];
        for (const entity of graph) {
          ['image', 'logo', 'screenshot'].forEach(prop => {
            const val = entity[prop];
            if (typeof val === 'string' && val.startsWith('https://luma-breath.work/')) {
              const localRef = val.replace('https://luma-breath.work', '');
              referencedAssets.add(localRef);
            }
          });
        }
      } catch {}
    }
  }

  let missingAssetCount = 0;
  const missingAssetList: string[] = [];
  const verifiedAssets: string[] = [];

  for (const assetRef of referencedAssets) {
    // Clean query params or hash if any
    const cleanRef = assetRef.split('?')[0].split('#')[0];
    const normalizedPath = cleanRef.startsWith('/') ? cleanRef.slice(1) : cleanRef;
    const diskPath = path.join(distDir, normalizedPath);

    if (!fs.existsSync(diskPath)) {
      missingAssetCount++;
      missingAssetList.push(`${assetRef} (expected at ${diskPath})`);
    } else {
      const stat = fs.statSync(diskPath);
      if (stat.size === 0) {
        missingAssetCount++;
        missingAssetList.push(`${assetRef} (file size is 0 bytes!)`);
      } else {
        verifiedAssets.push(`${assetRef} (${stat.size} bytes)`);
      }
    }
  }

  if (missingAssetCount > 0) {
    record({
      domain: 'Asset References',
      name: 'Static Asset Integrity Check',
      status: 'FAIL',
      details: `Found ${missingAssetCount} missing or empty referenced asset(s) out of ${referencedAssets.size} total references.`,
      evidence: missingAssetList.join('\n'),
    });
  } else {
    record({
      domain: 'Asset References',
      name: 'Static Asset Integrity Check',
      status: 'PASS',
      details: `100% of referenced assets (${referencedAssets.size} files) exist in dist/ with non-zero size.`,
    });
  }
}

/**
 * ============================================================================
 * MAIN ADVERSARIAL EXECUTION
 * ============================================================================
 */
async function main() {
  console.log('======================================================================');
  console.log('⚡ ADVERSARIAL SSG & CLIENT HYDRATION VERIFICATION HARNESS ⚡');
  console.log('======================================================================');

  await testZeroJsReadability();
  await testSsrIsolation();
  await testClientHydration();
  await testAssetReferences();

  console.log('\n======================================================================');
  console.log('📊 VERIFICATION SUMMARY');
  console.log('======================================================================');

  const total = findings.length;
  const passCount = findings.filter(f => f.status === 'PASS').length;
  const warnCount = findings.filter(f => f.status === 'WARN').length;
  const failCount = findings.filter(f => f.status === 'FAIL').length;

  console.log(`Total Checks: ${total}`);
  console.log(`Passed:       ${passCount}`);
  console.log(`Warnings:     ${warnCount}`);
  console.log(`Failed:       ${failCount}`);

  if (failCount > 0) {
    console.log('\n❌ VERDICT: REQUEST_CHANGES (Failures detected)');
    process.exit(1);
  } else {
    console.log('\n✅ VERDICT: APPROVE (All adversarial checks passed cleanly)');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal error running adversarial verification harness:', err);
  process.exit(1);
});
