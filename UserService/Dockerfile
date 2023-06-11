FROM node:14

WORKDIR /
COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3001
CMD npm run start
