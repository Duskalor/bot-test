const { launch } = require('puppeteer');

const URL = 'https://waykistore.pe/lista-productos.php?oferta=SI';

const waykiSrapper = async () => {
  const datos = [];
  const browser = await launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1640,
    height: 880,
    deviceScaleFactor: 1,
  });

  await page.goto(URL);
  await page.waitForSelector('.product-wrapper');

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const alldata = await page.$$('.product-wrap .product');
  for (const data of alldata) {
    const nombre = await data.$eval(
      '.product-name a',
      (text) => text.innerHTML
    );
    const url = await data.$eval('.product-name a', (text) =>
      text.getAttribute('href')
    );
    const img = await data.$eval('img', (img) => img.getAttribute('src'));
    // todo en un objeto

    const price = await data.$eval('.price', (text) => text.innerHTML);
    const item = {
      nombre,
      url: `https://waykistore.pe/${url}`,
      img: `https://waykistore.pe/${img}`,
      price: price.split('-').pop().trim(),
    };
    datos.push(item);
  }
  browser.close();
  return datos;
};
module.exports = waykiSrapper;
