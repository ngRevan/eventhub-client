### STAGE 1: Build ###
FROM node:14.2-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN node --max_old_space_size=5120 ./node_modules/@angular/cli/bin/ng build --prod

### STAGE 2: Run ###
FROM nginx:1.18-alpine
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/eventhub /usr/local/nginx/html
