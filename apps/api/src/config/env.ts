import 'dotenv/config'

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 4000),
  MONGO_URI: process.env.MONGO_URI ?? '',
  REDIS_URL: process.env.REDIS_URL ?? '',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? 'change-me-access',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'change-me-refresh',
  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES ?? '15m',
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES ?? '30d',
  EMAIL_TOKEN_EXPIRES_MS: Number(process.env.EMAIL_TOKEN_EXPIRES_MS ?? 1000 * 60 * 60),
  RESET_TOKEN_EXPIRES_MS: Number(process.env.RESET_TOKEN_EXPIRES_MS ?? 1000 * 60 * 30),
  APP_URL: process.env.APP_URL ?? 'http://localhost:5173',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? '',
  RESEND_FROM: process.env.RESEND_FROM ?? '',
}
