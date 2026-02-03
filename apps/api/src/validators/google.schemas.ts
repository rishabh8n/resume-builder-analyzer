import { z } from 'zod'

export const googleLoginSchema = z.object({
  body: z.object({
    idToken: z.string().min(10, 'idToken is required'),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
})
