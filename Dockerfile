FROM node:latest

MAINTAINER Todd Baert <toddbaert@gmail.com>

USER root

COPY app.js lead.js leadsResource.js package.json package-lock.json ./

RUN npm install

EXPOSE 1337

ENTRYPOINT node app.js