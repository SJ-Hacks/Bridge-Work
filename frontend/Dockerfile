# Stage 1: Build React App
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Set node memory limit
ENV NODE_OPTIONS=--max-old-space-size=2048

# Now copy only the source files (not node_modules, build etc.)
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Serve using nginx
FROM nginx:alpine

# Remove default nginx website and replace with our build
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Note that nginx will serve the app in port 80 by default
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
