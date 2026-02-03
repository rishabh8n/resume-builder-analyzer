import { createBrowserRouter } from 'react-router-dom'
import { HomeRoute } from '@/app/routes/home'
import { NotFoundRoute } from '@/app/routes/not-found'
import { ErrorRoute } from '@/app/routes/error'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage'
import { VerifyEmailPage } from '@/features/auth/pages/VerifyEmailPage'
import { ProfilePage } from '@/features/auth/pages/ProfilePage'
import { AuthGuard } from '@/components/layout/AuthGuard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute />,
    errorElement: <ErrorRoute />,
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
  {
    element: <AuthGuard />,
    children: [{ path: '/account', element: <ProfilePage /> }],
  },
  {
    path: '*',
    element: <NotFoundRoute />,
  },
])
