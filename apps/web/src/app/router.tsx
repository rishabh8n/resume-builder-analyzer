import { createBrowserRouter } from 'react-router-dom'
import { HomeRoute } from '@/app/routes/home'
import { NotFoundRoute } from '@/app/routes/not-found'
import { ErrorRoute } from '@/app/routes/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute />,
    errorElement: <ErrorRoute />,
  },
  {
    path: '*',
    element: <NotFoundRoute />,
  },
])
