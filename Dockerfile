# Dockerfile

# Use Node Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy prisma and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy rest of the app
COPY . .

# Build Next.js app (no secrets required at build)
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
