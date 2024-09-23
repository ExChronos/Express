FROM node:20.14.0

WORKDIR /

ARG NODE_ENV=production
COPY ./package*.json ./
RUN npm install

COPY ./src /src/

CMD ["npm", "run", "server"]