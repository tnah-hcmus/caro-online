FROM node:13-alpine

WORKDIR /docker

COPY . .

RUN npm install

RUN npm run client-pack

EXPOSE 3000

CMD ["npm", "start"]