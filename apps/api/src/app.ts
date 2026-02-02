import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { env } from '@/config/env'

const app = express()

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
)
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export { app }
