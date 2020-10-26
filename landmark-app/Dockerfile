#############
### build ###
#############

# base image
FROM node:12.18.1-alpine as build

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

# generate build
RUN npm run build --prod

############
### prod ###
############

# base image
FROM nginx:1.19.3-alpine

# copy artifact build from the 'build environment'
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/landmark-app /usr/share/nginx/html

# expose port 80
EXPOSE 80
