# Multi-stage Dockerfile for production
FROM node:18-alpine AS builder
WORKDIR /app

# Install build-time dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Copy source
COPY . .

# Generate Prisma client and build TS
RUN npx prisma generate && npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# Copy package files and install only production deps
COPY package.json package-lock.json ./
RUN npm ci --production --no-audit --no-fund

# Copy build output and Prisma artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/uploads ./uploads

EXPOSE 3000
CMD ["node", "dist/server.js"]
