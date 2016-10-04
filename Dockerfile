FROM node:6.4

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /code/

COPY package.json .

RUN npm install

COPY . .
