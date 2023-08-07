FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install 
RUN npm install -g pm2@latest

COPY . .

EXPOSE 8000

CMD ["pm2-runtime", "start", "app.js"]