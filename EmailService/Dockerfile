FROM node:14

WORKDIR /
COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3002
CMD npm run start
