// Captures screenshots of hosted sites for the IchaWorks carousel.
import { chromium } from 'playwright-core';
const sites = [
  ['ichasarmory', 'https://ichasarmory.quest'],
  ['lootlock', 'https://lootlock.win'],
  ['health', 'https://health.freiverse.com'],
  ['library', 'https://library.freiverse.com'],
];
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const results = {};
for (const [slug, url] of sites) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(async (e) => {
      if (String(e).includes('Timeout')) return null; throw e; });
    await page.waitForTimeout(2500);
    const status = res ? res.status() : 'timeout-networkidle';
    await page.screenshot({ path: `public/shots/${slug}.jpg`, type: 'jpeg', quality: 82 });
    results[slug] = { ok: !res || res.ok(), status, title: await page.title(), finalUrl: page.url() };
  } catch (e) {
    results[slug] = { ok: false, error: String(e).split('\n')[0] };
  }
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
