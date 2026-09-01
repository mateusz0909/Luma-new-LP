import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import http from 'http';
import handler from 'serve-handler';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

// The routes we need to visit
const routes = [
  '/',
  '/timer',
  '/guide/wim-hof-method',
  '/retention-times',
  '/science-and-safety',
  '/apple-watch',
  '/faq',
  '/about',
  '/medical-disclaimer',
  '/privacy',
  '/terms'
];

async function run() {
  console.log('🚀 Starting Puppeteer SSG Prerenderer...');
  
  // 1. Start a simple static server for the dist directory
  const server = http.createServer((request, response) => {
    // Serve static files from dist. serve-handler will automatically resolve /timer to /timer/index.html
    return handler(request, response, {
      public: distDir,
      cleanUrls: true
    });
  });

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`🌍 Local server running on http://localhost:${port}`);

  // 2. Launch Puppeteer
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Speed up loading by blocking unnecessary requests if any
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.resourceType() === 'image' || req.resourceType() === 'media') {
      req.abort();
    } else {
      req.continue();
    }
  });

  // 3. Visit each route and capture the fully rendered HTML
  for (const route of routes) {
    const url = `http://localhost:${port}${route}`;
    console.log(`⏳ Rendering ${route}...`);
    
    // Go to URL and wait for DOM and initial network requests
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    
    // Wait for the main content to be hydrated by React
    await page.waitForSelector('#main-content', { timeout: 10000 }).catch(() => console.log('Timeout waiting for #main-content'));
    
    // Give it a brief moment for any immediate useEffects to render
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Extract the full HTML
    let html = await page.content();
    
    // Remove the Umami script during SSG so we don't track the build, it's already in index.html but puppeteer executes it
    // Wait, page.content() gets the current DOM. The original index.html has scripts.
    
    // Save it to the correct path
    const targetDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, html, 'utf-8');
    
    console.log(`✅ Saved ${targetFile}`);
  }

  await browser.close();
  server.close();
  console.log('🎉 Puppeteer SSG Completed Successfully!');
}

run().catch(console.error);
