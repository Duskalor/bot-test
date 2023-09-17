const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
// const MongoAdapter = require('@bot-whatsapp/database/mongo');
const JsonFileAdapter = require('@bot-whatsapp/database/json');

const fs = require('node:fs');
const { readdir, unlink } = require('fs').promises;
const path = require('path');
const axios = require('axios');
const https = require('node:https');
const deltronSrapper = require('./src/scrapper');
const waykiSrapper = require('./src/wayki');
const BlackPink = require('./src/utils/bp');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// carpeta de destino
// const carpet = 'test';
const carpet = 'Imagenes';
// ruta de destino
const routePath = `${process.cwd()}/${carpet}`;
// desde q pagina se comienza
// revisar si existe la "carpet" si no lo creo
if (!fs.existsSync(routePath)) {
  fs.mkdirSync(routePath);
}

const flowDiscos = addKeyword('1').addAction(async (ctx, { flowDynamic }) => {
  flowDynamic('generando datos.....');
  console.log('aqui');
  const datos = await deltronSrapper();
  // console.log(datos);
  datos.forEach(async (item, i) => {
    // console.log('item', i + 1);
    const nombre = item.nombre.slice(0, 20).replace(/ /g, '');
    axios({
      httpsAgent,
      method: 'get',
      url: item.img,
      responseType: 'stream',
    }).then((response) => {
      const res = response.data.pipe(
        fs.createWriteStream(`${routePath}/${nombre}.jpg`)
      );
      return res;
    });
    new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
      flowDynamic({
        body: [item.nombre, '\n', item.url],
        media: `./Imagenes/${nombre}.jpg`,
      });
    });
  });

  new Promise((resolve) => setTimeout(resolve, 200 * datos.length)).then(() => {
    readdir('Imagenes')
      .then((files) => {
        const unlinkPromises = files.map((file) => {
          const filePath = path.join('Imagenes', file);
          return unlink(filePath);
        });

        return Promise.all(unlinkPromises);
      })
      .catch((err) => {
        console.log(err);
        console.error(`Something wrong happened removing files of ${carpet}`);
      });
  });
});

const flowOfertas = addKeyword('2').addAction(async (ctx, { flowDynamic }) => {
  flowDynamic('obteniendo datos.....');
  const ofertas = await waykiSrapper();
  console.log(ofertas);
  const filterName = 'LAPTOP';
  const filterItems = ofertas.filter((item) =>
    item.nombre.includes(filterName)
  );
  // console.log(ofertas.length);
  for (const oferta of filterItems) {
    flowDynamic({
      body: [
        `${oferta.nombre} \n *📢 Oferta!! ${oferta.price} Soles 📢* \n ${oferta.url}`,
      ],
      media: oferta.img,
    });
  }
});

const flowCoreana = addKeyword('3').addAction(async (ctx, { flowDynamic }) => {
  const one = Object.entries(BlackPink)
    .sort(() => Math.random() - 0.5)
    .pop();

  const nombre = `una foto de ${one[0]}`;
  const img = one[1].sort(() => Math.random() - 0.5).pop();
  // console.log({ nombre, img });

  await flowDynamic({
    body: nombre,
    media: img,
  });
});

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { flowDynamic }) => {
    await flowDynamic(`🙌 Hola bienvenido *${ctx.pushName}*`);
  })
  .addAnswer(
    ['*1.* Discos Solidos', '*2.* Ofertas', '*3.* Una Coreana Random'],
    null,
    null,
    [flowDiscos, flowOfertas, flowCoreana]
  );

const main = async () => {
  const adapterDB = new JsonFileAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();
