# -----------------------
# Stage 1: Build Stage
# -----------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files & prisma folder first to leverage caching
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies (with legacy peer deps)
RUN npm install --legacy-peer-deps

# Copy remaining source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# -----------------------
# Stage 2: Production Stage
# -----------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files and production dependencies
COPY package*.json ./
RUN npm install  --legacy-peer-deps

# Copy built output and Prisma client from builder
COPY --from=builder /.next /.next
# COPY --from=builder /public /public
COPY --from=builder /node_modules /node_modules
COPY --from=builder /prisma /prisma
COPY --from=builder /.env /.env

# Expose port your app runs on
EXPOSE 3000

# Start Next.js, binding server to 0.0.0.0 for container accessibility
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
