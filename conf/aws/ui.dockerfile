# first stage: build the app
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY ./web/package.json ./web/package-lock.json ./
RUN npm install
COPY ./web/ ./
ARG NODE_ENV=medviz
RUN npx vite build

# second stage: serve the app using httpd
FROM nginx:alpine

# set the working folder in the container
WORKDIR /usr/share/nginx/html

# copy build artifacts from the build stage
COPY --from=build-stage /app/dist ./