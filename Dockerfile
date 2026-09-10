# Syntax: docker/dockerfile:1

# -------------------------------------------------------------
# Base Stage: Install Dependencies
# -------------------------------------------------------------
FROM node:22-alpine AS base
WORKDIR /app

# Install dependencies needed for native builds if any
RUN apk add --no-cache libc6-compat

# Copy package manifests first for optimal layer caching
COPY package.json package-lock.json ./
RUN npm ci

# -------------------------------------------------------------
# Development Stage: Hot Reload Dev Server
# -------------------------------------------------------------
FROM base AS dev
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

COPY . .

EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4321"]

# -------------------------------------------------------------
# Build Stage: Compile Static Site
# -------------------------------------------------------------
FROM base AS builder
ENV NODE_ENV=production

COPY . .
RUN npm run build

# -------------------------------------------------------------
# Test / Production Stage: High-Performance Nginx Server
# -------------------------------------------------------------
FROM nginx:alpine AS test

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static files into /cmds directory to match loop.brain.fr/cmds
COPY --from=builder /app/dist /usr/share/nginx/html/cmds

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
