# Dockerfile for the cart service

# Base image
FROM node:alpine

WORKDIR /app


COPY ./package.json .

RUN npm install


COPY . .


CMD [ "npm", "start" ]
