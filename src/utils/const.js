const Cookie1 = {
  name: 'clientinscrito',
  value: process.env.CLIENTE_INSCRITO,
  domain: '.deltron.com.pe', // Dominio de la cookie
  path: '/', // Ruta de la cookie
  expires: Date.now() + 1000 * 60 * 60 * 24, // Tiempo de expiración en milisegundos (1 día en este ejemplo)
  httpOnly: true, // Accesible solo a través de HTTP
  secure: false, // Cookie solo se envía a través de conexiones seguras (HTTPS)
};

const Cookie2 = {
  name: 'nivelmagic',
  value: process.env.NIVEL_MAGICO,
  domain: '.deltron.com.pe', // Dominio de la cookie
  path: '/', // Ruta de la cookie
  expires: Date.now() + 1000 * 60 * 60 * 24, // Tiempo de expiración en milisegundos (1 día en este ejemplo)
  httpOnly: true, // Accesible solo a través de HTTP
  secure: false, // Cookie solo se envía a través de conexiones seguras (HTTPS)
};
const Cookie3 = {
  name: 'deltronlogin',
  value: process.env.DELTRON_LOGIN,
  domain: '.deltron.com.pe', // Dominio de la cookie
  path: '/', // Ruta de la cookie
  expires: Date.now() + 1000 * 60 * 60 * 24, // Tiempo de expiración en milisegundos (1 día en este ejemplo)
  httpOnly: true, // Accesible solo a través de HTTP
  secure: false, // Cookie solo se envía a través de conexiones seguras (HTTPS)
};

module.exports = { Cookie1, Cookie2, Cookie3 };
