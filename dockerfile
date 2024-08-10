FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3001

CMD npx prisma generate && npm run start