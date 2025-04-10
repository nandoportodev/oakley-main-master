# Etapa 1: build da aplicação Node.js
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# FORÇA REINSTALAÇÃO NATIVA DE BCRYPT
RUN npm install --omit=dev && npm rebuild bcrypt

COPY . .

CMD ["npm", "start"]
