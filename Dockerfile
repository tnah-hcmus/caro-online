FROM node:13-alpine

WORKDIR /docker

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]