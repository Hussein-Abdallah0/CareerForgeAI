# Stage 1: Build the React app (Vite)
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm cache clean --force && \
    npm install

# Use build arguments for environment variables
ARG VITE_OPENAI_API_KEY
ARG VITE_NODE_API_URL
ARG VITE_LARAVEL_API_URL
ARG VITE_NODE_WS_URL

RUN echo "VITE_OPENAI_API_KEY=$VITE_OPENAI_API_KEY" > .env.production && \
    echo "VITE_NODE_API_URL=$VITE_NODE_API_URL" >> .env.production && \
    echo "VITE_LARAVEL_API_URL=$VITE_LARAVEL_API_URL" >> .env.production && \
    echo "VITE_NODE_WS_URL=$VITE_NODE_WS_URL" >> .env.production

COPY . .
RUN npm run build && ls -la /app/dist/ 

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy Vite's output (dist/) instead of build/
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]