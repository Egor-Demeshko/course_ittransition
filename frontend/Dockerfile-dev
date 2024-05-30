FROM node

WORKDIR /app

EXPOSE 3000

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "dev"]