# API Server

Base URL: `http://localhost:4000`

## Auth Routes
- `POST /api/auth/register`
- `POST /api/auth/verify-email`
- `POST /api/auth/resend-verification`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `POST /api/auth/change-password` (protected)
- `GET /api/auth/me` (protected)

## Notes
- Access/refresh tokens are stored in **httpOnly cookies**.
- Rate limiting is enabled on auth endpoints.
