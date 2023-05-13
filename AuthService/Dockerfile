FROM node:14

WORKDIR /
COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000
CMD npm run start
# docker run -d -it -p 8080:80 --name lab03_2_team6 lab03_2_team6
