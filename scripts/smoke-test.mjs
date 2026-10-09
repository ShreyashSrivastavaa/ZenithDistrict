import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function runSmokeTests() {
  console.log(`[CI SMOKE] Starting smoke suite against ${BASE_URL}...`);
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  let failed = 0;

  // 1. Verify all routes load with HTTP 200
  const routes = [
    '/',
    '/brands',
    '/brands/brand-one',
    '/brands/brand-one/shop',
    '/brands/brand-one/shop/oversized-tee-coordinates',
    '/brands/brand-one/shop/boxy-cropped-tee-blueprint',
    '/brands/brand-one/story',
    '/brands/brand-one/size-guide',
    '/studio',
    '/products',
    '/labs',
    '/district',
    '/about',
    '/contact',
  ];

  for (const route of routes) {
    const res = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' });
    if (!res || res.status() >= 400) {
      console.error(`[FAIL] Route ${route} returned status ${res?.status()}`);
      failed++;
    } else {
      console.log(`[PASS] Route ${route} (200 OK)`);
    }
  }

  // 2. Product Page Interactive Selectors & URL Sync
  await page.goto(`${BASE_URL}/brands/brand-one/shop/oversized-tee-coordinates`, { waitUntil: 'networkidle' });
  const swatch = page.locator('[role="radiogroup"][aria-label*="Colorway"] button').nth(1);
  if (await swatch.count() > 0) {
    await swatch.click();
    await page.waitForTimeout(200);
    const url = page.url();
    if (!url.includes('color=')) {
      console.error(`[FAIL] Swatch selection did not update URL query: ${url}`);
      failed++;
    } else {
      console.log(`[PASS] Colorway selector updated URL: ${url}`);
    }
  }

  // 3. Accessible Waitlist Form Validation
  const waitlistTrigger = page.locator('button', { hasText: 'JOIN WAITLIST' }).first();
  if (await waitlistTrigger.count() > 0) {
    await waitlistTrigger.click();
    await page.waitForTimeout(200);
    const submitBtn = page.locator('button', { hasText: 'REQUEST ACCESS' });
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(200);
      const emailError = page.locator('#waitlist-email-error');
      if (await emailError.count() > 0 && await emailError.isVisible()) {
        console.log('[PASS] Waitlist accessible validation displayed on empty submission');
      } else {
        console.error('[FAIL] Waitlist email error was not displayed or not accessible');
        failed++;
      }
    }
  }

  await browser.close();

  if (failed > 0) {
    console.error(`[CI SMOKE] ${failed} test(s) failed.`);
    process.exit(1);
  } else {
    console.log('[CI SMOKE] All smoke tests passed successfully.');
  }
}

runSmokeTests().catch((err) => {
  console.error('[CI SMOKE] Fatal error:', err);
  process.exit(1);
});
