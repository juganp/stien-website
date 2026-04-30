import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const CHROME = 'C:/Users/Jugan/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe';
const DIR = './temporary screenshots';
if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });

const URL = 'http://localhost:4201';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
});

async function openPage(width, height, dark = false) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => localStorage.clear());
  if (dark) {
    await page.evaluateOnNewDocument(() => localStorage.setItem('stien-theme', 'dark'));
  }
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 1500));
  return page;
}

async function save(page, name) {
  const file = path.join(DIR, `p6-${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`✓ ${file}`);
}

async function saveScrolled(page, selector, name) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ block: 'start' });
  }, selector);
  await new Promise(r => setTimeout(r, 400));
  const file = path.join(DIR, `p6-${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`✓ ${file}`);
}

// 1. Desktop hero - light
let pg = await openPage(1440, 900);
await save(pg, 'hero-desktop-light');

// 2. Desktop footer - light (scroll to footer)
await saveScrolled(pg, 'footer', 'footer-desktop-light');
await pg.close();

// 3. Desktop full page dark - scroll to hero stats area
pg = await openPage(1440, 900, true);
await save(pg, 'hero-desktop-dark');
await pg.close();

// 4. Mobile light - hero with stats
pg = await openPage(375, 812);
await save(pg, 'mobile-hero-light');
// scroll down to see stats if needed
await pg.evaluate(() => window.scrollBy(0, 200));
await new Promise(r => setTimeout(r, 300));
const file = path.join(DIR, 'p6-mobile-stats.png');
await pg.screenshot({ path: file, fullPage: false });
console.log(`✓ ${file}`);
await pg.close();

// 5. Mobile footer
pg = await openPage(375, 812);
await saveScrolled(pg, 'footer', 'mobile-footer');
await pg.close();

await browser.close();
console.log('\nPass 6 complete.');
