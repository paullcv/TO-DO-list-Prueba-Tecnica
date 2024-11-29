FROM node:21-slim

WORKDIR /app

# Copiar solo los archivos necesarios para la instalación de dependencias
COPY package*.json ./

# Instalar dependencias usando npm ci para una instalación más limpia y rápida
RUN npm ci

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que usará Vite
EXPOSE 5173

# Comando para desarrollo
CMD ["npm", "run", "dev", "--", "--host"]