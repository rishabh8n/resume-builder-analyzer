import { createBrowserRouter } from 'react-router-dom'
import { HomeRoute } from '@/app/routes/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute />,
  },
])
