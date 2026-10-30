// Captures the Icha's Armory Gear Planner page (waits for full render).
import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const res = await page.goto('https://ichasarmory.quest/gear-planner', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => null);
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 20000 }).catch(() => {});
await page.waitForTimeout(4000);
await page.screenshot({ path: 'public/shots/gear-planner.jpg', type: 'jpeg', quality: 82 });
console.log(JSON.stringify({ status: res?.status(), title: await page.title(), url: page.url() }));
console.log((await page.evaluate(() => document.body.innerText)).slice(0, 4000));
await browser.close();
