FROM node:20 AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 443
EXPOSE 80
EXPOSE 8080
EXPOSE 3050

CMD ["pnpm", "run", "serve"]
