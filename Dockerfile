FROM node:16-alpine

WORKDIR /src

COPY package* ./src

RUN yarn

COPY . /src

EXPOSE 5001

CMD [ "npm", "run", "start" ]