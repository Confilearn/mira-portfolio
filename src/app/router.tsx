import { createBrowserRouter } from 'react-router-dom'
import Home from '@/app/pages/Home'
import NotFound from '@/app/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
