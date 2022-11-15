FROM node:latest

COPY controllers ./controllers
COPY helpers ./helpers
COPY middleware ./middleware
COPY models ./models
COPY routes ./routes
COPY utils ./utils
COPY app.js .
COPY package.json .
COPY package-lock.json .
COPY swagger.json .
COPY .env .

RUN npm install

ENTRYPOINT [ "npm", "start" ]