import { chromium } from 'playwright';

async function verify() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  const icons = await page.$$eval('link[rel*="icon"]', els => 
    els.map(e => ({ rel: e.rel, href: e.href, type: e.type }))
  );
  
  console.log('Detected icon links in head:');
  console.table(icons);

  for (const ic of icons) {
    const res = await page.request.get(ic.href);
    console.log(`[STATUS ${res.status()}] ${ic.href}`);
  }

  // Also verify /favicon.ico and /favicon.svg directly
  for (const direct of ['http://localhost:3000/favicon.ico', 'http://localhost:3000/favicon.svg']) {
    const res = await page.request.get(direct);
    console.log(`[STATUS ${res.status()}] ${direct}`);
  }

  await browser.close();
}

verify().catch(console.error);
