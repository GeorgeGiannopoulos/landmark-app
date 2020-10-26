#############
### build ###
#############

# base image
FROM node:12.18.1-alpine as build

# couchbase sdk requirements
RUN apk update && apk add git python make g++ curl bash krb5-dev && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# set working directory
WORKDIR /parse

# install and cache app dependencies
COPY package*.json /parse/
RUN npm install --production

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map
RUN rm -rf node_modules/couchbase/src/

#############
#### prod ###
#############

# base image
FROM node:12.18.1-alpine

# set working directory
WORKDIR /parse

# copy artifact build from the 'build environment'
COPY --from=build /parse/node_modules /parse/node_modules

# add app
COPY . /parse

CMD [ "npm", "start" ]
