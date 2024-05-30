FROM node AS builder

WORKDIR /staging

COPY . ./

RUN npm install -g pnpm

RUN corepack enable && \
    pnpm install --frozen-lockfile && \
    pnpm build && \
    pnpm prune --prod



FROM node
WORKDIR /app
COPY --from=builder /staging/package.json /staging/pnpm-lock.yaml  /app/
COPY --from=builder /staging/node_modules /app/node_modules
COPY --from=builder /staging/build /app/build   

EXPOSE 3000
CMD ["node", "ORIGIN=http://localhost:3000" ,"-r", "dotenv/config", "/app/build/index.js"]