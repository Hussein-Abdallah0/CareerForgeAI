# Stage 1: Build the React app (Vite)
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm cache clean --force && \
    npm install

# Use build arguments for environment variables
ARG VITE_API_TOKEN
ENV VITE_API_TOKEN=$VITE_API_TOKEN

COPY . .
RUN npm run build && ls -la /app/dist/  # Debug: Verify Vite output

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy Vite's output (dist/) instead of build/
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]