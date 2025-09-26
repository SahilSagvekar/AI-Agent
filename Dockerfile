FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --legacy-peer-deps

COPY .env.build .env

RUN npx prisma generate
RUN npm run build

RUN rm .env

EXPOSE 3000
CMD ["npm", "start"]
