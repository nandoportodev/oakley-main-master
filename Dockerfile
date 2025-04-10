# Etapa 1: build da aplicação Angular
FROM node:18 as build

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (para cache eficiente)
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Corrigido: build com o nome correto do projeto
RUN npm run build -- --configuration production

# Etapa 2: servir com NGINX
FROM nginx:alpine

# Remove configurações padrões do NGINX (opcional, se você quiser adicionar sua própria)
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos compilados do Angular (dentro de browser)
COPY --from=build /app/dist/moments/browser /usr/share/nginx/html

# Expõe a porta padrão do NGINX
EXPOSE 80

# Comando para manter o NGINX rodando
CMD ["nginx", "-g", "daemon off;"]
