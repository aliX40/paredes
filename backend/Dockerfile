FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies needed for native modules
RUN apk add --no-cache python3 make g++

# Create Medusa v2 project
RUN npx -y create-medusa-app@latest my-medusa --skip-db --no-browser --directory my-medusa -- --v2 || true

# If the above didn't work with those flags, fall back to manual setup
RUN if [ ! -d /app/my-medusa ]; then \
      mkdir -p /app/my-medusa && \
      cd /app/my-medusa && \
      npm init -y && \
      npm install @medusajs/medusa@latest @medusajs/framework@latest @medusajs/cli@latest; \
    fi

WORKDIR /app/my-medusa

# Copy custom config
COPY medusa-config.ts ./medusa-config.ts
COPY src/ ./src/

# Install dependencies and build
RUN npm install
RUN npx medusa build || true

# --- Production stage ---
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache tini

COPY --from=builder /app/my-medusa /app

ENV NODE_ENV=production
EXPOSE 9000

ENTRYPOINT ["/sbin/tini", "--"]

# Run migrations then start the server
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
