import puppeteer from 'puppeteer-core';
import fs from 'fs';

const EMAIL = 'digitaldost.0001@gmail.com';
const PASSWORD = 'Qsxwdc1!123';

const FOLDERS = [
  { name: 'digitaldost', url: 'https://drive.google.com/drive/folders/16iQ8dTVUbzMt58NIPPFiJ-nQcAL3X02o' },
  { name: 'Watches', url: 'https://drive.google.com/drive/folders/1eP2JmDlxGGK1v71rTnK4pNbHqi-s-76Z' },
];

// Find Chrome
const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
];
const chromePath = chromePaths.find(p => { try { fs.accessSync(p); return true; } catch { return false; } });
if (!chromePath) { console.log('Chrome not found at common paths'); process.exit(1); }
console.log('Using Chrome:', chromePath);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized', '--no-sandbox'],
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  // Login
  console.log('\\n--- Logging into Google ---');
  await page.goto('https://accounts.google.com/signin', { waitUntil: 'networkidle2' });
  await page.waitForSelector('input[type="email"]', { timeout: 10000 });
  await page.type('input[type="email"]', EMAIL, { delay: 50 });
  await page.click('#identifierNext');
  await page.waitForSelector('input[type="password"]', { visible: true, timeout: 10000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.type('input[type="password"]', PASSWORD, { delay: 50 });
  await page.click('#passwordNext');
  await new Promise(r => setTimeout(r, 5000));
  console.log('Logged in. Current URL:', page.url());

  // Dismiss any prompts
  try {
    const skipBtns = await page.$$('button');
    for (const btn of skipBtns) {
      const text = await btn.evaluate(el => el.textContent.trim().toLowerCase());
      if (text.includes('not now') || text.includes('skip') || text.includes('no thanks')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 2000));
        break;
      }
    }
  } catch (e) { /* ok */ }

  const results = {};

  for (const folder of FOLDERS) {
    console.log(`\\n=== Scanning folder: ${folder.name} ===`);
    await page.goto(folder.url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 3000));

    // Get all items in the folder
    const items = await page.evaluate(() => {
      const rows = document.querySelectorAll('[data-id]');
      const list = [];
      rows.forEach(row => {
        const nameEl = row.querySelector('[data-tooltip]') || row.querySelector('.KL4NAf');
        const name = nameEl ? nameEl.getAttribute('data-tooltip') || nameEl.textContent.trim() : '';
        if (name) list.push(name);
      });
      return [...new Set(list)].filter(n => n.length > 0);
    });

    console.log('Top-level items:', items);
    results[folder.name] = { topLevel: items, subfolders: {} };

    // Click into each subfolder
    for (const item of items) {
      console.log(`  -> Opening: ${item}`);
      try {
        // Find and double-click the subfolder
        const found = await page.evaluate((itemName) => {
          const els = document.querySelectorAll('[data-tooltip]');
          for (const el of els) {
            if (el.getAttribute('data-tooltip') === itemName) {
              el.closest('[data-id]')?.querySelector('div[role="link"]')?.click();
              return true;
            }
          }
          // Try another selector
          const rows = document.querySelectorAll('.KL4NAf');
          for (const r of rows) {
            if (r.textContent.trim() === itemName) {
              r.click();
              return true;
            }
          }
          return false;
        }, item);

        if (!found) {
          // Try double click via puppeteer
          const el = await page.$(`[data-tooltip="${item}"]`);
          if (el) await el.click({ clickCount: 2 });
        }

        await new Promise(r => setTimeout(r, 3000));

        // Get contents of subfolder
        const subItems = await page.evaluate(() => {
          const rows = document.querySelectorAll('[data-id]');
          const list = [];
          rows.forEach(row => {
            const nameEl = row.querySelector('[data-tooltip]') || row.querySelector('.KL4NAf');
            const name = nameEl ? nameEl.getAttribute('data-tooltip') || nameEl.textContent.trim() : '';
            if (name) list.push(name);
          });
          return [...new Set(list)].filter(n => n.length > 0);
        });

        console.log(`     Contents: ${JSON.stringify(subItems)}`);
        results[folder.name].subfolders[item] = subItems;

        // Go back
        await page.goBack({ waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
      } catch (err) {
        console.log(`     Error: ${err.message}`);
        // Navigate back to folder
        await page.goto(folder.url, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  }

  // Save results
  fs.writeFileSync('drive-contents.json', JSON.stringify(results, null, 2));
  console.log('\\n=== RESULTS SAVED to drive-contents.json ===');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
