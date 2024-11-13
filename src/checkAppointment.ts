import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { sendEmail } from './email';

puppeteer.use(StealthPlugin());

(async () => {
    const headless = process.env.ENVIRONMENT === 'development' ? false : true;
    const browser = await puppeteer.launch({ headless });
    const page = await browser.newPage();

    await page.goto('https://icp.administracionelectronica.gob.es/icpplus/index.html');

    await page.setViewport({ width: 1080, height: 1024 });

   await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.waitForSelector('select#form');
    await page.select('select#form', '/icpplustieb/citar?p=8&locale=es');

    await page.click('#btnAceptar');

    await page.waitForSelector('select#sede');
    await page.select('select#sede', "99");

    await page.waitForSelector('select#tramiteGrupo\\[0\\]');
    await page.select('select#tramiteGrupo\\[0\\]', '4038');

    await page.waitForSelector('#btnAceptar');
    await page.click('#btnAceptar');

    await page.waitForSelector('#btnEntrar');
    await page.click('#btnEntrar');

    await page.waitForSelector('#rdbTipoDocPas');
    await page.click('#rdbTipoDocPas');

    const passaporte = await page.waitForSelector('#txtIdCitado');
    if (passaporte)
        await passaporte.type("KK6000533");

    const nombre = await page.waitForSelector('#txtDesCitado');
    if (nombre)
        await nombre.type("MARIA ROSSI");

    await page.waitForSelector('#btnEnviar');
    await page.click('#btnEnviar');

    try {
        await page.waitForSelector('#mensajeInfo p');
        const text = await page.$eval('#mensajeInfo p', paragraph => paragraph.innerText);
        if (!text.includes("En este momento no hay citas disponibles"))
            sendEmail({to: 'giambonaroberta@gmail.com', from: 'giambonaroberta0@gmail.com', subject: 'cita available', html: 'wiiiii, found paragraph'});      
    } catch(error) {
        sendEmail({to: 'giambonaroberta@gmail.com', from: 'giambonaroberta0@gmail.com', subject: 'cita available', html: 'wiiiii, not found paragraph'});
    }

    await browser.close();
})();
