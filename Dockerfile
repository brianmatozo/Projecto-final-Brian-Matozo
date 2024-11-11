# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Compila TypeScript a JavaScript
RUN npm run tsc

# Expone el puerto en el que se ejecuta tu aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["npm", "run", "start"]
