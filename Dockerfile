FROM alpine:latest

RUN apk add --update nodejs npm bash
WORKDIR /app
COPY . .
RUN npm install

ENTRYPOINT [ "npm", "start" ]

