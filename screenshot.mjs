import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import path from 'path';

const CHROME = 'C:/Users/Jugan/.cache/puppeteer/chrome/win64-147.0.7727.57/chrome-win64/chrome.exe';
const DIR = './temporary screenshots';

if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });

function nextIndex() {
  try {
    const files = readdirSync(DIR).filter(f => /^screenshot-\d+/.test(f));
    return files.length + 1;
  } catch { return 1; }
}

const url   = process.argv[2] || 'http://localhost:4200';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
});

async function shoot(width, height, suffix) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 1500)); // let animations settle
  const idx  = nextIndex();
  const file = path.join(DIR, `screenshot-${idx}${label}-${suffix}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`✓ ${file}`);
  await page.close();
}

await shoot(1440, 900,  'desktop');
await shoot(375,  812,  'mobile');
await browser.close();
