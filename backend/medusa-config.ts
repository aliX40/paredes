import { defineConfig, loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || "https://paredes.tn,https://www.paredes.tn",
      adminCors: process.env.ADMIN_CORS || "https://admin.paredes.tn",
      authCors: process.env.AUTH_CORS || "https://admin.paredes.tn,https://paredes.tn,https://www.paredes.tn",
      jwtSecret: process.env.JWT_SECRET || "supersecret-jwt-change-me",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret-cookie-change-me",
    },
  },
  admin: {
    disable: false,
    path: "/app",
  },
  modules: [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
  ],
})
