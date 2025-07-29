 #frontend/Dockerfile (Con Reverse Proxy)

# --- ETAPA 1: Construir la aplicación de React ---
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# ¡Ya no necesitamos pasar la URL de la API como argumento!
RUN npm run build

# --- ETAPA 2: Servir la aplicación con Nginx ---
FROM nginx:stable-alpine
# Copiamos los archivos estáticos generados en la Etapa 1
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# Removemos la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copiamos nuestra configuración de proxy personalizada
COPY nginx.conf /etc/nginx/conf.d
# Exponemos el puerto 80
EXPOSE 80
# El comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]