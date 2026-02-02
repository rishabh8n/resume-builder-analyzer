import Redis from 'ioredis'
import { env } from '@/config/env'

export const redis = env.REDIS_URL ? new Redis(env.REDIS_URL) : null

if (!env.REDIS_URL) {
  console.warn('REDIS_URL is not set')
}
