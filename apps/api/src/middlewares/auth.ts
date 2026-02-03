import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/utils/ApiError'
import { verifyAccessToken } from '@/utils/tokens'

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  const cookieToken = req.cookies?.accessToken
  const token = bearer || cookieToken

  if (!token) return next(new ApiError(401, 'Unauthorized'))

  try {
    const payload = verifyAccessToken(token)
    req.user = { id: payload.sub }
    return next()
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'))
  }
}
