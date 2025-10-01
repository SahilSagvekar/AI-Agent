# -----------------------
# Stage 1: Build stage
# -----------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache bash

# Copy package and prisma schema files first for better caching
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# -----------------------
# Stage 2: Production stage
# -----------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# Copy built Next.js files and Prisma client from build stage
COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Expose port 3000 (matches your docker run -p 80:3000)
EXPOSE 3000

# Start Next.js on 0.0.0.0 to allow external access
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]







# FROM node:20-alpine AS builder

# # FROM node:20-alpine runnerAS 


# WORKDIR /app

# COPY package*.json ./
# COPY prisma ./prisma

# RUN npm install --legacy-peer-deps

# # COPY --from=builder /app/.next ./.next
# # COPY --from=builder /app/public ./public
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/.env ./.env

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
