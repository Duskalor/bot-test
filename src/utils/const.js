const Cookie1 = {
  name: 'clientinscrito',
  value: '71744282%23384',
  domain: '.deltron.com.pe', // Dominio de la cookie
  path: '/', // Ruta de la cookie
  expires: Date.now() + 1000 * 60 * 60 * 24, // Tiempo de expiración en milisegundos (1 día en este ejemplo)
  httpOnly: true, // Accesible solo a través de HTTP
  secure: false, // Cookie solo se envía a través de conexiones seguras (HTTPS)
};

const Cookie2 = {
  name: 'nivelmagic',
  value:
    '%25118%253F%252B%253F%25FB%25A3%25F7%25FDF%25F3%25A1L%25BA%25FEY%255C%25C1%25880z%25C0%2528%25A4P%2529%2512%259E%25FB%25A1-%2597R%25DE%25C4P%2511%2587%25BB%2512%25A9',
  domain: '.deltron.com.pe', // Dominio de la cookie
  path: '/', // Ruta de la cookie
  expires: Date.now() + 1000 * 60 * 60 * 24, // Tiempo de expiración en milisegundos (1 día en este ejemplo)
  httpOnly: true, // Accesible solo a través de HTTP
  secure: false, // Cookie solo se envía a través de conexiones seguras (HTTPS)
};
const Cookie3 = {
  name: 'deltronlogin',
  value: '71744282',
  domain: '.deltron.com.pe', // Dominio de la cookie
  path: '/', // Ruta de la cookie
  expires: Date.now() + 1000 * 60 * 60 * 24, // Tiempo de expiración en milisegundos (1 día en este ejemplo)
  httpOnly: true, // Accesible solo a través de HTTP
  secure: false, // Cookie solo se envía a través de conexiones seguras (HTTPS)
};

module.exports = { Cookie1, Cookie2, Cookie3 };
