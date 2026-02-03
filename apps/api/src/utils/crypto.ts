import crypto from 'crypto'

export function generateTokenString(size = 32) {
  return crypto.randomBytes(size).toString('hex')
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex')
}
