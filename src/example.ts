import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://icp.administracionelectronica.gob.es/icpplus/index.html');

    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.waitForSelector('select#form');
    await page.select('select#form', '/icpplustieb/citar?p=8&locale=es');

    await page.click('#btnAceptar');

    await page.waitForSelector('select#sede');
    await page.select('select#sede', "18");

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
        await nombre.type("Maria Rossi");

    await page.waitForSelector('#btnEnviar');
    await page.click('#btnEnviar');

})();
