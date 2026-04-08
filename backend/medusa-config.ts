import { defineConfig, loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || "https://pare-des.tn,https://www.pare-des.tn",
      adminCors: process.env.ADMIN_CORS || "https://admin.pare-des.tn",
      authCors: process.env.AUTH_CORS || "https://admin.pare-des.tn,https://pare-des.tn,https://www.pare-des.tn",
      jwtSecret: process.env.JWT_SECRET || "supersecret-jwt-change-me",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret-cookie-change-me",
    },
  },
  admin: {
    disable: true,
  },
})
