FROM node:18-alpine

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

# Use build arguments for environment variables
ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$NODE_API_TOKEN

ENV PORT=3001

COPY . /app/

EXPOSE 3001

CMD [ "npm", "start" ]