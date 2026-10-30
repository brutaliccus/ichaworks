// Takes desktop + mobile screenshots of the running preview into ./shots
import { chromium } from 'playwright-core';
const base = process.env.URL || 'http://localhost:4173/';
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const shots = [
  ['desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
  ['mobile', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
];
for (const [name, opts] of shots) {
  const ctx = await browser.newContext({ ...opts, reducedMotion: 'reduce', colorScheme: 'light' });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `shots/${name}-full.png`, fullPage: true });
  await page.screenshot({ path: `shots/${name}-hero.png` });
  await page.locator('#works').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelector('#works')?.scrollIntoView());
  await page.waitForTimeout(300);
  await page.screenshot({ path: `shots/${name}-carousel.png` });
  await page.getByRole('button', { name: "Go to slide 2: Icha's Armory Gear Planner" }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `shots/${name}-carousel-gear-planner.png` });
  await page.locator('#sites').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelector('#sites')?.scrollIntoView());
  await page.waitForTimeout(300);
  await page.screenshot({ path: `shots/${name}-sites.png` });
  await page.evaluate(() => document.querySelector('#works')?.scrollIntoView());
  await page.getByRole('button', { name: 'Go to slide 6: IchaUI Forever' }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `shots/${name}-carousel-slide6.png` });
  await ctx.close();
}
await browser.close();
console.log('ok');
