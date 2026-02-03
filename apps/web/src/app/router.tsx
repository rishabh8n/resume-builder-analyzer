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
import { ResendVerificationPage } from '@/features/auth/pages/ResendVerificationPage'
import { ChangePasswordPage } from '@/features/auth/pages/ChangePasswordPage'
import { AuthGuard } from '@/components/layout/AuthGuard'
import { RedirectIfAuth } from '@/components/layout/RedirectIfAuth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute />,
    errorElement: <ErrorRoute />,
  },
  {
    element: <RedirectIfAuth />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
      { path: '/verify-email', element: <VerifyEmailPage /> },
      { path: '/resend-verification', element: <ResendVerificationPage /> },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      { path: '/account', element: <ProfilePage /> },
      { path: '/change-password', element: <ChangePasswordPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundRoute />,
  },
])
