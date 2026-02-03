import type { ZodSchema } from 'zod'
import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/utils/ApiError'

export const validate = (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    })

    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(', ')
      return next(new ApiError(400, message))
    }

    req.body = result.data.body
    req.params = result.data.params
    req.query = result.data.query

    return next()
  }
