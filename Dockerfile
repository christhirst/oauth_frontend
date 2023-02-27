FROM node:19 as builder

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm ci
RUN npm run build

#FROM node:19-alpine
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/build .
COPY --from=builder /app/node_modules ./node_modules


EXPOSE 5173
CMD ["node", "index.js"]