FROM node:20-alpine AS builder

# FROM node:20-alpine runnerAS 


WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --legacy-peer-deps

# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.env ./.env

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
