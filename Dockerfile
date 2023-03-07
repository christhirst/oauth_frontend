FROM node:19 as builder

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm ci
RUN npm run build

ENV NODE_TLS_REJECT_UNAUTHORIZED 0
FROM node:19-alpine
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/build .
COPY --from=builder /app/node_modules ./node_modules
RUN export NODE_TLS_REJECT_UNAUTHORIZED=0

ENV HOST=0.0.0.0
EXPOSE 3000
CMD ["node", "index.js"]