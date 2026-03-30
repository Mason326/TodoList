
FROM node:24-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
