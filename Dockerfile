# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and prisma schema folder first
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies (prisma generate runs during postinstall)
RUN npm install --legacy-peer-deps

# Copy all other source files
COPY . .

# Pass sensitive env variables as build args (add more as necessary)
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG STRIPE_INTRO_PRICE_ID
ARG STRIPE_NORMAL_PRICE_ID
ARG STRIPE_ADD_LOCATION_PRICE_ID
ARG OPENAI_API_KEY
ARG NINJAS_API_KEY
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXTAUTH_SECRET

ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV STRIPE_INTRO_PRICE_ID=${STRIPE_INTRO_PRICE_ID}
ENV STRIPE_NORMAL_PRICE_ID=${STRIPE_NORMAL_PRICE_ID}
ENV STRIPE_ADD_LOCATION_PRICE_ID=${STRIPE_ADD_LOCATION_PRICE_ID}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV NINJAS_API_KEY=${NINJAS_API_KEY}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Generate Prisma client explicitly (safe redundancy)
RUN npx prisma generate

# Build Next.js app (build has access to build-time env variables)
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /app

# ENV NODE_ENV=production

# Copy built assets and node_modules from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/public ./public

# Expose app port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
