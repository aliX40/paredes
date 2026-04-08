FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

# Copy package files first for layer caching
COPY package.json ./
RUN npm install

# Copy project files
COPY medusa-config.ts tsconfig.json ./
COPY src/ ./src/

# Build server only (admin disabled in config) with limited memory
RUN NODE_OPTIONS="--max-old-space-size=1536" npx medusa build

# --- Production stage ---
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache tini

COPY --from=builder /app /app

ENV NODE_ENV=production
EXPOSE 9000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
