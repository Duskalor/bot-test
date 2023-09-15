const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MongoAdapter = require('@bot-whatsapp/database/mongo');

/**
 * Declaramos las conexiones de Mongo
 */

const MONGO_DB_URI = 'mongodb://127.0.0.1:27017';
const MONGO_DB_NAME = 'db_bot';

// const flowSecundario = addKeyword('leslie').addAnswer("",null,null,() => {});
const suma = '2 + 3';
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
  //   .addAnswer('🙌 Hola bienvenido soy *DuskaBot*')
  .addAnswer(
    `cuanto es ${suma}??`,
    { capture: true },
    async (ctx, data) => {
      console.log({ data, ctx });
      const { fallBack, flowDynamic } = data;
      if (ctx.body === '5')
        return flowDynamic({
          body: `Bien hecho ${ctx.pushName} te ganaste una coreana`,
          media: './video.mp4',
        });

      return fallBack(`${suma} imbécil`);
    },
    []
  )
  .addAnswer('xdddd');

const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
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
