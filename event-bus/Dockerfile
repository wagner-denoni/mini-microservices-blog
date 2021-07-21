# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some dependencies
COPY ./package.json ./
RUN npm install --production

# Copying files
COPY ./ ./

# Default command
CMD [ "npm", "start" ]