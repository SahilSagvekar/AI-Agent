# Use lightweight Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy prisma and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy all source files
COPY . .

# Copy dummy build-time environment variables
COPY .env.build .env

# Build Next.js app
RUN npm run build

# Remove dummy env so it doesn't get baked into final container
RUN rm .env

# Expose app port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
