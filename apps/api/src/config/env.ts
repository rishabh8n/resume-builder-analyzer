import 'dotenv/config'

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 4000),
  MONGO_URI: process.env.MONGO_URI ?? '',
  REDIS_URL: process.env.REDIS_URL ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? 'change-me',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? '',
}
