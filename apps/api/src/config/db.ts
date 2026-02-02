import mongoose from 'mongoose'
import { env } from '@/config/env'

export async function connectDB() {
  if (!env.MONGO_URI) {
    console.warn('MONGO_URI is not set')
    return
  }

  await mongoose.connect(env.MONGO_URI)
  console.log('MongoDB connected')
}
