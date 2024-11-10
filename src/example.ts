import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

(async () => {
    // Launch the browser and open a new blank page
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://icp.administracionelectronica.gob.es/icpplus/index.html');

// Set screen size.
await page.setViewport({width: 1080, height: 1024});

await page.waitForSelector('select#form');

page.select('select#form', '/icpplustieb/citar?p=8&locale=es');

page.click('#btnAceptar');
// await browser.close();
  })();