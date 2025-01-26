# Etapa 1: Construir a aplicação React
FROM node:16 AS build

WORKDIR /app

# Copie os arquivos do frontend para o container
COPY package.json package-lock.json ./
RUN npm install

# Copie o código do frontend
COPY . ./

# Default command para desenvolvimento
CMD ["npm", "start"]