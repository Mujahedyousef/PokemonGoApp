FROM node:lts-alpine
WORKDIR $HOME/app
COPY . $HOME/app
RUN npm ci


CMD ["npm", "start"]