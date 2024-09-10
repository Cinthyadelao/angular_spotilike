FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install -g @angular/cli && \ 
    npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]