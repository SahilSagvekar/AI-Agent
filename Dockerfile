# -----------------------
# Stage 1: Build Stage
# -----------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files & prisma folder first (better layer caching)
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies (prisma generate runs during postinstall)
RUN npm install --legacy-peer-deps

# Copy remaining source files
COPY . .

# Pass sensitive env variables as build args
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

# Set build-time environment variables
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

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# -----------------------
# Stage 2: Production Stage
# -----------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files for production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./package*.json
# COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Expose app port
EXPOSE 3000

# ✅ Force Next.js to listen on 0.0.0.0 so container is accessible
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
