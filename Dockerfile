FROM node:14-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY node_modules/ /node_modules
ADD dist service
EXPOSE $PORT
CMD ["node", "service/main"]