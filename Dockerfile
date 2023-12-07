# Baseado na imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Instala o Nginx
RUN apt-get update && apt-get install -y nginx

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/sites-available/default

# Inicia o Node.js e o Nginx
CMD service nginx start && npm start
