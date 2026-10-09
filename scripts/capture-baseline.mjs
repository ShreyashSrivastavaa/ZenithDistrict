import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function capture() {
  const outputDir = path.resolve(process.cwd(), 'qa', 'before');
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: '390', width: 390, height: 844 },
    { name: '768', width: 768, height: 1024 },
    { name: '1440', width: 1440, height: 900 }
  ];

  const routes = [
    { path: '/', name: 'home' },
    { path: '/brands', name: 'brands' },
    { path: '/brands/brand-one', name: 'brand-inner' }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    for (const r of routes) {
      try {
        await page.goto('http://localhost:3000' + r.path, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(600);
        const filePath = path.join(outputDir, `${r.name}-${vp.name}px.png`);
        await page.screenshot({ path: filePath, fullPage: false });
        console.log(`Saved ${filePath}`);
      } catch (err) {
        console.error(`Error on ${r.path} (${vp.name}px):`, err.message);
      }
    }
    await page.close();
  }

  await browser.close();
  console.log('Phase 0 before baseline screenshots complete.');
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});
