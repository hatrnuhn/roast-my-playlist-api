FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start"]