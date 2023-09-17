const { launch } = require('puppeteer');
const selectSelector = '#GrupoLineaId';
const optionValue = 'HDES';
const URL =
  'https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/buscador_web_v1.php';

const deltronSrapper = async () => {
  const datos = [];
  const browser = await launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1640,
    height: 880,
    deviceScaleFactor: 1,
  });
  await page.goto(URL);
  await page.waitForSelector('#GrupoLineaId');
  await page.select(selectSelector, optionValue);
  await page.select('#cboAlmacenes', '030');
  await page.click('#chkStock');
  await page.waitForSelector('#listado-productos-dg');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const alldata = await page.$$('.container-item-busc-dg .thumbnail');
  console.log(alldata.length);
  for (const data of alldata.slice(0, 5)) {
    const nombre = await data.$eval('h5 a', (text) => text.innerHTML);
    const url = await data.$eval('h5 a', (text) => text.getAttribute('href'));
    const img = await data.$eval('img', (img) => img.getAttribute('src'));
    // todo en un objeto
    const item = { nombre, url: `https://www.deltron.com.pe/${url}`, img };
    datos.push(item);
  }
  return datos;
};

module.exports = deltronSrapper;
