import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.resolve('artifacts', 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/studio', name: 'studio' },
  { path: '/brands', name: 'brands' },
  { path: '/brands/brand-one', name: 'brand-one-detail' },
  { path: '/products', name: 'products' },
  { path: '/products/i-hate-love-pdf', name: 'product-pdf-detail' },
  { path: '/products/product-forum', name: 'product-forum-detail' },
  { path: '/products/gitfc', name: 'product-gitfc-detail' },
  { path: '/labs', name: 'labs' },
  { path: '/labs/local-vector-rag', name: 'lab-rag-detail' },
  { path: '/district', name: 'district' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

async function runAudit() {
  console.log('--- Starting Comprehensive Playwright Audit ---');
  const browser = await chromium.launch({ headless: true });
  const results = {
    pages: [],
    consoleErrors: [],
    failedImages: [],
    overflowIssues: [],
    interactions: [],
  };

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore known harmless dev/extension logs
        if (!text.includes('chrome-extension://')) {
          results.consoleErrors.push({ viewport: vp.name, url: page.url(), text });
        }
      }
    });

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      try {
        const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        const status = resp ? resp.status() : 0;
        console.log(`  [${status}] ${route.path} (${vp.name})`);

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth + 2;
        });

        if (overflow) {
          console.warn(`    ⚠️ Horizontal overflow detected on ${route.path} (${vp.name})`);
          results.overflowIssues.push({ route: route.path, viewport: vp.name });
        }

        // Check images
        const brokenImages = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs
            .filter((img) => img.src && (!img.complete || img.naturalWidth === 0))
            .map((img) => img.src);
        });

        if (brokenImages.length > 0) {
          console.warn(`    ⚠️ Broken images on ${route.path} (${vp.name}):`, brokenImages);
          results.failedImages.push({ route: route.path, viewport: vp.name, images: brokenImages });
        }

        // Capture screenshot on desktop and mobile
        if (vp.name === 'desktop' || vp.name === 'mobile') {
          const shotPath = path.join(SCREENSHOT_DIR, `${route.name}-${vp.name}.png`);
          await page.screenshot({ path: shotPath, fullPage: false });
        }

        results.pages.push({ route: route.path, viewport: vp.name, status });
      } catch (err) {
        console.error(`    ❌ Error loading ${route.path}:`, err.message);
        results.pages.push({ route: route.path, viewport: vp.name, error: err.message });
      }
    }

    await context.close();
  }

  // --- Interactive Flow Testing on Desktop ---
  console.log('\n=== Testing Interactive Flows (Desktop) ===');
  const interactiveContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await interactiveContext.newPage();

  // 1. Theme toggle test
  try {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const initialDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const themeBtn = page.locator('button[aria-label*="theme" i], button:has-text("DARK"), button:has-text("LIGHT")').first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(300);
      const afterDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      const toggled = initialDark !== afterDark;
      console.log(`  ✓ Theme Toggle: ${toggled ? 'PASSED' : 'UNCHANGED'} (${initialDark ? 'dark' : 'light'} -> ${afterDark ? 'dark' : 'light'})`);
      results.interactions.push({ flow: 'theme-toggle', success: toggled });
    }
  } catch (e) {
    console.error('  ❌ Theme toggle test failed:', e.message);
  }

  // 2. Studio DomeGallery 3D & filter test
  try {
    await page.goto(`${BASE_URL}/studio`, { waitUntil: 'networkidle' });
    const dome = page.locator('.sphere-root');
    const domeVisible = await dome.isVisible();
    console.log(`  ✓ Studio DomeGallery rendered: ${domeVisible ? 'YES' : 'NO'}`);

    const filterBtn = page.locator('button:has-text("SOFTWARE PRODUCTS")').first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
      await page.waitForTimeout(400);
      console.log('  ✓ Studio Filter tab clicked');
    }

    const firstTile = page.locator('.item__image').first();
    if (await firstTile.isVisible()) {
      await firstTile.click({ force: true });
      await page.waitForTimeout(600);
      const enlarged = await page.locator('.viewer .enlarge').isVisible();
      console.log(`  ✓ DomeGallery tile zoom modal: ${enlarged ? 'PASSED' : 'FAILED'}`);
      results.interactions.push({ flow: 'dome-gallery-zoom', success: enlarged });

      // Dismiss with Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
    }
  } catch (e) {
    console.error('  ❌ DomeGallery interaction failed:', e.message);
  }

  // 3. Contact Form Test
  try {
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
    const form = page.locator('form');
    if (await form.isVisible()) {
      console.log('  ✓ Contact Form detected');
      // Fill form
      await page.fill('input[name="name"], input[id="name"]', 'Audit Bot');
      await page.fill('input[name="email"], input[id="email"]', 'audit@zenithdistrict.internal');
      const textarea = page.locator('textarea[name="message"], textarea[id="message"]');
      if (await textarea.isVisible()) {
        await textarea.fill('Automated craft and accessibility audit verification message.');
      }
      console.log('  ✓ Contact inputs filled successfully');
      results.interactions.push({ flow: 'contact-form-inputs', success: true });
    }
  } catch (e) {
    console.error('  ❌ Contact form test failed:', e.message);
  }

  // 4. District Plan Interactive Map Test
  try {
    await page.goto(`${BASE_URL}/district`, { waitUntil: 'networkidle' });
    const hasCadastre = await page.locator('text=DISTRICT CADASTRE').first().isVisible();
    console.log(`  ✓ District Cadastre Map: ${hasCadastre ? 'PASSED' : 'CHECK NEEDED'}`);
    results.interactions.push({ flow: 'district-grid', success: hasCadastre });
  } catch (e) {
    console.error('  ❌ District page test failed:', e.message);
  }

  await interactiveContext.close();
  await browser.close();

  // Summary output
  console.log('\n=== AUDIT SUMMARY ===');
  console.log(`Total Page Tests: ${results.pages.length}`);
  console.log(`Console Errors: ${results.consoleErrors.length}`);
  console.log(`Broken Images: ${results.failedImages.length}`);
  console.log(`Horizontal Overflows: ${results.overflowIssues.length}`);
  console.log(`Interactions Tested: ${results.interactions.length}`);

  fs.writeFileSync('artifacts/audit-results.json', JSON.stringify(results, null, 2));
  console.log('Results saved to artifacts/audit-results.json');
}

runAudit().catch((err) => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
