FROM node:16-alpine3.15

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 60
CMD [ "npm", "run", "start" ]