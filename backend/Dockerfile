# Dockerfile para el Backend

# 1. Usar una imagen oficial de Node.js como base
# Usamos la versión 'alpine' porque es muy ligera
FROM node:18-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copiar el package.json y package-lock.json al contenedor
COPY package*.json ./

# 4. Instalar las dependencias del proyecto
RUN npm install

# 5. Copiar el resto de los archivos de tu backend al contenedor
COPY . .

# 6. Exponer el puerto en el que corre el servidor
EXPOSE 5000

# 7. El comando que se ejecutará cuando el contenedor se inicie
CMD [ "npm", "run", "dev" ]