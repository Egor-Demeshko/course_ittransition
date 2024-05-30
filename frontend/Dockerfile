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

ENV ORIGIN=http://45.87.219.64:8080/


EXPOSE 3000
CMD ["node" ,"-r", "dotenv/config", "/app/build/index.js"]