FROM node:18-alpine

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

# Use build arguments for environment variables
ARG NODE_API_TOKEN
ENV NODE_API_TOKEN=$NODE_API_TOKEN

ENV PORT=3001

COPY . /app/

EXPOSE 3001

CMD [ "npm", "start" ]