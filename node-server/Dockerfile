FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["nodemon", "server.js"]