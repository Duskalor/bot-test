# 1. Utiliza la imagen con Chromium incluido
FROM alekzonder/puppeteer:latest as bot

WORKDIR /app

# 2. Copia los archivos del proyecto
COPY package*.json ./
COPY . .

# 3. Instala las dependencias de tu aplicación
RUN npm install

# Define las variables de entorno
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT

# 4. Define el comando para ejecutar tu aplicación
CMD ["npm", "start"]