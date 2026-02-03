import jwt from 'jsonwebtoken'
import { env } from '@/config/env'

export type AccessTokenPayload = {
  sub: string
}

export function signAccessToken(userId: string) {
  const payload: AccessTokenPayload = { sub: userId }
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES,
  })
}

export function signRefreshToken(userId: string, tokenId: string) {
  return jwt.sign({ sub: userId, tid: tokenId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES,
  })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string; tid: string }
}
