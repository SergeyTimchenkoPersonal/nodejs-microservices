FROM node:14.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "run", "start" ]