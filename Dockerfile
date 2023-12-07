FROM alpine:latest as builder

RUN apk add --update nodejs npm bash nginx
COPY nginx.conf /etc/nginx/conf.d/
WORKDIR /app
COPY . .
RUN npm install



## Remova o arquivo de configuração padrão do Nginx
##RUN rm /etc/nginx/conf.d/default.conf

## Substitua pelo arquivo de configuração personalizado
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]