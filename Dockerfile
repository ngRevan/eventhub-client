### STAGE 1: Build ###
FROM node:14.2-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN node --max_old_space_size=4096 ./node_modules/@angular/cli/bin/ng build --prod

### STAGE 2: Run ###
FROM nginx:1.18-alpine
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./ssl/eventhub.ch.crt /etc/nginx/eventhub.ch.crt
COPY ./ssl/eventhub.ch.key /etc/nginx/eventhub.ch.key
COPY --from=build /usr/src/app/dist/app /usr/local/nginx/html
