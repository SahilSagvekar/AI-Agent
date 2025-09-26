FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy prisma and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy rest of app including .env
COPY . . 

# Copy .env
COPY .env .env

# Build Next.js
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
